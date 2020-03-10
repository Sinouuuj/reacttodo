import React, { useState, useEffect } from 'react';

const listItems = [];

function Todolist() {

    const [valueChange, setValueChange] = useState('');

    const handleChange = (event) => {
        setValueChange(event.target.value);
    }

    const onClick = (event) => {
      if (valueChange.length > 0) {
        listItems.push({name: valueChange, key: Math.random()});
        setValueChange('');
      }
      event.preventDefault();
    }

    useEffect(() => {
        document.title = listItems.length > 0 ? `${listItems.length} Todos` : `TodoList`;

        console.log(listItems)

        fetch("https://jsonplaceholder.typicode.com/todos/", {
          method: 'GET',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(response => response.json())
          .then(result => listItems.push(result))
    });


    return (
        <div>
        <h1>Todo list</h1>
        <form>
          <input
            onChange={handleChange}
            type="text"
            value={valueChange}
            name="valueChange"
            placeholder="Add something"
          />
        <button onClick={onClick.bind(this)}>Ajouter</button>
        </form>
        <div id="listContainer">
          <ul>
            {
                listItems.map(listItem => (
                    <li key={listItem.key}>
                        {listItem.name}
                    </li>
                ))
            }
          </ul>
        </div>
      </div>
    )
}

export default Todolist;