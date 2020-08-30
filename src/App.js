import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import MainPage from './components/pages/main/MainPage';
import ListenPage from './components/pages/listen/ListenPage';
import MusicPage from './components/pages/music/MusicPage';
import PlayListPage from './components/pages/playlist/PlayListPage';
import ProfilePage from './components/pages/profile/ProfilePage';

function App() {
  return (
    <Router>
      <>
        <Navigation />
      </>
      <>
        <Link to="/main">MainPage</Link>
        <Link to="/listen">ListenPage</Link>
        <Link to="/music">MusicPage</Link>
        <Link to="/playlist">PlayListPage</Link>
        <Link to="/profile">ProfilePage</Link>
      </>
      <Switch>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/listen">
          <ListenPage />
        </Route>
        <Route path="/music">
          <MusicPage />
        </Route>
        <Route path="/playlist">
          <PlayListPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
