import React, { useState }from 'react';


function Visitor({ visitor, onRemove, onSpread, onUpdate, onUpdateSubmit }) {

    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        isUpdate: false,
        isSpread: false
    });

    const { firstname, lastname, phonenumber} = inputs;
  

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }
    return (
        <div className='visitor' data-id={visitor.id}>
            {visitor.isUpdate ? <div className="update"><input type="text" name="firstname" value={firstname} onChange={onChange} placeholder="Firstname"></input>
                <input type="text" name="lastname" value={lastname} onChange={onChange} placeholder="Lastname"></input></div>
                :<span id="name" onClick={() => onSpread(visitor.id)} style={{ cursor: 'pointer' }}>{visitor.firstname} {visitor.lastname}</span>
            }
            {
            visitor.isSpread ? <div id={visitor.id}>
                <p>No.{visitor.id}</p>
                    {visitor.isUpdate ? <div className="update"><span>Mobile:</span>
                        <input type="text" name="phonenumber" value={phonenumber} onChange={onChange} placeholder="Phone number"></input></div>
                        : <p>Mobile: {visitor.phonenumber}</p>}
                <p>Visited at: {visitor.date}</p>
                    {visitor.isUpdate ? <button id="submitBtn" onClick={() => onUpdateSubmit(visitor.id,visitor.date,inputs)}>Update</button>:<button id="removeBtn" onClick={() => onRemove(visitor.id)}>Remove</button>}
                    {visitor.isUpdate ? null : <button  id="updateBtn" onClick={() => onUpdate(visitor.id)}>Update</button>}
            </div> : null
     }
     </div>
    )            
};


export default function VisitorList({ visitors, onRemove, onSpread, onUpdate, onUpdateSubmit }) {
    return (
        <div className="visitorList">
            <h2>Today's visitors</h2>
            {visitors.map(visitor => {
                return <Visitor visitor={visitor}
                onRemove={onRemove} onSpread={onSpread} onUpdate={onUpdate} onUpdateSubmit={onUpdateSubmit} />
            })}
        </div>
    );
};