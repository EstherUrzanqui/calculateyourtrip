import React from 'react';
import './App.css';
import Map from './components/Map';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return(
      <div style={{minHeight: "100vh", position:"relative"}}>
        <BrowserRouter>
          <Routes>
            <Route path='/calculateyourtrip' Component={Map} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
