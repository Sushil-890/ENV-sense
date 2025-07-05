function About() {
  return (
    <div className="aboutcomp">
      <h2 className="aboutcomp-title">About ENV-sense</h2>
      <p className="aboutcomp-text">
        ENV-sense is a smart weather insight platform built to keep you aware, safe, and even smiling throughout your day. Whether you're planning a trip, dressing for the day, or just curious about the environment, ENV-sense gives you live weather updates along with lighthearted jokes to brighten your mood.
      </p>
      <p className="aboutcomp-text mt-2">
        The application fetches real-time data from the OpenWeatherMap API to provide temperature, conditions, and smart suggestions. It also uses JokeAPI to give you a refreshing laugh every day. Designed for simplicity and clarity, ENV-sense ensures everyone can access accurate weather information with a touch of fun.
      </p>
      <p className="aboutcomp-text mt-2">
        A recent feature, <strong>NatureSnap</strong>, allows users to upload beautiful moments from nature — be it a sunset, greenery, or a rainy evening. These snaps can be liked by others, fostering a small, joyful community of weather watchers and nature lovers.
      </p>
      <p className="aboutcomp-tech mt-3">
        🔧 Tech Stack: React + Vite, CSS, Node.js, Express, MongoDB, OpenWeatherMap API, and JokeAPI.
      </p>
      <p className="aboutcomp-text mt-2 italic text-sm text-gray-500">
        Built with ❤️ for the Call2Code Hackathon 2025.
      </p>
    </div>
  );
}

export default About;
