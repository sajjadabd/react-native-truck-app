/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useState , useEffect } from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';



import AsyncStorage from '@react-native-async-storage/async-storage';

import { setItem , getItem } from './StorageManager';


import Icon from 'react-native-vector-icons/MaterialIcons';

import BackgroundService from 'react-native-background-actions';



const Settings = ({ route , navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  let stopBackgroundService = async () => {
    await BackgroundService.stop();
  }

  const eraseStorage = async () => {
    await setItem('@backgroundProcess', '');
    await setItem('@prevTruckLength', '');
    await setItem('@prevSectionCounter', '');
    await setItem('@prevBarmillCounter', '');
    await setItem('@today', '');
    await setItem('@notif', '');
  }

  return(
    <View style={styles.settings}>
      {/*<View style={styles.row}>
        <Text style={styles.text}>نوتیفیکیشن   </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#81ddff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>*/}
      <View style={styles.column}>
         <TouchableOpacity 
           onPress={ async () => {
              await eraseStorage();
              stopBackgroundService();
              //await setItem('@whichOneIndex', '');
           }}
           style={styles.button}
         >
          {/*<Text style={styles.text}>ریست برنامه </Text>*/}
          <Icon style={{fontSize: 80 , color : 'tomato'}}  name="power-settings-new" size={30} color="#fff" />
         </TouchableOpacity>
         <TouchableOpacity 
           onPress={ async () => {
              await eraseStorage();
              //await setItem('@whichOneIndex', '');
           }}
           style={styles.button}
         >
          {/*<Text style={styles.text}>ریست برنامه </Text>*/}
          <Icon style={{fontSize: 80 , color : 'seagreen'}}  name="refresh" size={30} color="#fff" />
         </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  settings : {
    backgroundColor: '#333',
    flex : 1 ,
    justifyContent: 'center', 
    alignItems : 'center',
    height : '100%'
  },
  button : {
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10 ,
    justifyContent : 'center',
    alignItems : 'center',
  },
  column : {
    flex : 1,
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


export default Settings;