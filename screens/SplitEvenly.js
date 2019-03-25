import React from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, StatusBar, TextInput, Button,Dimensions, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Keyboard} from 'react-native';
import {Header,Left,Right,Icon} from 'native-base'
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import {TextInputMask} from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let totalEmpty = false;
let nameEmpty = false;
const{width} = Dimensions.get('window')

export default class SplitEvenly extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      total: 0,
      tip: 0,
      disable : true,
      friends: [],
      checked10: false,
      checked15: false,
      checked18: false,
      checked20: false,
      checkedCustom: false,
      checkedNo: true
    };
  }

  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="arrows" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }

  on10Toggle = (checked10) => {
    this.setState(() => ({checked10}));
    if(checked10==true){
      this.setState({tip: (this.state.total * 0.10).toFixed(2)})
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked20 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }
  on15Toggle = (checked15) => {
    this.setState(() => ({checked15}));
    if(checked15==true){
      this.setState({tip: (this.state.total * 0.15).toFixed(2)})
      this.setState({checked10: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked20 == false
          && this.state.checked18 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  on18Toggle = (checked18) => {
    this.setState(() => ({checked18}));
    if(checked18==true){
      this.setState({tip: (this.state.total * 0.18).toFixed(2)})
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked20 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  on20Toggle = (checked20) => {
    this.setState(() => ({checked20}));
    if(checked20==true){
      this.setState({tip: (this.state.total * 0.20).toFixed(2)})
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checkedCustom: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  onCustomToggle = (checkedCustom) => {
    this.setState(() => ({checkedCustom}));
    if(checkedCustom==true){
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedNo: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checked20 == false){
            this.setState({checkedNo:true})
          }
    }
  }

  onNoToggle = (checkedNo) => {
    this.setState(() => ({checkedNo}));
    if(checkedNo==true){
      this.setState({tip: 0});
      this.setState({checked10: false});
      this.setState({checked15: false});
      this.setState({checked18: false});
      this.setState({checked20: false});
      this.setState({checkedCustom: false});
    }
    else{
      if (this.state.checked10 == false
          && this.state.checked15 == false
          && this.state.checked18 == false
          && this.state.checked20 == false
          && this.state.checkedCustom == false){
            this.setState({checkedNo:true})
          }
    }
  }

  showCustomField = () => {
    if(this.state.checkedCustom == true){
      return(
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
          style={styles.customInput}
          ref={(ref) => this.tipField = ref}
          placeholder="$0"
          placeholderTextColor="rgba(255,255,255,0.8)"
          keyboardType={'numeric'}
          returnKeyType='go'
        />

      )
    }
  }

  //update total entered by user
  checkTotal(value){
    const numericTotal = this.totalField.getRawValue().toFixed(2);
    if(numericTotal == 0){
      totalEmpty = true;
    }
    else{
      totalEmpty = false;
    }
    this.setState({total: numericTotal});
  }

  //update bill split name entered by user
  updateName(value){
    if(value == ''){
      nameEmpty = true;
    }
    else{
      nameEmpty = false;
    }
    this.setState({name: value})
  }

  //update custom tip entered by user
  checkCustom(){
    const numericCust = this.tipField.getRawValue().toFixed(2);
    this.setState({tip: numericCust});
  }

  //function to handle when user clicks review button
  onSubmitBillSplit(){
    if(this.state.name == ''){
      nameEmpty = true;
    }
    if(this.state.total == 0){
      totalEmpty = true;
    }

    this.forceUpdate();

    if(totalEmpty == false && nameEmpty == false){
      console.log("total: " + this.state.total);
      console.log("tip: " + this.state.tip)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/blue.jpg')} style={styles.imageContainer}>
        <View style={styles.overlay} />

        <KeyboardAwareScrollView contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between'
        }}>

          <View style={styles.infoContainer}>

            <View style= {{alignContent:'flex-start'}}>
              <Text style={styles.inputTitle}>Bill Split Name</Text>
            </View>
            <TextInput
              style={[styles.input,{
                borderColor: nameEmpty == true
                  ? 'red'
                  : '#35b0d2',
              }]}
              placeholder="'Sunday Brunch'"
              placeholderTextColor="rgba(255,255,255,0.8)"
              onChangeText={(name) => this.updateName(name)}
              returnKeyType='next'
              ref = 'name'
              autoCorrect={false}
            />

            <Text style={styles.inputTitle}>Total (including tax)</Text>
            <TextInputMask
              type={'money'}
              options={{
                precision: 2,
                separator: '.',
                delimiter: ',',
                unit: '$',
                suffixUnit: ''
              }}
              value={this.state.total}
              onChangeText={(total) => this.checkTotal(total)}
              style={[styles.input,{
                borderColor: totalEmpty == true
                  ? 'red'
                  : '#35b0d2',
              }]}
              ref={(ref) => this.totalField = ref}
              placeholder="$0"
              placeholderTextColor="rgba(255,255,255,0.8)"
              keyboardType={'numeric'}
              returnKeyType='go'
            />

            <Text style={styles.inputTitle}>Optional Tip</Text>

            <View style={styles.customCheckBoxContainer}>
              <View style = {styles.checkBoxContainer}>
                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked10}
                      onToggle={this.on10Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 10% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.10).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked18}
                      onToggle={this.on18Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 18% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.10).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checkedNo}
                      onToggle={this.onNoToggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> No Tip </Text>
                </View>

              </View>

              <View style={styles.checkBoxContainer}>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked15}
                      onToggle={this.on15Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 15% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.10).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checked20}
                      onToggle={this.on20Toggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> 20% </Text>
                  <Text style={styles.tipText}>(${(this.state.total * 0.10).toFixed(2)})</Text>
                </View>

                <View style={styles.optionContainer}>
                  <View style={styles.circleContainer}>
                    <CircleCheckBox
                      checked={this.state.checkedCustom}
                      onToggle={this.onCustomToggle}
                      outerColor='#35b0d2'
                      innerColor='#35b0d2'
                      filterSize= {20}
                      innerSize= {15}
                    />
                  </View>
                  <Text style={styles.btntext}> Custom: </Text>
                  {this.showCustomField()}
                </View>
              </View>
            </View>


            <Text style={styles.inputTitle}>Bill Split Friends:</Text>

            <View style={styles.container}>
              <TouchableOpacity style={styles.friendButton} onPress={() => this.props.navigation.navigate('SelectFriend')}>
                <Text style={styles.btntext}>ADD FRIENDS</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={() => this.onSubmitBillSplit()}>
                <Text style={styles.btntext}>REVIEW</Text>
              </TouchableOpacity>
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
    alignItems: 'center',

  },
  errorMessage:{
    color: 'red',
  },
  inputBoxContainer:{
    flex:8,
  },
  signUpContainer: {
    flex:1,
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
    alignItems: 'center'
  },
  header:{
    position:'absolute',
  },
  imageContainer: {
      resizeMode:'cover',
      flex:1,
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.7)',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
  titleContainer:{
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    padding: 20,
    flex: 1,
    width: width,
  },
  infoContainer: {
    flex: 2,
    width: width,
    padding:20,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  input: {
    height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'#fff',
    marginBottom: 5,
    paddingHorizontal:10,
    borderWidth: 2,
    borderRadius: 20,
  },
  customInput: {
    height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'#fff',
    width: width / 4,
    paddingHorizontal:10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#35b0d2',
  },
  title:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 25,
    textAlign:'center',
  },
  inputTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'left',
  },
  button: {
    width: 200,
    marginTop:10,
    marginBottom: 10,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#35b0d2',
    backgroundColor: '#35b0d2',
  },
  friendButton: {
    width: 150,
    marginTop:10,
    marginBottom: 10,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'coral',
    backgroundColor: 'coral',
  },
  btntext:{
    textAlign: 'center',
    color: 'rgb(32,53,70)',
    color: 'white',
    fontSize: 18,
  },
  tipText:{
    color: 'white',
    fontSize: 18,
    opacity: 0.8,
    fontSize: 15,
  }
});
