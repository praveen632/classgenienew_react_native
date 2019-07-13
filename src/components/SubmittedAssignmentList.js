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
import DatePicker from 'react-native-datepicker'


export default class SubmittedAssignmentList extends Component {

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



  render() {
    var imagePath = config.image_url;
    var server_path = config.server_path;
    var objThis = this;
    return (
      <ScrollView><View style={styles.dashcontainer}>

        <View style={styles.whitebackgrounnd} >
          <View style={styles.listviewpage} >
            <Image
              source={{
                uri: 'http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-icon.png',
              }}
              style={{ flexWrap: 'wrap', width: 32, height: 32, }}
            />
            <View style={{ flexWrap: 'wrap' }}>
              <Text style={styles.listviewmargin}>student </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 2 }}>
              <Text>Marks</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text>5</Text>
            </View>
          </View>
        </View>

        <View style={[styles.whitebackgrounnd, styles.marginTop15]} >
          <View style={styles.listviewpage} >
            <Image
              source={{
                uri: 'http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-icon.png',
              }}
              style={{ flexWrap: 'wrap', width: 32, height: 32, }}
            />
            <View style={{ flexWrap: 'wrap' }}>
              <Text style={styles.listviewmargin}>student  </Text>
            </View>
          </View>

          <View style={styles.assignmarklist}>
            <View style={{ flex: 2 }}>
              <TextInput style={styles.assignbordertext} placeholder="Enter marks" onChangeText={(text) => this.setState({ text })}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.assigntextalign}><FontAwesome style={styles.assignlistiocn}>{Icons.checkCircle}</FontAwesome></Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.assigntextalign}><FontAwesome style={styles.assigninfoicon}>{Icons.infoCircle}</FontAwesome></Text>
            </View>
          </View>
        </View>

        {/* second section */}
        <View style={[styles.whitebackgrounnd, styles.marginTop15]} >
          <View style={styles.listviewpage} >
            <Image
              source={{
                uri: 'http://icons.iconarchive.com/icons/designbolts/free-male-avatars/128/Male-Avatar-icon.png',
              }}
              style={{ flexWrap: 'wrap', width: 32, height: 32, }}
            />
            <View style={{ flexWrap: 'wrap' }}>
              <Text style={styles.listviewmargin}>student  </Text>
            </View>
          </View>

          <View style={styles.assignmarklist}>
            <View style={{ flex: 2 }}>
              <TextInput style={styles.assignbordertext} placeholder="Enter marks" onChangeText={(text) => this.setState({ text })}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ssassigntextalign}><FontAwesome style={styles.assignlistiocn}>{Icons.checkCircle}</FontAwesome></Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.assigntextalign}><FontAwesome style={styles.assignorangeicon}>{Icons.infoCircle}</FontAwesome></Text>
            </View>
          </View>
        </View>
        {/* second section end */}


        <View style={styles.saveattenbtn}>
          <TouchableOpacity title=" More" >
            <Text style={styles.attenbtntext}> More</Text>
          </TouchableOpacity>
        </View>


      </View>
      </ScrollView>
    );
  }

}