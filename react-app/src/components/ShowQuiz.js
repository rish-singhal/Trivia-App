import React, { Component } from 'react';
import './ShowQuiz.css';


class ShowQuiz extends Component {
   constructor(props) {
	    super(props);
	    this.state = {
	      data: [],
        quesd: [],
	      idd: 1,
        qid: 0,
        qnum:-1,
        ansc:0,
        score:-1,
        cc:0,
        pro : 0
	    }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLChange = this.handleLChange.bind(this);
        this.handleCC = this.handleCC.bind(this);
        this.componentDidMountQues = this.componentDidMountQues.bind(this);
        this.handleQQChange = this.handleQQChange.bind(this);
        this.handleQ2Change = this.handleQ2Change.bind(this);
	  }

  componentDidMount() {
	   const request = new Request('http://127.0.0.1:8080/quizzes/');
	    fetch(request)
	      .then(response => response.json())
	        .then(data => this.setState({data: data}));
	  }
 
  componentDidMountQues(event) {
   event.preventDefault();
   this.setState({pro : 1});
      fetch(`http://localhost:8080/quizzes/${this.state.qid}`, {
       method: 'GET',
   })
        .then(response => response.json())
          .then( data => this.setState({quesd: data}));
    }

handleSubmit (event) {
    event.preventDefault();
  this.state.quesd.map(function(item, key) {
       if(this.state.qnum+1==key)  this.setState({cc : item.answer});
  },this)
  if (this.state.cc==this.state.ansc) this.setState({ score : this.state.score + 1});
  if (this.state.qnum==this.state.quesd.length-1)  this.setState({pro : 2});
  this.setState({ qnum : this.state.qnum + 1});   
}


  handleChange(event) {
  	this.setState({idd : event.target.value});
  }

  handleLChange(event) {
    this.setState({qid : event.target.value});
  }

  handleQQChange(event){
     this.setState({ansc : event.target.value});
  }

  handleQ2Change(event){
     this.setState({ansc : this.state.ansc ^ event.target.value});
  }

  handleCC(event){
    event.preventDefault();
    this.setState({ansc : 0});
    this.setState({qnum : 0});
    this.setState({score : 0});
    this.setState({pro : 0});
    this.setState({cc : 0});
  }
 


  render() {
    if(this.state.pro==0){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select a Quiz to play!!</h1>
        </header>
        <br></br>
       <form onSubmit={this.componentDidMountQues}>
        <select name="quizname" onChange={this.handleLChange}>
        <option >None</option>
 {this.state.data.map(function(item, key) {
  return (
  
    <option value={item.id}  >{item.qname}</option>
 
      )
             },this)} 
              </select><br></br><br></br>
       <button type="submit" className="btn btn-default">Play</button>
       </form>
      </div>
    );
  }

else if(this.state.pro==1){
  return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">Game</h1>
        </header>
        <br></br><br></br>
          <form onSubmit={this.handleSubmit}>
          {this.state.quesd.map(function(item, key) {
            if(this.state.qnum==key) return (
               <div className="form-group">
                <h1>Q {key+1}: {item.question} </h1>
                    <pre>  
              {(() => {
        if(item.qtype==0) {
          return (
           <div className="form-group">
              < input type="radio" name="opt" value="1" checked={this.state.ansc =="1"} onChange={this.handleQQChange}/> {item.option1}<br></br><br></br>
              < input type="radio" name="opt" value="2" checked={this.state.ansc== "2"} onChange={this.handleQQChange}/> {item.option2}<br></br><br></br>
              < input type="radio" name="opt" value="3"  checked={this.state.ansc == "3"} onChange={this.handleQQChange}/> {item.option3}<br></br><br></br>
              < input type="radio" name="opt" value="4" checked={this.state.ansc == "4"}  onChange={this.handleQQChange}/> {item.option4}
          </div>
          );
        }
        else {
          return (
           <div className="form-group">
              < input type="checkbox" value="1" name="1" onChange={this.handleQ2Change}/> {item.option1}<br></br><br></br>
              < input type="checkbox" value="2" name="2" onChange={this.handleQ2Change}/> {item.option2}<br></br><br></br>
              < input type="checkbox" value="4" name="3" onChange={this.handleQ2Change}/> {item.option3}<br></br><br></br>
              < input type="checkbox" value="8" name="4" onChange={this.handleQ2Change}/> {item.option4}
          </div>
          );
        }
      })()}
              </pre>
                </div>
                )
         else if(this.state.qnum==-1 && key==0) return (
             <div className="form-group">
             <h1> Click Next To Start ;) </h1> 
             </div>  
            )
             },this)}          
       <button type="submit" className="btn btn-default">Next</button>
       </form>
    </div>
  )
}

else {
  
  return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">Game</h1>
        </header>
        <br></br><br></br>
        <form onSubmit={this.handleCC}>
        <h1>You Scored {100*(this.state.score/this.state.quesd.length)} points</h1>
        <br></br>
        <button type="submit" className="btn btn-default" >Play Again!</button>
        </form>
    </div>
  )

}
}
}


export default ShowQuiz;
