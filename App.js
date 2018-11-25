import React from 'react';
import { StyleSheet, Text, View , ActivityIndicator, FlatList } from 'react-native';
import API_KEY from './config_keys.js'

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount() {
    return fetch(
      'https://api.propublica.org/congress/v1/115/senate/members.json', {
      headers: {
        'X-API-Key': API_KEY
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
        isLoading: false,
        dataSource: responseJson.results[0].members,
      }, function() {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.first_name} {item.last_name}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
