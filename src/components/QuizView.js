import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, blue, black, purple, red, green, gray } from '../../utils/colors';

export default class QuizView extends Component {
  constructor(props) {
    super(props);
    /*     this.state = {
          deck,
          currentQuestion: 0,
          questionsCorrect: 0,
          deckLength: deck.questions.length
        }; */
    this.state = {showAnswer: false}
  };

  componentDidMount() {
    const { currentQuestion, deck } = this.props.quizStatus;
    /*     this.state = {
          deck,
          currentQuestion: 0,
          questionsCorrect: 0,
          deckLength: deck.questions.length
        }; */
  }

  showAnswer = () => {
    this.setState((state) => {
      return {
        ...state,
        showAnswer: !this.state.showAnswer
      }
    })
  }

  render() {
    const { currentQuestion, questionsCorrect, deckLength, deck } = this.props.quizStatus;

    return (
      <View style={styles.container}>
        <Text style={{marginTop: 10, marginLeft: 10}}>{currentQuestion+1}/{deckLength}</Text>
        <View style={{flex:.7, justifyContent: 'space-between' }}>
        <Text 
          style={styles.titleText}
        >
          {deck.questions[currentQuestion].question}
        </Text>
        {this.state.showAnswer
          ? 
          <View style={{justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.baseText}>{deck.questions[currentQuestion].answer}</Text>
            <Text style={styles.baseText} onPress={() => this.showAnswer()}>Hide Answer</Text>
          </View>
          : <Text style={styles.baseText} onPress={() => this.showAnswer()}>Show Answer</Text>
        }
        </View>
        <View style={{flex:.3}}>
        <TouchableOpacity
          style={styles.correctAnswer}
          onPress={() => this.props.setCorrectAnswer()}
        >
          <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incorrectAnswer}
          onPress={() => this.props.setIncorrectAnswer()}
        >
          <Text style={styles.submitBtnText}>Incorrect</Text>
        </TouchableOpacity>
        </View>
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
    alignItems: 'center',

  },
  incorrectAnswer: {
    backgroundColor: red,
    margin: 10,
    height: 45,
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',

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
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20
  },
  baseText: {
    fontSize: 15,
    color: gray,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20
  },
});
