import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleShortenUrl = async () => {
        try {
            setError(null);
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You must be logged in to shorten URLs.");
                return;
            }

            const response = await axios.post(
                "http://localhost:3001/lilurl",
                { longUrl },
            );

            setShortUrl(response.data.shortUrl);
        } catch (err) {
            setError("Failed to shorten URL. Please try again.");
            console.error(err);
        }
    };

    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
            
            <h1 className="text-3xl font-bold mb-6">LilURL - Shorten Your Links</h1>

            

            <div className="bg-white p-6 rounded shadow-md w-96 transition-transform duration-500 hover:scale-105">
                <h2 className="text-xl font-semibold mb-4">Shorten a URL</h2>
                <input
                    type="text"
                    placeholder="Enter long URL"
                    value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <button 
                    onClick={handleShortenUrl} 
                    className="w-full bg-violet-500 text-white py-2 rounded hover:bg-violet-700"
                >
                    Shorten URL
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {shortUrl && (
                    <div className="mt-4 p-2 border rounded bg-gray-200">
                        <p className="text-blue-600">
                            Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                        </p>
                    </div>
                )}
            </div>
            <div className="flex gap-6 mt-6">
                <button 
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={() => navigate("/signin")}
                >
                    Login
                </button>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => navigate("/signup")}
                >
                    Create Account
                </button>
                
            </div>
        </div>
    );
};

export default Home; 