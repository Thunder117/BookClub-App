
const SectionSelector = (props) => {

    return(
        <div className="flex w-full h-20 justify-center">
    
            { props.sectionSelection === true
            ?
            <>
                <div className="flex flex-row h-full w-[80%] text-xl justify-around border-b-4 rounded border-neutral-500">

                    <button className="flex flex-col justify-center basis-1/2 h-full hover:text-green-600">
                        <div className="self-center select-none">
                            Reviews
                        </div>
                        <div className="self-center w-[15%] border-b-[3px] border-green-600">

                        </div>
                    </button>

                    <button className="basis-1/2 h-full hover:text-green-600 select-none" onClick={props.sectionSelectorSwitch}>
                        Trailer
                    </button>

                </div>
            </>
            :
            <>
                <div className="flex flex-row h-full w-[80%] text-xl justify-around">

                    <button className="basis-1/2 h-full hover:text-green-600 select-none" onClick={props.sectionSelectorSwitch}>
                        Reviews
                    </button>

                    <button className="flex flex-col justify-center basis-1/2 h-full select-none hover:text-green-600">
                        <div className="self-center">
                            Trailer
                        </div>
                        <div className="self-center w-[15%] border-b-[3px] border-green-600">

                        </div>
                    </button>

                </div>
            </>
            }

        </div>
    );
};

export default SectionSelector;