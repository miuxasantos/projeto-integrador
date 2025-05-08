import { Routes, Route } from 'react-router-dom';
import { SignIn } from '../Pages/Login/SignIn';
import { SignUp } from '../Pages/Login/SignUp';

function AuthRoutes() {
    return(
        <Routes>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
        </Routes>
    );
};

export default AuthRoutes;