import React, { useState,useEffect } from "react";
import "./styles.css";
import InputField from "./InputField";
import TodoList from "./Todolist";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "../model";
import { useUser } from "./usercontexts";
import { Link } from "react-router-dom";
import { User } from './usercontexts';



const MainPage: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user && user.id !== undefined) {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const storedUser = storedUsers.find((u: User) => u.id === user.id);

      if (storedUser) {
        setTodos(storedUser.todos);
      }
    }
  }, [user]);



  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (todo) {
      const newTodo: Todo = { id: Date.now(), todo, isDone: false };
      setTodos([...todos, newTodo]);
      setTodo("");
  
      if (user && user.id !== undefined) {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const index = storedUsers.findIndex((u: User) => u.id === user.id);
  
        if (index !== -1) {
          const updatedUser = { ...user, todos: [...user.todos, newTodo] }; // Append newTodo to the existing todos
          storedUsers[index] = updatedUser;
          localStorage.setItem("users", JSON.stringify(storedUsers));
        }
      }
    }
  };
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  const handleAddTodo = (newTodo: Todo) => {
    if (user && user.id !== undefined) {
      const updatedUser = { ...user, todos: [...(user?.todos || []), newTodo] };
      setUser(updatedUser);
  
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const index = storedUsers.findIndex((u: User) => u.id === user.id);
  
      if (index !== -1) {
        storedUsers[index] = updatedUser;
      } else {
      
        const newUser = {
          id: Math.max(...storedUsers.map((u: User) => u.id), 0) + 1, 
          todos: [newTodo],
        };
        storedUsers.push(newUser);
      }
  
      localStorage.setItem('users', JSON.stringify(storedUsers));
    } else {
   
      console.error("User or user ID is undefined.");
    }
  };
  
  return (
    <div className="bg_image">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <div className="bigbox">
            <span className="heading">TODO</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <TodoList
              todos={todos}
              setTodos={setTodos}
              CompletedTodos={CompletedTodos}
              setCompletedTodos={setCompletedTodos}
            />
          </div>
          <div>
            <button className="btn">
              <Link to="/"> log_out</Link>
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default MainPage;
