import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends React.Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: {}, 
      seconds: 6,
      isRunning: false
    };
  };

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);

    this.timer = setInterval(() => this.Decrement(), 1000);
    console.log(this.timer)

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          isRunning: true,
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          seconds: 6
        })
      })
      .catch((err) => console.log(err));
    console.log(this.state.seconds)
    }

    Decrement() {
      if (this.state.isRunning=true && this.state.seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds -1 }));
      }
      if (this.state.seconds === 0) { 
         this.setState({
           isRunning: false
          })
      }
    };

  render() {
        return (
          <div className={'wrapper'}>
            <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
            <h1 className={this.state.isRunning ? "timer" : 'timerOff'} >Timer Display: {this.state.seconds}</h1>
            <div className={'pokeWrap'}>
              <img className={this.state.isRunning ? "pokeImgDark" : 'pokeImg'} src={this.state.pokeSprite} alt="" />
              <h1 className={'pokeName'}>{this.state.isRunning ? '' : this.state.pokeName}</h1>
            </div>
          </div>
        )
      }
    }
    

export default PokeFetch;