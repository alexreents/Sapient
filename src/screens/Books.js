import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import AddButton from '../components/AddButton';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export default class Books extends Component {
  state = {email: '', password: ''}
  componentDidMount() {
    const { currentUser } = auth()
    this.setState({ currentUser })
  }

  state = { currentUser: null }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.explore} onPress={() => this.props.navigation.navigate('Discover')}>Discover</Text>
        <Text style={styles.text}>
          Welcome, {currentUser && currentUser.email}
          
        </Text>
        <AddButton onPress={() => this.props.navigation.navigate('AddBook')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    marginTop: 20,
    fontWeight: '500',
    alignSelf: 'center'
  },
  explore: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: 20,
    fontWeight: '700'
  }
})


