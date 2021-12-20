import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { updateBook } from '../actions/BookActions';
import filter from 'lodash.filter'

 
class BookForm extends Component {
    state = {
        titles: [],
        error: null,
        showList: true,
        inputText: '',
        resultData: null
    }

    componentDidMount() {
      this.setState({showList: true})
    }   

    makeRemoteRequest = (myQuery) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${myQuery}&key=AIzaSyBFvQIQ90V-UsvgBjsZfn0DJ-yY3omAQXE`;

        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({resultData:res["items"]});
            if(res["items"][0]["volumeInfo"]["title"] === res["items"][1]["volumeInfo"]["title"]) {
              this.setState({
                titles: [res["items"][0]["volumeInfo"]["title"]]
              })
            } else {
              resultArray = [];
              for(i=0; i<4; i++) {resultArray.push(res["items"][i]["volumeInfo"]["title"])}
              this.setState({
                titles: [...new Set([resultArray])][0]
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
        this.setState({ titles: []});
        this.textInput.clear();
      }
    
      renderFooter = () => (
        
        <View behavior={Platform.select({android: 'padding', ios: 'padding'})} behavior={Platform.select({android: 'padding', ios: 'padding'})}
          style={styles.searchBar}>
          <TextInput
            onChangeText={this.updateSearch}
            placeholder="Search books"
            style={styles.searchBarInput}
            ref={input => { this.textInput = input }}
            onSubmitEditing={ this.handleSearch }
          />
        </View>
      )
    
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.container}>
              <KeyboardAvoidingView behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.bookDescription}>
                <Text style={styles.titleText}>{this.props.title===undefined ? ('Add new book') : (this.props.title)}</Text>
                <Text style={styles.authorText}>{this.props.author===undefined ? ('') : (this.props.author)}</Text>
                <TextInput 
                  autoCorrect={true}
                  style={styles.bodyText}
                  placeholder="Add notes here"
                  value={this.props.body}
                  onChangeText={value => this.props.updateBook({prop: 'body', value})}
                  multiline={true}
                />
              </KeyboardAvoidingView>
              
              <View behavior={Platform.select({android: 'padding', ios: 'padding'})} style={styles.searchBarContainer}>
                <FlatList 
                    style={styles.searchResultContainer}
                    ListFooterComponent={this.renderFooter}
                    data={this.state.titles}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            author = '';
                            try {
                              author = this.state.resultData[0]["volumeInfo"]["authors"][0];
                            } catch {}
                            this.props.updateBook({prop: 'title', value: item});
                            this.props.updateBook({prop: 'author', value: author});
                            this.props.updateBook({prop: 'image', value: this.state.resultData[0]["volumeInfo"]["imageLinks"]["smallThumbnail"]});
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
    return {title: state.title, body: state.body, author: state.author, image: state.image};
};

export default connect(mapStateToProps, { updateBook })(BookForm);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bookDescription: {
    flex: 1,
    margin: 15
  },
  searchBarContainer: {
    alignSelf: 'center',
    width: '90%',
    bottom: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray'
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
  searchResultContainer: {
    borderRadius: 15,
  },
  searchResultItems: {
    paddingVertical: 15,
    backgroundColor: '#d9dcff',
    paddingHorizontal: 20,
    flexDirection:'row',
    borderColor: 'gray',
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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  },
  authorText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: 'gray'
  },
  bodyText: {
    padding: 10,
    marginTop: 15
  }
})