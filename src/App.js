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

  addPokemon = (pokemon) =>{
    this.state.myPokemon.push(pokemon)
    const newPokemon = this.state.pokemon.filter( item => {
      return item.id !== pokemon.id
    })

    this.setState({
      pokemon : newPokemon,
    })
    
  }

  render() {
    const { myPokemon, pokemon } = this.state
    console.log(myPokemon)
    return (
      <div className="App">
        <h1 style={{textAlign:'center'}}>My Pokedex</h1>
        <button onClick={this.openModal}>Open Modal</button>
        <div className="app__my-pokemon">
          {
            
            myPokemon && myPokemon.map((myPokemon)=>(
              <div className="card" style={{backgroundColor:"#f3f4f7", marginBottom:"20px", padding: "20px"}} key={myPokemon.id}>
                <div className="card__image" style={{width:'20%', display :'inline-block'}}>
                  <img style={{width:'100%'}} src={myPokemon.imageUrl} alt="" />
                </div>
                <div className="card__detail" style={{width:'65%', display :'inline-block', verticalAlign:'top', padding:"15px"}}>
                  <p className="card__title" style={{fontFamily: "Gaegu",fontSize: "40px",margin: "0"}}>{myPokemon.name}</p>
                  <p className="card__hp">HP {myPokemon.hp>100 ? '100' : '0' }</p>
                  <p className="card__str">STR {myPokemon.hp>100 ? '100' : '0' }</p>
                  <p className="card__weak">WEAK {myPokemon.hp>100 ? '100' : '0' }</p>
                  <p className="card__rate">RATE</p>
                </div>
              </div>
            ))
          }
        </div>
        


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
             
              {pokemon && pokemon.map(pokemon => (
                  <div className="card" style={{backgroundColor:"#f3f4f7", marginBottom:"20px", padding: "20px"}} key={pokemon.id}>
                    <div className="card__image" style={{width:'30%', display :'inline-block'}}>
                      <img style={{width:'100%'}} src={pokemon.imageUrl} alt="" />
                    </div>
                    <div className="card__detail" style={{width:'65%', display :'inline-block', verticalAlign:'top', padding:"15px"}}>
                      <p className="card__title" style={{fontFamily: "Gaegu",fontSize: "40px",margin: "0"}}>{pokemon.name}</p>
                      <p className="card__hp">HP {pokemon.hp>100 ? '100' : '0' }</p>
                      <p className="card__str">STR {pokemon.hp>100 ? '100' : '0' }</p>
                      <p className="card__weak">WEAK {pokemon.hp>100 ? '100' : '0' }</p>
                      <p className="card__rate">RATE</p>
                    </div>
                    <div className="card__footer"><button onClick={()=>this.addPokemon(pokemon)}>Add</button></div>
                  </div>
              ))}
              
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
