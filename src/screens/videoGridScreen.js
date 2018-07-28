import React, { Component } from 'react';
import {
	View,
	Text,
	Image, 
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Dimensions
} from 'react-native';
import {
	Container,
	Content,
	Spinner,
	Button
} from 'native-base';
import { connect } from 'react-redux';
import {
	getVideoList,
	storeClickedVideoInfo,
	videoGridScreenInitialState
} from '../actions';
import ListItem from '../components/common/ListItem';
import SameHeader from '../components/common/SameHeader';
import Thumbnail from 'react-native-thumbnail-video';

const PHONE_WIDTH = Dimensions.get('window').width;

class videoGridScreen extends Component {
	componentWillMount() {
		this.props.getVideoList(this.props.folderName, 9);
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	_renderItem = (flatListData) => {
		const { index, item } = flatListData;
		return (
			<ListItem
				index={index}
				onImagePress={() => this.onListItemPress(item)} 
			>
				<Thumbnail
	                url={item.node.image.uri.toString()}
	                onPress={() => this.onListItemPress(item)}
	                containerStyle={styles.thumbnailStyle}
	                imageWidth={PHONE_WIDTH/3.099}
	                imageHeight={PHONE_WIDTH/3.099}
	              />
			</ListItem>
		)
	}

	_listFooterComponent = () => {
		if(this.props.has_next_page){
			return (
				<Spinner color={this.props.color} />
			);	
		}
		return (
			<View />
		);
	}
	_onRefresh = () => {
		if(this._isMounted) {
			this.props.videoGridScreenInitialState();
			this.props.getVideoList(this.props.folderName, 9);
		}
	}

	onListItemPress = (item) => {
		if(this._isMounted) {
			this.props.storeClickedVideoInfo(item.node);
		}
		this.props.navigation.navigate('videoPlay');
	}
	_onEndReached = () => {
		if(this.props.has_next_page) {
			if(this._isMounted) {
				this.props.getVideoList(this.props.folderName, 9);
			}
		}
	}

	render() {
		return (
			<Container>
				<SameHeader title={this.props.folderName} backButton={true} />
					<View style={styles.gridView}>
						<FlatList
					        data={this.props.dataSource}
					        numColumns={3}
					        ListFooterComponent={this._listFooterComponent}
					        getItemLayout={(data, index) => (
	    						{length: PHONE_WIDTH/3.099, offset: (PHONE_WIDTH/3.099) * index, index}
	  						)}
	  						refreshing={this.props.refreshing}
	  						onRefresh={this._onRefresh}
	  						initialNumToRender={6}
	  						onEndReached={this._onEndReached}
	  						onEndReachedThreshold={0.5}
					        keyExtractor={(item, index) => index }
					        style={styles.flatListStyle}
					        renderItem={this._renderItem}
						/>
					</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 15,
    flex: 1,
  },
  flatListStyle: {
  	flex: 1,
  	marginVertical: 20
  },
  spinnerStyle: {
  	flex:1,
  	flexDirection: 'row',
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  thumbnailStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10
  },
  listItems: {
  	justifyContent: 'space-around',
  	alignItems: 'flex-start',
  },
  failImageSourceStyle: {
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'white',
	fontSize: 24
  },
});

const mapStateToProps = ({ videoGridReducer, globleReducer }) => {
	const { 
		folderName, 
		dataSource, 
		has_next_page, 
		prevFolderName,
		refreshing 
	} = videoGridReducer;
	const { color } = globleReducer;

	return ({
		folderName,
		dataSource,
		has_next_page,
		prevFolderName,
		refreshing,
		color
	});
}

export default connect(mapStateToProps, {
	getVideoList,
	storeClickedVideoInfo,
	videoGridScreenInitialState
})(videoGridScreen);
