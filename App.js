import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification, getCurrentNotification } from './utils/api';
import { Notifications } from 'expo';
import { white, blue, black } from './utils/colors';
import DeckList from './src/components/DeckList';
import NewDeck from './src/components/NewDeck';
import NewCard from './src/components/NewCard';
import QuizContainer from './src/components/QuizContainer';
import DeckDetail from './src/components/DeckDetail';

const Tabs = TabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      header: null,
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color="white" />,
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      header: null,
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='new-message' size={30} color="white" />
    }
  }
}, {
    tabBarOptions: {
      showIcon: 'true',
      title: 'test',
      activeTintColor: black,
      style: {
        height: 75,
        backgroundColor: blue,
      },
      elevation: 10,
    }
  })

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      tabBarVisible: false,
      title: 'New Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.deck,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
      tabBarVisible: false,
    }),
  },
  QuizContainer: {
    screen: QuizContainer,
    navigationOptions: {
      tabBarVisible: false,
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  },
})

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
