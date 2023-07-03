import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router';
import Loader from './Loader';

const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
        return <Loader />;
    }

    return(
        isAuth ? 
        <Routes>
        ({privateRoutes.map(route =>
            <Route key={route.path} path={route.path} element={<route.element />} />
        )})
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
        :
        <Routes>
        ({publicRoutes.map(route =>
            <Route key={route.path} path={route.path} element={<route.element />} />
        )})
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRouter;