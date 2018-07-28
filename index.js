import App from './App';
import React, { Component } from 'react';
import AppNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import { View, StatusBar, YellowBox, AppRegistry } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class Index extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return(
      <Provider store={store}>
		<App />
      </Provider>
    );
  }
};

AppRegistry.registerComponent('jsk', () => Index);
