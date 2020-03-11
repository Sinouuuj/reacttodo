import React, { Component } from 'react';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      items: []
    }
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  onClick = event => {
    if (this.state.title.length > 0) {
      this.state.items.push({
        title: this.state.title,
        id: this.state.items.length + 1
      });

      fetch("http://localhost:3000/todos", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          id: this.state.items.length + 1,
          userId: 11,
          completed: false
        })
      })
        .then(response => response.json())
        // .then(result => {
        //   console.log(result);
        // })

      this.setState({
        title: ''
      })
    }
    event.preventDefault();
  }

  delete = event => {
    fetch("http://localhost:3000/todos/"+this.item.id, {
      method: "DELETE"
    })
    event.preventDefault();
  }

  componentDidMount() {
    fetch("http://localhost:3000/todos", {
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(result => {
        this.setState({
          items: result
        })
      })

    document.title = `${this.state.items.length} todos`
  }

  componentDidUpdate() {
    document.title = `${this.state.items.length} todos`
  }

  render() {
    return(
      <div>
        <h1>Todolist</h1>
        <div className="row">
          <div className="col s4 offset-s4">
            <form>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.title}
                name="valueChange"
                placeholder="Add something"
              />
              <button onClick={this.onClick.bind(this)}>Ajouter</button>
            </form>
          </div>
        </div>
        
        <div id="listContainer">
          <ul className="row">
            {
                this.state.items.map(item => (
                    <li 
                      className="col s4" 
                      key={item.id}
                      id={item.id}
                    >
                        <div class="card blue-grey darken-1">
                          <div class="card-content white-text">
                            <span class="card-title">{item.title}</span>
                            <div>Task for : {item.userId}</div>
                          </div>
                          <div class="card-action">
                            <a href="#">Edit</a>
                            <a href="#" onClick={this.delete.bind(this)}>Delete</a>
                          </div>
                        </div>
                    </li>
                ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default TodoList;