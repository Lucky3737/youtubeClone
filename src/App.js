import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import HomeVideoDetails from './components/HomeVideoDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

import SavedVideosContext from './context/SavedVideoContext'

// Replace your code here
class App extends Component {
  state = {savedVideosList: [], isDarkMode: false}

  addVideo = video => {
    this.setState(PreState => ({
      savedVideosList: [...PreState.savedVideosList, video],
    }))
    console.log(video)
  }

  changeTheme = () => {
    this.setState(PreState => ({isDarkMode: !PreState.isDarkMode}))
  }

  render() {
    const {savedVideosList, isDarkMode} = this.state

    return (
      <SavedVideosContext.Provider
        value={{
          savedVideosList,
          isDarkMode,
          addVideo: this.addVideo,
          changeTheme: this.changeTheme,
        }}
      >
        <>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={HomeVideoDetails}
            />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route component={NotFound} />
          </Switch>
        </>
      </SavedVideosContext.Provider>
    )
  }
}
export default App
