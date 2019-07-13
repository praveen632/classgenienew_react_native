import React, { Component } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View, Image, Button, AsyncStorage, ScrollView, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CustomTabBar from "./CustomTabBar";
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import HideableView from 'react-native-hideable-view';
import styles from '../assets/css/mainStyle';
import Menu from 'react-native-pop-menu';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Loader from './Loader';
import DismissKeyboard from 'dismissKeyboard';

export default class ClassRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoader: 0,
      loggedInUser: {},
      studentList: [],
      groupList: [],
      classid: '',
      classname: '',
      classimage: '',
      classgrade: '',
      classpoint: '',
      currentTab: 'student',
      menuVisible: false,
      arrowPosition: 'topRight',
      left: 12,
      right: undefined,
      color: '#F5FCFF',
    }

    this.changeTab = this.changeTab.bind(this);
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
    await AsyncStorage.getItem('classname').then((value) =>
      this.setState({ "classname": value })
    )
    await AsyncStorage.getItem('classimage').then((value) =>
      this.setState({ "classimage": value })
    )
    await AsyncStorage.getItem('classgrade').then((value) =>
      this.setState({ "classgrade": value })
    )
    await AsyncStorage.getItem('classpoint').then((value) =>
      this.setState({ "classpoint": value })
    )

    Actions.refresh({ title: this.state.classname });

    this.getStudentList();
    this.getGroupList();

  }

  _renderLeftHeader() {
    return (
      <View style={styles.Leftheaderstyle}>
        <TouchableWithoutFeedback onPress={() => Actions.DashboardTeacher()}>
          <View><FontAwesome style={styles.LeftheaderIconStyle}>{Icons.arrowLeft}</FontAwesome></View>
        </TouchableWithoutFeedback>
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

        <TouchableWithoutFeedback onPress={() => {
          this.setState({
            menuVisible: true,
            arrowPosition: 'topRight',
            left: undefined,
            right: 12,
          });
        }}
        >
          <View>
            <FontAwesome style={styles.RightheaderIconStyle}>{Icons.ellipsisV}</FontAwesome>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }


  changeTab(tabName) {
    this.setState({ "currentTab": tabName })
    if (tabName == 'student') {
      this.getStudentList();
    }
    else {
      this.getGroupList();
    }
  }

  openStudentFeedback(studentId, student_no, studentName) {
    Actions.FeedbackManager({ studentId: studentId, student_no: student_no, studentName: studentName, awardTo: 'awardSingleStudent' });
  }

  openGroupFeedback(group_id, group_name) {
    Actions.GroupDetail({ group_id: group_id, group_name: group_name });
  }

  getGroupList() {
    var objThis = this;
    objThis.setState({ "showLoader": 0 });
    TeacherServices.getGroupList(this.state.classid, this.state.app_token).then(function (response) {
      objThis.setState({ "showLoader": 0 });
      objThis.setState({ 'groupList': response.data.group_list });

    });
  }

  getStudentList() {
    var objThis = this;
    objThis.setState({ "showLoader": 0 });
    TeacherServices.getStudentList(this.state.classid, this.state.app_token).then(function (response) {
      objThis.setState({ "showLoader": 0 });
      objThis.setState({ 'studentList': response.data.class_details.student_list });

    });
  }

  getPointClsBg(pointWeight) {
    if (pointWeight > 0) {
      return styles.classstyles;
    }
    else if (pointWeight < 0) {
      return styles.classtyl;
    }
    else {
      return styles.graystyle;
    }
  }

  render() {

    var imagePath = config.image_url;
    var server_path = config.server_path;
    var objThis = this;
    return (
      <View style={{ flex: 1 }}>
        {/* Show the loader when data is loading else show the page */}
        {
          this.state.showLoader == 1 ?
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
            :
            <View style={{ flex: 1 }}>
              <ScrollView>
                <View style={[styles.customHeaderContainer]}>
                  {this._renderLeftHeader()}
                  {this._renderMiddleHeader()}
                  {this._renderRightHeader()}
                </View>
                <View>
                  <CustomTabBar tabList={[{ 'title': 'Class Room', currentTab: 1, tabIcon: 'users' }, { 'title': 'Message', actionPage: () => Actions.MessageTeacher(), tabIcon: 'comments' }, { 'title': 'Class Story', actionPage: () => Actions.ClassStoryTeacher(), tabIcon: 'image' }]} />
                </View>
                <View>
                  {
                    this.state.currentTab == 'student' ?
                      <View>
                        <View style={styles.dashcontainer}>
                          {/* START FOR STUDENT TAB CONTENT */}
                          {/* START FOR TAB BUTTON */}
                          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, width: '50%' }} >
                              <View style={styles.classbtn}>
                                <TouchableWithoutFeedback disabled={true} onPress={() => console.log('')} title="Student">
                                  <Text style={styles.buttonText}>
                                    Students
                            </Text>
                                </TouchableWithoutFeedback>
                              </View>
                            </View>
                            <View style={{ flex: 1, width: '50%' }} >
                              <View style={styles.groupbtn}>
                                <TouchableWithoutFeedback onPress={() => this.changeTab('group')} title="Group">
                                  <Text style={styles.bcolor}>
                                    Groups
                            </Text>
                                </TouchableWithoutFeedback>
                              </View>
                            </View>
                          </View>
                          {/* END FOR TAB BUTTON */}
                          <View>
                            <View>
                              <TouchableWithoutFeedback onPress={() => Actions.FeedbackManager({ awardTo: 'awardWholeClass' })}>
                                <View style={styles.bgchange}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.textstylebtn}   >
                                      <Text style={objThis.getPointClsBg(this.state.classpoint)}  >
                                        {this.state.classpoint}
                                      </Text>
                                    </View>
                                  </View>
                                  <View>
                                    <Text style={styles.textcenter} >
                                      <Image style={{ width: 220, height: 220 }} source={{ uri: imagePath + 'assets/class/' + this.state.classimage }} />
                                    </Text>
                                    <Text style={styles.textc} >
                                      Class - {this.state.classname}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableWithoutFeedback>
                            </View>
                            <FlatList
                              data={this.state.studentList}
                              renderItem={({ item }) =>
                                <TouchableWithoutFeedback onPress={() => this.openStudentFeedback(item.id, item.student_no, item.name)}>
                                  <View style={styles.addback}>
                                    <View style={{ flexDirection: 'row' }}>

                                      <View style={styles.textstylebtn}   >
                                        <Text style={objThis.getPointClsBg(item.pointweight)}  >
                                          {item.pointweight}
                                        </Text>
                                      </View>
                                    </View>
                                    <View>
                                      <Text style={styles.textcenter} >
                                        <Image style={{ width: 220, height: 220 }} source={{ uri: imagePath + 'assets/student/' + item.image }} />
                                      </Text>
                                      <Text style={{ textAlign: 'center' }} >
                                        {item.name}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableWithoutFeedback>
                              }
                              keyExtractor={(item, index) => index}
                            />
                            <View style={styles.addback}>
                              <TouchableOpacity onPress={() => Actions.AddStudent()}>
                                <Text>
                                  <FontAwesome style={styles.addcolor}>{Icons.plus}</FontAwesome>
                                </Text>
                                <Text style={{ textAlign: 'center' }} >
                                  Add
                        </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>

                      :

                      <View style={styles.dashcontainer}>
                        {/* START FOR GROUP TAB CONTENT */}
                        {/* START FOR TAB BUTTON */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                          <View style={{ flex: 1, width: '50%' }} >
                            <View style={styles.groupbtn}>
                              <TouchableWithoutFeedback style={styles.groupbtn} onPress={() => this.changeTab('student')} title="Student">
                                <Text style={styles.bcolor}>
                                  Students
                      </Text>
                              </TouchableWithoutFeedback>
                            </View>
                          </View>
                          <View style={{ flex: 1, width: '50%' }} >
                            <View style={styles.classbtn}>
                              <TouchableWithoutFeedback title="Group" disabled={true}>
                                <Text style={styles.buttonText}>
                                  Groups
                      </Text>
                              </TouchableWithoutFeedback>
                            </View>
                          </View>
                        </View>
                        {/* END FOR TAB BUTTON */}
                        {/* START FOR GROUP LISTING */}
                        <View>
                          <FlatList
                            data={this.state.groupList}
                            renderItem={
                              ({ item }) =>

                                <TouchableWithoutFeedback onPress={() => this.openGroupFeedback(item.id, item.group_name)}>

                                  <View style={styles.addback}>
                                    <View style={{ flexDirection: 'row' }}>

                                      <View style={styles.textstylebtn}   >
                                        <Text style={objThis.getPointClsBg(item.pointweight)}  >
                                          {item.pointweight}
                                        </Text>
                                      </View>
                                    </View>
                                    <View>
                                      <View>
                                        <HideableView visible={item.total_no_of_student == 1} removeWhenHidden={true}>
                                          <Image style={{ width: 120, height: 70 }} source={{ uri: server_path + 'assets/images/one.png' }} />
                                        </HideableView>
                                        <HideableView visible={item.total_no_of_student == 2} removeWhenHidden={true}>
                                          <Image style={{ width: 120, height: 70 }} source={{ uri: server_path + 'assets/images/two.png' }} />
                                        </HideableView>
                                        <HideableView visible={item.total_no_of_student == 3} removeWhenHidden={true}>
                                          <Image style={{ width: 120, height: 70 }} source={{ uri: server_path + 'assets/images/three.png' }} />
                                        </HideableView>
                                        <HideableView visible={item.total_no_of_student > 3} removeWhenHidden={true}>
                                          <Image style={{ width: 120, height: 70 }} source={{ uri: server_path + 'assets/images/four.png' }} />
                                        </HideableView>
                                      </View>
                                      <Text style={{ textAlign: 'center' }} >
                                        {item.group_name}
                                      </Text>
                                    </View>
                                  </View>

                                </TouchableWithoutFeedback>

                            }
                            keyExtractor={(item, index) => index}
                          />

                          {/* <Text onPress={() => Actions.AddGroup()}>Add</Text> */}

                          <View style={styles.addback}>
                            <TouchableOpacity onPress={() => Actions.AddGroup()}>
                              <Text>
                                <FontAwesome style={styles.addcolor}>{Icons.plus}</FontAwesome>
                              </Text>
                              <Text style={{ textAlign: 'center' }} >
                                Add
                      </Text>
                            </TouchableOpacity>
                          </View>


                        </View>
                      </View>
                  }
                </View>
                <Menu visible={this.state.menuVisible}
                  onVisible={(isVisible) => {
                    this.state.menuVisible = isVisible
                  }}
                  left={this.state.left}
                  right={this.state.right}
                  arrowPosition={this.state.arrowPosition}
                  data={[
                    {
                      title: 'Edit/Remove Class',
                      onPress: () => {
                        Actions.EditClass();
                      }
                    },

                    {
                      title: 'Edit/Remove Students',
                      onPress: () => {
                        Actions.StudentListing();
                      }
                    },

                    {
                      title: 'Add/Edit Skills',
                      onPress: () => {
                        Actions.FeedbackManager({ awardTo: 'editSkill' });
                      }
                    },

                    {
                      title: 'Invite Parents',
                      onPress: () => {
                        Actions.InviteParents();
                      }
                    },
                    {
                      title: 'Pending Stories',
                      onPress: () => {
                        Actions.PendingStories();
                      }
                    },
                    {
                      title: 'Assignment list',
                      onPress: () => {
                        Actions.AssignmentListTeacher();
                      }
                    },
                  ]}

                  contentStyle={{ backgroundColor: 'teal' }} />
              </ScrollView>
              {/* footer code here */}
              <View style={styles.bottomtabstyle}>
                <TouchableWithoutFeedback onPress={() => Actions.ManageAttendance()}>
                  <Text style={styles.textgap} >  <FontAwesome style={styles.tabiconbottom}>{Icons.calendar}</FontAwesome>  Attendance</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Actions.PerformanceStudentListing()}>
                  <Text style={styles.textgap}><FontAwesome style={styles.tabiconbottom}>{Icons.checkSquare}</FontAwesome> View Report</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Actions.AwardMultiStudent()} >
                  <Text style={styles.textgap}><FontAwesome style={styles.tabiconbottom}>{Icons.signal}</FontAwesome> Award multiple </Text>
                </TouchableWithoutFeedback>
              </View>
              {/* footer code  end  here */}
            </View>
        }
      </View>
    );
  }
}
