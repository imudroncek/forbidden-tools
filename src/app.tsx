import { LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import { UnderConstruction } from './components/UnderConstruction/UnderConstruction';
import { Links } from './components/Links/Links';
import { Navigator } from './components/Navigator/Navigator';

import './app.css'

export function App() {
  return (
     <LocationProvider>
      <Navigator />
        <ErrorBoundary>
          <Router>
            <Route path="/" component={UnderConstruction} />
            <Route path='/links' component={Links} />
          </Router>
        </ErrorBoundary>
      </LocationProvider> 
  )
}