import React, { useState, useEffect } from 'react';
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";



const Contacts = () => {
    
    var answer = "";    
    var newId = ""; 
    var isOpen = false;
    var isOpenIcon = "<";
    let iconbtn = document.getElementById("iconBtn");
    let icon = document.getElementById("icon");
    var popUp = document.getElementById("popup");
    var sideBar = document.getElementById("sidebar");
    var CardIntroHolder = document.getElementById("cardintroholder");
    var CardDetails = document.getElementsByClassName("CardDetails");
   



	var [currentId, setCurrentId] = useState('');
    var [RelatedPersonsObjects, setRelatedPersonsObjects] = useState({})
    var [CounterObjects,  setCounterObjects] = useState({})
   
    var an = Object.values(CounterObjects)[0]
    
    //Once components load complete
  

    useEffect(() => {
        
        firebaseDb.child('RelatedPersons').on('value', snapshot => {
            if (snapshot.val() != null){
                setRelatedPersonsObjects({
                    ...snapshot.val()
                    
                })
               
             
            }
                else{
                setRelatedPersonsObjects({})
              
                
                }
        })

        firebaseDb.child('Score').on('value', snapshot => {
            if (snapshot.val() != null){
                setCounterObjects({
                    ...snapshot.val()
                    
                })
               
             
            }
                else{
                setCounterObjects({})
              
                
                }
        })
        
    }, [])

  

    function Increment() {
        let plus = an + 1
        firebaseDb.child(`Score/Count`).set(plus)
        console.log(plus)
       
      }

      function Decrement() {
        let minus = an - 1
        firebaseDb.child(`Score/Count`).set(minus)
        console.log(minus)

      }
    


    const addOrEdit = (obj) => {
        
      if (currentId === '')
          firebaseDb.child('RelatedPersons').push(
              obj,
              err => {
                  if (err)
                      console.log(err)
                  else
                
                      setCurrentId('')
                      Increment()
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

 
  const onDeletePopUp = (id) => {
    popUp.classList.add("popUpActive")
    popUp.classList.add("popUpActive")
    newId = id
    
}

const Open = () => {
   

   if(isOpen === false){
    iconbtn.classList.add("iconbtn")
    icon.classList.add("iconb")
    sideBar.classList.remove("hidden")
    icon.classList.add("rotateicon")
    isOpen = true
   
   }else{
    iconbtn.classList.remove("iconbtn")
    icon.classList.remove("iconb")
    sideBar.classList.add("hidden")
    icon.classList.remove("rotateicon")
    isOpen = false
   }
 }

 const EditOpen = () => {
    iconbtn.classList.add("iconbtn")
    icon.classList.add("iconb")
     sideBar.classList.remove("hidden")
     isOpen = true
     icon.classList.add("rotateicon")
  
    
  }
const Yes = (id) => {
    answer = true;
    popUp.classList.remove("popUpActive")
    onDelete(newId)
 }

 const No = () => {
    popUp.classList.remove("popUpActive")
 }
 
const onDelete = id => {
    
    if (answer === true) {
        firebaseDb.child(`RelatedPersons/${id}`).remove(
            err => {
                if (err)
                    console.log(err)
                else
                    setCurrentId('')
                    Decrement({})
                    
            })
    }
    
}

 
  return (
        <div className="MainFlex">

            <div className="popup popUpCenter" id="popup" >
               <div className="popUpHolder">
               <h3>ARE YOU SURE ?</h3>
                   <p>This action is irreversible</p>
               <button id="yes" onClick={() => { Yes() }} className="popUpBtn">YES</button>
                <button id="no" onClick={() => { No() }} className="popUpBtn">NO</button>
            </div>
            </div>
           <div className="sideBarHolder">
                <div className="w-30 hidden" id="sidebar">
           
                    <h1 className="display-4 text-center heading" >OGM MEDIA</h1>
                    <p className=" text-center">Log your task below</p>

                    <ContactForm {...({ currentId, RelatedPersonsObjects, addOrEdit ,Increment,})} ></ContactForm>

                </div>
             
                     <div>
                         <div id="iconBtn"  onClick={() => {Open()}}>
                         <p id="icon">{isOpenIcon}</p>
                         </div>
                    </div>
                    </div>

                    <div className="taskHolder">
                    <h1 className="display-4 taskHolderHeading">ACTIVE TASKS</h1>
                    <div className="emptyMessage" id="emptymessage">You have currently have {an} active tasks</div>
                <div className="FlexCard ">
        
                {
                                Object.keys(RelatedPersonsObjects).map((key) => (
                                    
                                    <div className="Card" key={key} >
                                       
                                       

                                   <table>
                                       <tbody>
                                           
                                           <tr>
                                            <td>
                                             <thead>Task</thead>
                                               <p >{RelatedPersonsObjects[key].task}</p>
                                               </td>
                                               
                                               <td>
                                               <thead>Server</thead>
                                               <p >{RelatedPersonsObjects[key].domain}</p>
                                               </td>
                                               <td>
                                               <thead>Priority</thead>
                                               <p >{RelatedPersonsObjects[key].priority}</p>
                                               </td>
                                               <td>
                                               <thead>Status</thead>
                                               <p >{RelatedPersonsObjects[key].status}</p>
                                               </td>
                                               <td className="notess">
                                               <thead>Notes</thead>
                                               <p >{RelatedPersonsObjects[key].notes}</p>
                                               </td>
                                               <td align="right">  
                                              
                                                   <button className="btn clear " onClick={() => { setCurrentId(key) ; EditOpen() }} >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                          
                                                <button className="btn clear " onClick={() => { onDeletePopUp(key) }}>
                                           <i className="far fa-trash-alt"></i>
                                       </button>

                                            </td>
                                          
                                          </tr>
                                       </tbody>
                                   </table>
                                       
                                  
                                        
                                    
                                       
                                          
                                   
                                    </div>
                                 
                                ))
                            }
                          
                             </div>
                             </div>
                             
        </div>
    );
    
}

export default Contacts;