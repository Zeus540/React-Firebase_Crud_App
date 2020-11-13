import React, { Component  } from 'react'
import Overlay from './Overlay';
import List from "./List";

export default class Model extends Component {
  
  state = {
    on: false,
  }

  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  } 


  render() {
    
    return (
      <div className="ModelHolder" >
        
        
          <div className="Model MT-25">
              <List/>
          <p>You haven’t added any related persons</p>
          {this.state.on && <Overlay/> }
          <button type="button" onClick={this.toggle} className="Green">Add person</button>
        </div>
       
      </div>
    )
  }
}

  


