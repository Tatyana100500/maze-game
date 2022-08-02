import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import { NavBar , PostsList, Login } from '../components'
import store from '../store';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
		<Provider store={store}>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/posts" exact element={<PostsList/>} />
				<Route path="/" exact element={<Login/>} />
            </Routes>
        </Router>
		</Provider>
    )
}

export default App