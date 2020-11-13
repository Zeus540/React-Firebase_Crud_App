import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase";


const AddPersonForm = (props) => {
  const initialFieldValues={
    Relationship:'',
    FirstName:'',
    LastName:'',
    Sex:'',
    Nationalities:'',

  }

  var [RelatedPersonObjects,setRelatedPersonObjects] = useState({})
  var [values,setValues] = useState(initialFieldValues)


  useEffect(()=>{
    if(props.CurrentId==='')
      setValues({
          ...initialFieldValues
      })
    else
      setValues({
        ...props.RelatedPersonObjects[props.CurrentId]
      })
  }, [props.CurrentId,props.RelatedPersonObjects])

  useEffect(()=>{
   firebaseDb.child('RelatedPersons').on('value',snapshot=>{
     if (snapshot.val()!=null)
     setRelatedPersonObjects({
         ...snapshot.val()
     })
   })
  },[])

  

  const handleInputChange = e => {
    var {name,value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleFormSubmit = e =>{
    e.preventDefault();
    props.addOrEdit(values)
  }

  return(
    <div>
    <form autoComplete="off" className="AddPersonForm" >
    <h1 className="MT-25">Add a related person</h1>
        <label htmlFor="Relationship" className="MT-25">Relationship</label>
          <input name="Relationship" type="text" 
          value={values.Relationship}
          onChange={handleInputChange}/>

          <label htmlFor="FirstName" className="MT-25">First name</label>
          <input name="FirstName" type="text" 
          value={values.FirstName}
          onChange={handleInputChange}/>


          <label htmlFor="LastName" className="MT-25">Last Name</label>
          <input className="Width-100" name="LastName" type="text"  
          value={values.LastName}
          onChange={handleInputChange}/>


          <label htmlFor="Sex" className="MT-25">Sex</label>
          <select className="Width-100" name="Sex" type="text"  
          value={values.Sex}
          onChange={handleInputChange}>
            <option>Female</option>
            <option>Male</option>
          </select>

          <label htmlFor="Nationalities" className="MT-25">Nationalities</label>
          <input className="Width-100" name="Nationalities" type="text"  
          value={values.Nationalities}
          onChange={handleInputChange}/>
          
          <div className="bottomGroup">
            <div className="bottom">
              <p>Clear</p>
              <input type="submit" className="Green" onClick={handleFormSubmit} value={props.CurrentId==''?"Add related person" : "Update"}></input>
            </div>
          </div>
    </form>
    </div>
   );
}

export default AddPersonForm;