import React from "react";
import Model from "./Model.jsx";

function Form() {
 

    return (
      
        <div action="" className="Form">
          <div className="Form">
          <label htmlFor="Name" className="MT-25 MB-10">Name</label>
          <input name="Name" type="text"/>
          <label htmlFor="LastName" className="MT-25 MB-10">LastName</label>
          <input name="LastName" type="text"/>
          <label htmlFor="PostalCode" className="MT-25 MB-10">Postal Code</label>
          <input className="Width-100" name="PostalCode" type="text"/>
          <label htmlFor="Country" className="MT-25 MB-10">Country</label>
          <input name="Country" type="text" className="MB-25"/>
          <h2 className="MB-25">Related persons</h2>
            <div className="Form-Group">
              <input className="checkbox" type="checkbox" name="s" id=""/>
              <label htmlFor="s">I don't have related persons</label>
              
            </div>
          <Model/>
          </div>
        </div>
     
    );
  }
  
export default Form;