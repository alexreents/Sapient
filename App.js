import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Scene, Router, Actions } from 'react-native-router-flux';
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
import BookItem from './src/screens/BookItem';

class App extends Component{
  render(){
      return(
        <Provider store={store}>
          <Routes />
        </Provider>   
      )
  }
}

const Routes = () => (
  <Router>
     <Scene key = "root">
        <Scene key = "Loading" component = {Loading} title = "Loading" initial = {true} />
        <Scene key = "Books" component = {Books} title = "Books" />
        <Scene key = "AddBook" component = {AddBook} title = "AddBook" />
        <Scene key = "BookItem" component = {BookItem} title = "BookItem" />
        <Scene key = "EditBook" component = {EditBook} title = "EditBook" />
        <Scene key = "Discover" component = {Discover} title = "Discover" />
        <Scene key = "Settings" component = {Settings} title = "Settings" />
        <Scene key = "Login" component = {Login} title = "Login" />
        <Scene key = "Signup" component = {Signup} title = "Signup" />
     </Scene>
  </Router>
)

/*
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
*/

export default App;