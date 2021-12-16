import React, { Component } from 'react';
import { View,Button, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectBook } from '../actions/BookActions';

class BookItem extends Component {

    
    onBookPress() {
        const { book } = this.props;
        //Actions.noteEdit({ note: this.props.note });
    }

     
    render() {  
        const { book, pressed } = this.props;
        const { id, title, lastEdit } = this.props.book;
     
        return (
                <TouchableHighlight onPress={this.onBookPress.bind(this)} >     
                    <View>
                        <Text style={{ fontSize: 22}}>{title}</Text>
                        <Text style={{ fontSize: 12}}>Edited on: {lastEdit}</Text>
                    </View>
                </TouchableHighlight>
        )
    };
};

const mapStateToProps = (state, ownProps) => {
   const pressed = state.selectedBook.id === ownProps.book.id;
 
   return { pressed };
};

export default connect(mapStateToProps, { selectBook })(BookItem);

