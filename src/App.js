import React from 'react';
import MainContainer from './containers/MainContainer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './redux/reducer'


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <MainContainer />
      </Provider>
    )
  }
}

export default App;
