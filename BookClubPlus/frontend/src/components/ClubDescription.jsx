import { useState } from "react";
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

// Components
import ClubBookCard from "./ClubBookCard";
import UserCard from "./UserCard";
import Modal from '../components/Modal';
import SearchBar from "./SearchBar";

const ClubDescription = (props) => {
    const [showEditOptions, setShowEditOptions] = useState(false);
    const [isDeleteModalOpen, setDeleteModal] = useState(false);
    const [isAddModalOpen, setAddModal] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [users, setUsers] =useState()
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);  

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

    const fetchUsers = async (e) => {
        e.preventDefault();
        setUsers();
        setIsLoadingUsers(true);

        if (textValue === "" || textValue.length < 2) return;

        try {
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/user/search?username=${textValue}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`,
                }
            });
            
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                setUsers([]);  // No users found
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }

        setIsLoadingUsers(false);
    };

    const addUser = async (userId) => {
        if (!props.token) {
            console.error('Token is missing!');
            return;
        }
        
        //console.log("props.club._id: " + props.club._id);
        //console.log("userId: " + userId);

        try {
            const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/addMember`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`,
                },
                body: JSON.stringify({
                    clubId: props.club._id,
                    userId: userId,
                }),
            });
    
            if (response.ok) {
                const updatedClub = await response.json();
                // Assuming `updatedClub` returns the club with updated members list
                const updatedClubs = props.clubs.map((club) =>
                    club._id === updatedClub._id ? updatedClub : club
                );
                props.setClubs(updatedClubs);
                toggleAddModal();  // Close the modal after adding the user
            } else {
                console.error('Error adding user to the club');
            }
        } catch (error) {
            console.error('Error adding user to the club:', error);
        }
    };
    
    const toggleDeleteModal = () => {
        setDeleteModal(!isDeleteModalOpen);
    }

    const toggleAddModal = () => {
        setAddModal(!isAddModalOpen);
    }

    return (
        <>
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
                        {showEditOptions &&
                                <div className="flex gap-2">
                                    <button onClick={toggleAddModal} className="flex justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 shadow-md rounded-full text-s">
                                        Add Member
                                    </button>
                                    <button
                                        onClick={toggleDeleteModal}
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
                            <button onClick={toggleEditOptions} className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 shadow-md rounded-full text-s">
                                {showEditOptions ? "Hide Options" : "Show Options"}
                            </button>
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

            <Modal isOpen={isDeleteModalOpen} onClose={toggleDeleteModal}>
                <h2 className="text-xl text-center font-bold mb-4">Do you really want to delete this club?</h2>
                <div className='flex justify-center gap-4 p-4'>
                    <button onClick={handleDeleteClub} className="bg-red-500 hover:bg-red-600 transition text-white rounded-full font-semibold px-4 py-2">
                        Delete Club
                    </button>
                    <button onClick={toggleDeleteModal} className="bg-gray-500 hover:bg-gray-600 transition text-white rounded-full font-semibold px-4 py-2">
                        Cancel
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isAddModalOpen} onClose={toggleAddModal}>
                <h2 className="text-xl text-center font-bold mb-4">Add a user to your club</h2>
                <div className="flex justify-center">
                    <SearchBar 
                        search={fetchUsers} 
                        textValue={textValue} 
                        setTextValue={setTextValue}
                        placeHolder="John Smith..."
                    />
                </div>
                <div className="flex flex-col gap-2 h-60 overflow-y-auto">
                {users && users.length === 0 &&
                    <div className='h-full flex justify-center items-center'>
                        We couldn't find that username
                    </div>
                }
                {users && users.map((user, index) => (
                    <div key={index} className="p-2">
                        <button
                            onClick={() => addUser(user._id)} 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-4 py-2"
                        >
                            {user.username}
                        </button>
                    </div>
                ))}
                {isLoadingUsers && (
                    <div className="flex justify-center h-full items-center">
                        <Spinner center={false} width={"100px"} height={"100px"} />
                    </div>
                )}
                </div>
                <div className='flex justify-center p-2'>
                    <button onClick={toggleAddModal} className="bg-gray-500 hover:bg-gray-600 transition text-white rounded-full font-semibold px-4 py-2">
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ClubDescription;
