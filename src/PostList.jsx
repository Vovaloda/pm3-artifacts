import React from "react";
import PostItem from "./PostItem";
import MySelect from "./UI/MySelect";

const PostList = ({levels, title, changeLevelStatus, completedLevels, setSelecterSortFuncAndSort}) => {
    return (
        <div>
            <h1 className="text-center text-light">{title}</h1>
            <div>
                <span className="text-light fs-5 m-2">Sorting: </span>
                    <MySelect
                        defaultValue="Default"
                        options={[
                            {value: 'UnfinishedFirst', name: "Unfinished first"},
                        ]} 
                        onChange={setSelecterSortFuncAndSort}
                    />
            </div>
            {levels.map(level =>
                <PostItem key={level.id} completedLevels={completedLevels} level={level} changeLevelStatus={changeLevelStatus}/>
            )}
            <br />
        </div>
    );
}

export default PostList;