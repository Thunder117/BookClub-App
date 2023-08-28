import { useAuthContext } from '../../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import { Link } from "react-router-dom";

// components
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const ReviewSpace = (props) => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        },[]);

    }, []);
    
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const showReviewFormSwitch = () => {
        setShowReviewForm(oldState => !oldState);
    };

    return(
        <div className="relative flex flex-row w-full min-h-screen h-full">
            
            <div className="flex flex-col my-2 lg:mx-40 gap-4 mt-4">

                { user 
                ?   
                
                    <div className="mx-2">
                        { showReviewForm 
                        ? 
                        <>
                            <button 
                            onClick={showReviewFormSwitch} 
                            className="py-2 my-2 px-8 text-lg rounded-md font-semibold bg-green-600 text-white">
                                Cancel review
                            </button>
                            <ReviewForm videogame={props.videogame} user={user} fetchReviews={props.fetchReviews}/>
                        </>
                        :
                            <button 
                            onClick={showReviewFormSwitch} 
                            className="py-2 my-2 px-8 text-lg rounded-md font-semibold bg-green-600 text-white">
                                Write a review
                            </button>
                        } 
                    </div>
                
                :
                    <div className="py-4 px-2">
                        <Link to={`/login`} onClick={goToTop} className="text-2xl hover:text-green-500">
                            Log in to review this game!
                        </Link>
                    </div>
                }
                
                { props.reviews && props.reviews.length !== 0 && 
                <>
                    <div className="flex h-10 w-full items-end">
                        <div className="text-2xl font-semibold mx-2 border-b-4 border-green-700 rounded-sm">
                            User Reviews
                        </div>
                    </div>

                    { props.reviews.map( review => {
                        return <Review review={review} user={user} goToTop={goToTop} fetchReviews={props.fetchReviews} key={review._id}/>
                    })}
                </>
                }

                { props.reviews.length === 0 &&
                    <div className="text-4xl font-semibold w-[900px] h-[200px] my-10 mx-40">
                        So empty... why don't you write a review?
                    </div>
                }

            </div>
            
            <div className="fixed bottom-10 right-6 lg:right-20">

                {showTopBtn && (
                    <button
                        className="flex justify-center items-center h-16 w-16 lg:h-20 lg:w-20 bg-white text-green-600 rounded-full text-5xl shadow-lg"
                        onClick={goToTop}
                    > 
                        <FaAngleUp />
                    </button>
                )}

            </div>

        </div>
    )
};

export default ReviewSpace;