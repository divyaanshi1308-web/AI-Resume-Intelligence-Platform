import { FaFileUpload, FaSearch, FaChartLine } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Resume Intelligence</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
        </div>

        <button className="primary-btn">
          Upload Resume
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <span className="tag">
            Smart Resume Analysis
          </span>

          <h1>
            AI Resume <br />
            Intelligence Platform
          </h1>

          <p>
            Upload your resume, get ATS score,
            analyze skills and match with job
            descriptions effortlessly.
          </p>

          <button className="hero-btn">
            <FaFileUpload />
            Upload Resume
          </button>
        </div>

        <div className="hero-right">
          <div className="resume-card">
            <FaFileAlt />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="card">
          <FaChartLine />
          <h3>ATS Analysis</h3>
          <p>Get detailed ATS score</p>
        </div>

        <div className="card">
          <FaSearch />
          <h3>Skill Detection</h3>
          <p>Identify important skills</p>
        </div>

        <div className="card">
          <FaChartLine />
          <h3>JD Matching</h3>
          <p>Compare with jobs</p>
        </div>

        <div className="card">
          <FaChartLine />
          <h3>Career Insights</h3>
          <p>Improve your resume</p>
        </div>
      </section>

      {/* Main Section */}
      <section className="main-grid">
        <div className="upload-box">
          <h2>Upload Your Resume</h2>

          <div className="drop-area">
            <FaFileUpload size={50} />
            <p>Drag & Drop Resume Here</p>
            <small>PDF only</small>
          </div>
        </div>

        <div className="jd-box">
          <h2>Check JD Match</h2>

          <textarea
            placeholder="Paste Job Description..."
          />

          <button className="primary-btn full">
            Check Match
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;