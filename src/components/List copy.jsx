import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase";

const List = () => {

  var [RelatedPersonObjects,setRelatedPersonObjects] = useState({})

  useEffect(()=>{
   firebaseDb.child('RelatedPersons').on('value',snapshot=>{
     if (snapshot.val()!=null)
     setRelatedPersonObjects({
         ...snapshot.val()
     })
   })
  },[])

  return(
    
    <div className="List">
     <div>
      
          {
            Object.keys(RelatedPersonObjects).map(id=>{
              return <tr key={id}>
                <td>{RelatedPersonObjects[id].Relationship}</td>
                <td>{RelatedPersonObjects[id].FirstName}</td>
                <td>{RelatedPersonObjects[id].LastName}</td>
                <td>{RelatedPersonObjects[id].Sex}</td>
                <td>{RelatedPersonObjects[id].Nationalities}</td>
              </tr>
            })
          }
    
      </div>
    </div>
    
   );
}

export default List;

