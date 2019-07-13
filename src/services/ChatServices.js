import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';

var ChatServices = {
    parentSearch:function(token, member_no){       
        return new Promise(resolve => { 
            axios.get(config.api_url+':'+config.port+'/parent/search?token='+token+'&member_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },


    studentMsgListss:function(token, member_no){       
        return new Promise(resolve => { 
             axios.get(config.api_url+':'+config.port+'/studentmessagelist?token='+token+'&class_id='+member_no+'&source=chat&sort_by=A')
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    chatList:function(token, teacher_id,parent_id,class_id,page_no){       
        return new Promise(resolve => { 
             axios.get(config.api_url+':'+config.port+'/chats?token='+token+'&teacher_id='+teacher_id+'&parent_id='+parent_id+'&class_id='+class_id+'&page_size='+page_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    removeChat:function(token, id, receiver_ac_no,message){       
        return new Promise(resolve => {         
            var param = {
                id: id,
                receiver_ac_no: receiver_ac_no,
                message: message, 
                token:token}              
             axios.post(config.api_url+':'+config.port+'/chats/remove_chat',param)
             .then(function (response) { 
                 resolve(response);
               }
             )
             .catch((error) => {
                console.error(error);
             });
          
         }); 
    },

    updateDB:function(data){       
        return new Promise(resolve => {                       
             axios.post(config.api_url+':'+config.port+'/chats',data)
             .then(function (response) { 
                 resolve(response);
               }
             )
             .catch((error) => {
                console.error(error);
             });
          
         }); 
    },

    getSmilyImageList:function(){       
        return new Promise(resolve => { 
             axios.get(config.api_url+':'+config.port+'/classlist/chaticon?token='+config.api_token)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });
    }  
}
module.exports = ChatServices;