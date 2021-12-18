import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { createBook, updateBook } from '../actions/BookActions';
import { Spinner } from '../common/Spinner';
import BookForm from './BookForm';

class AddBook extends Component {
    renderButton() {
        if (this.props.loading) {
            return <Spinner />
        }
        return <Text style={styles.saveButton} onPress={this.onButtonPress.bind(this)}>{'<  '} Save</Text>
    };

    onButtonPress() { 
        this.props.createBook({title: this.props.title, body: this.props.body});
    };

    render() {
        return (
            <View style={styles.formContainer}>
                {this.renderButton()}
                <BookForm styles={styles.form}/>
            </View>
        );
    };
}

const mapStateToProps = state => {
    return {
        title: state.title,
        body: state.body,
        loading: state.loading
    };
};

export default connect(mapStateToProps, { createBook, updateBook }) (AddBook);


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        backgroundColor: 'grey'
    },
    saveButton: {
        alignSelf: 'flex-start',
        paddingTop: 50,
        paddingLeft: 20,
        fontWeight: '700',
        color: 'black',
        fontSize: 16
    } 
  })