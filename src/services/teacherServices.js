import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';

var teacherServices = { 

    getClassList:function(member_no,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/classinfo/dashboard?token='+app_token+'&teacher_ac_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    wholeClassPointget:function(class_id,app_token){

        return new Promise(resolve => {             
            axios.get(config.api_url+':'+config.port+'/classinfo/studentlist?token='+app_token+'&class_id='+class_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getStudentList:function(classid,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/classinfo/studentlist?token='+app_token+'&class_id='+classid)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getGroupList:function(classid,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/groupinfo?token='+app_token+'&class_id='+classid)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },
    addStudent:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/addstudent',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    addClass:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/classinfo',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    updateClass:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/classinfo/update',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    removeClass:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/classinfo/delete',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },


    addGroup:function(lists_value, groupApiUrl,app_token){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+groupApiUrl,{group:lists_value,token:app_token})
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    removeGroup:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/groupinfo/delete',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    schoolvarify:function(member_no,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/teacher/search?token='+app_token+'&member_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getGradeList:function(member_no,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/classlist?token='+app_token+'&teacher_ac_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getClassIconList:function(app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/classinfo?token='+app_token)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getStudentIconList:function(app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/addstudent/list?token='+app_token)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    updateStudent:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/addstudent/update',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    removeStudent:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/addstudent/delete',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getStudentListOfGroup:function(classid,group_id,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/groupinfo/group_studentlist?token='+app_token+'&class_id='+classid+'&group_id='+group_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getFeedbackOption:function(class_id,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/points/student?token='+app_token+'&class_id='+class_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getSkillPointList:function(pointListApiUrl,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+pointListApiUrl+'?token='+app_token)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getSkillIconList:function(app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/editskills/imagelist?token='+app_token)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    addUpdateSkill:function(param,apiUrl){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+apiUrl,param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    removeSkill:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/editskills/delete',param)
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
             
            axios.get(config.api_url+':'+config.port+'/report/student?token='+dataParam.token+'&class_id='+dataParam.class_id+'&datetoken='+dataParam.datetoken+'&student_info_no='+dataParam.student_info_no+'&startdate='+dataParam.startdate+'&enddate='+dataParam.enddate)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getClassPerformReport:function(dataParam){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/class_perform?token='+dataParam.token+'&class_id='+dataParam.class_id+'&datetoken='+dataParam.datetoken+'&startdate='+dataParam.startdate+'&enddate='+dataParam.enddate)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getAttendanceMail:function(param){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/download_exl',param)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getStudentAttendanceList:function(classId, date1,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/attendance/studentlist?token='+app_token+'&class_id='+classId+'&date1='+date1)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    saveAttendance:function(attendanceList,date1,app_token){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/attendance/save',{student_list:attendanceList,date:date1,token:app_token})
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    resetAttendence:function(class_id,date1,app_token){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/attendance_reset',{class_id:class_id,date:date1,token:app_token})
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    giveRewardToGroup:function(dataParam){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/groupinfo/pointweight',dataParam)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    giveRewardToMultiStudent:function(dataParam){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/awardmultiple/class',dataParam)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    giveRewardToSingleStudent:function(dataParam){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/points/student/update',dataParam)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    giveRewardToClass:function(dataParam){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/points/class/update',dataParam)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getEventList:function(school_id,member_no,source,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/event/list?token='+app_token+'&school_id='+school_id+'&member_no='+member_no+'&source='+source)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getSchedule:function(event_id,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/event/date_time_list?token='+app_token+'&event_id='+event_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getResponsibiltyList:function(event_id,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/event/responsibilty_list?token='+app_token+'&event_id='+event_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    getAssignmentList:function(class_id,fromDate,toDate,page_number,title,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/assignment/list?token='+app_token+'&class_id='+class_id+'&fromDate='+fromDate+'&toDate='+toDate+'&page_number='+page_number+'&title='+title)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

   
    getAssignmentStudentList:function(class_id,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/assignment/studentlist?token='+app_token+'&class_id='+class_id)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
   
    }, 


    sendAssignmentNotification:function(dataParam){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/assignment/sendnotification',dataParam)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    removeAssignment:function(dataParam){

        return new Promise(resolve => {
             
            axios.post(config.api_url+':'+config.port+'/assignment/delete',dataParam)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });

    },

    loadresponsibility:function(member_no,app_token){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/event_responsibilty/list?token='+app_token+'&member_no='+member_no)
            .then(function (response) { 
                resolve(response);
              }
            )
            .catch((error) => {
               console.error(error);
            });
         
        });
   
    }, 


    addresponsibility:function(member_no,responsibilityname,app_token){

        return new Promise(resolve => {
            var param = {token:token,responsibilty:responsibilityname,member_no:member_no};
            axios.post(config.api_url+':'+config.port+'/event_responsibilty/save',param)
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


module.exports = teacherServices;
