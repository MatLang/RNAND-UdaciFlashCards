import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { purple } from '../../utils/colors';
import { saveDeckTitle } from '../../utils/api';

export default class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
    };
  };

  setDeckName = ((deckName) => {
    this.setState((state) => {
      return {
        ...state,
        deckName,
      }
    })
  });

  submitDeck = (deck) => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deck: this.state.deckName } })
      ],
      key: 1
    })

  saveDeckTitle(deck).then(() => {
    this.props.navigation.dispatch(resetAction)
    })
  }

  clearDeck = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
      key: 0
    })

    AsyncStorage.clear()
    .then(() => {
      this.props.navigation.dispatch(resetAction)
    });
  }

  render() {
    return (
      <View style={styles.center}>
        <FormLabel>
          Please Enter a Deck Name
        </FormLabel>
        <FormInput
          onChangeText={(event) => { this.setDeckName(event) }}
        />
        <Button
          title='Submit'
          buttonStyle={styles.submitBtn}
          onPress={() => { this.submitDeck(this.state) }}
        />
        <Button
          title='Clear Decks'
          buttonStyle={styles.submitBtn}
          onPress={() => { this.clearDeck() }}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  submitBtn: {
    backgroundColor: purple,
    marginBottom: 10
  },
})
