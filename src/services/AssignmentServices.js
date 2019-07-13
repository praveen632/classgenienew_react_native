import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Function from "../components/Function";

var AssignmentServices = {

    assignmentList_Teacher()
    {
    //  return new Promise(resolve => {
    //         axios.get(config.api_url+':'+config.port+'/assignment/list?token='+config.api_token++'&class_id='+stored_classId+'&fromDate='+$scope.fromDate+'&toDate='+$scope.toDate+'&page_number='+$scope.pagecount+"&title=")
    //         .then(function (response) {
    //           resolve(response);
    //           }
    //         )
    //         .catch((error) => {
    //            console.error(error);
    //         });
    
    //     });
    }
   

}
module.exports = AssignmentServices;