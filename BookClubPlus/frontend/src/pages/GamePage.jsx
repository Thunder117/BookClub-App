import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// components
import GameTrailer from '../components/GameTrailer';
import ReviewSpace from '../components/ReviewSpace';
import NavPath from '../components/NavPath';
import GameInformation from '../components/GameInformation';
import SectionSelector from '../components/SectionSelector';
import NavBar from '../components/NavBar';

const GamePage = () => {
    const [videogame, setVideogame] = useState();  
    const [reviews, setReviews] = useState();
    const [backgroundImage, setBackgroundImage] = useState(""); 
    const [sectionSelection, setSectionSelection] = useState(true); 

    const switchBackgroundImage = false; // hardcoded

    const { id } = useParams();

    useEffect(() => {
        const fetchAll = async () => {
            const game = await fetchVideogame();
            await fetchReviews();
            if(switchBackgroundImage) {
                await fetchBackgroundImage(game.title);
            }
        };
        
        fetchAll();
    }, []);

    const fetchVideogame = async () => {
        const response = await fetch(`https://collection-react-app-backend.onrender.com/api/videogames/${id}`);
        const game = await response.json();

        setVideogame(game);

        return game;
    };

    const fetchReviews = async () => {
        const response = await fetch(`https://collection-react-app-backend.onrender.com/api/reviews/${id}`);
        const json = await response.json();

        setReviews(json);
    };

    const sectionSelectorSwitch = () => {
        setSectionSelection(oldState => !oldState);
    };

    
	const fetchBackgroundImage = async(title) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ab86c3b23dmsh695fb97a9643717p108ddejsn306328f46e8e',
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };

        const queryText = encodeURIComponent(`${title} game wallpaper`.trim());
		const response = await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${queryText}&pageNumber=1&pageSize=1&autoCorrect=false&safeSearch=true`, options);
        const background = await response.json();
        
        setBackgroundImage(background.value);
            
        return background;
	};
    
    return (
        <>
            <NavBar showNav/>
            
            { videogame && reviews
            ?
            <>
                <NavPath videogame={videogame}/>
                <GameInformation videogame={videogame} reviews={reviews}/>
                <SectionSelector sectionSelection={sectionSelection} sectionSelectorSwitch={sectionSelectorSwitch}/>

                { sectionSelection 
                ?   
                    <ReviewSpace videogame={videogame} reviews={reviews} fetchReviews={fetchReviews}/>
                :
                    <GameTrailer videogame={videogame} backgroundImage={backgroundImage}/>
                }
                
            </>
            : 
                <>
                    <div className="h-20"></div>
                    <div className="w-full h-[260px] bg-neutral-800"/>
                </>
            }
        </>
        
    );
    
};

export default GamePage;