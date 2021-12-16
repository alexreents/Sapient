import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, FlatList, ScrollView, List, SafeAreaView } from 'react-native'
import AddButton from '../components/AddButton';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/BookActions';
import BookItem from './BookItem';

class Books extends Component {
  state = {email: '', password: ''}

  componentWillMount() {
    this.props.fetchBooks();
  }

  componentDidMount() {
    const { currentUser } = auth();
    this.setState({ currentUser });
  }

  _renderRow(book) {
    return <BookItem book={book}/>
  }

  _renderItem = ({item}) => {
    //return <View><Text>{item.title}</Text></View>

    return <BookItem book={item}/>
  }

  _renderBooks() {
    if (this.props.loading) {
        return <Spinner size="large"/>
    } 

    obj = this.props.dataSource.books;
    //console.log(this.props);
    const result = [];
    try { 
      Object.keys(obj).forEach(function(key) {
        myBook = obj[key];
        result.push(myBook);
      });
    } catch {

    }

    if (this.props.booksAvailable)
        return (
          <View>
            <Text>Above</Text>
            <SafeAreaView style={styles.content}>
              <FlatList
                data={result}
                renderItem={this._renderItem}
                //keyExtractor={book => book.id}
              />
            </SafeAreaView>
            <Text>Below</Text>
          </View>
        )
        return (
            <Text>Start by adding notes!</Text>
        )
  };

  /*renderRow={this._renderRow}
            <FlatList
              data={this.props.dataSource.books}
              renderItem={({item: { title }) => <Text>{title}</Text>}
              keyExtractor={({id}) => id.toString()}
            />
            */

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
        <AddButton onPress={() => this.props.navigation.navigate('AddBook')}/>
      </View>
    )
  }
}

/*
const dataSource = new FlatList.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const dataSource = (listData, renderItem) => {
  return {
    <FlatList data={rowHasChanged: (r1, r2) => r1 !== r2} />
  }
}
*/

const mapStateToProps = (state) => {
  // state is here correctly 
  return {
      booksAvailable: state !== {},
      loading: false, //state.book.loading,
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
  }
})


