// Components
import BookCard from "./BookCard";

const BooksShowcase = (props) => {

    return(
        <div className="h-full md:w-5/6 flex justify-center flex-wrap py-6 gap-2 md:gap-4">
            
            {props.books && 
                props.books.slice(0, 20).map((item, index) => {
                    const volumeInfo = item.volumeInfo;  // Extract volumeInfo from each item

                    // Check for necessary book details
                    if(volumeInfo.authors && volumeInfo.imageLinks?.thumbnail) {
                        // Adapt to new Google Books structure
                        return <BookCard key={index} book={volumeInfo} />;  // Pass volumeInfo to BookCard
                    }
                    return null;
                })
            }

        </div>
    );
};

export default BooksShowcase;