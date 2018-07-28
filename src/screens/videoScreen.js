import React, { Component } from 'react';
import {
	Container,
	Content,
	Text,
	Icon,
	List,
	ListItem,
	Left,
	Right
} from 'native-base';
import {
	View,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
	storeVideoGroupName,
	saveVideoFolderName,
	removePrevFolderName
} from '../actions';

import SameHeader from '../components/common/SameHeader';

class videoScreen extends Component {
	// static navigationOptions = ({ navigation }) => ({
	// 	tabBarLabel: 'VIDEOS'
	// })
	componentWillMount() {
		this.props.storeVideoGroupName();
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

	listVideoFolderName = () => {
		return this.props.videoGroupName.map((item, index) => {
			return (
				<View
					key={index}
				>
					<ListItem
						button={true}
						onPress={() => this.onListItemPress(item.name)}
					>
		            	<Left>
		                	<Text> { item.name } </Text>
		              	</Left>
		              	<Right>
		                	<Icon name="arrow-forward" />
		              	</Right>
		            </ListItem>
		        </View>
			);
		});
	}
	onListItemPress = (folderName) => {
		if(this._isMounted) {
			this.props.removePrevFolderName();
			this.props.saveVideoFolderName(folderName);
		}
		this.props.navigation.navigate('videoGrid');
	}

	render() {
		return (
			<Container>
				<SameHeader title='VIDEOS' settingButton={true} />
				<Content style={{marginTop: 20}}>
					<List>
						{this.listVideoFolderName()}
					</List>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ videoReducer }) => {
	const { videoGroupName } = videoReducer;

	return ({ videoGroupName });
}

export default connect(mapStateToProps, {
	storeVideoGroupName,
	saveVideoFolderName,
	removePrevFolderName
})(videoScreen);
