import _ from 'lodash';
import React, { Component } from 'react';
import BookForm from './BookForm';
import { View, Text, Button, Modal, ActionSheetIOS } from 'react-native';
import { updateBook, editBook, deleteBook } from '../actions/BookActions';
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

    componentWillMount() {
        _.each(this.props.book, (value, prop) => {
            this.props.editBook({ prop, value });
        });
    }

    onSavePress() {
        //this.props.editBook({title: this.props.title, body: this.props.body, id: this.props.id})
        
        const { currentUser } = auth();
        const lastEdit = new Date().toLocaleString();
    
        database().ref(`users/${currentUser.uid}/book/${this.props.id}`)
        .set({
            title: this.props.title,
            body: this.props.body,
            lastEdit : lastEdit,
            id: this.props.id
        }).then(() => {
            Actions.Books();
        });
        
    };

    onDeletePress() {
        this.setState({modalVisible: !this.state.modalVisible});
    };

    onDeleteConfirm() {
        this.props.deleteBook(this.props.book);
        this.setState({modalVisible: !this.state.modalVisible});
    };

    renderContent() {

        if (this.props.loading) {
            return <Spinner size="large"/>
            }
            return (
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible} 
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <Text style={{ fontSize: 22, textAlign: 'center'}}>Are you sure you want to delete this note?</Text>
                        <Button title="Delete Note" onPress={this.onDeleteConfirm.bind(this)}> Delete </Button>
                        <Button title="Keep Note" onPress={() => this.setState({modalVisible: !this.state.modalVisible})}> Delete </Button>
                    </Modal>
                    <BookForm {...this.props} />
                    <Button title="Save" onPress={this.onSavePress.bind(this)}>
                        Save
                    </Button>
                    <Button title="Delete" onPress={this.onDeletePress.bind(this)}>
                        Delete
                    </Button>
                </View>
            )
        };


    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { title: state.title, body: state.body, loading: state.loading, id: state.id };
};

export default connect(mapStateToProps, { updateBook, editBook, deleteBook })(EditBook);