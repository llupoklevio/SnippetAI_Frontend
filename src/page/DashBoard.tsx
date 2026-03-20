import {Navbar} from "../component/SharedComponent/Navbar.tsx";
import {AsideDashboard} from "../component/SharedComponent/AsideDashboard.tsx";
import {Outlet} from "react-router";

export const DashBoard = () => {

    return (
        <>
            <div >
                <Navbar />
            </div>
            <div className="flex">
                <AsideDashboard />
                <div className="bg-black w-9/12 min-h-screen  pb-10">
                    <Outlet />
                </div>
            </div>
        </>
    )
}