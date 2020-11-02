import React, { Component } from 'react';
import Template from './views/Template';
import { Provider } from "react-redux";
import store from './redux/store'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Template />
      </Provider>
    );
  }
}

export default App;
