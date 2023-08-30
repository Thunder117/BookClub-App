import { useAuthContext } from '../hooks/useAuthContext';

// Components
import NavBar from '../components/NavBar';
import UserClubs from '../components/UserClubs';

const ClubsPage = () => {
    const { user } = useAuthContext();

    return (
    <>
        <NavBar showNav/>

        <div className="font-sans flex justify-center min-h-screen pt-20 bg-gray-100"> {/* ALL */}

            { user && 
                <UserClubs user={user} />
            }

        </div>
    </>
    );
};

export default ClubsPage;