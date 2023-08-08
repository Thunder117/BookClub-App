import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// components
import Review from "./Review";

const UserReviews = (props) => {
    const [reviews, setReviews] = useState();

    useEffect(() => {
        const fetchAll = async () => {
            await fetchReviewsUser();
        };
        
        fetchAll();
    }, []);
    
    const fetchReviewsUser = async () => {
        const response = await fetch(`https://collection-react-app-backend.onrender.com/api/reviews/user/${props.user.username}`);

        const json = await response.json();

        setReviews(json);
    };

    return (
        <div className="flex flex-col gap-6 lg:mx-28 my-6">
            { reviews &&
            <>
                
                { reviews.length === 0 &&
                    <Link to="/games" className="text-2xl hover:text-green-500">
                        Review a game!
                    </Link>
                }
                
                {
                    reviews.map( review => {
                        return (
                            <div key={review._id}>

                                <div className="text-xl px-2 font-semibold text-gray-600">
                                    {review.gamename}
                                </div>

                                <Review review={review} user={props.user} fetchReviews={fetchReviewsUser} goToTop={props.goToTop}/>

                            </div>
                        )
                    })
                }
            </>
            }
        </div>
    );
};

export default UserReviews;