import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import BookPage from './pages/BookPage';
import CreateClubFromBookPage from './pages/CreateClubFromBookPage';
import ClubsPage from './pages/ClubsPage';

function App() {
	const { user } = useAuthContext();

	return (
		<>
			<Routes>

				<Route path="/" element={<Home/>}/>

				<Route path="/book/:id" element={<BookPage/>}/>

				<Route path="/createclub/:id" element={<CreateClubFromBookPage/>}/>

				<Route path="/clubs" element={<ClubsPage/>}/>

				<Route path="/login" element={!user ? <LogIn/> : <Navigate to="/"/>}/>
				
				<Route path="/login/:id" element={<LogIn/>}/>

				<Route path="/signup" element={!user ? <SignUp/> : <Navigate to="/"/>}/>

				<Route path="/signup/:id" element={<SignUp/>}/>

			</Routes>
		</>
	);
}

export default App;
