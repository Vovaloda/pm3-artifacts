import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";

export const privateRoutes = [
    {path: '/', element: Login},
    {path: '/signup', element: SignUp},
    {path: '/home', element: Home},
];

export const publicRoutes = [
    {path: '/', element: Login},
    {path: '/signup', element: SignUp},
];