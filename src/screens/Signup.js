import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


export default class Signup extends Component {
    state = { email: '', password: '', errorMessage: null, placeholderEmail: "Email", placeholderPassword: "Password" }

    handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Books'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }
render() {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/paintsplash3.png')} style={styles.backgroundImage}/>
        <KeyboardAvoidingView behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.textContainer}>
            <Text style={styles.title} onPress={() => this.props.navigation.navigate('Landing')}>
              <Icon name="chevron-left" size={20} style={{paddingRight: 5}} />
              {"  "}Sign up
            </Text>
            {this.state.errorMessage && 
            <Text style={styles.description}>
              {this.state.errorMessage}
            </Text>}
            <ScrollView>
              <TextInput
                selectionColor={'white'}
                style={styles.emailTextInput}
                autoCapitalize="none"
                placeholder={this.state.placeholderEmail}
                onFocus={() => this.setState({ placeholderEmail: '' })}
                placeholderTextColor={'white'}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <TextInput
                selectionColor={'white'}
                secureTextEntry
                style={styles.passwordTextInput}
                autoCapitalize="none"
                placeholder={this.state.placeholderPassword}
                onFocus={() => this.setState({ placeholderPassword: '' })}
                placeholderTextColor={'white'}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
              <TouchableOpacity style={styles.loginBtnContainer} onPress={this.handleSignUp}>
                  <Text style={styles.loginBtn}>Sign up</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                <View>
                  <Text style={{width: 50, textAlign: 'center', color: 'white', fontSize: 12}}>or</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
              </View>
              <TouchableOpacity style={styles.signupBtnContainer} onPress={() => Actions.Login({})}>
                  <Text style={styles.signupBtn}>Log in</Text>
              </TouchableOpacity>
            </ScrollView>

        </KeyboardAvoidingView>
    </View>
  )
}
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
      width: windowWidth,
      height: windowHeight/3
  },
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: '#63707d',
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
      backgroundColor: '#63707d',
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
      color: '#63707d',
      textAlign: 'center',
      fontWeight: '500'
  }
})