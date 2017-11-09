import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import DeckDetail from './DeckDetail';
import DeckList from './DeckList';
import NewCard from './NewCard';
import { getDeck } from '../../utils/api';
import { white, blue, black, purple, gray } from '../../utils/colors';

const DeckNavigator = StackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
        header: null
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'New Card',
      //headerMode:'none',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  }
})

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    /*const { navigation } = this.props;
    getDeck(navigation.state.key)
      .then(result => {
        const deck = result;
        this.setState((state) => {
          return {
            deck
          }
        })
      })*/
     
  }

  render(){
    return(
      <View style={{flex:1}}>
        <DeckNavigator navigation={this.props.navigation}/>
      </View>
    );
  };
}

Deck.router = DeckNavigator.router;