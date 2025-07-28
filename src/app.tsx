import { LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import { Home } from './components/Home/Home'; 
import { UnderConstruction } from './components/UnderConstruction/UnderConstruction';
import { Links } from './components/Links/Links';
import { Navigator } from './components/Navigator/Navigator';
import { Ruins } from './components/Ruins/Ruins';

import './app.css'

export function App() {
  return (
     <LocationProvider>
      <Navigator />
        <ErrorBoundary>
          <Router>
            <Route path='/ft/' component={Home} />
            <Route path='/ft/ruins' component={Ruins} />
            <Route path='/ft/under-construction' component={UnderConstruction} />
            <Route path='/ft/links' component={Links} />
          </Router>
        </ErrorBoundary>
      </LocationProvider> 
  )
}