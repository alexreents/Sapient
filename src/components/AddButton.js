import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';


//import Icon from 'react-native-vector-icons/AntDesign'

const AddButton = ({ onPress, style }) => {
    return (
        <View style={styles.addBtn}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 20,
        bottom: 20,
    },
    buttonContainer: {
        width: 75,
        height: 50,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff'
    }
});

export default AddButton;