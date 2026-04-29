import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Countries from './pages/Countries';
import Authors from './pages/Authors';
import BookDetails from './pages/BookDetails';
import AuthorDetails from './pages/AuthorDetails';
import CountryDetail from './pages/CountryDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route path="/authors" element={<Authors />} />
                    <Route path="/authors/:id" element={<AuthorDetails />} />
                    <Route path="/countries" element={<Countries />} />
                    <Route path="/countries/:id" element={<CountryDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;