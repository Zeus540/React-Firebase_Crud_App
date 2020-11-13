import React, { useState } from "react";
import Overlay from './Overlay';
import List from "./List";

export default function Model() {

  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);

  return (
    <div className="ModelHolder" >
        
        
        {isToggled && <Overlay/>}
        <div className="Model">
        <List/>
        <p>You haven’t added any related persons</p>
        <button type="button" onClick={toggleTrueFalse} className="Green">
          Add related person
        </button>
        </div>
       
      </div>
  )
}



