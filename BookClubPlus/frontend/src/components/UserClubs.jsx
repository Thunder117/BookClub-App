import { useState, useEffect } from 'react';

// Components
import ClubTitleButton from '../components/ClubTitleButton';
import BookTitleButton from '../components/BookTitleButton';

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
        <div className="flex w-5/6 p-2 bg-yellow-300"> {/* All Columns */}

            <div className="flex flex-col w-1/6 p-2 bg-purple-300"> {/* Left Column */}

                { clubs && 
                    clubs.map((club, index) => {
                        
                        return <ClubTitleButton club={club} clubSelected={clubSelected} clubSelector={clubSelector} key={index}/>
                        
                    })
                }

            </div>

            <div className="flex flex-col p-2 w-1/6 bg-blue-300"> {/* Middle Column */}
               
                { clubs && 
                    clubs.map(({books, _id}) => {
                        
                        return books.map((book, index) => {

                            if(clubSelected === _id) {
                                return <BookTitleButton book={book} bookSelected={bookSelected} bookSelector={bookSelector} key={index}/>
                            }
                            return null;

                        })

                    })
                }

            </div>

            <div className="flex w-4/6 bg-green-300">
                information about the book in question
            </div>

        </div>
    );
};

export default UserClubs;