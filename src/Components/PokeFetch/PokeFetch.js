import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      // timer: 10,
      // timeout: undefined,
      // class Example extends React.Component {
      //   constructor() {
      //     super();
      state : { time: {}, seconds: 5 },
      timer : 10,
      // startTimer: startTimer.bind(this),
      // countDown: countDown.bind(this),
        }
      
    };

    fetchPokemon() {
      let min = Math.ceil(1);
      let max = Math.floor(152);
      let pokeNum = Math.floor(Math.random() * (max - min) + min);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
        method: 'GET'
      }).then(res => res.json())
        .then(res => {
          this.setState({
            pokeInfo: res,
            pokeSprite: res.sprites.front_default,
            pokeName: res.species.name,
          })
        })
        .catch((err) => console.log(err));
      this.startTimer();
      }

  secondsToTime(secs) {
    console.log("seconds to time")
    console.log("secondstoTime called")
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    console.log("component mounted")
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    console.log("timer started")
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
      this.countDown()
    }
  }

  countDown() {
    console.log("countdown")
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      console.log("clearInterval called")
      clearInterval(this.timer);
    }
  }


  // decrementCount() {
  //   console.log("decrement called")
  //   if (this.timer == 0 && this.state.timer > 0) {
  //     this.timer = setInterval(this.countDown, 1000);
  //   }
  // };

  // countDown() {
  //   // Remove one second, set state so a re-render happens.
  //   let seconds = this.state.seconds - 1;
  //   this.setState({
  //     time: this.secondsToTime(seconds),
  //     seconds: seconds,
  //   });
    
  //   // Check if we're at zero.
  //   if (seconds == 0) { 
  //     clearInterval(this.timer);
  //   }
  // }

  // secondsToTime(secs){
  //   let hours = Math.floor(secs / (60 * 60));

  //   let divisor_for_minutes = secs % (60 * 60);
  //   let minutes = Math.floor(divisor_for_minutes / 60);

  //   let divisor_for_seconds = divisor_for_minutes % 60;
  //   let seconds = Math.ceil(divisor_for_seconds);

  //   let obj = {
  //     "h": hours,
  //     "m": minutes,
  //     "s": seconds
  //   };
  //   return obj;
  // }

  // componentDidMount() {
  //   let timeLeftVar = this.secondsToTime(this.state.seconds);
  //   this.setState({ time: timeLeftVar });
  // }

  // startTimer() {
  //   if (this.timer == 0 && this.state.seconds > 0) {
  //     this.timer = setInterval(this.countDown, 1000);
  //   }
  // }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.startTimer()}>Start!</button>
        <h1 className={'timer'} >Timer Display: {this.state.timer}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} alt="" />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;