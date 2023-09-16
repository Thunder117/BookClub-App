import { useState, useEffect } from 'react';

// Components
import ClubTitleButton from '../components/ClubTitleButton';
import BookTitleButton from '../components/BookTitleButton';
import ClubDescription from '../components/ClubDescription';

const UserClubs = (props) => {
    const [clubs, setClubs] = useState(); 
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
        <div className="flex w-5/6 p-2"> {/* All Columns */}

            { clubs && 
            <>

                <div className="flex flex-col w-1/6 p-2"> {/* Left Column */}

                    { clubs.map((club, index) => {
                            
                        return <ClubTitleButton club={club} clubSelected={clubSelected} clubSelector={clubSelector} key={index}/>
                            
                    })}

                </div>

                <div className="flex flex-col p-2 w-1/6"> {/* Middle Column */}
                
                    { clubs.map(({books, _id}) => {
                            
                        return books.map((book, index) => {

                            if(clubSelected === _id) {
                                return <BookTitleButton book={book} bookSelected={bookSelected} bookSelector={bookSelector} key={index}/>
                            }
                            return null;

                        })

                    })}

                </div>

                <div className="flex w-4/6 bg-green-300"> {/* Right Column */}

                    { clubs.map((club, index) => {
                        
                        if(clubSelected === club._id) {
                            return <ClubDescription club={club} key={index}/>
                        }
                        return null;
                            
                    })}

                </div>
                    
            </>
            }

        </div>
    );
};

export default UserClubs;