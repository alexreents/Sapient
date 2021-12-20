import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import AddButton from '../components/AddButton';
import auth from '@react-native-firebase/auth'

export default class Discover extends Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={() => this.props.navigation.navigate('Books')}>{'< '} Books</Text>
        <Text style={styles.text} onPress={() => this.props.navigation.navigate('Settings')}>Settings</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 50
  },
  text: {
    fontWeight: '700'
  }
})


