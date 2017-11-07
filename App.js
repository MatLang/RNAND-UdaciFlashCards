import React from 'react';
import { StyleSheet, Text, View, Platform, Button } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import DeckList from './src/components/DeckList';
import NewDeck from './src/components/NewDeck';
import QuizView from './src/components/QuizView';
import DeckDetail from './src/components/DeckDetail';
import Deck from './src/components/Deck';

import { white, blue, black, purple } from './utils/colors';

const Tabs = TabNavigator({
  Home: {
    screen: Deck,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color="white"/>
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='new-message' size={30} color="white"/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    showIcon: 'true',
    activeTintColor: white,
    style: {
      height: 75,
      backgroundColor: blue,
    },
    elevation: 10,
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({navigation}) => ({
      title: 'React',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
