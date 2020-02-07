import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const subType = [
  { label: "DAILY", value: 1 },
  { label: "WEEKLY", value: 2 },
  { label: "MONTHLY", value: 3 }
];

const weekType = [
  { label: "MONDAY", value: 1 },
  { label: "TUESDAY", value: 2 },
  { label: "WEDNESDAY", value: 3 },
  { label: "THURSDAY", value: 4 },
  { label: "FRIDAY", value: 5 },
  { label: "SATURDAY", value: 6 },
  { label: "SUNDAY", value: 7 }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedOption: "",
      startDate: new Date(),
      endDate: new Date(),
      showData: false,
      chargeAmount: 0,
      subscriptionType: 0,
      specificDay: 0,
      dayOfWeek: "",
      dateOfMonth: 0
    };
  };

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('http://localhost:8080/', {
      method: 'POST',
      body: data,
    })
    .then(res => {
      res.text()
      .then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        this.setState({
          chargeAmount: data.chargeAmount,
          subscriptionType: data.subscriptionType,
          dateOfMonth: data.dateOfMonth,
          dayOfWeek: data.dayOfWeek,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          showData: !this.state.showData
        });
        console.log(this.state.startDate);
        return data;
      })
    })
    .catch(error => console.error("Error:", error))
  };

  handleStartChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleEndChange = (date) => {
    this.setState({
      endDate: date
    });
  };

  handleChange = (value) => {
    this.setState({ selectedOption: value });
    console.log(`Option selected:`, value);
  };
  
  render() {

    const { selectedOption } = this.state;
    const valid3Months = new Date();
    valid3Months.setDate(valid3Months.getDate() + 90);

    return (
      <div className="container">
        <h4>Create A Subscription</h4>
        <form onSubmit={this.handleSubmit}>
        <div className="col-md-3">
            <span>Amount </span>
            <input name="amount" placeholder="$10.00"></input>
        </div>
        <div className="col-md-3">
            <span>Subscription type </span>
            <Select name="subType" options={subType} 
             onChange={this.handleChange}/>
        </div>
        <div className="col-md-3">
          {selectedOption.value === 3 ? 
          (   <input name="specificDay" type="number" max={31}/> ) 
          : selectedOption.value === 2 ? 
          (<Select name="specificDay" options={weekType} />) :
           <input type="hidden" name="specificDay" value="0" /> }
        </div>

        <div className="col-md-3">
          <DatePicker
            name="startDate"
            selected={this.state.startDate}
            onChange={this.handleStartChange}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
          <DatePicker
            name="endDate"
            selected={this.state.endDate}
            onChange={this.handleEndChange}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            minDate={this.state.startDate}
            maxDate={valid3Months}
          />
        </div>

        <div className="col-md-3">
          <button>Submit</button>
        </div>

          {this.state.showData ? (
          <div className="row">
            <div className="col-md-6">
              <span>Amount Entered : { this.state.chargeAmount } </span><br/>
              <span>Subscription Type : { this.state.subscriptionType } </span><br/>

          { this.state.subscriptionType === "WEEKLY" ? (<span>Every { this.state.dayOfWeek }</span>) : this.state.subscriptionType === "MONTHLY"? (<span>Date Start : { this.state.dateOfMonth } </span>) : null}
              <br/>
              <span>From : { this.state.startDate.toLocaleDateString() } to : { this.state.endDate.toLocaleDateString() } </span>
            </div>
          </div>
          ) : null }

        </form>
      </div>
    );
  }
}

export default App;
