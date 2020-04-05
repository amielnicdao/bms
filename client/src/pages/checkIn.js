import React, { Component } from 'react';
import CheckInForm from '../components/CheckIn/Form'
import Video from '../components/Video/Video'

class CheckIn extends Component {
    render() {
        return (
            <div>
                <Video></Video>
                <CheckInForm></CheckInForm>
            </div>
        )
    }
}

export default CheckIn