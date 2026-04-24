import { LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import { Home } from './components/Home/Home'; 
import { UnderConstruction } from './components/UnderConstruction/UnderConstruction';
import { Links } from './components/Links/Links';
import { Navigator, NavigatorSize } from './components/Navigator/Navigator';
import { Ruins } from './components/Ruins/Ruins';
import { Background } from './components/Background/Background';

import './app.css'
import { NavigatorContext } from './components/Navigator/Context/NavigatorContext';
import { createRef } from 'preact';

const smallRef = createRef<Navigator>();
const largeRef = createRef<Navigator>();

export function App() {
	return (
		<div class={"app"}>
			<LocationProvider>
				<Navigator size={NavigatorSize.SMALL} ref={smallRef} />
				<Navigator size={NavigatorSize.LARGE} ref={largeRef} />
				<NavigatorContext.Provider value={{small: smallRef, large: largeRef}}>
					<ErrorBoundary>
					<Router>
						<Route path='/ft/' component={Home} />
						<Route path='/ft/ruins' component={Ruins} />
						<Route path='/ft/under-construction' component={UnderConstruction} />
						<Route path='/ft/links' component={Links} />
						<Route path='/ft/background' component={Background} />
					</Router>
					</ErrorBoundary>
				</NavigatorContext.Provider>
			</LocationProvider> 
			<Background />
		</div>
	)
}