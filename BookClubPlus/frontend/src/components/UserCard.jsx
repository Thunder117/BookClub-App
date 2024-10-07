import { useState } from 'react';

const UserCard = (props) => {
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
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/removeMember`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`,
                },
                body: JSON.stringify({
                    clubId: props.club._id,
                    userId: props.userId,
                }),
            });

            if (response.ok) {
                const updatedClub = await response.json();

                // Update the clubs state by removing the deleted user from the current club
                const updatedClubs = props.clubs.map((club) =>
                    club._id === updatedClub._id ? updatedClub : club
                );

                // Update the state of clubs
                props.setClubs(updatedClubs);
                
                console.log('User successfully removed from the club');
                toggleDeleteOption(); // Close the delete option after deleting the user
            } else {
                console.error('Error removing user from the club');
            }
        } catch (error) {
            console.error('Error removing user from the club:', error);
        }
    };

    return(
        <div className="flex flex-col h-28 min-w-24 max-w-24 items-center">
            <div className="flex w-full justify-end relative">
                {showDeleteOption && (
                    <div className="absolute z-50 top-0 right-0 bg-neutral-100 shadow-md p-2 flex flex-col gap-2 rounded-lg">
                        <button
                            onClick={toggleDeleteOption}
                            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
                <button onClick={toggleDeleteOption} className="flex justify-center w-10 h-full">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                    </svg>
                </button>
            </div>
            <div className="flex bg-orange-500 text-white text-2xl font-semibold justify-center items-center rounded-full h-16 w-16">
                {Array.from(props.userName)[0].toUpperCase()}
            </div>
            <div className="truncate max-w-full">
                {props.userName}
            </div>
        </div>
    );
};

export default UserCard;