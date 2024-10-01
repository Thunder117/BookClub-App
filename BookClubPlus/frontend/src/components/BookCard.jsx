import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const BookCard = (props) => {
    const [hasCover, setHasCover] = useState();

    useEffect(() => {
        
        fetchAll();

    }, []);

    const fetchAll = async () => {
        const book = await fetchBook();
        await checkForCover(book);
    };

    const fetchBook = async () => {
        const response = await fetch(`http://openlibrary.org${props.book.key}.json`);
        const json = await response.json();

        return json;
    };

    const checkForCover = (book) => {

        if (book.hasOwnProperty("covers")) {

            setHasCover(true);  

        } 
    };

    return (
        <>
        { hasCover &&
            <Link to = {`${props.book.key}`} className="flex flex-col h-[260px] w-[160px] lg:h-[300px] lg:w-[210px] lg:flex-none m-2 px-2 lg:shadow-md rounded-lg bg-white">
                
                <div className="flex h-[130px] lg:h-[170px] justify-center items-center p-2 flex-none">
                    <div className="w-1/2">
                        <img alt="book_cover" src={`https://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`} className="w-full select-none" />
                    </div>
                </div>

            
                <div className="flex flex-col p-2 h-[130px] lg:h-[170px] w-full">

                    <div className="max-h-20 line-clamp-2 lg:line-clamp-3 mt-2 text-lg text-center font-bold">
                        {props.book.title}
                    </div>

                    <div className="max-h-20 text-gray-500 truncate text-md font-semibold text-center">
                        by {props.book.author_name}
                    </div>
                
                </div>
            
            </Link>
        }
        </>
    );
};

export default BookCard;