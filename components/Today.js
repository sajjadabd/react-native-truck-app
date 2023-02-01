import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


const Today = ({date}) => {
	date = date.split('/').join(' / ');
	return (
		<View style={styles.today}>
			<Text style={styles.text}>
			تاریخ امروز : 
			</Text>
			<Text style={styles.text}>{date}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	today : {
		flexDirection : 'row-reverse',
		justifyContent : 'center',
		alignItems : 'center',
	},
	text : {
		color : '#fff',
		fontFamily: 'Shabnam-Bold',
		paddingHorizontal: 5 ,
	}
});

export default Today;