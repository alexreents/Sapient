import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation' 
import ReduxThunk from 'redux-thunk';
import bookReducer from './src/reducers/BookReducer';

const store = createStore(bookReducer, {}, applyMiddleware(ReduxThunk));

// import the different screens
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import Loading from './src/screens/Loading';
import Books from './src/screens/Books';
import AddBook from './src/screens/AddBook';
import EditBook from './src/screens/EditBook';
import Discover from './src/screens/Discover';
import Settings from './src/screens/Settings';

class App extends Component{
  render(){
      return(
        <Provider store={store}>
          <AppContainer />
        </Provider>   
      )
  }
}


const myStack = createSwitchNavigator({
  'Books' : Books,
  'AddBook': AddBook,
  'EditBook': EditBook,
  'Discover': Discover,
  'Settings' : Settings,
  'Login': Login,
  'Loading': Loading,
  'Signup': Signup,
}, {
  initialRouteName: 'Loading'
});

const AppContainer = createAppContainer(myStack)

export default App;