import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { white, blue, black, purple } from '../../utils/colors';
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
  
  componentDidMount() {
    // const card = this.props.card
  };
  

  render() {
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
          answer : answer
        }
      })
    });

    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckList'}),
        NavigationActions.navigate({ routeName: 'DeckDetail', params:{deck:this.state.deck}})
      ],
      //key: 2
    })

/*     const setParamsAction = NavigationActions.setParams({
      params: { deck: this.state.deck},
      key: 'DeckDetail',
    })
     */
    submitQuestion = (deck) => {
      return addCardToDeck(deck).then(
        this.props.navigation.dispatch(resetAction),
        //this.props.navigation.dispatch(resetAction),
        /* this.props.navigation.navigate('DeckDetail', {deck:this.state.deck}) */
      );
    }

    submitQuestion = submitQuestion.bind(this);


    return (
      
      <View style={styles.center}>
        <FormLabel>
          Please Enter the Question
        </FormLabel>
        <FormInput 
          onChangeText={(event) => {setAnswer(event)}}
        />
        <FormLabel>
          Please Enter the Answer
        </FormLabel>
        <FormInput 
          onChangeText={(event) => {setQuestion(event)}}
        />
        <Button
          title='Submit'
          buttonStyle={styles.submitBtn}
          onPress = {() => {
            submitQuestion(this.state);
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