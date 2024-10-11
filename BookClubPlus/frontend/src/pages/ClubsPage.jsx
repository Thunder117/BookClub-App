import { useAuthContext } from '../hooks/useAuthContext';

// Components
import NavBar from '../components/NavBar';
import UserClubs from '../components/UserClubs';

const ClubsPage = () => {
    const { user } = useAuthContext();

    return (
        <div className="h-screen">
            <NavBar showNav/>

            <div className="font-sans bg-neutral-100 flex h-full"> {/* ALL */}

                { user && 
                    <UserClubs user={user} />
                }

            </div>
        </div>
    );
};

export default ClubsPage;