import { useState, useEffect } from 'react';
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

// Components
import ClubTitleButton from '../components/ClubTitleButton';
import ClubDescription from '../components/ClubDescription';
import { Link } from 'react-router-dom';

const UserClubs = (props) => {
    const [clubs, setClubs] = useState(0); 
    const [clubSelected, setClubSelected] = useState(0); 
    const [isLoadingClubs, setIsLoadingClubs] = useState(false);  

    useEffect(() => {
        
        fetchAll();
            
    }, []);

    const fetchAll = async () => {
        await fetchClubs();
    }

    const fetchClubs = async () => {
        setIsLoadingClubs(true);

        const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/${props.user.username}`);
        const json = await response.json();

        console.log(json);
        setClubs(json);
        if(json) {
            clubSelector(json[0]._id);
        }
    
        setIsLoadingClubs(false);
    };

    const clubSelector = (id) => {
        setClubSelected(id);
    }

    return(
        <div className="flex w-full pt-20"> {/* All Columns */}

            { clubs.length > 0  && 
            <>

                <div className="w-1/6 overflow-y-hidden max-h-full">
                    <div className="flex flex-col gap-3 h-[640px] overflow-y-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl py-10"> {/* Left Column */}

                        { clubs.map((club, index) => {
                                
                            return <ClubTitleButton club={club} clubSelected={clubSelected} clubSelector={clubSelector} key={index}/>
                                
                        })}

                    </div>
                </div>

                <div className="flex w-5/6 justify-center"> {/* Right Column */}

                    { clubs.map((club, index) => {
                        
                        if(clubSelected === club._id) {
                            return(
                                <ClubDescription 
                                    key={index}    
                                    club={club} 
                                    clubs={clubs}  // Pass the clubs array
                                    setClubs={setClubs}  // Pass the setter function
                                    token={props.user.token}    
                                />
                            )
                        }
                        return null;
                            
                    })}

                </div>
                    
            </>
            }
            
            {clubs.length === 0  && 
                <div className="flex flex-col gap-8 w-full h-4/6 justify-center items-center">
                    <div className="text-xl font-semibold">Oops... It looks like you are not in a club yet</div>
                    <Link to={'/'} className="bg-blue-500 text-white font-semibold px-4 py-2 text-center rounded-full">Create a Club</Link>
                </div>
            }

            { (isLoadingClubs && clubs.length !== 0) &&
                <div className="flex w-full h-4/6 justify-center items-center">
                    <Spinner  
                        center={false} 
                        width={"150px"} 
                        height={"150px"}
                    />
                </div>
            }

        </div>
    );
};

export default UserClubs;