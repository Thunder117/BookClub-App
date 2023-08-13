import { useState, useEffect } from 'react';

// components
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import BooksShowcase from '../components/BooksShowcase';

const Home = () => {
    const [showNav, setShowNav] = useState(false); 
    const [textValue, setTextValue] = useState("");
    const [books, setBooks] = useState();  

    useEffect(() => {
        setWindowConfig();
        
    }, []);

    const fetchBook = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`http://openlibrary.org/search.json?title=${textValue}`);
        const json = await response.json();

        if(json.docs[0]) {
            setBooks(json);

            console.log(json);
            console.log("value found!");
        } else {
            console.log("not a single value");
        }
        
    };

    const setWindowConfig = () => {
        if(window.innerWidth > 992) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    setShowNav(true);
                } else {
                    setShowNav(false);
                }
            },[]);
        } else {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    setShowNav(true);
                } else {
                    setShowNav(false);
                }
            },[]);
        }
    };
    
    return (
        <>
            <NavBar showNav={showNav}/>

            <div className="font-sans flex min-h-screen flex-col w-full bg-neutral-100"> {/* ALL */}

                <div className="pt-28 bg-gradient-to-br from-sky-500 to-indigo-500">

                    <div className="flex justify-center">
                        <h2 className="font-bold text-3xl text-white w-4/6 text-center">
                            Choose a book to start a Club!
                        </h2>
                    </div>

                    <div className="flex justify-center mb-4">
                        <SearchBar fetchBook={fetchBook} textValue={textValue} setTextValue={setTextValue}/>
                    </div>

                </div>

                <div className="flex justify-center h-full">
                    
                    <BooksShowcase books={books}/>

                </div>

            </div>
 
        </>
    );
};

export default Home;