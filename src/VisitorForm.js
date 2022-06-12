import React from 'react';


const VisitorForm=({ fisrtname, lastname, phonenumber, onChange, onSubmit }) => {


    return (
        <div className="visitorForm">
            <input type="text" name="firstname" value={fisrtname} onChange={onChange} placeholder="First name"></input>
            <input type="text" name="lastname" value={lastname} onChange={onChange} placeholder="Last name"></input>
            <input type="text" name="phonenumber" value={phonenumber} onChange={onChange} placeholder="Phone number"></input>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
}                            //onChange saves user's input value to initialState.inputs in App.js.
                             //onSubmit adds initialState.inputs to initialState.visitors.
                            //initialState.visitors in App.js is Array object, used to save visitor's info.
                              //initialState.visitors is rendered through VisitorList.js.

export default VisitorForm;
