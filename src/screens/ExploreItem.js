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

        startIndex = (index - 50 > 0) ? (index - 50) : (0);
        preText = body.substring(startIndex, index);
        matchText = body.substring(index, index + query.length);
        postText =  body.substring(index + query.length, index + 50);
        
        return (
            <TouchableOpacity onPress={this.onBookPress.bind(this)} > 
            <View>
            <View>
            <Text>{title}</Text>

            </View>
                <View
                    style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center'
                    }}>
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
      alignSelf: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 4 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
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
