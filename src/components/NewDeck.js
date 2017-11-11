import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
  
  componentDidMount() {
    // const card = this.props.card
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
    
    submitDeck = (deck) => {
      return saveDeckTitle(deck).then(
        this.props.navigation.navigate('DeckList')
      );
    }

/*     const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'DeckList'}),
        NavigationActions.navigate({ routeName: 'DeckDetail'})
      ],
      key: 0
    }) */

    return (
      
      <View style={styles.center}>
        <FormLabel>
          Please Enter a Deck Name
        </FormLabel>
        <FormInput 
          onChangeText={(event) => {setDeckName(event)}}
        />
        <Button
          title='Submit'
          buttonStyle={styles.submitBtn}
          onPress = {() => {
            submitDeck(this.state);
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
    //height: 150,
    justifyContent: 'center',
    //alignItems: 'center',
    //marginLeft: 30,
    //marginRight: 30,
    //borderBottomWidth: .1,
    //borderBottomColor: black
  },
  submitBtn: {
    backgroundColor: purple,

  },
})