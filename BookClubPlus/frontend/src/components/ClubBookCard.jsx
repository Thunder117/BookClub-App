import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const ClubBookCard = (props) => {
    const [bookData, setBookData] = useState(null); // Store book data from Google Books API
    const [showDeleteOption, setShowDeleteOption] = useState(false); // Toggle for delete option

    // Fetch book data using the Google Books API
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${props.id}?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`);
                const data = await response.json();
                setBookData(data.volumeInfo); // Store volumeInfo
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };
        fetchBookData();
    }, [props.id]);

    const toggleDeleteOption = () => {
        setShowDeleteOption(!showDeleteOption); // Toggle the visibility of the delete option
    };

    const handleDelete = async () => {
        if (!props.token) {
            console.error('Token is missing!');
            return;
        }
        try {
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/${props.clubId}/removeBook`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`, 
                },
                body: JSON.stringify({
                    bookId: props.id, // Send book ID for deletion
                }),
            });

            if (response.ok) {
                props.onBookDeleted(props.id); // Call the callback function to update UI on deletion
            } else {
                console.error('Error deleting book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="relative flex flex-col gap-2 justify-center items-center h-80 lg:w-56 w-72 flex-none">

            <div className="flex w-full justify-end">
                {showDeleteOption && (
                    <div className="absolute top-0 right-0 bg-neutral-100 shadow-md p-2 flex gap-2 rounded-lg">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={toggleDeleteOption}
                            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <button onClick={toggleDeleteOption} className="flex justify-center w-10 h-full">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                    </svg>
                </button>
            </div>

            {bookData && (
                <Link to = {`../book/${props.id}`} className="bg-neutral-100 flex flex-col h-72 w-full hover:w-80 lg:hover:w-60 rounded-xl ease-out duration-500">
                    <div className="flex justify-center w-full h-60">
                        <img 
                            alt="book_cover" 
                            src={bookData.imageLinks?.thumbnail || 'https://via.placeholder.com/150'} 
                            className="h-full" 
                        />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="max-w-lg truncate">
                            {bookData.title}
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default ClubBookCard;