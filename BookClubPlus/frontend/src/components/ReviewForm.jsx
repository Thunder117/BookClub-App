import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewForm = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields ] = useState([]);
    const { id } = useParams();
    const game_id = id;
    const username = props.user.username;
    const gamename = props.videogame.title;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const review = { game_id, username, gamename, title, description, rating };

        const response = await fetch('https://collection-react-app-backend.onrender.com/api/reviews', {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            console.log('Could not add review', json);
        }
        if (response.ok) {
            setTitle('');
            setDescription('');
            setRating('');
            setEmptyFields([]);
            setError(null);
            console.log('New review added', json);
        }

        await props.fetchReviews();
    };

    return(
        <div className="w-full lg:w-[700px] h-[320px] lg:h-[250px] p-4 bg-neutral-700 rounded-md">

            <form className="flex flex-col h-full text-neutral-200" onSubmit={handleSubmit}>

                <div className="text-xl font-semibold pb-2 text-white">Review this game!</div>

                <div className="flex flex-col lg:flex-row pb-4 gap-4">

                    <div className="lg:basis-5/6 flex gap-2">
                        <label htmlFor='title' className="cursor-pointer text-lg">Title</label>
                        <input
                            id='title'
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            maxlength="38"
                            className={emptyFields.includes('title') ? 'border-2 border-red-400 text-black rounded-sm w-full h-8 px-2' : 'text-black rounded-sm w-full h-8 px-2'}
                        />
                    </div>

                    <div className="lg:basis-1/6 flex gap-2 lg:justify-end">
                        <label htmlFor="rating" className="cursor-pointer text-lg">Rating</label>
                        <input 
                            id="rating" 
                            type="number" 
                            step=".1"
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            min="0" 
                            max="10"
                            className={emptyFields.includes('rating') ? 'border-2 border-red-400 text-black rounded-sm h-8 px-2' : 'text-black rounded-sm h-8 px-2'}
                        />
                    </div>

                </div>

                <textarea
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className={emptyFields.includes('description') ? 'border-2 border-red-400 h-full text-black rounded-sm px-2' : 'h-full text-black rounded-sm p-2'}
                />
                
                <div className="flex flex-row justify-end w-full">
                    {error && <div className="text-red-400 p-2 text-lg">{error}</div>}
                    <button className="p-2 text-lg">Done!</button>
                </div>

            </form>
        </div>
    )
};
    
export default ReviewForm;