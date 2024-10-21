import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import Loading from './components/loading/Loading';
import ScrollToTopButton from './components/scroll-to-top/ScrollToTop';

function App() {
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setImages([]);
    }, [filter]);

    useEffect(() => {
        const fetchImages = async () => {
            if (!filter) {
                setImages([]);
            } else {
                try {
                    setIsLoading(true);
                    const res =
                        await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${filter}&client_id=nIQrqSKXMmw7yhhtOPc7poFh5vnkO0RvX8vmIS2PfYE
`);
                    if (res.ok) {
                        const data = await res.json();
                        console.log(data);
                        if (page > data.total_pages) {
                            return;
                        }
                        setImages((prev) => [...new Set([...prev, ...data.results])]);
                    }
                } catch (error) {
                    console.error(error);
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        const timeout = setTimeout(fetchImages, 300);
        return () => clearTimeout(timeout);
    }, [filter, page]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
        setPage(1);
    };

    return (
        <div className="container">
            <h1 className="app-title">Images search</h1>
            <div className="search-field">
                <input
                    type="text"
                    className="search-field__input"
                    value={filter}
                    onChange={handleSearchChange}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="search-field__icon"
                    onClick={handleSearchChange}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </div>

            {images.length > 0 && (
                <ul className="images">
                    {images.map((image) => {
                        return (
                            <li className="image" key={image.id}>
                                <a target="_blank" rel="noreferrer" href={image.urls.raw}>
                                    <img loading="lazy" src={image.urls.raw} alt={image.urls.raw} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
            <span className="py-10">
                {isLoading && <Loading />}
                {error && <span className="error">{error}</span>}
            </span>
            <ScrollToTopButton />
        </div>
    );
}

export default App;
