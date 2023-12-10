import React from 'react'

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {},
  userName: '',
  setUserName: (userName: string) => {}
})