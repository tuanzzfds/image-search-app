import { useState, useEffect } from 'react';
import './scrollToTop.css';

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="scroll-top-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default ScrollToTopButton;
