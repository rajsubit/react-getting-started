//import _ from "lodash";

// possibleCombinationSum
// bit.ly/s-pcs

var possibleCombinationSum = function(arr, n) {

  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }

  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {	
	return (
    <div className="col-5">
      {_.range(1, props.numberOfStars+1).map(i => 
      	<i key={i} className="fa fa-star"></i>
      )}
    </div>
  );
};


const Button = (props) => {
	let button;
  
	button = props.answerIsCorrect === true
		? <button className="btn btn-success" onClick={props.acceptAnswer}><i className="fa fa-check"></i></button>
    : props.answerIsCorrect === false
    	? <button className="btn btn-danger"><i className="fa fa-times"></i></button>
      :  <button className="btn btn-primary" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>;
	return (
  	<div className="col-2 text-center">
      {button}
      <br /><br />
      <button
	      	className="btn btn-warning btn-sm"
	        onClick={props.redraw}
	        disabled={props.numberOfRedraws === 0} >
        <i className="fa fa-refresh"></i>
        {props.numberOfRedraws}
       </button>
    </div>
  );
};


const Answer = (props) => {
	return (
  	<div className="col-5">
      {props.selectedNumbers.map((number, i) =>
      	<span key={i} onClick={()=> props.unSelectNumber(number)}>{number}</span>
      )}
    </div>
  );
};


const Numbers = (props) => {
	const numberClassName  = (number) => {
  	 if(props.usedNumbers.indexOf(number) >= 0){
    	return "used";
    }
    if(props.selectedNumbers.indexOf(number) >= 0){
    	return "selected";
    }
  }

	return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
        	<span
        			key={i}
	        		className={numberClassName(number)}
	            onClick={() => props.selectNumber(number)}>
            {number}
           </span>	
        )}
      </div>
    </div>
  );
};

Numbers.list = _.range(1, 10);


const DoneFrame = (props) => {
	return (
  	<div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.reset}>Play Again</button>
    </div>
  );
}


class Game extends React.Component {
  static RandomNumber = () => 1 + Math.floor(Math.random(9) * 9);
  static initialState = () => ({
  	selectedNumbers: [],
    usedNumbers: [],
    numberOfStars: Game.RandomNumber(),
    answerIsCorrect: null,
    numberOfRedraws: 5,
    doneStatus: null
  });

	state = Game.initialState();
  
  resetGame = () => this.setState(Game.initialState());
  
  selectNumber = (clickedNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0){return;}
  	if (this.state.usedNumbers.indexOf(clickedNumber) >= 0){return;}
  	this.setState((prevState) => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  
  unSelectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
      answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers
      	.filter(number => number !== clickedNumber)
    }));
  };
  
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.numberOfStars === 													 
      	prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };
  
  acceptAnswer = () => {
  	this.setState(prevState =>({
    	answerIsCorrect: null,
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      numberOfStars: Game.RandomNumber(),
    }), this.updateDoneStatus);
  };
  
  redraw = () => {
  	if (this.state.numberOfRedraws === 0){return;}
  	this.setState(prevState => ({
    	numberOfStars: Game.RandomNumber(),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfRedraws: prevState.numberOfRedraws - 1
    }), this.updateDoneStatus);
  };
  
  possibleSolutionsLeft = ({numberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1, 10).filter(number => 
    	usedNumbers.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  };
  
  updateDoneStatus = () => {
  	this.setState(prevState => {
    	if (prevState.usedNumbers.length === 9) {
      	return {doneStatus: "Done. Nice !!"};
      }
      if (prevState.numberOfRedraws === 0 && !this.possibleSolutionsLeft(prevState)) {
      	return {doneStatus: "Game Over !!"};
      }
    });
  };

	render() {
  	const {selectedNumbers, usedNumbers, numberOfStars, answerIsCorrect, numberOfRedraws, doneStatus} = this.state;
  	return (
    	<div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            answerIsCorrect={answerIsCorrect}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            numberOfRedraws={numberOfRedraws}
            redraw={this.redraw}
            updateDoneStatus={this.updateDoneStatus} />
          <Answer
            selectedNumbers={selectedNumbers}
            unSelectNumber={this.unSelectNumber} />
        </div>
        <br />
        {doneStatus
        	? <DoneFrame doneStatus={doneStatus} reset={this.resetGame}/>

          : <Numbers
          selectedNumbers={selectedNumbers}
          selectNumber={this.selectNumber}
          usedNumbers={usedNumbers} />
        }
      </div>
    );
  }
}


class App extends React.Component {
	render() {
  	return (
    	<div>
        <Game />
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode); 
