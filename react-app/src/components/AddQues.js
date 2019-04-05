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
        qtyyp: 0,
        ss: 1,
       formData: {
        quizid:"0",
        question:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        qtype:"0",
        answer:"",
      },
	      submitted : false
	    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleQQChange = this.handleQQChange.bind(this);
        this.handleQ2Change = this.handleQ2Change.bind(this);
        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleQuChange = this.handleQuChange.bind(this);
        this.handleQtChange = this.handleQtChange.bind(this);
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
   this.state.formData.quizid = event.target.value;
      fetch(`http://localhost:8080/quizzes/${event.target.value}`, {
       method: 'GET',
   })
        .then(response => response.json())
          .then(data => this.setState({quesd: data}));
    }


  handleSubmit (event) {
   event.preventDefault();
    fetch('http://localhost:8080/addques', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          this.setState({quizid:""});
          this.setState({question:""});
          this.setState({option1:""});
          this.setState({option2:""});
          this.setState({option3:""});
          this.setState({option4:""});
          this.setState({qtype:""});
          this.setState({answer:""});
      });
  }


  handleChange(event) {
  	this.setState({idd : event.target.value});
  }

  handleQuChange(event){
    this.setState({ss : event.target.value});
    this.state.formData.question = event.target.value;
    
  }

  handleO1Change(event){
    this.setState({ss : event.target.value});
     this.state.formData.option1 = event.target.value;
  }
  
  handleO2Change(event){
     this.setState({ss : event.target.value});
     this.state.formData.option2 = event.target.value;
  }

  handleO3Change(event){
     this.setState({ss : event.target.value});
     this.state.formData.option3 = event.target.value;
  }

  handleO4Change(event){
     this.state.formData.option4 = event.target.value;
  }

  handleQtChange(event){
     this.setState({qtyyp : event.target.value});
     this.state.formData.qtype = event.target.value;
  }

  handleQQChange(event){
     this.setState({ss : event.target.value});
     this.state.formData.answer = event.target.value;
  }

  handleQ2Change(event){
     this.setState({ss : event.target.value});
     this.state.formData.answer ^= event.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Add Question</h1>
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
                <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
           <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQuChange}/>
            </div>
            <pre>
            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.option1} onChange={this.handleO1Change}/>
            </div>
            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.option2} onChange={this.handleO2Change}/>
            </div>
            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.option3} onChange={this.handleO3Change}/>
            </div>
            <div className="form-group">
                <label>Option 4</label>
                <input type="text" className="form-control" value={this.state.option4} onChange={this.handleO4Change}/>
            </div>
            </pre>
            <div className="form-group">
            <select name="quizname" onChange={this.handleQtChange}>
            <option value="0">Single Correct</option>
            <option value="1">Multiple Correct</option>
            </select>
            </div>
            Correct Answer: 
            <pre>  
              {(() => {
        if(this.state.qtyyp==0) {
          return (
           <div className="form-group">
              < input type="radio" name="opt" value="1"  onChange={this.handleQQChange}/> Option 1<br></br><br></br>
              < input type="radio" name="opt" value="2"  onChange={this.handleQQChange}/> Option 2<br></br><br></br>
              < input type="radio" name="opt" value="3"  onChange={this.handleQQChange}/> Option 3<br></br><br></br>
              < input type="radio" name="opt" value="4"  onChange={this.handleQQChange}/> Option 4
          </div>
          );
        }
        else {
          return (
           <div className="form-group">
              < input type="checkbox" value="1" name="1" onChange={this.handleQ2Change}/> Option 1<br></br><br></br>
              < input type="checkbox" value="2" name="2" onChange={this.handleQ2Change}/> Option 2<br></br><br></br>
              < input type="checkbox" value="4" name="3" onChange={this.handleQ2Change}/> Option 3<br></br><br></br>
              < input type="checkbox" value="8" name="4" onChange={this.handleQ2Change}/> Option 4
          </div>
          );
        }
      })()}
              </pre>
                <button type="submit" className="btn btn-default">Add Question</button><br></br><br></br>
          </form>
        </div>

      </div>
    );
  }
}

export default DeletePerson;
