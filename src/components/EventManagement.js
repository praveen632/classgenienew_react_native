import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, Clipboard, Platform, TouchableOpacity, StyleSheet, Text, View, Button, SectionList, AsyncStorage, FlatList, Image, ScrollView, Alert, ToastAndroid, Picker, Modal } from 'react-native';
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import styles from '../assets/css/mainStyle';
import { Actions } from 'react-native-router-flux';
import Share, { ShareSheet } from 'react-native-share';
import Loader from './Loader';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HideableView from 'react-native-hideable-view';
import DismissKeyboard from 'dismissKeyboard';

export default class EventManagement extends Component {

  constructor() {
    super();
    this.state = {
      loggedInUser: {},
      showLoader: 0,
      eventList: [],
      eventSource: '',
      modalVisible: false,
      displaySchedule: 0,
      displayResponsibility: 0,
      startDateArray: [],
      endDateArray: [],
      responsibiltyList: []
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

    //Load All the event list on page load
    this.getEventList();

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
        <Text style={styles.MiddleHeaderTitlestyle}>{this.props.title}</Text>
      </View>
    )
  }

  _renderRightHeader() {
    return (

      <View style={styles.Rightheaderstyle}>
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => { Actions.AddEvent() }}  >
          <Text style={styles.textright}><FontAwesome style={styles.headerfont}>{Icons.plusCircle}</FontAwesome></Text>
        </TouchableOpacity>
      </View>
    )
  }

  getEventList() {
    var objThis = this;
    console.log(123456)
    this.setState({ "showLoader": 0 });
    TeacherServices.getEventList(this.state.loggedInUser.school_id, this.state.loggedInUser.member_no, this.state.eventSource, this.state.app_token).then(function (response) {
      console.log(response);
      objThis.setState({ "showLoader": 0 });
      if (response.data['status'] == "Success") {
        objThis.setState({ 'eventList': response.data['event_details'] });
      }

    });
  }

  changeEventSource(itemValue) {
    this.setState({ eventSource: itemValue }, () => { this.getEventList() });
  }

  showSchedule(event_id) {
    var objThis = this;
    //this.setState({ "showLoader": 0 });
    TeacherServices.getSchedule(event_id, this.state.app_token).then(function (response) {

      objThis.setState({ "showLoader": 0 });
      if (response.data['status'] == "Success") {
        let responsedata = response.data['date_time_list'][0];
        let startDateArray = responsedata.start_date.split(' ', 4);
        let endDateArray = responsedata.end_date.split(' ', 4);
        objThis.setState({ "displaySchedule": 1, "displayResponsibility": 0, "startDateArray": startDateArray, "endDateArray": endDateArray }, () => { objThis.openModel() });


      }

    });
  }

  showResponsibility(event_id) {
    var objThis = this;
    //this.setState({ "showLoader": 0 });
    TeacherServices.getResponsibiltyList(event_id, this.state.app_token).then(function (response) {

      objThis.setState({ "showLoader": 0 });
      if (response.data['status'] == "Success") {
        objThis.setState({ "displaySchedule": 0, "displayResponsibility": 1, responsibiltyList: response.data['responsibilty_list'] }, () => { objThis.openModel() });

      }

    });
  }

  openModel() {
    this.setState({ modalVisible: true });
  }
  closeModal() {
    this.setState({ modalVisible: false });
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
                <View style={styles.eventselect}>
                  <View style={styles.selecttype} >
                    <Text>Select Event Type</Text>
                  </View>
                  <View style={[styles.selectbottomborder, styles.divide]}>
                    <Picker selectedValue={this.state.eventSource} onValueChange={(itemValue, itemIndex) => this.changeEventSource(itemValue)}>
                      <Picker.Item label="All Event" value="" />
                      <Picker.Item label="Ongoing" value="ongoing" />
                      <Picker.Item label="Upcomming" value="upcomming" />
                      <Picker.Item label="Previous" value="previous" />

                    </Picker>
                  </View>
                </View>

                {/* Start Event listing*/}
                <HideableView visible={this.state.eventList.length < 1} removeWhenHidden={true}>
                  <Text>No Event Available Yet !</Text>
                </HideableView>

                <FlatList
                  data={this.state.eventList}
                  renderItem={({ item }) =>

                    <View style={styles.eventliststyle}>
                      <Text style={styles.eventlistcolor} >{item.event_list[0].event_name}</Text>
                      <View style={{ padding: 10, }}>
                        <Text>Description: {item.event_list[0].description}</Text>
                        <Text>Number of volunteers: ({item.total_volunteer_count}/{item.event_list[0].no_of_volunteer})</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>

                        <View style={styles.eventbtnstyle}>
                          <View style={styles.invitebtn}>
                            <TouchableWithoutFeedback title="Schedule">
                              <View>
                                <Text style={styles.EventText} onPress={() => objThis.showSchedule(item.event_list[0].id)}>Schedule</Text>
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        </View>

                        <View style={styles.eventbtnstyle}>
                          <View style={styles.invitebtn}>
                            <TouchableWithoutFeedback title="Responsibility">
                              <View>
                                <Text style={styles.EventText} onPress={() => objThis.showResponsibility(item.event_list[0].id)}>Responsibility</Text>
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        </View>

                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight style={styles.eventsendbtn} title="Ok" onPress={() => this.getAttendanceMail({ datetoken: 'daterange', label: 'Date Range' })}>
                          <Text style={styles.buttonText}><FontAwesome>{Icons.bell}</FontAwesome> Send</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.ebventeditbtn} title="Edit" onPress={() => this.closeModal()}>
                          <Text style={styles.buttonText}><FontAwesome>{Icons.pencil}</FontAwesome> Edit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.eventdeletebtn} title="Cancel" onPress={() => this.closeModal()}>
                          <Text style={styles.buttonText}> <FontAwesome>{Icons.trash}</FontAwesome> Delete</Text>
                        </TouchableHighlight>
                      </View>

                    </View>

                  }
                  keyExtractor={(item, index) => index}
                />

                {/* End Event listing*/}
              </View>

              {/*Start for schedule and responsibility model popup */}
              <Modal transparent={true} visible={this.state.modalVisible} animationType={'slide'} onRequestClose={() => this.closeModal()} >
              <View style={styles.modelContainer} >
                <ScrollView>

                  <HideableView visible={this.state.displaySchedule} removeWhenHidden={true}>
                  <View style={{ backgroundColor: 'rgba(224, 219, 219, 0.9)', marginBottom: 15, padding: 10, margin: 20, justifyContent: 'center' }}>
                   <Text style={{ textAlign: 'center', marginBottom: 10, color: '#000000e6' }} > Event Schedule </Text>
                   <View style={{ borderWidth: .7, borderColor: '#ddd', padding: 10, backgroundColor: '#fff' }}>
                    <Text>Start Date: {this.state.startDateArray[0]} {this.state.startDateArray[1]} {this.state.startDateArray[2]}</Text>
                    <Text>Start Time: {this.state.startDateArray[3]}</Text>
                    <Text>End Date: {this.state.endDateArray[0]} {this.state.endDateArray[1]} {this.state.endDateArray[2]}</Text>
                    <Text>End Time: {this.state.endDateArray[3]}</Text>
                    </View>
                  </View>
               </HideableView>

                  <HideableView visible={this.state.displayResponsibility} removeWhenHidden={true}>
                  <View style={{ backgroundColor: 'rgba(224, 219, 219, 0.9)', marginBottom: 15, padding: 10, margin: 20, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', marginBottom: 10, color: '#000000e6' }} > Responsibility List</Text>
                    <View style={{ borderWidth: .7, borderColor: '#ddd', padding: 10, backgroundColor: '#fff' }}>
              
                    {
                      this.state.responsibiltyList.map(function (item, key) {
                        return (

                          <Text key={key} >{item.responsibilty}</Text>

                        )
                      })
                    }
                    <HideableView visible={this.state.responsibiltyList.length < 1} removeWhenHidden={true}>
                      <Text>No responsiblity added</Text>
                    </HideableView>

                    </View>
             
              </View>
                  </HideableView>

                  <View style={styles.dashcontainer}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableHighlight style={styles.attensavebtn} title="Cancel" onPress={() => this.closeModal()}>
                        <Text style={styles.buttonText}>Close</Text>
                      </TouchableHighlight>
                    </View>
                  </View>

                </ScrollView>
                </View>
              </Modal>
              {/*End for for schedule and responsibility model popup */}

        </ScrollView>
        }
      </View>
    );
  }

}