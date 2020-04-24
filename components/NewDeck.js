import React, { Component } from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { generateId, createDeck, saveDeck } from '../utils/Api';
import { addDeck } from '../actions/decks';
// import { saveDeck } from '../utils/api';

class NewDeck extends Component {
  static navigationOptions = {
    title: 'New Deck',
    headerStyle: {
      backgroundColor: '#123458',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:25,
      
    },
  };

  state = {
    nameOfDeck: '',
  };

  handleSubmit = () => {
    const { nameOfDeck } = this.state;
    if (nameOfDeck === '') {
      alert('Give this deck a title!');
      return;
    }

    const deckId = generateId();
    const title = nameOfDeck;
    const newDeck = createDeck(title);

    this.props.dispatch(addDeck(deckId, newDeck));
    this.setState({ nameOfDeck: '' });
    this.toDeck(deckId, title); // go to newly created deck
    saveDeck(deckId, newDeck);
  };

  toDeck = (id, title) => {
    this.props.navigation.navigate('Deck', { deckId: id, deckName: title });
  };

  render() {
    const { nameOfDeck } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.question}>What is the title of your new deck ?</Text>
        <TextInput
          placeholder="Enter Deck Title"
          value={nameOfDeck}
          style={styles.input}
          onChangeText={nameOfDeck => this.setState({ nameOfDeck })}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
          <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 30,
    marginLeft: 20,
    padding:9,
    marginRight: 20,
    color: 'black',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    margin: 20,
    fontSize: 20,
    borderRadius: 10
  },
  submitBtn: {
    backgroundColor: '#20517E',
    padding: 12,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 60,
    borderRadius: 10
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});
export default connect()(NewDeck);
