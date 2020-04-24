import { AsyncStorage } from 'react-native';

export const Storage_key = 'falshCards:Decks';

export function generateId() {
  return Math.random()
    .toString(24)
    .substring(2, 20);
}

export function createCard(question, answer) {
  return {
    question,
    answer,
  };
}

export function createDeck(title) {
  return {
    title,
    questions: [],
  };
}

const dummyData = {
    JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: ' What is JavaScript?',
            answer: 'JavaScript is a client-side as well as server side scripting language that can be inserted into HTML pages and is understood by web browsers',
          },
          {
            question: 'Which company developed JavaScript?',
            answer: 'Netscape is the software company who developed JavaScript.',
          },
          {
            question: 'What is this keyword in JavaScript?',
            answer: 'This keyword refers to the object from where it was called',
          },
        ],
      },
  React: {
    title: 'React Js',
    questions: [
      {
        question: 'What is React?',
        answer: 'React is an open-source frontend JavaScript library which is used for building user interfaces especially for single page applications',
      },
      {
        question: 'What is JSX?',
        answer: 'JSX is a XML-like syntax extension to ECMAScript (the acronym stands for JavaScript XML)',
      },
      {
        question: 'What is state in React?',
        answer: 'State of a component is an object that holds some information that may change over the lifetime of the component.',
      },
    ],
  },
  Node: {
    title: 'Node Js',
    questions: [
      {
        question: 'What is node.js?',
        answer:
          'Node.js is a Server side scripting which is used to build scalable programs',
      },
      {
        question: 'What is an event loop in Node.js ?',
        answer:
          'To process and handle external events and to convert them into callback invocations an event loop is used',
      },
      {
        question: 'What is control flow function?',
        answer:
          'A generic piece of code which runs in between several asynchronous function calls is known as control flow functions',
      },
    ],
  },
};

//get all decks
export function getAllDecks() {
  return AsyncStorage.getItem(Storage_key).then(formatDecksResults);
}

function setData() {
  AsyncStorage.setItem(Storage_key, JSON.stringify(dummyData));
  return dummyData;
}

export function formatDecksResults(results) {
  return results === null ? setData() : JSON.parse(results);
}

//save deck
export function saveDeck(key, deck) {
  AsyncStorage.mergeItem(
    Storage_key,
    JSON.stringify({
      [key]: deck,
    })
  );
  return getAllDecks();
}

//add card
export function addCardToDeck(key, question, answer) {
  AsyncStorage.getItem(Storage_key).then(result => {
    let decks = JSON.parse(result);
    decks[key].questions.push(createCard(question, answer));
    AsyncStorage.mergeItem(Storage_key, JSON.stringify(decks));
  });
  return getAllDecks()
}
