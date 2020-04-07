import React, { Component } from "react";
import axios from 'axios';
import './manage.css';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, Row
} from 'reactstrap';
import maginifying from './maginifying.png'

class Members extends Component {

  constructor(props) {
    super(props);
    this.state = {
      members: [],
      id: "",
      search: ""
    }

  };
  componentDidMount() {
    this.loadMembers();

  };
  loadMembers = () => {
    axios.get('/getmembers')
      .then((response) => {
        console.log(response)
        this.setState({ members: response.data.members })
      })
  };

  deleteMember = (e, data) => {
    e.preventDefault();
    axios.delete(`/manage/members/id/${data}`)
      .then(res => this.loadMembers())
      .catch(err => console.log(err));
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 5) })
  }

  render() {
    let filteredList = this.state.members.filter(
      (member) => {
        return member.firstName.toLowerCase().indexOf(this.state.search) === 0;
      }
    );
    return (
      <div className="members-container">
        <h1>MEMBERS</h1>

        <hr className="title-hr"></hr>

        <div className="searchBar">
          <img className="search-icon"
            width="30px"
            src={maginifying}
            alt="search" />
          <input className="search" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="   Search Members..."></input>
        </div>

        {this.state.members.length ? (
          <Row>
            {filteredList.map(member => {
              return (

                <Card key={member.id} className="card-container shadow">
                  <CardImg top width="80%" src={member.profilePic} alt="Card image cap" />
                  <CardBody>
                    <CardTitle><strong>{member.firstName} {member.lastName}</strong></CardTitle>

                    <CardText>
                      Phone Number: {member.phoneNum}
                      <br></br>
                      Address: {member.address}
                      <br></br>
                      Emergency Contact: {member.emergName}, {member.emergNum}
                      <br></br>
                    </CardText>
                    <Button color="info" type="submit" onClick={e => this.deleteMember(e, member.id)}>Manage Member</Button>
                  </CardBody>
                </Card>

              );
            })}
          </Row>
        ) : (
            <h3>No Results to Display</h3>
          )}


      </div>
    )
  }
}
export default Members;