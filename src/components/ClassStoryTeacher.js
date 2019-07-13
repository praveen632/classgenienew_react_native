import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  ListView,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CustomTabBar from "./CustomTabBar";
import ClassStoryTeacherServices from '../services/ClassStoryTeacherServices';
import styles from '../assets/css/mainStyle';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import config from '../assets/json/config.json';
import Loader from './Loader';
import DismissKeyboard from 'dismissKeyboard';

export default class ClassStoryTeacher extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      showLoader: 0,
      loggedInUser: {},
      classid: '',
      class_list: "",
      pagecount: '1',
      searchTerm: '',
      index: 0,
      items: {},
      postCount: '',
      teacher_ac_no: '',
      imagefolder: '',
      dataSource: {},
      userlist: {},
      modalVisible: false,
      parent_ac_no: '',
      student_no: '',
      classname: '',
      buttons: ['Class Story', 'Student Story'],
    };
  }

  async componentDidMount() {

    DismissKeyboard();
    
    await AsyncStorage.getItem('classid').then((value) =>
      this.setState({ "classid": value })
    );

    await AsyncStorage.getItem('classname').then((value) =>
      this.setState({ "classname": value })
    )
    await AsyncStorage.getItem('app_token').then((value) =>
      this.setState({ "app_token": value })
    );
    Actions.refresh({ title: this.state.classname });
    var objThis = this;
    objThis.setState({ "showLoader": 0 });
    await ClassStoryTeacherServices.getClassStudentList(this.state.app_token, this.state.classid).then((response) => {
      objThis.setState({ "showLoader": 0 });
      if (response.status == 200) {
        this.setState({ userlist: response.data.user_list })

      } else {
        throw new Error('Server Error!');
      }
    })
  }

  Classstory_student(parent_ac_no, student_no) {
    Actions.WholeClassStory({ parent_ac_no: parent_ac_no, student_no: student_no });
  }


  componentWillMount() {

  }

  render() {
    return (
      <View>
        {/* Show the loader when data is loading else show the page */}
        {
          this.state.showLoader == 1 ?
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
            :
            <ScrollView keyboardShouldPersistTaps="handled">
              <View>
                <CustomTabBar tabList={[{ 'title': 'Class Room', actionPage: () => Actions.ClassRoom(), tabIcon: 'users' }, { 'title': 'Message', actionPage: () => Actions.MessageTeacher(), tabIcon: 'comments' }, { 'title': 'Class Story', currentTab: 1, tabIcon: 'image' }]} />
              </View>
              <View style={styles.storycontainer} >
                <View>
                  <Text style={styles.textchange}>
                    Student List
                  </Text>
                </View>
                <View style={[styles.listviewclass, styles.padding]}>
                  <View style={styles.classstoryimage}>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: config.server_path + '/assets/images/all_parent.png' }} />
                  </View>
                  <View style={styles.classstorycontent}>
                    <Text onPress={() => Actions.WholeClassStory()} >
                      Whole Class Story
                  </Text>
                  </View>
                </View>
                <View style={styles.backchange}>

                  <FlatList
                    data={this.state.userlist}
                    renderItem={({ item }) => (
                      <View style={styles.listviewclass}>
                        <View style={styles.classstoryimage}>
                          <Image style={{ width: 50, height: 50 }} source={{ uri: config.server_path + '/assets/images/chat_user.png' }} />
                        </View>
                        <View style={styles.classstorycontent}>
                          <Text onPress={() => this.Classstory_student(item.parent_ac_no, item.student_no)}>
                            {item.name}
                          </Text>
                          <Text style={styles.invitelink}> {item.parent_ac_no == '0' ? <Text onPress={() => Actions.InviteParents()}>Invite parent</Text>
                            : null}</Text>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item, index) => index}
                  />
                </View>
              </View>
            </ScrollView>
        }
      </View>
    );
  }
}
