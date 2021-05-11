import React, { useState, useEffect } from 'react';
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";




const Contacts = () => {
    
    var answer = "";    
    var newId = ""; 
    var isOpen = false;
    var textHidden = false;
    var isOpenIcon = "<";
    let iconbtn = document.getElementById("iconBtn");
    let icon = document.getElementById("icon");
    var popUp = document.getElementById("popup");
    var sideBar = document.getElementById("sidebar");


	var [currentId, setCurrentId] = useState('');
    var [TasksObjects, setTasksObjects] = useState({})
    var [CounterObjects,  setCounterObjects] = useState({})
    var taskAmount = Object.values(CounterObjects)[0]
    

    ////////////////////////////
    useEffect(() => {
      
        firebaseDb.child('Tasks').on('value', snapshot => {
            if (snapshot.val() != null){
                setTasksObjects({
                    ...snapshot.val()
                })
              
            }
                else{
                setTasksObjects({})
                }
        })
    }, [])
//////////////////////////

    useEffect(() => {
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

///////////////////////////////////
    function Increment() {
        let plus = taskAmount + 1
        firebaseDb.child(`Score/Count`).set(plus)
        console.log(plus)
       
      }

      function Decrement() {
        let minus = taskAmount - 1
        firebaseDb.child(`Score/Count`).set(minus)
        console.log(minus)

      }
//////////////////////////////////////////////////

    const addOrEdit = (obj) => {
       
      if (currentId === '')
     
     
          firebaseDb.child('Tasks').push(
              obj,
              err => {
                  if (err)
                      console.log(err)
                  else
                
                      setCurrentId('')
                      Increment()
                      Close()
              })
      else
          firebaseDb.child(`Tasks/${currentId}`).set(
              obj,
              err => {
                  if (err)
                      console.log(err)
                  else
                      setCurrentId('')
                      Close()
              })
  }

 /////////////////////////////////
  const onDeletePopUp = (id) => {
    popUp.classList.add("popUpActive")
    popUp.classList.add("popUpActive")
    newId = id
    
}
//////////////////////////////////

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
////////////////////////////////////

 const EditOpen = () => {
    iconbtn.classList.add("iconbtn")
    icon.classList.add("iconb")
     sideBar.classList.remove("hidden")
     isOpen = true
     icon.classList.add("rotateicon")
  }
  ///////////////////////////////////

  const Close = () => {
    iconbtn.classList.remove("iconbtn")
    icon.classList.remove("iconb")
     sideBar.classList.add("hidden")
     isOpen = true
     icon.classList.remove("rotateicon")
  }
  ////////////////////////////////////////

const Yes = () => {
    answer = true;
    popUp.classList.remove("popUpActive")
    onDelete(newId)
 }
///////////////////////////////////////////

 const No = () => {
    popUp.classList.remove("popUpActive")
 }
 ////////////////////////////////////////////

const onDelete = id => {
    
    if (answer === true) {
        firebaseDb.child(`Tasks/${id}`).remove(
            err => {
                if (err)
                    console.log(err)
                else
                    setCurrentId('')
                    Decrement({})
                    
            })
    }
    
}
///////////////////////////////////////////

  

function alerts(key){
 
    var newids =  document.getElementById(key+2)
    var newids4 =  document.getElementById(key+4)
if(textHidden === true){
    newids.style.opacity = "1"
    newids.style.display = "block"
    newids4.style.background = "#598bc1"
    textHidden = false
}else{
    newids.style.opacity = "0"
    newids.style.display = "none"
    newids4.style.background = "#dde3ea"
    textHidden = true
}
    
}
////////////////////////////////////////



function check(key){
  var newids3 =  document.getElementById(key+3)
  newids3.style.height = "4px"
 
  if(TasksObjects[key].priority === "High"){
    newids3.style.background = "#f44336"
   
}
if(TasksObjects[key].priority === "Medium"){
    newids3.style.background = "#ff9800"
    
}
if(TasksObjects[key].priority === "Low"){
    newids3.style.background = "#ffc107"
 
}
}

function date(){
    var a = new Date()
   var h = document.getElementById("h").innerHTML = a.getHours();
   var m = document.getElementById("m").innerHTML = a.getMinutes()
 
   
} 

setTimeout(() =>{
    date()
    setInterval(() => {
        date()
    }, 60000);

}, 0)



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
         
                <div className="w-30 hidden" id="sidebar">
           
                    <h1 className="display-4 text-center heading" >OGM MEDIA</h1>
                    <p className=" text-center">Log your task below</p>

                    <ContactForm {...({ currentId, TasksObjects, addOrEdit ,Close})} ></ContactForm>

                </div>
             
                     <div>
                         <div id="iconBtn"  onClick={() => {Open()}}>
                         <p id="icon">{isOpenIcon}</p>
                         </div>
                    </div>
                   
                   

                    <div className="taskHolder">
                   
                  <div className="titleAndClock">
                  <h1 className="display-4 taskHolderHeading">ACTIVE TASKS</h1>
                    <div className="clock"><span id="h"></span> : <span id="m"></span></div>
                  </div>
                  

                    <div className="emptyMessage" id="emptymessage">You have currently have <span id="taskTotal">{taskAmount}</span> active tasks</div>
                <div className="FlexCard ">
        
                <table  >
                                       <tbody>
                                           <tr className="t-head">
                                               <td className="t-d">         <i className="fas fa-tasks white"></i>Task</td>
                                               <td>  <i className="fas fa-bell white "></i>Priority</td>
                                               <td>  <i className="fas fa-comment white"></i>Notes</td>
                                               <td> <i className="fas fa-spinner white"></i>Status</td>
                                               <td> <i className="fa fa-server white"></i>Server</td>
                                               <td></td>
                                           </tr>
                                          
                {
                   
                 
                                Object.keys(TasksObjects).map((key) => (
                                    
                                    setTimeout(function(){check(key)}, 0),
                                           
                                           <tr valign="top" key={key} id={key + 4} className="tr-active" onClick={() => { alerts(key)}}>
                                      
                                            <td >
                                               <p >{TasksObjects[key].task}</p>
                                            </td>

                                               <td >
                                               <p >{TasksObjects[key].priority}</p>
                                                <div id={key + 3}></div>
                                             
                                              
                                              
                                               </td>
                                            
                                               

                                               <td className="notess"  >

                                                <p >Read Note</p>

                                                <p id={key + 2} className="hidden">{TasksObjects[key].notes}</p>
                                                </td>

                                                <td >
                                              
                                               <p >{TasksObjects[key].status}</p>
                                               </td>

                                               <td>
                                              
                                               <p >{TasksObjects[key].domain}</p>
                                               </td>
                                      
                                               
                                          
                                               

                                               <td align="left">  
                                              
                                                   <button className="btn clear " onClick={() => { setCurrentId(key) ; EditOpen() }} >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                          
                                                <button className="btn clear " onClick={() => { onDeletePopUp(key) }}>
                                           <i className="far fa-trash-alt"></i>
                                       </button>

                                            </td>
                                          
                                          </tr>
                                 
                                  
                                 
                                ))
                                
                                    
                                   
                            }
                                
                                
                                </tbody>
                                   </table>
                             </div>
                  
                             </div>
                             
        </div>
    );
    
}

export default Contacts;