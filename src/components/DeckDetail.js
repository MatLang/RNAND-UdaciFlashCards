import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, StyleSheet, StackNavigator, Animated } from 'react-native';
import { getDeck } from '../../utils/api';
import NewCard from './NewCard';
import { white, black, purple, gray } from '../../utils/colors';

export default class DeckDetail extends Component {

  state = {
    deck: null,
    bounceValue: new Animated.Value(0),
  }

  componentDidMount() {
    if (this.props.navigation.state.params.deck !== undefined) {
      getDeck(this.props.navigation.state.params.deck)
        .then(result => {
          this.state.bounceValue.setValue(1.5);
          Animated.spring(
            this.state.bounceValue,
            {
              toValue: 1,
              friction: 1,
            }
          ).start();
          const deck = result;
          this.setState((state) => {
            return {
              ...state,
              deck
            }
          })
        })
    } else {
      getDeck(this.props.state.routeName)
        .then(result => {
          this.state.bounceValue.setValue(1.5);
          Animated.spring(
            this.state.bounceValue,
            {
              toValue: 1,
              friction: 1,
            }
          ).start();
          const deck = result;
          this.setState((state) => {
            return {
              ...state,
              deck
            }
          })
        })
    }
  }

  render() {
    const { navigation } = this.props;
    const {
      deck,
      bounceValue
    } = this.state;
    return (
      <View style={styles.container}>
        {deck && deck.title !== undefined
          ? <View style={styles.container}>
            <View style={[styles.center, { flex: .7, borderBottomWidth: .3, borderBottomColor: black }]}>
              <Animated.Text style={[styles.titleText, { transform: [{ scale: bounceValue }] }]}>{deck.title}</Animated.Text>
              <Animated.Text style={[styles.baseText, { transform: [{ scale: bounceValue }] }]}>{deck.questions.length} cards</Animated.Text>
            </View>
            <View style={{ flex: .3, justifyContent: 'center', borderBottomWidth: .3, borderBottomColor: black }}>
              <TouchableOpacity style={styles.AndroidSubmitBtn} onPress={() => navigation.navigate('QuizContainer', { deck })}>
                <Text style={styles.submitBtnText}>Start Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.AndroidSubmitBtn} onPress={() => navigation.navigate('NewCard', { deck: deck.title })}>
                <Text style={styles.submitBtnText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
          : <ActivityIndicator style={[styles.center, { flex: 1 }]} />
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
