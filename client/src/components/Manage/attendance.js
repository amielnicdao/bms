import React, { Component } from "react";
import axios from 'axios';
import './manage.css';
import fire from '../../config/fire'
import moment from 'moment'
import { Card, CardTitle, CardText, Row } from 'reactstrap';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedIn: []
        }
    };

    componentDidMount() {
        this.loadCheckedInMembers();
    };
    loadCheckedInMembers = () => {
        axios.get('/manage/attendance')
            .then((response) => {
                console.log(response)
                this.setState({ checkedIn: response.data.checkedIn })
            })
    }
    renderCheckedIn = () => {
        return this.state.checkedIn.map(member => (
            <div className="check-in-card" key={member.id}>
                <Card body outline color="info">
                    <CardTitle className="check-title">
                        <h3>{member.name}</h3>
                    </CardTitle>
                    <CardText className="check-text">
                        Purpose: {member.purpose}
                        <br></br>
                        {moment(member.seshTime).format("LLL")}
                    </CardText>
                </Card>
            </div>
        ))
    }
    logout = () => {
        fire.auth().signOut();

    }
    render() {
        return (
            <div className="attendance-container">
                <h1>CHECKED IN MEMBERS</h1>
                <hr className="title-hr"></hr>
                <Row className="check-row">
                    {this.renderCheckedIn()}
                </Row>
            </div>
        )
    }
}

export default Attendance