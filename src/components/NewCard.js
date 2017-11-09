import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
    const card = this.props.card
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
    
    submitQuestion = () => {
      addCardToDeck(this.state);
    }

    submitQuestion = submitQuestion.bind(this);
    return (
      <View style={styles.center}>
        <FormLabel>
          Please Enter a Question
        </FormLabel>
        <FormInput 
          onChangeText={(event) => {setAnswer(event)}}
        />
        <FormLabel>
          Please enter the Answer
        </FormLabel>
        <FormInput 
          onChangeText={(event) => {setQuestion(event)}}
        />
        <Button
          title='Submit'
          buttonStyle={styles.submitBtn}
          onPress = { () => {
            submitQuestion();
            this.props.navigation.navigate('Home', {question: this.state.question, answer: this.state.answer, deck:this.state.deck});
          }}
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