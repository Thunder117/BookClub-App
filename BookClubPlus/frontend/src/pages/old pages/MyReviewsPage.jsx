import { useAuthContext } from '../../hooks/useAuthContext';

// components
import UserReviews from '../components/UserReviews';
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';

const MyReviewsPage = () => {
    const { user } = useAuthContext();

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return(
        <>
            <NavBar showNav />
            
            <div className="min-h-screen h-full">

                <div className="flex h-20 w-full items-end">
                    <div className=" text-3xl font-semibold ml-4 lg:ml-24 pb-1 border-b-4 border-green-700 rounded-sm text-gray-800">
                        My Reviews
                    </div>
                </div>
                
                { user 
                ?
                    <UserReviews user={user}/>
                :
                    <div className="mt-6 lg:mt-10 ml-4 lg:ml-24">
                        <Link to={`/login`} onClick={goToTop} className="text-3xl text-gray-500 hover:text-green-500">
                            Log in to see your reviews
                        </Link>
                    </div>
                }
            </div>
        </>
    );
};

export default MyReviewsPage;