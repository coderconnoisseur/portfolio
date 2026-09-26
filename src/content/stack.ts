import {
  siApachekafka, siCplusplus, siDocker, siFastapi, siFlask, siGin, siGit, siGithubactions, siGo, siLangchain,
  siLinux, siOpenrouter, siPostgresql, siPostman, siPrometheus, siPytest, siPython, siRedis, siSqlalchemy,
  siSqlite, type BrandIcon,
} from './icons.generated.ts'

export const stackGroups = ['Languages', 'Backend', 'Data', 'Infra', 'AI'] as const
export type StackGroup = (typeof stackGroups)[number]

export type Tool = { name: string; group: StackGroup; icon?: BrandIcon }

export const tools: Tool[] = [
  { name: 'Python', group: 'Languages', icon: siPython },
  { name: 'Go', group: 'Languages', icon: siGo },
  { name: 'C++', group: 'Languages', icon: siCplusplus },
  { name: 'SQL', group: 'Languages' },
  { name: 'FastAPI', group: 'Backend', icon: siFastapi },
  { name: 'Flask', group: 'Backend', icon: siFlask },
  { name: 'Gin', group: 'Backend', icon: siGin },
  { name: 'SQLAlchemy', group: 'Backend', icon: siSqlalchemy },
  { name: 'REST APIs', group: 'Backend' },
  { name: 'Microservices', group: 'Backend' },
  { name: 'PostgreSQL', group: 'Data', icon: siPostgresql },
  { name: 'Redis', group: 'Data', icon: siRedis },
  { name: 'SQLite', group: 'Data', icon: siSqlite },
  { name: 'ChromaDB', group: 'Data' },
  { name: 'Kafka', group: 'Infra', icon: siApachekafka },
  { name: 'Docker', group: 'Infra', icon: siDocker },
  { name: 'Prometheus', group: 'Infra', icon: siPrometheus },
  { name: 'Linux', group: 'Infra', icon: siLinux },
  { name: 'Git', group: 'Infra', icon: siGit },
  { name: 'CI/CD', group: 'Infra', icon: siGithubactions },
  { name: 'Postman', group: 'Infra', icon: siPostman },
  { name: 'Pytest', group: 'Infra', icon: siPytest },
  { name: 'RAG', group: 'AI' },
  { name: 'Vector search', group: 'AI' },
  { name: 'Multi-agent systems', group: 'AI' },
  { name: 'LangChain', group: 'AI', icon: siLangchain },
  { name: 'OpenRouter', group: 'AI', icon: siOpenrouter },
]
