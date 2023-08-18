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
          
            <div className="w-full sm:w-[450px] h-screen sm:h-full pt-32 pb-4 px-6 sm:pt-4 sm:mt-24 sm:rounded-md drop-shadow-2xl bg-neutral-100">
                
                <form className="flex flex-col h-full font-bold" onSubmit={handleSubmit}>

                    <div className="flex justify-center py-6">
                        <h3 className="text-2xl">Create a Club!</h3>
                    </div>

                    <div className="flex flex-col lg:flex-row pb-4 gap-4">

                        <div className="lg:basis-5/6 flex gap-2">

                            <label>Club title</label>
                            <input 
                                id='title' 
                                type='text' 
                                onChange={e => setTitle(e.target.value)} 
                                value={title} maxLength="38" 
                                className={`${emptyFields.includes('title') && 'border-2 border-red-400'} w-full h-8 px-2 rounded-sm`} 
                            />

                        </div>

                    </div>

                    <textarea 
                        type='text' 
                        onChange={e => setDescription(e.target.value)} 
                        value={description} 
                        className={`${emptyFields.includes('description') && 'border-2 border-red-400'} h-full text-black rounded-sm px-2`} 
                    />

                    <div className="flex flex-row justify-end w-full">
                        {error && <div className="text-red-400 p-2 text-lg">{error}</div>}
                        <button className="p-2 text-lg">Done!</button>
                    </div>

                
                </form>
            
            </div>
       
       </div>

    );
}

export default CreateClubFromBookForm;