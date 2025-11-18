import { describe, it, expect } from 'vitest';
import {
  buildTree,
  filterEmployees,
  getUniqueTeams,
  findEmployeeById,
  getAllReports,
  wouldCreateCircularReference,
} from './treeHelpers';

describe('treeHelpers', () => {
  const mockEmployees = [
    { id: 1, name: 'CEO', designation: 'Chief Executive Officer', team: 'Executive', managerId: null },
    { id: 2, name: 'CTO', designation: 'Chief Technology Officer', team: 'Technology', managerId: 1 },
    { id: 3, name: 'CFO', designation: 'Chief Financial Officer', team: 'Finance', managerId: 1 },
    { id: 4, name: 'Dev Lead', designation: 'Development Lead', team: 'Technology', managerId: 2 },
    { id: 5, name: 'Senior Dev', designation: 'Senior Developer', team: 'Technology', managerId: 4 },
  ];

  describe('buildTree', () => {
    it('should build a tree structure from flat array', () => {
      const tree = buildTree(mockEmployees);

      expect(tree).toHaveLength(1);
      expect(tree[0].id).toBe(1);
      expect(tree[0].children).toHaveLength(2);
      expect(tree[0].children[0].id).toBe(2);
      expect(tree[0].children[1].id).toBe(3);
    });

    it('should handle nested children', () => {
      const tree = buildTree(mockEmployees);
      const cto = tree[0].children[0];

      expect(cto.children).toHaveLength(1);
      expect(cto.children[0].id).toBe(4);
      expect(cto.children[0].children[0].id).toBe(5);
    });

    it('should return empty array for empty input', () => {
      const tree = buildTree([]);
      expect(tree).toEqual([]);
    });

    it('should handle multiple root nodes', () => {
      const multiRoot = [
        { id: 1, name: 'CEO', managerId: null },
        { id: 2, name: 'President', managerId: null },
      ];

      const tree = buildTree(multiRoot);
      expect(tree).toHaveLength(2);
    });
  });

  describe('filterEmployees', () => {
    it('should filter by search term (name)', () => {
      const filtered = filterEmployees(mockEmployees, 'CEO', '');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('CEO');
    });

    it('should filter by search term (designation)', () => {
      const filtered = filterEmployees(mockEmployees, 'Developer', '');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Senior Dev');
    });

    it('should filter by team', () => {
      const filtered = filterEmployees(mockEmployees, '', 'Technology');
      expect(filtered).toHaveLength(3);
    });

    it('should filter by both search and team', () => {
      const filtered = filterEmployees(mockEmployees, 'Dev', 'Technology');
      expect(filtered).toHaveLength(2);
    });

    it('should be case insensitive', () => {
      const filtered = filterEmployees(mockEmployees, 'ceo', '');
      expect(filtered).toHaveLength(1);
    });

    it('should return all employees when no filters', () => {
      const filtered = filterEmployees(mockEmployees, '', '');
      expect(filtered).toHaveLength(mockEmployees.length);
    });
  });

  describe('getUniqueTeams', () => {
    it('should return unique team names', () => {
      const teams = getUniqueTeams(mockEmployees);
      expect(teams).toHaveLength(3);
      expect(teams).toContain('Executive');
      expect(teams).toContain('Technology');
      expect(teams).toContain('Finance');
    });

    it('should return sorted teams', () => {
      const teams = getUniqueTeams(mockEmployees);
      expect(teams).toEqual(['Executive', 'Finance', 'Technology']);
    });
  });

  describe('findEmployeeById', () => {
    it('should find employee by id', () => {
      const employee = findEmployeeById(mockEmployees, 2);
      expect(employee).not.toBeNull();
      expect(employee.name).toBe('CTO');
    });

    it('should return null for non-existent id', () => {
      const employee = findEmployeeById(mockEmployees, 999);
      expect(employee).toBeNull();
    });
  });

  describe('getAllReports', () => {
    it('should get all direct and indirect reports', () => {
      const reports = getAllReports(mockEmployees, 2); // CTO's reports
      expect(reports).toHaveLength(2);
      expect(reports.map(e => e.id)).toContain(4);
      expect(reports.map(e => e.id)).toContain(5);
    });

    it('should return empty for employee with no reports', () => {
      const reports = getAllReports(mockEmployees, 5); // Senior Dev has no reports
      expect(reports).toHaveLength(0);
    });
  });

  describe('wouldCreateCircularReference', () => {
    it('should detect self-reference', () => {
      const result = wouldCreateCircularReference(mockEmployees, 2, 2);
      expect(result).toBe(true);
    });

    it('should detect circular reference through chain', () => {
      // Try to make CEO report to Senior Dev (who ultimately reports to CEO)
      const result = wouldCreateCircularReference(mockEmployees, 1, 5);
      expect(result).toBe(true);
    });

    it('should allow valid manager change', () => {
      // Move Senior Dev to report to CTO instead of Dev Lead
      const result = wouldCreateCircularReference(mockEmployees, 5, 2);
      expect(result).toBe(false);
    });
  });
});
