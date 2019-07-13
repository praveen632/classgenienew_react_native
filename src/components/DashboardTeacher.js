import React, { Component } from 'react';
import { TouchableWithoutFeedback, Clipboard, Platform, TouchableOpacity, StyleSheet, Text, View, Button, SectionList, AsyncStorage, FlatList, Image, ScrollView, Alert, ToastAndroid } from 'react-native';
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import styles from '../assets/css/mainStyle';
import { Actions } from 'react-native-router-flux';
import Share, { ShareSheet } from 'react-native-share';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Loader from './Loader';
import DismissKeyboard from 'dismissKeyboard';

export default class DashboardTeacher extends Component {

  constructor() {
    super();
    this.state = {
      showLoader: 0,
      classList: [],
      classlength: 0,
      loggedInUser: {},
      profileImage: '',
      image_url: '',
      school_data: [],
      school: {},
      teacher_list: {}
    }

    this.getClassList = this.getClassList.bind(this);
    this._renderLeftHeader = this._renderLeftHeader.bind(this);
    this._renderRightHeader = this._renderRightHeader.bind(this);
  }

  async componentWillMount() {
    Actions.refresh();
    DismissKeyboard();
    await AsyncStorage.getItem('app_token').then((value) =>
      this.setState({ "app_token": value })
    );
    await AsyncStorage.getItem('loggedInUser').then((value) =>
      this.setState({ "loggedInUser": JSON.parse(value) })
    );

    await AsyncStorage.getItem('school').then((value) =>
      this.setState({ 'school_data': JSON.parse(value) })

    )

    if (this.state.loggedInUser['image']) {
      var profileImage = config.image_url + '/assets/profile_image/' + this.state.loggedInUser['image'] + '?=' + Math.random();
    }
    else {

      var profileImage = config.server_path + '/assets/images/chat_user.png'+ '?=' + Math.random();
    }    

    if (this.state.school_data && this.state.school_data.school_name) {
   
      var school = this.state.school_data;
    }
    else {
     
      var school = { 'school_name': 'Join Your School', subTitle: 'Connect with teachers at your school' };
    }

    // set the data in state and call the classlist function
    this.setState({ "profileImage": profileImage, "school": school }, () => { this.getClassList() });


    AsyncStorage.setItem('classpoint', '');
    AsyncStorage.setItem('classid', '');
    AsyncStorage.setItem('classname', '');
    AsyncStorage.setItem('classimage', '');
    AsyncStorage.setItem('classgrade', '');
  }

  _renderLeftHeader() {
    return (
      <View style={styles.MiddleheaderstyleLeft}>
        <Text style={styles.MiddleHeaderTitlestyle}>{this.props.title}</Text>
      </View>
    )
  }

  _renderRightHeader() {
    return (
      <View style={styles.Rightheaderstyle}>
        <TouchableWithoutFeedback onPress={() => Actions.teacherProfile()}>
          <View style={{ width: 40, height: 40, borderRadius: 40/2}}>
            <Image style={{ width: 40, height: 40, borderRadius: 40/2 }} source={{ uri: this.state.profileImage }}></Image>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  getClassList() {
    var objThis = this;
    objThis.setState({ "showLoader": 0 });
    TeacherServices.getClassList(this.state.loggedInUser.member_no, this.state.app_token).then(function (response) {
      objThis.setState({ "showLoader": 0 });
      objThis.setState({ 'classList': response.data.user_list });
      objThis.setState({ 'classlength': (response.data.user_list).length });

    });
  }

  openClassDetail(classid, classname, classimage, classgrade, classpoint) {
    AsyncStorage.setItem('classpoint', (classpoint).toString());
    AsyncStorage.setItem('classid', classid);
    AsyncStorage.setItem('classname', classname);
    AsyncStorage.setItem('classimage', classimage);
    AsyncStorage.setItem('classgrade', classgrade);

    Actions.ClassRoom({ title: classname });
  }

  schoolinfo() {

    if (!this.state.loggedInUser.school_id) {
      Actions.JoinYourSchool();
    } else {
      this.schoolvarify();
    }

  }

  schoolvarify() {
    var objThis = this;
    objThis.setState({ "showLoader": 0 });
    TeacherServices.schoolvarify(this.state.loggedInUser.member_no, this.state.app_token).then((res) => {
      objThis.setState({ "showLoader": 0 });
      if (res.data.status == "Success") {
        if (res.data.user_list[0].status == '1' && this.state.loggedInUser.school_id != 0) {

          AsyncStorage.setItem('school_id', this.state.loggedInUser.school_id);
          Actions.SchoolStory();
        }
        else if (res.data.user_list[0].status == '0' && this.state.loggedInUser.school_id != 0) {

          ToastAndroid.showWithGravity(
            'Your account is under verification',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }
      }
      else if (res.data.error_code == 1) {
        Alert.alert(
          '',
          res.data.error_msg,
          [
            { text: 'OK', style: 'cancel' },
          ],
        );
      }

    });

  }

  openAddClassPage() {
    if (this.state.loggedInUser.status == 1) {
      if (this.state.classlength < 10) {
        Actions.AddClass()
      }
      else {
        ToastAndroid.showWithGravity(
          'You cannot add more than 10 classes.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    }
    else {
      if (this.state.classlength < 1) {
        Actions.AddClass()
      }
      else {
        ToastAndroid.showWithGravity(
          "You can't add more than one demo class as you are not join in any school",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    }

  }

  render() {
    var imagePath = config.image_url;
    var server_path = config.server_path;

    let shareOptions = {
      title: "Classgenie App",
      message: "Build your own classroom community this year with Classgenie. " + this.state.loggedInUser.name + " and other teachers of your school have already joined this community and hope that you will also love this. Turn your classroom into a digital one with Classgenie, encourage students, coordinate with parents, share school posts or classroom activities images or video or candid moments of the kids with their parents.\n\n To know more about our services please visit ",
      url: "http://www.classgenie.in",
      subject: "Classgenie App" //  for email
    };

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

              <View style={[styles.customHeaderContainer]}>
                {this._renderLeftHeader()}
                {this._renderRightHeader()}
              </View>


              <View style={styles.dashcontainer}>
                <Text style={styles.textchange}>Your School</Text>
                <TouchableOpacity style={[styles.listviewpage, styles.padding]} onPress={() => this.schoolinfo()}>
                  <Image
                    source={{
                      uri: server_path + 'assets/images/school_icon.png',
                    }}
                    style={{ flexWrap: 'wrap', width: 32, height: 32 }}
                  />
                  <View>
                    <View style={{ flexWrap: 'wrap' }}>
                      <Text style={styles.listviewmargin}>{this.state.school.school_name}</Text>
                      <Text style={styles.listviewmargin}>{this.state.school.subTitle ? this.state.school.subTitle : ''}</Text>
                    </View>
                  </View>
                </TouchableOpacity>


                <Text style={styles.textchange}>Your Classes</Text>

                <FlatList style={styles.backchange}
                  data={this.state.classList}
                  renderItem={({ item }) =>
                    <TouchableOpacity style={styles.listviewclass} onPress={() => this.openClassDetail(item.class_id, item.class_name, item.image, item.grade, item.pointweight)}>
                      <Image style={{ flexWrap: 'wrap', width: 32, height: 32 }} source={{ uri: imagePath + 'assets/class/' + item.image }} />
                      <View style={{ flexWrap: 'wrap' }}>
                        <Text style={styles.listclassmargin} >{item.class_name}</Text>
                      </View>
                    </TouchableOpacity>
                  }
                  keyExtractor={(item, index) => index}
                />

                <View style={[styles.listviewpage, styles.padding]} >
                  <FontAwesome style={styles.addclassstyle}>{Icons.plusCircle}</FontAwesome>
                  <View style={{ flexWrap: 'wrap' }}>
                    <Text style={styles.listviewmargin} onPress={() => this.openAddClassPage()}>Add a new class </Text>
                  </View>
                </View>

                {/*START FOR PAGE BOTTOM LINK FOR "REFERE TEACHER" AND "EVENT MANAGEMENT"*/}

                <Text style={styles.textchange}>Next Steps</Text>

                <TouchableWithoutFeedback onPress={() => Share.open(shareOptions)}>
                  <View style={[styles.listviewpage, styles.padding]} >
                    <Image
                      source= {{ uri: server_path + 'assets/images/refer_teacher.png' }}
                     
                      style={{ flexWrap: 'wrap', width: 32, height: 32 }}
                    />
                    <View style={{ flexWrap: 'wrap' }}>
                      <Text style={styles.listviewmargin} >
                        Refer a teacher
                </Text>
                      <Text style={styles.listviewmargin}>introduce classgenie</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => Actions.EventManagement()}>
                  <View style={[styles.listviewpage, styles.padding]} >
                    <Image
                      source= {{ uri: server_path + 'assets/images/event_management.png' }}
                      style={{ flexWrap: 'wrap', width: 32, height: 32 }}
                    />
                    <View style={{ flexWrap: 'wrap' }}>
                      <Text style={styles.listviewmargin} >
                        Event Management
                </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                {/*END FOR PAGE BOTTOM LINK FOR "REFERE TEACHER" AND "EVENT MANAGEMENT"*/}

              </View>

            </ScrollView>
        }
      </View>
    );
  }

}