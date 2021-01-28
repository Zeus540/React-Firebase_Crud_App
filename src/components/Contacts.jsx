import React, { useState, useEffect } from 'react';
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {

	var [currentId, setCurrentId] = useState('');
    var [RelatedPersonsObjects, setRelatedPersonsObjects] = useState({})

    //Once components load complete
    useEffect(() => {
        firebaseDb.child('RelatedPersons').on('value', snapshot => {
            if (snapshot.val() != null) {
                setRelatedPersonsObjects({
                    ...snapshot.val()
                });
            }
        })
    }, [])


    const addOrEdit = (obj) => {
      if (currentId === '')
          firebaseDb.child('RelatedPersons').push(
              obj,
              err => {
                  if (err)
                      console.log(err)
                  else
                      setCurrentId('')
              })
      else
          firebaseDb.child(`RelatedPersons/${currentId}`).set(
              obj,
              err => {
                  if (err)
                      console.log(err)
                  else
                      setCurrentId('')
              })
  }

  const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?')) {
        firebaseDb.child(`RelatedPersons/${id}`).remove(
            err => {
                if (err)
                    console.log(err)
                else
                    setCurrentId('')
            })
    }
}


  return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Contact Manager</h1>
                </div>
            </div>
            <div className="Flex ">
                    <ContactForm {...({ currentId, RelatedPersonsObjects, addOrEdit })} ></ContactForm>
                </div>
                <div className="Flex ">
              
                {
                                Object.keys(RelatedPersonsObjects).map((key) => (
                                 
                                    <div className="Card" key={key}>
                                      <h5>NAME</h5>
                                        <p>{RelatedPersonsObjects[key].fullName}</p>
                                        <h5>MOBILE</h5>
                                        <p>{RelatedPersonsObjects[key].mobile}</p>
                                        <h5>EMAIL</h5>
                                        <p>{RelatedPersonsObjects[key].email}</p>
                                        <h5>ADDRESS</h5>
                                        <p>{RelatedPersonsObjects[key].address}</p>
                                       
                                            <button className="btn text-primary" onClick={() => { setCurrentId(key) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        
                                    </div>
                                 
                                ))
                            }
                          
                             </div>
        </>
    );
}

export default Contacts;