import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  isDarkMode: false,
  addVideo: () => {},
  changeTheme: () => {},
})

export default SavedVideosContext
