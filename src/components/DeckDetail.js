import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, StyleSheet, StackNavigator  } from 'react-native';
import { getDeck } from '../../utils/api';
import NewCard from './NewCard';
import { white, blue, black, purple, gray } from '../../utils/colors';

export default class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if(this.props.navigation.state.params.deck !== undefined){
      getDeck(this.props.navigation.state.params.deck)
      .then(result => {
        const deck = result;
        this.setState((state) => {
          
          return {
            deck
          }
        })
      })
    }
    else {
      getDeck(this.props.state.routeName)
      .then(result => {
        const deck = result;
        this.setState((state) => {
          return {
            deck
          }
        })
      })
    } 
  }

  render() {
    const { navigation } = this.props;
    const { deck } = this.state;
    return (
      <View style={styles.container}>
      {typeof deck === 'object' && deck.title !== undefined
      ? <View style={styles.container}>
          <View style={{flex:.7, alignItems: 'center', justifyContent:'center', borderBottomWidth: .3, borderBottomColor: black}}>
            <Text style={styles.titleText}>{deck.title}</Text>
            <Text style={styles.baseText}>{deck.questions.length} cards</Text>
          </View>
          <View style={{flex:.3, justifyContent: 'center', borderBottomWidth: .3, borderBottomColor: black}}>
            <TouchableOpacity style={styles.AndroidSubmitBtn}>
              <Text style={styles.submitBtnText}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AndroidSubmitBtn} onPress={()=>navigation.navigate('NewCard', {deck:deck.title})}>
              <Text style={styles.submitBtnText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      : <ActivityIndicator style={{flex:1,justifyContent: 'center', alignItems:'center'}}/>
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
    //alignSelf: 'center',
    //justifyContent: 'center',
    alignItems: 'center',

  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    //textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    //alignItems: 'center'
  },
  center: {
    //flex: 1,
    //height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    //marginLeft: 30,
    //marginRight: 30,
    //borderWidth: .5,
    //borderColor: black
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