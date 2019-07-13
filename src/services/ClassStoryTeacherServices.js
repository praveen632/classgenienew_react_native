import axios from 'axios';
import config from '../assets/json/config.json';
import React, { Component } from 'react';

var ClassStoryTeacherServices = {

 getClassStudentList:function(token, value){ 
    return new Promise(resolve => {
        axios.get(config.api_url+':'+config.port+'/studentmessagelist?token='+token+'&class_id='+value+'&sort_by=A')
        .then(function (response) {
			     resolve(response);
          }
        )
        .catch((error) => {
           console.error(error);
        });

    });

 },

getclassStudentlist_parent:function(token, value){
    return new Promise(resolve => {
       axios.get(config.api_url+':'+config.port+'/classinfo/studentlist?token='+token+'&class_id='+value)
       .then(function (response) {
          resolve(response);
         }
       )
       .catch((error) => {
          console.error(error);
       });

   });

},

getwhole_classstory:function(value,member_no,pagecount,search,token){
  return new Promise(resolve => {
       axios.get(config.api_url+':'+config.port+'/classstories/allPost?token='+token+"&source=ac&class_id="+value+"&member_no="+member_no+"&page_number="+pagecount+"&name="+search)
       .then(function (response) {
            resolve(response);
         }
       )
       .catch((error) => {
          console.error(error);
       });

   });

},
getclassstory_student:function(classid,parent_ac_no,member_no,student_no,token){
   return new Promise(resolve => {
        axios.get(config.api_url+':'+config.port+'/classstories/allPost?token='+token+"&class_id="+classid+"&parent_ac_no="+parent_ac_no+"&member_no="+member_no+"&student_no="+student_no)
        .then(function (response) {
              resolve(response);
          }
        )
        .catch((error) => {
           console.error(error);
        });
 
    });
 
 },
 

Likeslist:function(stoyid,classid,token){
return new Promise(resolve => {
       axios.get(config.api_url+':'+config.port+'/classstories/likesList?token='+token+"&class_id="+classid+"&story_id="+(stoyid).toString())
       .then(function (response) {
         resolve(response);
         }
       )
       .catch((error) => {
          console.error(error);
       });

   });

},

Commentlist:function(story_id,member_no,token){
return new Promise(resolve => {
       axios.get(config.api_url+':'+config.port+'/classstories/commentDetail?token='+token+"&story_id="+story_id+"&teacher_ac_no="+member_no)
       .then(function (response) {
         resolve(response);
         }
       )
       .catch((error) => {
          console.error(error);
       });

   });

},

deletecomment:function(id, token){

return new Promise(resolve => {
    var param = {id:(id).toString(),
      token:token}
       axios.post(config.api_url+':'+config.port+'/classstories/comment/delete',param)
       .then(function (response) {
         resolve(response);
         }
       )
       .catch((error) => {
          console.error(error);
       });

   });

},

savecomment:function(comment,story_id,member_no,class_id,token){
 return new Promise(resolve => {
      var param = {token:token,story_id:(story_id).toString(),member_no:member_no,class_id:class_id,comment:comment,sender_ac_no:member_no,student_no:''};
         axios.post(config.api_url+':'+config.port+'/classstories/comment',param)
         .then(function (response) {
           resolve(response);
           console.log(response);
           }
         )
         .catch((error) => {
            console.error(error);
         });
  
     });
  
  },

  Deletestory:function(story_id,class_id,token){

    return new Promise(resolve => {
        var param = {token:token,id:(story_id).toString(),class_id:class_id};
           axios.post(config.api_url+':'+config.port+'/classstories/delete',param)
           .then(function (response) {
             resolve(response);
             }
           )
           .catch((error) => {
              console.error(error);
           });
    
       });
    
    },

  

    addPost:function(token,class_id,message,memberno,username){

      return new Promise(resolve => {
          var param = {token:token,
            class_id:class_id,
            message: message,
            teacher_ac_no:memberno,
            teacher_name:username,
            sender_ac_no:memberno
          };
         
             axios.post(config.api_url+':'+config.port+'/classstories',param)
             .then(function (response) {
               resolve(response);
               }
             )
             .catch((error) => {
                console.error(error);
             });
      
         });
      
      },

      loadPost:function(token, storyId,stored_memberNo){
        return new Promise(resolve => {
               axios.get(config.api_url+':'+config.port+'/classstories/commentDetail?token='+token+"&story_id="+storyId+"&teacher_ac_no="+stored_memberNo+"&sender_ac_no="+stored_memberNo)
               .then(function (response) {
                 resolve(response);
                 }
               )
               .catch((error) => {
                  console.error(error);
               });
        
           });
        
        },
        UpdatePost:function(token, storyId,textmessage,memberNo){

          return new Promise(resolve => {
              var param = {token:token,
                id:storyId,
                message: textmessage,
                sender_ac_no: memberNo
              };
              console.log(param);
                 axios.post(config.api_url+':'+config.port+'/classstories/update',param)
                 .then(function (response) {
                   resolve(response);
                   }
                 )
                 .catch((error) => {
                    console.error(error);
                 });
          
             });
          
          },

          addPost_student:function(token,classid,post,member_no,username,parent_ac_no,student_no){

            return new Promise(resolve => {
                var param = {token:token,
                  class_id:classid,
                message: post,
        teacher_ac_no:member_no,
         parent_ac_no:(parent_ac_no).toString(),
         student_no:student_no,
         teacher_name:username,
         sender_ac_no:member_no
                };
                
                   axios.post(config.api_url+':'+config.port+'/classstories',param)
                   .then(function (response) {
                     resolve(response);
                     
                     }
                   )
                   .catch((error) => {
                      console.error(error);
                   });
            
               });
            
            },

      getClasspendingStories:function(classid,pagecount,token){
            return new Promise(resolve => {
                   axios.get(config.api_url+':'+config.port+'/studentstory/class/postlist?token='+token+"&source=ac&class_id="+classid+"&page_number="+pagecount)
                   .then(function (response) {
                     resolve(response);
                     }
                   )
                   .catch((error) => {
                      console.error(error);
                   });
            
               });
            },
      
      getClasspendingStories_student:function(classid,parent_ac_no,student_no,pagecount,token){
              return new Promise(resolve => {
                     axios.get(config.api_url+':'+config.port+'/classstories/allPost?token='+token+"&class_id="+classid+"&parent_ac_no="+parent_ac_no+"&member_no="+member_no+"&student_no="+student_no)
                     .then(function (response) {
                       resolve(response);
                       }
                     )
                     .catch((error) => {
                        console.error(error);
                     });
              
                 });
              },

            
      approvePendingpost:function(story_id,memberNo,token){
           return new Promise(resolve => {
              var param = {token:token,
                id: (story_id).toString(),
                status:"1",
                sender_ac_no: memberNo
           };
            axios.post(config.api_url+':'+config.port+'/studentstory/approveteacher',param)
                .then(function (response) {
                  resolve(response);
                  }
                )
                .catch((error) => {
                  console.error(error);
                });        
            });                
         },

        disapprovePendingpost:function(story_id,memberNo,token){
                  return new Promise(resolve => {
                    var param = {token:token,
                      id: (story_id).toString(),
                      status:"-1",
                      sender_ac_no: memberNo
                       };
          axios.post(config.api_url+':'+config.port+'/studentstory/approveteacher',param)
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
                          var param = {token:token, member_no:member_no,class_id:(class_id).toString(),sender_ac_no:member_no,status:status,story_id:id};
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

                      generatepdf(token, classId,member_no)
                      {
                        return new Promise(resolve => {
                          axios.get(config.api_url+':'+config.port+'/pdfgenerate?token='+token+'&member_no='+member_no+'&class_id='+(classId).toString())
                          .then(function (response) {
                            resolve(response);
                            console.log(response);
                            }
                          )
                          .catch((error) => {
                             console.error(error);
                          });                   
                      });
                      },

                      sendMail(token, classId,member_no)
                      {                
                        return new Promise(resolve => {
                          axios.get(config.api_url+':'+config.port+'/sendmail?token='+token+'&member_no='+member_no+'&class_id='+(classId).toString()+'&id=1')
                          .then(function (response) {
                            resolve(response);
                            console.log(response);
                            }
                          )
                          .catch((error) => {
                             console.error(error);
                          });                   
                      });
                      },

                      inviteTeacherParent(data,student_no, parent_no,student_name,token)
                      {

                        return new Promise(resolve => {
                          axios.get(config.api_url+':'+config.port+'/sendmail?token='+token+'&email='+data+'&id=3'+'&student_name='
                          +student_name+'&student_no='+student_no+'&parent_no='+parent_no)
                          .then(function (response) {
                            resolve(response);
                            console.log(response);
                            }
                          )
                          .catch((error) => {
                             console.error(error);
                          });
                   
                      });

                      }
      
}



 module.exports = ClassStoryTeacherServices;
