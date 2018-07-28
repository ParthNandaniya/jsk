import React, { Component } from 'react';
import { 
	View,
	Text,
	Image, 
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Modal,
	Dimensions,
	AsyncStorage
} from 'react-native';
import {
	Container,
	Content,
	Icon,
	Spinner,
	Button
} from 'native-base';
import { connect } from 'react-redux';
import {
	openFavoriteImageModal,
	changeFavoritesCurrentlyVisibleImageIndex,
	closeFavoriteImageModal,
	saveLikedImage
} from '../actions';
import ListItem from '../components/common/ListItem';
import ImageViewer from 'react-native-image-zoom-viewer';

import SameHeader from '../components/common/SameHeader';

const PHONE_WIDTH = Dimensions.get('window').width;

class favoriteScreen extends Component {
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
	            	source={{ uri: item.url }}
	                style={styles.imageStyle}
	              />
			</ListItem>
		)
	}
	onModalClose = () => {
		if(this._isMounted) {
			this.props.closeFavoriteImageModal();
		}
	}
	onListItemPress = (index) => {
		if(this._isMounted) {
			this.props.openFavoriteImageModal(index);
		}
	}
	onLikeButtonPress = (index, result, finalResult) => {
		if(this._isMounted) {
			this.props.saveLikedImage(result, finalResult);
			this.props.changeFavoritesCurrentlyVisibleImageIndex(index);
		}
	}
	_renderFooter = (index) => {
		let result = _.find(this.props.likedPhotos, (e) => {
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
	_listEmptyComponent = () => {
		return (
			<View style={styles.emptyViewStyle} >
				<Text style={styles.emptyTextStyle} > click on </Text>
				<View> 
					<Icon 
	        			type="Ionicons" 
	        			name='ios-heart-outline'
	        			size={24}
	        			style={{color: this.props.color}}
	        		/>
	        	</View>
	        	<Text style={styles.emptyTextStyle} > to add favorite </Text>
			</View>
		);
	}

	render() {
		return (
			<Container>
				<SameHeader title='FAVORITE' settingButton={true} />
				<View style={styles.gridView}>
						<FlatList
					        data={this.props.likedPhotos}
					        // extraData={this.state}
					        numColumns={3}
					        ListEmptyComponent={this._listEmptyComponent}
					        // ListFooterComponent={this._listFooterComponent}
					        getItemLayout={(data, index) => (
	    						{length: PHONE_WIDTH/3.099, offset: (PHONE_WIDTH/3.099) * index, index}
	  						)}
	  						// refreshing={this.props.refreshing}
	  						// onRefresh={this._onRefresh}
	  						initialNumToRender={20}
	  						// onEndReached={this._onEndReacched}
	  						// onEndReachedThreshold={0.5}
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
				          		imageUrls={this.props.likedPhotos} 
				          		index={this.props.currentlyVisibleImageIndex} 
				          		// onClick={() => console.log('image presssed!!!')}
				          		// onShowModal={() => console.log('on Show Modal activated!!!')}
				          		onCancel={this.onModalClose}
				          		flipThreshold={1}
				          		failImageSource={() => <Text style={styles.failImageSourceStyle}> image can't load </Text>}
				          		onSwipeDown={this.onModalClose}
				          		// renderArrowLeft={() => <Text> go back </Text>}
				          		// renderArrowRight={() => console.log('arow right Pressed!!!')}
				          		backgroundColor={'#161616'}
				          		maxOverflow={this.props.likedPhotos.length}
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
  emptyViewStyle: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	marginTop: 200,
  },
  emptyTextStyle: {
  	fontSize: 18,
  	fontWeight: '200',
  	fontStyle: 'italic',
  	color: '#70697a'
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

const mapStateToProps = ({ globleReducer, favoriteReducer, favoriteImageReducer }) => {
	const { color } = globleReducer;
	const { likedPhotos } = favoriteReducer;
	const { modalVisible, currentlyVisibleImageIndex } = favoriteImageReducer;

	return ({ 
		color,
		likedPhotos,
		modalVisible,
		currentlyVisibleImageIndex
	});
};

export default connect(mapStateToProps, {
	openFavoriteImageModal,
	changeFavoritesCurrentlyVisibleImageIndex,
	closeFavoriteImageModal,
	saveLikedImage
})(favoriteScreen);
