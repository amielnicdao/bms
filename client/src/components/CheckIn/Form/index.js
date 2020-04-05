import React from 'react'
import axios from 'axios';
import List from "../../List";
import ListItem from "../../ListItem";
import fire from '../../../config/fire'
// import Buttons from '../Buttons'
// import { Button, ButtonGroup } from 'reactstrap';
import './index.css';
import maginifying from './maginifying.png'
import fitbmslogo from './fitbmslogo.png';
import classes from './Video.module.css';
import './Video.css'



class CheckinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      name: "",
      purpose: "",
      search: ""
    }

  };
  componentDidUpdate() {
    console.log("new state", this.state)
  }

  componentDidMount() {
    this.loadMembers();
  };
  loadMembers() {
    axios.get('/getmembers')
      .then((response) => {
        console.log("members", response)
        this.setState({ members: response.data.members })
      })
  }
  // renderMember() {
  //   return this.state.members.map(member => (
  //     <div key={member.id}>
  //       {member.firstName + " " + member.lastName}
  //     </div>
  //   ))
  // }

  logout = () => {
    fire.auth().signOut();
    window.location.href = "/checkin"
  }

  select = (field) => {
    return (e) => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleInputChange = (event, data) => {
    // e.preventDefault();
    this.setState({
      name: event.target.value,
      purpose: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);
    const signIn = {
      name: this.state.name,
      purpose: this.state.purpose
    };
    console.log("session post data", signIn);

    axios.post(`/signin`, signIn)
      .then(res => {
        console.log("checkin session res", res);
      })
  }

  updateSearch(event) {
    console.log(event.target.value)
    this.setState({ search: event.target.value.substr(0, 25) })
  }

  checkedIn() {
    alert("You've been checked in!")
  }

  render() {
    let filteredList = this.state.members.filter(
      (member) => {
        return member.firstName.toLowerCase().indexOf(this.state.search) === 0;
      }
    );
    const videoSource = "http://myholyname.org/Claudia-testarea/nicoles/images/fitbms.mp4"

    return (
      <div>
        <div className={classes.Container} >
          <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
            </video>

          <div className={classes.Content}>
            <div className={classes.SubContent} >
              <img className="fitlogo"
                src={fitbmslogo}
                alt="profile" />
              <form onSubmit={this.handleFormSubmit}>
                <div>
                  <div className="searchBar">
                    <input type="text" className="search" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search Your Name..."></input>
                  </div>
                  <div className="name-container">
                    {this.state.members.length ? (

                      <List classname="list-names">
                        {filteredList.map(member => {
                          return (
                            <ListItem key={member.id}>
                              <strong>
                                {member.firstName} {member.lastName}
                              </strong>
                              <button type="button" onClick={this.select("name")} value={member.firstName + " " + member.lastName}>Thats me!</button>
                              <button type="button" onClick={this.select("purpose")} value="Trainer">Trainer</button>
                              <button type="button" onClick={this.select("purpose")} value="Class">Class</button>
                            </ListItem>
                          );
                        })}
                      </List>
                    ) : (
                        <h3>No Results to Display</h3>
                      )}
                  </div>
                </div>
                {/* <Buttons></Buttons> */}
                <button className="check-me-in-btn" type="submit">Check Me In!</button>
                <br></br>
                <button className="signout-btn" type="submit" href="" onClick={this.logout}>Sign Out</button>
              </form>

            </div>
          </div>
        </div>

      </div>
    )
  }

}

export default CheckinForm