import axios from 'axios';
import React, { Component } from 'react';
import config from '../assets/json/config.json';
import { StyleSheet, Text, View, Button, ImageBackground, ToastAndroid, AsyncStorage, Image, TouchableHighlight, TextInput, ScrollView, Alert } from 'react-native';
import styles from '../assets/css/mainStyle';
import CheckBox from 'react-native-checkbox';
import Loader from './Loader';
import DismissKeyboard from 'dismissKeyboard';
import DashboardTeacher from './DashboardTeacher';
import { Router, Scene, Actions } from 'react-native-router-flux';
import SignupServices from '../services/signupServices';
export default class SignTeacher extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: 0,
      loggedInUser: {},
      name: '',
      email: '',
      password: '',
      phone_number: '',
      token: '',
      checked: false,
      das_device_id: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentWillMount() {
    DismissKeyboard();
    await AsyncStorage.getItem('app_token').then((value) =>
      this.setState({ "app_token": value })
    );
    await AsyncStorage.getItem('das_device_id').then((value) =>
      this.setState({ "das_device_id": value })
    );
  }

  handleSubmit = () => {

    // Validation In Form For Proper Entry Records
    var phoneno = /^\d{10}$/;
    var letter = /^[a-zA-Z '.-]+$/;
    var password = this.state.password.value;
    //var checked = 'false';
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.state.name.match(letter)) {

      ToastAndroid.showWithGravity(
        'Please enter the name with alphabetically character only.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER

      );
    }
    else if (!re.test(String(this.state.email).toLowerCase())) {


      ToastAndroid.showWithGravity(
        'You have entered an invalid email adress , please try again ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER

      );

    }
    else if (this.state.password.length < 6) {

      ToastAndroid.showWithGravity(
        'Password must be at least 6 characters long.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER

      );
    }
    else if (!this.state.phone_number.match(phoneno)) {

      ToastAndroid.showWithGravity(
        'Mobile Number must be 10 digits',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER

      );
    }
    else if (!this.state.checked == true) {

      ToastAndroid.showWithGravity(
        'If you are  agree with the Terms Of Service, Please select the checkbox',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER

      );
    }

    else {
      this.setState({ "showLoader": 0 });
      var objThis = this;
      SignupServices.teacherSignup(this.state.name, this.state.email, this.state.password, this.state.phone_number, this.state.app_token).then(function (response) {
        objThis.setState({ "showLoader": 0 });
        if (response.data.status == 'Failure') {
          Alert.alert(
            '',
            'Email id alerady exist',
            [
              { text: 'OK', style: 'cancel' },
            ],
          )
        }

        else if (response.data.status == 'Success') {
          AsyncStorage.setItem('loggedInUser', JSON.stringify(response['data']['user_list'][0]));
          objThis.save_device_id(response['data']['user_list'][0]['member_no']);

        }

      })
    }

  }

  save_device_id(member_no) {

    SignupServices.save_device_id(this.state.app_token, this.state.das_device_id, member_no).then((response) => {

    })
    ////redirect it to dashboard
    Actions.DashboardTeacher();
  }


  render() {
    var server_path = config.server_path;
    return (

      <ImageBackground source={{ uri: server_path + 'assets/images/body-back.jpg' }} style={styles.backgroundImage}>
        <ScrollView style={styles.signupscrollstyle} contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }} keyboardShouldPersistTaps="handled">
          <View style={styles.logo}>
            <Image source={{ uri: server_path + 'assets/images/logon.png' }} style={styles.logoImage} />
            <Text style={styles.signuptext}>Get ready for your best classroom yet :)</Text>
          </View>

          <View style={styles.logincontainer}>
            <TextInput style={styles.inpustyle} placeholder="Name" placeholderTextColor="white" onChangeText={(text) => this.setState({ name: text })} />
            <TextInput style={styles.inpustyle} placeholder="Email" placeholderTextColor="white" onChangeText={(text) => this.setState({ email: text })} />
            <TextInput secureTextEntry={true} style={styles.inpustyle} placeholder="Password" placeholderTextColor="white" onChangeText={(text) => this.setState({ password: text })} />
            <TextInput style={styles.inpustyle} placeholder="Phone" placeholderTextColor="white" onChangeText={(text) => this.setState({ phone_number: text })} />

            <View style={{ flexDirection: 'row', paddingTop: 12 }}>
              <View>
                <CheckBox
                  label=''
                  onChange={(checked) => this.setState({ checked: checked })}
                  checkboxStyle={{ backgroundColor: '#fff', width: 13, height: 13, marginTop: 5, borderColor: '#fff', borderWidth: .9 }}
                />
              </View>

              <View style={{ alignItems: 'center', paddingLeft: 8, paddingRight: 20 }}>
                <Text style={styles.White}>By creating an account,you agree to the Terms Of Service and Privacy Policy</Text>
              </View>
            </View>




            <TouchableHighlight
              style={styles.submitbtn}
              title="Reset Password"
              onPress={this.handleSubmit} >
              <Text style={styles.buttonText}>
                Create Account
          </Text>
            </TouchableHighlight>


            <View style={styles.loginscreen}>
              <View style={styles.signupstyle}>
                <Text style={styles.textcolor}>Already have any account</Text>
              </View>
              <View >
                <Text style={styles.signupclassstyle} onPress={() => Actions.login()} >Login</Text>
              </View>
            </View>

          </View>

        </ScrollView>
      </ImageBackground>


    );
  }
}

