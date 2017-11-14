import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, purple, gray } from '../../utils/colors';
import { clearLocalNotifications, setLocalNotification } from '../../utils/api';

export default class QuizResult extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  componentDidMount() {
    clearLocalNotifications()
      .then(() => setLocalNotification())
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
        <View style={{ flex: .7, justifyContent: 'center' }}>
          <Text style={styles.titleText}>Result:</Text>
          <Text style={styles.titleText}>{((questionsCorrect / deckLength) * 100).toFixed(2)}% of your answers are correct!</Text>
        </View>
        <View style={{ flex: .3 }}>
          <TouchableOpacity
            style={styles.AndroidSubmitBtn}
            onPress={() => this.props.restartQuiz()}
          >
            <Text style={styles.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.AndroidSubmitBtn}
            onPress={() => this.props.goBack()}
          >
            <Text style={styles.submitBtnText}>Go To Deck</Text>
          </TouchableOpacity>
        </View>
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
  },
});
