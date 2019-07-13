import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';
   

                               //calling api for school list
var ParentEventService = { 
     
    eventParentschool:function(token,member_no){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/studentstory/schools/list?token='+token+'&member_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
      
     },

     getEvent:function(token,school_id,page_number,source){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/event/list?token='+token+'&school_id='+school_id,'&page_number='+page_number,'&source='+source)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
      
     },
 
     responseList:function(token,event_id){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/event/responsibilty_list?token='+token+'&event_id='+event_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
      
     },


     addVolunter:function(token, member_no, event_id){

        return new Promise(resolve => {
            var param = { member_no:member_no,
                event_id:event_id,
                token:token}
             console.log(param);
             
            axios.post(config.api_url+':'+config.port+'/event/add_volunteer',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
    
     },
  
     quit_Volunter:function(token, member_no, event_id){

        return new Promise(resolve => {
            var param = { member_no:member_no,
                event_id:event_id,
                token:token}
             console.log(param);
             
            axios.post(config.api_url+':'+config.port+'/event/quit_from_volunteer',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
    
     },


};


module.exports = ParentEventService;

