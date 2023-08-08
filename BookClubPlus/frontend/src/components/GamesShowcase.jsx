
// components
import GameCard from "./GameCard";

const GamesShowcase = (props) => {
    const limit = props.limit;

    return(
        <div className="h-full w-full flex flex-wrap py-6 lg:px-20">
                
            { props.videogames && 
                props.videogames.slice(0, limit).map( game => {
                    return <GameCard videogame={game} key={game._id}/>
                })
            }

        </div>
    );
};

export default GamesShowcase;