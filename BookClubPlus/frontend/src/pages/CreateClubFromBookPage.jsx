import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

// Components
import NavBar from '../components/NavBar';
import CreateClubFromBookForm from '../components/CreateClubFromBookForm';

const CreateClubFromBookPage = () => {
    const [book, setBook] = useState(null); // Use 'null' to avoid rendering issues before book is fetched
    const { user } = useAuthContext();
    const { id } = useParams(); // 'id' should be the Google Books volumeId

    useEffect(() => {
        fetchBook(); // Fetch book on mount
    }, [id]); // Ensure effect runs again if 'id' changes

    const fetchBook = async () => {
        try {
            // Fetch book details using the Google Books API
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`);
            const json = await response.json();

            if (response.ok) {
                setBook(json); // Set the entire book object to the state
            } else {
                console.error('Error fetching book:', json);
            }
        } catch (error) {
            console.error('Error fetching book:', error);
        }
    };

    return (
        <>
            <NavBar showNav />

            <div className={`font-sans flex justify-center min-h-screen w-full bg-gradient-to-br from-sky-500 to-indigo-500`}>
                <div className={`flex flex-col md:w-4/6 w-full`}>
                    {book ? (
                        <CreateClubFromBookForm 
                            book={{
                                id: book.id, // Pass the book ID
                                title: book.volumeInfo.title, // Pass the book title
                                image: book.volumeInfo.imageLinks?.thumbnail // Pass the book image
                            }} 
                            user={user} 
                        />
                    ) : (
                        <div>Loading...</div> // Simple loading message while fetching data
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateClubFromBookPage;