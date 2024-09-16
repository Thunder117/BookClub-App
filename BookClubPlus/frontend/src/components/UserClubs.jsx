import { useState, useEffect } from 'react';

// Components
import ClubTitleButton from '../components/ClubTitleButton';
import BookTitleButton from '../components/BookTitleButton';
import ClubDescription from '../components/ClubDescription';

const UserClubs = (props) => {
    const [clubs, setClubs] = useState(0); 
    const [clubSelected, setClubSelected] = useState(0); 
    const [bookSelected, setBookSelected] = useState(0);

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
        setBookSelected(0);
    }

    const bookSelector = (id) => {
        setBookSelected(id);
    }

    return(
        <div className="flex w-5/6 p-2 justify-center"> {/* All Columns */}
            { clubs.length > 0  && 
            <>

                <div className="flex flex-col w-1/6 p-2"> {/* Left Column */}

                    { clubs.map((club, index) => {
                            
                        return <ClubTitleButton club={club} clubSelected={clubSelected} clubSelector={clubSelector} key={index}/>
                            
                    })}

                </div>
                {/* Middle Column */}
                {/*   
                <div className="flex flex-col p-2 w-1/6">
                
                    { clubs.map(({books, _id}) => {
                            
                        return books.map((book, index) => {

                            if(clubSelected === _id) {
                                return <BookTitleButton book={book} bookSelected={bookSelected} bookSelector={bookSelector} key={index}/>
                            }
                            return null;

                        })

                    })}
                </div>
                */}

                <div className="flex w-4/6 h-5/6 justify-center"> {/* Right Column */}

                    { clubs.map((club, index) => {
                        
                        if(clubSelected === club._id) {
                            return <ClubDescription club={club} key={index}/>
                        }
                        return null;
                            
                    })}

                </div>
                    
            </>
            }
            
            {clubs.length === 0  && 
                <div>
                    <div>Oops... It seems like you are not in a club yet</div>
                    <button>Join a Club now</button>
                </div>
            }

        </div>
    );
};

export default UserClubs;