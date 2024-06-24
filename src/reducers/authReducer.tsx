export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        role: action.payload.role,
        username: action.payload.user,
      };
      case 'GET_DETAIL_ACCOUNT':
        return{
          ...state,
          
        }
    default:
      return state;
  }
};
