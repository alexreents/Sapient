import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Input } from '../common/Input';
import { connect } from 'react-redux';
import { updateBook } from '../actions/BookActions';
import filter from 'lodash.filter'

 
class BookForm extends Component {
    state = {
        data: [],
        error: null
    }
    
    makeRemoteRequest = (myQuery) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${myQuery}&key=AIzaSyDs5NRb3hET3HMb2VfCaV7TbYFgczbD2G0`;

        this.setState({ loading: true })

        fetch(url)
          .then(res => res.json())
          .then(res => {
            if(myQuery === '') {
                this.setState({
                    data: []
                })
            } else if((this.state.data[0] !== undefined) && (this.state.data[0] === this.state.data[1])) {
                this.setState({
                    data: [this.state.data[0]]
                })
            } else 
            if(this.state.data.length < 5) {
                this.setState({
                    data: [res["items"][0]["volumeInfo"]["title"], ...this.state.data]
                })
            } else {
                this.state.data.pop();
                this.setState({
                    data: [res["items"][0]["volumeInfo"]["title"], ...this.state.data]
                })
            }
          })
          .catch(error => {
            this.setState({ error })
          })
      }

    
      handleSearch = text => {
        formattedQuery = text.toLowerCase().replace(/ /g,"+");
        this.makeRemoteRequest(formattedQuery);
      }
    
      renderHeader = () => (
        <View
          style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Input
            clearButtonMode='always'
            autoCapitalize='none'
            autoCorrect={true}
            onChangeText={this.handleSearch}
            status='info'
            placeholder='Search'
            style={{
              borderRadius: 25,
              borderColor: '#333',
              backgroundColor: '#fff'
            }}
            textStyle={{ color: '#000' }}
            clearButtonMode='always'
          />
        </View>
      )
    
      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '5%'
            }}
          />
        )
      }
      
    render() {
        return (
            <View style={{paddingHorizontal: 20, paddingVertical: 20, marginTop: 40}}>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => alert('Item pressed!')}>
                        <View style={{flexDirection: 'row', padding: 16,alignItems: 'center'}}>
                            <Text category='s1' style={{ color: '#000'}}>
                                {`${item}`}
                            </Text>
                        </View>
                        </TouchableOpacity>
                    )}
                    //keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                />
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
    return {title: state.title, body: state.body};
};

export default connect(mapStateToProps, { updateBook })(BookForm);

