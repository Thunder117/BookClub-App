import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

// Components
import NavBar from '../components/NavBar';
import UserClubs from '../components/UserClubs';

const ClubsPage = () => {
    const { user } = useAuthContext();

    return (
        <div className="h-screen">
            <NavBar showNav/>

            <div className="font-sans bg-neutral-100 flex h-full"> {/* ALL */}

            { user 
            ?
                <UserClubs user={user} />
            :
            <div className="flex flex-col gap-8 w-full h-4/6 justify-center items-center">
                <div className="text-xl font-semibold">Oops... It looks like you are not in a club yet</div>
                <Link to={'/'} className="bg-blue-500 text-white font-semibold px-4 py-2 text-center rounded-full">Create a Club</Link>
            </div>
            }

            </div>
        </div>
    );
};

export default ClubsPage;