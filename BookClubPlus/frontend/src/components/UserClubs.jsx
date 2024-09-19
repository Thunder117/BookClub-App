import { useState, useEffect } from 'react';

// Components
import ClubTitleButton from '../components/ClubTitleButton';
import BookTitleButton from '../components/BookTitleButton';
import ClubDescription from '../components/ClubDescription';

const UserClubs = (props) => {
    const [clubs, setClubs] = useState(0); 
    const [clubSelected, setClubSelected] = useState(0); 
    const [bookSelected, setBookSelected] = useState(0);

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

    const clubSelector = (id) => {
        setClubSelected(id);
        setBookSelected(0);
    }

    const bookSelector = (id) => {
        setBookSelected(id);
    }

    return(
        <div className="flex w-full pt-20 bg-neutral-100"> {/* All Columns */}
            { clubs.length > 0  && 
            <>

                <div className="flex flex-col w-1/6 gap-3 bg-blue-500 rounded-xl py-8"> {/* Left Column */}

                    { clubs.map((club, index) => {
                            
                        return <ClubTitleButton club={club} clubSelected={clubSelected} clubSelector={clubSelector} key={index}/>
                            
                    })}

                </div>

                <div className="flex w-5/6 justify-center"> {/* Right Column */}

                    { clubs.map((club, index) => {
                        
                        if(clubSelected === club._id) {
                            return <ClubDescription club={club} key={index}/>
                        }
                        return null;
                            
                    })}

                </div>
                    
            </>
            }
            
            {clubs.length === 0  && 
                <div className="flex flex-col gap-8 h-4/6 justify-center items-center">
                    <div className="text-xl font-semibold">Oops... It seems like you are not in a club yet</div>
                    <button className="bg-blue-400 text-white font-semibold p-2 w-32 rounded-full">Create a Club</button>
                </div>
            }

        </div>
    );
};

export default UserClubs;