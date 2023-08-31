import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// TODO: Style this section more
const CreateClubFromBookForm = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [emptyFields, setEmptyFields ] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    const handleSubmit = async (event) => {
        event.preventDefault();

        const books = [{
            bookId: props.id,
            bookTitle: props.book.title
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

    };

    // TODO: change the font and the box size maybe?
    return (
    
        <div className="font-sans h-full flex justify-center items-center pt-20 lg:pt-16">
          
            <div className="w-full h-full sm:w-[500px] sm:h-[500px] px-6 sm:py-4 sm:rounded-md drop-shadow-2xl bg-neutral-100">
                
                <form className="flex flex-col h-full font-bold tracking-wide" onSubmit={handleSubmit}>

                    <Link to={`${props.book.key}`} className="w-24 my-2 font-bold text-xl text-center">
                        Go back
                    </Link>

                    <div className="flex justify-center py-4">
                        <h3 className="text-3xl">Create a Club!</h3>
                    </div>

                    <label>CLUB TITLE</label>
                    <input 
                        id='title' 
                        type='text' 
                        onChange={e => setTitle(e.target.value)} 
                        value={title} maxLength="38" 
                        className={`w-full h-10 px-2 mt-2 mb-4 rounded-sm ${emptyFields.includes('title') && 'border-2 border-red-400'}`} 
                    />

                    <label>A FITTING DESCRIPTION FOR YOUR CLUB...</label>
                    <textarea 
                        type='text' 
                        onChange={e => setDescription(e.target.value)} 
                        value={description} 
                        className={`w-full h-24 p-2 mt-2 mb-4 rounded-sm resize-none ${emptyFields.includes('description') && 'border-2 border-red-400'}`} 
                    />

                    <div className="flex flex-row justify-end w-full">
                        {error && <div className="text-red-400 p-2 text-lg">{error}</div>}
                    </div>

                    <button className="bg-sky-600 text-white rounded-sm px-6 py-4 my-4">Done!</button>
                
                </form>
            
            </div>
       
       </div>

    );
}

export default CreateClubFromBookForm;