import React from "react";
import fire from "../config/fire";
import MemberPortalForm from "../components/memberLogIn";
import MemberPage from "../components/memberPage";

class MemberPortal extends React.Component {

  state = {
    user : {}
  }

  componentDidMount(){
    this.authListener();
  }
  
  authListener(){
      fire.auth().onAuthStateChanged((user) => {
          if(user){
            this.setState({user});
            console.log(user);
          }
          else{
            this.setState({user: null});
          }
      });
  }
  
  
  render() {
    if(this.state.user){
      return(
        <div className="App">
            <MemberPage/>
        </div>
        )
    }
    return(
    <div className="App">
        <MemberPortalForm/>
    </div>
    )
  };}

export default MemberPortal;


