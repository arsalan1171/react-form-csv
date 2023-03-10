import React, { useState } from "react";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { db } from "../../firebase";

const PersonForm = () => {
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState({});

    const handleChange = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
      }

     const findFormErrors = () =>{
        const { name, surname, idNumber, dateOfBirth } = form;
        const newErrors = {};
        // name errors
        if ( !name || name === '' ) newErrors.name = 'cannot be empty!';
        else if ( name.length > 30 ) newErrors.name = 'name is too long!';
        // surname errors
        if ( !surname || surname === '' ) newErrors.surname = 'cannot be empty!';
        else if ( surname.length > 30 ) newErrors.surname = 'name is too long!';
        // id number errors
        if ( !idNumber || idNumber === '' ) newErrors.idNumber = 'cannot be empty!';
        else if ( idNumber?.length !== 13 ) newErrors.idNumber = 'Insert a valid 13 digit SA ID no.';

        if ( !dateOfBirth || dateOfBirth === '' ) newErrors.dateOfBirth = 'cannot be empty!';
    
        return newErrors;
      }

    const handleSubmit =  (e)=> {
        e.preventDefault();
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          setErrors(newErrors);
        } else {
            addPerson();
        }
    }

    const addPerson = async () => {
        const personObj = {
            name: form.name,
            surname: form.surname,
            idNumber: form.idNumber,
            dateOfBirth: form.dateOfBirth,
            dateCreated: new Date()
        }
        try {
            const q = query(collection(db, "persons"), where("person.idNumber", "==", personObj.idNumber));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                addDoc(collection(db, "persons"), {
                    person: personObj
                  }).then(()=>alert("saved successfully"));
                } else {
                    alert('id number already exist in our system');
                    
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const clear = (e) => {
        //clear fields
        e.target.form.elements.formName.value = "";
        e.target.form.elements.formSurname.value = "";
        e.target.form.elements.formIdNumber.value = "";
        e.target.form.elements.formDateOfBirth.value = "";

        //clear form state and error msgs
        setForm({ name: '', surname: '', idNumber: '', dateOfBirth: '' }); setErrors({});
    }

    return (
        <>
            <div className='w-25 m-5'>
                <h3 className="mb-4">React Simple Form</h3>
                <Form autoComplete="false" onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            onChange={(e) =>  handleChange('name', e.target.value)}
                            isInvalid={ !!errors.name }
                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.name }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSurname">
                        <Form.Control
                            type="text"
                            placeholder="Surname"
                            onChange={(e) => handleChange('surname', e.target.value)} 
                            isInvalid={ !!errors.surname }
                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.surname }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIdNumber">
                        <Form.Control
                            type="number"
                            placeholder="SA ID no."
                            onChange={(e) => handleChange('idNumber', e.target.value)}
                            isInvalid={ !!errors.idNumber }
                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.idNumber }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control style={{display:"none"}} isInvalid={!!errors.dateOfBirth}></Form.Control>
                        <DatePicker maxDate={new Date()} placeholderText="Date of Birth" 
                            id="formDateOfBirth" className="form-control" 
                            dateFormat="dd/MM/yyyy" selected={form.dateOfBirth}
                            onChange={(date) => { 
                                handleChange('dateOfBirth', date)}} />
                        <Form.Control.Feedback type="invalid">
                         { errors.dateOfBirth }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button className="me-2" variant="success" type="submit">
                        Post Data
                    </Button>
                    <Button variant="danger" type="button" onClick={(e) => clear(e)}>
                        Clear
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default PersonForm;
