import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

// Components
import NavBar from '../components/NavBar';

const BookPage = () => {
    const [book, setBook] = useState(); 
    const [hasDescription, setHasDescription] = useState(false); 

    const { id } = useParams();

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

    return (
        <>
            <NavBar showNav/>
            
            <div className="font-sans flex justify-center py-24 min-h-screen w-full bg-neutral-100"> {/* ALL */}

                <div className="flex py-2 w-5/6 md:w-4/6 flex-col h-full">

                    <Link to = {`/`} className="w-24 my-2 font-bold text-xl text-center">
                        Go back
                    </Link>
                        
                    { book &&
                    <>
                        <div className="flex flex-col md:flex-row w-full min-h-[500px] break-words">

                            <div className="flex flex-col md:w-1/3 justify-center flex-none">
                                <div className="w-full">
                                    <img alt="book_cover" src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`} className="w-full select-none" />
                                </div>
                                <button className="bg-sky-600 m-2 text-white rounded-sm font-semibold px-6 py-4 my-4">
                                    CREATE CLUB WITH THIS BOOK
                                </button>
                            </div>

                            <div className="flex p-4 flex-col md:w-2/3">

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
                    </>
                    }

                </div>
            
            </div>

        </>
    );
    
};

export default BookPage;