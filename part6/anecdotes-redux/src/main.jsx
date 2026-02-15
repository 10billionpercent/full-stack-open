import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import { Provider } from 'react-redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
