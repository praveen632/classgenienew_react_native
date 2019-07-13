import React, { Component } from 'react';
import { TextInput, TouchableHighlight, TouchableWithoutFeedback, Clipboard, Platform, TouchableOpacity, StyleSheet, Text, View, Button, SectionList, AsyncStorage, FlatList, Image, ScrollView, Alert, ToastAndroid, Picker, Modal } from 'react-native';
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import styles from '../assets/css/mainStyle';
import { Actions } from 'react-native-router-flux';
import Loader from './Loader';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HideableView from 'react-native-hideable-view';
import DismissKeyboard from 'dismissKeyboard';
import DatePicker from 'react-native-datepicker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

export default class CreateAssignment extends Component {

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


  chooseAssignment()
  {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.images()],
    },(error,res) => {
      // Android
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      );
    });

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
              {/*START PAGE CONTAINER */}
              <View style={styles.dashcontainer} >

                <View style={[styles.whitebackgrounnd, styles.padding]} >
                  <View>
                    <TextInput style={styles.TextInputStyleClass} placeholder="Title" onChangeText={(title) => this.onTitleChange(title)} value={this.state.title} />



                    <DatePicker
                      style={styles.createassigndate}
                      date={this.state.fromDate}
                      mode="date"
                      placeholder="MM/DD/YYYY"
                      format="MM/DD/YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 0
                        }

                      }}
                      onDateChange={(date) => { this.setState({ fromDate: date }) }}
                    />

                    <TextInput style={styles.margin10} textAlignVertical={'top'} placeholder="Description" maxLength={100} multiline={true} numberOfLines={4} onChangeText={(text) => this.setState({ text })}
                      value={this.state.text} />
                  </View>

                  <View style={styles.saveattenbtn}>
                    <TouchableOpacity title="Search" onPress={() => this.onSubmitSearch()}>
                      <Text style={styles.attenbtntext}>Submit</Text>
                    </TouchableOpacity>
                  </View>


                  <View style={styles.saveattenbtn}>
                    <TouchableOpacity title="ChooseAssignment" onPress={() => this.chooseAssignment()}>
                      <Text style={styles.attenbtntext}>Choose Assignment</Text>
                    </TouchableOpacity>
                  </View>

                </View>





              </View>

            </ScrollView>
        }
      </View>
    );
  }

}