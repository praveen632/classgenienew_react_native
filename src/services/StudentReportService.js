import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';

var StudentReportService = { 
    getClassPerformReport:function(dataParam){       
        return new Promise(resolve => { 
            axios.get(config.api_url+':'+config.port+'/report/student/classreportlist?token='+config.api_token+'&student_ac_no='+dataParam.member_no+'&datetoken='+dataParam.datetoken+'&startdate='+dataParam.startdate+'&enddate='+dataParam.enddate)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    getStudentList:function(member_no){       
        return new Promise(resolve => { 
            axios.get(config.api_url+':'+config.port+'/student/studentlist?token='+config.api_token+'&student_ac_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },

    getStudentPerformReport:function(dataParam){       
        return new Promise(resolve => { 
            axios.get(config.api_url+':'+config.port+'/report/student?token='+config.api_token+'&class_id='+dataParam.class_id+"&student_info_no="+dataParam.student_info_no+'&datetoken='+dataParam.datetoken+'&startdate='+dataParam.startdate+'&enddate='+dataParam.enddate)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });         
        });   
    },
}
module.exports = StudentReportService;
