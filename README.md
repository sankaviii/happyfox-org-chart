# HappyFox Employee Organization Chart

An interactive employee organization chart application built with React that allows users to visualize and manage employee hierarchies with drag-and-drop functionality, real-time filtering, and search capabilities.

## 🌟 Features

- **Interactive Organization Chart**: Visual tree structure showing employee reporting relationships
- **Drag & Drop**: Easily reassign employees to different managers by dragging and dropping
- **Search Functionality**: Search employees by name, designation, or team
- **Team Filtering**: Filter employees and organization chart by specific teams
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Changes reflect immediately across the entire application
- **Mock API**: Uses MirageJS for realistic API simulation during development

## 🚀 Live Demo

[Add your deployed URL here after deploying to Vercel/Netlify]

## 📸 Screenshots

[Add screenshots of your application here]

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - UI library
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Programming language

### State Management
- **Context API + useReducer** - Global state management

### API Mocking
- **MirageJS** - Client-side API mocking

### Drag & Drop
- **dnd-kit** - Modern drag-and-drop library

### Styling
- **CSS Modules** - Scoped component styling (90% custom CSS)
- **Chakra UI** - Minimal usage for form inputs only (10%)

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **jsdom** - DOM testing environment

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone [<your-repo-url>](https://github.com/sankaviii/happyfox-org-chart.git)
   cd happyfox-org-chart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Run tests with UI |
| `npm run lint` | Run ESLint |

## 🏗️ Project Structure

```
happyfox-org-chart/
├── src/
│   ├── components/
│   │   ├── EmployeeCard/
│   │   │   ├── EmployeeCard.jsx
│   │   │   └── EmployeeCard.module.css
│   │   ├── EmployeeList/
│   │   │   ├── EmployeeList.jsx
│   │   │   └── EmployeeList.module.css
│   │   ├── OrgChart/
│   │   │   ├── OrgChart.jsx
│   │   │   └── OrgChart.module.css
│   │   └── TreeNode/
│   │       ├── TreeNode.jsx
│   │       └── TreeNode.module.css
│   ├── context/
│   │   └── EmployeeContext.jsx
│   ├── utils/
│   │   ├── treeHelpers.js
│   │   └── treeHelpers.test.js
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   ├── App.module.css
│   ├── main.jsx
│   ├── index.css
│   └── server.js (MirageJS configuration)
├── package.json
├── vite.config.js
├── vitest.config.js
└── README.md
```

## 🎯 Key Implementation Details

### State Management

I chose **Context API with useReducer** for state management because:
- ✅ No external dependencies (built into React)
- ✅ Sufficient for the application's scope
- ✅ Centralized state with predictable updates
- ✅ Demonstrates solid understanding of React fundamentals

The state structure handles:
- Employee data
- Loading and error states
- Search and filter values

### Drag & Drop

Implemented using **dnd-kit** because:
- ✅ Modern and actively maintained
- ✅ Better accessibility than alternatives
- ✅ Smaller bundle size than react-dnd
- ✅ Excellent documentation

Features:
- Prevents circular reporting structures
- Visual feedback during dragging
- Smooth animations
- Touch device support

### API Mocking with MirageJS

As suggested in the assignment requirements, I used **MirageJS**:
- ✅ Simulates realistic API behavior
- ✅ Network delay simulation
- ✅ Full CRUD operations
- ✅ RESTful routes

This made development smooth and demonstrates ability to work with APIs.

### Custom CSS

**90% of the styling is custom CSS** to showcase fundamental skills:
- Flexbox for organization chart layout
- CSS Grid for main application layout
- Custom animations and transitions
- Connecting lines between nodes using ::before/::after
- Responsive media queries
- Custom scrollbars

**Chakra UI (10%)** is used minimally for:
- Search input component
- Team filter dropdown
- ChakraProvider wrapper

This hybrid approach demonstrates both CSS proficiency and pragmatic use of libraries.

### Tree Building Algorithm

The `buildTree()` function converts flat employee data into a hierarchical structure:

```javascript
// Time Complexity: O(n)
// Space Complexity: O(n)

1. Create a Map for O(1) employee lookups
2. First pass: Initialize all nodes with empty children arrays
3. Second pass: Build parent-child relationships
4. Return root nodes (employees with no manager)
```

### Circular Reference Prevention

Before allowing an employee to be moved to a new manager, the app checks:
1. Employee cannot report to themselves
2. Employee cannot report to anyone in their reporting chain

This prevents invalid organizational structures.

## 🧪 Testing

The project includes unit tests for utility functions:

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

Test coverage includes:
- Tree building from flat arrays
- Employee filtering (search & team)
- Circular reference detection
- Finding employees and reports

## 🎨 Design Decisions

### Why React?
- Most popular frontend framework
- Large ecosystem and community
- Component-based architecture perfect for org charts

### Why Vite?
- Fastest build tool available
- Better developer experience than CRA
- Optimized production builds

### Why CSS Modules?
- Scoped styling prevents conflicts
- No runtime cost
- Works with standard CSS
- Easy to understand and maintain

### Why dnd-kit over react-dnd?
- More modern and actively maintained
- Better accessibility (ARIA support)
- Smaller bundle size
- Cleaner API with hooks

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and configure build settings
5. Click "Deploy"

### Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy"

## 📝 Assignment Requirements Checklist

### Left Side (Employee List)
- ✅ Shows all employees with name, designation, team
- ✅ Search box to filter by any property
- ✅ Team dropdown filter
- ✅ Filtering updates the org chart on the right

### Right Side (Organization Chart)
- ✅ Tree structure based on manager relationships
- ✅ Visual hierarchy with connecting lines
- ✅ Responsive layout

### Drag & Drop
- ✅ Drag employees to change their manager
- ✅ Makes API call to update employee
- ✅ Chart re-renders with new structure
- ✅ Prevents circular references

### Technical Requirements
- ✅ Uses React framework
- ✅ Uses MirageJS for API mocking (as suggested)
- ✅ Custom CSS for core features
- ✅ Third-party libraries for complex features only
- ✅ Tests included
- ✅ Good UX with loading states and error handling

## 🎓 What I Learned

- Building hierarchical tree structures from flat data
- Implementing drag-and-drop with accessibility
- State management patterns with Context + useReducer
- API mocking with MirageJS
- CSS techniques for organizational charts
- Preventing circular references in tree structures

## 🔮 Future Improvements

Given more time, I would add:
- [ ] Comprehensive E2E tests with Cypress
- [ ] Virtualization for large employee lists (1000+ employees)
- [ ] Undo/redo functionality for manager changes
- [ ] Export chart as image/PDF
- [ ] Dark mode support
- [ ] Employee detail modal with full information
- [ ] Bulk operations (move entire teams)
- [ ] Search history and suggestions
- [ ] Keyboard navigation for accessibility

## 👤 Author

Sankavi
- GitHub: [@sankaviii]
- Email: sankavi2110@gmail.com

## 📄 License

This project is created for the HappyFox Frontend Assignment.

---

**Built with ❤️ for HappyFox**
