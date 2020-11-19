import React, { useState, useEffect, Fragment } from "react";
import Overlay from './Overlay';
import firebaseDb from "../firebase";
import Icon from '@material-ui/core/Icon';
import AddPersonForm from "./AddPersonForm";



export default function List(props) {

  
    var [RelatedPersonObjects,setRelatedPersonObjects] = useState({})
    var [CurrentId,setCurrentId] = useState('')
    
    const [isToggled, setToggled] =  useState(false);
    const toggleTrueFalse = () => setToggled(!isToggled);

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

const displayDlt = e => {
 
  var x = document.getElementsByClassName('Delete');
  if (x.style.display === "none") {
    x.style.display = "Flex";
   
  } else {
    x.style.display = "none";
  
  }
  }
  const Hide = {
    display: 'none',
    
  };

  return (
  
    <div className="List" >
      
      <div>
   
   {
    
     Object.keys(RelatedPersonObjects).map(id=>{
       return <div key={id}>
         
         <div className="Card"> 
          <p className='Name'> {RelatedPersonObjects[id].FirstName} {RelatedPersonObjects[id].LastName}</p>
         
         <p className='Relatioship'> {RelatedPersonObjects[id].Relationship}</p>

         <div className="Flex"  >

<button 
 type="button" 
 onClick={()=>setCurrentId(id)} 
 className="Green Edit">
 Edit</button>
 
 <button 
onClick={()=>{onDelete(id)}} 
 className="Dlt">
 <Icon>delete</Icon>
 </button>



</div>
          </div>
        
       </div>   
     })
    
   }

</div>
    </div>
  )
}

