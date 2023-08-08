import { useState, useEffect } from 'react';

// components
import GamesShowcase from "../components/GamesShowcase";
import NavBar from '../components/NavBar';

const AllGamesPage = () => {
    const [videogames, setVideogames] = useState();  

    useEffect(() => {
        const fetchAll = async () => {
            await fetchVideogames();
        };
        
        fetchAll();
    }, []);

    const fetchVideogames = async () => {
        const response = await fetch(`https://collection-react-app-backend.onrender.com/api/videogames/`);
        const games = await response.json();

        setVideogames(games);

        return games;
    };

    return(
        <>
            <NavBar showNav/>
            
            <div className="min-h-screen h-full">

                <div className="flex h-20 w-full items-end">
                    <div className="text-3xl font-semibold ml-4 lg:ml-24 pb-1 border-b-4 border-green-700 rounded-sm text-gray-800">
                        All Games
                    </div>
                </div>

                <GamesShowcase videogames={videogames}/>
                
            </div>
        </>
    );
};

export default AllGamesPage;