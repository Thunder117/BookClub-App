import { useState, useEffect } from 'react';

// Components
import ClubTitleButton from '../components/ClubTitleButton';

const UserClubs = (props) => {
    const [clubs, setClubs] = useState(); 

    useEffect(() => {
        
        fetchClubs();
            
    }, []);

    const fetchClubs = async () => {
        const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/user/${props.user.username}`);
        const json = await response.json();

        setClubs(json);
    };

    return(
        <div className="flex w-5/6 py-2 bg-green-300"> {/* Both Columns */}

            <div className="flex flex-col w-1/5 bg-purple-300"> {/* Left Column */}
                
                <ClubTitleButton/>
                <ClubTitleButton/>
                <ClubTitleButton/>

            </div>

            <div className="w-4/5 bg-blue-300"> {/* Right Column */}
                hi 2
            </div>

        </div>
    );
};

export default UserClubs;