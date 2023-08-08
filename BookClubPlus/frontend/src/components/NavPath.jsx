import { NavLink } from "react-router-dom";

const NavPath = (props) => {

    return (
        <div className="flex flex-row text-xl lg:text-3xl font-semibold w-full h-20 px-2 lg:px-24 items-center gap-2">
            <NavLink to="/games" className="hover:text-green-600">
                Games
            </NavLink>

            <div>
                >
            </div>

            <button className="text-green-700 hover:text-green-600">
                {props.videogame.title}
            </button>
        </div>
    )
}

export default NavPath;