import React, { useContext, useEffect, useState } from "react";
import PostList from "./PostList";
import axios from "axios";
import { AuthContext } from "./context";
import Loader from "./UI/Loader";

function Home(){

    const {playerId} = useContext(AuthContext);

    const [levels, setLevels] = useState([]);
    const [completedLevels, setCompletedLevels] = useState([]);
    const [isLevelsLoading, setIsLevelsLoading] = useState(false);
    const [isCompletedLevelLoading, setIsCompletedLevelLoading] = useState(false);
    const [defaultSortedLevels, setDefaultSortedLevels] = useState([]);

    useEffect(()=>{
        fetchCompletedLevels();
        fetchLevels();
    }, []);

    const setSelecterSortFuncAndSort = (selectedSort) => {

        if(selectedSort === "Default"){
            setLevels([...defaultSortedLevels]);
        }
        else{
            sortLevels();
        }
    }

    const sortLevels = () => {
        let sortedLevels = [...defaultSortedLevels].sort((a,b) => {
            if(completedLevels.indexOf(a.id) >= 0){
                return 1;
            }
            return -1;
        });
        setLevels(sortedLevels);
    }

    async function fetchLevels(){
        setIsLevelsLoading(true);
        const response = await axios.get('https://pm3-artifacts-server.onrender.com/levels');
        setLevels(response.data);
        setDefaultSortedLevels(response.data);
        setIsLevelsLoading(false);
    }

    async function fetchCompletedLevels(){
        setIsCompletedLevelLoading(true);
        await axios.post('https://pm3-artifacts-server.onrender.com/getCompletedLevels', {playerId})
            .then(res => {
                if(res.data.msg === "Succes"){
                    const tmpArrayOfCompletedLevels = [];
                    for(let i = 0; i < res.data.data1.length; i++){
                        tmpArrayOfCompletedLevels.push(res.data.data1[i].levelId);
                    }
                    setCompletedLevels(tmpArrayOfCompletedLevels);
                }
                else{
                    alert("Error. Please refresh the page.");
                }
            })
            .catch(err => console.log(err));
            setIsCompletedLevelLoading(false);
    }

    const changeLevelStatus = async (level, status) => {
        if(status){
            setCompletedLevels([...completedLevels, level.id]);
            await axios.post('https://pm3-artifacts-server.onrender.com/addLevelByUser', {playerId, levelId:level.id})
            .then(res => {
                if(res.data.msg !== "Succes"){
                    alert("Error. Please refresh the page.");
                }
            })
            .catch(err => console.log(err));
        }
        else{
            setCompletedLevels(completedLevels.filter(lvl => lvl !== level.id));
            await axios.post('https://pm3-artifacts-server.onrender.com/deleteLevelByUser', {playerId, levelId:level.id})
            .then(res => {
                if(res.data.msg !== "Succes"){
                    alert("Error. Please refresh the page.");
                }
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <div className="bg-secondary bg-gradient">
            {(isLevelsLoading || isCompletedLevelLoading)
            ?
            <Loader />
            :
            <PostList levels={levels} title="Levels" changeLevelStatus={changeLevelStatus} completedLevels={completedLevels} setSelecterSortFuncAndSort={setSelecterSortFuncAndSort}/>
            }
        </div>
    );
}

export default Home;
 
