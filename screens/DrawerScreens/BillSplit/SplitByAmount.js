import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  FlatList
} from 'react-native';
import {
  ListItem,
  CheckBox,
} from 'react-native-elements';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import {TextInputMask} from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonComponent from '../../../components/ButtonComponent'
import TextInputComponent from '../../../components/TextInputComponent'
import SearchableDropdown from "react-native-searchable-dropdown";
import * as firebase from "firebase";


let nameEmpty = false;
let noFriends = '';
let tempArray = []
const{width} = Dimensions.get('window')

export default class SplitByAmount extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      total: 0,
      tip: 0,
      friends: [],
      selectedFriends: [],
      selectedFlat: [],
      first:'',
      checkedEven: true,
      checkedAmount: false,
      disable: true,
    };

  }

  //run when page first loads
  componentDidMount() {
    nameEmpty = false;
    noFriends = '';
    tempArray = []

    // console.log('getting data from database')
    //get current logged in user
    var uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", snapshot => {
        const nameUser = snapshot.val().firstName;
        this.setState({
          first: nameUser
        });
        // console.log('got users name')
      });

    //get users friends
    firebase
      .database()
      .ref("friendslist/" + uid)
      .child("currentFriends")
      .once("value")
      .then((snapshot) => {

        var friendsArray = []
        // for each friend
        snapshot.forEach((childSnapShot) => {
          //save their first name, last name, user id, and username
          friendsArray.push({
                              key: childSnapShot.key,
                              firstName: childSnapShot.val().firstName,
                              lastName: childSnapShot.val().lastName,
                              username: childSnapShot.val().username,
                            })

        });
        this.setState({friends: friendsArray})
      })
  }

  generateSelectedFlat = (selectedFriends) => {
    let selectedFlat = this.state;

    selectedFlat = []
    var y;
    for (y in selectedFriends) {
      var name = selectedFriends[y].firstName + " " + selectedFriends[y].lastName
      selectedFlat[y] = { id: y, name: name };
    }
    this.setState({selectedFlat: selectedFlat});
    this.forceUpdate();

  }

  addFriend = item => {
    index = eval(JSON.stringify(item.id))
    item.name = ""
    const { selectedFriends, friends } = this.state;

    // And put friend in selectedFriends
    selectedFriends.push(friends[index]);

    // Pull friend out of friends
    friends.splice(index, 1);
    tempArray.splice(index, 1);

    this.generateSelectedFlat(selectedFriends)

    // Finally, update our app state
    this.setState({
      friends: friends,
      selectedFriends: selectedFriends
    });
  };

  removeFriend = index => {
    const { friends, selectedFriends } = this.state;

    // And put friend in friends
    friends.push(selectedFriends[index]);

    // Pull friend out of selectedFriends
    selectedFriends.splice(index, 1);

    // Finally, update our app state
    this.generateSelectedFlat(selectedFriends)
    this.setState({
      friends: friends,
      selectedFriends: selectedFriends
    });
  };

  onEvenToggle = (checkedEven) => {
    this.setState(() => ({checkedEven}));
    if(checkedEven==true){
      this.setState({checkedAmount: false});
    }
    else{
      this.setState({checkedAmount: true});
    }
  }
  onAmountToggle = (checkedAmount) => {
    this.setState(() => ({checkedAmount}));
    if(checkedAmount==true){
      this.setState({checkedEven: false});
    }
    else{
      this.setState({checkedEven: true});
    }
  }

  showCustomField = () => {
    if(this.state.checkedCustom == true){
      return(
        <View style={styles.customContainer}>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: ''
            }}
            value={this.state.tip}
            onChangeText={(customTip) => this.checkCustom(customTip)}
            style={[styles.input, {borderColor: '#35b0d2'}]}
            ref={(ref) => this.tipField = ref}
            placeholder="$0"
            placeholderTextColor="rgba(255,255,255,0.8)"
            keyboardType={'numeric'}
            returnKeyType='go'
          />
        </View>
      )
    }
  }


  //update bill split name entered by user
  updateName = value => {
    if(value == ''){
      nameEmpty = true;
    }
    else{
      nameEmpty = false;
    }
    this.setState({name: value, disable: false})
  };

  //update custom tip entered by user
  checkCustom = () => {
    const numericCust = this.tipField.getRawValue().toFixed(2);
    this.setState({tip: numericCust});
  };

  //function to handle when user clicks review button
  onSubmitBillSplit = () => {
    console.log("CLICK")
    if(this.state.name == ''){
      nameEmpty = true;
    }
    if(this.state.selectedFriends.length == 0){
      noFriends = 'Add Some Friends!';
    }
    if(this.state.selectedFriends.length > 0){
      noFriends = '';
    }

    this.forceUpdate();

    if(nameEmpty == false && noFriends == ''){

      console.log('submitting selected friends: ', this.state.selectedFriends)

      if(this.state.checkedEven == true){
        this.props.navigation.navigate('SplitEvenly', {
                                                              name: this.state.name,
                                                              friends: this.state.selectedFriends
                                                            })
      }

      if(this.state.checkedAmount == true){
        this.props.navigation.navigate('SplitByCustomAmount', {
                                                              name: this.state.name,
                                                              friends: this.state.selectedFriends
                                                            })
      }

    }
  }

  render() {
    const { disable, selectedFriends, selectedFlat} = this.state;
    var x;
    for (x in this.state.friends) {
      var name1 = this.state.friends[x].firstName + " " + this.state.friends[x].lastName
      tempArray[x] = { id: x, name: name1 };
    }
    console.log('temp array: ', tempArray)
    var y;
    for (y in selectedFriends) {
      var name = selectedFriends[y].firstName + " " + selectedFriends[y].lastName
      this.state.selectedFlat[y] = { id: y, name: name };
    }
    return (

      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/group-dinner.jpg')} style={styles.imageContainer}>

        <View style={styles.overlay} />
        <View style={{ width: width/1.2, padding:20, paddingBottom: 0}}>

          <View style = {{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginLeft: (width-(width/2.1))/2 - 20,width: width/2.1,}}>

            <TouchableOpacity style = {styles.progressButton}
              disabled = {true}
              >
              <Text style={styles.stepLabel}>1</Text>
            </TouchableOpacity>

            <View style={[styles.line, {backgroundColor: 'rgba(225,225,225,0.2)'}]}/>

            <TouchableOpacity style = {[styles.progressButton, {backgroundColor: 'rgba(225,225,225,0.2)'}]}
              disabled = {true}
              >
              <Text style={[styles.stepLabel, {color: 'rgba(225,225,225,0.2)'}]}>2</Text>
            </TouchableOpacity>

            <View style={[styles.line, {backgroundColor: 'rgba(225,225,225,0.2)'}]}/>

            <TouchableOpacity style = {[styles.progressButton, {backgroundColor: 'rgba(225,225,225,0.2)'}]}
              disabled = {true}
              >
              <Text style={[styles.stepLabel, {color: 'rgba(225,225,225,0.2)'}]}>3</Text>
            </TouchableOpacity>

          </View>

          <View style = {{flexDirection: 'row', alignItems: 'center',marginLeft: width/5.2,width: width/1.2,}}>
            <Text style={{marginLeft: width/28, marginRight: width/12, color: 'white', fontSize: 15}}>Info</Text>
            <Text style={{marginRight: width/17, color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Amount</Text>
            <Text style={{color: 'rgba(225,225,225,0.2)', fontSize: 15}}>Review</Text>
          </View>
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={130}>
          <View style={styles.infoContainer}>


            <View style= {{alignContent:'flex-start'}}>
              <Text style={styles.inputTitle}>Name</Text>
            </View>
            <TextInputComponent
              empty = {nameEmpty}
              style = {styles.input}
              placeholder="'Sunday Brunch'"
              placeholderTextColor="rgba(0,0,0,0.5)"
              onChangeText={(name) => this.updateName(name)}
              returnKeyType='next'
            />

            <Text style={styles.inputTitle}>Friends</Text>

            <View style={styles.friendsContainer}>
              <View style={{height: selectedFriends.length*50}}>
                <FlatList
                  data={this.state.selectedFlat}
                  extraData={this.state}
                  renderItem={({item}) =>
                    <View style={styles.searchboxContainer}>
                    <Text style={{marginLeft: 25,marginTop: 9,color: 'rgba(0,0,0,0.6)', fontWeight: 'bold',fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
                    <CheckBox
                      right={true}
                      title='Remove'
                      iconRight
                      iconType='material'
                      containerStyle={{
                                        paddingTop: 7,
                                        backgroundColor: 'transparent',
                                        height: 40,
                                        margin: 0,
                                        borderColor: 'transparent'}}
                      textStyle={{color: 'rgba(0,0,0,0.6)', fontWeight: 'normal', fontSize: 12}}
                      uncheckedIcon='clear'
                      size= {22}
                      uncheckedColor='coral'
                      checked={false}
                      onIconPress={() => this.removeFriend(eval(JSON.stringify(item.id)))}
                    />

                    </View>
                  }
                  keyExtractor={item => item.id}
                />
              </View>
                <SearchableDropdown
                  // onTextChange={(value) => this.searchFriends(value)}
                  onItemSelect={item =>this.addFriend(item)}
                  containerStyle={{ padding: 5 }}
                  textInputStyle={{
                    fontSize: 15,
                    color:'white',
                    textAlign: 'center',
                    height: 40,
                    width: width-40,
                    borderWidth: 2,
                    borderColor: '#35b0d2',
                    borderRadius: 20,
                    backgroundColor: '#35b0d2',


                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    borderColor: 'rgba(255,255,255,0.4)',
                    borderWidth: 1,
                    borderRadius: 5
                  }}
                  itemTextStyle={{ color: "white", textAlign: 'center', fontSize: 15,}}
                  itemsContainerStyle={{ maxHeight: 150 }}
                  items={tempArray}
                  placeholder="Search friends"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  autoCorrect= {false}
                  resetValue={false}
                  underlineColorAndroid="transparent"
                />

              <Text style={styles.errorMessage}>{noFriends}</Text>
            </View>

            <View style={styles.optionContainer}>
              <View style={styles.circleContainer}>
                <CircleCheckBox
                  checked={this.state.checkedEven}
                  onToggle={this.onEvenToggle}
                  outerColor='#35b0d2'
                  innerColor='#35b0d2'
                  filterSize= {20}
                  innerSize= {15}
                />
              </View>
              <Text style={styles.btntext}> Split Evenly </Text>
            </View>

            <View style={styles.optionContainer}>
              <View style={styles.circleContainer}>
                <CircleCheckBox
                  checked={this.state.checkedAmount}
                  onToggle={this.onAmountToggle}
                  outerColor='#35b0d2'
                  innerColor='#35b0d2'
                  filterSize= {20}
                  innerSize= {15}
                />
              </View>
              <Text style={styles.btntext}> Split By Amount </Text>
            </View>

              <View style={{marginTop: 20, width: width-40}}>
                <ButtonComponent
                  text='NEXT'
                  onPress={() => this.onSubmitBillSplit()}
                  disabled={disable}
                  primary={true}
                />
              </View>

          </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  errorMessage:{
    color: 'red',
  },
  inputBoxContainer:{
    flex:8,
  },
  flatListContainer:{
    height: 100,
  },
  friendsContainer: {
    flex:1,
    alignItems: 'center',
  },
  searchboxContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    width: width/1.15,
    height: 40,
    borderColor: '#35b0d2',
    backgroundColor: 'rgba(255,255,255, 1)',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkBoxContainer: {
      height: 150,
    justifyContent:'space-between',
  },
  customCheckBoxContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  circleContainer:{
    height: 26,
    width:26,
  },
  optionContainer:{
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  infoContainer: {
    flex: 2,
    width: width,
    padding:20,
  },
  receiptScannerContainer: {
    width: width/2,
    justifyContent: 'flex-end'
  },
  input: {
    height:40,
    backgroundColor: 'rgba(255,255,255,1)',
    color:'rgba(0,0,0,0.5)',
    marginBottom: 5,
    paddingHorizontal:10,
    borderWidth: 2,
    borderRadius: 20,
  },
  customContainer: {
    width: width / 4,
  },
  inputTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'left',
  },
  tipText:{
    color: 'white',
    fontSize: 15,
    opacity: 0.8,
  },
  btntext: {
    color: 'white',
    fontSize: 18,
  },
  redbtntext: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center'
  },
  redButton: {
    padding: 8,
    flex: 1,
  	backgroundColor: '#202646',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'coral',
    backgroundColor: 'coral',
	},
  receiptScannerContainer: {
    marginTop: 10,
    width: width/2.5,
    height: 35,
    flex: 1,
    justifyContent: 'flex-end'
  },
  progressButton: {
    margin: 0,
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#35b0d2',
  },
  line: {
    width: width/12 ,
    height: 3,
    backgroundColor: '#35b0d2'
  },
  stepLabel: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
});
