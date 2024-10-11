
const ClubTitleButton = (props) => {

    return(
        
        <div className={`flex`}>

            <button 
                onClick={() => props.clubSelector(props.club._id)} 
                className={`${props.clubSelected === props.club._id ? "bg-blue-700" : "hover:bg-blue-600"} lg:w-full text-white font-semibold px-2 py-2 mx-2 rounded-xl transition`}>
                    {props.club.title} 
            </button>

        </div>
    );
};

export default ClubTitleButton;