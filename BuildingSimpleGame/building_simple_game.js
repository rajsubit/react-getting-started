// import _ from lodash;


const Stars = (props) => {
	const numberOfStars = 1 + Math.floor(Math.random(9) * 9);
	// let stars = [];
	// for (let i=0;i<numberOfStars;i++) {
	// stars.push(<i key={i} className="fa fa-star"></i>);
	// }
	return (
  	// <div className="col-5">
  	// {stars}
  	// </div>
    <div className="col-5">
      {_.range(1, numberOfStars).map(i => 
      	<i key={i} className="fa fa-star"></i>
      )}
    </div>
  );
};

const Button = (props) => {
	return (
  	<div className="col-2">
      <button>=</button>
    </div>
  );
};

const Answer = (props) => {
	return (
  	<div className="col-5">
      <span>1</span>
      <span>2</span>
    </div>
  );
};

const Numbers = (props) => {
	// const numberArray = _.range(1, 10);
	return (
  	// <div className="card text-center">
  	// <div>
  	// {numberArray.map((number, i) =>
  	// <span key={i}>{number}</span>	
  	// )}
  	// </div>
  	// </div>
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
        	<span key={i}>{number}</span>	
        )}
      </div>
    </div>
  );
};

// since value of number range is constant pass it to use for all Number instance
Numbers.list = _.range(1, 10);

class Game extends React.Component {
	render() {
  	return (
    	<div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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