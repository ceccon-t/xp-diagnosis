import React, {Component} from 'react';
import './App.css';
import NewGameButton from './NewGameButton/NewGameButton';
import FaceDownPile from './FaceDownPile/FaceDownPile';
import SelectedCard from './Card/SelectedCard';
import originalCards from './Data/original.json';
import CardTypeSummary from './Card/CardTypeSummary';

class App extends Component {

  REACT_IMG = "https://create-react-app.dev/img/logo.svg";
  DECK_ONE_IMG = this.REACT_IMG; // update where to use images for decks
  DECK_TWO_IMG = this.REACT_IMG;
  DECK_THREE_IMG = this.REACT_IMG;
  DECK_FOUR_IMG = this.REACT_IMG;
  // todo: rename this
  DUMMY_CARD = {
    type: "Placeholder",
    description: ""
  }

  state = {
    dummy: "initial state",
    playing: false,
    allCards: [],
    selectedCard: this.DUMMY_CARD,
    decks: [
      {image: this.DECK_ONE_IMG, cards: []},
      {image: this.DECK_THREE_IMG, cards: []},
      {image: this.DECK_TWO_IMG, cards: []},
      {image: this.DECK_FOUR_IMG, cards: []}
    ],
    types: {
      "Practice": {
        cards: []
      },
      "Problem": {
        cards: []
      },
      "Solution": {
        cards: []
      },
      "Value": {
        cards: []
      }
    }
  }

  newGameHandler = () => {
    console.log("Starting new game");
    this.createNewGame();
  }

  createNewGame = () => {
    let allCards = this.generateAllCards();
    let decks = this.state.decks;
    let types = this.state.types;

    // clean decks
    decks.forEach((deck) => {
      deck.cards = [];
    });

    // clean types
    Object.keys(types).map((key) => {
      types[key].cards = [];
    });
    
    // add cards to decks
    allCards.forEach( (card, pos) => {
      let receivingDeck = pos % decks.length;
      card.deck = receivingDeck;
      decks[receivingDeck].cards.push(card);
    } );

    // shuffle decks
    decks.forEach((deck) => {
      deck.cards.sort(() => .5 - Math.random());
    });

    // put position within deck in cards
    decks.forEach((deck) => {
      let pos = 0;
      deck.cards.forEach((card) => {
        card.posInDeck = pos;
        pos++;
      })
    });

    // add cards to types
    decks.forEach((deck) => {
      deck.cards.forEach((card) => {
        card.posInTypes = types[card.type].cards.length;
        types[card.type].cards.push(card);
      });
    })

    // save new state
    this.setState(
      {
        allCards: allCards,
        decks: decks,
        types: types,
        playing: true,
        selectedCard: this.DUMMY_CARD
      }
     );
  }

  getInitialCards = () => {
    return originalCards.slice();
  }

  generateAllCards = () => {
    let cards = this.getInitialCards();
    cards = cards.map(card => {
      return {...card, available: 1, deck: 0, posInDeck: 0, posInTypes: 0};
    })
    // this.setState({allCards: cards});
    return cards;
  }

  getRemainingAvailableCardsInList = (cards) => {
    //let remaining = 13;
    // iterate
    let remaining = cards.filter(card => card.available == 1).length;
    return remaining;
  }

  hasRemainingCards = () => {
    let deck_one = this.state.decks[0];
    let deck_two = this.state.decks[1];
    let deck_three = this.state.decks[2];
    let deck_four = this.state.decks[3];
    return this.getRemainingAvailableCardsInList(deck_one.cards) != 0
            || this.getRemainingAvailableCardsInList(deck_two.cards) != 0
            || this.getRemainingAvailableCardsInList(deck_three.cards) != 0
            || this.getRemainingAvailableCardsInList(deck_four.cards) != 0;
  }

  showEmptyAlert = () => {
    let message = "No more cards here!";

    if (!this.hasRemainingCards()) {
      message += "\n\nClick 'New Game' (bottom of the page) to shuffle."
    }

    alert(message);
  }

  pickNextFromDeck = (deckNumber) => {
    console.log("Picking next from deck " + deckNumber);
    let decks = this.state.decks;
    let deck = decks[deckNumber];
    /* todo: abstract this to a new method to reuse here and on pickNextFromType */
    let remainingAvailable = deck.cards.filter(card => card.available == 1);
    if (remainingAvailable.length == 0) {
      this.showEmptyAlert();
      return;
    }
    let pickedCard = remainingAvailable[0];
    pickedCard.available = 0;
    let types = this.state.types;
    types[pickedCard.type].cards[pickedCard.posInTypes] = pickedCard;
    deck[pickedCard.posInDeck] = pickedCard;
    decks[deckNumber] = deck;
    this.setState({
      selectedCard: pickedCard,
      decks: decks,
      types: types
    });
    /* end todo */
  }
  
  pickNextFromType = (type) => {
    console.log("Picking next from type " + type);
    let types = this.state.types;
    /* todo: abstract this to a new method to reuse here and on pickNextFromDeck */
    let remainingAvailable = types[type].cards.filter(card => card.available == 1);
    if (remainingAvailable.length == 0) {
      this.showEmptyAlert();
      return;
    }
    let pickedCard = remainingAvailable[0];
    pickedCard.available = 0;
    types[type].cards[pickedCard.posInTypes] = pickedCard;
    let decks = this.state.decks;
    decks[pickedCard.deck].cards[pickedCard.posInDeck] = pickedCard;
    this.setState({
      selectedCard: pickedCard,
      decks: decks,
      types: types
    });
    /* end todo */
  }

  render() {
    let styles = {
      display: 'inline-block'
    };

    return (
      <div className="App">

        <h1>XP Diagnosis</h1>
        
        {this.state.decks.map((deck, pos) => {
          return <FaceDownPile 
                    displayImage={deck.image} 
                    remaining={this.getRemainingAvailableCardsInList(deck.cards)} 
                    pick={() => this.pickNextFromDeck(pos)}
                    />
        })}
        <br />
        
        {Object.keys(this.state.types).map((type) => {
          return <CardTypeSummary 
                      cardType={type} 
                      remaining={this.getRemainingAvailableCardsInList(this.state.types[type].cards)} 
                      pick={() => this.pickNextFromType(type)}
                      />
        })}

        <hr />
        
        <div className="SelectedCardArea">
          <SelectedCard style={styles} cardType={this.state.selectedCard.type} cardDescription={this.state.selectedCard.description}/>
        </div>
        
        <div className="NewGameButtonWrapper">
          <NewGameButton onClick={() => this.newGameHandler()} />
        </div>
      </div>
    );
  }
}

export default App;
