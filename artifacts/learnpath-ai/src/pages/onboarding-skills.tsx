import { useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Compass, Plus, X } from 'lucide-react';
import { useLocation } from 'wouter';

// ─── Comprehensive CS skill catalog (Workday-style taxonomy) ─────────────────

const groups: Record<string, string[]> = {
  'Programming languages': [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'C#', 'Go', 'Rust',
    'Kotlin', 'Swift', 'PHP', 'Ruby', 'R', 'Dart', 'Scala', 'Haskell', 'Elixir',
    'Clojure', 'F#', 'OCaml', 'Julia', 'MATLAB', 'Lua', 'Perl', 'Assembly',
    'COBOL', 'Fortran', 'Bash', 'PowerShell', 'SQL', 'VHDL', 'Verilog',
  ],
  'Web frontend': [
    'HTML', 'CSS', 'Sass/SCSS', 'Tailwind CSS', 'Bootstrap', 'React', 'Next.js',
    'Vue.js', 'Nuxt', 'Angular', 'Svelte', 'Astro', 'Remix', 'Three.js',
    'WebGL', 'D3.js', 'jQuery', 'Redux', 'Zustand', 'Jotai', 'React Query',
    'Framer Motion', 'Web animations', 'Responsive design', 'Accessibility',
    'Web performance', 'Progressive web apps', 'Web components', 'Browser APIs',
  ],
  'Web backend': [
    'Node.js', 'Express.js', 'NestJS', 'Fastify', 'Hono', 'Django', 'Flask',
    'FastAPI', 'Ruby on Rails', 'Spring Boot', 'ASP.NET Core', 'Laravel',
    'Phoenix', 'tRPC', 'REST API design', 'GraphQL', 'gRPC', 'WebSockets',
    'Server-sent events', 'API authentication', 'Rate limiting', 'API versioning',
  ],
  'Backend & architecture': [
    'Object-oriented programming', 'Functional programming', 'Data structures',
    'Algorithms', 'System design', 'Distributed systems', 'Microservices',
    'Event-driven architecture', 'CQRS', 'Event sourcing', 'Domain-driven design',
    'Clean architecture', 'SOLID principles', 'Design patterns', 'API design',
    'Caching strategies', 'Message queues', 'Concurrency', 'Multithreading',
    'Asynchronous programming', 'Load balancing', 'Fault tolerance',
  ],
  'Data & databases': [
    'SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Elasticsearch',
    'DynamoDB', 'Cassandra', 'Neo4j', 'InfluxDB', 'Firestore', 'Supabase',
    'Database design', 'Data modeling', 'Query optimization', 'Indexing',
    'Transactions', 'ACID properties', 'NoSQL patterns', 'ETL pipelines',
    'Data warehousing', 'Snowflake', 'BigQuery', 'Redshift', 'dbt',
    'Apache Spark', 'Apache Kafka', 'RabbitMQ', 'Apache Flink',
    'Data visualization', 'Data cleaning', 'Pandas', 'NumPy', 'Polars',
  ],
  'AI & machine learning': [
    'Machine learning', 'Supervised learning', 'Unsupervised learning',
    'Semi-supervised learning', 'Self-supervised learning', 'Deep learning',
    'Neural networks', 'Convolutional neural networks', 'Recurrent neural networks',
    'Transformers', 'Attention mechanisms', 'Natural language processing',
    'Computer vision', 'Reinforcement learning', 'Multi-agent systems',
    'Generative AI', 'Large language models', 'Prompt engineering',
    'Retrieval-augmented generation (RAG)', 'Embeddings', 'Vector databases',
    'Fine-tuning', 'LoRA / QLoRA', 'RLHF', 'Diffusion models',
    'Model evaluation', 'Benchmarking', 'Interpretability', 'Fairness in AI',
    'Scikit-learn', 'PyTorch', 'TensorFlow', 'Keras', 'JAX', 'Hugging Face',
    'LangChain', 'LlamaIndex', 'OpenCV', 'NLTK', 'spaCy',
  ],
  'MLOps & AI systems': [
    'MLOps', 'Model deployment', 'Model serving', 'Feature engineering',
    'Feature stores', 'Experiment tracking', 'MLflow', 'Weights & Biases',
    'Data pipelines', 'Model monitoring', 'Drift detection', 'A/B testing',
    'Canary deployments', 'ONNX', 'TensorRT', 'Model quantization',
    'Knowledge distillation', 'Edge AI', 'CUDA', 'GPU programming',
  ],
  'Cloud & infrastructure': [
    'Amazon Web Services (AWS)', 'Google Cloud Platform', 'Microsoft Azure',
    'AWS EC2', 'AWS S3', 'AWS Lambda', 'AWS SageMaker', 'Google Vertex AI',
    'Azure ML', 'Serverless computing', 'Cloud architecture', 'Multi-cloud',
    'Cloud cost optimization', 'Infrastructure as Code', 'Terraform', 'Pulumi',
    'Ansible', 'Packer', 'Cloud networking', 'VPC design',
  ],
  'DevOps & platform': [
    'Docker', 'Kubernetes', 'Helm', 'CI/CD', 'GitHub Actions', 'GitLab CI',
    'Jenkins', 'ArgoCD', 'Flux', 'Prometheus', 'Grafana', 'Datadog',
    'ELK stack', 'Loki', 'OpenTelemetry', 'Nginx', 'Traefik',
    'Service mesh', 'Istio', 'Linux', 'Shell scripting', 'Site reliability engineering',
    'Incident management', 'Observability', 'Chaos engineering',
  ],
  'Security': [
    'Cybersecurity', 'Application security', 'Network security', 'Cloud security',
    'Identity and access management', 'OAuth 2.0', 'OpenID Connect', 'JWT',
    'Cryptography', 'PKI', 'TLS/SSL', 'Secure coding', 'OWASP Top 10',
    'Threat modeling', 'Penetration testing', 'SAST / DAST', 'Vulnerability management',
    'Secrets management', 'Zero trust architecture', 'SIEM', 'SOC operations',
  ],
  'Networking': [
    'TCP/IP', 'HTTP/HTTPS', 'HTTP/2', 'HTTP/3', 'WebSockets', 'DNS',
    'CDN', 'Load balancers', 'Firewalls', 'VPN', 'Network protocols',
    'BGP', 'OSI model', 'Subnetting', 'IPv4/IPv6',
  ],
  'Mobile development': [
    'iOS development', 'Android development', 'React Native', 'Flutter',
    'SwiftUI', 'Jetpack Compose', 'Expo', 'Mobile UI design',
    'Push notifications', 'Offline-first apps', 'App performance',
    'App Store optimization', 'In-app purchases',
  ],
  'Data science & analytics': [
    'Statistics', 'Probability', 'Bayesian inference', 'Hypothesis testing',
    'A/B testing', 'Regression analysis', 'Classification', 'Clustering',
    'Time series analysis', 'Forecasting', 'Exploratory data analysis',
    'Statistical modeling', 'Research methods', 'Survey design',
    'Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI',
    'Jupyter notebooks', 'R for statistics',
  ],
  'Testing & quality': [
    'Unit testing', 'Integration testing', 'End-to-end testing',
    'Test-driven development (TDD)', 'Behavior-driven development (BDD)',
    'Property-based testing', 'Mutation testing', 'Load testing',
    'Performance testing', 'Accessibility testing', 'Visual regression testing',
    'Jest', 'Vitest', 'Pytest', 'JUnit', 'Cypress', 'Playwright', 'Selenium',
    'k6', 'Artillery', 'Postman',
  ],
  'Tools & practices': [
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Monorepos', 'Code review',
    'Documentation', 'Technical writing', 'Debugging', 'Profiling',
    'Agile / Scrum', 'Kanban', 'Open source contribution', 'Developer tooling',
    'Vim / Neovim', 'VS Code', 'IntelliJ IDEA', 'Postman / Bruno',
    'Figma to code', 'Storybook', 'Chromatic',
  ],
  'Computer science fundamentals': [
    'Discrete mathematics', 'Linear algebra', 'Calculus', 'Probability & statistics',
    'Graph theory', 'Combinatorics', 'Algorithm analysis', 'Complexity theory',
    'Computability theory', 'Information theory', 'Automata theory',
    'Compiler design', 'Operating systems', 'Computer architecture',
    'Memory management', 'Virtual machines', 'Concurrency theory',
    'Parallel computing', 'Distributed computing theory',
  ],
  'Professional & soft skills': [
    'Problem solving', 'System thinking', 'Technical communication',
    'Engineering leadership', 'Mentoring', 'Code review culture',
    'Team collaboration', 'Estimation', 'Architectural decision records',
    'Product thinking', 'Stakeholder communication',
  ],
};

const catalog = Object.entries(groups).flatMap(([category, skills]) =>
  skills.map(name => ({ name, category }))
);

// ─── Destination options ──────────────────────────────────────────────────────

const destinations = [
  'Become an AI / ML engineer',
  'Become a data scientist',
  'Become a software engineer',
  'Become a frontend developer',
  'Become a backend developer',
  'Become a full-stack developer',
  'Become a cloud / DevOps engineer',
  'Become a cybersecurity engineer',
  'Become a mobile developer',
  'Build stronger technical foundations',
  'Transition into tech from another field',
  'Other — let me describe it',
];

const rhythms = ['Short focused sessions (20–30 min)', 'Build as I learn — projects first', 'Deep dives on weekends', 'Mixed — flexible by the week'];
const timeOptions = ['3–5 hours per week', '6–9 hours per week', '10+ hours per week'];

// ─── Mini components ──────────────────────────────────────────────────────────

function MiniLogo() {
  return (
    <div className="flex items-center gap-2.5 font-bold tracking-tight text-[#294843]">
      <span className="grid size-8 place-items-center rounded-[10px] bg-[#e9ae3d] text-[#294843]">
        <Compass size={18} strokeWidth={2.5} />
      </span>
      <span className="font-[Space_Grotesk,sans-serif] text-[17px]">
        learnpath<span className="text-[#d69323]">.</span>ai
      </span>
    </div>
  );
}

const PrimaryBtn = ({ children, onClick, disabled = false }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled}
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1e8f87] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#187a73] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
    {children}
  </button>
);

// ─── Workday-style skill picker ───────────────────────────────────────────────

function SkillPicker({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (skill: string) =>
    onChange(skills.includes(skill) ? skills.filter(s => s !== skill) : [...skills, skill]);

  const addCustom = () => {
    const value = query.trim();
    if (value && !skills.some(s => s.toLowerCase() === value.toLowerCase())) {
      onChange([...skills, value]);
    }
    setQuery('');
    inputRef.current?.focus();
  };

  const filtered = query.trim()
    ? catalog.filter(s => !skills.includes(s.name) && s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 24)
    : activeCategory
    ? catalog.filter(s => !skills.includes(s.name) && s.category === activeCategory).slice(0, 30)
    : [];

  const categories = Object.keys(groups);

  return (
    <div className="relative mt-8">
      {/* Input box + chips */}
      <div
        className="min-h-[52px] cursor-text rounded-2xl border border-[#c8d5c4] bg-white p-3 shadow-sm transition focus-within:border-[#1e8f87] focus-within:ring-2 focus-within:ring-[#1e8f87]/10"
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
      >
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="inline-flex items-center gap-1.5 rounded-lg bg-[#dceee4] px-2.5 py-1.5 text-xs font-bold text-[#1e8f87]">
              {skill}
              <button type="button" onClick={e => { e.stopPropagation(); toggle(skill); }} className="rounded-full p-0.5 hover:bg-[#bcdacf]" aria-label={`Remove ${skill}`}>
                <X size={11} />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={e => { setQuery(e.target.value); setOpen(true); setActiveCategory(null); }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (query.trim()) addCustom(); } if (e.key === 'Escape') setOpen(false); }}
            placeholder={skills.length ? 'Add another skill…' : 'Search or browse the CS skill catalog…'}
            className="min-w-[200px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-[#9aada5]"
            data-testid="input-onboarding-skills"
          />
          <button type="button" onClick={e => { e.stopPropagation(); setOpen(o => !o); setActiveCategory(null); }} className="self-start rounded-lg p-1.5 text-[#718079] hover:bg-[#eef2ea]">
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <p className="mt-1.5 px-1 text-[10px] text-[#9aada5]">
          {skills.length > 0 ? `${skills.length} skill${skills.length === 1 ? '' : 's'} selected · press Enter to add custom` : 'Type to search · or browse by category below'}
        </p>
      </div>

      {/* Dropdown panel */}
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => { setOpen(false); setActiveCategory(null); }} />
          <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[#d0dbd0] bg-white shadow-[0_20px_60px_rgba(30,55,45,.14)]">
            {/* Category rail */}
            <div className="flex gap-1 overflow-x-auto border-b border-[#edf0ea] bg-[#f6f8f4] px-3 py-2">
              <button
                onClick={() => { setActiveCategory(null); setQuery(''); }}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-bold whitespace-nowrap transition ${!activeCategory && !query ? 'bg-[#1e8f87] text-white' : 'text-[#718079] hover:bg-[#e8eee6]'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setQuery(''); }}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-bold whitespace-nowrap transition ${activeCategory === cat ? 'bg-[#1e8f87] text-white' : 'text-[#718079] hover:bg-[#e8eee6]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results list */}
            <div className="max-h-[340px] overflow-auto p-2">
              {/* Add custom skill option */}
              {query.trim() && !filtered.some(s => s.name.toLowerCase() === query.trim().toLowerCase()) && (
                <button type="button" onClick={addCustom}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-[#f0f5ef]">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#fae9bb] text-[#9b691c]"><Plus size={15} /></span>
                  <span><span className="block text-sm font-bold text-[#294843]">Add "{query.trim()}"</span><span className="text-xs text-[#83918a]">Add as a custom skill</span></span>
                </button>
              )}

              {/* Matching skills */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-0.5 md:grid-cols-2">
                  {filtered.map(skill => (
                    <button type="button" key={skill.name} onClick={() => { toggle(skill.name); if (!query) { /* stay open for browsing */ } else { setQuery(''); } }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${skills.includes(skill.name) ? 'bg-[#dceee4]' : 'hover:bg-[#f0f5ef]'}`}>
                      <span>
                        <span className="block text-sm font-bold text-[#40534d]">{skill.name}</span>
                        {!activeCategory && <span className="text-[10px] uppercase tracking-wider text-[#9aa7a0]">{skill.category}</span>}
                      </span>
                      {skills.includes(skill.name) ? <Check size={14} className="text-[#1e8f87]" /> : <Plus size={13} className="text-[#9aa7a0]" />}
                    </button>
                  ))}
                </div>
              ) : (
                !query.trim() && !activeCategory && (
                  <p className="p-5 text-center text-xs text-[#9aada5]">
                    Type to search 486+ CS skills, or pick a category above to browse
                  </p>
                )
              )}

              {!query.trim() && !activeCategory && (
                <div className="mt-2 border-t border-[#edf0ea] px-3 pt-3 pb-2">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#b17820]">Popular right now</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'Machine learning', 'React', 'TypeScript', 'Docker', 'SQL', 'PyTorch', 'System design', 'AWS', 'Node.js'].map(s => (
                      <button key={s} onClick={() => toggle(s)}
                        className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${skills.includes(s) ? 'bg-[#dceee4] text-[#1e8f87]' : 'bg-[#f0f4ee] text-[#40534d] hover:bg-[#e2ede3]'}`}>
                        {s}{skills.includes(s) && <Check size={10} className="ml-1 inline" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Onboarding shell ─────────────────────────────────────────────────────────

export default function OnboardingSkills() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [rhythm, setRhythm] = useState('');
  const [time, setTime] = useState('');

  const effectiveGoal = goal === 'Other — let me describe it' ? customGoal : goal;
  const canContinue =
    step === 0 ? Boolean(effectiveGoal.trim()) :
    step === 1 ? skills.length > 0 :
    step === 2 ? Boolean(rhythm) :
    step === 3 ? Boolean(time) : true;

  const next = () => { if (step < 4) setStep(step + 1); };
  const back = () => { if (step > 0) setStep(step - 1); else setLocation('/register'); };

  const steps = ['Destination', 'Skills', 'Rhythm', 'Time', 'Review'];

  return (
    <div className="min-h-[100dvh] bg-[#f5f7f2] text-[#294843]">
      <header className="flex h-[68px] items-center justify-between border-b border-[#dbe4da] bg-[#f5f7f2]/90 px-5 backdrop-blur-sm lg:px-10">
        <MiniLogo />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#83918a]">Profile setup · {step + 1}/5</span>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 md:py-20">
        {/* Progress bar */}
        <div className="mb-10 flex gap-1.5">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i < step ? 'bg-[#1e8f87]' : i === step ? 'bg-[#e9ae3d]' : 'bg-[#dce4da]'}`} />
            </div>
          ))}
        </div>

        {/* Review step */}
        {step === 4 ? (
          <section className="rounded-2xl border border-[#dbe4da] bg-white p-7 shadow-sm md:p-10">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[#b17820]">Ready to begin</p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-.05em]">Here's what we heard.</h1>
            <p className="mt-3 text-sm leading-6 text-[#718079]">Your personalized learning path will start here. You can refine everything after the baseline assessment.</p>
            <div className="mt-8 divide-y divide-[#e4e9e2]">
              {[
                ['Destination', effectiveGoal],
                ['Skills you know', skills.length > 0 ? skills.join(', ') : 'Starting fresh'],
                ['Learning rhythm', rhythm],
                ['Weekly time', time],
              ].map(([a, b]) => (
                <div key={a} className="flex justify-between gap-5 py-4">
                  <span className="text-sm text-[#83918a]">{a}</span>
                  <span className="max-w-[65%] text-right text-sm font-bold">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryBtn onClick={() => setLocation('/assessment')}>Take the 12-minute baseline <ArrowRight size={16} /></PrimaryBtn>
              <button onClick={() => setStep(0)} className="text-sm font-bold text-[#718079] hover:text-[#36504a]">Edit answers</button>
            </div>
            <p className="mt-5 text-center text-xs text-[#9aada5]">Your answers stay in this browser for now — nothing is stored remotely.</p>
          </section>
        ) : (
          <section className="animate-rise">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[#b17820]">Step {String(step + 1).padStart(2, '0')}</p>
            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-[-.06em] text-[#294843]">
              {step === 0 ? 'Where are you headed?' :
               step === 1 ? 'What do you already know?' :
               step === 2 ? 'How do you like to learn?' :
               'How much time is real?'}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#718079]">
              {step === 0 ? 'A clear destination lets us plan the most direct route. Choose the outcome that fits your ambition.' :
               step === 1 ? 'Add the tools, languages, and topics you have already practiced. We will use this to skip what you already know.' :
               step === 2 ? "We\u2019ll shape the rhythm around how your attention actually works \u2014 not how you wish it did." :
               'An honest number here means a plan you can actually keep. Consistency beats ambition.'}
            </p>

            {/* Step 0: Destination */}
            {step === 0 && (
              <div className="mt-8 grid gap-2.5">
                {destinations.map(d => (
                  <button key={d} onClick={() => setGoal(d)}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${goal === d ? 'border-[#1e8f87] bg-[#e8f2ec] shadow-sm' : 'border-[#d5ddd2] bg-white hover:border-[#9eb9a5]'}`}
                    data-testid={`button-onboarding-goal-${d.slice(0, 10)}`}>
                    <span className="text-sm font-bold text-[#40534d]">{d}</span>
                    <span className={`grid size-6 place-items-center rounded-full border transition-colors ${goal === d ? 'border-[#1e8f87] bg-[#1e8f87] text-white' : 'border-[#c0ccbf] text-transparent'}`}>
                      <Check size={13} />
                    </span>
                  </button>
                ))}
                {goal === 'Other — let me describe it' && (
                  <div className="rounded-2xl border border-[#c7d8ca] bg-[#eef5ef] p-4">
                    <label className="block text-sm font-bold text-[#36504a]">Tell us about your destination</label>
                    <textarea autoFocus value={customGoal} onChange={e => setCustomGoal(e.target.value)} rows={3}
                      placeholder="e.g. I want to become a product designer, or build my own SaaS."
                      className="mt-2 w-full resize-none rounded-xl border border-[#c0d0c2] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1e8f87]"
                      data-testid="textarea-onboarding-custom-goal" />
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Skills (Workday-style picker) */}
            {step === 1 && (
              <>
                <SkillPicker skills={skills} onChange={setSkills} />
                {skills.length === 0 && (
                  <button onClick={() => { setSkills(['Starting from scratch']); }} className="mt-4 text-sm font-bold text-[#718079] underline underline-offset-2">
                    I'm starting from the beginning — skip this
                  </button>
                )}
              </>
            )}

            {/* Steps 2 & 3: Radio options */}
            {(step === 2 || step === 3) && (
              <div className="mt-8 grid gap-2.5">
                {(step === 2 ? rhythms : timeOptions).map(option => (
                  <button key={option} onClick={() => step === 2 ? setRhythm(option) : setTime(option)}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${(step === 2 ? rhythm : time) === option ? 'border-[#1e8f87] bg-[#e8f2ec] shadow-sm' : 'border-[#d5ddd2] bg-white hover:border-[#9eb9a5]'}`}
                    data-testid={`button-onboarding-option-${option.slice(0, 8)}`}>
                    <span className="text-sm font-bold text-[#40534d]">{option}</span>
                    <span className={`grid size-6 place-items-center rounded-full border transition-colors ${(step === 2 ? rhythm : time) === option ? 'border-[#1e8f87] bg-[#1e8f87] text-white' : 'border-[#c0ccbf] text-transparent'}`}>
                      <Check size={13} />
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between">
              <button onClick={back} className="text-sm font-bold text-[#83918a] hover:text-[#36504a]">
                {step > 0 ? '← Back' : 'Save and exit'}
              </button>
              <PrimaryBtn disabled={!canContinue} onClick={next}>
                {step === 3 ? 'Review answers' : 'Continue'} <ArrowRight size={16} />
              </PrimaryBtn>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
