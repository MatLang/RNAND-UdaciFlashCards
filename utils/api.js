import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const DECK_STORAGE_KEY = 'UdaciFlashCards'
const NOTIFICATION_KEY = '45';

export function clearLocalNotifications(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync())
}

const createNotification = () => ({
  title: 'Keep learning!',
  body: "Don't forget to revise your decks",
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

/* Available Methods:
cancelAllScheduledNotificationsAsync()
scheduleLocalNotificationAsync()
askAsync() */

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(21);
            tomorrow.setMinutes(0);
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(tomorrow));
          }
        });
      }
    });
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDeckResults)
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((result) => {
      const decks = JSON.parse(result);
      return decks[id];
    })
}

export function saveDeckTitle({ deckName }) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((result) => {
      const decks = JSON.parse(result);
      decks[deckName] = {
        title: deckName,
        questions: [],
      }
      const newDecks = JSON.stringify(decks);
      return AsyncStorage.setItem(DECK_STORAGE_KEY, newDecks);
    })
}

export function addCardToDeck({ answer, question, deck }) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((result) => {
      const decks = JSON.parse(result);
      decks[deck].questions.push({ question, answer })
      const newDecks = JSON.stringify(decks);
      return AsyncStorage.setItem(DECK_STORAGE_KEY, newDecks);
    })
}

function setDummyData() {
  const testData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(testData));
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((data) => {
    return JSON.parse(data)
  })
}

function formatDeckResults(results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}