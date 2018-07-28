import React, { Component } from 'react';
import {
	Container
} from 'native-base';

import SameHeader from '../components/common/SameHeader';
import AlbumScreenWithGrid from '../components/AlbumScreenWithGrid';

class albumScreen extends Component {

	render() {
		return (
			<Container>
				<SameHeader title='ALBUMS' settingButton={true} />
				<AlbumScreenWithGrid navigation={this.props.navigation} />
			</Container>
		);
	}
}

export default albumScreen;
