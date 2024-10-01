import { useState } from "react";
import ClubBookCard from "./ClubBookCard";
import UserCard from "./UserCard";

const ClubDescription = (props) => {
    const [showEditOptions, setShowEditOptions] = useState(false); // State to toggle edit options

    const toggleEditOptions = () => {
        setShowEditOptions(!showEditOptions);
    };

    const handleBookDeleted = (bookId) => {
        const updatedBooks = props.club.books.filter(book => book.bookId !== bookId);
        const updatedClubs = props.clubs.map((club) => {
            if (club._id === props.club._id) {
                return { ...club, books: updatedBooks };
            }
            return club;
        });
        props.setClubs(updatedClubs);  // Update the entire clubs array
    };

    const handleDeleteClub = async () => {
        if (!props.token) {
            console.error('Token is missing!');
            return;
        }
        try {
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/${props.club._id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`,
                }
            });

            if (response.ok) {
                // After deleting the club, remove it from the state
                const updatedClubs = props.clubs.filter(club => club._id !== props.club._id);
                props.setClubs(updatedClubs);  // Update the clubs array
            } else {
                console.error('Error deleting club');
            }
        } catch (error) {
            console.error('Error deleting club:', error);
        }
    };

    return (
        <div className={"flex flex-col gap-8 w-full"}>
            <div className="flex justify-center">
                <div className="flex flex-col bg-white min-h-52 max-h-52 w-[580px] p-3 mx-4 rounded-xl shadow-md">

                    <div className="font-semibold p-2 text-3xl">
                        {props.club.title}
                    </div>

                    <div className="p-2 overflow-x-hidden overflow-auto text-ellipsis">
                        {props.club.description}
                    </div>

                </div>

                <div className="flex flex-col bg-white min-h-52 max-h-52 w-[580px] p-3 mx-4 rounded-xl shadow-md">

                    <div className="min-h-32 flex gap-4 p-2 overflow-x-auto overflow-y-hidden">
                        {props.club.members.map((item, index) => {
                            return <UserCard key={index} userName={item.userName}/>
                        })}
                    </div>

                    <div className="flex gap-2 p-2 justify-end items-end h-full">
                        <button className="flex justify-center bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 shadow-md rounded-full text-s">
                            Add Member
                        </button>
                        <button onClick={toggleEditOptions} className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 shadow-md rounded-full text-s">
                            Edit
                        </button>
                        {showEditOptions &&
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDeleteClub}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full h-full hover:bg-red-600"
                                >
                                    Delete Club
                                </button>
                                <button
                                    onClick={toggleEditOptions}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-full h-full hover:bg-gray-600"
                                >
                                    Cancel
                            </button>
                        </div>
                        }
                    </div>

                </div>
            </div>

            <div className="bg-white h-full p-2 overflow-x-auto overflow-y-hidden">
                <div className="flex items-center justify-start gap-4 p-4 h-full">
                    {props.club && props.club.books.map((item, index) => {
                        return (
                            <ClubBookCard
                                key={index}
                                id={item.bookId}
                                title={item.bookTitle}
                                image={item.bookImage}
                                clubId={props.club._id}
                                token={props.token}
                                onBookDeleted={handleBookDeleted}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default ClubDescription;
