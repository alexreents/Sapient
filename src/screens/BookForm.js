import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, TouchableHighlight, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { updateBook } from '../actions/BookActions';
import filter from 'lodash.filter'

 
class BookForm extends Component {
    state = {
        data: [],
        error: null,
        showList: true,
        inputText: ''
    }

    componentDidMount() {
      this.setState({showList: true})
    }   

    makeRemoteRequest = (myQuery) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${myQuery}&key=AIzaSyBFvQIQ90V-UsvgBjsZfn0DJ-yY3omAQXE`;

        fetch(url)
          .then(res => res.json())
          .then(res => {
            if((this.state.data[0] !== undefined) && (this.state.data[0] === this.state.data[1])) {
                this.setState({
                    data: [this.state.data[0]]
                })
            } else if(this.state.data.length < 5) {
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

      updateSearch = text => {
        this.setState({inputText: text});
      }
    
      handleSearch = () => {
        this.setState({showList: true})

        formattedQuery = this.state.inputText.toLowerCase().replace(/ /g,"+");
        this.makeRemoteRequest(formattedQuery);
        this.setState({ data: []});
      }
    
      renderFooter = () => (
        <View behavior={Platform.select({android: 'padding', ios: 'padding'})} behavior={Platform.select({android: 'padding', ios: 'padding'})}
          style={styles.searchBar}>
          <TextInput
            onChangeText={this.updateSearch}
            placeholder={this.props.title ? (this.props.title) : ("Explore books")}
            style={styles.searchBarInput}
            ref={input => { this.textInput = input }}
          />
          <TouchableHighlight style={styles.seachGoButton} onPress={this.handleSearch}>
            <Text>Select</Text>
          </TouchableHighlight>
        </View>
      )
    
    // <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'>

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.container}>
              <KeyboardAvoidingView behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.bookDescription}>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <TextInput 
                  autoCorrect={false}
                  style={styles.bodyText}
                  placeholder="body"
                  value={this.props.body}
                  onChangeText={value => this.props.updateBook({prop: 'body', value})}
                />
              </KeyboardAvoidingView>
              <View behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.searchBarContainer}>
                <FlatList 
                    style={styles.searchResultContainer}
                    ListFooterComponent={this.renderFooter}
                    data={this.state.data}
                    renderItem={({ item }) => (
                      
                        <TouchableOpacity onPress={() => {
                            this.props.updateBook({prop: 'title', value: item});
                            this.textInput.clear()
                            this.props.title = item;
                            this.state.showList = false;
                          }
                        }>
                        { this.state.showList ? (
                          <KeyboardAvoidingView behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.searchResultItems}>
                              <Text style={styles.searchResultText}>{`${item}`}</Text>
                              <Text style={styles.suggestedText}>Suggested</Text>
                          </KeyboardAvoidingView>
                          ) : (null)
                        }
                        </TouchableOpacity>
                    )}
                />
              </View>  
            </KeyboardAvoidingView>
        )
    }
};

const mapStateToProps = (state) => {
    return {title: state.title, body: state.body};
};

export default connect(mapStateToProps, { updateBook })(BookForm);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookDescription: {
    flex: 1,
  },
  searchBarContainer: {
    alignSelf: 'center',
    width: '90%',
    bottom: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0
  },
  searchBar: {
    flexDirection:'row',
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 20,

  },
  searchBarInput: {
    flex: 1
  },
  searchGoButton: {
    flex: 1
  },
  searchResultContainer: {
    borderRadius: 15,
  },
  searchResultItems: {
    paddingVertical: 15,
    backgroundColor: 'lightgray',
    paddingHorizontal: 20,
    flexDirection:'row',
    borderColor: 'grey',
    borderBottomWidth: 1
  },
  searchResultText: {
    flex: 1,
    paddingBottom: 15
  },
  suggestedText: {
    flex: 1,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'right'
  },
  titleText: {
    
  },
  bodyText: {
  }
})