import React, { Component } from 'react';
import './App.css';
import styles from "./data/styles.json";
class App extends Component {

   constructor(props){
      super(props);

      this.state = {
         "isCorrect": undefined,
         "num1": undefined,
         "num2": undefined,
         "difficulty": 0,
         "result": undefined
      }

      this.updateQuestion = this.updateQuestion.bind(this);
      this.checkAnswer = this.checkAnswer.bind(this);
      this.pressKey = this.pressKey.bind(this);
      this.deleteKey = this.deleteKey.bind(this);
      this.setUserStyles = this.setUserStyles.bind(this);
   }

   componentDidMount(){
      this.updateQuestion();
   }

   pressKey(value){
      this.setState((prevState, props) => {
         return {
            "isCorrect": undefined,
            "userAnswer": prevState.userAnswer !== undefined ? prevState.userAnswer + value  + "": value + ""
         }
      });
   }

   deleteKey(){
      this.setState((prevState, props) => {
         return {
            "userAnswer": undefined
         }
      });
   }

   updateQuestion(){
      var num1 = Math.round(Math.random() * this.state.difficulty);
      var num2 = Math.round(Math.random() * this.state.difficulty);

      this.setState((prevState, props) => {
         return {
            "isCorrect": undefined,
            "num1": num1,
            "num2": num2,
            "result": num1*num2,
            "userAnswer": undefined
         }
      });
   }

   checkAnswer(){
      if(parseInt(this.state.userAnswer, 10) === this.state.result){
         this.setState({"difficulty": this.state.difficulty + 1})
         this.updateQuestion();
         console.log("Stepping up the Difficulty");
      }else{
         this.setState({
            "isCorrect": "Incorrect",
            "difficulty": this.state.difficulty - 1,
            "userAnswer": undefined
         });
      }
   }

   setUserStyles(e){
      var user = e.target.options[e.target.selectedIndex].value;
      var userStyle = styles[user];

      document.body.style.backgroundColor = userStyle["style-1"]

      var userAnswerSection = document.getElementsByClassName("user-answer")[0]
      userAnswerSection.style["color"] = userStyle["style-5"];
      userAnswerSection.style["background-color"] = userStyle["style-4"];

      var appHeaderSection = document.getElementsByClassName("App-header")[0]
      appHeaderSection.style["color"] = userStyle["style-4"];
      appHeaderSection.style["background-color"] = userStyle["style-6"];

      var questionSection = document.getElementsByClassName("equation")[0]
      questionSection.style["background-color"] = userStyle["style-4"];
      questionSection.style["color"] = userStyle["style-5"];
   }

   render() {
      return (
         <div className="App">
            <header className="App-header">
               <h1 className="App-title">Family Math Drill</h1>
               <div>
                  <label>User: </label>
                  <select id="current-user" onChange={this.setUserStyles}>
                     <option value="mom">Default</option>
                     <option value="mom">Mom</option>
                     <option value="augs">August</option>
                  </select>
               </div>
            </header>
            <div className="question-answer">
               <div className="question">
                  <div className="equation">
                     <span className="operand">{this.state.num1}</span>
                     <span className="operation">*</span>
                     <span className="operand">{this.state.num2}</span>
                  </div>
                  <div className="keyboard">
                     <div>
                        <button onClick={this.pressKey.bind(null, 1)}>1</button>
                        <button onClick={this.pressKey.bind(null, 2)}>2</button>
                        <button onClick={this.pressKey.bind(null, 3)}>3</button>
                     </div>
                     <div>
                        <button onClick={this.pressKey.bind(null, 4)}>4</button>
                        <button onClick={this.pressKey.bind(null, 5)}>5</button>
                        <button onClick={this.pressKey.bind(null, 6)}>6</button>
                     </div>
                     <div>
                        <button onClick={this.pressKey.bind(null, 7)}>7</button>
                        <button onClick={this.pressKey.bind(null, 8)}>8</button>
                        <button onClick={this.pressKey.bind(null, 9)}>9</button>
                     </div>
                     <div>
                        <button onClick={this.deleteKey}>&#x2718;</button>
                        <button onClick={this.pressKey.bind(null, 0)}>0</button>
                        <button onClick={this.checkAnswer}>&#x2714;</button>
                     </div>
                  </div>
               </div>
               <div className="answer">
                  <div className="user-answer">
                     <div>{this.state.userAnswer}</div>
                  </div>
                  <div>{this.state.isCorrect}</div>
               </div>
            </div>
         </div>
      );
   }
}

export default App;
