import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { createBook, updateBook } from '../actions/BookActions';
import { Spinner } from '../common/Spinner';
import BookForm from './BookForm';

class AddBook extends Component {
    renderButton() {
        if (this.props.loading) {
            return <Spinner />
        }
        return <Button title="Save" onPress={this.onButtonPress.bind(this)}>Save</Button>
    };

    onButtonPress() { 
        this.props.createBook({title: this.props.title, body: this.props.body});
    };

    render() {
        return (
            <View>
                <BookForm />
                {this.renderButton()}
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center'
    }
  })