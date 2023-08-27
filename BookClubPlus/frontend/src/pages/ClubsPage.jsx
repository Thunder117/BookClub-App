
// Components
import NavBar from '../components/NavBar';
import ClubTitleButton from '../components/ClubTitleButton';

const ClubsPage = () => {

    return (
    <>
        <NavBar showNav/>

        <div className="font-sans flex justify-center min-h-screen pt-20 bg-neutral-100"> {/* ALL */}

            <div className="flex w-5/6 py-2 bg-green-300">
                
                <div className="flex flex-col w-1/5 bg-purple-300"> {/* Left Column */}
                    
                    <ClubTitleButton/>
                    <ClubTitleButton/>
                    <ClubTitleButton/>

                </div>

                <div className="w-4/5 bg-blue-300"> {/* Right Column */}
                    hi 2
                </div>

            </div>

        </div>
    </>
    );
};

export default ClubsPage;