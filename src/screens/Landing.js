import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'


export default class Landing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/splashscreen.png')} style={styles.backgroundImage}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Sapient</Text>
                    <Text style={styles.description}>Knowledge management system - save, search, and share information with Sapient!</Text>
                    <View style={styles.loginBtnContainer}>
                        <Text style={styles.loginBtn} onPress={() => this.props.navigation.navigate('Login')}>Log in</Text>
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
        height: windowHeight/2
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
    title: {
        fontSize: 24,
        fontWeight: '700',
        paddingBottom: 30,
        color: 'white'
    },
    description: {
        fontSize: 16,
        paddingBottom: 30,
        color: 'white'
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
        marginTop: 10,
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