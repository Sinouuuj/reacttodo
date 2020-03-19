import React, { PureComponent } from 'react';

class TodoList extends PureComponent {

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
    const { title, items } = this.state;
    
    if (title) {
      fetch("http://localhost:3000/todos", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          id: Math.random(),
          userId: 11,
          completed: false
        })
      })
        .then(response => response.json())

      const nextState = [...items, {title: title, userId: null, completed: false, id: Math.random()}];
      this.setState({
        items: nextState,
        title: ''
      });
    }
    event.preventDefault();
  }

  delete = (deleteId) => {

    const { items } = this.state;

    fetch("http://localhost:3000/todos/"+deleteId, {
      method: "DELETE"
    });
    let filteredItems = items.filter(item => {
      return item.id != deleteId
    });
    this.setState({items: filteredItems})
    // console.log(filteredItems)
    // event.preventDefault();
  }

  componentDidMount() {
    
    const {items} = this.state;
    
    fetch("http://localhost:3000/todos", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(result => {
        this.setState({
          items: result
        })
        // console.log(items, 'Component did mount')
      })

    document.title = `${this.state.items.length} todos`
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.items.length !== prevState.items.length) {
      fetch("http://localhost:3000/todos", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(result => {
          this.setState({
            items: result
          })
        })
      // console.log(this.state.items, 'this state items')
      // console.log(prevState.items, 'prevState items')
    }
    

    document.title = `${this.state.items.length} todos`
  }

  // shouldComponentUpdate() {
    
  // }

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
                this.state.items.map((item, i) => (
                    <li 
                      className="col s4" 
                      key={i}
                    >
                        <div className="card blue-grey darken-1">
                          <div className="card-content white-text">
                            <span className="card-title">{item.title}</span>
                            <div>Task for : {item.userId}</div>
                          </div>
                          <div className="card-action">
                            <div>Edit</div>
                            <div onClick={() => this.delete(item.id)}>Delete</div>
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