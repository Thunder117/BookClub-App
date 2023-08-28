const GameInformationLink = (props) => {

	return(
        <div className="text-gray-300 font-semibold">
            <span className="text-gray-400">{props.title}: </span> 
            
            {Array.isArray(props.answer) 
            ? 
            <button className="hover:text-gray-400">
                {props.answer.map( (title, index) => {
                    if(props.answer.length -1 === index) {
                        return ` ${title}`
                    }
                    return ` ${title},`
                })}
            </button>
            : 
            <button className="hover:text-gray-400">
                {props.answer}
            </button>
            }
        
        </div>
    );
};

export default GameInformationLink;