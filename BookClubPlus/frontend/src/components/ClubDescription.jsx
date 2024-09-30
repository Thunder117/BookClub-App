// Components
import ClubBookCard from "./ClubBookCard";
import UserCard from "./UserCard";

const ClubDescription = (props) => {

    const handleBookDeleted = (bookId) => {
        const updatedBooks = props.club.books.filter(book => book.bookId !== bookId);
        const updatedClub = { ...props.club, books: updatedBooks };
        props.setClub(updatedClub); 
    };

    return(
        <div className={"flex flex-col gap-8 w-full"}>
            <div className="flex justify-center">
                <div className="flex flex-col bg-white min-h-52 max-h-52 w-[580px] p-3 mx-4 rounded-xl shadow-md">

                    <div className="font-semibold p-2 text-3xl">
                        {props.club.title} 
                    </div>

                    <div className="p-2 overflow-x-hidden overflow-auto text-ellipsis">
                        {props.club.description} 
                    </div>

                </div>

                <div className="flex flex-col bg-white min-h-52 max-h-52 w-[580px] p-3 mx-4 rounded-xl shadow-md">

                    <div className="min-h-32 flex gap-4 p-2 overflow-x-auto overflow-y-hidden">

                        {props.club.members.map((item, index) => {
                            return <UserCard userName={item.userName}/>
                            
                        })}
                        
                    </div>

                    <div className="flex gap-2 p-2">
                        <button className="flex justify-center bg-blue-400 text-white min-w-16 p-3 shadow-md rounded-full text-s">
                            Add Member
                        </button>
                        <button className="flex justify-center bg-blue-400 text-white min-w-16 p-3 shadow-md rounded-full text-s">
                            Edit
                        </button>
                    </div>

                </div>
            </div>

            <div className="bg-white h-full p-2 overflow-x-auto">
                
                <div className="flex items-center justify-start gap-4 p-4 h-full">
                    { props.club &&
                        props.club.books.map((item, index) => {
                            return(
                        
                            <ClubBookCard 
                                key={index}
                                id={item.bookId}
                                title={item.bookTitle}
                                image={item.bookImage}
                                clubId={props.club._id}
                                token={props.token} 
                                onBookDeleted={handleBookDeleted} 
                            />
                          
                            )
                        })
                    }
                </div>

            </div>

        </div>
    );
}

export default ClubDescription;