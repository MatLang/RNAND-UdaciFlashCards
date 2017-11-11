import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

export default class NewDeck extends Component {
  render(){
    return (
      <View>
        <Text>ABC</Text>
        <Button title='Clear Storage' onPress={() => AsyncStorage.clear()}>Test</Button>
      </View>
    )
  }
}
