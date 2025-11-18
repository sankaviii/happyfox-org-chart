/**
 * Builds a tree structure from a flat array of employees
 * @param {Array} employees - Flat array of employee objects
 * @returns {Array} - Array of root employees with nested children
 */
export function buildTree(employees) {
  if (!employees || employees.length === 0) return [];

  // Create a map for O(1) lookups
  const employeeMap = new Map();
  const roots = [];

  // First pass: Create nodes with empty children arrays
  employees.forEach((emp) => {
    employeeMap.set(emp.id, { ...emp, children: [] });
  });

  // Second pass: Build parent-child relationships
  employees.forEach((emp) => {
    const node = employeeMap.get(emp.id);

    if (emp.managerId === null || emp.managerId === undefined) {
      // This is a root node (no manager)
      roots.push(node);
    } else {
      // Add this node to their manager's children
      const manager = employeeMap.get(emp.managerId);
      if (manager) {
        manager.children.push(node);
      } else {
        // If manager not found, treat as root (orphaned employee)
        roots.push(node);
      }
    }
  });

  return roots;
}

/**
 * Filters employees based on search term and team
 * @param {Array} employees - Array of employees
 * @param {String} searchTerm - Search query
 * @param {String} selectedTeam - Selected team filter
 * @returns {Array} - Filtered employees
 */
export function filterEmployees(employees, searchTerm, selectedTeam) {
  let filtered = [...employees];

  // Filter by search term (search across name, designation, team)
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(term) ||
        emp.designation.toLowerCase().includes(term) ||
        emp.team.toLowerCase().includes(term) ||
        emp.id.toString().includes(term)
      );
    });
  }

  // Filter by team
  if (selectedTeam) {
    filtered = filtered.filter((emp) => emp.team === selectedTeam);
  }

  return filtered;
}

/**
 * Gets all unique teams from employees
 * @param {Array} employees - Array of employees
 * @returns {Array} - Sorted array of unique team names
 */
export function getUniqueTeams(employees) {
  const teams = new Set(employees.map((emp) => emp.team));
  return Array.from(teams).sort();
}

/**
 * Finds an employee by ID
 * @param {Array} employees - Array of employees
 * @param {Number} id - Employee ID
 * @returns {Object|null} - Employee object or null
 */
export function findEmployeeById(employees, id) {
  return employees.find((emp) => emp.id === id) || null;
}

/**
 * Gets all employees that report to a specific manager (including nested)
 * @param {Array} employees - Array of employees
 * @param {Number} managerId - Manager's ID
 * @returns {Array} - Array of all reporting employees
 */
export function getAllReports(employees, managerId) {
  const reports = [];
  const queue = [managerId];

  while (queue.length > 0) {
    const currentId = queue.shift();
    const directReports = employees.filter((emp) => emp.managerId === currentId);

    reports.push(...directReports);
    queue.push(...directReports.map((emp) => emp.id));
  }

  return reports;
}

/**
 * Checks if moving an employee would create a circular reference
 * @param {Array} employees - Array of employees
 * @param {Number} employeeId - Employee being moved
 * @param {Number} newManagerId - New manager ID
 * @returns {Boolean} - True if circular reference would be created
 */
export function wouldCreateCircularReference(employees, employeeId, newManagerId) {
  // Can't report to yourself
  if (employeeId === newManagerId) return true;

  // Get all reports of the employee being moved
  const allReports = getAllReports(employees, employeeId);

  // Check if new manager is in the employee's reporting chain
  return allReports.some((emp) => emp.id === newManagerId);
}
