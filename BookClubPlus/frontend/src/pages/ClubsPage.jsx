import { useAuthContext } from '../hooks/useAuthContext';

// Components
import NavBar from '../components/NavBar';
import UserClubs from '../components/UserClubs';

const ClubsPage = () => {
    const { user } = useAuthContext();

    return (
    <>
        <NavBar showNav/>

        <div className="font-sans flex min-h-screen"> {/* ALL */}

            { user && 
                <UserClubs user={user} />
            }

        </div>
    </>
    );
};

export default ClubsPage;