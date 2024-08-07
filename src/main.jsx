import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import SVTech from './app/SVTech.jsx'
import { Provider } from 'react-redux'
import { createStore } from './redux/create-store'

const root = ReactDOM.createRoot(document.getElementById('root'))

const initialState = window.___INITIAL_STATE__
const store = createStore({ initialState })

root.render(
  <Provider store={store}>
    <SVTech />
  </Provider>,
)