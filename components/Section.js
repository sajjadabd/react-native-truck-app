import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


const Section = ({ navigation , title , counter , trucks }) => {
	
	let myTitle =  (title == '3sp' ? ' سکشن ' : ' بارمیل ' );

	return (
		<TouchableOpacity 
		onPress={() => navigation.navigate('Details' , {
          title : title ,
          //trucks : trucks ,
          counter : counter,
    })}
		style={styles.section}
		>
			<Image
			style={styles.image}
			source={require('./images/icon.png')} 
			/>
			<View style={styles.description}>
				<Text style={styles.textStyle}>{myTitle}</Text>
				<View style={styles.info}>
					<Text style={[styles.textStyle, styles.number]}>{counter}</Text>
					<Text style={styles.textStyle}>تریلی</Text>
				</View>
			</View>
		</TouchableOpacity>

	)
}

const styles = StyleSheet.create({
	textStyle : {
		fontSize : 20,
		color : 'white',
		textAlign : 'center' ,
		fontFamily: 'Shabnam' ,
	},
	section : {
		backgroundColor : '#555',
		flexDirection: 'row',
		padding : 20,
		margin : 20,
		borderRadius: 20,
		borderWidth: 5,
		borderColor: '#000'
	},
	image : {
		width : 100 ,
		height : 100
	},
	description : {
		flex : 1,
		justifyContent : 'space-around',
		alignItems : 'flex-end',
	},
	info : {
		alignItems : 'center',
		justifyContent : 'center',
		flexDirection : 'row-reverse',
	},
	number : {
		paddingLeft : 20,
		fontSize : 30,
		fontFamily : 'Shabnam-Bold'
	},
});

export default Section;