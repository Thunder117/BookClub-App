
const ClubTitleButton = (props) => {

    // TODO: Stylize this button!
    return(
        <button className="text-start font-semibold px-4 py-2 mx-2 my-0.5 rounded-md hover:bg-gray-300">
            {props.club.title}
        </button>
    );
};

export default ClubTitleButton;