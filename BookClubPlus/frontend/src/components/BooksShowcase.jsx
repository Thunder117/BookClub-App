// Components
import BookCard from "./BookCard";

const BooksShowcase = (props) => {

    return(
        <div className="h-full md:w-5/6 flex justify-center flex-wrap py-6 gap-2 md:gap-4">
            
            { props.books && 
                props.books.docs.slice(0, 20).map((item, index) => {
                    if(item.author_name && item.cover_i) {
                        console.log(item.cover_i);
                        return <BookCard key = {index} book = {item}/>
                    }
                    return null;
                })
            }

        </div>
    );
};

export default BooksShowcase;