import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { white, blue, black, purple } from '../../utils/colors';

export default class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  
  componentDidMount() {
    const card = this.props.card
  };
  
  render() {
    return (
      <View style={styles.center}>
        <FormLabel>
          Please Enter a Question
        </FormLabel>
        <FormInput 
          onChangeText={() => {}}
        />
        <FormLabel>
          Please enter the Answer
        </FormLabel>
        <FormInput 
          onChangeText={() => {}}
        />
        <Button
          title='Submit'
          buttonStyle={styles.submitBtn}
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