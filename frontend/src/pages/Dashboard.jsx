import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [urls, setUrls] = useState([]);
    const navigate = useNavigate();
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState(null);

    const handleShortenUrl = async () => {
        try {
            setError(null);
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You must be logged in to shorten URLs.");
                return;
            }

            const response = await axios.post(
                "http://localhost:3001/dashboard",
                {longUrl },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
                 
            );

            setShortUrl(response.data.shortUrl);
        } catch (err) {
            setError("Failed to shorten URL. Please try again.");
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchUrls = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              console.error("No token found in localStorage");
              return;
            }
      
            const response = await axios.get("http://localhost:3001/analytics", {
                headers: { Authorization: `Bearer ${token}` }
            });
      
            setUrls(response.data);
          } catch (error) {
            console.error("Error fetching URLs:", error);
          }
        };
      
        fetchUrls();
      }, []);

    return (
        <div className="container mx-15 mt-10 overflow-auto">
            <button className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 cursor-pointer"
                onClick={() => navigate("/Home")}>Go back to Home</button>
            <div className="flex flex-col items-start mt-10 ">
                <div className="bg-white p-6 rounded shadow-md w-auto transition-transform duration-500 hover:scale-105">
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
                        className="w-full bg-violet-500 text-white py-2 rounded hover:bg-violet-700 cursor-pointer"
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
            </div>

            <h1 className="text-2xl font-bold mb-4 mt-10">Dashboard</h1>


            <table className="w-auto border-collapse border border-gray-300 mb-10">
                <thead>
                    <tr className="bg-slate-200">
                        <th className="border p-2">Short URL</th>
                        <th className="border p-2 ">Long URL</th>
                        <th className="border p-2">Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.length > 0 ? (
                        urls.map((url) => (
                            <tr key={url._id} className="border">
                                <td className="border p-2 text-blue-500 pr-10">
                                    <a href={`http://localhost:3001/lilurl/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                                        {`http://localhost:3001/lilurl/${url.shortCode}`}
                                    </a>
                                </td>
                                <td className="border p-2 max-w-xl truncate overflow-hidden whitespace-nowrap">{url.longUrl}</td>
                                <td className="border p-2 text-center">{url.clicks}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No URLs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard; 