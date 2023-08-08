import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const GameCard = (props) => {
    const [reviews, setReviews] = useState(0);
    const [average, setAverage] = useState('n/a');

    useEffect(() => {
        const fetchAll = async () => {
            const reviews = await fetchReviews();
            await getReviewsAverage(reviews);
            
        };
        
        fetchAll();
    }, []);

    const fetchReviews = async () => {
        const response = await fetch(`https://collection-react-app-backend.onrender.com/api/reviews/${props.videogame._id}`);
        const json = await response.json();

        setReviews(json);

        return json;
    };

    const getReviewsAverage = async (reviews) => {
        if (reviews.length === 0) return;
		
        let allRatingsSum = 0;
        for (let i = 0; i < reviews.length; i++) {
            allRatingsSum += reviews[i].rating;
        }

		const average = (allRatingsSum / reviews.length).toFixed(1);

		setAverage(average);
    };

    return (
                            
        <Link to={`/games/${props.videogame._id}`} className="h-[150px] lg:h-[190px] w-[380px] lg:flex-none my-2 lg:m-4 px-4 lg:p-0 flex lg:shadow-md  drop-shadow-md rounded-md transition lg:hover:scale-105 bg-white hover:text-green-700">

            <div className="h-full w-[100px] lg:w-[120px] flex-none">
                <img src={`/covers/${props.videogame.imagePath}`} alt="cover" className="h-full w-full select-none rounded-md"/>
            </div>

            <div className="h-full w-full flex flex-col">
                <div className="mt-2 ml-4 text-lg font-semibold text-left">
                    {props.videogame.title}
                </div>
                <div className="mx-4 text-neutral-500 text-left">
                    Score: {average} 
                </div>
                <div className="mx-4 text-neutral-500 text-left">
                    Based on {reviews.length} { reviews.length === 1 ? 'review' : 'reviews'}
                </div>
            </div>
        
        </Link>
    );
};

export default GameCard;