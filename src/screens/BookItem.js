import React, { Component } from 'react';
import { View,Button, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectBook } from '../actions/BookActions';
import { grey100 } from 'react-native-paper/lib/typescript/styles/colors';

class BookItem extends Component {

    onBookPress() {      
        Actions.EditBook({ book: this.props.book });
    }

    render() {  
        const { book, pressed } = this.props;
        
        const { id, title, lastEdit } = this.props.book;
     
        return (
                <TouchableHighlight onPress={this.onBookPress.bind(this)} >     
                    <View sytle={styles.container}>
                        <Text style={styles.text}>{title}</Text>
                    </View>
                </TouchableHighlight>
        )
    };
};

const mapStateToProps = (state, ownProps) => {
   const pressed = false; //state.selectedBook.id === ownProps.book.id;
 
   return { pressed };
};

export default connect(mapStateToProps, { selectBook })(BookItem);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      alignItems: 'center',
    }, 
    text: {
        justifyContent: 'space-around',
        alignContent: 'center',
        backgroundColor: 'grey',
        margin: 10,
        width: 0.4*windowWidth,
        height: windowHeight/5,
    }
  })
