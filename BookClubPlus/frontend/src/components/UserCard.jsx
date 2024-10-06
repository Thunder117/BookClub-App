const UserCard = (props) => {

    return(
        <div className="flex flex-col h-28 min-w-24 max-w-24 items-center">
            <div className="flex bg-orange-500 text-white text-3xl font-semibold justify-center items-center rounded-full h-20 w-20">
                {Array.from(props.userName)[0].toUpperCase()}
            </div>
            <div className="truncate max-w-full">
                {props.userName}
            </div>
        </div>
    );

};

export default UserCard;