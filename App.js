/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useEffect } from 'react';
import type {Node} from 'react';

import { View , Text , PixelRatio , Dimensions , TouchableOpacity } from 'react-native'; 

import Main from './components/Main';
import Details from './components/Details';
import Settings from './components/Settings';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Icon from 'react-native-vector-icons/MaterialIcons';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


import RNRestart from 'react-native-restart';
import { I18nManager } from 'react-native';



function forceLayout(rtl) {
	if(I18nManager.isRTL){
		I18nManager.allowRTL(rtl);
		I18nManager.forceRTL(rtl);
		RNRestart.Restart();
	}
}


const Stack = createNativeStackNavigator();


const StackScreen = () => {
	return (
	<Stack.Navigator>
        <Stack.Screen 
        name="Home" 
        component={Main} 
        options={ ({ navigation, route }) => (
          { 
            title: ' محموله ی ورودی ' ,
            headerTitle : () => {
                return ( <View style={{  
				flexDirection : 'row' , 
				justifyContent : 'center' , 
				alignItems : 'center',
				flex : 1,
				}}>
				<View
				
				><Text style={{ 
                  fontFamily : 'Shabnam' ,
                  fontSize : 18, 
				  paddingRight : 30,
                  color : 'white'
                }}>
                  محموله ی ورودی
                </Text></View>
				<TouchableOpacity 
				style={{ position : 'absolute' , right : (Dimensions.get('window').width * 10) / 100 }}
				onPress={() => {navigation.navigate('Settings');}}
				>
				<Icon  name="settings" size={30} color="#fff" />
				</TouchableOpacity>
				</View>)
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily : 'Shabnam',
              fontWeight: 'bold',
            },
          })
        }
        />
        <Stack.Screen 
        name="Details" 
        component={Details} 
        options={({ route }) => ({ 
          title: route.params.title == '3sp' ? ' سکشن ' : ' بارمیل ' ,
          headerTitle : () => {
              return ( <Text style={{ 
                fontFamily : 'Shabnam' ,
                fontSize : 18, 
                color : 'white'
              }}>
              { route.params.title == '3sp' ? ' سکشن ' : ' بارمیل ' }
              </Text> )
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily : 'Shabnam',
            fontWeight: 'bold',
          },
        })}
        />
		<Stack.Screen 
        name="Settings" 
        component={Settings} 
        options={({ route }) => ({ 
          title: 'تنظیمات' ,
          headerTitle : () => {
              return ( <Text style={{ 
                fontFamily : 'Shabnam' ,
                fontSize : 18, 
                color : 'white'
              }}>
              { 'تنظیمات' }
              </Text> )
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily : 'Shabnam',
            fontWeight: 'bold',
          },
        })}
        />
      </Stack.Navigator>
	)
}

const App = () => {  

  useEffect( () => {
	  forceLayout(false);
  } , [] );

  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default App;
