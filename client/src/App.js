import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MemberPortal from './pages/memberPortal';
import Home from "./components/Manage/home";
import Video from "./components/Video/Video";
import HomeTwo from "./components/CheckIn/hometwo";

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={MemberPortal} />
          <Route path="/checkin" component={Video} />
          <Route path="/hometwo" component={HomeTwo} />
          <Route path="/manage" component={Home} />
        </Router>
      </div>
    )
  };
}



export default App;