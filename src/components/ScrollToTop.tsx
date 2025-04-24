import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    const handleScroll = () => {
      const topButton = document.getElementById('scrollToTop');
      if (topButton) {
        topButton.style.display = window.scrollY > 300 ? 'block' : 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="scrollToTop"
      className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-md hover:bg-secondary transition hidden"
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
