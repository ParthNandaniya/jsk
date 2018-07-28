import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	FlatList,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
	saveAlbumName,
	getAlbumList,
  albumScreenInitialState,
  removePrevAlbumName
} from '../actions';

import ListItem from './common/ListItem';

const PHONE_WIDTH = Dimensions.get('window').width;

class AlbumScreenWithGrid extends Component {
	componentWillMount() {
		this.props.getAlbumList();
	}
  componentDidMount() {
    this._isMounted = true;
  }
	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps);
	// }
  componentWillUnmount() {
    this._isMounted = false;
  }

	_renderItem = (flatListData) => {
		const { index, item } = flatListData;
		return (
			<ListItem
				index={index}
				onImagePress={() => this.onListItemPress(item.name)}
				style={{width: (PHONE_WIDTH/2.099), height: (PHONE_WIDTH/2.099)}}
			>
				<Image
            source={{ uri: item.cover }}
            style={styles.imageStyle}
          />
          <View style={styles.footerStyle}>
            <Text style={styles.nameStyle} > {(item.name.length) < 17 ? (item.name) : ((item.name).substr(0, 17) + '...')} </Text>
            <Text style={styles.countStyle} > {item.count} </Text>
          </View>
			</ListItem>
		);
	}
  _onRefresh = () => {
    if(this._isMounted) {
      this.props.albumScreenInitialState();
      this.props.getAlbumList();
    }
  }

	onListItemPress = (name) => {
    if(this._isMounted) {
      this.props.removePrevAlbumName();
      this.props.saveAlbumName(name);
    }
		this.props.navigation.navigate('albumPhoto');
	}
	render() {
		return (
			<View style={styles.gridView}>
					<FlatList
				        data={this.props.albumList}
				        style={styles.flatListStyle}
				        numColumns={2}
				        getItemLayout={(data, index) => (
    						  {length: PHONE_WIDTH/2.099, offset: (PHONE_WIDTH/2.099) * index, index}
  						  )}
                refreshing={this.props.refreshing}
                onRefresh={this._onRefresh}
  						// onEndReached={({ distanceFromEnd }) => {
  						// 	console.log(distanceFromEnd);
  						// 	if(distanceFromEnd) {
  						// 		this.loadMore();
  						// 	}
  						// }}
  						// onEndReached={this.loadMore}
  						// onEndReachedThreshold={0.5}
				        keyExtractor={(item, index) => index }
				        renderItem={this._renderItem}
					/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  gridView: {
    paddingLeft: 5,
    flex: 1,
  },
  flatListStyle: {
  	flex: 1,
  	marginVertical: 20,
  },
  imageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10
  },
  footerStyle : {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    top: (PHONE_WIDTH/2.099)-40,
    bottom: 0,
    left: 0,
    right: 0,
    width: PHONE_WIDTH/2.099,
    height: 40,
    backgroundColor: '#000000',
    opacity: 0.6,
    borderRadius: 10
  },
  nameStyle: {
  	color: 'white',
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 3,
  },
  countStyle: {
  	color: 'white',
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 3,
  }
});

const mapStateToProps = ({ albumReducer, albumPhotoReducer }) => {
	const { albumList, refreshing } = albumReducer;

	return ({ albumList, refreshing });
}

export default connect(mapStateToProps, {
	getAlbumList,
  albumScreenInitialState,
	saveAlbumName,
  removePrevAlbumName
})(AlbumScreenWithGrid);
