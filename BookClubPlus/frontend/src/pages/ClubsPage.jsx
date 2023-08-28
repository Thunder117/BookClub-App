import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

// Components
import NavBar from '../components/NavBar';
import ClubTitleButton from '../components/ClubTitleButton';

const ClubsPage = () => {
    const [clubs, setClubs] = useState(); 
    const { user } = useAuthContext();

    useEffect(() => {
        
        fetchClubs();
            
    }, []);

    const fetchClubs = async () => {
        const response = await fetch(`https://book-club-react-app-backend.onrender.com/api/clubs/${user._id}`);
        const json = await response.json();

        setClubs(json);
    };

    return (
    <>
        <NavBar showNav/>

        <div className="font-sans flex justify-center min-h-screen pt-20 bg-neutral-100"> {/* ALL */}

            { user && 
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
            }

        </div>
    </>
    );
};

export default ClubsPage;