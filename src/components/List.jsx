import React, { useState, useEffect, Fragment } from "react";
import Overlay from './Overlay';
import firebaseDb from "../firebase";
import Icon from '@material-ui/core/Icon';




export default function List(props) {

  
    var [RelatedPersonObjects,setRelatedPersonObjects] = useState({})
    var [CurrentId,setCurrentId] = useState('')
    
    const [isToggled, setToggled] =  useState(false);
    const toggleTrueFalse = () => setToggled(!isToggled);

    const [isToggles, setToggles] = useState(false);
    const toggles = () => setToggles(!isToggles);
  
    
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

//////////////Add Or Edit Record//////////////////

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

/////////////////////End///////////////////////////

//////////////Delete Record///////////////////////

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

/////////////////////End///////////////////////////

 
  return (
   
    <Fragment>
      
    <div className="List" >
      <div>
   {
    
     Object.keys(RelatedPersonObjects).map(id=>{
       
       return <div className="Mobile" key={id}>
         
         <div className="Card"> <p className='Name'> {RelatedPersonObjects[id].FirstName} {RelatedPersonObjects[id].LastName}</p>
         
         <p className='Relatioship'> {RelatedPersonObjects[id].Relationship}</p>
        
         <div className="Flex"  >

         <button 
          type="button" 
          onClick={()=>setCurrentId(id)} 
          className="Green Edit">
          Edit</button>
          
          <button 
          onClick={toggles}
          className="Dlt">
          <Icon>keyboard_arrow_down</Icon>
          </button>
          {isToggles &&  <button 
          type="button" 
          onClick={()=>{onDelete(id)}} 
          className="D">
          <Icon>delete</Icon>  
          Delete</button> }
     
         
         </div>

         
         
         </div>
         
        
       </div>
       
      
       
       
     })
    
   }

</div>
<div className="ModelCard">
     
      {isToggled && <Overlay/>}
        <p>You haven’t added any related persons</p>
        <div className="Flex Green  "
        onClick={toggleTrueFalse}>
        <Icon className="icon">add_circle</Icon>
          <button type="button"  className=" Unset Green">
          Add person
          </button>
          </div>

  </div>
  </div>

  

</Fragment>
  )
}

