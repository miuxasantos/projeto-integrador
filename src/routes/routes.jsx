import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../Componentes/Login/SignIn/SignIn';
import SignUp from '../Componentes/Login/SignUp/SignUp';

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home"></Route>
                <Route path="/auth/*" element={<AuthRoutes />}></Route>
            </Routes>
        </BrowserRouter>
    )
}