import React, { Component } from 'react';
import './DeleteQuiz.css';


class DeletePerson extends Component {
   constructor(props) {
	    super(props);
	    this.state = {
	      data: [],
	      idd: 1,
	      submitted : false
	    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
	  }

  componentDidMount() {
	   const request = new Request('http://127.0.0.1:8080/quizzes/');
	    fetch(request)
	      .then(response => response.json())
	        .then(data => this.setState({data: data}));
	  }

  handleSubmit (event) {
  	event.preventDefault();
     fetch(`http://localhost:8080/quizzes/${this.state.idd}`, {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          window.location.reload();
      });
  }


  handleChange(event) {
  	this.setState({idd : event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Quiz</h1>
        </header>
        <br></br>
        <form onSubmit={this.handleSubmit}>
        <table className="table-hover" align="center">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Quiz Name</th>
              <th>Genre</th>
            </tr>
          </thead> 
          <tbody>
          {this.state.data.map(function(item, key) {
               return (
                <tr key = {key}>
                      <td><input type="radio" name="id" value={item.id} checked={this.state.idd == item.id}  onChange={this.handleChange}/></td>
                      <td>{item.id}</td>
                      <td>{item.qname}</td>
                      <td>{item.genre}</td>
                  </tr>
                )
             },this)}          
          </tbody>
       </table>
       <p> 
       </p>
       <button type="submit" className="btn btn-default">Delete</button>
       </form>

      </div>
    );
  }
}

export default DeletePerson;
