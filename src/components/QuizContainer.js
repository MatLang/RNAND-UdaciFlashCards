import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import QuizResult from './QuizResult';
import QuizView from './QuizView';
import { white, blue, black, purple, red, green, gray } from '../../utils/colors';

export default class QuizContainer extends Component {
  constructor(props) {
    super(props);
    const { deck } = this.props.navigation.state.params;
    this.state = {
      deck,
      currentQuestion: 0,
      questionsCorrect: 0,
      deckLength: deck.questions.length
    };
  };

  componentDidMount() {
    
  }

  restartQuiz = () => {
    this.setState((state) => {
      return {
        ...state,
        currentQuestion: 0,
        questionsCorrect: 0,
      }
    })
  }

  setCorrectAnswer = () => {
    this.setState((state) => {
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        questionsCorrect: state.questionsCorrect +1
      }
    })
  }

  setIncorrectAnswer = () => {
    this.setState((state) => {
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      }
    })
  }

  goBack = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deck: this.state.deck.title } })
      ],
      key: 1
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() { 
    const { currentQuestion, questionsCorrect, deckLength, deck } = this.state;
    return (
      <View style={{flex:1}}>
        {currentQuestion < deckLength
          ? <View style={styles.container}>
            <QuizView 
              quizStatus={this.state} 
              setCorrectAnswer={this.setCorrectAnswer}
              setIncorrectAnswer={this.setIncorrectAnswer}
            />
          </View>
          : <View style={styles.container}>
            <QuizResult quizStatus={this.state} restartQuiz={this.restartQuiz} goBack={this.goBack}/>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  correctAnswer: {
    backgroundColor: green,
    margin: 10,
    height: 45,
    padding: 10,
    borderRadius: 2,
    //alignItems: 'center',

  },
  incorrectAnswer: {
    backgroundColor: red,
    margin: 10,
    height: 45,
    padding: 10,
    borderRadius: 2,
    //alignItems: 'center',

  },
  submitBtnText: {
    color: white,
    fontSize: 18,
  },
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    baseText: {
      fontSize: 15,
      color: gray,
    },
});
