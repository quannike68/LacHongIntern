export const departmentReducer = (state: any, action: any) => {
    
  switch (action.type) {
    case 'CREATE_DEPARTMENT':
      return {
        ...state,
        loading: false,
        ProjectDetails: {
          ...state,
          department_id: action.payload.department_id,
          name: action.payload.name,
          description: action.payload.description,
          manager_id: action.payload.manager_id,
        },
      };
    case 'CREATE_DEPARTMENT':
      return {
        ...state,
        loading: false,
        ProjectDetails: {
          ...state,
          department_id: action.payload.department_id,
          name: action.payload.name,
          description: action.payload.description,
          manager_id: action.payload.manager_id,
        },
      };
    case 'DELETE_DEPARTMENT':
      return {
        ...state,
        loading: false,
        ProjectDetails: {
          ...state,
          department_id: action.payload.department_id,
        },
      };
    case 'SET_DEPARTMENTS':
      return {...state, formDataDepartment: action.payload, loading: false};
    default:
      return state;
  }
};
