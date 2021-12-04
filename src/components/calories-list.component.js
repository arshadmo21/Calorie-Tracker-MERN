import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Calorie = props => (
  <tr>
    <td>{props.calorie.username}</td>
    <td>{props.calorie.description}</td>
    <td>{props.calorie.amount}</td>
    <td>{props.calorie.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.calorie._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCalorie(props.calorie._id) }}>delete</a>
    </td>
  </tr>
)

export default class CaloriesList extends Component {
  constructor(props) {
    super(props);

    this.deleteCalorie = this.deleteCalorie.bind(this)

    this.state = {calories: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/calories/')
      .then(response => {
        this.setState({ calories: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCalorie(id) {
    axios.delete('http://localhost:5000/calories/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      calories: this.state.calories.filter(el => el._id !== id)
    })
  }

  calorieList() {
    return this.state.calories.map(currentcalorie => {
      return <Calorie calorie={currentcalorie} deleteCalorie={this.deleteCalorie} key={currentcalorie._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Calories</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.calorieList() }
          </tbody>
        </table>
      </div>
    )
  }
}