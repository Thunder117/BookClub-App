import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from "react-router-dom";
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';

// Components
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';

const BookPage = () => {
    const [book, setBook] = useState(); 
    const [userClubs, setUserClubs] = useState();
    const [isLoadingClubs, setIsLoadingClubs] = useState(false);  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useAuthContext();
    const { id } = useParams();  // 'id' is the Google Books API volume ID
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            fetchUserClubs();
        }
        fetchBook();
    }, [user]);

    const fetchBook = async () => {
        try {
            const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
            
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Error fetching book data: ${response.statusText}`);
            }
            const json = await response.json();
            setBook(json.volumeInfo);
        } catch (error) {
            console.error('Error fetching book from Google Books API:', error);
            setBook(null); // Clear the book state or show error UI
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
            setIsLoadingClubs(false); 
        }
    };

    const handleAddBookToClub = async (clubId) => {
        if (!user) {
            navigate(`/login/${id}`);
            return;
        }

        const bookDetails = {
            bookId: id, 
            bookTitle: book.title, 
            bookImage: book.imageLinks.thumbnail  // Update for Google Books API
        };

        try {
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/addBook/${clubId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`, 
                },
                body: JSON.stringify(bookDetails), 
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
    };

    const checkForUserCreateClub = () => {
        if(checkForUserToLink()) {
            navigate(`/createclub/${id}`);
        }
    };

    const checkForUserAddClub = () => {
        if(checkForUserToLink()) { 
            toggleModal();
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
    <>
        <NavBar showNav/>
        
        <div className="font-sans flex justify-center min-h-screen pt-20 bg-neutral-100"> {/* ALL */}

            <div className="flex flex-col w-5/6 py-2">

            <>
                <Link to={`/`} className="flex gap-2 p-2 m-2 w-32 font-bold justify-center hover:text-white duration-300 hover:bg-gray-600 rounded-full transition">
                    <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                    </svg>
                    <div>
                        Go back
                    </div>
                </Link>
                    
                {!book && (
                    <div className="flex justify-center h-full items-center">
                        <Spinner center={false} width={"100px"} height={"100px"} />
                    </div>
                )}

                { book && (
                    <div className="flex justify-center items-center flex-col md:flex-row w-full min-h-[500px] break-words">

                        <div className="flex flex-col md:w-1/3 justify-center flex-none">
                            <div className="flex flex-col px-2 py-2 my-4 gap-4">
                                <button onClick={checkForUserCreateClub} className="bg-blue-500 hover:bg-blue-600 transition text-white rounded-full font-bold px-6 py-2">
                                    Create a club with this book
                                </button>

                                <button onClick={checkForUserAddClub} className="bg-blue-500 hover:bg-blue-600 transition text-white rounded-full font-bold px-6 py-2">
                                    Add this book to one of your clubs
                                </button>
                            </div>

                            <div className="w-full flex justify-center p-1 h-80">
                                <img alt="book_cover" src={book.imageLinks?.thumbnail || 'placeholder.jpg'} className="rounded-lg h-full select-none" />
                            </div>
                            
                        </div>

                        <div className="flex p-4 flex-col md:w-2/3">

                            <div className="text-center p-2 font-bold text-2xl">
                                {book.title}
                            </div>

                            <div className="py-2 md:p-4 max-h-[450px] font-semibold text-lg overflow-auto"
                                dangerouslySetInnerHTML={{ __html: book.description || "No description available for this book" }}>
                            </div>
                                
                        </div>

                    </div>
                )}

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