import React, { useState, useEffect } from "react";
import AddPersonForm from "./AddPersonForm";
import Icon from '@material-ui/core/Icon';
import firebaseDb from "../firebase";
import ListSidebar from "./ListSidebar";
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
      
      <div className="AddPersonHolder">
        
      <AddPersonForm {...({addOrEdit,CurrentId,RelatedPersonObjects})}/>
      
       
    </div>
    
    </div>
    
   );
}

export default AddPerson;

