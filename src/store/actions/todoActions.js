import { v4 as uuidv4 } from "uuid";
export const addTodo = (obj) => async (dispatch) => {
  let newObject = {
    id: uuidv4(),
    title: obj.title,
  };
  dispatch({ type: "ADD_TODO", payload: newObject });
};
export const getTodo = () => async (dispatch) => {
  dispatch({ type: "GET_TODO" });
};
export const updateTodo = (id, obj) => async (dispatch) => {
  dispatch({ type: "UPDATE_TODO", payload: obj, id: id });
};
export const deleteTodo = (obj) => async (dispatch) => {
  dispatch({ type: "DELETE_TODO", payload: obj });
};
