import React, { useState, useEffect } from 'react';

const ContactForm = (props) => {
    const initialFieldValues = {
        task: '',
        priority: '',
        status:'',
        notes: ''
    }

    var [values, setValues] = useState(initialFieldValues)


    useEffect(() => {
        if (props.currentId === '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.RelatedPersonsObjects[props.currentId]
            })
    }, [props.currentId, props.RelatedPersonsObjects])

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values);
    }

    return (
        <form className="Form" autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" name="task" placeholder="Task"
                    value={values.task}
                    onChange={handleInputChange}
                    required
                />
            </div>
           
                <div className="form-group input-group ">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <select className="form-control" name="priority" placeholder="Priority" name="priority" value={values.priority}
                        onChange={handleInputChange} 
                        required>
                        <option value="">Urgency</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                   
                   

                </div>
          
                <div className="form-group input-group ">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <select className="form-control" name="status" placeholder="status" name="status" value={values.status}
                        onChange={handleInputChange} 
                        required>
                        <option value="">Status</option>
                        <option value="To-Do"> To Do</option>
                        <option value="Progress">In-Progress</option>
                        <option value="Testing">Testing</option>
                        <option value="Complete">Complete</option>
                    </select>
                   
                   

                </div>

                <div className="form-group input-group ">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-comment"></i>
                        </div>
                    </div>
                    <input className="form-control" name="notes" placeholder="Notes"
                        value={values.notes}
                        onChange={handleInputChange}
                        required
                        type="text"
                    />
                </div>

            <div className="form-group">
                <input type="submit" value={props.currentId === "" ? "Save" : "Update"} className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

export default ContactForm;