import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createStore } from 'redux'
import voteReducer from './reducers/voteReducer.js'
import { Provider } from 'react-redux'

const store = createStore(voteReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
