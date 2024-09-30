import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Spinner } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

// components
import NavBar from '../components/NavBar';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(username, email.toLowerCase(), password);
    };

    // TODO: give a link to login
    return(
        <>
            <NavBar showNav/>

            { isLoading && 
                 <Spinner  
                    center={true} 
                    width={"150px"} 
                    height={"150px"}
                />
            }

            <div className="font-sans bg-gradient-to-br from-sky-500 to-blue-500 flex min-h-screen justify-center items-center">

                <div className="w-full sm:w-[450px] h-screen sm:h-full pt-32 pb-4 px-6 sm:pt-4 sm:mt-24 sm:rounded-md drop-shadow-2xl bg-[#323338]">

                    <form className="flex flex-col text-xs font-bold tracking-wide text-neutral-300" onSubmit={handleSubmit}>

                        <div className="flex justify-center py-6">
                            <h3 className="text-2xl text-white">Create an account</h3>
                        </div>

                        <label>USERNAME</label>
                        <input
                            type='text'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="bg-[#1b1b1e] rounded-sm h-10 px-2 mt-2 mb-4 text-base"
                        />

                        <label>EMAIL</label>
                        <input
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="bg-[#1b1b1e] rounded-sm h-10 px-2 mt-2 mb-4 text-base"
                        />

                        <label>PASSWORD</label>
                        <input
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="bg-[#1b1b1e] rounded-sm h-10 px-2 mt-2 mb-4 text-base"
                        />

                        {error && <div className="text-red-700">{error}</div>}
                        <button className="bg-sky-600 text-white rounded-sm px-6 py-4 my-4" disabled={isLoading}>Continue</button>
                    
                    </form>

                </div>

            </div>
        </>
    )
}

export default SignUp;