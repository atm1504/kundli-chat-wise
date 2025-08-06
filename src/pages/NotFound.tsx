import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-celestial">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! This cosmic page doesn't exist</p>
        <a href="/" className="text-primary hover:text-primary-glow underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
