const ClubBookCard = (props) => {

    return(
        <div className="flex justify-center items-center h-80 w-56">
            <button className="bg-neutral-100 flex flex-col h-72 w-52 rounded-lg ease-out duration-500 hover:h-80 hover:w-56">
                
                <div className="">
                    <img 
                        alt="book_cover" 
                        src={`https://covers.openlibrary.org/b/id/${props.image}-M.jpg`} 
                        className="w-full select-none" 
                    />
                </div>
                <div className="">
                    {props.title}
                </div>

            </button>
        </div>
    );
};

export default ClubBookCard;