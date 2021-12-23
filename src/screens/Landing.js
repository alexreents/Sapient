import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Dimensions, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'
import { Actions } from 'react-native-router-flux';


export default class Landing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/paintsplash.png')} style={styles.backgroundImage}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Sapient</Text>
                    <Text style={styles.description}>Knowledge management system - save, search, and share information with Sapient</Text>
                    <TouchableOpacity style={styles.loginBtnContainer} onPress={() => Actions.Login({})}>
                        <Text style={styles.loginBtn}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupBtnContainer} onPress={() => Actions.Signup({})}>
                        <Text style={styles.signupBtn}>Sign up</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#63707d',
    },
    textContainer: {
        marginBottom: 50,
        padding: 20
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
        marginTop: 10,
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