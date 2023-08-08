import { useState } from 'react';
import { Link } from "react-router-dom";

const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(1); 
    
    const prev = () => {
        if(currentSlide <= 1) {
            setCurrentSlide(3);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const next = () => {
        if(currentSlide >= 3) {
            setCurrentSlide(1);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const goToTopInstant = () => {
        window.scrollTo({
            top: 0
        });
    };

    return(
        <div className="h-[330px] lg:h-[500px] w-full relative overflow-hidden">
               
            <div className={`h-full w-full ${(currentSlide !== 1) && "hidden"}`}>
                <img src="/slides/red-dead-redemption-2-slide.png" className="h-full w-full fixed -z-10 blur-sm brightness-75 scale-125 object-cover" alt="" />
                <Link to={`/games`} 
                    onClick={goToTopInstant}
                    className="absolute top-0 left-10 right-10 h-full lg:w-full justify-center text-gray-100 hover:text-white items-center z-10 flex"
                >
                    <div className="text-3xl lg:text-5xl text-center font-bold">
                        Check out all the Games
                    </div>
                </Link>``
            </div>
            
            <div className={`h-full w-full ${(currentSlide !== 2) && "hidden"}`}>
                <img src="/slides/hollow-knight-slide.png" className="h-full w-full fixed -z-10 blur-sm brightness-75 scale-125 object-cover" alt="" />
                <Link to={`/games`} 
                    onClick={goToTopInstant}
                    className="absolute top-0 left-10 right-10 h-full lg:w-full justify-center text-gray-100 hover:text-white items-center z-10 flex"
                >
                    <div className="text-3xl lg:text-5xl text-center font-bold">
                        Check out all the Games
                    </div>
                </Link>
            </div>
            
            <div className={`h-full w-full ${(currentSlide !== 3) && "hidden"}`}>
                <img src="/slides/breath-of-the-wild-slide.png" className="h-full w-full fixed -z-10 blur-sm brightness-75 scale-125 object-cover" alt="" />
                <Link to={`/login`} 
                    onClick={goToTopInstant}
                    className="absolute top-0 left-0 h-full w-full justify-center text-gray-100 hover:text-white items-center z-10 flex"
                >
                    <div className="text-3xl lg:text-5xl text-center font-bold">
                        Log in! 
                    </div>
                </Link>
            </div>

            <div className="absolute h-full w-full flex p-5 top-0 left-0 ">

                <div className="my-auto w-full flex justify-between">

                    <button onClick={prev} className="z-20 p-3 rounded-full shadow-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-white h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button onClick={next} className="z-20 p-3 rounded-full shadow-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-white h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>

            </div>

        </div>
    );
};

export default SlideShow;