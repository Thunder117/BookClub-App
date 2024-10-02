import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from "react-router-dom";
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

// Components
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';

const BookPage = () => {
    const [book, setBook] = useState(); 
    const [userClubs, setUserClubs] = useState();
    const [isLoadingClubs, setIsLoadingClubs] = useState(false);  
    const [hasDescription, setHasDescription] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            fetchUserClubs();
        }
        fetchAll();
            
    }, [user]);
    
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
                setHasDescription("Value Description");
            } else {
                setHasDescription("Regular Description");
            }
        };

        if (book.hasOwnProperty("description")) {
            checkTypeOfDescription(book);   
        }
    };

    const fetchUserClubs = async () => {
        try {
            setIsLoadingClubs(true);
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/${user.username}`);
            const json = await response.json();
            setUserClubs(json);
        } catch (error) {
            console.error('Error fetching user clubs:', error);
        } finally {
            setIsLoadingClubs(false); // Ensure loading state is reset after fetching
        }
    };

    const handleAddBookToClub = async (clubId) => {
        if (!user) {
            navigate(`/login/${id}`);
            return;
        }
    
        const bookDetails = {
            bookId: id, // The ID of the book from the Open Library
            bookTitle: book.title, // Assuming you have the title in the book state
            bookImage: book.covers[0]
        };
    
        try {
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/addBook/${clubId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`, 
                },
                body: JSON.stringify(bookDetails), // Send the book details
            });
    
            const json = await response.json();
    
            if (response.ok) {
                console.log('Book added to club:', json);
            } else {
                console.error(json.error);
            }

            navigate('/clubs');
        } catch (error) {
            console.error('Error adding book to club:', error);
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

    const checkForUserAddClub = () => {
        if(checkForUserToLink()) { 
            toggleModal();
        }
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
    <>
        <NavBar showNav/>
        
        <div className="font-sans flex justify-center min-h-screen pt-20 bg-neutral-100"> {/* ALL */}

            <div className="flex flex-col md:w-4/6 w-5/6 py-2">

            <>
                <Link to={`/`} className="flex gap-2 p-2 m-2 w-32 font-bold justify-center hover:text-white duration-300 hover:bg-gray-600 rounded-full transition">
                    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                    </svg>
                    <div>
                        Go back
                    </div>
                </Link>
                    
                { book &&
                
                    <div className="flex flex-col sm:flex-row w-full min-h-[500px] break-words">

                        <div className="flex flex-col sm:w-1/3 justify-center flex-none">
                            <div className="flex flex-col px-2 py-2 my-4 gap-4">
                                <button onClick={checkForUserCreateClub} className="bg-blue-500 hover:bg-blue-600 transition text-white rounded-full font-bold px-6 py-2">
                                    Create a club with this book
                                </button>

                                <button onClick={checkForUserAddClub} className="bg-blue-500 hover:bg-blue-600 transition text-white rounded-full font-bold px-6 py-2">
                                    Add this book to one of your clubs
                                </button>
                            </div>

                            <div className="w-full min-h-96 max-h-96 flex justify-center">
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

        <Modal isOpen={isModalOpen} onClose={toggleModal}>
            <h2 className="text-xl text-center font-bold mb-4">Add this book to one of your clubs</h2>

            <div className="flex flex-col gap-2 h-60 overflow-y-auto">
                {userClubs && userClubs.length === 0 &&
                    <div className='h-full flex justify-center items-center'>
                        Oops, it looks like you still don't have any clubs!
                    </div>
                }
                {userClubs && userClubs.map((club, index) => (
                    <div key={index} className="p-2">
                        <button
                            onClick={() => handleAddBookToClub(club._id)} 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-4 py-2"
                        >
                            {club.title}
                        </button>
                    </div>
                ))}
                {isLoadingClubs && (
                    <div className="flex justify-center h-full items-center">
                        <Spinner center={false} width={"100px"} height={"100px"} />
                    </div>
                )}
            </div>

            <div className='flex justify-end'>
                <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-600 transition text-white rounded-full font-bold w-40 p-2 mt-4">
                    Close
                </button>
            </div>
        </Modal>

    </>
    );
    
};

export default BookPage;