import React , {useState , useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Header = ({navigation , title}) => {
	
	const [headerTitle , setHeaderTitle] = useState('');

	useEffect( () => {  
		let myTitle ;
		if( title == "home" ) {
			myTitle = ' محموله ی ورودی ';
			setHeaderTitle(myTitle);
		} else if (title == "section") {
			myTitle = ' سکشن ' ;
			setHeaderTitle(myTitle);
		} else if (title == "barmill") {
			myTitle = ' بارمیل ' ;
			setHeaderTitle(myTitle);
		}
	} , [] );


	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>
				{headerTitle}
			</Text>
		</View>
	)

}

const styles = StyleSheet.create({
	header : {
		padding : 20,
		backgroundColor: '#000111',
	},
	headerText : {
		fontSize : 20,
		color : 'white',
		textAlign : 'center' ,
		fontFamily: 'Shabnam' ,
	}
});

export default Header;