import React, { useEffect, useState } from 'react';
import MyCheckbox from './UI/MyCheckbox';
import './levelsBackgroundImg.css';

const PostItem = (props) => {

    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        if(props.completedLevels.indexOf(props.level.id) >= 0){
            setChecked(true);
        }
        else{
            setChecked(false);
        }
    }, [props.completedLevels]);

    return(
        <div className='mt-2 mb-3 bg-dark w-50 mx-auto'>
            <div className='d-flex p-2 flex-column mx-auto'>
                <strong className='text-light fs-3'>{props.level.id}.{props.level.name}</strong>
                <MyCheckbox checked={checked} title="COMPLETE" onChange={(e) => props.changeLevelStatus(props.level, e.target.checked)} />
            </div>
            <div className={props.level.name.split(' ').join('') + " levelDiv bg-image border border-warning mx-auto d-flex justify-content-between align-items-center p-3 mt-3"}>
            </div>
        </div>
    );
}

export default PostItem;