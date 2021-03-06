import React, { Component } from 'react';
import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Deck extends Component {
  static navigationOptions = {
    title: 'Deck',
    headerStyle: {
      backgroundColor: '#123458',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
    },
  };
  render() {
    const { deckId } = this.props;
    const { questions, title } = this.props.deck;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}> <FontAwesome name='angellist' size={35} /> {title}</Text>
          <Text style={styles.count}>
            {questions.length} {questions.length === 1 ? `card` : `cards`}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.btn, { marginTop: 50,borderRadius:10 }]}
          onPress={() =>
            this.props.navigation.navigate('AddCard', { deckId: deckId })
          }>
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#20517E',borderRadius:10 }]}
          onPress={() =>
            questions.length === 0
              ? alert('no cards you must Add new Cards ')
              : this.props.navigation.navigate('Quiz', { deckId: deckId })
          }>
          <Text style={[styles.btnText, { color: '#ECECEC' }]}>
          <MaterialCommunityIcons name={'timer-sand'} size={25} />Start Quiz!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius:12,
    borderColor: '#485461',
    borderWidth: 1,
    padding: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'black',
  },
  count: {
    marginTop: 10,
    fontSize: 25,
    color: 'gray',
  },
  btn: {
    width: 150,
    height: 50,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 17,
    color: 'black',
  },
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Deck);
