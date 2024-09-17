

const ClubDescription = (props) => {

    return(
        <div className={"flex flex-col gap-2 w-full p-6 shadow-md bg-green-100"}>
            
            <div className="font-semibold p-2 bg-yellow-100 text-3xl">
                {props.club.title} 
            </div>

            <div className="py-4 bg-red-100">
                {props.club.description} 
            </div>

            <div className="flex gap-2 py-2">
                <button className="flex justify-center bg-blue-400 text-white min-w-12 p-2 shadow-md rounded-full text-xs">
                    Add Member
                </button>
                <button className="flex justify-center bg-blue-400 text-white min-w-12 p-2 shadow-md rounded-full text-xs">
                    Edit
                </button>
            </div>

            <div>
                {props.club.books[0].bookTitle}
            </div>

        </div>
    );
}

export default ClubDescription;