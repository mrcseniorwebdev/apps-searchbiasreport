import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch, Route

} from "react-router-dom"
import Login from './components/Login'
import Nav from './components/Nav'
import Dashbaord from './components/Dashbaord'
import Settings from './components/Settings'
import NewAdModal from './components/NewAdModal'
import './sass/app.scss';



const App = () => {

  const [showModal, setShowModal] = useState(0)
  const [sync, setSync] = useState(0)

  return (
    <Router>
      <Switch>
        <Route path="/searchbiasreport/login">
          < Login />
        </Route>


        <Route path="/searchbiasreport/dashboard">
          <div className="app-wrapper">
            <div className="app">
              <div className="app-nav">
                <Nav setShowModal={setShowModal} />
              </div>
              <div className="app-main">
                <Route path="/searchbiasreport/dashboard/main">
                  <Dashbaord sync={sync} setSync={setSync} />
                  {
                    showModal ? <NewAdModal setShowModal={setShowModal} setSync={setSync} sync={sync}/> : false
                  }
                </Route>
                <Route path="/searchbiasreport/dashboard/settings">
                  <Settings />
                </Route>
                {/* <Route path="/dashboard/help">
                  <h1>help</h1>
                  <a href="http://localhost:3001/auth/logout">Sign out of Google</a>
                </Route> */}
              </div>
            </div>
          </div>
        </Route>
        <Route path="/searchbiasreport/*">
          < Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
