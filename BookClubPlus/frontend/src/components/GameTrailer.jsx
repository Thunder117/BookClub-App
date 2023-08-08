
const GameTrailer = (props) => {

    const insertVideo = () => {
        return {__html: `${props.videogame.trailerPath}`};
    };

    return(
        <div className="relative h-full w-full overflow-hidden">
            { props.backgroundImage  
            ?   
                <div className="w-full h-full absolute -z-10 brightness-50 blur-sm bg-center bg-cover scale-110" style={{ backgroundImage: `url(${props.backgroundImage[0].url})`}}/>
            :   
                <div className="w-full h-screen absolute -z-10 bg-neutral-800"/>
            }
            <div className="w-full h-screen">

                <div className="h-full w-full flex flex-col justify-center">

                    <div className="self-center pt-4 pb-2" dangerouslySetInnerHTML={insertVideo()} />

                    <div className="self-center p-2 text-neutral-400 font-medium">
                        { props.videogame.title } Trailer
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default GameTrailer;