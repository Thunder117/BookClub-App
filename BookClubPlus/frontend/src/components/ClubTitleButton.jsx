
const ClubTitleButton = (props) => {

    // TODO: Stylize this button!
    return(
        <div className={`${props.clubSelected === props.club._id ? "border-indigo-500 border-l-2" : "order-purple-500"} flex flex-col`}>

            <button onClick={() => props.clubSelector(props.club._id)} className={`text-start font-semibold px-2 py-2 mx-2 my-0.5 rounded-md transition hover:bg-gray-300`}>
                {props.club.title} 
            </button>

        </div>
    );
};

export default ClubTitleButton;