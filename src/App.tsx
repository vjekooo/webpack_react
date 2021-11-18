import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle, DomainTheme } from 'styled-components'
import { hot } from 'react-hot-loader/root'
import { Header } from 'components/Header'
import { Hello, World } from './routes'

const GlobalStyle = createGlobalStyle`	
	* {
		box-sizing: border-box;
	}
	body {
		background-color: #F7F7F7;
		margin: 0;
	}
`

const theme: DomainTheme = {
	background: 'white',
	font: 'Avenir'
}

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: 600px;
	padding: 0 10px;
	font-family: ${({ theme }): string => theme.font};
	background-color: ${({ theme }): string => theme.background};
`

const App: React.FC = (): JSX.Element => (
	<ThemeProvider theme={theme}>
		<Wrapper>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Hello />} />
					<Route path="/world" element={<World />} />
					<Route element={<div>404</div>} />
				</Routes>
			</BrowserRouter>
		</Wrapper>
		<GlobalStyle />
	</ThemeProvider>
)

export default hot(App)
