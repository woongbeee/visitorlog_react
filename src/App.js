import React, { useCallback,useRef, useReducer } from 'react';
import VisitorForm from './VisitorForm';
import VisitorList from './VisitorList';

const today = new Date().toDateString();
const logTime = new Date().toTimeString().substring(0, 9);

const initialState = {
    inputs: {
        id: '',
        firstname: '',
        lastname: '',
        phonenumber: '',
        date: logTime,
        isSpread: false,
        isUpdate:false,
    },
    visitors: [
        {
            id: 1,
            firstname: 'Woongbee',
            lastname: 'Park',
            phonenumber: '010-9014-7222',
            date: '08:44:22',
            isSpread: false,
            isUpdate: false,

        },
        {
            id: 2,
            firstname: 'Margarita',
            lastname: 'Mou',
            phonenumber: '063-402-2814',
            date: '09:34:23',
            isSpread: false,
            isUpdate: false,
        },
    ]
}

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            };

        case 'SUBMIT':
            return {
                inputs: initialState.inputs,
                visitors: state.visitors.concat(action.visitor)
            };

        case 'REMOVE':
            return {
                ...state,
                visitors: state.visitors.filter(visitor =>
                    visitor.id !== action.id)
            };

        case 'SPREAD':
            return {
                ...state,
                visitors: state.visitors.map(visitor =>
                    visitor.id === action.id ? { ...visitor, isSpread: !visitor.isSpread } : visitor)
            };
        case 'UPDATE':
            return {
                ...state,
                visitors: state.visitors.map(visitor =>
                    visitor.id === action.id ? { ...visitor, isUpdate: !visitor.isUpdate } : visitor)
            };
        case 'UPDATE_SUBMIT':
            const { firstname, lastname, phonenumber, date } = action.visitor;
            return {
                ...state,
                visitors: state.visitors.map(visitor =>
                    visitor.id === action.id ?
                        { ...visitor, firstname, lastname, phonenumber, date, isUpdate: false, isSpread:true } : visitor)
            };
        default:
            return state;
    }
}
export default function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(3);

    const { visitors } = state;
    const {firstname, lastname, phonenumber, date } = state.inputs;

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({
            type: 'CHANGE_INPUT',
            name,
            value
        });
    }, []);


    const onSubmit = useCallback(() => {
        dispatch({
            type: 'SUBMIT',
            visitor: {
                ...state.inputs,
                id: nextId.current,
            }
        });
        nextId.current += 1;
    }, [firstname, lastname, phonenumber]);

    const onRemove = useCallback((id) => {
        dispatch({
            type: 'REMOVE',
            id
        });
    }, []);

    const onSpread = (id) => {
        dispatch({
            type: 'SPREAD',
            id
        })
    };

    const onUpdate = (id) => {
        dispatch({
            type: 'UPDATE',
            id
        })
    };

    const onUpdateSubmit = (id, date, inputs) => {
        dispatch({
            type: 'UPDATE_SUBMIT',
            id,
            visitor: {
                date,
                ...inputs
            }
        })
    };


  

    return <>
        <h1>Visitors log
            &#9997;</h1>
        <h3>{today}, Today {visitors.length} visited</h3>
        <div className="main">
        <VisitorForm
            firstname={firstname}
            lastname={lastname}
            phonenumber={phonenumber}
            date={date}
            onChange={onChange}
            onSubmit={onSubmit} />
        <VisitorList
                visitors={visitors}
                firstname={firstname}
                lastname={lastname}
                phonenumber={phonenumber}
                onChange={onChange}
                onRemove={onRemove}
                onSpread={onSpread}
                onUpdate={onUpdate}
                onUpdateSubmit={onUpdateSubmit}
                      />
            </div>
    </>

}//App;


