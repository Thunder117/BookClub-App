import { useState, useEffect } from 'react';

// Components
import ClubTitleButton from '../components/ClubTitleButton';
import ClubBookTitleButton from '../components/ClubTitleButton';

const UserClubs = (props) => {
    const [clubs, setClubs] = useState(); 

    useEffect(() => {
        
        fetchAll();
            
    }, []);

    const fetchAll = async () => {
        await fetchClubs();
    }

    const fetchClubs = async () => {
        const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/${props.user.username}`);
        const json = await response.json();

        console.log(json);
        setClubs(json);
    };


    return(
        <div className="flex w-5/6 p-2 bg-yellow-300"> {/* Both Columns */}

            <div className="flex flex-col w-1/5 p-2 bg-purple-300"> {/* Left Column */}

                { clubs && 
                    clubs.map((club, index) => {
                    
                        return <ClubTitleButton club={club} key={index}/>
                        
                    })
                }

            </div>

            <div className="flex w-4/5 bg-blue-300"> {/* Right Column */}
                
                <div className="flex flex-col w-1/5 p-2 bg-red-300">

                    { clubs && 
                        clubs.map((club, index) => {
                        
                            return <ClubBookTitleButton club={club} key={index}/>
                            
                        })
                    }

                </div>

                <div className="w-4/5 bg-green-300">
                    information about the book in question
                </div>

            </div>

        </div>
    );
};

export default UserClubs;