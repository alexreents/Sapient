import _ from 'lodash';
import React, { Component } from 'react';
import BookForm from './BookForm';
import { View, Text, Button, Modal, ActionSheetIOS, StyleSheet } from 'react-native';
import { updateBook, editBook, deleteBook, loadBook } from '../actions/BookActions';
import { Spinner } from '../common/Spinner';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';



class EditBook extends Component {
    state = {
        modalVisible: false,
        deleted: false
      };

    componentDidMount() {
        _.each(this.props.book, (value, prop) => {
            this.props.loadBook({ prop, value });
        });
    }

    onSavePress() {
        this.props.editBook({title: this.props.title, author: this.props.author, body: this.props.body, image: this.props.image, id: this.props.id});
        this.props.navigation.navigate('Books');
    };

    onDeletePress() {
        this.setState({modalVisible: !this.state.modalVisible});
    };

    onDeleteConfirm() {
        this.props.deleteBook(this.props.book);
        this.setState({modalVisible: !this.state.modalVisible});
        this.props.navigation.navigate('Books');
    };

    renderHeader() {
        //if (this.props.loading) {
        //    return <Spinner />
        //}

        /*
        <Text style={styles.backButton} onPress={() => {
                    //console.log("saving....");
                    this.onSavePress.bind(this);
                }}>{'< '} Save
                </Text>
        */
        return (
            <View style={styles.header}>
                <Text style={styles.backButton} onPress={this.onSavePress.bind(this)}>
                    Save
                </Text>
                <Text style={styles.deleteButton} onPress={this.onDeletePress.bind(this)}>Delete</Text>
            </View>
        )
    };

    render() {
        //console.log(this.props);
        return (
            <View style={styles.formContainer}>
                {this.renderHeader()}
                <Modal  
                    animationType="fade"
                    visible={this.state.modalVisible} 
                    transparent={false}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.confirmationContainer}>
                            <Text style={styles.confirmationText}>Are you sure you want to delete this book?</Text>
                            <View style={styles.confirmationButtons}>
                                <Text style={styles.keepText} onPress={() => this.setState({modalVisible: !this.state.modalVisible})}>Keep</Text>
                                <Text onPress={this.onDeleteConfirm.bind(this)}>Delete</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
                <BookForm {...this.props} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { title: state.title, body: state.body, author: state.author, loading: state.loading, image: state.image, id: state.id };
};

export default connect(mapStateToProps, { updateBook, editBook, deleteBook, loadBook })(EditBook);

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
    deleteButton: {
        paddingTop: 50,
        paddingRight: 20,
        fontWeight: '700',
        color: 'black',
    },
    modalContainer: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c9c9c9'
    },
    confirmationText: {
        textAlign: 'center'
    },
    confirmationContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: 20,
        marginBottom: 100,
        borderRadius: 20,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    confirmationButtons: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    keepText: {
        fontWeight: '700',
        color: '#2985ff'
    }
  })