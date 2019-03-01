import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'

export default class SplitEvenly extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="arrows" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> split evenly</Text>
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('FriendsList')}>
        <Text style={styles.btntext}>Friends List</Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    fontSize:24,
    color: "#000",
    paddingBottom: 10,
    marginBottom:40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 40,
    marginBottom: 30,
    color: "#000",
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
    width: '60%',
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  btntext:{
    color: '#fff',
    fontWeight: 'bold',
  }
});