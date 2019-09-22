import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import './App.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '70%',
    height                : '85%'
  }
};

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

Modal.setAppElement('#root')

class App extends Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false,
      pokemon : [],
      myPokemon : [],
      debug : 'aaaa'
    };
  }
 
  componentDidMount(){
    axios.get('http://localhost:3030/api/cards')
      .then(res => {
          console.log(res);
          this.setState({
            pokemon : res.data.cards,
          })
      });
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }
  
  closeModal = () => {
    this.setState({modalIsOpen: false});
  } 

  showPokemon=()=>{
    const { pokemon } = this.state
    if(this.state.pokemon){
      return Object.keys(pokemon) && Object.keys(pokemon).map((value, index) => (
        <div className="card" style={{backgroundColor:"#f3f4f7", marginBottom:"20px", padding: "20px"}} key={pokemon[index].id}>
            <div className="card__image" style={{width:'30%', display :'inline-block'}}>
              <img style={{width:'100%'}} src={pokemon[index].imageUrl} alt="" />
            </div>
            <div className="card__detail" style={{width:'65%', display :'inline-block', verticalAlign:'top', padding:"15px"}}>
              <p className="card__title" style={{fontFamily: "Gaegu",fontSize: "40px",margin: "0"}}>{pokemon[index].name}</p>
              <p className="card__hp">HP</p>
              <p className="card__str">STR</p>
              <p className="card__weak">WEAK</p>
              <p className="card__rate">RATE</p>
            </div>
        </div>
      ))
    }
  }

  render() {
    console.log(this.state)

    return (
      <div className="App">
        <h1 style={{textAlign:'center'}}>My Pokedex</h1>
        <button onClick={this.openModal}>Open Modal</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          
          <div className="modal">
            <div className="modal__search">
              <input style={{
                width:'97%', 
                padding:'20px 10px', 
                border: '1px solid #e6e6e6', 
                fontFamily: "Atma, cursive",
                fontSize: '20px',
                marginBottom: "10px"
              }} placeholder="Find Pokemon"/>
            </div>
            <div className="modal__list" style={{height: '430px', overflow: 'auto'}}>
              
             {this.showPokemon()}
              
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
