import React, { Component } from 'react';
import './DeleteQues.css';


class DeletePerson extends Component {
   constructor(props) {
	    super(props);
	    this.state = {
	      data: [],
        quesd: [],
	      idd: 1,
        quizid: 1,
	      submitted : false
	    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMountQues = this.componentDidMountQues.bind(this);
	  }

  componentDidMount() {
	   const request = new Request('http://127.0.0.1:8080/quizzes/');
	    fetch(request)
	      .then(response => response.json())
	        .then(data => this.setState({data: data}));
	  }
  componentDidMountQues(event) {
   event.preventDefault();
      fetch(`http://localhost:8080/quizzes/${event.target.value}`, {
       method: 'GET',
   })
        .then(response => response.json())
          .then(data => this.setState({quesd: data}));
    }


  handleSubmit (event) {
  	event.preventDefault();
     fetch(`http://localhost:8080/question/${this.state.idd}`, {
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
          <h1 className="App-title">Delete Question</h1>
        </header>
        <br></br>
        <h2>Select Quiz Name</h2>
        <select name="quizname" onChange={this.componentDidMountQues}>
               <option >None</option>
 {this.state.data.map(function(item, key) {
  return (
  
    <option value={item.id}  >{item.qname}</option>
 
      )
             },this)} 
              </select>

              <br></br>
              <br></br>
        <form onSubmit={this.handleSubmit}>
        <table className="table-hover" align="center">
          <thead>
            <tr>
              <th>Select</th>
              <th>Question</th>
            </tr>
          </thead> 
          <tbody>
          {this.state.quesd.map(function(item, key) {
               return (
                <tr key = {key}>
                      <td><input type="radio" name="id" value={item.id} checked={this.state.idd == item.id}  onChange={this.handleChange}/></td>
                      <td>{item.question}</td>
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
