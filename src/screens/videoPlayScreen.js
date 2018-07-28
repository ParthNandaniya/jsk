import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	StatusBar,
	Dimensions
} from 'react-native';
import {
	Container,
	Content
} from 'native-base';
import { connect } from 'react-redux';
import VideoPlayer from 'react-native-video-controls';

class videoPlayScreen extends Component {

  render() {
    return (
        <View style={{flex: 1}} >
            <StatusBar hidden animated />
            <VideoPlayer
                source={{ uri: this.props.videoInfo.image.uri }}
                onBack={() => this.props.navigation.goBack()}
                controlTimeout={30000}
                seekColor={'#ff1c1c'}
            />
        </View>
    );
  }
}


const mapStateToProps = ({ videoPlayReducer }) => {
	const { videoInfo } = videoPlayReducer;

	return ({ videoInfo });
}

export default connect(mapStateToProps)(videoPlayScreen);
