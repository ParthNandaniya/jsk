import React, { Component } from 'react';
import { 
	View,
	Text,
	Image, 
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Modal,
	Dimensions
} from 'react-native';
import { Spinner, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { 
	getRecentPhotos,
	recentScreenInitialState,
	openImageModal,
	changeCurrentlyVisibleImageIndex,
	closeImageModal,
	saveLikedImage
} from '../actions';
import ListItem from './common/ListItem';
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';

const PHONE_WIDTH = Dimensions.get('window').width;

class RecentPhotosWithGrid extends Component {
	// state = {
	// 	likedImages: []
	// }
	componentDidMount() {
		this._isMounted = true;
		this.props.getRecentPhotos(27);
	}
	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps.color);
	// }
	componentWillUnMount() {
		this._isMounted = false;
	}

	_renderItem = (flatListData) => {
		const { index, item } = flatListData;
		return (
			<ListItem
				index={index}
				onImagePress={() => this.onListItemPress(index)} 
			  >
				<Image
	                source={{ uri: item.node.image.uri }}
	                style={styles.imageStyle}
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
		if(this._isMounted){
			this.props.recentScreenInitialState();
			this.props.getRecentPhotos(27);
		}
	}

	onModalClose = () => {
		if(this._isMounted) {
			this.props.closeImageModal();
		}
	}
	onListItemPress = (index) => {
		if(this._isMounted) {
			this.props.openImageModal(index);
		}
	}
	_onEndReached = () => {
		if(this.props.has_next_page) {
			if(this._isMounted) {
				this.props.getRecentPhotos(27);
			}
		}
	}

	onLikeButtonPress = (index, result, finalResult) => {
		if(this._isMounted) {
			this.props.saveLikedImage(result, finalResult);
			this.props.changeCurrentlyVisibleImageIndex(index);
		}
	}

	_renderFooter = (index) => {
		let result = _.find(this.props.images, (e) => {
			return (e.index === index);
		}, 0);

		let finalResult = _.find(this.props.likedPhotos, (x) => {
			return (x.url === result.url);
		}, 0);

		let	IconName = finalResult ? 'ios-heart' : 'ios-heart-outline';
		return (
			<TouchableOpacity
				onPress={() => this.onLikeButtonPress(index, result, finalResult)}
				// style={styles.footerIconStyle}
			>
				<Icon 
        			type="Ionicons" 
        			name={IconName}
        			size={24}
        			style={{color: this.props.color}}
        		/>
        	</TouchableOpacity>
        );
	}
	
	render() {
		return (
			<View style={styles.gridView}>
					<FlatList
				        data={this.props.dataSource}
				        // extraData={this.state}
				        style={styles.flatListStyle}
				        numColumns={3}
				        refreshing={this.props.refreshing}
				        onRefresh={this._onRefresh}
				        ListFooterComponent={this._listFooterComponent}
				        getItemLayout={(data, index) => (
    						{length: PHONE_WIDTH/3.099, offset: (PHONE_WIDTH/3.099) * index, index}
  						)}
  						initialNumToRender={10}
  						onEndReached={this._onEndReached}
  						onEndReachedThreshold={0.5}
				        keyExtractor={(item, index) => index }
				        renderItem={this._renderItem}
					/>
		          <Modal
		            visible={this.props.modalVisible}
		            transparent={true}
		            onRequestClose={this.onModalClose}
		          >
		          	<ImageViewer 
		          		imageUrls={this.props.images} 
		          		index={this.props.currentlyVisibleImageIndex} 
		          		// onClick={() => console.log('image presssed!!!')}
		          		// onShowModal={() => console.log('on Show Modal activated!!!')}
		          		onCancel={this.onModalClose}
		          		flipThreshold={80}
		          		failImageSource={() => <Text style={styles.failImageSourceStyle}> image can't load </Text>}
		          		onSwipeDown={this.onModalClose}
		          		// renderArrowLeft={() => <Text> go back </Text>}
		          		// renderArrowRight={() => console.log('arow right Pressed!!!')}
		          		backgroundColor={'#161616'}
		          		maxOverflow={this.props.images.length}
		          		// renderHeader={() => <Text> header </Text>}
		          		renderFooter={this._renderFooter}
		          		footerContainerStyle={styles.footerIconStyle}
		          		// loadingRender{() => <Spinner color={this.props.color} />}
		          	/>
		          </Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  gridView: {
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
  imageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10
  },
  listItems: {
  	justifyContent: 'space-around',
  	alignItems: 'flex-start',
  },
  footerIconStyle: {
  	flex: 1,
  	position: 'absolute',
  	alignItems: 'center',
  	justifyContent: 'center',
  	left: (PHONE_WIDTH/2)-8,
  	bottom: 30,
  },
	failImageSourceStyle: {
 		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		fontSize: 24
	}  
});


const mapStateToProps = ({recentReducer, imageReducer, globleReducer, favoriteReducer}) => {
	const { dataSource, images, has_next_page, refreshing } = recentReducer;
	const { modalVisible, currentlyVisibleImageIndex } = imageReducer;
	const { color } = globleReducer;
	const { likedPhotos } = favoriteReducer;

	return ({
		dataSource,
		images,
		has_next_page,
		refreshing,
		modalVisible,
		currentlyVisibleImageIndex,
		color,
		likedPhotos
	});
}

export default connect(mapStateToProps, {
	getRecentPhotos,
	recentScreenInitialState,
	openImageModal,
	changeCurrentlyVisibleImageIndex,
	closeImageModal,
	saveLikedImage
})(RecentPhotosWithGrid);
