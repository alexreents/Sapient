import React, { Component, useState } from 'react'
import { Dimensions, StyleSheet, Platform, Image, Text, TextInput, View, Button, FlatList, ScrollView, List, SafeAreaView } from 'react-native'
import filter from 'lodash.filter'
import AddButton from '../components/AddButton';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/BookActions';
import BookItem from './BookItem';
import { Spinner } from '../common/Spinner';
import { Actions } from 'react-native-router-flux';

class Books extends Component {
  state = {email: '', password: '', result: [], query: '', fullData: [], refresh: false}

  componentDidMount() {
    const { currentUser } = auth();
    this.setState({ currentUser });
    this.props.fetchBooks();
    this.props.fetchBooks();
  }

  componentDidUpdate() {
    const res = []
    obj = this.props.dataSource.books;
    try { 
      Object.keys(obj).forEach(function(key) {
        myBook = obj[key];
        res.push(myBook);
      });
    } catch {}

    this.state.result = res;
    this.state.fullData = res;
  }



  renderHeader = () => (
    this.props.loading ? (
      <View>
        <Spinner />
      </View>
    ) : (
    <View
      style={styles.searchBarContainer}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={this.handleSearch}
        status='info'
        placeholder='Search'
        style={styles.searchBar}
      />
    </View>
  ))

  handleSearch = text => {
    this.setState({ 
      refresh: !this.state.refresh
    })

    const result = filter(this.state.fullData, user => {
      return this.contains(user, text)
    })
    this.state.result = result;
  }

  contains = ({ title }, query) => {
    formattedTitle = title.toLowerCase();
    formattedQuery = query.toLowerCase();

    if (formattedTitle.includes(formattedQuery)) {
      return true
    }
    return false
  }

  _renderItem = ({item}) => {
    return <BookItem book={item}/>
  }

  render() {
    const { currentUser } = this.state; 

    if (this.props.loading) {
      return <Spinner />
    }

    return (
      
      <View style={styles.container}>
        <Text style={styles.explore} onPress={() => this.props.navigation.navigate('Discover')}>Explore</Text>
        <Text style={styles.text}>
          My Collection
        </Text>
        <View>
        
        <View style={styles.fullContent}>
          <SafeAreaView style={styles.content}>
            <FlatList 
              data={this.state.result}
              extraData={this.state.refresh}
              renderItem={this._renderItem}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={this.renderHeader}
            />
          </SafeAreaView>
        </View>
        </View>
        <AddButton onPress={() => Actions.AddBook()}/>
      </View>
    )
  }
}

//<AddButton onPress={() => this.props.navigation.navigate('AddBook')}/>


const mapStateToProps = (state) => {
  return {
      booksAvailable: state !== {},
      loading: state.loading,
      dataSource: state
  };
};

export default connect(mapStateToProps, { fetchBooks })(Books);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  text: {
    marginTop: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  explore: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: 20,
    fontWeight: '700'
  }, 
  fullContent: {

  },
  content: {
    marginTop: 10,
    alignItems: 'center',
    overflow: 'visible',
    marginBottom: 100,
  },
  searchBarContainer: {
    alignSelf: 'center',
    width: 0.75*windowWidth + 40,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  searchBar: {
    flexDirection:'row',
    paddingVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
})


