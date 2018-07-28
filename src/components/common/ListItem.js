import React, { PureComponent } from 'react';
import { 
	View,
	StyleSheet,
	Dimensions,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

const PHONE_WIDTH = Dimensions.get('window').width;

class ListItem extends PureComponent {
  render() {
		const { index, onImagePress } = this.props;

		return (
          <TouchableOpacity
            onPress={onImagePress}
          > 
      			<View 
              key={index} 
              style={[styles.itemContainer, 
                {
                  backgroundColor: this.props.color,
                  width: (this.props.style) ? (this.props.style.width) : (PHONE_WIDTH/3.099), 
                  height: (this.props.style) ? (this.props.style.height) : (PHONE_WIDTH/3.099)
                }
              ]} 
            >
              {this.props.children}
      		  </View>
          </TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 2,
    flex: 1,
    borderRadius: 10,
  }
});

const mapStateToProps = ({ globleReducer }) => {
  const { color } = globleReducer;

  return ({ color });
};

export default connect(mapStateToProps)(ListItem);
