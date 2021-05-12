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
    var [TasksToDoObjects, setTasksToDoObjects] = useState({})
    var [TasksCompleteObjects, setTasksCompleteObjects] = useState({})
    var [TasksTestingObjects, setTasksTestingObjects] = useState({})
    var [TasksInProgressObjects, setTasksInProgressObjects] = useState({})
    var [CounterObjects,  setCounterObjects] = useState({})
    var taskAmount = Object.values(CounterObjects)[0]
    
    //////////////////////////////////////
    useEffect(() => {
      
        firebaseDb.child(`Tasks`).orderByChild('status').equalTo('Complete').on('value', snapshot =>{
            if (snapshot.val() != null){
                setTasksCompleteObjects({
                    ...snapshot.val()
                })
              
            }
                else{
                    setTasksCompleteObjects({})
                }
        })
    }, [])
    ////////////////////////////

    //////////////////////////////////////
    useEffect(() => {
      
        firebaseDb.child(`Tasks`).orderByChild('status').equalTo('To-Do').on('value', snapshot =>{
            if (snapshot.val() != null){
                setTasksToDoObjects({
                    ...snapshot.val()
                })
              
            }
                else{
                    setTasksToDoObjects({})
                }
        })
    }, [])
    ////////////////////////////

        
    //////////////////////////////////////
    useEffect(() => {
      
        firebaseDb.child(`Tasks`).orderByChild('status').equalTo('Testing').on('value', snapshot =>{
            if (snapshot.val() != null){
                setTasksTestingObjects({
                    ...snapshot.val()
                })
              
            }
                else{
                    setTasksTestingObjects({})
                }
        })
    }, [])
    ////////////////////////////

        
    //////////////////////////////////////
    useEffect(() => {
      
        firebaseDb.child(`Tasks`).orderByChild('status').equalTo('In-Progress').on('value', snapshot =>{
            if (snapshot.val() != null){
                setTasksInProgressObjects({
                    ...snapshot.val()
                })
              
            }
                else{
                    setTasksInProgressObjects({})
                }
        })
    }, [])
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

if(textHidden === true){
    newids.style.opacity = "1"
    newids.style.display = "block"
 
    textHidden = false
}else{
    newids.style.opacity = "0"
    newids.style.display = "none"

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
   var h = document.getElementById("hours").innerHTML = a.getHours();

   var m  = a.getMinutes()
   var day  = a.getDay()
   var month  = a.toLocaleString('default', { month: 'long' })
   var year  = a.getFullYear()
   var day = document.getElementById("day").innerHTML = day;
   var month = document.getElementById("month").innerHTML = month;
   var year = document.getElementById("year").innerHTML = year;
   console.log(day)
 if(m < 10){
    m = document.getElementById("minutes").innerHTML = "0" + m
 }else{
    m = document.getElementById("minutes").innerHTML = " " + m
 }
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
                
                <div className="clock"><span id="hours"></span> : <span id="minutes"></span></div>
                <div className="clock"><span id="day"></span> <span id="month"></span> <span id="year"></span></div>
              </div>
                   <p className="Intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
               
                  <h1 className="display-4 taskHolderHeading">ALL TASKS</h1>

                    <div className="emptyMessage" id="emptymessage">You have currently have <span id="taskTotal">{taskAmount}</span>  tasks</div>
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
                             <h1 className="display-4 taskHolderHeading">COMPLETE </h1>
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
           
         
                        Object.keys(TasksCompleteObjects).map((key) => (
                            
                            
                                   
                                   <tr valign="top" key={key}  className="tr-active" >
                              
                                    <td >
                                       <p >{TasksCompleteObjects[key].task}</p>
                                    </td>

                                       <td >
                                       <p >{TasksCompleteObjects[key].priority}</p>
                                        <div ></div>
                                     
                                      
                                      
                                       </td>
                                    
                                       

                                       <td className="notess"  >

                                        <p >Read Note</p>

                                        <p  >{TasksCompleteObjects[key].notes}</p>
                                        </td>

                                        <td >
                                      
                                       <p >{TasksCompleteObjects[key].status}</p>
                                       </td>

                                       <td>
                                      
                                       <p >{TasksCompleteObjects[key].domain}</p>
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
                     <h1 className="display-4 taskHolderHeading">TO-DO</h1>
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
           
         
                        Object.keys(TasksToDoObjects).map((key) => (
                            
                            
                                   
                                   <tr valign="top" key={key}  className="tr-active" >
                              
                                    <td >
                                       <p >{TasksToDoObjects[key].task}</p>
                                    </td>

                                       <td >
                                       <p >{TasksToDoObjects[key].priority}</p>
                                        <div ></div>
                                     
                                      
                                      
                                       </td>
                                    
                                       

                                       <td className="notess"  >

                                        <p >Read Note</p>

                                        <p  >{TasksToDoObjects[key].notes}</p>
                                        </td>

                                        <td >
                                      
                                       <p >{TasksToDoObjects[key].status}</p>
                                       </td>

                                       <td>
                                      
                                       <p >{TasksToDoObjects[key].domain}</p>
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
                     <h1 className="display-4 taskHolderHeading">TESTING</h1>
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
           
         
                        Object.keys(TasksTestingObjects).map((key) => (
                            
                            
                                   
                                   <tr valign="top" key={key}  className="tr-active" >
                              
                                    <td >
                                       <p >{TasksTestingObjects[key].task}</p>
                                    </td>

                                       <td >
                                       <p >{TasksTestingObjects[key].priority}</p>
                                        <div ></div>
                                     
                                      
                                      
                                       </td>
                                    
                                       

                                       <td className="notess"  >

                                        <p >Read Note</p>

                                        <p  >{TasksTestingObjects[key].notes}</p>
                                        </td>

                                        <td >
                                      
                                       <p >{TasksTestingObjects[key].status}</p>
                                       </td>

                                       <td>
                                      
                                       <p >{TasksTestingObjects[key].domain}</p>
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
                     <h1 className="display-4 taskHolderHeading">IN-PROGRESS</h1>
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
           
         
                        Object.keys(TasksInProgressObjects).map((key) => (
                            
                            
                                   
                                   <tr valign="top" key={key}  className="tr-active" >
                              
                                    <td >
                                       <p >{TasksInProgressObjects[key].task}</p>
                                    </td>

                                       <td >
                                       <p >{TasksInProgressObjects[key].priority}</p>
                                        <div ></div>
                                     
                                      
                                      
                                       </td>
                                    
                                       

                                       <td className="notess"  >

                                        <p >Read Note</p>

                                        <p  >{TasksInProgressObjects[key].notes}</p>
                                        </td>

                                        <td >
                                      
                                       <p >{TasksInProgressObjects[key].status}</p>
                                       </td>

                                       <td>
                                      
                                       <p >{TasksInProgressObjects[key].domain}</p>
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