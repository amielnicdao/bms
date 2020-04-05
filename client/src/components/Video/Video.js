import React, { Component } from 'react';
import flogo from './flogo.png';
import classes from './Video.module.css';
import './Video.css'
import { Link } from 'react-router-dom';
// import Home from '../Manage/home';
// import ModalExample from '../CheckIn/modal';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Video extends Component {

    // constructor(props) {
    // super(props);
    // this.state = {
    // }

    render() {
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
                            <img
                                src={flogo}
                                alt="profile" />
                            <button type="button" classname={classes.button} onClick={this.openForm} >
                                <Link className="button-text" to={'/hometwo'}>Sign In</Link>

                            </button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Video

// const Video = () => {
//     const videoSource = "http://myholyname.org/Claudia-testarea/nicoles/images/fitbms.mp4"
//     return (x
//         <div className={classes.Container} >
//             <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
//                 <source src={videoSource} type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>

//             <div className={classes.Content}>
//                 <div className={classes.SubContent} >
//                     <img
//                         src={flogo}
//                         alt="profile" />
//                     <button type="button" className="btn btn-outline-dark" onClick={}>Sign In</button>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Video