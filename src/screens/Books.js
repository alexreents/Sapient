import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, FlatList, ScrollView, List, SafeAreaView } from 'react-native'
import AddButton from '../components/AddButton';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/BookActions';
import BookItem from './BookItem';
import { Spinner } from '../common/Spinner';
import { Actions } from 'react-native-router-flux';


class Books extends Component {
  state = {email: '', password: ''}

  componentDidMount() {
    const { currentUser } = auth();
    this.setState({ currentUser });
    this.props.fetchBooks();

  }

  _renderItem = ({item}) => {
    return <BookItem book={item}/>
  }

  _renderBooks() {
    if (this.props.loading) {
        return <Spinner size="large"/>
    } 

    obj = this.props.dataSource.books;

    const result = [];
    try { 
      Object.keys(obj).forEach(function(key) {
        myBook = obj[key];
        result.push(myBook);
      });
    } catch {

    }

    const numColumns = 2;

    if (this.props.booksAvailable)
        return (
          <View>
            <SafeAreaView style={styles.content}>
              <FlatList 
                data={result}
                renderItem={this._renderItem}
                numColumns={2}
              />
            </SafeAreaView>
          </View>
        )
        return (
            <Text>Start by adding notes!</Text>
        )
  };


  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.explore} onPress={() => this.props.navigation.navigate('Discover')}>Discover</Text>
        <Text style={styles.text}>
          Welcome, {currentUser && currentUser.email}
          
        </Text>
        <View>
          {this._renderBooks()}
        </View>
        <AddButton onPress={() => Actions.AddBook()}/>
      </View>
    )
  }
}

//<AddButton onPress={() => this.props.navigation.navigate('AddBook')}/>


const mapStateToProps = (state) => {
  // state is here correctly 
  return {
      booksAvailable: state !== {},
      loading: state.loading, //state.book.loading,
      dataSource: state
  };
};

export default connect(mapStateToProps, { fetchBooks })(Books);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    marginTop: 20,
    fontWeight: '500',
    alignSelf: 'center'
  },
  explore: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: 20,
    fontWeight: '700'
  }, 
  content: {
    marginTop: 10,
    alignItems: 'center'
  }
})


