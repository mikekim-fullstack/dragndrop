import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [fruitItems, setFruitItems] = useState([
    { id: 1, name: 'Apple', price: 0.95 },
    { id: 2, name: 'Banana', price: 1 },
    { id: 3, name: 'Pear', price: 1.2 },
    { id: 4, name: 'Graps', price: 4.0 },
    { id: 5, name: 'Orange', price: 2.0 },
  ])
  return (
    <div className="App">
      <header>
        <h2 className='title'>Fruit Lists</h2>
        <div className="input-row">
          <input type='text' name='fruitName' placeholder='e.g. Banana' />
          <button className='btn btn-primary'>Add&nbsp;item</button>
        </div>
      </header>

      {/* Display the kinds of fruit.. */}
      <div className="list-container">
        <div className="list-item" draggable>
          <i className="fa-solid fa-bars"></i>
          <h3>Apple</h3>
        </div>
        <div className="list-item" draggable>
          <i className="fa-solid fa-bars"></i>
          <h3>Pear</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
