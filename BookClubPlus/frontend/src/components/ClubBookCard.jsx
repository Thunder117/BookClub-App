const ClubBookCard = (props) => {

    return(
        <div className="flex justify-center items-center h-80 min-w-56">
            <button className="bg-neutral-100 flex flex-col h-72 w-52 rounded-lg ease-out duration-500 hover:h-80 hover:w-56">
                
                <div className="flex justify-center w-full">
                    <img 
                        alt="book_cover" 
                        src={`https://covers.openlibrary.org/b/id/${props.image}-M.jpg`} 
                        className="min-h-60 max-h-60" 
                    />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    {props.title}
                </div>

            </button>
        </div>
    );
};

export default ClubBookCard;