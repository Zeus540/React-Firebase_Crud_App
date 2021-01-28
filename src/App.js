import './scss/App.scss';
import React from "react";
import 'antd/dist/antd.css';
import Contacts from './components/Contacts.jsx'

function App() {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <Contacts/>
      </div>
    </div>
  );
}


export default App;
