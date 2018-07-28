import React, { Component } from 'react';
import AppNavigation from './src/navigation';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return(
    	<AppNavigation screenProps={{color: this.props.color}} />
    );
  }
}

const mapStateToProps = ({ globleReducer }) => {
	const { color } = globleReducer;

	return ({ color });
};

export default connect(mapStateToProps)(App);
