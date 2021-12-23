import React, { Component } from 'react';
import { View,Button, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectBook } from '../actions/BookActions';

export default class ExploreItem extends Component {

    onBookPress() {      
        Actions.EditBook({ book: this.props.book });
    }

    render() {  
        const { book, query } = this.props;
        const { title, body } = this.props.book;

        index = body.toLowerCase().search(query.toLowerCase());

        startIndex = (index - 75 > 0) ? (index - 75) : (0);
        preText = startIndex ? ("..." + body.substring(startIndex, index)) : (body.substring(startIndex, index));
        matchText = body.substring(index, index + query.length);
        postText =  body.substring(index + query.length, index + 75) + "...";
        
        return (
            <TouchableOpacity onPress={this.onBookPress.bind(this)} > 
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.fullText}>
                        <Text>
                            <Text style={{color: 'darkgray'}}>{preText}</Text>
                            <Text style={{color: 'black'}}>{matchText}</Text>
                            <Text style={{color: 'darkgray'}}>{postText}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity:  0.2,
      shadowRadius: 3,
      margin: 10,
      borderRadius: 10
    }, 
    title: {
        fontWeight: '600',
        paddingLeft: 10,
        paddingTop: 10
    },
    fullText: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    text: {
        justifyContent: 'space-around',
        alignContent: 'center',
        margin: 10,
        width: 0.25*windowWidth,
        height: 0.375*windowWidth,
        backgroundColor: 'white'
    }, 
    titleOnly: {
        textAlign: 'center',
        padding: 3,
        fontSize: 12
    }
  })
