import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { purple } from '../../utils/colors';
import { addCardToDeck } from '../../utils/api';

export default class NewCard extends Component {
  constructor(props) {
    super(props);
    const { deck } = this.props.navigation.state.params;
    this.state = {
      deck,
      question: '',
      answer: '',
    };
  };

  setQuestion = ((question) => {
    this.setState((state) => {
      return {
        ...state,
        question: question
      }
    })
  });

  setAnswer = ((answer) => {
    this.setState((state) => {
      return {
        ...state,
        answer: answer
      }
    })
  });

  submitQuestion = (deck) => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deck: this.state.deck } })
      ],
      key: 1
    })
    return addCardToDeck(deck).then(() => {
      this.props.navigation.dispatch(resetAction)
    });
  }

  render() {
    return (
      <View style={styles.center}>
        <FormLabel>
          Please Enter the Question
        </FormLabel>
        <FormInput
          onChangeText={(event) => { this.setQuestion(event) }}
        />
        <FormLabel>
          Please Enter the Answer
        </FormLabel>
        <FormInput
          onChangeText={(event) => { this.setAnswer(event) }}
        />
        <Button
          title='Submit'
          buttonStyle={styles.submitBtn}
          onPress={() => {
            this.submitQuestion(this.state);
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
  },
})
