import React, { useState } from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";



interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const countNotCompletedTasks = (todos: Todo[]) => {
  return todos.filter((todo) => !todo.isDone).length;
};

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  const handleClearCompleted = () => {
    console.log("Clear completed tasks button clicked");

    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);


    setCompletedTodos([]);
  };
  const [filter, setFilter] = useState<string>("All");


  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Active") {
      return !todo.isDone;
    } else if (filter === "Completed") {
      return todo.isDone;
    }
    return true;
  });

  return (
    <div>
      <div className="container">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="todos-content">
                {filteredTodos?.map((todo, index) => (
                  <SingleTodo
                    index={index}
                    todos={todos}
                    todo={todo}
                    key={todo.id}
                    setTodos={setTodos}
                  />
                ))}
                {provided.placeholder}
              </div>
              <div className="footer">
                <button className="button__footer">
                  {countNotCompletedTasks(todos)} items left
                </button>
                <button
                  className={`button__footer ${filter === "All" ? "active" : ""}`}
                  onClick={() => {
                    setFilter("All");
                    console.log("All button clicked");
                  }}
                >
                  All
                </button>
                <button
                  className={`button__footer ${filter === "Active" ? "active" : ""}`}
                  onClick={() => {
                    setFilter("Active");
                    console.log("Active button clicked");
                  }}
                >
                  Active
                </button>
                <button
                  className={`button__footer ${filter === "Completed" ? "active" : ""}`}
                  onClick={() => {
                    setFilter("Completed");
                    console.log("Completed button clicked");
                  }}
                >
                  Completed
                </button>
                <button className="button__footer" onClick={handleClearCompleted}>
                  Clear Completed
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
