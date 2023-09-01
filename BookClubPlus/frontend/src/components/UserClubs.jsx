import { useState, useEffect } from 'react';

// Components
import ClubTitleButton from '../components/ClubTitleButton';
import ClubBookTitleButton from '../components/ClubBookTitleButton';

const UserClubs = (props) => {
    const [clubs, setClubs] = useState(); 
    const [clubSelected, setClubSelected] = useState(0); 

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
    }


    return(
        <div className="flex w-5/6 p-2 bg-yellow-300"> {/* Both Columns */}

            <div className="flex flex-col w-1/5 p-2 bg-purple-300"> {/* Left Column */}

                { clubs && 
                    clubs.map((club, index) => {
                        
                        return <ClubTitleButton club={club} clubSelected={clubSelected} clubSelector={clubSelector} key={index}/>
                        
                    })
                }

            </div>

            <div className="flex w-4/5 bg-blue-300"> {/* Right Column */}
                
                <div className="flex flex-col w-1/5 p-2 bg-red-300">

                    { clubs && 
                        clubs.map(({books, _id}, index) => {
                            
                            return books.map((book, index) => {

                                if(clubSelected === _id) {
                                    return <ClubBookTitleButton book={book} key={index}/>
                                }

                            })

                            /*
                            if(clubSelected === club._id) {
                                return <ClubBookTitleButton club={club} key={index}/>
                            }
                            */
                        })
                    }

                </div>

                <div className="w-4/5 bg-green-300">
                    information about the book in question
                </div>

            </div>

        </div>
    );
};

export default UserClubs;