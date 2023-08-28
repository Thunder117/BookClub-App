// components
import GameCard from "./GameCard";

const GamesShowcase = (props) => {
    const limit = props.limit;

    return(
        <div className="h-full w-full flex flex-wrap lg:flex-nowrap py-6 overflow-x-auto">
                
            { props.videogames && 
                props.videogames.slice(0, limit).map( game => {
                    return <GameCard videogame={game} key={game._id}/>
                })
            }

        </div>
    );
};

export default GamesShowcase;