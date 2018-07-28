import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import SameHeader from '../components/common/SameHeader';
import { TriangleColorPicker, fromHsv  } from 'react-native-color-picker';
import {
	colorChange,
	saveOldColor
} from '../actions';

class settingScreen extends Component {
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this.saveToAsync(this.props.color);
		this._isMounted = false;
	}
	
	saveToAsync = async (color) => {
		await AsyncStorage.setItem('color', color);
	}
	_onColorChange = ({ h, s, v }) => {
		if(this._isMounted) {
			this.props.colorChange(fromHsv({h: h, s: s, v: v}));
		}
	}
	_onColorSelected = (color) => {
		if(this._isMounted) {
			this.props.colorChange(color);
	    	this.props.saveOldColor(this.props.color);
		}
		this.props.navigation.navigate(this.props.navigation.state.params.routeName);
	}
	_onOldColorSelected = (color) => {
		if(this._isMounted) {
			this.props.colorChange(color);
		}
    	this.props.navigation.navigate(this.props.navigation.state.params.routeName);
	}

	render() {
		return (
			<View style={{flex: 1}} >
				<SameHeader title='SETTINGS' backButton={true} />
				<TriangleColorPicker
				    onColorSelected={(color) => this._onColorSelected(color)}
				    style={{flex: 3}}
				    color={this.props.color}
				    defaultColor={this.props.defaultColor}
				    oldColor={this.props.oldColor}
				    onColorChange={(color) => this._onColorChange(color)}
				    onOldColorSelected={(color) => this._onOldColorSelected(color)}
				/>
				<View style={styles.aboutApp}>
					<View style={styles.viewComponent} >
						<Text style={[styles.textHeaderStyle, {color: this.props.color}]} > design and develop by </Text>
						<Text style={styles.textStyle} > Parth Nandaniya Aka DarePirat </Text>
					</View>
					<View style={styles.viewComponent} >
						<Text style={[styles.textHeaderStyle, {color: this.props.color}]} > contact </Text>
						<Text style={styles.textStyle} > twitter.com/Parth_Nandaniya </Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	aboutApp: {
		flex: 1,
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	viewComponent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	textHeaderStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
	textStyle: {
		fontSize: 18,
		fontWeight: '200',
		fontStyle: 'italic',
		color: '#70697a',
	}
})

const mapStateToProps = ({ globleReducer }) => {
	const { color, defaultColor, oldColor } = globleReducer;

	return ({ color, defaultColor, oldColor });
};

export default connect(mapStateToProps, {
	colorChange,
	saveOldColor
})(settingScreen);
