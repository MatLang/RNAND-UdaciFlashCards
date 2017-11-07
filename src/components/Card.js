import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { white, blue, black, purple, gray } from '../../utils/colors';
import { NavigationActions } from 'react-navigation';

const Card = ({ title, questions, navigation, item }) => {
  return(
    <View style={styles.center}>
      <Text 
        style={styles.titleText} 
        onPress={() => navigation.navigate('DeckDetail', {card: title})}
      >
        {title}
      </Text>
      <Text style={styles.baseText}>{questions.length} cards</Text>
    </View>
  );
} 


export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    //flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    //marginLeft: 30,
    //marginRight: 30,
    borderBottomWidth: .5,
    borderBottomColor: black
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  baseText: {
    fontSize: 15,
    color: gray,
  }
})
