const Card = (props) => {
	return (
  	<div style={{margin: "1em"}}>
      <img width="80" src={props.avatar_url} />
      <div style={{display: "inline-block", marginLeft: 10}}>
        <div style={{fontWeight: "bold", fontSize: "1.25em"}}>{props.name}</div>
        <div>{props.bio}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	return (
	  	<div>
	  	  {props.cards.map((card) => <Card key={card.id} {...card} />)}
	    </div>
	);
};

// <input type="text" ref={this.inputRef} placeholder="Github username" />

class Form extends React.Component {

	state = {
	  	userName: ""
	};

  handleSubmit = (event) => {
      event.preventDefault();
      axios({
      	url: `https://api.github.com/users/${this.state.userName}`,
        method: "get"
      })
      .then((res) => {
        this.props.onSubmit(res.data);
        this.setState({userName: ""});
      });
  };
  
//   inputRef = (input) => {
//   		this.inputValue = input;
//   }

	updateInput = (event) => {
  	this.setState({
    	userName: event.target.value
    });
  };
  
  handleRemove = (event) => {
  	event.preventDefault();
    this.props.onDelete();
  };

  render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.userName}
          onChange = {this.updateInput}
          placeholder="Github username" />
        <button type="submit">Add Card</button>
        <button onClick={this.handleRemove}>Remove</button>
      </form>
    );
  }
}

class App extends React.Component {
	state = {
  	cards: []
	};
  
  addNewCard = (card) => {
  	this.setState((prevState) => {
    	cards: prevState.cards.push(card)
    });
  };
  
  deleteCard = () => {
  	this.setState((prevState) => {
    	cards: prevState.cards.pop();
    });
  };

  render () {
  	return (
    	<div>
        <Form onSubmit={this.addNewCard} onDelete={this.deleteCard} />
        <CardList cards={this.state.cards}/>
      </div>
  	);
  }
}


ReactDOM.render(<App />, mountNode); 