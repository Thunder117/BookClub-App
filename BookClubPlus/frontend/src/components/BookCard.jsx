import { Link } from "react-router-dom";

const BookCard = (props) => {
    const book = props.book; // volumeInfo from Google Books API

    return (
        <Link to={`/book/${book.industryIdentifiers?.[0]?.identifier}`} className="flex flex-col h-[260px] w-[160px] lg:h-[300px] lg:w-[210px] lg:flex-none m-2 px-2 lg:shadow-md rounded-lg bg-white">
            
            <div className="flex h-[130px] lg:h-[170px] justify-center items-center p-2 flex-none">
                <div className="w-1/2">
                    <img 
                        alt="book_cover" 
                        src={book.imageLinks?.thumbnail || 'placeholder.jpg'}  // Use thumbnail or a placeholder image
                        className="w-full select-none" 
                    />
                </div>
            </div>

            <div className="flex flex-col p-2 h-[130px] lg:h-[170px] w-full">

                <div className="max-h-20 line-clamp-2 lg:line-clamp-3 mt-2 text-lg text-center font-bold">
                    {book.title}
                </div>

                <div className="max-h-20 text-gray-500 truncate text-md font-semibold text-center">
                    by {book.authors?.join(', ')}  {/* Join authors array */}
                </div>

            </div>
        
        </Link>
    );
};

export default BookCard;