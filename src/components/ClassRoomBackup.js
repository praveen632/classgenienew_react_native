import React, { Component } from 'react';
import {TouchableWithoutFeedback, StyleSheet, Text, View, Image, Button, AsyncStorage, ScrollView, FlatList, TouchableHighlight,TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CustomTabBar from "./CustomTabBar";
import TeacherServices from '../services/teacherServices';
import config from '../assets/json/config.json';
import HideableView from 'react-native-hideable-view';
import styles from '../assets/css/mainStyle';
import Menu from 'react-native-pop-menu';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';

export default class ClassRoom extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      loggedInUser: {},
      studentList: [],
      groupList: [],
      classid:'',
      classname:'',
      classimage:'',
      classgrade:'',
      classpoint:'',
      currentTab:'student',
      menuVisible: false,
      arrowPosition: 'topRight',
      left: 12,
      right: undefined,
      color: '#F5FCFF',
    }

    this.changeTab = this.changeTab.bind(this);
  }

  async componentDidMount()
  {

   await AsyncStorage.getItem('loggedInUser').then((value)=>
        this.setState({"loggedInUser": JSON.parse(value)})
    )
    await AsyncStorage.getItem('classid').then((value)=>
        this.setState({"classid": value})
    )
    await AsyncStorage.getItem('classname').then((value)=>
        this.setState({"classname": value})
    )
    await AsyncStorage.getItem('classimage').then((value)=>
        this.setState({"classimage": value})
    )
    await AsyncStorage.getItem('classgrade').then((value)=>
        this.setState({"classgrade": value})
    )
    await AsyncStorage.getItem('classpoint').then((value)=>
        this.setState({"classpoint": value})
    )

    Actions.refresh({title:this.state.classname});

    this.getStudentList();
    this.getGroupList();

  }

  _renderLeftHeader() {
    return (
      <View style={styles.navBarItem}>
        <TouchableOpacity onPress={ ()=>Actions.DashboardTeacher() } style={{ paddingRight: 10 }}>
          <Image style={{width: 30, height: 50}}  source={{uri: 'https://cdn2.iconfinder.com/data/icons/icojoy/shadow/standart/png/24x24/001_05.png'}}></Image>
        </TouchableOpacity>       
      </View>
    ) 
  }

   _renderMiddleHeader() {
    return (
      <View style={styles.navBarItem}>
        <Text>{ this.props.title }</Text>
      </View>
    )
  }

  _renderRightHeader() {
    return (
      <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        
        <TouchableOpacity  style={{ paddingRight: 10 }}
        onPress={() => {
          this.setState({
            menuVisible: true,
            arrowPosition: 'topRight',
            left: undefined,
            right: 12,
          });
        }}
        >


          <Text>sadsad</Text>
        </TouchableOpacity>
      </View>
    )
  }


  
  changeTab(tabName)
  {
       this.setState({"currentTab": tabName})
       if(tabName == 'student')
       {
           this.getStudentList();
       }
       else
       {
           this.getGroupList();
       }
  }

  openStudent(pageName)
  {
    Actions.ClassRoom();
    alert(pageName);
    if(pageName == 'EditStudent')
    {
      //Actions.EditStudent();
    }
    else
    {
      //this.openStudent();
    }
    
  }

  getGroupList()
  {
    var objThis = this;
    TeacherServices.getGroupList(this.state.classid).then(function(response){
        
        objThis.setState({'groupList':response.data.group_list}) ;            

    });
  }

  getStudentList()
  {
    var objThis = this;
    TeacherServices.getStudentList(this.state.classid).then(function(response){
        
        objThis.setState({'studentList':response.data.class_details.student_list}) ;            

    });
  }

  render() {

    var imagePath = config.image_url;
    var server_path = config.server_path;

    return (
      <ScrollView>
             
        <View style={[styles.customHeaderContainer]}>
          { this._renderLeftHeader() }
          { this._renderMiddleHeader() }          
          { this._renderRightHeader() }
        </View>

        <View>
          <CustomTabBar tabList={[{'title':'Class Room',currentTab:1},{'title':'Message',actionPage:()=>Actions.MessageTeacher() },{'title':'Class Story',actionPage:()=>Actions.ClassStoryTeacher() }]} />
        </View>
        <View>
        { 
          this.state.currentTab=='student' ? 
            <View>
              <View>
                <Button title = "Student" disabled={true} onPress = { ()=>console.log('')}/><Button onPress = { ()=>this.changeTab('group')} title = "Group" />
              </View>
               <View>
                  <View>                   
                    <TouchableWithoutFeedback  onPress={ ()=>this.openStudentDetail() }> 
                      <View style={styles.container}>
                        <Text>{this.state.classpoint}</Text>                          
                        <Image style={{width: 50, height: 50}} source={{uri: imagePath+'assets/class/'+this.state.classimage }} />                        
                        <Text>Class - {this.state.classname}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <FlatList
                  data={ this.state.studentList }
                  renderItem={({item}) =>                  

                    <View style={{alignItems: 'center'}}>
                      <PopoverTouchable>
                        <Text style={{flex:1}}>
                          <Text style={{flex:2,justifyContent:'flex-start'}}>{item.pointweight}</Text>
                          <Image style={{flex:2,width: 50, height: 50, justifyContent:'flex-end'}} source={{uri: imagePath+'assets/class/'+this.state.classimage }} />
                        </Text>
                        <Popover  visible={false} contentStyle={styles.content} arrowStyle={styles.arrow} backgroundStyle={styles.background}>
                          <Text onPress={()=>this.openStudent('EditStudent') }>Edit/Remove Student</Text>
                          <Text onPress={()=>this.openStudent('FeedbackManager')}>Add Student Feedback</Text>                          
                        </Popover>
                      </PopoverTouchable>
                      <Image style={{width: 50, height: 50}} source={{uri: imagePath+'assets/student/'+item.image }} />                        
                      <Text>{item.name}</Text>
                    </View> 


                  }
                  keyExtractor={(item, index) => index}
                  />

                  <Text onPress={()=>Actions.AddStudent()}>Add</Text> 

               </View>
            </View>
          : 
            <View>
              <View>
                <Button onPress = { ()=>this.changeTab('student')} title = "Student" />
                <Button title = "Group" disabled={true}/>
              </View>
              <View >
                <FlatList
                  data={ this.state.groupList }
                  renderItem={
                    ({item}) =>
                      <TouchableWithoutFeedback  onPress={ ()=>this.openStudentDetail() }> 
                        <View style={styles.container}>
                          <Text>{item.pointweight}</Text>

                          <HideableView visible={item.total_no_of_student == 1} removeWhenHidden={true}>
                            <Image style={{width: 50, height: 50}} source={{uri: server_path+'assets/images/one.png' }} />
                          </HideableView>
                          <HideableView visible={item.total_no_of_student == 2} removeWhenHidden={true}>
                            <Image style={{width: 50, height: 50}} source={{uri: server_path+'assets/images/two.png' }} />
                          </HideableView> 
                          <HideableView visible={item.total_no_of_student == 3} removeWhenHidden={true}>
                            <Image style={{width: 50, height: 50}} source={{uri: server_path+'assets/images/three.png' }} />
                          </HideableView> 
                          <HideableView visible={item.total_no_of_student > 3} removeWhenHidden={true}>
                            <Image style={{width: 50, height: 50}} source={{uri: server_path+'assets/images/four.png' }} />
                          </HideableView>

                          <Text>{item.group_name}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      }
                  keyExtractor={(item, index) => index}
                  />

                  <Text onPress={()=>Actions.AddGroup()}>Add</Text>
                 
                 
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
                  onPress: () => {Actions.EditClass();
                  }
                },
               
                  {
                    title: 'Edit Students',
                    onPress: () => {Actions.EditStudent();
                    }
                  },
                  
                    {
                      title: 'Edit Skills',
                      onPress: () => {Actions.EditSkills();
                      }
                    },
                   
                      {
                        title: 'Invite Parents',
                        onPress: () => {Actions.InviteParents();
                        }
                      },
                  {
                  title: 'Pending Stories',
                  onPress: () => {Actions.PendingStories();                    
                  }
                },
              ]}

              contentStyle={{backgroundColor: 'teal'}}/>

      </ScrollView>
    );
  }
}
