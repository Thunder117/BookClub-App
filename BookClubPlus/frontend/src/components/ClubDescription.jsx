const ClubDescription = (props) => {

    return(
        <div className={"flex flex-col gap-2 w-full"}>
            <div className="flex justify-center">
                <div className="flex flex-col bg-white min-h-52 max-h-52 w-[580px] p-3 m-4 rounded-xl shadow-md">

                    <div className="font-semibold p-2 text-3xl">
                        {props.club.title} 
                    </div>

                    <div className="p-2 overflow-x-hidden overflow-auto text-ellipsis">
                        {props.club.description} 
                    </div>

                </div>

                <div className="flex flex-col bg-white min-h-52 max-h-52 w-[580px] p-3 m-4 rounded-xl shadow-md">
                    <div className="flex gap-2 p-2">

                        <button className="flex justify-center bg-blue-400 text-white min-w-16 p-3 shadow-md rounded-full text-s">
                            Add Member
                        </button>
                        <button className="flex justify-center bg-blue-400 text-white min-w-16 p-3 shadow-md rounded-full text-s">
                            Edit
                        </button>

                    </div>
                </div>
            </div>

            <div className="bg-white h-full p-2">
                <div className="">
                    {props.club.books[0].bookTitle}
                </div>
            </div>

        </div>
    );
}

export default ClubDescription;