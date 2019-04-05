import React, { Component } from 'react';
import './CreateQuiz.css';

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        qname: "",
        genre: "",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
     event.preventDefault();
     fetch('http://localhost:8080/crquiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          this.setState({qname:""});
          this.setState({genre:""});
      });
  }

  handleFChange(event) {
    this.state.formData.genre = event.target.value;
  }
  handleNChange(event) {
    this.state.formData.qname = event.target.value;
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
           <div className="form-group">
                <label>Quiz Name</label>
                <input type="text" className="form-control" value={this.state.qname} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.genre} onChange={this.handleFChange}/>
            </div>
                <button type="submit" className="btn btn-default">Create</button>
          </form>
        </div>
        {this.state.submitted &&
          <div>
            <h2>
              Created Successfully :)
            </h2>
          </div>
        }
      </div>
    );
  }
}

export default NewPerson;
