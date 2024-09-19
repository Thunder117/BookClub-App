import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from "react-router-dom";

// Components
import NavBar from '../components/NavBar';

const BookPage = () => {
    const [book, setBook] = useState(); 
    const [hasDescription, setHasDescription] = useState(false); 

    const { user } = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        
        fetchAll();
            
    }, []);
    
    const fetchAll = async () => {
        const book = await fetchBook();
        await checkForDescription(book);
    };

    const fetchBook = async () => {
        const response = await fetch(`http://openlibrary.org/works/${id}.json`);
        const json = await response.json();
    
        setBook(json);

        return json;
    };
    
    const checkForDescription = (book) => {

        const checkTypeOfDescription = (book) => {
            if(book.description.value) {
                console.log("Value description");
                setHasDescription("Value Description");
            } else {
                console.log("Regular description");
                setHasDescription("Regular Description");
            }
        };

        if (book.hasOwnProperty("description")) {

            checkTypeOfDescription(book);   

        }
    };

    const checkForUserToLink = () => {
        if(user) {
            return true;
        } else {
            navigate(`/login/${id}`);
        }
    }

    const checkForUserCreateClub = () => {
        if(checkForUserToLink()) {
            navigate(`/createclub/${id}`);
        }
    }

    //TODO:
    const checkForUserAddClub = () => {
        if(checkForUserToLink()) { 
            navigate(`/addtoclub/${id}`);
        }
    }

    return (
    <>
        <NavBar showNav/>
        
        <div className="font-sans flex justify-center min-h-screen pt-20 bg-neutral-100"> {/* ALL */}

            <div className="flex flex-col md:w-4/6 w-5/6 py-2">

            <>
                <Link to={`/`} className="flex gap-2 p-2 m-2 w-36 font-bold text-xl items-center justify-start hover:bg-blue-400 rounded-full transition">
                    <svg class="h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                    </svg>
                    Go back
                </Link>
                    
                { book &&
                
                    <div className="flex flex-col sm:flex-row w-full min-h-[500px] break-words">

                        <div className="flex flex-col sm:w-1/3 justify-center flex-none">
                            <div className="flex flex-col px-2 py-2 my-4 gap-4">
                                <button onClick={checkForUserCreateClub} className="bg-blue-400 hover:bg-blue-500 transition text-white rounded-full font-bold px-6 py-2">
                                    Create a club with this book
                                </button>

                                <button onClick={checkForUserAddClub} className="bg-blue-400 hover:bg-blue-500 transition text-white rounded-full font-bold px-6 py-2">
                                    Add this book to one of your clubs
                                </button>
                            </div>

                            <div className="w-full max-h-96 flex justify-center">
                                <img alt="book_cover" src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`} className="rounded-md h-full select-none" />
                            </div>
                            
                        </div>

                        <div className="flex p-4 flex-col sm:w-2/3">

                            <div className="text-center p-2 font-bold text-2xl">
                                {book.title}
                            </div>

                            <div className="py-2 md:p-4 max-h-[450px] font-semibold text-lg overflow-auto">
                                
                                {hasDescription
                                ?   
                                <>
                                    {hasDescription === "Regular Description"
                                    ? 
                                        book.description
                                    :
                                        book.description.value
                                    }
                                </>
                                :
                                    "No description available for this book"
                                }
                                
                            </div>
                                
                        </div>

                    </div>
                
                }
                
            </>

            </div>
    
        </div>

    </>
    );
    
};

export default BookPage;