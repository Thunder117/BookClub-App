
const SearchBar = (props) => {

    return (
        <form className="flex w-4/5 md:w-2/5 my-4 font-bold" onSubmit={props.fetchBook}>
                                
            <div className="relative flex w-full">
            
                <input
                    type='text'
                    onChange={(e) => props.setTextValue(e.target.value)}
                    value={props.textValue}
                    placeholder="The Name of the Wind..."
                    className="rounded-full w-full h-12 px-10 text-base"
                />

                <button className="absolute top-3 right-3 text-sky-600" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>

        </form>
    );
};

export default SearchBar;