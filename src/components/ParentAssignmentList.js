import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ChangePasswordService from '../services/ChangePasswordService';
import styles from '../assets/css/mainStyle';
import Loader from './Loader';
import config from '../assets/json/config.json';
import DismissKeyboard from 'dismissKeyboard';
export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: 0,
      loggedInUser: {},
      current_pass: {},
      new_pass: {},
      confirm_new_pass: {}

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentWillMount() {
    DismissKeyboard();
    await AsyncStorage.getItem('loggedInUser').then((value) =>
      this.setState({ "loggedInUser": JSON.parse(value) })
    )

    await AsyncStorage.getItem('app_token').then((value)=> 
    this.setState({"app_token": value})
  );

  }

  handleSubmit() {
   
}
render() {
    return (
      <View>
     <Text> 
         Assignment  Detail's
         </Text>
        </View>
    );
  }
}