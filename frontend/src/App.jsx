import React, {
  useState,
  useEffect,
  useRef
} from "react";

import "./styles/lovable.css";

/* ---------- ICONS ---------- */
const Icon = ({ name, size = 20, style = {} }) => {
  const icons = {
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    target: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    bar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    lightbulb: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>,
  };
  return <span style={{ display:'inline-flex', alignItems:'center', ...style }}>{icons[name]}</span>;
};

/* ---------- NAVBAR ---------- */
function Navbar({ onUploadClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <span className="nav-logo-mark">✦</span>
          Resume Intelligence System
        </a>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#upload">Upload</a></li>
          <li><a href="#matcher">JD Match</a></li>
          <li><a href="#upload" className="nav-cta" onClick={onUploadClick}>Upload Resume</a></li>
        </ul>
      </div>
    </nav>
  );
}

/* ---------- HERO ---------- */
function Hero({ onUploadClick }) {
  return (
    <section className="hero" id="home">
      <div className="hero-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="hero-content">
        <div className="hero-badge"><span className="badge-dot" />ATS-Optimized Analysis</div>
        <h1 className="hero-h1">Build a Resume<br/><em>Recruiters Notice</em></h1>
        <p className="hero-sub">Analyze ATS performance, identify skills, and compare your resume with job descriptions in seconds.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onUploadClick}>
            Analyze my Resume →
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('features').scrollIntoView({behavior:'smooth'})}>
            See how it works
          </button>
        </div>
        <div className="hero-illustration">
          <div className="resume-card-mock">
            <div className="resume-card-header">
              <div className="resume-avatar">JD</div>
              <div>
                <div className="resume-name">Jordan Davis</div>
                <div className="resume-title">Senior Product Designer · Bangalore, India</div>
              </div>
            </div>
            <div className="resume-body">
              <div className="resume-col">
                <div className="resume-section-label">Experience</div>
                <div className="resume-line w90" />
                <div className="resume-line w70" />
                <div className="resume-line w80" />
                <div style={{marginTop:16}}>
                  <div className="resume-section-label">Education</div>
                  <div className="resume-line w80" />
                  <div className="resume-line w50" />
                </div>
              </div>
              <div className="resume-col">
                <div className="resume-section-label">Skills</div>
                <div>
                  <span className="resume-chip chip-yellow">Figma</span>
                  <span className="resume-chip chip-pink">React</span>
                  <span className="resume-chip chip-lavender">UX Research</span>
                  <span className="resume-chip chip-sage">Prototyping</span>
                  <span className="resume-chip chip-yellow">Design Systems</span>
                </div>
              </div>
            </div>
            <div className="ats-mini">
              <span className="ats-mini-label">ATS Score</span>
              <div className="ats-bar-track"><div className="ats-bar-fill" /></div>
              <span className="ats-score-num">78%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const cards = [
    { icon: 'zap', color: '#FDF3D0', iconColor: '#B8930A', title: 'ATS Analysis', desc: 'Get a comprehensive ATS compatibility score and learn exactly how applicant tracking systems read your resume.' },
    { icon: 'search', color: '#EFE8F8', iconColor: '#7C4DCC', title: 'Skill Detection', desc: 'Automatically extract and categorize hard skills, soft skills, and tools from your resume text with precision.' },
    { icon: 'target', color: '#F7E7EA', iconColor: '#C0566A', title: 'JD Matching', desc: 'Paste any job description and see an instant match score showing aligned skills and gaps to address.' },
    { icon: 'bar', color: '#E4EDE8', iconColor: '#3A7D5A', title: 'Resume Insights', desc: 'Receive tailored suggestions on format, impact statements, and keyword usage to strengthen your application.' },
  ];
  return (
    <section className="section features" id="features">
      <div className="section-inner">
        <div className="features-header reveal">
          <h2 className="section-title">Everything your resume needs</h2>
          <p className="section-desc">Four powerful tools working together to give your resume the edge it deserves.</p>
        </div>
        <div className="features-grid">
          {cards.map((c, i) => (
            <div className="feature-card reveal" key={i} style={{animationDelay: `${i*0.08}s`}}>
              <div className="feature-icon" style={{background: c.color, color: c.iconColor}}>
                <Icon name={c.icon} size={22} />
              </div>
              <div className="feature-title">{c.title}</div>
              <div className="feature-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- UPLOAD ---------- */
function UploadSection({ uploadState, setUploadState, fileName, setFileName }) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    setUploadState('loading');
    setTimeout(() => setUploadState('success'), 2200);
  };

  return (
    <section className="section upload-section" id="upload">
      <div className="section-inner">
        <div className="upload-layout">
          <div className="reveal">
            <h2 className="section-title">Upload your resume</h2>
            <p className="section-desc" style={{marginBottom: 24}}>Drop your PDF resume and get a full analysis in under 30 seconds. No account required.</p>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {['PDF format supported', 'Instant ATS score', 'Private & secure — never stored'].map((t, i) => (
                <div key={i} style={{display:'flex', gap:10, alignItems:'center', fontSize:'0.88rem', color:'var(--text-secondary)'}}>
                  <span style={{width:20,height:20,borderRadius:6,background:'var(--yellow-light)',display:'flex',alignItems:'center',justifyContent:'center',color:'#B8930A',fontSize:'0.7rem',flexShrink:0}}><Icon name="check" size={12}/></span>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div
              className={`upload-zone${dragging ? ' dragging' : ''}${uploadState === 'success' ? ' success' : ''}${uploadState === 'loading' ? ' loading' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => uploadState === 'idle' && fileRef.current.click()}
            >
              <input ref={fileRef} type="file" accept=".pdf" style={{display:'none'}} onChange={e => handleFile(e.target.files[0])} />

              {uploadState === 'idle' && <>
                <div className="upload-icon"><Icon name="file" size={28} style={{color:'#B8930A'}}/></div>
                <div className="upload-title">Drop your resume here</div>
                <div className="upload-sub">Drag and drop your PDF, or click to browse</div>
                <button className="upload-btn" onClick={e => { e.stopPropagation(); fileRef.current.click(); }}>
                  <Icon name="upload" size={16}/> Choose PDF
                </button>
              </>}

              {uploadState === 'loading' && <>
                <div className="spinner" />
                <div className="upload-title">Analyzing your resume…</div>
                <div className="upload-sub" style={{color:'var(--lavender-mid)'}}>Extracting skills · Scoring ATS · Detecting keywords</div>
              </>}

              {uploadState === 'success' && <>
                <div className="upload-icon" style={{background:'#D4F5E5'}}>
                  <Icon name="check" size={28} style={{color:'#2D9B67'}}/>
                </div>
                <div className="upload-title" style={{color:'#1D6B45'}}>Analysis complete!</div>
                <div className="upload-sub">{fileName || 'resume.pdf'} · Ready to review</div>
                <button className="upload-btn success-btn">
                  <Icon name="arrow" size={16}/> View Results
                </button>
              </>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- DASHBOARD ---------- */
function Dashboard({ visible }) {
  const [scored, setScored] = useState(false);
  useEffect(() => { if (visible) setTimeout(() => setScored(true), 300); }, [visible]);

  const strengths = [
    { label: 'Keyword Density', pct: 82, color: '#E8C76A' },
    { label: 'Format & Structure', pct: 91, color: '#C9B8EF' },
    { label: 'Action Verbs', pct: 75, color: '#EDAABB' },
    { label: 'Quantified Impact', pct: 58, color: '#8ECAAA' },
  ];
  const foundSkills = ['React', 'TypeScript', 'Figma', 'UX Research', 'SQL', 'Agile', 'Prototyping'];
  const missingSkills = ['AWS', 'Python', 'A/B Testing', 'Tableau'];
  const suggestions = [
    { icon: 'lightbulb', bg: '#FDF3D0', color: '#B8930A', text: <><strong>Add measurable outcomes</strong> to 3 of your experience bullets — recruiters respond to numbers like "increased retention by 24%."</> },
    { icon: 'target', bg: '#F7E7EA', color: '#C0566A', text: <><strong>Include "A/B Testing"</strong> in your skills section — it appears in 68% of similar job postings in your target area.</> },
    { icon: 'star', bg: '#EFE8F8', color: '#7C4DCC', text: <><strong>Strengthen your summary</strong> with role-specific keywords. Your current summary lacks the terms ATS systems prioritize most.</> },
  ];

  const circumference = 2 * Math.PI * 54; // r=54
  const offset = circumference - (78 / 100) * circumference;

  return (
    <section className="section dashboard-section" id="dashboard">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">ATS Dashboard</h2>
          <p className="section-desc">Here's how your resume performs across the metrics that matter most.</p>
        </div>
        <div className="dashboard-grid">
          <div className="dash-left">
            {/* Score */}
            <div className="dash-card reveal">
              <div className="dash-card-title">ATS Score</div>
              <div className="score-circle-wrap">
                <div className="score-ring">
                  <svg width="130" height="130" viewBox="0 0 130 130">
                    <circle className="track" cx="65" cy="65" r="54" />
                    <circle
                      className="fill"
                      cx="65" cy="65" r="54"
                      style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: scored ? offset : circumference,
                        transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34,1.1,0.64,1)',
                      }}
                    />
                  </svg>
                  <div className="score-label">
                    <span className="score-num">78</span>
                    <span className="score-unit">out of 100</span>
                  </div>
                </div>
                <span className="score-tag">Good · Above Average</span>
              </div>
            </div>
            {/* Strengths */}
            <div className="dash-card reveal">
              <div className="dash-card-title">Resume Strengths</div>
              {strengths.map((s, i) => (
                <div className="strength-row" key={i}>
                  <div className="strength-label-row">
                    <span className="strength-label">{s.label}</span>
                    <span className="strength-pct">{s.pct}%</span>
                  </div>
                  <div className="strength-track">
                    <div className="strength-bar" style={{width: scored ? `${s.pct}%` : '0%', background: s.color}} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-right">
            {/* Skills Found */}
            <div className="dash-card reveal">
              <div className="dash-card-title">Skills Detected</div>
              <div className="skills-wrap">
                {foundSkills.map(s => (
                  <span className="skill-chip skill-found" key={s}>
                    <span className="skill-dot dot-found" />{s}
                  </span>
                ))}
              </div>
            </div>
            {/* Missing Skills */}
            <div className="dash-card reveal">
              <div className="dash-card-title">Skills to Add</div>
              <div className="skills-wrap">
                {missingSkills.map(s => (
                  <span className="skill-chip skill-missing" key={s}>
                    <span className="skill-dot dot-missing" />{s}
                  </span>
                ))}
              </div>
              <p style={{fontSize:'0.82rem',color:'var(--text-light)',marginTop:12}}>Based on patterns across 1,000+ similar job postings.</p>
            </div>
            {/* Suggestions */}
            <div className="dash-card reveal">
              <div className="dash-card-title">Improvement Suggestions</div>
              {suggestions.map((s, i) => (
                <div className="suggestion-item" key={i}>
                  <div className="suggestion-icon" style={{background: s.bg, color: s.color}}>
                    <Icon name={s.icon} size={16}/>
                  </div>
                  <div className="suggestion-text">{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- JD MATCHER ---------- */
function JDMatcher() {
  const [jd, setJd] = useState('');
  const [matchState, setMatchState] = useState('idle'); // idle | loading | done
  const matched = ['React', 'TypeScript', 'UX Research', 'Figma', 'Agile'];
  const missing = ['AWS', 'Python', 'Data Visualization'];

  const handleMatch = () => {
    if (!jd.trim()) return;
    setMatchState('loading');
    setTimeout(() => setMatchState('done'), 2000);
  };

  return (
    <section className="section jd-section" id="matcher">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">Match to a job description</h2>
          <p className="section-desc">Paste the full job description and see exactly how well your resume aligns.</p>
        </div>
        <div className="jd-layout">
          <div className="reveal">
            <div className="jd-input-card">
              <div className="jd-label">Job Description</div>
              <textarea
                className="jd-textarea"
                placeholder="Paste the full job description here include requirements, responsibilities, and qualifications for the most accurate match…"
                value={jd}
                onChange={e => setJd(e.target.value)}
                rows={9}
              />
              <button
                className="match-btn"
                onClick={handleMatch}
                disabled={!jd.trim() || matchState === 'loading'}
              >
                {matchState === 'loading'
                  ? <><div className="spinner" style={{width:18,height:18,borderWidth:2,margin:0}}/> Analyzing match…</>
                  : <><Icon name="target" size={16}/> Calculate Match</>
                }
              </button>
            </div>
          </div>
          <div className="reveal">
            {matchState === 'idle' && (
              <div style={{background:'var(--white)',borderRadius:'var(--radius-lg)',padding:'40px 28px',border:'1px solid var(--border)',textAlign:'center',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
                <div style={{width:64,height:64,borderRadius:18,background:'var(--lavender)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',marginBottom:4}}>
                  <Icon name="target" size={26} style={{color:'var(--lavender-mid)'}}/>
                </div>
                <p style={{fontSize:'0.95rem',fontWeight:600,color:'var(--text)'}}>Your match results will appear here</p>
                <p style={{fontSize:'0.85rem',color:'var(--text-light)',maxWidth:260}}>Paste a job description on the left and click Calculate Match to see your alignment score.</p>
              </div>
            )}
            {matchState === 'loading' && (
              <div style={{background:'var(--white)',borderRadius:'var(--radius-lg)',padding:'40px 28px',border:'1px solid var(--border)',textAlign:'center',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
                <div className="spinner" style={{width:48,height:48,borderWidth:4}}/>
                <p style={{fontWeight:600}}>Comparing your resume…</p>
                <p style={{fontSize:'0.85rem',color:'var(--text-secondary)'}}>Extracting JD requirements · Scoring overlap</p>
              </div>
            )}
            {matchState === 'done' && (
              <div className="match-results">
                <div className="match-score-card">
                  <div style={{position:'relative',width:72,height:72,flexShrink:0}}>
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="30" fill="none" stroke="var(--yellow-light)" strokeWidth="8"/>
                      <circle cx="36" cy="36" r="30" fill="none" stroke="var(--yellow)" strokeWidth="8"
                        strokeDasharray={`${2*Math.PI*30}`}
                        strokeDashoffset={`${2*Math.PI*30*(1-0.72)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 36 36)"
                        style={{transition:'stroke-dashoffset 1.5s ease'}}
                      />
                    </svg>
                    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'1rem',color:'var(--text)'}}>72%</div>
                  </div>
                  <div>
                    <div className="match-info-title">Strong Match</div>
                    <div className="match-info-desc">Your resume aligns well with this role. Addressing 3 missing skills could push your score above 85%.</div>
                  </div>
                </div>
                <div className="match-detail-card">
                  <div className="match-section-title">✓ Matched skills</div>
                  <div className="skills-wrap">
                    {matched.map(s => <span className="skill-chip skill-found" key={s}><span className="skill-dot dot-found"/>{s}</span>)}
                  </div>
                </div>
                <div className="match-detail-card">
                  <div className="match-section-title">✗ Skills to add</div>
                  <div className="skills-wrap">
                    {missing.map(s => <span className="skill-chip skill-missing" key={s}><span className="skill-dot dot-missing"/>{s}</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer>
      <div className="footer-inner">

        <div className="footer-logo">
          Resume Intelligence System
        </div>

        <div className="footer-links">

          <a
            href="https://github.com/divyaanshi1308-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" size={18} />
          </a>

          <a
            href="https://linkedin.com/in/divyanshi-maheshwari13"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="linkedin" size={18} />
          </a>

          <a href="mailto:divyaanshi1308@gmail.com">
            <Icon name="mail" size={18} />
          </a>

        </div>

        <div className="footer-logo">
          <small><em>Built by Divyanshi</em></small>
        </div>

      </div>
    </footer>
  );
}

/* ---------- SCROLL REVEAL ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ---------- APP ---------- */
function App() {
  const [uploadState, setUploadState] = useState('idle');
  const [fileName, setFileName] = useState('');

  useReveal();

  const scrollToUpload = () => {
    document.getElementById('upload').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar onUploadClick={scrollToUpload} />
      <Hero onUploadClick={scrollToUpload} />
      <Features />
      <UploadSection
        uploadState={uploadState}
        setUploadState={setUploadState}
        fileName={fileName}
        setFileName={setFileName}
      />
      <Dashboard visible={uploadState === 'success'} />
      <JDMatcher />
      <Footer />
    </div>
  );
}

export default App;
