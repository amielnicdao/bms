import React from "react";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import fire from "../config/fire";
//import CheckIn from "./pages/checkIn";
//import Manage from './pages/manage';
import MemberPortalForm from "../components/memberLogIn";
import MemberPage from "../components/memberPage";
//import SelectPage from "./pages/selectPage";

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


// import React, { Component } from 'react';
// import { Button, Form, FormGroup, Label, Input, FormText,Container, Col} from 'reactstrap';
// import fire from '../config/fire';

// class MemberPortal extends Component{
//     constructor(props){
//         super(props);
       
//         this.state = {
//             email: '',
//             password : ''
//         }
//     }
    
    

//     login = (e) =>{
//         e.preventDefault();
//         fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
//         .then((u) => {}).catch((error) => {
//             console.log(error);
//         })
//     }

//     signUp = (e) =>{
//         e.preventDefault();
//         fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
//         .catch((error) => {
//             console.log(error);
//         })

//     }

//     handleInputChange = (e) => {
//         this.setState({ [e.target.name] : e.target.value});
//     }


//     render() {
//         return(
//             <Container className="border mt-5 pb-3">
//                 <h1>Sign In</h1>
//                     <Col>
//                         <Form className="text-white">
//                         <FormGroup>
//                             <Label for="userEmail">Username</Label>
//                             <Input type="email" value={this.state.email} onChange={this.handleInputChange} name="email" id="userEmail" placeholder="Enter your email here" />
//                             <FormText>99% sure that your email is your username</FormText>
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="userPassword">Password</Label>
//                             <Input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" id="userPassword" placeholder="Password here" />
//                         </FormGroup>
                        
//                         <Button color="primary" onClick={this.login}>Login</Button>
//                         </Form>
//                         <h2>Click here to signup</h2>
//                         <Button onClick={this.signUp}>SignUp</Button>
//                     </Col>
                    
                    
//             </Container>
//         )
//     }
// }

// export default MemberPortal;