import React, { Component } from 'react';
import { Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

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
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput/>
      </View>
    );
  };
};