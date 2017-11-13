import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';
import Card from './Card';
import { white, blue, black, purple } from '../../utils/colors';
import { getDecks } from '../../utils/api';

export default class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getDecks()
      .then(Decks => {
        const DecksArray = Object.keys(Decks).map(key => {
          const ar = Decks[key]
          ar.key = key

          return ar
        })
        this.setState((state) => {
          return {
            ...state,
            decks: DecksArray
          }
        })
      })
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Card {...item} navigation={this.props.navigation} />
      </View>
    )
  }

  render() {
    return (

      <View style={styles.container}>
        {this.state.decks !== undefined && typeof this.state.decks === 'object'
          ? <FlatList
            data={this.state.decks}
            renderItem={this.renderItem}

          />
          : <ActivityIndicator />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 10,
    backgroundColor: white
  },
  center: {
    height: 150,
    justifyContent: 'center',
  },
})
