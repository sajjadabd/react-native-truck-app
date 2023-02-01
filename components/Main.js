/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useState , useEffect , useRef , useCallback } from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  AppState,
  Platform,
  RefreshControl,
  Button
} from 'react-native';

import Header from './Header';
import Body from './Body';


import moment from "moment-jalaali";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';



//import MyNotification from './MyNotification';

// import BackgroundJob from 'react-native-background-job';

// const backgroundJob = {
//  jobKey: "myJob",
//  job: () => console.log("Running in background")
// };

// BackgroundJob.register(backgroundJob);

/*

*/


import PushNotification, {Importance} from 'react-native-push-notification';

import BackgroundService from 'react-native-background-actions';

import BackgroundTimer from 'react-native-background-timer';


import { getItem , setItem } from './StorageManager';



  




const Main = ({navigation}) => {

  const sleep = async (time) => {
    await new Promise((resolve) => setTimeout(() => resolve(), time));
  } 

  const veryIntensiveTask = async (taskDataArguments) => {

      // Example of an infinite loop task
    /*
      const { delay } = taskDataArguments;
      await new Promise( async (resolve) => {
          for (let i = 0; BackgroundService.isRunning(); i++) {
              console.log('fetch url . . . ' + i);
              //await fetchTruck();
              await sleep(15000);
          }
      });
      
      BackgroundTimer.runBackgroundTimer(() => { 
        //code that will be called every 3 seconds 
        console.log('fetch data . . .')
      }, 15000);
      */
      await new Promise( async (resolve) => {
          for (let i = 0; BackgroundService.isRunning(); i++) {
              console.log( new Date().toLocaleTimeString() + ' fetch url . . . ' + i);
              await fetchTruck();
              await sleep(15000);
          }
      });
  };

  const options = {
      taskName: 'Truck',
      taskTitle: 'پردازش پشت زمینه ورودی تریلی',
      //taskDesc: 'برای غیر فعال کردن از تنظیمات برنامه اقدام کنید',
      taskDesc : '',
      taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap',
      },
      color: '#000',
      //linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
      parameters: {
          delay: 15000,
      },
  };












  const isDarkMode = true ;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout( async () => {
      await fetchTruck();
      setRefreshing(false);
    }, 200);
  }, []);

  const appState = useRef(AppState.currentState);
  const [ appStateVisible, setAppStateVisible ] = useState(appState.current);
  
  
  const [ trucks , setTrucks ] = useState([]);
  const [ sectionCounter , setSectionCounter ] = useState(0);
  const [ barmillCounter , setBarmillCounter ] = useState(0);
  const [ sectionText , setSectionText ] = useState('');
  const [ barmillText ,  setBarmillText ] = useState('');  
  //const [ notif , setNotif ] = useState(false);


  //const [ prevTruckLength , setPrevTruckLength ] = useState(0);
  //const [ prevSectionCounter , setPrevSectionCounter ] = useState(0);
  //const [ prevBarmillCounter , setPrevBarmillCounter ] = useState(0);  
  

  let trucks_static ;
  let sectionCounter_static ;
  let barmillCounter_static ;
  

  let prevTruckLength_static;
  let prevSectionCounter_static;
  let prevBarmillCounter_static;

  let notif_static ;
  let whichOneIndex_static = 0;


  // const [myCounter , setMyCounter] = useState(0);
  const [ loading , setLoading ] = useState(false);



  // let counter = 0;



  const whichOne = [
    'هم بارمیل هم سکشن'  ,
    'فقط سکشن'  ,
    'فقط بارمیل' ,
  ]

  const [whichOneIndex , setWhichOneIndex] = useState(0);
  

  // const [render , setRender] = useState(false);

  let changeWhichOneIndex = async (value) => {
    try {
      whichOneIndex_static = value;
      setWhichOneIndex(value);
      console.log(`##############################`)
      console.log(`whichOneIndex_static : ${whichOneIndex_static}`)
      console.log(`##############################`)
      await setItem('@whichOneIndex' , value.toString());
    } catch(e) {
      
    }
    
  }
  
  

  useEffect( () => {


    // console.log(`---------from-useEffect--------------`);
    
    
    let syncPrevValues = async () => {
      prevTruckLength_static = await getItem('@prevTruckLength');
      //console.log(prevTruckLength_static);
      if( prevTruckLength_static == undefined || prevTruckLength_static == null || prevTruckLength_static == '' ) {
        prevTruckLength_static = 0
      } else {
        prevTruckLength_static = parseInt(prevTruckLength_static);
      }

      prevSectionCounter_static = await getItem('@prevSectionCounter');
      //console.log(prevSectionCounter_static);
      if( prevSectionCounter_static == undefined || prevSectionCounter_static == null || prevSectionCounter_static == '' ) {
        prevSectionCounter_static = 0;
      } else {
        prevSectionCounter_static = parseInt(prevSectionCounter_static);
      }

      prevBarmillCounter_static = await getItem('@prevBarmillCounter');
      //console.log(prevBarmillCounter_static);
      if(prevBarmillCounter_static == undefined || prevBarmillCounter_static == null || prevBarmillCounter_static == '' ) {
        prevBarmillCounter_static = 0;
      } else {
        prevBarmillCounter_static = parseInt(prevBarmillCounter_static);
      }

      notif_static = await getItem('@notif');
      //console.log(prevBarmillCounter_static);
      if(notif_static == undefined || notif_static == null || notif_static == '' ) {
        notif_static = true;
      } else {
        notif_static = (notif_static == 'true');
      }


      // counter = await getItem('@counter');
      // if( counter == undefined || counter == null || counter == '' ) {
      //   counter = 0;
      // } else {
      //   counter = parseInt(counter);
      // }
      // setMyCounter(counter);


      whichOneIndex_static = await getItem('@whichOneIndex');
      if( whichOneIndex_static == undefined || whichOneIndex_static == null || whichOneIndex_static == '' ) {
        whichOneIndex_static = 0;
      } else {
        whichOneIndex_static = parseInt(whichOneIndex_static);
      }
      // console.log(`------useEffect-whichOneIndex_static-${whichOneIndex_static}---------`);
      setWhichOneIndex(whichOneIndex_static);


      /*
      console.log(`--------useEffect-prevTruckLength_static-${prevTruckLength_static}-------------------`);
      console.log(`--------useEffect-prevSectionCounter_static-${prevSectionCounter_static}-------------------`);
      console.log(`--------useEffect-prevBarmillCounter_static-${prevBarmillCounter_static}-------------------`);
      */
    }
    syncPrevValues();



	
  	PushNotification.createChannel({
    	  channelId: "truck", // (required)
    	  channelName: "My channel", // (required)
    	  channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    	  playSound: true, // (optional) default: true
    	  soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    	  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    	  vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  	  }, (created) => {
        console.log(`createChannel returned '${created}'`)
      } // (optional) callback returns whether the channel was created, false means it already existed.
  	);
	
  	/*
  	PushNotification.cancelAllLocalNotifications()
  	PushNotification.localNotification({
  	  channelId: "truck", // (required) channelId, if the channel doesn't exist, notification will not trigger.
  	  vibrate: true, // (optional) default: true
  	  vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  	  title: "My Notification Title", // (optional)
  	  message: "My Notification Message", // (required)
  	});
  	*/
	



	
    let backgroundProcess ;
    let getBackgroundProcessData = async () => {
      backgroundProcess = await getItem('@backgroundProcess')
    }
    getBackgroundProcessData();



    let today ;
    let getDayFromAsyncStorage = async () => {
      today = await getItem('@today');
    }
    



    let fetchData = async () => {
        
        await getDayFromAsyncStorage();
        let emruz = createDay();
        //console.log(`------emruz-${emruz}--------`);
        //console.log(`------today-${today}--------`);
        if( emruz == today ) {

        } else {
          
          try {
            setTrucks([]);
            trucks_static = [];
            sectionCounter_static = 0;
            barmillCounter_static = 0;

            await setItem('@prevTruckLength' , prevTruckLength_static.toString());
            await setItem('@prevSectionCounter' , sectionCounter_static.toString());
            await setItem('@prevBarmillCounter' , barmillCounter_static.toString());
            await setItem('@today', emruz);
            
          } catch(e) {

          }
          
        }


        await fetchTruck(true);
        
    };
    fetchData();


    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if ( appState.current.match(/inactive|background/) && nextAppState === 'active' ) {
        console.log('App has come to the foreground!');
        console.log('stop previous background task ...');

      } else if ( appState.current.match(/active/) && nextAppState.match(/inactive|background/) ) {

      } else {


      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });





    


      /*
      return () => {
       subscription.remove();
      };
      */


  } , [ ]);



  let changeNotificationState = (value) => {
    notif_static = value;
  }

  let stopBackgroundService = async () => {
    await BackgroundService.stop();
    await setItem('@backgroundProcess', 'false');
  }

  let startBackgroundService = async () => {
    if( ! BackgroundService.isRunning() ) {
      await BackgroundService.start(veryIntensiveTask, options);
      await BackgroundService.updateNotification({taskDesc: 'برای غیر فعال کردن از تنظیمات برنامه اقدام کنید',});
      await setItem('@backgroundProcess', 'true');
    }
  }


  let createDay = () => {
    let year = moment().jYear();
    let month = moment().jMonth();
    //console.log('month : ', month);
    month = month + 1;
    let day = moment().jDate();
    //day = day - 1; 
    if ( day < 10 ) {
      day = '0' + day;
    }
    let finalDay = [year,month,day].join('/');
    return finalDay;
  }

  let updateCounters = async (result) => {
    
    //await setItem('@prevTruckLength' , trucks_static.length.toString());
    try {
      await setItem('@prevTruckLength' , prevTruckLength_static.toString());
      // await setItem('@prevTruckLength' , trucks_static.length.toString()); // if you uncomment this every time you toggle notification switch new notification comes up
      await setItem('@prevSectionCounter' , sectionCounter_static.toString());
      await setItem('@prevBarmillCounter' , barmillCounter_static.toString());

      prevTruckLength_static = prevTruckLength_static ;
      prevSectionCounter_static = sectionCounter_static;
      prevBarmillCounter_static = barmillCounter_static ;
    } catch(e) {

    }

    let secCounter = 0;
    let barCounter = 0;

    for(let i=0;i<result.length;i++) {
      //console.log(result[i].BilletType);
      if(result[i].BilletType.toLowerCase() == "3sp") {
        secCounter++;
      } else {
        barCounter++;
      }
    }

    // console.log(`-------secCounter-${secCounter}--------`);
    // console.log(`-------barCounter-${barCounter}--------`);

    
    sectionCounter_static = secCounter ;
    barmillCounter_static = barCounter ;
    trucks_static = result ;
    prevTruckLength_static = result.length;

    setSectionCounter((prev) => secCounter);
    setBarmillCounter((prev) => barCounter);
    setTrucks(result);
    setLoading(true);

    
    
  }




  let fetchTruck = async (fromuseEffect) => {
    
    // counter += 1;
    // setMyCounter(counter);
    // await setItem('@counter' , counter.toString());

    let day = createDay();
    let url = `http://81.12.5.107:81/api/BilletInput/GetBilletInputs/?username=6272&password=sj6272&startDate=${day}&endDate=${day}`;
    try {
      let data = await fetch(url);
      data = await data.json();
      //console.log(data.Result.length);
      
      
      //setSectionText(`new section : ${sectionCounter}`);
      //setBarmillText(`new barmill : ${barmillCounter}`);
  	  let test;

    	test = await getItem('@prevTruckLength');
      if( test == undefined || test == null || test == '' ) {
        prevTruckLength_static = 0
      } else {
        prevTruckLength_static =  parseInt(test);
      }

      test = await getItem('@prevSectionCounter');
      if( test == undefined || test == null || test == '' ) {
        prevSectionCounter_static = 0;
      } else {
        prevSectionCounter_static = parseInt(test);
      }
      
      test = await getItem('@prevBarmillCounter');
    	if( test == undefined || test == null || test == '' ) {
        prevBarmillCounter_static = 0;
      } else {
        prevBarmillCounter_static = parseInt(test);
      }


      test = await getItem('@whichOneIndex');
      if( test == undefined || test == null || test == '' ) {
        whichOneIndex_static = 0;
      } else {
        whichOneIndex_static = parseInt(test);
      }

      //setRender((prevValue) => !prevValue);

      await updateCounters(data.Result);

      
  	  console.log('\n\n');
    	// console.log(`------counter-${counter}-------`)
      console.log(`------notif_static-${notif_static}-------`)
      console.log(`------fromuseEffect-${fromuseEffect}-------`)
      console.log(`------whichOneIndex_static-${whichOneIndex_static}-------`)
      console.log(`------data.Result.length-${data.Result.length}-------`)
      console.log(`------prevTruckLength-${prevTruckLength_static}------trucks_static.length-${trucks_static.length}`)
      console.log(`------prevsectionCounter-${prevSectionCounter_static}------sectionCounter_static-${sectionCounter_static}`)
      console.log(`------prevbarmillCounter-${prevBarmillCounter_static}------barmillCounter_static-${barmillCounter_static}`)
      console.log('\n\n');
      

      notif_static = await getItem('@notif');
      if( notif_static == undefined || notif_static == null || notif_static == '' ) {
        notif_static = true;
      } else {
        notif_static = ( notif_static == 'true' );
      }
    	
      if(notif_static) {
        // if( whichOneIndex_static == 0 && data.Result.length > prevTruckLength_static ) { 
        if( whichOneIndex_static == 0 && ( sectionCounter_static > prevSectionCounter_static || barmillCounter_static > prevBarmillCounter_static  ) ) { 
            PushNotification.cancelAllLocalNotifications()
            PushNotification.localNotification({
            /* Android Only Properties */
              channelId: "truck", // (required) channelId, if the channel doesn't exist, notification will not trigger.
              ticker: "My Notification Ticker", // (optional)
              showWhen: true, // (optional) default: true
              autoCancel: false, // (optional) default: true
              largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
              smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
              bigLargeIcon: "ic_launcher", // (optional) default: undefined
              vibrate: true, // (optional) default: true
              vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
              title : 'تعداد ' + sectionCounter_static + ' عدد تریلی به سمت سکشن وارد شد ' ,
              message: 'تعداد ' + barmillCounter_static + ' عدد تریلی به سمت بارمیل وارد شد ', // (required)
            });
          } else if ( whichOneIndex_static == 1 && sectionCounter_static > prevSectionCounter_static ) { // sectionCounter > prevsectionCounter ) {
              PushNotification.cancelAllLocalNotifications()
              PushNotification.localNotification({
              /* Android Only Properties */
                channelId: "truck", // (required) channelId, if the channel doesn't exist, notification will not trigger.
                ticker: "My Notification Ticker", // (optional)
                showWhen: true, // (optional) default: true
                autoCancel: false, // (optional) default: true
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
                smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
                bigLargeIcon: "ic_launcher", // (optional) default: undefined
                vibrate: true, // (optional) default: true
                vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                title : 'تعداد ' + sectionCounter_static + ' عدد تریلی به سمت سکشن وارد شد ' ,
                message: '', // (required)
              });
          } else if ( whichOneIndex_static == 2 && barmillCounter_static > prevBarmillCounter_static ) { // barmillCounter > prevbarmillCounter ) {
              PushNotification.cancelAllLocalNotifications()
              PushNotification.localNotification({
              /* Android Only Properties */
                channelId: "truck", // (required) channelId, if the channel doesn't exist, notification will not trigger.
                ticker: "My Notification Ticker", // (optional)
                showWhen: true, // (optional) default: true
                autoCancel: false, // (optional) default: true
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
                smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
                bigLargeIcon: "ic_launcher", // (optional) default: undefined
                vibrate: true, // (optional) default: true
                vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                message : '',
                title : 'تعداد ' + barmillCounter_static + ' عدد تریلی به سمت بارمیل وارد شد ', // (required)
              });
          }
      }


    } catch(e) {
      console.log('Error happens while fetch Trucks ... ' , e.message);
    }

  }

  

  

  return (
    <SafeAreaView style={styles.maincontainer}>
      <StatusBar
        backgroundColor='#000'
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentContainerStyle={{ flex: 1 , flexGrow: 1}}
        style={styles.maincontainer}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        {/*<Header title="home" />*/}
        {/*<View style={{ backgroundColor : '#333' , alignItems: 'center' }}>
          <Text style={{color : '#fff'}}>Counter : {myCounter}</Text>
        </View>*/}
        <Body 
          navigation={navigation} 
          trucks={trucks}
          loading={loading}
          sectionCounter={sectionCounter}
          barmillCounter={barmillCounter}
          whichOne={whichOne}
          whichOneIndex={whichOneIndex}
          changeWhichOneIndex={changeWhichOneIndex}
          stopBackgroundService={stopBackgroundService}
          startBackgroundService={startBackgroundService}
          changeNotificationState={changeNotificationState}
        />
		{/*<Button title="click" onPress={() => {
          console.log(trucks.length , sectionCounter , barmillCounter);
        }} />*/}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer : {
    flexDirection: 'column', 
    flex : 1,
    flexGrow: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Main;



