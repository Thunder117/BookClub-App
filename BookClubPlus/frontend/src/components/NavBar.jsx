/* eslint-disable react/jsx-no-comment-textnodes */
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const NavBar = (props) => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [menuDropdown, setMenuDropdown] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);

    const handleClick = () => {
        logout();
    };

    const showMenuDropdown = () => {
        if(userDropdown) {
            setUserDropdown(false);
        } 
        setMenuDropdown(!menuDropdown);
    };

    const showUserDropdown = () => {
        if(menuDropdown) {
            setMenuDropdown(false);
        } 
        setUserDropdown(!userDropdown);
    };

    const goToTopInstant = () => {
        window.scrollTo({
            top: 0
        });
    };

    //TODO: change how the log out and username looks
    return(
        <div className={`font-sans font-semibold text-white flex flex-row w-full h-20 fixed z-30 top-0 transition duration-500 ${(props.showNav) && "bg-white"}`}>

            <div className="flex basis-2/3 w-full items-center pl-5 lg:pl-40 gap-4 lg:gap-8">
                
                <NavLink to="/"
                onClick={goToTopInstant} 
                className={`h-full lg:h-min w-auto items-center flex text-3xl font-bold transition duration-500 ${(props.showNav) && "text-sky-500"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 px-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span className="hidden lg:block">BookClub+</span>
                </NavLink>

                { !user && (
                    <div className={`flex flex-none gap-2 lg:gap-4 transition duration-500 ${(props.showNav) && "text-black" }`}>
                        
                        <NavLink to="/signup" className="p-2" onClick={goToTopInstant} >
                            Sign Up
                        </NavLink>

                        <NavLink to="/login" className="p-2" onClick={goToTopInstant}>
                            Log In
                        </NavLink>
                    </div>
                )}

                { user && (
                    <div className="items-center h-full flex flex-row lg:gap-8">

                        <div className={`relative h-full w-full lg:hidden`}>
                            <button onClick={showUserDropdown} className="h-full w-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-full py-2 ${(props.showNav && "text-black")}`}>
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className={`-translate-y-2 min-w-[160px] absolute drop-shadow-lg ${!userDropdown && 'hidden'}`}>
                                <button onClick={handleClick} className={`px-6 py-2 block bg-[#f1f1f1] hover:#ddddddae`}>
                                    Log Out
                                </button>
                            </div>
                        </div>

                        <span className={`transition ${(props.showNav && "text-black")} hidden lg:inline`}>{user.username}</span>
                        
                        <button onClick={handleClick} className={`w-24 rounded-md border-2 border-green-700 transition duration-500 ${(props.showNav) && "text-gray-700"} hidden lg:inline`}>
                            Log Out
                        </button>
                    </div>
                )}

            </div>

            <div className="flex basis-1/3 w-full items-center justify-end pr-5 lg:pr-40 gap-4 lg:gap-8">

                <div className={`flex h-full lg:hidden`}>
                    <button onClick={showMenuDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-full px-2 py-2 transition duration-500 ${(props.showNav && "text-black")}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>

                    </button>
                    <div className={`bg-white rounded-md min-w-[160px] top-[105%] right-0 text-black absolute drop-shadow-lg ${!menuDropdown && 'hidden'}`}>
                        <NavLink to="/games"
                        className={`px-6 py-2 block`}>
                            All Games
                        </NavLink>
                        <NavLink to="/myreviews"
                        className={`px-6 py-2 block`}>
                            My Reviews
                        </NavLink>
                    </div>
                </div>
               
                <NavLink to="/games" 
                onClick={goToTopInstant} 
                className={`transition duration-500 flex-none ${(props.showNav && "text-black")} hidden lg:block`}>
                    All Games
                </NavLink>

                <NavLink to="/myreviews" 
                onClick={goToTopInstant} 
                className={`transition duration-500 flex-none ${(props.showNav && "text-black")} hidden lg:block`}>
                    My Reviews
                </NavLink>
                
            </div>

        </div>
    );
};

export default NavBar;