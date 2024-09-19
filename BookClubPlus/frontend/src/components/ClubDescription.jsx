

const ClubDescription = (props) => {

    return(
        <div className={"flex flex-col gap-2 w-full p-2"}>

            <div className="flex flex-col h-52 p-2 m-4 bg-white rounded-xl shadow-md">

                <div className="flex-2 font-semibold p-2 text-3xl">
                    {props.club.title} 
                </div>

                <div className="flex-1 p-2 overflow-x-hidden overflow-auto text-ellipsis">
                    {props.club.description} 
                </div>

                <div className="flex-2 flex gap-2 p-2">

                    <button className="flex justify-center bg-blue-400 text-white min-w-16 p-3 shadow-md rounded-full text-s">
                        Add Member
                    </button>
                    <button className="flex justify-center bg-blue-400 text-white min-w-16 p-3 shadow-md rounded-full text-s">
                        Edit
                    </button>

                </div>

            </div>

            <div className="bg-white p-2 m-4">
                <div className="">
                    {props.club.books[0].bookTitle}
                </div>
            </div>

        </div>
    );
}

export default ClubDescription;