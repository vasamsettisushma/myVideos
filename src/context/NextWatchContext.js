import React from 'react'

const NextWatchContext = React.createContext({
  activeRoute: '',
  updateActiveRoute: () => {},
  savedVideosList: [],
  updateSavedList: () => {},
  likedList: [],
  updateLikedList: () => {},
  disLikedList: [],
  updateDislikedList: () => {},
  isDarkMode: false,
  updateIsDarkMode: () => {},
})

export default NextWatchContext
