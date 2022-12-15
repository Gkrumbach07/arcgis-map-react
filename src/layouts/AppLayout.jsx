import { Outlet } from "react-router-dom";

import NavBar from './NavBar';

const AppLayout = () => {
    return (
        <>
            <NavBar />
            <div className="main">
                <Outlet />
            </div>
        </>
    );
}

export default AppLayout;