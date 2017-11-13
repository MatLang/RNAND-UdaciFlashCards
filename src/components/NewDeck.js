import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { white, blue, black, purple } from '../../utils/colors';
import { saveDeckTitle } from '../../utils/api';

export default class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
    };
  };

  render() {

    setDeckName = ((deckName) => {
      this.setState((state) => {
        return {
          ...state,
          deckName,
        }
      })
    });

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
      key: 0
    })

    submitDeck = (deck) => {
      saveDeckTitle(deck).then(() => {
        this.props.navigation.dispatch(resetAction)
      })
    }

    submitDeck = submitDeck.bind(this);

    return (

      <View style={styles.center}>
        <FormLabel>
          Please Enter a Deck Name
        </FormLabel>
        <FormInput
          onChangeText={(event) => { setDeckName(event) }}
        />
        <Button
          title='Submit'
          buttonStyle={styles.submitBtn}
          onPress={() => {
            submitDeck(this.state);
          }
          }
        />
        <Button
          title='Clear Decks'
          buttonStyle={styles.submitBtn}
          onPress={() => {
            AsyncStorage.clear()
              .then(() => {
                this.props.navigation.dispatch(resetAction)
              });
          }
          }
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
