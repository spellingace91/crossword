import React, { Component } from 'react';

class Timer extends Component {
  state = {
    startTime: null,
    currentSeconds: 0,
    currentMinutes: 0,
    currentHours: 0,
    timer: null,
  }

  componentDidUpdate() {
    if (this.props.hasStarted && !this.state.timer) {
      this.startTimer();
    }

    if (this.props.isCompleted) {
      this.stopTimer();
    }
  }

  startTimer() {
    this.setState({startTime: new Date()});
    let timer = window.setInterval(this.getCurrentTime.bind(this), 1000);
    this.setState({timer: timer});
  }

  stopTimer() {
    clearInterval(this.state.timer);
  }

  getCurrentTime() {
    let currentTime = 
      ((new Date()).getTime() - this.state.startTime.getTime());
    let hours = currentTime / 3600000 % 12;
    let minutes = currentTime / 60000 % 60;
    let seconds = currentTime / 1000 % 60;

    this.setState(
      {
        currentSeconds: parseInt(seconds),
        currentMinutes: parseInt(minutes),
        currentHours: parseInt(hours)
      }
    );
  }

  render() {
    return (
      <span>{this.state.currentMinutes} : {this.state.currentSeconds < 10 ? `0${this.state.currentSeconds}`: this.state.currentSeconds}</span>
    );
  }
}

export default Timer;