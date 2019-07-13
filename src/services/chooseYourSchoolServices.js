import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';
var chooseYourSchoolServices = { 

    getTeacherList:function(school_id){

        return new Promise(resolve => {
             
            axios.get(config.api_url+':'+config.port+'/schools/list?token='+config.api_token+'&school_id='+school_id)
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


module.exports = chooseYourSchoolServices;

