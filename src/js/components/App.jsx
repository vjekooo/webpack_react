
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import Hello from './Hello'

class App extends Component {
	render () {
		return (
			<Hello />
		)
	}
}

export default hot(module)(App)
