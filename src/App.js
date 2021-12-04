import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import CaloriesList from "./components/calories-list.component";
import EditCalorie from "./components/edit-calorie.component";
import CreateCalorie from "./components/create-calorie.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={CaloriesList} />
      <Route path="/edit/:id" component={EditCalorie} />
      <Route path="/create" component={CreateCalorie} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
