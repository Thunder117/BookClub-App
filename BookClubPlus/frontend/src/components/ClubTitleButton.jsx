
const ClubTitleButton = (props) => {

    return(
        
        <div className={`flex`}>

            <div className={`${props.clubSelected === props.club._id ? "border-indigo-500" : "border-gray-100"} border-l-2 flex`}>

            </div>

            <button onClick={() => props.clubSelector(props.club._id)} className={`${props.clubSelected === props.club._id ? "bg-indigo-100" : "hover:bg-indigo-50"} w-full text-start font-semibold px-2 py-2 mx-2 my-0.5 rounded-md transition`}>
                {props.club.title} 
            </button>

        </div>
    );
};

export default ClubTitleButton;