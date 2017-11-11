import { AsyncStorage } from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciFlashCards'

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
      console.log('Card added');
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