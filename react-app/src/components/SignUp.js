import React, { Component } from 'react';
import './SignUp.css';

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        name: "",
        passwd: "",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/signup', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          this.setState({name:""});
          this.setState({username:""});
          this.setState({passwd:""});
      });
  }

  handleFChange(event) {
    this.state.formData.username = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.passwd = event.target.value;
  }
  handleNChange(event) {
    this.state.formData.name = event.target.value;
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
           <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.passwd} onChange={this.handleLChange}/>
            </div>
                <button type="submit" className="btn btn-default">Sign Up</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              SignUp Successful. Move to Login. :)
            </h2>
          </div>
        }
      </div>
    );
  }
}

export default NewPerson;
