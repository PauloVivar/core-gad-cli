
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'addUser':
      return [
        ...state,
        {
          ...action.payload,
          //id: new Date().getTime(),     //este proceso se elimina ya que el id se genera en la db
        },
      ];

    case 'removeUser':
      return state.filter(user => user.id !== action.payload);

    case 'updateUser':
      return state.map(user => {
        if (user.id === action.payload.id) {
          return {
            ...action.payload,
            password: user.password, //para ocultar input password de form
          };
        } 
        return user;
      });
    
    case 'loadingUsers':
      return action.payload;

    default:
      return state;
  }
};

export { usersReducer };
