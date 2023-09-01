const ClubBookTitleButton = (props) => {

    // TODO: Stylize this button!
    return(
        <button className="text-start font-semibold px-2 py-2 mx-2 my-0.5 rounded-md transition hover:bg-gray-300">
            {props.book.bookTitle} 
        </button>
    );
};

export default ClubBookTitleButton;