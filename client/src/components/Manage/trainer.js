import React, { Component } from "react";
import axios from 'axios';
import './manage.css';
import maginifying from './maginifying.png'
import {
  Card, CardText, CardBody, Button
} from 'reactstrap';

class Trainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainers: [],
      firstName: "",
      lastName: "",
      phoneNum: "",
      search: "",
      profilePic: ""
    }
  };
  componentDidMount() {
    this.loadTrainers();
  }
  loadTrainers = () => {
    axios.get('/trainers')
      .then((response) => {
        console.log(response)
        this.setState({ trainers: response.data.trainers })
      })
  };
  renderTrainer = () => {
    let filteredList = this.state.trainers.filter(
      (member) => {
        return member.firstName.toLowerCase().indexOf(this.state.search) === 0;
      }
    );
    return filteredList.map(trainer => (
      <div key={trainer.id}>
        <Card className="trainer-card">
          <CardBody>
            <img className="trainerPic" width="40%" src={trainer.profilePic} alt="Card image cap" />
            <CardText className="trainer-name"><strong>{trainer.firstName} {trainer.lastName}</strong>
              <br></br>
            </CardText>
            <CardText className="trainer-text">
              Phone: {trainer.phoneNum}
            </CardText>
            <br></br>
            <br></br>
            <br></br>
            <Button className="trainer-button" color="info" type="submit"><a className="button-text" href="/manage/classes">Assign to a Class</a></Button>
            <Button className="trainer-button" color="warning" type="submit"><a className="button-text" href="/manage/classes">See Classes</a></Button>
          </CardBody>
        </Card>
      </div>
    ))
  };


  updateSearch(event) {
    console.log(event.target.value)
    this.setState({ search: event.target.value.substr(0, 25) })
  }

  render() {

    return (
      <div className="trainers-container">
        <h1>TRAINERS</h1>

        <hr className="title-hr"></hr>

        <div className="searchBar">
          <img className="search-icon"
            width="30px"
            src={maginifying}
            alt="search" />
          <input className="search" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search Trainers..."></input>
        </div>

        {this.renderTrainer()}
      </div>
    )
  }
}
export default Trainers;