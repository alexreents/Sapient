import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { createBook, updateBook } from '../actions/BookActions';
import { Spinner } from '../common/Spinner';
import BookForm from './BookForm';
import { Actions } from 'react-native-router-flux'

class AddBook extends Component {
    renderHeader() {
        //if (this.props.loading) {
        //    return <Spinner />
        //}
        return (
            <View style={styles.header}>
                <Text style={styles.backButton} onPress={() => {
                    Actions.Books({});
                }}>{'< '} Cancel
                </Text>
                <Text style={styles.saveButton} onPress={this.onButtonPress.bind(this)}>Save</Text>
            </View>
        )
    };

    onButtonPress() { 
        this.props.createBook({title: this.props.title, body: this.props.body, author: this.props.author, image: this.props.image });
    };

    render() {
        // IMPORTANT WHY IS THIS PAGE BEING RENDERED SO MUCH ??! test: console.log(this.props)
        return (
            <View style={styles.formContainer}>
                {this.renderHeader()}
                <BookForm/>
            </View>
        );
    };
}

const mapStateToProps = state => {
    return {
        title: state.title,
        body: state.body,
        author: state.author,
        image: state.image,
        loading: state.loading
    };
};

export default connect(mapStateToProps, { createBook, updateBook }) (AddBook);


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#c9c9c9',
        flex: 1
    },
    header: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    backButton: {
        paddingTop: 50,
        paddingLeft: 20,
        fontWeight: '700',
        color: 'black',
    }, 
    saveButton: {
        paddingTop: 50,
        paddingRight: 20,
        fontWeight: '700',
        color: 'black',
    } 
  })