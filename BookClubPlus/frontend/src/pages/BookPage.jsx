import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from "react-router-dom";

// Components
import NavBar from '../components/NavBar';

const BookPage = () => {
    const [book, setBook] = useState(); 
    const [hasDescription, setHasDescription] = useState(false); 
    const [creatingClub, setCreatingClub] = useState(true); 

    // form values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [emptyFields, setEmptyFields ] = useState([]);
    const [error, setError] = useState(null);

    const { user } = useAuthContext();
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
    


    const handleSubmit = async (event) => {
        event.preventDefault();

        const books = [book.title]
        const members = [user.username]
        const createdDate = new Date();

        const club = { title, description, books, members, createdDate };

        const response = await fetch('https://book-club-react-app-backend.onrender.com/api/clubs', {
            method: 'POST',
            body: JSON.stringify(club),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            console.log('Could not create club', json);
        }
        if (response.ok) {
            setTitle('');
            setDescription('');
            setEmptyFields([]);
            setError(null);
            console.log('New club created', json);
        }

    };

    return (
    <>
        <NavBar showNav/>
        
        <div className="font-sans flex justify-center py-24 min-h-screen w-full bg-neutral-100"> {/* ALL */}

            <div className="flex flex-col py-2 w-5/6 md:w-4/6 h-full bg-red-300">

            { creatingClub 
            ?
            <>
                <form className="flex flex-col h-full text-neutral-200" onSubmit={handleSubmit}>

                    <div className="text-xl font-semibold pb-2 text-white">Review this game!</div>

                    <div className="flex flex-col lg:flex-row pb-4 gap-4">

                        <div className="lg:basis-5/6 flex gap-2">
                            <label htmlFor='title' className="cursor-pointer text-lg">Title</label>
                            <input
                                id='title'
                                type='text'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                maxLength="38"
                                className={emptyFields.includes('title') ? 'border-2 border-red-400 text-black rounded-sm w-full h-8 px-2' : 'text-black rounded-sm w-full h-8 px-2'}
                            />
                        </div>

                    </div>

                    <textarea
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className={emptyFields.includes('description') ? 'border-2 border-red-400 h-full text-black rounded-sm px-2' : 'h-full text-black rounded-sm p-2'}
                    />

                    <div className="flex flex-row justify-end w-full">
                        {error && <div className="text-red-400 p-2 text-lg">{error}</div>}
                        <button className="p-2 text-lg">Done!</button>
                    </div>

                </form>
            </>
            :
            <>
                <Link to = {`/`} className="w-24 my-2 font-bold text-xl text-center">
                    Go back
                </Link>
                    
                { book &&
                
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
                
                }
                
            </>
            }

            </div>
    
        </div>

    </>
    );
    
};

export default BookPage;