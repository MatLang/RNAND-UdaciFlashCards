import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, purple, red, green, gray } from '../../utils/colors';

export default class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = { showAnswer: false }
  };

  showAnswer = () => {
    this.setState((state) => {
      return {
        ...state,
        showAnswer: !this.state.showAnswer
      }
    })
  }

  render() {
    const { 
      currentQuestion, 
      questionsCorrect, 
      deckLength, 
      deck 
    } = this.props.quizStatus;

    return (
      <View style={styles.container}>
        {deckLength == 0
          ? <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.titleText}>
              Please submit some questions first.
              </Text>
            <TouchableOpacity
              style={styles.AndroidSubmitBtn}
              onPress={() => this.props.goBack()}
            >
              <Text style={styles.submitBtnText}>Go to Deck</Text>
            </TouchableOpacity>
          </View>
          : <View style={{ flex: .8, justifyContent: 'space-between' }}>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>{currentQuestion + 1}/{deckLength}</Text>
            <Text style={styles.titleText}>
              {deck.questions[currentQuestion].question}
            </Text>
            {this.state.showAnswer
              ? <View style={styles.center}>
                <Text style={styles.baseText}>{deck.questions[currentQuestion].answer}</Text>
                <Text style={styles.baseText} onPress={() => this.showAnswer()}>Hide Answer</Text>
              </View>
              : <Text style={styles.baseText} onPress={() => this.showAnswer()}>Show Answer</Text>
            }
            <View style={{ flex: .2 }}>
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
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  AndroidSubmitBtn: {
    backgroundColor: purple,
    margin: 10,
    height: 45,
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
  },
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
