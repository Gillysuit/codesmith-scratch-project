import React, { Component } from "react";
import UserCards from "./UserCards";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: [],
      users: [],
      theUserCards: [],
      haveUsersRendered: false
    }
    this.clickClack = this.clickClack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  
  clickClack(e){
      console.log(this.state.inputVal)
    fetch(`http://localhost:3000/api/user/${this.state.inputVal}`)
    // Transform the data into json
    .then(response => {
      return response.json();
    })
    .then((users) => this.setState({ users})
    )
    .catch( err => console.log(err));
    /* SET back to false and clear users obj and cards */
    if(this.state.haveUsersRendered === true) {
      this.setState({haveUsersRendered: false});
      this.resetState();
    }

  }

  handleChange(e){
    this.setState({ inputVal: e.target.value });
  }

  resetState(){
    this.setState({
      inputVal: [],
      users: [],
      theUserCards: [],
      haveUsersRendered: false
    })
  }

  componentDidUpdate(){
    if(this.state.users.length >= 1 && this.state.haveUsersRendered === false){
      const theUserCards = [];
      for (let i = 0; i < this.state.users.length; i += 1) {
        theUserCards.push(<UserCards key={i} userObj={this.state.users[i]} />)
    }
    this.setState({theUserCards: theUserCards, haveUsersRendered: true});
 }

}

  render(){
    return(
      <div>
        <input onChange={(e) => this.handleChange(e)} placeholder={'Username'}></input> 
        <button onClick={(e) => this.clickClack(e) }>Search</button>
        {this.state.theUserCards}
      </div>
    )
  }
}

export default Search;