import React, { Component } from 'react';
import { TouchableWithoutFeedback, TouchableHighlight, StyleSheet, Text, View, Image, Button, AsyncStorage, ScrollView, FlatList, TextInput, ToastAndroid, Alert, Picker, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import styles from '../assets/css/mainStyle';
import Loader from './Loader';
import DismissKeyboard from 'dismissKeyboard';

export default class editStudent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showLoader: 0,
      loggedInUser: {},
      classid: '',
      stu_id: '',
      stu_image: '',
      stu_name: '',
      stu_image_path: '',
      stuIconList: [],
      modalVisible: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getStudentIconList = this.getStudentIconList.bind(this);
    this.openIconPop = this.openIconPop.bind(this);
    this.selectedImage = this.selectedImage.bind(this);
  }

  async componentDidMount() {

    DismissKeyboard();

    await AsyncStorage.getItem('app_token').then((value) =>
      this.setState({ "app_token": value })
    );
    await AsyncStorage.getItem('loggedInUser').then((value) =>
      this.setState({ "loggedInUser": JSON.parse(value) })
    )
    await AsyncStorage.getItem('classid').then((value) =>
      this.setState({ "classid": value })
    )

    this.setState({ "stu_id": this.props.stu_id });
    this.setState({ "stu_name": this.props.stu_name });
    this.setState({ "stu_image": this.props.stu_image });


    // if no image  then set default 
    if (!this.state.stu_image) {
      this.setState({ "stu_image": '15_6_c_6.png' });
    }

    var stu_image_path = config.image_url + "assets/" + "student/" + this.state.stu_image;
    this.setState({ "stu_image_path": stu_image_path });


    this.getStudentIconList();

  }


  getStudentIconList() {
    var objThis = this;
    objThis.setState({ "showLoader": 0 });
    TeacherServices.getStudentIconList(this.state.app_token).then(function (response) {
      objThis.setState({ "showLoader": 0 });
      objThis.setState({ 'stuIconList': response.data.user_list });

    });
  }

  handleSubmit() {
    var objThis = this;

    if (!this.state.stu_id) {
      Alert.alert(
        '',
        'This student does not exist.',
        [
          { text: 'OK', style: 'cancel' },
        ],
      );
      return false;
    }

    if (!this.state.stu_name) {
      Alert.alert(
        '',
        'Please enter student name',
        [
          { text: 'OK', style: 'cancel' },
        ],
      );
      return false;
    }

    var param = {
      token: this.state.app_token,
      id: (this.state.stu_id).toString(),
      name: (this.state.stu_name).toString(),
      image: (this.state.stu_image).toString(),

    }
    objThis.setState({ "showLoader": 0 });
    TeacherServices.updateStudent(param).then(function (resp) {
      // console.log(1234546789); 
      // console.log(resp); 
      objThis.setState({ "showLoader": 0 });
      if (resp['data']['status'] == "Success") {
        Actions.StudentListing();
        ToastAndroid.showWithGravity(
          'Student Updated Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      else {
        ToastAndroid.showWithGravity(
          'Name already exists, Please Enter another name ',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    });
  }

  removeStudentCnf() {
    Alert.alert(
      '',
      'Would you like to remove the student ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.removeStudent() },
      ],
    );

  }

  removeStudent() {
    var param = {
      token: this.state.app_token,
      id: (this.state.stu_id).toString(),
    }
    TeacherServices.removeStudent(param).then(function (resp) {

      if (resp['data']['status'] == "Success") {
        Actions.StudentListing();
        ToastAndroid.showWithGravity(
          'Student Removed Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      else {
        Alert.alert(
          '',
          'Unable to remove. Please try again later',
          [
            { text: 'OK', style: 'cancel' },
          ],
        );
      }
    });
  }

  openIconPop() {
    this.setState({ modalVisible: true });
  }
  closeModal() {
    this.setState({ modalVisible: false });
  }
  selectedImage(imageName) {
    this.closeModal();
    this.setState({ "stu_image": imageName });
    var stu_image_path = config.image_url + "assets/" + "student/" + imageName;
    this.setState({ "stu_image_path": stu_image_path });
  }

  render() {
    var imagePath = config.image_url;
    var objThis = this;
    return (

      <View style={styles.dashcontainer}>

        <View style={styles.contentCenter}>
          <View style={styles.ImageContainer}>
            <TouchableWithoutFeedback onPress={() => this.openIconPop()}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.stu_image_path }} />
            </TouchableWithoutFeedback>
          </View>
        </View>


        <View style={styles.editstudentclasss}>
          <TextInput style={styles.TextInputStyleClass} placeholder="Student Name" onChangeText={(stu_name) => this.setState({ stu_name: stu_name })} value={this.state.stu_name} />
          <TouchableHighlight style={styles.classbtn} title="Save" onPress={this.handleSubmit} >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <Text style={styles.orangetext} onPress={() => this.removeStudentCnf()}>Remove Student</Text>
        </View>

        <Modal visible={this.state.modalVisible} animationType={'slide'} onRequestClose={() => this.closeModal()}>
          <ScrollView>
            <View style={styles.editpopupimage}>
              {
                this.state.stuIconList.map(function (item, key) {
                  return (
                    <View style={styles.containerImagePop}>
                      <TouchableWithoutFeedback onPress={() => objThis.selectedImage(item.image)} key={key} >
                        <View style={styles.editimage}>
                          <Image style={{ width: 50, height: 50 }} source={{ uri: imagePath + "assets/student/" + item.image }} key={key} />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>

                  )
                })
              }
              {/* <Button onPress={() => this.closeModal()} title="Close" /> */}
            </View>

            <TouchableHighlight style={styles.classbtn} title="Close" onPress={() => this.closeModal()}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableHighlight>

          </ScrollView>
        </Modal>
      </View>

    );

  }
}
