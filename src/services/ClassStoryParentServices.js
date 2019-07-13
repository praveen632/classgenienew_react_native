import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';

var ClassStoryParentServices = {

 getClassList:function(value){
  console.log(value);
    return new Promise(resolve => {
          axios.get(config.api_url+':'+config.port+'/parentstories?token='+config.api_token+'&parent_ac_no=' +value)
        .then(function (response) {
            resolve(response);
          }
        )
        .catch((error) => {
           console.error(error);
        });

    });

 },

 getClassStory:function(token, classid,pagecount,parent_ac_no,nameofsearch){  
    return new Promise(resolve => {
          axios.get(config.api_url+':'+config.port+'/classstories/allPost?token='+token+'&source=ac'+'&class_id='+classid+"&page_number="+pagecount+"&member_no="+parent_ac_no+"&name="+nameofsearch)
        .then(function (response) {
          
          resolve(response);
          }
        )
        .catch((error) => {
           console.error(error);
        });

    });

 },



parent_kidlist:function(token, parent_ac_no){
  
    return new Promise(resolve => {
          axios.get(config.api_url+':'+config.port+'/parent/kidslist?token='+token+'&parent_ac_no='+parent_ac_no)
        .then(function (response) {
          resolve(response);
          }
        )
        .catch((error) => {
           console.error(error);
        });

    });

 },

student_story:function(token, pagecount,student_no,parent_ac_no,nameofsearch){
  
    return new Promise(resolve => {
          axios.get(config.api_url+':'+config.port+'/classstories/allPost?token='+token+"&page_number="+pagecount+"&member_no="+parent_ac_no+"&name="+nameofsearch+'&student_no='+student_no+'&parent_ac_no='+parent_ac_no)
        .then(function (response) {
          resolve(response);
          }
        )
        .catch((error) => {
           console.error(error);
        });

    });
},

Likelist:function(token,storyId){
  
  return new Promise(resolve => {
        axios.get(config.api_url+':'+config.port+'/classstories/likesList?token='+token+"&story_id="+storyId)
      .then(function (response) {
        resolve(response);
        }
      )
      .catch((error) => {
         console.error(error);
      });

  });
},

Commentlist:function(token, storyId){
  
  return new Promise(resolve => {
        axios.get(config.api_url+':'+config.port+'/classstories/commentDetail?token='+token+"&story_id="+storyId)
      .then(function (response) {
        resolve(response);
        }
      )
      .catch((error) => {
         console.error(error);
      });

  });
},

commentSave:function(token, comment,story_id,member_no,class_id){
  return new Promise(resolve => {
      var param = {token:token,story_id:story_id,member_no:member_no,class_id:class_id,comment:comment,sender_ac_no:member_no,student_no:''};
         axios.post(config.api_url+':'+config.port+'/classstories/comment',param)
         .then(function (response) {
           resolve(response);
           }
         )
         .catch((error) => {
            console.error(error);
         });
  
     });
  
  },
  likePost(id,status,member_no,class_id,token)
  {
    return new Promise(resolve => {
      var param = {token:token,member_no:member_no,class_id:class_id,sender_ac_no:member_no,status:status,story_id:id};
        axios.post(config.api_url+':'+config.port+'/classstories/likes',param)
         .then(function (response) {
           console.log(response);
           resolve(response);
          }
          )
          .catch((error) => {
          console.error(error);
        });
      });

  },



}



 module.exports = ClassStoryParentServices;
