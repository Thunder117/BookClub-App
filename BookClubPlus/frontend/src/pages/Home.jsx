import { useState, useEffect } from 'react';
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';

// components
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import BooksShowcase from '../components/BooksShowcase';

const Home = () => {
    const [showNav, setShowNav] = useState(false); 
    const [textValue, setTextValue] = useState("");
    const [books, setBooks] = useState();  
    const [isLoadingBooks, setIsLoadingBooks] = useState(false);  
    const [apiAvailable, setApiAvailable] = useState();  

    useEffect(() => {
        setWindowConfig();
    }, []);

    const fetchBook = async (e) => {
        e.preventDefault();
        if (textValue === "" || textValue.length < 2) return;

        setBooks();
        setApiAvailable();
        setIsLoadingBooks(true);

        // Replace this with your Google API Key
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
        
        // Google Books API URL
        const url = `https://www.googleapis.com/books/v1/volumes?q=${textValue}&key=${apiKey}`;
        
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
            setApiAvailable(true);

            if (json.items && json.items.length > 0) {
                setBooks(json.items); // Google Books returns an array of items in 'items'
            } else {
                setBooks(0); // No books found
            }
        } else {
            setApiAvailable(false);
        }

        setIsLoadingBooks(false);
    };

    const setWindowConfig = () => {
        if (window.innerWidth > 992) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    setShowNav(true);
                } else {
                    setShowNav(false);
                }
            });
        } else {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    setShowNav(true);
                } else {
                    setShowNav(false);
                }
            });
        }
    };
    
    return (
        <>
            <NavBar showNav={showNav}/>

            <div className="font-sans flex min-h-screen flex-col w-full bg-neutral-100">
                <div className="pt-28 bg-gradient-to-br from-blue-500 to-blue-600">
                    <div className="flex justify-center">
                        <h2 className="font-bold text-3xl text-white w-4/6 text-center">
                            Choose a book to start a Club!
                        </h2>
                    </div>

                    <div className="flex justify-center mb-4">
                        <SearchBar 
                            search={fetchBook} 
                            textValue={textValue} 
                            setTextValue={setTextValue}
                            placeHolder="Mistborn..."
                        />
                    </div>
                </div>

                <div className="flex justify-center h-full">
                    {isLoadingBooks && (
                        <div className="h-full md:w-5/6 flex justify-center flex-wrap py-6">
                            <Spinner  
                                center={false} 
                                width={"150px"} 
                                height={"150px"}
                            />
                        </div>
                    )}

                    {apiAvailable === true && (
                        <>
                            {books !== 0 
                            ? 
                            (
                                <BooksShowcase books={books} isLoadingBooks={isLoadingBooks}/>
                            ) 
                            : 
                            (
                                <div className="h-full md:w-5/6 flex justify-center text-lg font-semibold text-gray-700 py-10">
                                    We didn't find any book with that name...
                                </div>
                            )}
                        </>
                    )}

                    {apiAvailable === false && (
                        <div className="h-full md:w-5/6 flex justify-center text-lg font-semibold text-gray-700 py-10">
                            The API is not available, please try again in a few moments.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;