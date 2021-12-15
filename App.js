

import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation' 

// import the different screens
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import Loading from './src/screens/Loading';
import Books from './src/screens/Books';
import Discover from './src/screens/Discover';
import Settings from './src/screens/Settings';

class App extends Component{
  render(){
      return(
          <AppContainer />
      )
  }
}


const myStack = createSwitchNavigator({
  'Books' : Books,
  'Discover': Discover,
  'Settings' : Settings,
  'Login': Login,
  'Loading': Loading,
  'Signup': Signup
}, {
  initialRouteName: 'Loading'
});

const AppContainer = createAppContainer(myStack)

export default App;