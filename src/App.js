import './App.css';
import { useState, useEffect, useRef } from 'react'
import { isElementType } from '@testing-library/user-event/dist/utils';

function App() {
  const [fruitItems, setFruitItems] = useState([
    { id: 1, name: 'Apple', price: 0.95 },
    { id: 2, name: 'Banana', price: 1 },
    { id: 3, name: 'Pear', price: 1.2 },
    { id: 4, name: 'Graps', price: 4.0 },
    { id: 5, name: 'Lemon', price: 2.0 },
    { id: 6, name: 'Pineapple', price: 2.0 },
    { id: 7, name: 'Blueberry', price: 2.0 },
    { id: 8, name: 'Plum', price: 2.0 },
    { id: 9, name: 'Kiwi', price: 2.0 },
    { id: 10, name: 'Dragon', price: 2.0 },
    { id: 11, name: 'Mango', price: 2.0 },
    { id: 12, name: 'Avocado', price: 2.0 },
    { id: 13, name: 'Watermelon', price: 2.0 },
    { id: 14, name: 'Melon', price: 2.0 },
    { id: 15, name: 'Cherry', price: 2.0 },
  ])
  const [itemState, setItemState] = useState({ isHover: false, isDone: false })
  const [inputData, setInputData] = useState('')
  const dragStartedItem = useRef(null)
  const dragOverItem = useRef(null)
  // const isItemHover = useRef(false)




  const handleAddButton = (e) => {
    if (inputData.length > 0) {
      const id = Math.round(Math.random() * 10000 + 1)
      setFruitItems([...fruitItems, { id, name: inputData, price: 1.0 }])
      setInputData('')
    }
    console.log(inputData)
  }
  const handleDragStart = (e, index) => {
    dragStartedItem.current = index
    setItemState({ isHover: false, isDone: false })
    // console.log('started')
  }

  const handleDragEnter = (e, index) => {
    e.preventDefault()
    if (dragStartedItem.current === index) return;
    dragOverItem.current = index
    setItemState({ ...itemState, isHover: !itemState.isHover })
    // console.log('handleDragEnder: ')
  }
  // ----------------
  // In order to trigger onDrop, set onDragOver functiona and event.preventDefault()..
  // When mouse is released WITHIN targets (draggable lists )..
  // Delete and insert...
  const handleDrop = (e, index) => {
    e.preventDefault()
    const _fruitItems = fruitItems

    // Delete started item and save it into draggedItem
    const draggedItem = _fruitItems.splice(dragStartedItem.current, 1)[0]

    // Insert the graggedItem into the dropped item position..
    _fruitItems.splice(index, 0, draggedItem)

    setFruitItems([..._fruitItems])
    setItemState({ isHover: false, isDone: true })
    // console.log('drop: ', e)
    // console.log(document.elementFromPoint(e.clientX, e.clientY))
  }
  // When mouse is released OUT OF targets (draggable lists )..
  // remove the border indicator to insert..
  const handleDragEnd = (e) => {
    e.preventDefault()
    if (dragStartedItem.current === null) return
    // console.log('handleDragEnd: ')
    dragStartedItem.current = null
    dragOverItem.current = null
    setItemState({ isHover: false, isDone: true })
  }
  useEffect(() => {
    // console.log('dragOverItem.current: ', dragOverItem.current)
    if (dragOverItem.current === null) return
    const listContainer = document.getElementById(`list-container`)
    for (let i = 0; i < listContainer.childNodes.length; i++) {
      if (dragOverItem.current === i) listContainer.childNodes[i].style.border = '2px dashed black'
      else listContainer.childNodes[i].style.border = 'none'
    }
    // console.log('handleDrop-started:', dragStartedItem.current, ', over: ', dragOverItem.current, ', end:', ', listContainer: ', listContainer)
    dragStartedItem.current = null
    dragOverItem.current = null
  }, [fruitItems])

  // console.log('--app--', itemState)
  return (
    <div className="App">
      <header>
        <h2 className='title'>Fruit Lists</h2>
        <div className="input-row">
          <input type='text' name='fruitName' placeholder='e.g. Banana' value={inputData} onChange={e => setInputData(e.target.value)} />
          <button className='btn btn-primary' onClick={handleAddButton}>Add&nbsp;item</button>
        </div>
      </header>

      {/* Display the kinds of fruit.. */}
      <div id="list-container">
        {
          fruitItems.map((item, index) =>
            <div className="list-item" key={item.id}
              style={(index === dragOverItem.current) ?
                (itemState.isDone ? { border: 'none' } : (dragStartedItem.current > index ? { borderTop: '5px solid red' } : { borderBottom: '5px solid blue' }))
                : { border: 'none' }
              }
              draggable
              onDragStart={e => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={e => e.preventDefault()}
              // onDragLeave={e => handleDragLeave(e, index)}
              onDragEnd={e => handleDragEnd(e)}
              onDrop={(e) => handleDrop(e, index)}
              onClick={e => console.log(e)}
            >
              <i className="fa-solid fa-bars"></i>
              <h3>{item.name}</h3>
            </div>
          )
        }
      </div>
    </div >
  );
}

export default App;
