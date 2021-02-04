import React, { Component } from 'react';
import Snake from "./Snake";
import Food from "./Food";

import './App.css';



const getRandomPlace = () => {
  let min = 1;
  let max = 98;
  let xAxis = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let yAxis = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [xAxis, yAxis]
}


class App extends Component {

  state = {
    food: getRandomPlace(),
    speed: 200,
    direction: "RIGHT",
    snakeDots: [
      [0, 0],
      [2, 0]
    ]
  }

  onkeydown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 40:
        this.setState({ direction: 'LEFT' });
        break;
      case 39:
        this.setState({ direction: 'UP' });
        break;
      case 38:
        this.setState({ direction: 'RIGHT' });
        break;
      case 37:
        this.setState({ direction: 'DOWN' });
        break;
        default:
    }
  }


  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] - 2];
        break;
      case 'UP':
        head = [head[0], head[1] + 2];
        break;
        default:
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    })
  }

  checkOutBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }
  

  checkIfEat(){
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[1] === food[0] && head[0] === food[1]) {
      this.setState({
        food: getRandomPlace()
      })
      this.growSnake();
      
    }
  }

  growSnake(){
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake,
      
    })
  }


  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`)
    this.setState({
      food: getRandomPlace(),
      speed: 200,
      direction: "RIGHT",
      snakeDots: [
        [0, 0],
        [0, 2]
      ]
    })
  }
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    this.checkOutBorders()
    this.checkIfEat()
    this.checkIfCollapsed()
  }

  render() {
    return (
      <div className="gameArea">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;



