import React, { Component } from 'react'
import { Dimensions, StyleSheet, Platform, Image, Text, View, Button, FlatList, TextInput, TouchableOpacity } from 'react-native'
import filter from 'lodash.filter'
import AddButton from '../components/AddButton';
import { Actions } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class Discover extends Component {
  state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    query: '',
    fullData: [],
    currentUser: null
  }


  componentDidMount() {
    const { currentUser } = auth()
    this.setState({ currentUser })
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`
    this.setState({ loading: true })
    
    const { currentUser } = auth();

    database().ref(`/users/${currentUser.uid}/book`)
    .once('value')
    .then(snapshot => {
      this.setState({
        fullData: snapshot.val(),
        loading: false
      })
    })
    .catch(error => {
      this.setState({ error, loading: false })
    })

  }

  contains = ({ body }, query) => {
    if(body !== undefined && query !== '') {
      if(body.toLowerCase().includes(query)) {
        return true
      }
    }
    
    return false
  }

  handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = filter(this.state.fullData, user => {
      return this.contains(user, formattedQuery)
    })
    this.setState({ data, query: text })
  }

  renderHeader = () => (
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
  )
  



  render() {
    const { currentUser } = this.state
    return (
      <View>
      <View style={styles.container}>
        <Text style={styles.navText} onPress={() => this.props.navigation.navigate('Books')}>Books</Text>
        <Text style={styles.navText} onPress={() => this.props.navigation.navigate('Settings')}>Settings</Text>
      </View>
      <Text style={styles.text}>
          Search content
      </Text>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 0
        }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Actions.EditBook({ book: item })}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 16,
                  alignItems: 'center'
                }}>
                <Text
                  category='s1'
                  style={{
                    color: '#000'
                  }}>{item.body}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 50
  },
  navText: {
    fontWeight: '700'
  },
  text: {
    marginTop: 20,
    fontWeight: '500',
    alignSelf: 'center',
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


