import { useEffect, useState } from 'react';
import './NS.css';

function NatureSnap() {
  const [vlogs, setVlogs] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(true);
  const [onlyMine, setOnlyMine] = useState(false);

  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVlogs = async () => {
      try {
        const res = await fetch('https://env-sense.onrender.com/api/vlogs');
        const data = await res.json();
        setVlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch vlogs:', error);
        setLoading(false);
      }
    };

    fetchVlogs();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://env-sense.onrender.com/api/vlogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, imageUrl, caption }),
      });

      const newVlog = await res.json();
      setVlogs([newVlog, ...vlogs]);
      setImageUrl('');
      setCaption('');
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleLike = async (vlogId) => {
    try {
      const res = await fetch(`https://env-sense.onrender.com/api/vlogs/like/${vlogId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setVlogs((prevVlogs) =>
        prevVlogs.map((v) =>
          v._id === vlogId ? { ...v, likes: Array(data.totalLikes).fill('❤️') } : v
        )
      );
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const filteredVlogs = onlyMine
    ? vlogs.filter((vlog) => vlog.username === username)
    : vlogs;

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">📸 NatureSnap</h2>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Upload 📤</button>
      </form>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={onlyMine}
          onChange={() => setOnlyMine(!onlyMine)}
          id="onlyMine"
        />
        <label htmlFor="onlyMine" className="ml-2">Show only my posts</label>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : filteredVlogs.length === 0 ? (
        <p className="text-gray-600">No posts to display.</p>
      ) : (
        filteredVlogs.map((vlog) => (
          <div key={vlog._id} className="vlog-card">
            <img src={vlog.imageUrl} alt="NatureSnap" />
            <p className="vlog-username">@{vlog.username}</p>
            <p className="vlog-caption">{vlog.caption}</p>
            <button
              onClick={() => handleLike(vlog._id)}
              className="like-button"
            >
              ❤️ {vlog.likes?.length || 0} Like
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default NatureSnap;
