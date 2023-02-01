import React , { useState , useEffect , useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  ActivityIndicator,
  TouchableOpacity ,
} from 'react-native';

import moment from "moment-jalaali";
import Section from './Section';
import Today from './Today';


import { getItem , setItem } from './StorageManager';


const Body = ({
	navigation , 
	trucks , 
	sectionCounter , 
	barmillCounter , 
	loading ,
	whichOne,
	whichOneIndex,
	changeWhichOneIndex,
	stopBackgroundService,
	startBackgroundService,
	changeNotificationState
}) => {
	//console.log(Date.now());

	const [isEnabled, setIsEnabled] = useState(false);

	

  const toggleSwitch = async () => {
  	setIsEnabled( (previousState) => !previousState );
  	if(isEnabled == false) {
			//startBackgroundService();
			await setItem('@backgroundProcess', 'true');
			await setItem('@notif', 'true');
			changeNotificationState(true);
		} else {
			//stopBackgroundService();
			await setItem('@backgroundProcess', 'false');
			await setItem('@notif', 'false');
			changeNotificationState(false);
		}
  }
	

	useEffect( () => {  
		
		 let backgroundProcessData;
	   let getNotificationDataFromAsyncStorage = async () => {
		    backgroundProcessData = await getItem('@backgroundProcess');
		    if(backgroundProcessData == undefined || backgroundProcessData == null || backgroundProcessData == '') {
		      setIsEnabled(true);
		      changeNotificationState(true);
		      await startBackgroundService();
		      await setItem('@backgroundProcess', 'true');
					await setItem('@notif', 'true');
		    } else if( backgroundProcessData == 'true' ) {
					setIsEnabled(true);
					changeNotificationState(true);
					//await startBackgroundService();
					await setItem('@backgroundProcess', 'true');
					await setItem('@notif', 'true');
	      } else if( backgroundProcessData == 'false' ) {
					setIsEnabled(false);
					changeNotificationState(false);
					//await stopBackgroundService();
					await setItem('@backgroundProcess', 'false');
					await setItem('@notif', 'false');
	      }
     }
     getNotificationDataFromAsyncStorage();

    }
 , [  ] );



  
 

  // http://81.12.5.107:81/api/BilletInput/
  // GetBilletInputs/
  // ?username=6272&password=sj6272
  // &startDate="+ checkToday + 
  // "&endDate=" + checkToday

  



	if(loading) {
		return (
		<View style={styles.body}>
			<View style={styles.settings}>
	      <View style={styles.row}>
	        <TouchableOpacity
	        	onPress={ async () => {
	        		try {
	        			if ( whichOneIndex + 1 >= 3 ) {
	        				await setItem('@whichOneIndex', '');
	        				changeWhichOneIndex(0);
	        			} else {
	        				await setItem('@whichOneIndex', (whichOneIndex + 1).toString());
	        				changeWhichOneIndex(whichOneIndex + 1);
	        			}
	        		} catch(e) {

	        		}
	        		
	        	}}
	        >
						{/*<Text style={styles.text}>نوتیفیکیشن   </Text>*/}
						<Text style={styles.text}> {whichOne[whichOneIndex]}  </Text>
	        </TouchableOpacity>
	        <Switch
	          trackColor={{false: '#767577', true: '#81b0ff'}}
	          thumbColor={isEnabled ? '#81ddff' : '#f4f3f4'}
	          ios_backgroundColor="#3e3e3e"
	          onValueChange={toggleSwitch}
	          value={isEnabled}
	        />
	      </View>
	    </View>
			<Today date={moment().format('jYYYY/jM/jD')}/>
			<Section trucks={trucks} navigation={navigation} title="3sp" counter={sectionCounter}/>
			<Section trucks={trucks} navigation={navigation} title="5sp" counter={barmillCounter}/>
		</View>
		)
	} else {
		return (
		<View style={styles.body}>
			{/*<Text style={styles.text}>Loading ...</Text>*/}
			<ActivityIndicator
				size="large" 
				color="#fff"
			/>
		</View>
		)
	}
	

}

const styles = StyleSheet.create({
	body : {
		backgroundColor: '#333',
		flex : 1 ,
		justifyContent: 'center', 
		alignItems : 'center',
		height : '100%'
	},
	settings : {
    backgroundColor: '#333',
    justifyContent: 'center', 
    alignItems : 'center',
    paddingBottom : 40,
  },
  button : {
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10 ,
    backgroundColor : '#3a86ff',
    justifyContent : 'center',
    alignItems : 'center',
  },
  row : {
    flexDirection: 'row-reverse' , 
  },
  text : {
    fontSize : 20,
    fontFamily: 'Shabnam-Bold',
    color : '#fff',
  }
});

export default Body;