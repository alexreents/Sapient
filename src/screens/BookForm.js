import React, { Component } from 'react';
import { View } from 'react-native';
import { Input } from '../common/Input';
import { connect } from 'react-redux';
import { updateBook } from '../actions/BookActions';

class BookForm extends Component {
    render() {
        return (
            <View>
                <Input 
                placeholder="title"
                value={this.props.title}
                onChangeText={value => this.props.updateBook({prop: 'title', value})}
                />
                <Input 
                placeholder="body"
                value={this.props.body}
                onChangeText={value => this.props.updateBook({prop: 'body', value})}
                />
            
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    const { title } = state.title;
    const { body } = state.body;
    return { title, body };
};

export default connect(mapStateToProps, { updateBook })(BookForm);

