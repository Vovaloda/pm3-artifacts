import React from 'react';

const MyCheckbox = (props) => {
    return (
        <div className="form-check form-switch ">
            <input type="checkbox" role="switch" className="form-check-input" checked={props.checked} onChange={props.onChange}/>
            <span htmlFor="scales" className='text-light'>{props.title}</span>
        </div>
    );
};

export default MyCheckbox;