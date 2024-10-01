import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

const CreateClubFromBookForm = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);  
    const [emptyFields, setEmptyFields ] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const books = [{
            bookId: props.id,
            bookTitle: props.book.title,
            bookImage: props.book.covers[0].toString()
        }]
        const createdBy = props.user.username;

        const club = { title, description, books, createdBy };

        const response = await fetch('https://book-club-react-app-backend.onrender.com/api/clubs', {
            method: 'POST',
            body: JSON.stringify(club),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
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

            navigate('/clubs');
        }
        setIsLoading(false);
    };

    return (
    
        <div className="font-sans h-full flex justify-center items-center pt-20 lg:pt-16">

            { isLoading && 
                 <Spinner  
                    center={true} 
                    width={"150px"} 
                    height={"150px"}
                />
            }
          
            <div className="w-full h-full sm:w-[500px] sm:h-[500px] px-6 sm:py-4 sm:rounded-md drop-shadow-2xl bg-neutral-100">
                
                <form className="flex flex-col h-full gap-4 font-semibold tracking-wide" onSubmit={handleSubmit}>

                    <Link to={`${props.book.key}`} className="flex gap-2 p-2 w-32 font-bold justify-center hover:bg-blue-300 rounded-full transition">
                        <svg class="text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                        </svg>
                        <div>
                            Go back
                        </div>
                    </Link>                

                    <div className="flex justify-center">
                        <h3 className="text-3xl font-bold">Create a Club!</h3>
                    </div>

                    <label>Club Name</label>
                    <input 
                        id='title' 
                        type='text' 
                        onChange={e => setTitle(e.target.value)} 
                        value={title} maxLength="38" 
                        className={`w-full h-12 px-4 rounded-md transition hover:border-blue-500 border-2 ${emptyFields.includes('title') && 'border-red-400'}`} 
                    />

                    <label>A fitting description for your club</label>
                    <textarea 
                        type='text' 
                        onChange={e => setDescription(e.target.value)} 
                        value={description} 
                        className={`w-full h-24 p-4 rounded-md resize-none transition hover:border-blue-500 border-2 ${emptyFields.includes('description') && 'border-red-400'}`} 
                    />

                    <div className="flex flex-row justify-end w-full">
                        {error && <div className="text-red-400 p-2 text-lg">{error}</div>}
                    </div>
                    
                    <div className="flex justify-center p-4">
                        <button className="bg-blue-500 text-white rounded-lg w-80 py-4">Done</button>
                    </div>
                
                </form>
            
            </div>
       
       </div>

    );
}

export default CreateClubFromBookForm;