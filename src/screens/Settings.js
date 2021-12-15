import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import AddButton from '../components/AddButton';
import auth from '@react-native-firebase/auth'

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

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.explore} onPress={() => this.props.navigation.navigate('Login')}>Logout</Text>
        <Text style={styles.profile}>
          Settings for {currentUser && currentUser.email}
        </Text>
        <View style={styles.body}>
          <Text style={styles.text} onPress={() => this.props.navigation.navigate('Books')}>Books</Text>
          <Text style={styles.text} onPress={() => this.props.navigation.navigate('Discover')}>Discover</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  profile: {
    alignSelf: 'center',
    marginTop: 20
  },
  text: {
    marginTop: 20,
    fontWeight: '700',
    alignSelf: 'center'
  },
  explore: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: 20,
    fontWeight: '700'
  },
  body: {
    flexDirection: "row",
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
  },
})
