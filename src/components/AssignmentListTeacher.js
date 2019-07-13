import React, { Component } from 'react';
import { TextInput, TouchableHighlight, TouchableWithoutFeedback, Clipboard, Platform, TouchableOpacity, StyleSheet, Text, View, Button, SectionList, AsyncStorage, FlatList, Image, ScrollView, Alert, ToastAndroid, Picker, Modal } from 'react-native';
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import styles from '../assets/css/mainStyle';
import { Actions } from 'react-native-router-flux';
import Share, { ShareSheet } from 'react-native-share';
import Loader from './Loader';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HideableView from 'react-native-hideable-view';
import DismissKeyboard from 'dismissKeyboard';
import DatePicker from 'react-native-datepicker'

export default class AssignmentListTeacher extends Component {

  constructor() {
    super();
    this.state = {
      loggedInUser: {},
      showLoader: 0,
      assignmentList: [],
      title: '',
      fromDate: null,
      toDate: null,
      page_number: 1,
      modalVisible: false,
      total_submit_count: 0,
      classid: 0,
      classname: '',

    }
  }

  async componentWillMount() {

    DismissKeyboard();

    Actions.refresh();
    await AsyncStorage.getItem('app_token').then((value) =>
      this.setState({ "app_token": value })
    );
    await AsyncStorage.getItem('loggedInUser').then((value) =>
      this.setState({ "loggedInUser": JSON.parse(value) })
    );

    await AsyncStorage.getItem('classid').then((value) =>
      this.setState({ "classid": value })
    )
    await AsyncStorage.getItem('classname').then((value) =>
      this.setState({ "classname": value })
    )

    //Load the assignment list
    this.getAssignmentList();

  }

  _renderLeftHeader() {
    return (

      <View style={styles.Leftheaderstyle}>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <FontAwesome style={styles.headerfont}>{Icons.times}</FontAwesome>
        </TouchableOpacity>
      </View>
    )
  }

  _renderMiddleHeader() {
    return (

      <View style={styles.Middleheaderstyle}>
        <Text style={styles.MiddleHeaderTitlestyle}>{this.props.title}({this.state.classname})</Text>
      </View>
    )
  }

  _renderRightHeader() {
    return (

      <View style={styles.Rightheaderstyle}>
        <TouchableOpacity onPress={() => { Actions.CreateAssignment() }}  >
          <Text style={styles.textright}><FontAwesome style={styles.headerfont}>{Icons.plusCircle}</FontAwesome></Text>
        </TouchableOpacity>
      </View>
    )
  }

  getAssignmentList() {
    var objThis = this;
    this.setState({ "showLoader": 0 });


    if (this.state.fromDate && this.state.toDate) {
      /*Formate the date according to API need */
      var d = new Date(this.state.fromDate);
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var year = d.getFullYear();
      var fromDate = year + '-' + month + '-' + day;


      var d = new Date(this.state.toDate);
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var year = d.getFullYear();
      var toDate = year + '-' + month + '-' + day;
    }
    else {
      var fromDate = '';
      var toDate = '';

    }


    TeacherServices.getAssignmentList(this.state.classid, fromDate, toDate, this.state.page_number, this.state.title, this.state.app_token).then(function (response) {

      objThis.setState({ "showLoader": 0 });
      if (response.data['status'] == "Success") {
        objThis.setState({ 'assignmentList': response.data['assignment_list'], 'total_submit_count': response.data['total_submit_count'] });
      }

    });
  }

  onTitleChange(title) {
    this.setState({ title: title }, () => { this.getAssignmentList() });
    console.log(this.state);
  }

  onSubmitSearch() {
    console.log(this.state);
    //validate the date
    if ((!this.state.fromDate) || (!this.state.toDate)) {
      Alert.alert(
        '',
        'Please select both start date and end date',
        [
          { text: 'OK', style: 'cancel' },
        ],
      );
      return false;
    }

    if ((new Date(this.state.fromDate)).getTime() > (new Date(this.state.toDate)).getTime()) {
      Alert.alert(
        '',
        'End date should be greater than start date',
        [
          { text: 'OK', style: 'cancel' },
        ],
      );
      return false;
    }


    this.getAssignmentList()
  }

  openNotification(assignmentId) {
    AsyncStorage.setItem('assignmentId', assignmentId.toString());
    Actions.AssignmentNotification();
  }

  removeAssignmentCnf(assignmentId) {
    var objThis = this;
    console.log(assignmentId);
    Alert.alert(
      '',
      'Would you like to remove this Assignment ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => objThis.removeAssignment(assignmentId) },
      ],
    );

  }

  removeAssignment(assignmentId) {


    var objThis = this;
    var dataParam = {
      token: objThis.state.app_token,
      id: assignmentId.toString()
    }

    TeacherServices.removeAssignment(dataParam).then(function (resp) {

      if (resp['data']['status'] == "Success") {

        objThis.getAssignmentList();
        ToastAndroid.showWithGravity(
          'Assignment Removed successfully.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      else {
        ToastAndroid.showWithGravity(
          'Unable to remove Assignment. Please try again later',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    });
  }

  editAssignment(assignment) {
    /*
    AsyncStorage.setItem('assignment_edit_data',JSON.stringify(assignment)).then( ()=>
      
    );
    */

  }


  render() {
    var imagePath = config.image_url;
    var server_path = config.server_path;
    var objThis = this;
    return (

      <View>
        {/* Show the loader when data is loading else show the page */}

        {
          this.state.showLoader == 1 ?

            <View style={styles.loaderContainer}>
              <Loader />
            </View>

            :

            <ScrollView>
              {/*HEADER PART*/}
              <View style={[styles.customHeaderContainer]}>
                {this._renderLeftHeader()}
                {this._renderMiddleHeader()}
                {this._renderRightHeader()}
              </View>

              {/*START PAGE CONTAINER */}
              <View style={styles.dashcontainer} >

                <View>


                  <View style={[styles.whitebackgrounnd, styles.padding]} >
                    <View>
                      <TextInput style={styles.TextInputStyleClass}
                        placeholder="Search"
                        onChangeText={(title) => this.onTitleChange(title)} value={this.state.title} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}>
                        <DatePicker
                          style={styles.datepickerbox}
                          date={this.state.fromDate}
                          mode="date"
                          placeholder=" MM/DD/YYYY"
                          format="MM/DD/YYYY"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 10,
                              marginLeft: 0,
                              paddingRight: 10,
                              width: 20,
                              height: 20
                            },
                            dateInput: {
                              marginLeft: 0
                            }

                          }}
                          onDateChange={(date) => { this.setState({ fromDate: date }) }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <DatePicker
                          style={styles.datepickerbox}
                          date={this.state.toDate}
                          mode="date"
                          placeholder=" MM/DD/YYYY"
                          format="MM/DD/YYYY"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 10,
                              marginLeft: 0,
                              paddingRight: 10,
                              width: 20,
                              height: 20
                            },
                            dateInput: {
                              marginLeft: 0,
                            }

                          }}
                          onDateChange={(date) => { this.setState({ toDate: date }) }}
                        />
                      </View>
                    </View>

                    <View style={styles.saveattenbtn}>
                      <TouchableOpacity title="Search" onPress={() => this.onSubmitSearch()}>
                        <Text style={styles.attenbtntext}>Search</Text>
                      </TouchableOpacity>
                    </View>
                  </View>


                </View>

                {/* Start Assignment listing*/}
                <HideableView visible={this.state.assignmentList.length < 1} removeWhenHidden={true}>
                  <Text>There is no assignment available</Text>
                </HideableView>

                <FlatList
                  data={this.state.assignmentList}
                  renderItem={({ item }) =>

                    <View style={styles.eventliststyle}>

                      <View style={styles.assignmentTitleRow}>
                        <Text style={styles.White}>{item.title}</Text>
                        <TouchableWithoutFeedback onPress={() => Actions.SubmittedAssignmentList()}>
                          <View>
                            <Text style={styles.asignlisttext}>
                              {item.total_student_submit_count}/{objThis.state.total_submit_count}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>

                      <View style={{ padding: 10, }}>
                        <Text>{item.description}</Text>
                        <Text>Date: {item.created_at}</Text>
                        <Text>Submition Date: {item.submition_date}</Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>

                        <TouchableHighlight style={styles.eventsendbtn} title="Ok" onPress={() => objThis.openNotification(item.id)}>
                          <Text style={styles.buttonText}><FontAwesome>{Icons.bell}</FontAwesome> Send</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.ebventeditbtn} title="Edit" onPress={() => objThis.editAssignment(item)}>
                          <Text style={styles.buttonText}><FontAwesome>{Icons.pencil}</FontAwesome> Edit</Text>
                        </TouchableHighlight>



                        <TouchableHighlight style={styles.eventdeletebtn} title="Cancel" onPress={() => objThis.removeAssignmentCnf(item.id)}>
                          <Text style={styles.buttonText}> <FontAwesome>{Icons.trash}</FontAwesome> Delete</Text>
                        </TouchableHighlight>

                      </View>

                      <TouchableHighlight style={styles.editdisablebtn} title="Edit" onPress={() => this.closeModal()}>
                        <Text style={styles.buttonText}><FontAwesome>{Icons.pencil}</FontAwesome> Edit</Text>
                      </TouchableHighlight>

                    </View>

                  }
                  keyExtractor={(item, index) => index}
                />

                {/* End Assignment listing*/}

                <View style={styles.saveattenbtn}>
                  <TouchableOpacity title="Load More" onPress={() => this.saveAttendance()}>
                    <Text style={styles.attenbtntext}>Load More</Text>
                  </TouchableOpacity>
                </View>

              </View>

            </ScrollView>
        }
      </View>
    );
  }

}