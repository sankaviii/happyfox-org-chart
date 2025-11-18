import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      employee: Model,
    },

    seeds(server) {
      // Executive Level
      server.create('employee', {
        id: 1,
        name: 'Mark Hill',
        designation: 'Chief Executive Officer',
        team: 'Executive',
        managerId: null,
      });

      // C-Level Executives
      server.create('employee', {
        id: 2,
        name: 'Joe Linux',
        designation: 'Chief Technology Officer',
        team: 'Technology',
        managerId: 1,
      });

      server.create('employee', {
        id: 3,
        name: 'Linda May',
        designation: 'Chief Business Officer',
        team: 'Business',
        managerId: 1,
      });

      server.create('employee', {
        id: 4,
        name: 'John Green',
        designation: 'Chief Accounting Officer',
        team: 'Finance',
        managerId: 1,
      });

      // Technology Team
      server.create('employee', {
        id: 5,
        name: 'Ron Blomquist',
        designation: 'Chief Information Security Officer',
        team: 'Security',
        managerId: 2,
      });

      server.create('employee', {
        id: 6,
        name: 'Michael Rubin',
        designation: 'Chief Innovation Officer',
        team: 'Innovation',
        managerId: 2,
      });

      // Business Team
      server.create('employee', {
        id: 7,
        name: 'Alice Lopez',
        designation: 'Chief Communications Officer',
        team: 'Communications',
        managerId: 3,
      });

      server.create('employee', {
        id: 8,
        name: 'Mary Johnson',
        designation: 'Chief Brand Officer',
        team: 'Marketing',
        managerId: 3,
      });

      server.create('employee', {
        id: 9,
        name: 'Kirk Douglas',
        designation: 'Chief Business Development Officer',
        team: 'Business Development',
        managerId: 3,
      });

      // Finance Team
      server.create('employee', {
        id: 10,
        name: 'Erica Reel',
        designation: 'Chief Customer Officer',
        team: 'Customer Success',
        managerId: 4,
      });

      // Additional team members
      server.create('employee', {
        id: 11,
        name: 'Sarah Connor',
        designation: 'Senior Security Engineer',
        team: 'Security',
        managerId: 5,
      });

      server.create('employee', {
        id: 12,
        name: 'James Wilson',
        designation: 'Product Innovation Lead',
        team: 'Innovation',
        managerId: 6,
      });

      server.create('employee', {
        id: 13,
        name: 'Emma Davis',
        designation: 'Communications Manager',
        team: 'Communications',
        managerId: 7,
      });

      server.create('employee', {
        id: 14,
        name: 'Robert Brown',
        designation: 'Brand Strategy Director',
        team: 'Marketing',
        managerId: 8,
      });

      server.create('employee', {
        id: 15,
        name: 'Lisa Anderson',
        designation: 'Business Development Manager',
        team: 'Business Development',
        managerId: 9,
      });

      server.create('employee', {
        id: 16,
        name: 'David Martinez',
        designation: 'Customer Success Manager',
        team: 'Customer Success',
        managerId: 10,
      });
    },

    routes() {
      this.namespace = 'api';

      // GET all employees
      this.get('/employees', (schema) => {
        return schema.employees.all();
      });

      // GET single employee
      this.get('/employees/:id', (schema, request) => {
        const id = request.params.id;
        return schema.employees.find(id);
      });

      // PATCH update employee (for drag and drop manager changes)
      this.patch('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.body);

        const employee = schema.employees.find(id);
        return employee.update(attrs);
      });

      // POST create new employee
      this.post('/employees', (schema, request) => {
        const attrs = JSON.parse(request.body);
        return schema.employees.create(attrs);
      });

      // DELETE employee
      this.delete('/employees/:id', (schema, request) => {
        const id = request.params.id;
        return schema.employees.find(id).destroy();
      });

      // Simulate network delay for realism
      this.timing = 400;
    },
  });
}
