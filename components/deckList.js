import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class DeckList extends Component {
  render() {
    const { id, title, cardsNum, navigation } = this.props;
    //console.log(title)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.deck}
          onPress={() =>
            navigation.navigate("Deck", { deckId: id, deckName: title })
          }
        >
          <Text style={styles.title}>
            <FontAwesome name="angellist" size={35} /> {title}
          </Text>
          <Text style={styles.count}>
            {cardsNum}
            {cardsNum === 1 ? " card" : " cards"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: "white",
    borderColor: "#485461",
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  title: {
    fontSize: 30,
    color: "black",
  },
  count: {
    marginTop: 10,
    fontSize: 22,
    color: "gray",
  },
});

function mapStateToProps(decks, props) {
  const { id } = props;
  return {
    id,
    title: id ? decks[id].title : null,
    cardsNum: id ? decks[id].questions.length : null,
  };
}

export default withNavigation(connect(mapStateToProps)(DeckList));
