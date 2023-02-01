/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useState , useEffect , useCallback } from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import uuid from 'react-native-uuid';

import moment from "moment-jalaali";




let Card = ({item , index}) => {
  let pelak = item.Number.split(" ");
  return (
    <View style={styles.card}>
      <View style={styles.counter}>
        
      </View>
      <Text style={index+1 >= 10 ? styles.counterText : styles.counterTextLessThanTen}>{index+1}</Text>
      <View style={styles.row}>
        <Text style={styles.text}> 
          زمان ورودی  :
        </Text>
        <Text style={[styles.text , {paddingRight: 10}]}>
          {item.BilletInputTime}
        </Text>
      </View>
      <Text style={styles.text}>{item.BilletDescription}</Text>
      <View style={styles.row}>
        <Text style={styles.bigText}>
          تعداد   :  
        </Text>
        <Text style={[styles.bigText , {paddingRight: 10}]}>
          {item.BilletInputCount}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>
            فرستنده  : 
        </Text>
        <Text style={[styles.text , {paddingRight: 10}]}>
          {item.Employer}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>
            پلاک   : 
        </Text>
      </View>
      <View style={styles.pelakContainer}>
        <View style={styles.pelak}> 
          <View style={[styles.blue , styles.pelakborder]}>
          </View>
          <View style={styles.middlePelak ,styles.pelakborder}>
            <View style={styles.fixMe}>
              <Text style={[styles.pelakText , {paddingHorizontal: 10}]}>
              {[pelak[2] , pelak[3] , pelak[4]].join(' ')}
              </Text>
            </View>
          </View>
          <View style={[styles.column , styles.pelakborder]}>
            <Text style={styles.pelakColumnText}>
              {pelak[1]}
            </Text>
            <Text style={styles.pelakColumnText}>
                {pelak[0]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}


const Details = ({ route , navigation }) => {
  const isDarkMode = true ;

  const [ theTrucks , setTheTrucks ] = useState([]);
  const [ loading , setLoading ] = useState(true); 
  const [ counter , setCounter ] = useState(route.params.counter);

  const [ list , setList ] = useState(undefined);

  const [ force , setForce ] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout( async () => {
      setList(undefined);
      asyncWork();
      setRefreshing(false);
    }, 200);
  }, []);



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


  let trucks_static = [] ;


  let fetchTruck = async () => {
    
    let day = createDay();
    let url = `http://81.12.5.107:81/api/BilletInput/GetBilletInputs/?username=6272&password=sj6272&startDate=${day}&endDate=${day}`;
    try {
      let data = await fetch(url);
      data = await data.json();
      //console.log(data.Result.length);
      trucks_static = data.Result;
    } catch (e) {
      console.log(e.message);
    }
      
  }


  let asyncWork = async () => {
    //let { title , trucks } = route.params;
    let { title } = route.params;
    console.log(title);
    await fetchTruck();

    trucks_static = trucks_static.filter((item) => {
      return item.BilletType.toLowerCase() == title
    })
    setTheTrucks(trucks_static);
    mylist = trucks_static.map( (item , index) => {
    return <Card item={item} index={index} key={index}/>
    }).reverse()
    setList(mylist);
  }


 
  useEffect( () => {  

    asyncWork();
    
  } , [ ]);





  let handleLoading = () => {
    
    console.log(theTrucks.length , counter);
    if( theTrucks.length == counter ) {
      setLoading(false)
    } 
  }

  let showOrHideActivityIndicator = () => {
    if( loading == true ) {
      return (
        <ActivityIndicator size="large" style={styles.loading} />
      )
    }
  }


  let FlatListChanged = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  }


  return (
    <SafeAreaView style={styles.maincontainer}>
      <StatusBar
        backgroundColor='#000'
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View
        style={styles.maincontainer}
        contentInsetAdjustmentBehavior="automatic"
        >
        {/*<Header title={title} />*/}
        {/*<FlatList 
          data={theTrucks.reverse()}
          renderItem={({item , index}) => <Card item={item} index={theTrucks.length-index-1}/>}
          keyExtractor={item => uuid.v4()}
          onEndReached={() => {
            setLoading(false);
          }}
        />*/}
        {/*{showOrHideActivityIndicator()}*/}
        {
          list == undefined ?
          <View style={{ flex : 1 , justifyContent : 'center' , alignItems : 'center' }}>
            <ActivityIndicator
              size="large" 
              color="#fff"
            />
          </View>
          :
          <ScrollView 
          contentContainerStyle={ theTrucks.length == 0 ? { flex: 1 , flexGrow: 1} : {} }
          //contentInsetAdjustmentBehavior="automatic"
          //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
          >
          { theTrucks.length == 0 ?
          (
            <View style={styles.wrapper}>
              <Text style={styles.bigText}>ورودی نداشت </Text>
            </View>
            )
          : list
          }
          </ScrollView>
        }
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  loading : {
    paddingVertical: 5,
  },
  maincontainer : {
    flexDirection: 'column', 
    backgroundColor : '#333',
    flex : 1,
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
  card : {
    margin : 10,
    borderWidth: 2 ,
    borderColor: '#000',
    borderRadius: 5,
    padding : 15,
    overflow: 'hidden',
  },
  counter : {
    position: 'absolute',
    width : 80,
    height : 120,
    transform: [{rotate:'45deg'},{translateX:-80},{translateY:-10}] ,
    justifyContent : 'center',
    alignItems : 'flex-end',
    paddingHorizontal: 10,
    top : 5,
    left : 5,
    backgroundColor : '#fff',
    borderWidth : 2,
    // borderRadius : 50 / PixelRatio.get() ,
  },
  counterTextLessThanTen : {
    color : 'black',
    fontSize : 20,
    position: 'absolute',
    paddingHorizontal : 5,
    fontFamily : 'Shabnam-Bold',
  },
  counterText : {
    color : 'black',
    fontSize : 20,
    position: 'absolute',
    paddingHorizontal : 1,
    fontFamily : 'Shabnam-Bold',
  },
  text : {
    fontFamily: 'Shabnam',
    color : '#fff',
    fontSize : 14,
  },
  bigText : {
    fontFamily: 'Shabnam-Bold',
    color : '#fff',
    fontSize : 20,
  },
  row : {
    flexDirection : 'row-reverse',
  },
  column : {
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    paddingHorizontal : 5,
  },
  pelakContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  } ,
  pelak : {
    flexDirection : 'row',
    justifyContent : 'center',
    backgroundColor : '#fff',
    margin : 5,
  },
  middlePelak : {
    flexDirection : 'column',
  },
  fixMe : {
    height : '100%',
    justifyContent : 'center',
    alignItems : 'center',
  } ,
  pelakborder : {
    borderWidth : 2,
    borderColor : '#000',
  },
  pelakText : {
    color : '#000',
    fontFamily : 'Shabnam-Bold',
    fontSize : 20,
  },
  pelakColumnText : {
    fontFamily : 'Shabnam',
    fontSize : 10,
    color : '#000',
  },
  blue : {
    backgroundColor : 'blue',
    width : 15,
    height : '100%',
  }
});

export default Details;



