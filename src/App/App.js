// Import modules 
import React from 'react';
import './App.css'
import {
  Switch,
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// Import React components
import Menu from '../sections/menu';
import Home from '../Home/Home';
import Build from '../Build/Build';
import Contact from '../Contact/Contact';
import Section from '../sections/section';
import Filter from '../Filter/Filter';
import { linkGen } from '../util/utils';

// Misc imports

class App extends React.Component {
  render() {
    return (
    <Router>

      {/* Menu */}
      <Section
        sectionId="nav-section"
        containerId="nav-container"
        overrides={{ container: { height: 'fit-content', padding: '1.5rem 0' } }}
      >
        <Menu menuItems={Object.keys(pages)}/>
      </Section>

      {/* Sections */}
      <Switch>
        {
         [
           ...pageRoutes,
           ...partRoutes
         ] 
        }
      </Switch>

    </Router>
    );
  }
}

const pages = {
  'Home': <Home />,
  'Build': <Build />,
  'Contact': <Contact />
}
const parts = [
  'CPU',
  'Mobo',
  'SSD',
  'RAM',
  'GPU',
  'PSU',
  'Case'
]

/**
 * =================== ROUTES ===================
 */
const pageRoutes = Object.entries(pages).map(([navText, ReactComponent], index) => {
  const navLink = linkGen(navText);
  const tag = navLink.slice(1) || 'home';
  return (
    <Route
      key={index}
      path={navLink}
      exact
      component={() => (
        <Section sectionId={tag + '-section'} containerId={tag + '-container'}>
          {ReactComponent}
        </Section>
      )}
    />
  )
});

const partRoutes = parts.map((part, index) => {
  const navLink = '/filter' + linkGen(part);
  const tag = linkGen(part).slice(1)
  return (
    <Route
      key={index + Object.keys(pages).length}
      path={navLink}
      exact
      component={() => (
        <Section sectionId={tag + '-section'} containerId={tag + '-container'}>
          <Filter part={part} />
        </Section>
      )}
    />
  )
});


export default App;
