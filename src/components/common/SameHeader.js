import React, { Component } from 'react';
import {
  View,
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';
import {
	Header,
	Text,
	Icon,
	Button,
} from 'native-base';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { saveOldColor } from '../../actions';

class SameHeader extends Component {
	componentWillMount() {
		StatusBar.setBackgroundColor(this.props.color, true);
	}
	componentDidMount() {
		this._isMounted = true;
		StatusBar.setBackgroundColor(this.props.color, true);
	}
	componentWillReceiveProps() {
		StatusBar.setBackgroundColor(this.props.color, false);		
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	_backButton = () => {
		const { backButton, navigation } = this.props;
		if(backButton) {
			if(navigation.state.params) {
				return (
					<Button 
						transparent 
						style={styles.headerIcon}
						onPress={() => {
							if(this._isMounted) {
								this.props.saveOldColor(this.props.color)
							};
							this.props.navigation.navigate(navigation.state.params.routeName);
						}}
					>
	              		<Icon name='arrow-back' />
	            	</Button>
				);	
			}
			return (
				<Button 
					transparent 
					style={styles.headerIcon}
					onPress={() => this.props.navigation.goBack()}
				>
              		<Icon name='arrow-back' />
            	</Button>
			);
		}
	}
	_settingButton = () => {
		if(this.props.settingButton) {
			const { routeName } = this.props.navigation.state;
			return (
				<Button 
					transparent 
					style={styles.settingIcon}
					onPress={() => this.props.navigation.navigate('settings', {routeName})}
				>
		      		<Icon name='settings' />
		        </Button>
			);
		}
	}
  render() {
    return (
    	<View>
			<Header style={{backgroundColor: this.props.color, height: 70}}>
					{this._backButton()}
					<Text style={[styles.headerTitle, { marginLeft: (this.props.backButton) ? 40 : 10 }]}>
						{ this.props.title }
					</Text>
					{this._settingButton()}
			</Header>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
	headerIcon: {
		position: 'absolute', 
		left: 5,
	},
	settingIcon: {
		position: 'absolute',
		right: 3
	},
	headerTitle:{
		color: 'white',
		position: 'absolute',
		fontFamily: 'ARDESTINE',
		fontSize: 19,
		fontWeight: 'bold',
		top: 20,
		left: 20,
	}
})

const mapStateToProps = ({ globleReducer }) => {
	const { color } = globleReducer;

	return ({ color });
};

export default connect(mapStateToProps, {
	saveOldColor
})(withNavigation(SameHeader));
