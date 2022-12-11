import React from 'react'

import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import Toast from './components/ToastNotification'

import App from './App'
import './index.css'
import theme from './theme'
import { UserProvider } from './utils/IdMemberHashContext/user.context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <App />
        <Toast />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
)
