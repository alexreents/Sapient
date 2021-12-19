import React, { Component } from 'react';
import { View,Button, Text, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectBook } from '../actions/BookActions';

class BookItem extends Component {

    onBookPress() {      
        Actions.EditBook({ book: this.props.book });
    }

    render() {  
        const { book, pressed } = this.props;
        
        const { id, title, lastEdit, image } = this.props.book;
        imgLink = `${image}`;
        httpsLink = imgLink.slice(0, 4) + "s" + imgLink.slice(4);

        return (
                <TouchableHighlight onPress={this.onBookPress.bind(this)} > 
                 
                    <View style={styles.container}>
                        <Image style={styles.text} source={{uri: httpsLink}}/>
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

    }
  })
