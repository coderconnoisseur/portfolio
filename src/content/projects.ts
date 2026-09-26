export type Link = { kind: 'github' | 'live'; href: string }

export type Thumb =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'code'; file: string; lang: 'go' | 'cpp'; code: string }

export type Project = {
  id: string
  name: string
  category: string
  year: string
  status?: string
  line: string
  highlight: string
  stack: string[]
  links: Link[]
  thumb: Thumb
}

const gh = (repo: string) => `https://github.com/coderconnoisseur/${repo}`

export const projects: Project[] = [
  {
    id: 'ridepulse',
    name: 'RidePulse',
    category: 'Distributed systems',
    year: '2026',
    line: 'An event-driven dispatch system that matches riders to nearby drivers in real time, with Kafka between every stage and Redis GEO for matching.',
    highlight: '10,000+ ride events a minute, P90 driver assignment under 45 ms.',
    stack: ['Go', 'Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Prometheus'],
    links: [{ kind: 'github', href: gh('ridepulse') }],
    thumb: { kind: 'image', src: '/images/ridepulse.jpg', alt: 'RidePulse architecture diagram: simulators, Kafka topics, the matching service and Redis.' },
  },
  {
    id: 'lumen',
    name: 'LUMEN',
    category: 'AI product',
    year: '2025',
    line: 'An AI finance platform that reads invoices from photos and PDFs, flags anomalies, and routes plain-English questions to a SQL agent, RAG or an analytics orchestrator.',
    highlight: 'Runner-up, AI track at Hack-a-Sol, IIIT Naya Raipur.',
    stack: ['Python', 'Flask', 'SQLAlchemy', 'ChromaDB', 'Google Vision'],
    links: [
      { kind: 'github', href: gh('Lumen') },
      { kind: 'live', href: 'https://lumen-eta-ebon.vercel.app' },
    ],
    thumb: { kind: 'image', src: '/images/lumen.jpg', alt: 'LUMEN landing page: “Transform your Invoice Management”.' },
  },
  {
    id: 'gae',
    name: 'Guarded Agent Ensemble',
    category: 'LLM safety',
    year: '2026',
    line: 'One LLM agent wrapped in four defense modules, each adapted from an agent-safety paper, and scored before and after with an index I designed.',
    highlight: 'Prompt-injection success 0.07 → 0, harm score 0.25 → 0, 446 offline tests.',
    stack: ['Python', 'Pytest', 'Groq', 'OpenRouter'],
    links: [{ kind: 'github', href: gh('guarded-agent-ensemble') }],
    thumb: { kind: 'image', src: '/images/gae.jpg', alt: 'The interactive architecture page for Guarded Agent Ensemble.' },
  },
  {
    id: 'spatiox',
    name: 'SpatioX',
    category: 'Systems in C++',
    year: '2026',
    line: 'A spatio-temporal index for “where and when” queries: a KD-tree for space, a multimap for time, and Python bindings through pybind11.',
    highlight: 'Radius and bounding-box queries with optional time windows.',
    stack: ['C++17', 'pybind11', 'Python'],
    links: [{ kind: 'github', href: gh('SpatioX') }],
    thumb: {
      kind: 'code',
      file: 'include/spatio_index_core.hpp',
      lang: 'cpp',
      code: `class SpatioIndexCore {
public:
    // Online insert (streaming)
    uint64_t insert(float lat, float lon, double t);

    // Bulk insert (batch)
    std::vector<uint64_t> bulk_insert(
        const std::vector<RecordInput>& records);

    // Spatial-only: time should be optional
    std::vector<uint64_t> query_radius(
        float lat, float lon, double radius_km) const;`,
    },
  },
  {
    id: 'echoline',
    name: 'EchoLine',
    category: 'Real-time audio',
    year: '2025',
    line: 'An always-on-top overlay that captions anything your computer plays, fully offline with Vosk, plus a benchmarking suite for accuracy and latency.',
    highlight: 'Live captions with no cloud round trip.',
    stack: ['Python', 'Vosk', 'PyQt5'],
    links: [{ kind: 'github', href: gh('EchoLine') }],
    thumb: { kind: 'image', src: '/images/echoline.jpg', alt: 'EchoLine showing live captions over a video call.' },
  },
  {
    id: 'dcache',
    name: 'Distributed Cache',
    category: 'Distributed systems',
    year: '2026',
    status: 'In progress',
    line: 'A highly available distributed cache written from scratch in Go, starting with a sharded, lock-striped in-memory store.',
    highlight: '256 shards, each with its own RWMutex, picked by an FNV-1a hash.',
    stack: ['Go'],
    links: [{ kind: 'github', href: gh('Distributed-cache') }],
    thumb: {
      kind: 'code',
      file: 'internal/cache/cache.go',
      lang: 'go',
      code: `// Each shard owns its map and its own RWMutex, so
// contention is divided across 256 independent locks
// instead of one global lock.
type shard struct {
	mu    sync.RWMutex
	items map[string]entry
}

type Cache struct {
	shards [numShards]shard
}`,
    },
  },
]
