import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';

var StudentServices = {

    getStudentLists:function(token, member_no){
        return new Promise(resolve => {         
            axios.get(config.api_url+':'+config.port+'/student/studentlist?token='+token+'&student_ac_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    getStudentSearch:function(token, member_no){
        return new Promise(resolve => {         
            axios.get(config.api_url+':'+config.port+'/teacher/search?token='+token+'&member_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    sendParentMail:function(token, data, student_name, student_no, parent_no){        
        return new Promise(resolve => {         
            axios.get(config.api_url+':'+config.port+'/sendmail?token='+token+'&email='+data+'&id=4'+'&student_name='
            +student_name+'&student_no='+student_no+'&parent_no='+parent_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    student_add:function(token, data, member_no){        
        return new Promise(resolve => {         
            axios.get(config.api_url+':'+config.port+'/student/addstudentcode?token='+token+'&student_ac_no='+member_no+'&student_no='
            +data)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    removeStudent:function(token, data){        
        return new Promise(resolve => {         
            axios.get(config.api_url+':'+config.port+'/student/disconnect?token='+token+'&student_no='+data)
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
module.exports = StudentServices;
