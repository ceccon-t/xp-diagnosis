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
      return {...card, available: true, deck: 0, posInDeck: 0, posInTypes: 0};
    })
    // this.setState({allCards: cards});
    return cards;
  }

  getRemainingAvailableCardsInList = (cards) => {
    //let remaining = 13;
    // iterate
    let remaining = cards.filter(card => card.available).length;
    return remaining;
  }

  hasRemainingCards = () => {
    let deck_one = this.state.decks[0];
    let deck_two = this.state.decks[1];
    let deck_three = this.state.decks[2];
    let deck_four = this.state.decks[3];
    return this.getRemainingAvailableCardsInList(deck_one.cards) !== 0
            || this.getRemainingAvailableCardsInList(deck_two.cards) !== 0
            || this.getRemainingAvailableCardsInList(deck_three.cards) !== 0
            || this.getRemainingAvailableCardsInList(deck_four.cards) !== 0;
  }

  showEmptyAlert = () => {
    let message = "No more cards here!";

    if (!this.hasRemainingCards()) {
      message += "\n\nClick 'New Game' (bottom of the page) to shuffle."
    }

    alert(message);
  }

  generateNextActionMessage = (status) => {
    let nextActionMessage = "";

    if (status.playing) {
      let hasSelectedCard = this.state.selectedCard !== this.DUMMY_CARD;
      if (hasSelectedCard) {
        nextActionMessage = "Discuss and then pick next card";
      } else {
        nextActionMessage = "Pick a card";
      }
    } else {
      nextActionMessage = "Click 'New Game' to set things up";
    }

    return nextActionMessage;
  }

  findNextAvailable = (cards) => {
    let nextAvailable = null;

    let remainingAvailable = cards.filter(card => card.available);
    if (remainingAvailable.length !== 0) {
      nextAvailable = remainingAvailable[0];
    }

    return nextAvailable;
  }

  drawNextAvailable = (cards) => {
    let pickedCard = this.findNextAvailable(cards);
    if (pickedCard === null) {
      this.showEmptyAlert();
      return;
    }

    pickedCard.available = false;

    let types = this.state.types;
    let decks = this.state.decks;

    let type = pickedCard.type;
    let deck = pickedCard.deck;

    types[type].cards[pickedCard.posInTypes] = pickedCard;
    decks[deck].cards[pickedCard.posInDeck] = pickedCard;

    this.setState({
      selectedCard: pickedCard,
      decks: decks,
      types: types
    });
  }

  pickNextFromDeck = (deckNumber) => {
    console.log("Picking next from deck " + deckNumber);
    let decks = this.state.decks;
    this.drawNextAvailable(decks[deckNumber].cards);
  }
  
  pickNextFromType = (type) => {
    console.log("Picking next from type " + type);
    let types = this.state.types;
    this.drawNextAvailable(types[type].cards);
  }

  render() {
    let styles = {
      display: 'inline-block'
    };

    let nextActionMessage = this.generateNextActionMessage({
      playing: this.hasRemainingCards()
    });

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

        <span className="NextActionHint">
          Hint: {nextActionMessage}
        </span>

      </div>
    );
  }
}

export default App;
