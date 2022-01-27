import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'

import Navigation from './Navigation'

const app = () =>{
    
    return (
      <Provider store={store}>
          <Navigation />
      </Provider>
    )
}

export default app
