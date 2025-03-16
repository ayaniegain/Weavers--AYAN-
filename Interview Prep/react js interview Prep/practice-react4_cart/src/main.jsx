import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import FetchAllProductContext from './context/FetchAllProductContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider  store={store}>

  <FetchAllProductContext>
    <App />
  </FetchAllProductContext>
  </Provider>
  </BrowserRouter>
)
