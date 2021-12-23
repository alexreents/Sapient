import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, Text, TextInput, View, Button, Dimensions, Image } from 'react-native'
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
          <Image source={require('../assets/splashscreen2.png')} style={styles.backgroundImage}/>
          <View style={styles.textContainer}>
              <Text style={styles.title}>Login</Text>
                  {this.state.errorMessage &&
              <Text style={styles.description}>
                {this.state.errorMessage}
              </Text>}
              <TextInput
                style={styles.emailTextInput}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={'gray'}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <TextInput
                secureTextEntry
                style={styles.passwordTextInput}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor={'gray'}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
              <View style={styles.loginBtnContainer}>
                  <Text style={styles.loginBtn} onPress={this.handleLogin}>Log in</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                <View>
                  <Text style={{width: 50, textAlign: 'center', color: 'gray', fontSize: 12}}>or</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
              </View>
              <View style={styles.signupBtnContainer}>
                  <Text style={styles.signupBtn} onPress={() => this.props.navigation.navigate('Signup')}>Sign up</Text>
              </View>
          </View>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    backgroundImage: {
        width: windowWidth,
        height: windowHeight/2,
        padding: -20
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'black',
    },
    textContainer: {
        marginBottom: 50,
    },
    emailTextInput: {
      color: 'white',
      fontSize: 16,
      paddingVertical: 10,
      marginTop: 10,
      marginBottom: 5,
      borderBottomColor: 'white',
      borderBottomWidth: 1
    },
    passwordTextInput: {
      color: 'white',
      fontSize: 16,
      paddingVertical: 10,
      marginTop: 5,
      marginBottom: 10,
      borderBottomColor: 'white',
      borderBottomWidth: 1
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        paddingBottom: 20,
        paddingTop: 20,
        color: 'white'
    },
    description: {
        fontSize: 14,
        color: 'yellow'
    },
    signupBtnContainer: {
        marginBottom: 10,
        marginTop: 5,
        paddingVertical: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white'
    },
    signupBtn: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '500'
    },
    loginBtnContainer: {
        marginTop: 30,
        marginBottom: 5,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    loginBtn: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '500'
    }
})