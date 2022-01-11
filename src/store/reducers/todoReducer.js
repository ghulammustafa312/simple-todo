const initialState = {
  list: [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = [...state.list, action.payload];
      return {
        ...state,
        list: newTodo,
      };
    case "GET_TODO":
      return {
        ...state,
      };
    case "UPDATE_TODO":
      const newUpdate = state.list.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, title: action.payload };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        list: newUpdate,
      };
    case "DELETE_TODO":
      const deletedTodo = state.list.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        list: deletedTodo,
      };
    default:
      return state;
  }
};
export default todoReducer;
