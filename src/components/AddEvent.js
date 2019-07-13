import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, TextInput, Platform, TouchableOpacity, StyleSheet, Text, View, Button, SectionList, AsyncStorage, FlatList, Image, ScrollView, Alert, ToastAndroid, Picker, Modal } from 'react-native';
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import styles from '../assets/css/mainStyle';
import { Actions } from 'react-native-router-flux';
import Share, { ShareSheet } from 'react-native-share';
import Loader from './Loader';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HideableView from 'react-native-hideable-view';
import DismissKeyboard from 'dismissKeyboard';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';



export default class AddEvent extends Component {

    constructor() {
      super();
      this.state = {
        loggedInUser: {},
        noofvolunteer:0,
        selectedstartHours: 0,
        selectedendHours: 0,
        selectedstartMinutes:0,
        selectedendMinutes:0,
        modalVisible:false,
        resposibiltylist:[],
        responsibilityname:'',

        


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
      }
    
      submitEvent()
     {
       var startTime = this.state.selectedstartHours +':'+  this.state.selectedstartMinutes;
       var endTime = this.state.selectedendHours +':'+  this.state.selectedendMinutes;

      
     }

     loadresponsibility()
     {
      var objThis = this;
      TeacherServices.loadresponsibility(this.state.loggedInUser.member_no,this.state.app_token).then((response) => {
        
        if (response.data.status == 'Success') {
          objThis.setState({ 'resposibiltylist': response.data['user_list'] });
  
        }
      })
      
     }


     Addresponsibilty()
     {
      var objThis = this;
      objThis.loadresponsibility();
      objThis.setState({ modalVisible: true });
     }


     handleSubmit() {
      var objThis = this;
      TeacherServices.addresponsibility(this.state.loggedInUser.member_no,this.state.responsibilityname,this.state.app_token).then((response) => {
     
        if (response.data.status == 'Success') {
          objThis.loadresponsibility();  
        }
      })
      objThis.setState({ modalVisible: true });
      
    }

      closeModal()
      {
        this.setState({ modalVisible: false });
      }
  
 
     render() {
         
    var noofVolunteers = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
       ];
       const { selectedstartHours, selectedstartMinutes,selectedendHours,selectedendMinutes } = this.state;
       
       
        var objThis = this;
        return (
    
          <View>
           <ScrollView>

           <View style={styles.logincontainer}>

           <TextInput style={styles.inpustyle} placeholder="Event Name" placeholderTextColor="black" onChangeText={(text) => this.setState({ name: text })} />
           <TextInput style={styles.inpustyle} placeholder="Event Description" placeholderTextColor="black" onChangeText={(text) => this.setState({ email: text })} />
           <View style={styles.PickerViewBorder}>
              <Picker style={[styles.inpustylePicker]} selectedValue={this.state.noofvolunteer} onValueChange={(itemValue, itemIndex) => this.setState({ noofvolunteer: itemValue })}>
                {
                  noofVolunteers.map(function (item, key) {
                    return (

                      <Picker.Item label={item.label} value={item.value} key={key} />

                    )
                  })
                }
              </Picker>
              <TouchableWithoutFeedback title="Voluteer" onPress={() => this.Addresponsibilty()}>
            <View style={styles.classbtn}>
              <Text style={styles.buttonText}>Responsibility</Text>
            </View>
          </TouchableWithoutFeedback>



          <Modal transparent={true} visible={this.state.modalVisible} animationType={'slide'} onRequestClose={() => this.closeModal()} >
            <View style={styles.modelContainer} >
              <ScrollView>

                <Text style={styles.eventlistcolor}>Add Responsibility</Text>
                <TextInput style={styles.selectbottomborder} placeholder="Create New Responsibility" onChangeText={(value) => this.setState({ responsibilityname:value})} value={this.state.responsibilityname} />
                <TouchableHighlight style={styles.classbtn} title="Create New Responsibility" onPress = {() => this.handleSubmit()} >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableHighlight>
              


                <View style={styles.dashcontainer}>
                  <FlatList
                    data={this.state.resposibiltylist}
                    renderItem={({ item }) =>

                      <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                        <View style={[styles.listviewpage, styles.classstoryparents]} >
                        <Text>{item.responsibilty}</Text>


                        </View>
                      </TouchableWithoutFeedback>
                    }

                    keyExtractor={(item, index) => index}
                  />
                  <TouchableHighlight
                    style={styles.classbtn}
                    title="Close" onPress={() => this.closeModal()}  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableHighlight>

                </View>

              </ScrollView>
            </View>
          </Modal>


            </View> 
            <DatePicker
                          style={styles.datepickerbox}
                          date={this.state.startDate}
                          mode="date"
                          placeholder="select start date"
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
                          onDateChange={(date) => { this.setState({ startDate: date }) }}
                        />

<DatePicker
                          style={styles.datepickerbox}
                          date={this.state.endDate}
                          mode="date"
                          placeholder="select End date"
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
                          onDateChange={(date) => { this.setState({ startDate: date }) }}
                        />


        
              </View>
              
              <Text>{this.state.selectedstartHours}:{this.state.selectedstartMinutes}</Text>
        <TimePicker
          selectedHours={selectedstartHours}
          selectedMinutes={selectedstartMinutes}
          onChange={(hours, minutes) => this.setState({ selectedstartHours: hours, selectedstartMinutes: minutes })}
        />
        
       <Text>{this.state.selectedendHours}:{this.state.selectedendHours}</Text>

        <TimePicker 
          selectedHours={selectedendHours}
          selectedMinutes={selectedendMinutes}
          onChange={(hours, minutes) => this.setState({ selectedendHours: hours, selectedendMinutes: minutes })}
        />
           </ScrollView>


           <TouchableWithoutFeedback title="Submit Event" onPress={() => this.submitEvent()}>
            <View style={styles.classbtn}>
              <Text style={styles.buttonText}>Submit Eveent</Text>
            </View>
          </TouchableWithoutFeedback>
              </View>
        );
      }
    
    }