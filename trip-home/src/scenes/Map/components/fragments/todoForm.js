import React from "react"

/* 

TodoForm is a component for adding user Todos via a form

*/

const TodoForm = (props) => {
    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
      };
    
      function TodoForm({ addTodo }) {
        const [value, setValue] = React.useState("");
    
        const handleSubmit = e => {
          e.preventDefault();
          if (!value) return;
          addTodo(value);
          setValue("");
        };
    
        return (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Add Your Own Place!"
            />
          </form>
        );
      }
}

export default TodoForm