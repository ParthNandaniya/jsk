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
import {
	Container,
	Content,
	Spinner,
	Button,
	Icon
} from 'native-base';
import { connect } from 'react-redux';
import { 
	getAlbumImages,
	albumPhotoScreenInitialState,
	openAlbumImageModal,
	closeAlbumImageModal,
	saveLikedImage,
	changeAlbumsCurrentlyVisibleImageIndex
} from '../actions';
import ListItem from '../components/common/ListItem';
import ImageViewer from 'react-native-image-zoom-viewer';

import SameHeader from '../components/common/SameHeader';

const PHONE_WIDTH = Dimensions.get('window').width;

class albumPhotoScreen extends Component {
	componentWillMount() {
		this.props.getAlbumImages(this.props.albumName, 27);
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

	onModalClose = () => {
		if(this._isMounted) {
			this.props.closeAlbumImageModal();
		}
	}
	onListItemPress = (index) => {
		if(this._isMounted) {
			this.props.openAlbumImageModal(index);
		}
	}
	_onEndReacched = () =>{
		if(this.props.has_next_page){
			if(this._isMounted) {
				this.props.getAlbumImages(this.props.albumName, 27);
			}
		}
	}
	_onRefresh = () => {
		if(this._isMounted) {
			this.props.albumPhotoScreenInitialState();
			this.props.getAlbumImages(this.props.albumName, 27);
		}
	}	

	onLikeButtonPress = (index, result, finalResult) => {
		if(this._isMounted) {
			this.props.saveLikedImage(result, finalResult);
			this.props.changeAlbumsCurrentlyVisibleImageIndex(index);
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
			<Container>
				<SameHeader title={this.props.albumName} backButton={true} />
					<View style={styles.gridView}>
						<FlatList
					        data={this.props.dataSource}
					        // extraData={this.state}
					        numColumns={3}
					        ListFooterComponent={this._listFooterComponent}
					        getItemLayout={(data, index) => (
	    						{length: PHONE_WIDTH/3.099, offset: (PHONE_WIDTH/3.099) * index, index}
	  						)}
	  						refreshing={this.props.refreshing}
	  						onRefresh={this._onRefresh}
	  						initialNumToRender={20}
	  						onEndReached={this._onEndReacched}
	  						onEndReachedThreshold={0.5}
					        keyExtractor={(item, index) => index }
					        style={styles.flatListStyle}
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
				          	/>
			          	</Modal>
					</View>
			</Container>
		);
	}

}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 5,
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
  listItems: {
  	justifyContent: 'space-around',
  	alignItems: 'flex-start',
  },
  imageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10
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


const mapStateToProps = ({albumPhotoReducer, albumPhotoImageReducer, favoriteReducer,globleReducer}) => {
	const { dataSource, images, has_next_page, albumName, refreshing } = albumPhotoReducer;
	const { modalVisible, currentlyVisibleImageIndex } = albumPhotoImageReducer;
	const { color } = globleReducer;
	const { likedPhotos } = favoriteReducer;

	return ({
		dataSource, 
		images, 
		has_next_page,
		albumName,
		refreshing,
		modalVisible, 
		currentlyVisibleImageIndex,
		color,
		likedPhotos
	});
}


export default connect(mapStateToProps, {
	getAlbumImages,
	albumPhotoScreenInitialState,
	openAlbumImageModal,
	changeAlbumsCurrentlyVisibleImageIndex,
	closeAlbumImageModal,
	saveLikedImage
})(albumPhotoScreen);
