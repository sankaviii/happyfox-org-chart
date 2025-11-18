import { useMemo } from 'react';
import { useEmployees } from '../../context/EmployeeContext';
import { filterEmployees, getUniqueTeams } from '../../utils/treeHelpers';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import styles from './EmployeeList.module.css';

export default function EmployeeList() {
  const {
    employees,
    searchTerm,
    selectedTeam,
    setSearchTerm,
    setSelectedTeam,
    loading,
  } = useEmployees();

  // Get filtered employees
  const filteredEmployees = useMemo(() => {
    return filterEmployees(employees, searchTerm, selectedTeam);
  }, [employees, searchTerm, selectedTeam]);

  // Get unique teams for filter dropdown
  const teams = useMemo(() => {
    return getUniqueTeams(employees);
  }, [employees]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading employees...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Employees</h2>
        <p className={styles.subtitle}>
          {filteredEmployees.length} of {employees.length} employees
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="search" className={styles.label}>
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, role, or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="team-filter" className={styles.label}>
            Filter by Team
          </label>
          <select
            id="team-filter"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className={styles.select}
          >
            <option value="">All Teams</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.employeeList}>
        {filteredEmployees.length === 0 ? (
          <div className={styles.empty}>
            <p>No employees found matching your criteria.</p>
            {(searchTerm || selectedTeam) && (
              <button
                className={styles.clearButton}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTeam('');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          filteredEmployees.map((employee) => (
            <div key={employee.id} className={styles.employeeItem}>
              <EmployeeCard employee={employee} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
