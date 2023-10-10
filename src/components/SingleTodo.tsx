import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiOutlineClose, AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";




const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )

    );


  };
  const [isActive, setIsActive] = useState(false);

  return (


    <form
      onSubmit={(e) => handleEdit(e, todo.id)}

      className={`todos__single `}
    >
      <span className="doneicon" onClick={() => handleDone(todo.id)}>
        <div className="cursor-pointer select-none">
          {isActive ? <AiFillCheckCircle onClick={() => {
            setIsActive(!isActive)
          }} /> :
            <AiOutlineCheckCircle onClick={() => {
              setIsActive(!isActive)
            }} />
          }
        </div>
      </span>
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
          ref={inputRef}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>

        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiOutlineClose />
        </span>

      </div>
    </form>



  );
};

export default SingleTodo;