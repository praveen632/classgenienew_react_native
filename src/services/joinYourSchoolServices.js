import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';
import base64 from 'base-64';
var joinYourSchoolServices = { 

    getSchoolList:function(token, member_no){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/schools/list?token='+token+'&member_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },
 
    getTeacherList:function(token, school_id){
        return new Promise(resolve => {             
            axios.get(config.api_url+':'+config.port+'/schools/teacherlist?token='+token+'&school_id='+school_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });        
        });

    },
   
    joinyourSchool:function(token, school_id, member_no, type){

        return new Promise(resolve => {
        
           var param = {school_id: school_id,
            member_no: member_no,
            type:type,
            school_id: school_id.toString(),
             token:token}
              axios.post(config.api_url+':'+config.port+'/schools/joinschools',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
    
     },
   
     joinSchoolMailSend:function(token, Toemail, member_no){
       var email = base64.encode(Toemail);
        return new Promise(resolve => {        
           var param = {
               email: email,
               member_no: member_no,
               token:token
            }          
             
            axios.post(config.api_url+':'+config.port+'/sendmail?token='+config.api_token+'&id='+5, param )
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
    
     },


     SearchFilterFunction:function(token, school_name){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/schools/search?token='+token+'&school_name='+school_name)
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




module.exports = joinYourSchoolServices;

