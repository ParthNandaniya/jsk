import React, { Component } from 'react';
import {
	Container,
	Content,
	Icon
} from 'native-base';
import {
	ScrollView,
	View,
	Alert,
	PermissionsAndroid,
	AsyncStorage,
	StatusBar
} from 'react-native';
import { connect } from 'react-redux';

import RecentPhotosWithGrid from '../components/RecentPhotosWithGrid';
import SameHeader from '../components/common/SameHeader';
import {
	saveDefaultColor,
	restoreLikedPhotos
} from '../actions';

class recentScreen extends Component {
	componentWillMount() {
	    this.externalStoragePermission();
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this.saveToAsync(this.props.likedPhotos);
		this._isMounted = false;
	}

	saveToAsync = async (likedPhotos) => {
		await AsyncStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
	}
	externalStoragePermission = async () => {
		let granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
		if(granted === PermissionsAndroid.RESULTS.GRANTED){

			let color = await AsyncStorage.getItem('color');
			if(color) {
				this.props.saveDefaultColor(color);
				StatusBar.setBackgroundColor(color.toString(), true);
			}
			
			let asyncLikedPhotos = await AsyncStorage.getItem('likedPhotos');
			if(asyncLikedPhotos){
				this.props.restoreLikedPhotos(JSON.parse(asyncLikedPhotos));
			}
		} else {
			Alert.alert(
			  'do not have permission',
			  'abe permission to de storage ki',
			  [
			    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		}
	}

	render() {
		return (
			<Container>
				<SameHeader title='TIMELINE' settingButton={true} />
				<RecentPhotosWithGrid />
			</Container>
		);
	}
}

const mapStateToProps = ({ favoriteReducer }) => {
	const { likedPhotos } = favoriteReducer;

	return ({
		likedPhotos
	});
};

export default connect(mapStateToProps, {
	saveDefaultColor,
	restoreLikedPhotos
})(recentScreen);
