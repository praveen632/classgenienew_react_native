import React, { Component } from 'react';
import {StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  Button,
  Alert,
  NativeModules, NativeEventEmitter,AsyncStorage,ToastAndroid,

 } from 'react-native';
  import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import styles from '../assets/css/mainStyle';
import config from '../assets/json/config.json';
import ClassStoryTeacherServices from '../services/ClassStoryTeacherServices';
import Loader from './Loader';
import axios from 'axios';
var FormData = require('form-data');
import ChatVideo from './ChatVideo';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import DismissKeyboard from 'dismissKeyboard';

export default class EditClassStory extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      showLoader: 0,
      ImageSource: null,
      post:'',
      loggedInUser:{},
      classid:'',
      storyid:'',
      member_no:'',
      ImageSourceFist: null,
      section:0,
      loadsection:0
    };
  }

  async componentDidMount()
  {

      DismissKeyboard();
    
      await AsyncStorage.getItem('member_no').then((value)=>
         this.setState({'member_no':value})
        );

    await AsyncStorage.getItem('loggedInUser').then((value)=>
       this.setState({"loggedInUser": JSON.parse(value)})
       );

       await AsyncStorage.getItem('classid').then((value)=>
        this.setState({'classid':value})
       );

       await AsyncStorage.getItem('app_token').then((value)=> 
          this.setState({"app_token": value})
        );         
      this.loadStory();    

 }

 loadStory()
 {
  var objThis = this;
  objThis.setState({ "showLoader": 0 });
  ClassStoryTeacherServices.loadPost(this.state.app_token, this.props.storyid,this.state.member_no).then((response) => {
    objThis.setState({ "showLoader": 0 });
    if(response.status == 200) {
        var post_data = response.data.post['0'];
        this.setState({'post':post_data.message})

        if (response.data.post['0']['image'] == '' || response.data.post['0']['image'] == 'undefined') {
          this.setState({
            ImageSourceFist: null
          });
          this.setState({ loadsection: 0 });

        }
         else if (response.data.post['0']['ext'] == 'mp4' || response.data.post['0']['ext'] == '3gp') 
        {
          var img = '';
          var imgage = config.image_url + 'assets/class_stories/' + response.data.post['0']['image'] + '?=' + Math.random();
          
          this.setState({
            ImageSourceFist: imgage
          });
          this.setState({ loadsection: 2 });

        }
        else {
          var img = '';
          var imgage = config.image_url + 'assets/class_stories/' + response.data.post['0']['image'] + '?=' + Math.random();
          let source = { uri: imgage };
          this.setState({
            ImageSourceFist: source
          });
          this.setState({ loadsection: 1 });
        }
    }
 })
 }

 selectPhotoTapped() {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
  };
  this.setState({ loadsection: 1 });
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = response.uri;
        this.setState({ ImageSource: source });
        let sourcedes = { uri: response.uri };
        this.setState({
          ImageSourceFist: sourcedes
        });
        
        this.setState({ section: 1 });
                
    }
  });
}


selectVideoTapped(){
  const options = {
    title: 'Video Picker',
    takePhotoButtonTitle: 'Take Video...',
    mediaType: 'video',
    videoQuality: 'medium'
  };
    
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled video picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let sourcedes = response.uri;
      this.setState({
        ImageSourceFist: sourcedes
      });
      this.setState({ loadsection: 2 });
      this.setState({ section: 2 });
 
     }
  });
}


 EditStory()
    {
   if (this.state.section == 0){
    var objThis = this;
    objThis.setState({ "showLoader": 0 });
    ClassStoryTeacherServices.UpdatePost(this.state.app_token, this.props.storyid,this.state.post,this.state.loggedInUser.member_no).then((response) => {
      objThis.setState({ "showLoader": 0 });
      if(response.status == 200) {
           ToastAndroid.showWithGravity(
          'Class Story Updated successfully',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        Actions.WholeClassStory();      
      }
   })

  }else if(this.state.section == 2)
  {
    var obj = this;
    var url = config.api_url + ':' + config.port + '/upload/update?token=' + this.state.app_token;
    var configHeader = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const formData = new FormData();
    formData.append('upload_file', { uri: this.state.ImageSourceFist, name: '1.mp4', type: "video/mp4", chunkedMode: false });
    formData.append('message',this.state.post);	
    formData.append('id',this.props.storyid);	
    formData.append('sender_ac_no',this.state.loggedInUser.member_no);
    
    return new Promise(resolve => {
      axios.post(url, formData, configHeader)
        .then(function (response) {
          resolve(response);
          ToastAndroid.showWithGravity(
            'Class Story Updated successfully',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
          Actions.WholeClassStory();
        }
        )
        .catch((error) => {
          console.error(error);
        });
    });

 }  else {
     var url = config.api_url+':'+config.port+'/upload/update?token='+this.state.app_token;     	
      var configHeader = {
      headers: {
      'content-type': 'multipart/form-data'
      }
    }
  const formData = new FormData();
  formData.append('upload_file',{uri:this.state.ImageSourceFist.uri,name:'1.jpg',type:"image/jpeg",chunkedMode:false}); 
  formData.append('message',this.state.post);	
  formData.append('id',this.props.storyid);	
  formData.append('sender_ac_no',this.state.loggedInUser.member_no);
  formData.append('token',this.state.app_token);	   	
  
  return new Promise(resolve => { 
      var objThis = this;
      objThis.setState({ "showLoader": 0 });
       axios.post(url, formData, configHeader)
       .then(function (response) {
        objThis.setState({ "showLoader": 0 });
         resolve(response);
         if(response.status == 200)
         {
          ToastAndroid.showWithGravity(
            'School Story Updated successfully',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
          Actions.WholeClassStory();
         } 
        
       }
    )
    .catch((error) => {
          console.error(error);
    });
  });
 }
}


  render() {

    let button_pagination = null;
    if(this.state.loadsection == 0)
    {
      button_pagination = <Text>Select a Photo</Text>;
    } else if (this.state.loadsection == 2)
    {
      button_pagination = <ChatVideo videoUrl={this.state.ImageSourceFist} videoClass={styles.VideoContainer} />;
    } else
    {
      button_pagination = <Image style={styles.ImageContainer} source={this.state.ImageSourceFist} />;
    }

    return (
      <View style={styles.container}>
      
        <View style={styles.ImageContainer}>
          {button_pagination}
        </View>
        <View style={{ flexDirection:'row',marginBottom:10,marginTop:-15}}>

          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>          
          <FontAwesome style={styles.angleicon}>{Icons.camera}</FontAwesome>           
          </TouchableOpacity>

          <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}> 
          <FontAwesome style={styles.angleicon}> {Icons.videoCamera} </FontAwesome>
          </TouchableOpacity>
           
        </View>
     
        <View style={{width:'80%'}}>
          <View style={styles.editstudentclasss}>
             <TextInput style={styles.cssTextInput}  placeholder="Add Class Story Post" onChangeText={(value) => this.setState({post: value})}  value={this.state.post}/>
              

              <TouchableOpacity style={styles.classbtn} title="Add" onPress={()=>this.EditStory()} >
                <View>
                  <Text style={styles.buttonText}>Add</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      </View>
   
    );
  }
}
