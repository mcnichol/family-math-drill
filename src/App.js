import React, { Component } from 'react';
import './App.css';
class App extends Component {

   constructor(props){
      super(props);
      this.state = {
         "isCorrect" : null,
         "num1" : null,
         "num2" : null,
         "difficulty" : 0,
         "result" : null
      }

      this.updateQuestion = this.updateQuestion.bind(this);
      this.checkAnswer = this.checkAnswer.bind(this);
      this.pressKey = this.pressKey.bind(this);
   }

   componentDidMount(){
      this.updateQuestion();
   }

   pressKey(value){
      this.setState((prevState, props) => {
         return {
            "userAnswer": prevState.userAnswer !== undefined ? prevState.userAnswer + value  + "" : value + ""
         }
      });
   }

   updateQuestion(){
      var num1 = Math.round(Math.random() * this.state.difficulty);
      var num2 = Math.round(Math.random() * this.state.difficulty);

      this.setState((prevState, props) => {
         return {
            "isCorrect": null,
            "num1" : num1,
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
            "isCorrect" : "Incorrect",
            "difficulty": this.state.difficulty - 1
         });
      }
   }

   render() {
      return (
         <div className="App">
            <header className="App-header">
               <h1 className="App-title">Family Math Drill</h1>
            </header>
            <div className="question-answer">
               <div>
                  <div className="equation">
                     <span className="operand">{this.state.num1}</span>
                     <span className="operation">*</span>
                     <span className="operand">{this.state.num2}</span>
                  </div>
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
                     <button >&#x2718;</button>
                     <button onClick={this.pressKey.bind(null, 0)}>0</button>
                     <button onClick={this.checkAnswer}>&#x2714;</button>
                  </div>
               </div>
               <div className="userAnswer">
                  {this.state.userAnswer}
               </div>
            </div>
         </div>
      );
   }
}

/*
 * X Show user an equation
 * - User can enter an answer
 * - App will tell user if they are correct or incorrect
 *    - If incorrect, displays message "Try Again"
 *    - If correct, show user a new equation
 *
 * List of Stuff to deal with:
 * - Users don't like double-tap issue on iPad
 * - Need Delete Key
 * - Adjustable Answer Box
 */
export default App;
