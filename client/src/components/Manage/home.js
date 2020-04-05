
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import fire from "../../config/fire"
import Manage from "../../pages/manage"
import logomanage from './logomanage.png';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adminAuth: ['ikUDoCnJfgRrhD00SMFOOzfvaK43', 'Wv4DvXf3jhScMkVfF1eth2mW4CV2', 'WUCKiKRdLXS4EsYmDFiHGXPIpU93'],
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((adminAuth) => {
            if (adminAuth) {
                this.setState({ adminAuth });
                console.log(adminAuth);
            }
            else {
                this.setState({ adminAuth: null });
            }
        });
    }


    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => { }).catch((error) => {
                console.log(error);
            })
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.state.adminAuth) {
            return (
                <div className="App">
                    <Manage></Manage>
                </div>
            )
        }
        return (
            <div className="App signinbackground">
                <div className="sign-in-container">

                    <Container className="mt-5 pb-3">
                        <img className="sign-in-logo"
                            src={logomanage}
                            alt="logo" />
                        <Col>
                            <Form className="text-white signin-form">
                                <FormGroup>
                                    <Label className="sign-in-text" for="userEmail">Username</Label>
                                    <Input type="email" value={this.state.email} onChange={this.handleInputChange} name="email" id="userEmail" placeholder="Enter your email here" />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="sign-in-text" for="userPassword">Password</Label>
                                    <Input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" id="userPassword" placeholder="Password here" />
                                </FormGroup>

                                <Button className="signin-btn" color="primary" onClick={this.login}>Login</Button>

                            </Form>
                        </Col>


                    </Container>
                </div>

            </div>
        )
    };
}

export default Home;