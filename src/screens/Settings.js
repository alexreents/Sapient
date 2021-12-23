import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import AddButton from '../components/AddButton';
import auth from '@react-native-firebase/auth'
import { Actions } from 'react-native-router-flux';

export default class Settings extends Component {
  state = { currentUser: null }

  handleLogout = () => {
    auth()
    .signOut()
    .then(() => this.props.navigation.navigate('Loading'))
    .catch(error => this.setState({ errorMessage: error.message }));
  }

  componentDidMount() {
    const { currentUser } = auth()
    this.setState({ currentUser })
  }

  /*
  <Text style={styles.profile}>
    {currentUser && currentUser.email}
  </Text>
  */

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text} onPress={() => this.props.navigation.navigate('Books')}>Books</Text>
          <Text style={styles.text} onPress={() => Actions.Login({})}>Logout</Text>
        </View>
       
        <Text style={styles.info}>
          Welcome to Sapient!
        </Text>

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30
  },
  profile: {
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    marginTop: 20,
    fontWeight: '700',
    alignSelf: 'center'
  },
  info: {
    marginTop: 30,
    alignSelf: 'center'
  }
})
