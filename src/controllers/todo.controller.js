import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  const todo = await Todo.create({ title, description, userId });
  return res.status(201).json(todo);
});

const getTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const todos = await Todo.find({ userId });
  return res.json(todos);
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  return res.json(todo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndRemove(id);
  return res.status(204).json();
});

export { createTodo, getTodos, updateTodo, deleteTodo };