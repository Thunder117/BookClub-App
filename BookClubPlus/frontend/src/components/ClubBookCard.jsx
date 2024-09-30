import { useState } from 'react';
import { Link } from "react-router-dom";

const ClubBookCard = (props) => {
    const [showDeleteOption, setShowDeleteOption] = useState(false); // Toggle for delete option
    
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
        <div className="relative flex flex-col gap-2 justify-center items-center h-80 min-w-56">

            <div className="flex w-full justify-end">
                {showDeleteOption && (
                    <div className="absolute top-0 right-0 bg-white shadow-md p-2 rounded-md">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                        <button
                            onClick={toggleDeleteOption}
                            className="ml-2 bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
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

            <Link to = {`../works/${props.id}`} className="bg-neutral-100 flex flex-col h-72 w-52 rounded-lg ease-out duration-500 hover:h-80 hover:w-56">

                <div className="flex justify-center w-full h-60">
                    <img 
                        alt="book_cover" 
                        src={`https://covers.openlibrary.org/b/id/${props.image}-M.jpg`} 
                        className="h-full" 
                    />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    {props.title}
                </div>

            </Link>
        </div>
    );
};

export default ClubBookCard;