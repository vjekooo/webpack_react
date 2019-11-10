
import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Hello } from './routes/Hello'
import { World } from './routes/World'

import { hot } from 'react-hot-loader/root'

const App: React.FC = (): ReactElement => (
	<Router>
		<Header />
		<Switch>
			<Route exact path="/" component={Hello} />
			<Route exact path="/world" component={World} />
			<Route component={(): ReactElement => <div>404</div>} />
		</Switch>
	</Router>
)

export default hot(App)
