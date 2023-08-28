import { useState, useEffect } from 'react';

// components
import GameInformationLink from './GameInformationLink';

const GameInformation = (props) => {
	const [average, setAverage] = useState('n/a');

	useEffect(() => {
		getReviewsAverage();

    }, [props.reviews]);

    const getReviewsAverage = () => {
        if (props.reviews.length === 0) return;
		
        let allRatingsSum = 0;
        for (let i = 0; i < props.reviews.length; i++) {
            allRatingsSum += props.reviews[i].rating;
        }
		
		allRatingsSum = (allRatingsSum / props.reviews.length).toFixed(1);
		
		setAverage(allRatingsSum);
    };

	const goToReviews = () => {
		window.scrollTo({
            top: 650,
            behavior: "smooth",
        });
	};

	return(
		<div className="relative overflow-hidden">

			<img src="/bg-triangles.png" className="h-full w-full absolute -z-10 blur-sm brightness-75 scale-110 object-cover" alt="" />

			<div className="flex flex-col lg:flex-row justify-start my-4 lg:my-0 w-full lg:h-[500px]">

				<div className={`flex-none h-[280px] lg:h-[400px] self-center lg:mx-16`}>
					<img src={`/covers/${props.videogame.imagePath}`} alt="cover" className="h-full rounded-md select-none" />
				</div>

				<div className="flex flex-col mx-2 lg:mx-0 lg:flex-row w-full h-full self-center">

					<div className="flex flex-col basis-2/4 lg:basis-3/4 my-2 lg:my-8 py-2">

						<div className="text-4xl text-center lg:text-left font-bold tracking-wide text-white">
							{props.videogame.title}
						</div>

						<div className="py-4 text-gray-200">
							{props.videogame.description}
						</div> 
						
						<div className="flex flex-col h-full justify-end">
							<GameInformationLink title={"DEVELOPER"} answer={props.videogame.developer}/>
							<GameInformationLink title={"PUBLISHER"} answer={props.videogame.publisher}/>
							<GameInformationLink title={"GENRE"} answer={props.videogame.genre}/>
							{ props.videogame.franchise &&
								<GameInformationLink title={"FRANCHISE"} answer={props.videogame.franchise}/>	
							}
							<GameInformationLink title={"RELEASE DATE"} answer={props.videogame.launchDate}/>
						</div>

					</div>

					<div className="basis-2/4 lg:basis-1/6 lg:m-4 lg:py-8 my-8">

						<div className="text-8xl text-white font-bold tracking-wide lg:mt-14 text-center">
							{ average } 
						</div>

						<div className="text-2xl font-semibold text-center text-white m-2">
							Score Average
						</div>

						<button onClick={goToReviews} className={`text-xl rounded-sm w-44 h-14 transition text-white font-semibold my-16 mx-16 hover:bg-green-700 ${(window.innerWidth < 992) && 'hidden'}`}>
							See Reviews
						</button>

					</div>
					
				</div>

			</div>
			
		</div>
	);
};

export default GameInformation;