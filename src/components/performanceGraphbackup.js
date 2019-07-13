import React, { Component } from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, View, Button, SectionList, AsyncStorage, FlatList, Image, ScrollView, Alert, ToastAndroid } from 'react-native';
//import PieChart from 'react-native-pie-chart';
import {PieChart} from 'react-native-mp-android-chart';
import { Actions } from 'react-native-router-flux';
import styles from '../assets/css/mainStyle';

export default class performanceGraph extends Component {

  
  constructor() {
    super();

    this.state = {

      loggedInUser: {},
      subTitle:'',      
      classid: '',
      classname: '',  
      student_name: '',    
      student_no: '',
      reportList:[],
      legend: {
        enabled: true,
        textSize: 50,
        form: 'CIRCLE',
        position: 'RIGHT_OF_CHART',
        fontFamily: 'monospace',
        wordWrapEnabled: true
      },
      data: {
        datasets: [{
          yValues: [5, 95],
          label: '',
          config: {
            colors: ['#C0FF8C', '#FFF78C'],
            sliceSpace: 0,
            selectionShift: 20,
            fontSize: 50,
            fontFamily: 'monospace',
          },
          fontSize: 50,
        }],
        xValues: ['Sandwiches', 'Salads']
      },
      description: {
        text: '',
        textSize: 50,
        textColor: 'darkgray',
        fontFamily: 'monospace',
        fontStyle: 2
      }
    };
  }

  async componentDidMount() {

    await AsyncStorage.getItem('loggedInUser').then((value) =>
      this.setState({ "loggedInUser": JSON.parse(value) })
    )
    await AsyncStorage.getItem('classid').then((value) =>
      this.setState({ "classid": value })
    )
    await AsyncStorage.getItem('classname').then((value) =>
      this.setState({ "classname": value })
    )

    var param = {      
      student_name:this.props.student_name,    
      student_no:this.props.student_no
    }
    this.setState(param);

    if(this.state.student_no)
    {
      Actions.refresh({title:this.state.student_name,subTitle:'This Month'});
    }
    else
    {
      Actions.refresh({title:'Whole Class Performance',subTitle:'This Month'});
    }

    this.setState({ "subTitle": 'This Month' });

    this.getPerformReport({datetoken:'thismonth',label:'This Month'})
  }

  _renderLeftHeader() {
    return (
      <View style={styles.navBarItem}>
        <TouchableOpacity onPress={() => Actions.pop()} style={{ paddingRight: 10 }}>
          <Image style={{ width: 30, height: 50 }} source={{ uri: 'https://cdn2.iconfinder.com/data/icons/icojoy/shadow/standart/png/24x24/001_05.png' }}></Image>
        </TouchableOpacity>
      </View>
    )
  }

  _renderMiddleHeader() {
    return (
      <View style={styles.navBarItem}>
        <Text>{this.props.title}</Text>
        <Text>{this.state.subTitle}</Text>
      </View>
    )
  }

  _renderRightHeader() {
    return (
      <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>

        <TouchableOpacity style={{ paddingRight: 10 }}
          onPress={() => {
            this.setState({
              menuVisible: true,
              arrowPosition: 'topRight',
              left: undefined,
              right: 12,
            });
          }}
        >

          <Text style={styles.textcolor}>sadsad</Text>
        </TouchableOpacity>
      </View>
    )
  }


  getPerformReport(data)
  {
    /*
    if we come from whole class then get whole class report
    else get student report.
    
    if there is student_no it means we came student report
    */

    //reset the graph data
    
    
    if(data.datetoken != 'daterange')
    {      
      this.setState({ "subTitle": data.label });  
    }
    else{
      //var startDate = this.datePipe.transform(new Date(data.startDate), 'yyyy/MM/dd');
      //var endDate = this.datePipe.transform(new Date(data.endDate), 'yyyy/MM/dd');
    
     //this.setState({ "subTitle": 'From '+startDate+' To '+endDate });     
    }
    
    if(this.state.student_no)
    {
      this.getStudentPerformReport(data);     
    }
    else{
      this.getClassPerformReport(data);
    }
   
  }
  
  getStudentPerformReport(data)
  {
    /*
   if(data.datetoken == 'daterange')
   {
    var startDate = this.datePipe.transform(new Date(data.startDate), 'yyyy/MM/dd');
    var endDate = this.datePipe.transform(new Date(data.endDate), 'yyyy/MM/dd');
   }
   else{
    var startDate = '';
    var endDate = ''; 
   }
   let dataParam = {
    class_id:this.state.class_id,
    student_info_no:this.state.student_no,
    datetoken:data.datetoken,
    startdate:startDate,  
    enddate:endDate
   }
 
  this.reportList = [];
  this.teacherClassroomService.getStudentPerformReport(dataParam).then((resp) => {
      this.loading.dismiss();
      if(resp['status'] == "Success")
      {
        this.reportList = resp['point'];
        this.item.nocontent = 0;
        this.item.graph = 1;
        this.setupDataForChart();
      }
    else{      
        this.item.nocontent = 1;
        this.item.graph = 0;  
    }

    }, (err) => {
    console.log(err);
    }); 

    */   
   
  }
  getClassPerformReport(data)
  {
    /*
   if(data.datetoken == 'daterange')
   {
    var startDate = this.datePipe.transform(new Date(data.startDate), 'yyyy/MM/dd');
    var endDate = this.datePipe.transform(new Date(data.endDate), 'yyyy/MM/dd');
   }
   else{
    var startDate = '';
    var endDate = ''; 
   }
   
   let dataParam = {
    class_id:this.item.class_id,    
    datetoken:data.datetoken,
    startdate:startDate,  
    enddate:endDate
   }

  this.initLoading();
    this.loading.present();
  this.reportList = [];
  this.teacherClassroomService.getClassPerformReport(dataParam).then((resp) => {
      this.loading.dismiss();
      if(resp['status'] == "Success")
      {
        this.reportList = resp['point'];
    this.item.nocontent = 0;
    this.item.graph = 1;
    this.setupDataForChart();
      }
    else{     
        this.item.nocontent = 1;
    this.item.graph = 0;
    }

    }, (err) => {
    console.log(err);
    }); 
    */     
   
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.customHeaderContainer]}>
              {this._renderLeftHeader()}
              {this._renderMiddleHeader()}
              {this._renderRightHeader()}
        </View>
        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            backgroundColor={'#f0f0f0'}
            description={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            drawSliceText={true}
            valueTextSize={'50f'}
            usePercentValues={true}
            centerText={''}
            centerTextRadiusPercent={70}
            holeRadius={30}
            holeColor={'#f0f0f0'}
            transparentCircleRadius={45}
            transparentCircleColor={'#f0f0f0'}
            transparentCircleAlpha={50}
            maxAngle={360}
          />
        </View>
      </ScrollView>
    );
  }
}
