const BookTitleButton = (props) => {

    // TODO: Stylize this button!
    return(
        <div className={`flex`}>

            <div className={`${props.bookSelected === props.book.bookId ? "border-indigo-500" : "border-blue-300"} border-l-2 flex`}></div>

            <button onClick={() => props.bookSelector(props.book.bookId)} className="text-start font-semibold px-2 py-2 mx-2 my-0.5 rounded-md transition hover:bg-gray-300">
                {props.book.bookTitle} 
            </button>

        </div>
    );
};

export default BookTitleButton;