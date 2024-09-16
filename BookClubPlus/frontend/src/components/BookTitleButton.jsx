const BookTitleButton = (props) => {

    return(
        <div className={`flex`}>

            <div className={`${props.bookSelected === props.book.bookId ? "border-indigo-500" : "border-gray-100"} border-l-2 flex`}></div>

            <button onClick={() => props.bookSelector(props.book.bookId)} className={`${props.bookSelected === props.book.bookId ? "bg-indigo-100" : "hover:bg-indigo-50"} w-full text-start font-semibold px-2 py-2 mx-2 my-0.5 rounded-lg transition`}>
                {props.book.bookTitle} 
            </button>

        </div>
    );
};

export default BookTitleButton;