import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage ,
  StatusBar
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

export default class GFit extends Component {
  state={
    steps : 0
  }
  startRecording()
  {
    // Call when authorized
GoogleFit.startRecording((callback) => {
  console.log('start Recording ')
  // Process data from Google Fit Recording API (no google fit app needed)
});
  }
  componentDidMount()
  {
    AsyncStorage.getItem("steps").then((value) => {
   if(value)
   {
     this.setState({steps: parseInt(value)});
   }
   
})
    // The list of available scopes inside of src/scopes.js file
const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ_WRITE,
    Scopes.FITNESS_BODY_READ_WRITE,
  ],
}
GoogleFit.authorize(options)
  .then(authResult => {
    if (authResult.success) {
      dispatch("AUTH_SUCCESS");
      alert ('success authentification')
    } else {
     // dispatch("AUTH_DENIED", authResult.message);
    }
  })
  .catch((error) => {

    //dispatch("AUTH_ERROR");
  })

// ...


     GoogleFit.onAuthorize(() => {
   console.log('Sucess authentification')

GoogleFit.observeSteps(async (step)=>{
    try {
      let s= this.state.steps + step.steps
    await AsyncStorage.setItem(
      'steps',
      s + ''
    );
  } catch (error) {
    alert(error)
  }
  this.setState({steps : this.state.steps + step.steps})


})

  const options = {
  startDate: "2020-09-01T00:00:17.971Z", // required ISO8601Timestamp
  endDate: new Date().toISOString(), // required ISO8601Timestamp
  bucketUnit: "SECOND", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1. 
};

GoogleFit.getDailyStepCountSamples(options)
 .then((res) => {
     alert(JSON.stringify(res))
 })
 .catch((err) => {console.log(err)})

 })
     
 GoogleFit.onAuthorizeFailure((error) => {
   alert('error when connecting to google account')
 })





  }


  render() {
      return(
         <ImageBackground style={{flex:1, alignItems:'center',justifyContent:'center', flexDirection:'column'}}
          source={require('../assets/bg.png')}>
          <StatusBar
    backgroundColor="#a8d0fb"
    barStyle="light-content"
  />
          <View style={{ flex : 0.4 ,  alignItems:'center',justifyContent:'center', fontSize:20 }}>
          <Text style={{ textAlign : 'center' , fontWeight: 'bold' , color : '#0014ff', fontSize:16}}>
          COM&DEV PEDOMETRE
          </Text>
          <Text style={{ textAlign : 'center' , color : '#0014ff' , marginTop : 20}}>
          Cliquer sur commencer pour enregister le nombre des pas sur google fit.
          </Text>
          </View>
       

          <View style={{ flex : 0.4 ,  alignItems:'center',justifyContent:'center' }}>
          <ImageBackground
          style={{width : 230 , height : 230 ,  alignItems:'center',justifyContent:'center' }}
        source={require('../assets/circle.png')}
      >
      <Text style={{ textAlign : 'center' , color : '#bc2a8d' , fontWeight : 'bold', fontSize:24}}>
      {this.state.steps}</Text>
      </ImageBackground>
          </View>

          <View style={{ flex : 0.2 ,  alignItems:'center',justifyContent:'center' }}>
          <TouchableOpacity onPress={()=>{this.startRecording()}}>
          <View style={{ flexDirection:'row' ,width : 150, height: 50 , borderWidth:1 , borderColor : '#c1c1c163',
           borderRadius : 25, backgroundColor : 'white' ,  alignItems:'center',justifyContent:'center'}}>
          <Image
          style={{width : 25 , height : 25 ,  alignItems:'center',justifyContent:'center' }}
        source={require('../assets/GFitt.png')}
        ></Image>
          <Text style={{ marginLeft : 10 , fontWeight : 'bold'}}>Commencer</Text>
          </View>
          </TouchableOpacity>
          </View>
         </ImageBackground>
      )
    }

  }
