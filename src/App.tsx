import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/Layout';
import Home from './ui/pages/Home';
import Books from './ui/pages/Books';
import Countries from './ui/pages/Countries';
import Authors from './ui/pages/Authors';
import BookDetails from './ui/pages/BookDetails';
import AuthorDetails from './ui/pages/AuthorDetails';
import CountryDetail from './ui/pages/CountryDetail';
import RegisterPage from "./ui/pages/RegisterPage.tsx";
import LoginPage from "./ui/pages/LoginPage.tsx";
import AuthProvider from "./providers/authProvider.tsx";
import ProtectedRoute from "./ui/components/ProtectedRoute.tsx";

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route element={<ProtectedRoute/>}>
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route path="/authors" element={<Authors />} />
                    <Route path="/authors/:id" element={<AuthorDetails />} />
                    <Route path="/countries" element={<Countries />} />
                    <Route path="/countries/:id" element={<CountryDetail />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;