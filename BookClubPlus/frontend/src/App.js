import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import BookPage from './pages/BookPage';

function App() {
	const { user } = useAuthContext();

	return (
		<>
			<Routes>

				<Route path="/" element={<Home/>}/>

				{/*<Route path="/works">
					{/*<Route index element={<AllGamesPage/>}/>}
					
				</Route>*/}
				<Route path="/works/:id" element={<BookPage/>}/>

				<Route path="/login" element={!user ? <LogIn/> : <Navigate to="/" />}/>

				<Route path="/signup" element={!user ? <SignUp/> : <Navigate to="/" />}/>

			</Routes>
		</>
	);
}

export default App;
