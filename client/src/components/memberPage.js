import React, { Component } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Jumbotron, Alert, Media, Button, Form, FormGroup, Label, Input, Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import fire from "../config/fire";
import axios from 'axios';
import moment from 'moment';
import placeholderImage from '../utils/profile-placeholder.jpg';
import List from '../components/List';
import ListItem from '../components/ListItem';
import './memberport.css';
import memlogo from './memlogo.png';
import style from './style.module.css';


class MemberPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            uId: '',
            firstName: '',
            lastName: '',
            bday: '',
            email: '',
            address: '',
            phoneNum: '',
            ePhoneNum: '',
            profilePic: placeholderImage,
            profilePicToChange: '',
            emailToChange: '',
            passwordToChange: '',
            passwordToAuth: '',
            alertMessage: '',
            collapsed: false,
            emailCollapsed: false,
            passwordCollapsed: false,
            alertVisible: false,
            successVisible: false,
            joinVisible: false,
            profileVisibility: "d-none",
            classesVisibility: "d-none",
            landingVisibility: "d-block"
        }
    }

    componentDidMount() {
        this.authListener();
        this.loadClasses();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uId: user.uid });
                this.setState({ email: user.email });
                this.loadMember();
            }
            else {
                this.setState({ user: null });
            }
        });
    }

    logout = () => {
        fire.auth().signOut();
        this.setState({ user: {} });
    }

    loadMember = () => {
        axios.get(`viewmember/id/${this.state.uId}`)
            .then(res => {
                this.setState({ firstName: res.data.member[0].firstName });
                this.setState({ lastName: res.data.member[0].lastName });
                this.setState({ bday: moment(res.data.member[0].bday).format("YYYY-MM-DD") });
                this.setState({ phoneNum: res.data.member[0].phoneNum });
                this.setState({ address: res.data.member[0].address });
                this.setState({ ePhoneNum: res.data.member[0].ePhoneNum });
                this.setState({ profilePic: res.data.member[0].profilePic });
                console.log(res.data.member[0]);
            })
            .catch(err => console.log(err));
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleNavbar = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    toggleEmailUpdate = () => {
        this.setState({ emailCollapsed: !this.state.emailCollapsed, passwordToAuth: '', emailToChange: '' });
    }

    togglePasswordUpdate = () => {
        this.setState({ passwordCollapsed: !this.state.passwordCollapsed, passwordToAuth: '', passwordToChange: '' });
    }

    toggleAlert = () => {
        this.setState({ alertVisible: true }, () => {
            window.setTimeout(() => {
                this.setState({ alertVisible: false })
            }, 5000)
        });

    }

    toggleSuccess = () => {
        this.setState({ successVisible: true }, () => {
            window.setTimeout(() => {
                this.setState({ successVisible: false })
            }, 5000)
        });

    }

    toggleClassJoin = () => {
        this.setState({ joinVisible: true }, () => {
            window.setTimeout(() => {
                this.setState({ joinVisible: false })
            }, 3000)
        });
    }

    toggleClassesVisibility = (event) => {
        event.preventDefault();
        this.loadClasses();
        this.setState({ profileVisibility: "d-none", classesVisibility: "d-block", landingVisibility: "d-none" });
    }

    toggleProfileVisibility = (event) => {
        event.preventDefault();
        this.setState({ profileVisibility: "d-block", classesVisibility: "d-none", landingVisibility: "d-none" });
    }

    updateEmail = () => {
        const pass = this.state.passwordToAuth;
        const email = this.state.emailToChange;
        const this2 = this;
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                fire.auth()
                    .signInWithEmailAndPassword(user.email, pass)
                    .then(function (userCredential) {
                        userCredential.user.updateEmail(email).then(() => {
                            this2.toggleSuccess();
                        }).catch((error) => {
                            this2.setState({ alertMessage: error.message });
                            this2.toggleAlert();
                        });
                    }).catch((error) => {
                        this2.setState({ alertMessage: error.message })
                        this2.toggleAlert();
                    })
            }
            else {
                this2.setState({ user: null });
            }
        });
        this.setState({ emailCollapsed: !this.state.emailCollapsed });
    }

    updatePassword = () => {
        const pass = this.state.passwordToAuth;
        const newPass = this.state.passwordToChange;
        const this2 = this;
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                fire.auth()
                    .signInWithEmailAndPassword(user.email, pass)
                    .then(function (userCredential) {
                        userCredential.user.updatePassword(newPass).then(() => {
                            this2.toggleSuccess();

                        }).catch((error) => {
                            this2.setState({ alertMessage: error.message })
                            this2.toggleAlert();
                        });
                    }).catch((error) => {
                        this2.setState({ alertMessage: error.message })
                        this2.toggleAlert();
                    })
            }
            else {
                this.setState({ user: null });
            }
        });
        this.setState({ passwordCollapsed: !this.state.passwordCollapsed });
    }

    updateProfile = (event) => {
        event.preventDefault();
        const this2 = this;
        const profileUpdate = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            bday: this.state.bday,
            phoneNum: this.state.phoneNum,
            ePhoneNum: this.state.ePhoneNum,
            profilePic: this.state.profilePic,
            uId: this.state.uId
        };
        if (this.state.profilePicToChange !== "")
            profileUpdate.profilePic = this.state.profilePicToChange;
        console.log(profileUpdate);
      
      axios.put(`/updatemember/`, { profileUpdate })
      .then(res => {
          console.log(res);
          this2.setState({profilePic: this2.state.profilePicToChange});
          this2.toggleSuccess();
        }).catch(err => {
            console.log(err);
        })

    }

    loadClasses = () => {
        axios.get('/getclasses')
            .then((response) => {
                console.log(response)
                this.setState({ classes: response.data.classes })
            })
    };

    renderClasses = () => {
        return this.state.classes.map(classList => (
            <Row>
                <div key={classList.id}>
                    {classList.nameOfClass} {classList.classType}
                    {classList.assignedTrainer} {classList.classSize}
                </div>
            </Row>
        ))
    };

    render() {

        return (
            <div>
                <div className={style.Container}>
                    <Nav className={style.sidenav} vertical>
                        <img className={style.logoimg}
                            width="200px"
                            src={memlogo}
                            alt="logo" />
                        <NavItem className={style.navitem}>
                            <NavLink className={style.signout} onClick={this.toggleProfileVisibility}>My Profile</NavLink>
                            <hr></hr>
                        </NavItem>
                        <NavItem className={style.navitem}>
                            <NavLink className={style.signout} onClick={this.toggleClassesVisibility}>Classes</NavLink>
                            <hr></hr>
                        </NavItem>
                        <NavItem className={style.navitem}>
                            <NavLink className={style.signout} onClick={this.logout}>Sign Out</NavLink>
                            <hr></hr>
                        </NavItem>
                    </Nav>
                </div>


                <Alert color="danger" className="fixed-top" isOpen={this.state.alertVisible} toggle={this.state.toggleAlert}>
                    <div>{this.state.alertMessage}</div>
                </Alert>
                <Alert color="success" className="fixed-top" isOpen={this.state.successVisible} toggle={this.state.toggleSuccess}>
                    Update was successful.
            </Alert>
                <Alert color="success" className="fixed-top" isOpen={this.state.joinVisible} toggle={this.state.toggleClassJoin}>
                    Successfully joined the class!
            </Alert>

                <Container className={`mt-5 pb-3 welcome-prof-container ${this.state.landingVisibility}`}>
                    <Jumbotron><h1>Welcome to your FitBMS profile!</h1>
                        <br></br>
                        <hr className="wel-mem-hr"></hr></Jumbotron>
                </Container>

                <Container className={`mem-classes-container border mt-5 pb-3 ${this.state.classesVisibility}`}>
                    <h1>CLASSES</h1>
                    <hr className="title-hr2"></hr>
                    <Row className="class-row">
                        {this.state.classes.map(classUpdate => {
                            return (
                                <Card className="shadow class-card2"
                                    key={classUpdate.id}>
                                    <CardBody>
                                        <CardTitle className="gym-class-title2"><strong>{classUpdate.nameOfClass}</strong></CardTitle>
                                        <CardText className="gym-class-text2">
                                            <strong>Class Type</strong>: {classUpdate.classType}
                                            <br></br>
                                            <strong>Instructor</strong>: {classUpdate.assignedTrainer}
                                            <br></br>
                                            <strong>Class Size</strong>: {classUpdate.classSize}
                                        </CardText>
                                        <Button color="info" className="update-class-btn2" onClick={this.toggleClassJoin}>Join class</Button>

                                    </CardBody>
                                </Card>
                            );
                        })}
                    </Row>
                </Container>

                <Container className={`border profile-container mt-5 pb-3 ${this.state.profileVisibility}`}>
                    <h1>MY PROFILE</h1>
                    <hr className="title-hr2"></hr>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Media
                                className="prof-img"
                                src={this.state.profilePic || placeholderImage}
                                style={
                                    {
                                        maxHeight: 256,
                                        maxWidth: 256,
                                    }} />
                        </Col>
                    </Row>

                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={this.state.firstName || ''}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={this.state.lastName || ''}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={this.state.address || ''}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleDate">Birthday</Label>
                                    <Input
                                        type="date"
                                        name="bday"
                                        id="bday"
                                        value={this.state.bday || ''}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <Input
                                        type="text"
                                        name="phoneNum"
                                        id="phone"
                                        value={this.state.phoneNum || ''}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ePhone">Emergency Phone</Label>
                                    <Input
                                        type="text"
                                        name="ePhoneNum"
                                        id="ePhone"
                                        value={this.state.ePhoneNum || ''}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter emergency phone number here" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="profilepic">Profile Picture Link</Label>
                                    <Input
                                        type="text"
                                        name="profilePicToChange"
                                        id="profilePic"
                                        value={this.state.profilePicToChange || ''}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter link to image source here" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Button className="mt-5 mr-3 ml-3" color="primary" onClick={this.updateProfile}>Update Profile</Button>
                            <Button className="mt-5 mr-3 ml-3" color="warning" onClick={this.toggleEmailUpdate}>Change Email</Button>
                            <Button className="mt-5 mr-3 ml-3" color="secondary" onClick={this.togglePasswordUpdate}>Change Password</Button>
                        </Row>
                    </Form>

                    <Modal isOpen={this.state.emailCollapsed} toggle={this.toggleEmailUpdate}>
                        <ModalHeader>Change Your Email</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="password">Current Password</Label>
                                            <Input
                                                type="password"
                                                name="passwordToAuth"
                                                id="password"
                                                value={this.state.passwordToAuth}
                                                onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="emailToChange">New Email</Label>
                                            <Input
                                                type="email"
                                                value={this.state.emailToChange}
                                                onChange={this.handleInputChange}
                                                name="emailToChange"
                                                id="emailToChange" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="mr-3" color="warning" onClick={this.updateEmail}>Update Email</Button>
                            </Form>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.passwordCollapsed} toggle={this.togglePasswordUpdate}>
                        <ModalHeader>Change Your Password</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="password">Current Password</Label>
                                            <Input
                                                type="password"
                                                name="passwordToAuth"
                                                id="password"
                                                value={this.state.passwordToAuth}
                                                onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="emailToChange">New Password</Label>
                                            <Input
                                                type="password"
                                                value={this.state.passwordToChange}
                                                onChange={this.handleInputChange}
                                                name="passwordToChange"
                                                id="passwordToChange" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="mr-3" color="warning" onClick={this.updatePassword}>Update Password</Button>
                            </Form>
                        </ModalBody>
                    </Modal>



                </Container>

            </div>
        )
    }

}
export default MemberPage;