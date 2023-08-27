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
            navigate(`/createclub/${id}`);
        } else {
            navigate(`/login/${id}`);
        }
    }

    // TODO: Add more content to this page
    return (
    <>
        <NavBar showNav/>
        
        <div className="font-sans flex justify-center min-h-screen pt-20 bg-neutral-100"> {/* ALL */}

            <div className="flex flex-col md:w-4/6 w-5/6 py-2">

            <>
                <Link to={`/`} className="w-24 my-2 font-bold text-xl text-center">
                    Go back
                </Link>
                    
                { book &&
                
                    <div className="flex flex-col sm:flex-row w-full min-h-[500px] break-words">

                        <div className="flex flex-col sm:w-1/3 justify-center flex-none">

                            <div className="w-full">
                                <img alt="book_cover" src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`} className="w-full select-none" />
                            </div>

                            <button onClick={checkForUserToLink} className="bg-sky-600 m-2 text-white rounded-sm font-semibold px-6 py-4 my-4">
                                CREATE CLUB WITH THIS BOOK
                            </button>
                            
                        </div>

                        <div className="flex p-4 flex-col sm:w-2/3">

                            <div className="text-center p-2 font-bold text-2xl">
                                {book.title}
                            </div>

                            <div className="py-2 md:p-4 font-semibold text-lg">
                                
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