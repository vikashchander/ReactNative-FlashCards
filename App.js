import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//import from local files
import reducer from './reducers/index';
import Home from './components/Home';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Deck from './components/Deck';
import QuizView from './components/QuizView';

//tab navigator
const TabNavigator =  createMaterialBottomTabNavigator(
  {
    Home: { 
      screen: Home,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <View>
                  <MaterialCommunityIcons name='cards' style={[{color:tintColor}]}  size={25}/>
          </View>
        )
      }
    },
    AddDeck: { screen: NewDeck,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <View>
                  <MaterialIcons name='playlist-add' style={[{color:tintColor}]}  size={25}/>
          </View>
        )
      } },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#078ab2',
    barStyle: { backgroundColor: '#10487f' },
  }
);

//component starck
const Stack = createStackNavigator({
  Home: TabNavigator,
  AddDeck: NewDeck,
  AddCard: NewCard,
  Deck: Deck,
  Quiz: QuizView,
});

//app container
const AppContaioner = createAppContainer(Stack);

export default class App extends React.Component {


  render() {
    return (
      <Provider store={createStore(reducer)}>
          <AppContaioner />     
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});
