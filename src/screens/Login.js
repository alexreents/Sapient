import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class Login extends Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password, errorMessage } = this.state
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => Actions.Books({}))
        .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('Signup')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})