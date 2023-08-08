import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Review = (props) => {  
    const [yesButtonSelected, setYesButtonSelected] = useState(false);  
    const [noButtonSelected, setNoButtonSelected] = useState(false);  
    const [showMore, setShowMore] = useState(false);
    const [totalReviewUsers, setTotalReviewUsers] = useState(props.review.votes.length);  
    const [goodReviewUsers, setGoodReviewUsers] = useState(0);  
    const username = props.review.username;
    let voteUsername = '';

    if (props.user) {
        voteUsername = props.user.username;
    }

    useEffect(() => {

        setButtonSelected();

    }, []);

    const setButtonSelected = () => {
        let counter = 0;
        for(let i = 0; i < props.review.votes.length; i++) {

            if(props.review.votes[i].vote === true) {
                counter += 1;
            }
            if (props.user) {
                if (props.review.votes[i].username === props.user.username) {

                    if(props.review.votes[i].vote === true) {
                        setYesButtonSelected(true);
                    } else {
                        setNoButtonSelected(true);
                    }

                }
            }
            
        }
        setGoodReviewUsers(counter);
    };

    const handleDelete = async () => {
      
        await fetch(`https://collection-react-app-backend.onrender.com/api/reviews/${props.review._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
            }
        });
        
        await props.fetchReviews();
    };

    const handleShowSwitch = () => {
        setShowMore(!showMore);
    };

    const handleYes = async () => {
        if( yesButtonSelected) {
            setYesButtonSelected(false);
            setTotalReviewUsers(totalReviewUsers - 1);
            setGoodReviewUsers( goodReviewUsers - 1);
        } else {
            setYesButtonSelected(true);
            setNoButtonSelected(false);
            setGoodReviewUsers( goodReviewUsers + 1);

            if(!noButtonSelected) {
                setGoodReviewUsers( goodReviewUsers + 1);
                setTotalReviewUsers(totalReviewUsers + 1);
            } 
        }

        const vote = true ;
        const username = voteUsername;
        const parameters = { username, vote };
        
        await fetch(`https://collection-react-app-backend.onrender.com/api/reviews/${props.review._id}`, {
            method: 'POST',
            body: JSON.stringify(parameters),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
            }
        });
    };

    const handleNo = async () => {
        if( noButtonSelected) {
            setNoButtonSelected(false);

            setTotalReviewUsers(totalReviewUsers - 1);
        } else {
            setNoButtonSelected(true);
            setYesButtonSelected(false);

            if(!yesButtonSelected) {
                setTotalReviewUsers(totalReviewUsers + 1);
            }  else {
                setGoodReviewUsers( goodReviewUsers - 1);
            }
        }

        const vote = false ;
        const username = voteUsername;
        const parameters = { username, vote };
        
        await fetch(`https://collection-react-app-backend.onrender.com/api/reviews/${props.review._id}`, {
            method: 'POST',
            body: JSON.stringify(parameters),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
            }
        });
    };

    return(
        <div className="flex flex-row w-full lg:w-[900px] min-h-[250px] lg:min-h-[220px] shadow-sm">

            <div className="flex flex-col p-4 w-full lg:w-4/5">
                
                <div className="flex h-full flex-col">

                    <div className="text-clip flex min-h-[40px] justify-between">

                        <div className="basis-3/4 font-bold text-xl">
                            <button className="hover:text-green-700 overflow-hidden">{props.review.title}</button>
                        </div>

                        <div className="flex items-center">
                            <div className="flex">
                            { props.user && props.user.username === props.review.username &&
                            
                                <button onClick={handleDelete} className="hover:text-green-600 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            
                            }
                            </div>

                            <div className={`text-2xl block font-bold tracking-wide text-green-600 ${(window.innerWidth > 992) && 'hidden'}`}>
                                {props.review.rating}
                            </div>
                        </div>

                    </div>
                    
                    { username && (
                        <>
                            <div className={`text-gray-400 ${(window.innerWidth < 992) && 'hidden'}`}>
                                By <button className="hover:text-green-600">{username}</button> | Reviewed: {new Date(props.review.createdAt).toLocaleDateString("en-US")}
                            </div>
                            <div className={`text-gray-400 ${(window.innerWidth > 992) && 'hidden'}`}>
                                <div>By <button className="hover:text-green-600">{username}</button></div>
                                <div>Reviewed: {new Date(props.review.createdAt).toLocaleDateString("en-US")}</div>
                            </div>
                        </>
                    )}

                    { props.review.description.length > 270 
                    ?
                        <div className="overflow-hidden break-words">
                            { showMore 
                            ?   
                            <>
                                <div>
                                    {props.review.description}
                                </div>
                                <div>
                                    <button 
                                    onClick={handleShowSwitch}
                                    className="text-green-600 font-semibold">
                                        Show less
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                <div>
                                    {props.review.description.slice(0, 270)}...
                                </div>
                                <div>
                                    <button 
                                    onClick={handleShowSwitch}
                                    className="text-green-600 font-semibold">
                                        Show more
                                    </button>
                                </div>
                            </>
                            }
                        </div>
                    :
                        <div className="overflow-hidden break-words">
                            {props.review.description}
                        </div>
                    }

                </div>

                <div className="flex flex-row mt-2 h-10 items-end justify-between">
                    <div className={`text-gray-400 ${(window.innerWidth < 992) && 'hidden'}`}>
                        {goodReviewUsers} of {totalReviewUsers} users found this review helpful
                    </div>
                    <div className={`text-gray-400 ${(window.innerWidth > 992) && 'hidden'}`}>
                        {goodReviewUsers} of {totalReviewUsers} positive rating
                    </div>
                    <div className="h-full flex flex-row justify-end gap-4">
                        { props.user 
                        ? 
                        <>
                            
                            { yesButtonSelected 
                            ? 
                                <button onClick={handleYes} className="px-4 rounded-sm shadow text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                    </svg>
                                </button>
                            :
                                <button onClick={handleYes} className="px-4 rounded-sm shadow hover:text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                    </svg>
                                </button>
                            }
                            
                            { noButtonSelected
                            ?
                                <button onClick={handleNo} className="px-4 rounded-sm shadow text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                                    </svg>

                                </button>
                            :
                                <button onClick={handleNo} className="px-4 rounded-sm shadow hover:text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                    </svg>
                                </button>
                            }
                        </>
                        :
                        <>
                            <Link to={`/login`} onClick={props.goToTop} className="self-center text-gray-400 hover:text-green-500">
                                Log in to rate this review
                            </Link>
                            <button className="px-4 font-semibold rounded-sm text-lg shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                            </button>
                            <button className="px-4 font-semibold rounded-sm text-lg shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                </svg>
                            </button>
                        </>
                        }
                    </div>
                </div>

            </div>

            <div className={`flex justify-center items-center w-1/5 ${(window.innerWidth < 992) && 'hidden'}`}>
                
                <div className={`text-6xl font-bold tracking-wide text-green-600 w-full py-8 text-center border-l-2`}>
                    {props.review.rating}
                </div>

            </div>

        </div>
    )
};

export default Review;