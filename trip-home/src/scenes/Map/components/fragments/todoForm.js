import { useState } from "react";

const TodoForm = () => {
  const [restaurant, setRestaurant] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const object = { restaurant, address };

    console.log(object);
  }

  return (
    <div className="">
      <h2 className="text-light">Add a Your Own Place</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-light">Place Name:</label>
        <input
          type="text"
          required
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
        />
        <label className="text-light">Place Address:</label>
        <textarea
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <button>Add Place</button>
      </form>
    </div>
  );
}

export default TodoForm
