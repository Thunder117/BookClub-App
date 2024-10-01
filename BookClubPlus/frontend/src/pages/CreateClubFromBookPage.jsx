import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

// Components
import NavBar from '../components/NavBar';
import CreateClubFromBookForm from '../components/CreateClubFromBookForm';

const CreateClubFromBookPage = () => {
    const [book, setBook] = useState();

    const { user } = useAuthContext();
    const { id } = useParams();

    useEffect(() => {
        
        fetchBook();
            
    }, []);

    const fetchBook = async () => {
        const response = await fetch(`http://openlibrary.org/works/${id}.json`);
        const json = await response.json();
    
        setBook(json);

        return json;
    };

    return (
        <>
            <NavBar showNav/>

            <div className={`font-sans flex justify-center min-h-screen w-full bg-gradient-to-br from-sky-500 to-indigo-500`}> {/* ALL */}

                <div className={`flex flex-col md:w-4/6 w-full`}>

                { book &&
                    
                    <CreateClubFromBookForm book={book} user={user} id={id} />
                }
                
                </div>

            </div>

        </>
    );
};

export default CreateClubFromBookPage;