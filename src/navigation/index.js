import React from 'react';
import { 
	createBottomTabNavigator,
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation';
import { Icon } from 'native-base';

// SCREENS
import recentScreen from '../screens/recentScreen';
import albumScreen from '../screens/albumScreen';
import albumPhotoScreen from '../screens/albumPhotoScreen';
import favoriteScreen from '../screens/favoriteScreen';
import videoScreen from '../screens/videoScreen';
import videoGridScreen from '../screens/videoGridScreen';
import videoPlayScreen from '../screens/videoPlayScreen';
import settingScreen from '../screens/settingScreen';

const videoStackScreen = createStackNavigator({
	video: { screen: videoScreen },
	videoGrid: { screen: videoGridScreen },
	videoPlay: { screen: videoPlayScreen }
}, {
	headerMode: 'none',
});

videoStackScreen.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
};

const mainStack = createBottomTabNavigator({
	recent: {
		screen: recentScreen,
	},
	albumStack: createStackNavigator({
		album: { screen: albumScreen },
		albumPhoto: { screen: albumPhotoScreen },
	}, {
		headerMode: 'none',
	}),
	favorite: {
		screen: favoriteScreen,
	},
	videoStack: videoStackScreen,
}, {
	initialRouteName: 'recent',
	navigationOptions: ({ navigation, screenProps }) => ({
		tabBarOptions: {
	      activeTintColor: screenProps.color,
	      inactiveTintColor: 'grey',
	      showIcon: true,
	      showLabel: false,
	      style: {
	        backgroundColor: 'transparent',
	        borderTopWidth: 0,
	        shadowOffset: { width: 5, height: 3 },
	        shadowColor: 'black',
	        shadowOpacity: 0.5,
	        elevation: 5, 
	        height: 55
	      }
	    },
    	tabBarIcon: ({ focused, tintColor }) => {
	        const { routeName } = navigation.state;
	        let iconName;
	        if (routeName === 'recent') {
	          iconName = `ios-clock${focused ? '' : '-outline'}`;
	        } else if (routeName === 'albumStack') {
	        	iconName = `ios-images${focused ? '' : '-outline'}`;
	        } else if (routeName === 'favorite') {
	        	iconName = `ios-heart${focused ? '' : '-outline'}`;
	        } else {
	        	iconName = `ios-videocam${focused ? '' : '-outline'}`;
	        }

        	return (
        		<Icon 
        			type="Ionicons" 
        			name={iconName} 
        			size={24}
        			style={{color: tintColor}}
        		/>
        	);
    	},
	}),
	animationEnabled: true,
	swipeEnabled: true,
  	gesturesEnabled:false,
    lazyload: true
});

const AppNavigation = createSwitchNavigator({
	main: mainStack,
	settings: { screen: settingScreen }
}, {
	initialRouteName: 'main',
});

export default AppNavigation;
