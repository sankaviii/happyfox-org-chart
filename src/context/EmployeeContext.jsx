import { createContext, useContext, useReducer, useEffect } from 'react';

const EmployeeContext = createContext();

// Initial state
const initialState = {
  employees: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedTeam: '',
};

// Action types
export const ACTIONS = {
  SET_EMPLOYEES: 'SET_EMPLOYEES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SELECTED_TEAM: 'SET_SELECTED_TEAM',
};

// Reducer function
function employeeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTIONS.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id
            ? { ...emp, ...action.payload.updates }
            : emp
        ),
      };

    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case ACTIONS.SET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: action.payload,
      };

    default:
      return state;
  }
}

// Provider component
export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Save employees to localStorage whenever they change
  useEffect(() => {
    if (state.employees.length > 0) {
      localStorage.setItem('orgChartEmployees', JSON.stringify(state.employees));
    }
  }, [state.employees]);

  const fetchEmployees = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      // Try to load from localStorage first
      const cached = localStorage.getItem('orgChartEmployees');
      if (cached) {
        dispatch({ type: ACTIONS.SET_EMPLOYEES, payload: JSON.parse(cached) });
        return;
      }

      // If no cache, fetch from API
      const response = await fetch('/api/employees');
      const data = await response.json();
      dispatch({ type: ACTIONS.SET_EMPLOYEES, payload: data.employees });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const updateEmployeeManager = async (employeeId, newManagerId) => {
    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ managerId: newManagerId }),
      });

      const data = await response.json();

      dispatch({
        type: ACTIONS.UPDATE_EMPLOYEE,
        payload: {
          id: employeeId,
          updates: { managerId: newManagerId },
        },
      });

      return data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };

  const setSearchTerm = (term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term });
  };

  const setSelectedTeam = (team) => {
    dispatch({ type: ACTIONS.SET_SELECTED_TEAM, payload: team });
  };

  const value = {
    ...state,
    updateEmployeeManager,
    setSearchTerm,
    setSelectedTeam,
    fetchEmployees,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

// Custom hook to use the context
export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}
