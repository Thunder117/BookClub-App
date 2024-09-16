

const ClubDescription = (props) => {

    return(
        <div className={"flex flex-col gap-2 w-[90%] p-6 bg-white rounded-lg"}>
            
            <div className="font-semibold p-2 text-xl text-center">
                {props.club.title} 
            </div>

            <div className="py-4">
                {props.club.description} 
            </div>

            <div className="flex gap-2 py-2">
                <button className="flex justify-center bg-blue-400 text-white min-w-12 p-2 rounded-full text-xs">
                    Add Member
                </button>
                <button className="flex justify-center bg-blue-400 text-white min-w-12 p-2 rounded-full text-xs">
                    Edit
                </button>
            </div>

            <div>
                Books in this club
            </div>

        </div>
    );
}

export default ClubDescription;