import { useState } from 'react';

const CreateClubFromBookForm = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [emptyFields, setEmptyFields ] = useState([]);
    const [error, setError] = useState(null);
 
    // TODO: figure out how to properly add members
    const handleSubmit = async (event) => {
        event.preventDefault();

        const books = [props.book.title]
        const members = [props.user.username]
        const createdBy = props.user.username;

        const club = { title, description, books, members, createdBy };

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
        }

    };

    return (
    
        <div className="font-sans flex justify-center items-center">
          
            <div className="w-full h-screen sm:w-[500px] sm:h-full pt-32 pb-4 px-6 sm:py-4 sm:mt-16 sm:rounded-md drop-shadow-2xl bg-neutral-100">
                
                <form className="flex flex-col h-full font-bold tracking-wide" onSubmit={handleSubmit}>

                    <button onClick={props.sectionSelectorSwitch} className="w-24 my-2 font-bold text-xl text-center">
                        Go back
                    </button>

                    <div className="flex justify-center py-4">
                        <h3 className="text-2xl">Create a Club!</h3>
                    </div>

                    <label>Club Title</label>
                    <input 
                        id='title' 
                        type='text' 
                        onChange={e => setTitle(e.target.value)} 
                        value={title} maxLength="38" 
                        className={`w-full h-10 px-2 mt-2 mb-4 rounded-sm ${emptyFields.includes('title') && 'border-2 border-red-400'}`} 
                    />

                    <label>A Fitting Description</label>
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