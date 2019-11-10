
import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Hello } from './routes/Hello'
import { World } from './routes/World'

const App: React.FC = (): ReactElemen => (
	<Router>
		<Header />
		<Layout>
			<Switch>
				<Route exact path="/" component={Hello} />
				<Route path="/world" component={World} />
				<Route component={(): ReactElement => <div>404</div>} />
			</Switch>
		</Layout>
	</Router>
)

export default App
