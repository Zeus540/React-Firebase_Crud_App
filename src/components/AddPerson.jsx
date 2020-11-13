import React, { useState, useEffect } from "react";
import AddPersonForm from "./AddPersonForm";
import firebaseDb from "../firebase";

const AddPerson = () => {

  var [RelatedPersonObjects,setRelatedPersonObjects] = useState({})
  var [CurrentId,setCurrentId] = useState('')

  useEffect(()=>{
   firebaseDb.child('RelatedPersons').on('value',snapshot=>{
     if (snapshot.val()!=null)
     setRelatedPersonObjects({
         ...snapshot.val()
     })
     else
     setRelatedPersonObjects({
      ...snapshot.val()
  })

   })
  },[])
  
  const addOrEdit = obj=>{
    if(CurrentId === '')
    firebaseDb.child('RelatedPersons').push(
    obj,
    err =>{
      if (err)
      console.log(err)
      else
      setCurrentId('')
      
      }
    )
    else
    firebaseDb.child(`RelatedPersons/${CurrentId}`).set(
      obj,
      err =>{
        if (err)
        console.log(err)
        else
            setCurrentId('')
        }
      )
  }
  
  const onDelete = key=> {
    if (window.confirm('Are You Sure')) {
      firebaseDb.child(`RelatedPersons/${key}`).remove(
        err =>{
          if (err)
              console.log(err)
          else
              setCurrentId('')
          }
        )
    }
  }

  return(
    
    <div className="AddPerson">
      <AddPersonForm {...({addOrEdit,CurrentId,RelatedPersonObjects})}/>
      
       <div>
   
   {
    
     Object.keys(RelatedPersonObjects).map(id=>{
       return <div key={id}>
         
         <div className="Card"> 
          <h1> 
            {RelatedPersonObjects[id].FirstName} {RelatedPersonObjects[id].LastName}
          </h1>
          <br/>
            {RelatedPersonObjects[id].Relationship}
          <br/>

          <div className="Flex">

          <button 
          type="button" 
          onClick={()=>{setCurrentId(id)}} 
          className="Green">
          Edit</button>
          
          <button 
          type="button" 
          onClick={()=>{onDelete(id)}} 
          className="Green">
          Delete</button>

          </div>

          </div>
        
       </div>   
     })
    
   }

</div>
    </div>
    
   );
}

export default AddPerson;