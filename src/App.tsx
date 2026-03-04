import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Building2,
  ExternalLink,
  FileText,
  HandCoins,
  Landmark,
  Rocket,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type ViewKey = 'hub' | 'samhwa' | 'bx'

type ReportCard = {
  id: Exclude<ViewKey, 'hub'>
  title: string
  subtitle: string
  icon: typeof Building2
  bullets: string[]
  sourceUrl: string
}

type SourceDoc = {
  title: string
  org: string
  year: string
  url: string
  usedFor: string
}

const samhwaNotebookUrl =
  'https://notebooklm.google.com/notebook/bef72a22-da35-42f5-b92e-6074e8ac0b6e'
const bxNotebookUrl =
  'https://notebooklm.google.com/notebook/ebefd664-6d21-4d42-9c88-e897ead43a1e'

const reportCards: ReportCard[] = [
  {
    id: 'samhwa',
    title: 'Samhwa Paint HQ Asset Strategy',
    subtitle: 'Scenario A-E strategic and financial view (2026-2035)',
    icon: Building2,
    bullets: ['10-year FCF / IRR / Payback comparison', 'Policy and permit risk matrix', 'Hybrid execution recommendation'],
    sourceUrl: samhwaNotebookUrl,
  },
  {
    id: 'bx',
    title: 'BX Consulting Apply Project',
    subtitle: 'Business plan page for 2026 startup support tracks',
    icon: Rocket,
    bullets: ['Requirement-fit checklist', 'Funding and execution budget model', 'Plan A/B submission strategy'],
    sourceUrl: bxNotebookUrl,
  },
]

const samhwaScenarioData = [
  { code: 'A', name: 'Sale+Leaseback', fcfBase: 1600, fcfUp: 1800, fcfDown: 1400, irr: 0, payback: 0.2, capex: 0 },
  { code: 'B', name: 'Sell+Buy', fcfBase: 400, fcfUp: 750, fcfDown: 100, irr: 8.5, payback: 7.5, capex: 170.5 },
  { code: 'C', name: 'Standalone New Build', fcfBase: -80, fcfUp: -30, fcfDown: -150, irr: 5.2, payback: 8.2, capex: 53 },
  { code: 'D', name: 'Major Remodel', fcfBase: -15, fcfUp: 10, fcfDown: -40, irr: 9.4, payback: 4.5, capex: 26.75 },
  { code: 'E', name: 'Parcel Integration', fcfBase: 120, fcfUp: 350, fcfDown: -100, irr: 10.1, payback: 8.5, capex: 95 },
]

const samhwaMarketTrend = [
  { year: '2026', baseRate: 2.1, pfCost: 4.9, capRate: 4.8, vacancy: 6.1 },
  { year: '2027', baseRate: 2.2, pfCost: 4.7, capRate: 4.7, vacancy: 5.9 },
  { year: '2028', baseRate: 2.3, pfCost: 4.6, capRate: 4.6, vacancy: 5.7 },
  { year: '2029', baseRate: 2.4, pfCost: 4.5, capRate: 4.5, vacancy: 5.5 },
  { year: '2030', baseRate: 2.4, pfCost: 4.4, capRate: 4.4, vacancy: 5.3 },
  { year: '2031', baseRate: 2.5, pfCost: 4.4, capRate: 4.3, vacancy: 5.1 },
  { year: '2032', baseRate: 2.5, pfCost: 4.3, capRate: 4.2, vacancy: 5.0 },
  { year: '2033', baseRate: 2.6, pfCost: 4.3, capRate: 4.1, vacancy: 4.9 },
  { year: '2034', baseRate: 2.6, pfCost: 4.2, capRate: 4.0, vacancy: 4.8 },
  { year: '2035', baseRate: 2.7, pfCost: 4.2, capRate: 3.9, vacancy: 4.7 },
]

const samhwaRiskRadar = [
  { risk: 'Interest', A: 2, B: 4, C: 3, D: 2, E: 4 },
  { risk: 'Construction cost', A: 1, B: 2, C: 5, D: 4, E: 5 },
  { risk: 'Permit complexity', A: 1, B: 2, C: 5, D: 3, E: 5 },
  { risk: 'PF dependency', A: 2, B: 4, C: 4, D: 2, E: 4 },
  { risk: 'Regulatory burden', A: 2, B: 5, C: 3, D: 2, E: 3 },
]

const samhwaSources: SourceDoc[] = [
  {
    title: '삼화페인트_사옥 시나리오 분석_20260210',
    org: 'BIGPLANNER PARTNERS',
    year: '2026',
    url: samhwaNotebookUrl,
    usedFor: 'Scenario A-E FCF/IRR/payback, 10-year assumptions',
  },
  {
    title: '서울본사 1별관 신축 검토_최종v.3',
    org: '삼화페인트 인사총무팀',
    year: '2023',
    url: samhwaNotebookUrl,
    usedFor: 'Standalone reconstruction scope and CAPEX range',
  },
  {
    title: '묘동7번지 업무시설 대수선 검토안',
    org: '대륜 건축사사무소',
    year: '2023',
    url: samhwaNotebookUrl,
    usedFor: 'Remodeling scope, schedule, and cost band',
  },
  {
    title: '종로구 묘동 7번지 지구단위계획 검토서',
    org: '대륜 건축사사무소',
    year: '2023',
    url: samhwaNotebookUrl,
    usedFor: 'Height limits and permit constraints',
  },
]

const bxRevenueProjection = [
  { year: '2026', base: 11, stretch: 18 },
  { year: '2027', base: 30, stretch: 45 },
  { year: '2028', base: 58, stretch: 100 },
]

const bxBudget = [
  { item: 'Gov grant', value: 1.0 },
  { item: 'Cash match', value: 0.15 },
  { item: 'In-kind match', value: 0.28 },
]

const bxEvaluation = [
  { axis: 'Problem', score: 94 },
  { axis: 'Feasibility', score: 93 },
  { axis: 'Growth', score: 91 },
  { axis: 'Team', score: 92 },
]

const bxSources: SourceDoc[] = [
  {
    title: 'Seoul Headquarters Annex + BX APPLY PROJECT NotebookLM',
    org: 'NotebookLM',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: 'Business model, roadmap, and financial goal extraction',
  },
  {
    title: 'K-Startup Portal',
    org: '중소벤처기업부 / 창업진흥원',
    year: '2026',
    url: 'https://www.k-startup.go.kr/',
    usedFor: 'Program submission channel and official notices',
  },
  {
    title: '2026 창업중심대학 지역기반 공고 PDF',
    org: '모집기관 공고문',
    year: '2026',
    url: 'https://dreamstartup.co.kr/media/bizSupport/file/49e6cf35/%EA%B3%B5%EA%B3%A0%EB%AC%B8_2026%EB%85%84%EB%8F%84_%EC%B0%BD%EC%97%85%EC%A4%91%EC%8B%AC%EB%8C%80%ED%95%99_%EC%A7%80%EC%97%AD%EA%B8%B0%EB%B0%98_%EC%98%88%EB%B9%84%EC%B0%BD%EC%97%85%EA%B8%B0%EC%97%85_%EB%AA%A8%EC%A7%91%EA%B3%B5%EA%B3%A0.pdf',
    usedFor: 'Requirement fit, funding cap, and timeline assumptions',
  },
]

const bxMilestones = [
  { period: '2026 Q1', detail: 'Application completion + MVP hardening (5 agent modules)' },
  { period: '2026 Q2', detail: 'Public procurement PoC (나라장터 proposal format)' },
  { period: '2026 Q3', detail: '2-3 enterprise SI wins and initial recurring use contracts' },
  { period: '2026 Q4', detail: 'SaaS beta launch and conversion from SI references' },
]

function SourceTable({ rows }: { rows: SourceDoc[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Org</th>
            <th>Year</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.title}>
              <td>
                <a href={row.url} target="_blank" rel="noreferrer">
                  {row.title}
                </a>
              </td>
              <td>{row.org}</td>
              <td>{row.year}</td>
              <td>{row.usedFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HubView({ onSelect }: { onSelect: (view: Exclude<ViewKey, 'hub'>) => void }) {
  return (
    <>
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="hero-kicker">Report Hub</span>
        <h1>0chul&apos;s lair</h1>
        <p>
          NotebookLM 연동 기반의 제안/전략 문서를 페이지 단위로 탐색하는 리스트뷰입니다. 삼화페인트 사옥 전략 보고서와 BX
          컨설팅 APPLY PROJECT 사업계획서를 한 화면에서 관리할 수 있습니다.
        </p>
      </motion.section>

      <section className="list-grid">
        {reportCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.article
              key={card.id}
              className="report-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
            >
              <div className="report-head">
                <div className="report-icon">
                  <Icon size={20} />
                </div>
                <a href={card.sourceUrl} target="_blank" rel="noreferrer" className="report-source">
                  Source <ExternalLink size={12} />
                </a>
              </div>
              <h2>{card.title}</h2>
              <p>{card.subtitle}</p>
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <button type="button" className="open-btn" onClick={() => onSelect(card.id)}>
                페이지 열기 <ArrowUpRight size={15} />
              </button>
            </motion.article>
          )
        })}
      </section>
    </>
  )
}

function SamhwaView({ onBack }: { onBack: () => void }) {
  const winner = useMemo(
    () => samhwaScenarioData.reduce((acc, cur) => (cur.fcfBase > acc.fcfBase ? cur : acc), samhwaScenarioData[0]),
    [],
  )

  return (
    <>
      <section className="top-nav">
        <button type="button" onClick={onBack} className="back-btn">
          <ArrowLeft size={14} /> List
        </button>
        <a href={samhwaNotebookUrl} target="_blank" rel="noreferrer" className="ghost-link">
          NotebookLM <ExternalLink size={12} />
        </a>
      </section>

      <section className="hero compact">
        <span className="hero-kicker">Asset Strategy</span>
        <h1>Samhwa HQ Scenario Dashboard</h1>
        <p>
          2026-2035년 5개 시나리오를 FCF/IRR/회수기간/규제 리스크로 비교했습니다. 단기 효율화는 D(대수선), 중장기
          자산가치 극대화는 E(필지 통합 신축) 옵션의 병행 전략을 권고합니다.
        </p>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-head">
            <HandCoins size={16} /> Best Base FCF
          </div>
          <strong>{winner.code}</strong>
          <p>{winner.name}</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <Landmark size={16} /> Financing Band
          </div>
          <strong>LTV 60-70%</strong>
          <p>PF structure assumption from notebook model</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <ShieldAlert size={16} /> Permit Ceiling
          </div>
          <strong>14m / 17m</strong>
          <p>Historic district height limitations</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <TrendingUp size={16} /> Priority Mix
          </div>
          <strong>D + E</strong>
          <p>Short-term efficiency + long-term value capture</p>
        </article>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>
              <BarChart3 size={17} /> 10Y FCF by Scenario
            </h2>
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={samhwaScenarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="code" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" unit="억" />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}억원`} />
                <Legend />
                <Bar dataKey="fcfDown" fill="#f08a71" name="Down" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fcfBase" fill="#1fb4a8" name="Base" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fcfUp" fill="#65d5ce" name="Up" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>
              <TrendingUp size={17} /> IRR and Payback
            </h2>
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={samhwaScenarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="code" stroke="#a9bed1" />
                <YAxis yAxisId="left" stroke="#a9bed1" unit="%" />
                <YAxis yAxisId="right" orientation="right" stroke="#a9bed1" unit="y" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="irr" stroke="#65d5ce" strokeWidth={2.5} name="IRR" />
                <Line yAxisId="right" type="monotone" dataKey="payback" stroke="#f4b64b" strokeWidth={2.5} name="Payback" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>Market Cycle Weight (2026-2035)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={samhwaMarketTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="year" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="baseRate" stroke="#65d5ce" name="Base rate" />
                <Line type="monotone" dataKey="pfCost" stroke="#f4b64b" name="PF cost" />
                <Line type="monotone" dataKey="capRate" stroke="#9bc1ff" name="Cap rate" />
                <Line type="monotone" dataKey="vacancy" stroke="#f08a71" name="Vacancy" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>Risk Radar</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={samhwaRiskRadar}>
                <PolarGrid stroke="#385068" />
                <PolarAngleAxis dataKey="risk" stroke="#a9bed1" fontSize={11} />
                <PolarRadiusAxis domain={[0, 5]} stroke="#6e879c" tickCount={6} />
                <Radar name="A" dataKey="A" stroke="#65d5ce" fill="#65d5ce" fillOpacity={0.2} />
                <Radar name="D" dataKey="D" stroke="#f4b64b" fill="#f4b64b" fillOpacity={0.2} />
                <Radar name="E" dataKey="E" stroke="#f08a71" fill="#f08a71" fillOpacity={0.2} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>
            <FileText size={17} /> Source Index
          </h2>
        </div>
        <SourceTable rows={samhwaSources} />
      </section>
    </>
  )
}

function BxView({ onBack }: { onBack: () => void }) {
  return (
    <>
      <section className="top-nav">
        <button type="button" onClick={onBack} className="back-btn">
          <ArrowLeft size={14} /> List
        </button>
        <a href={bxNotebookUrl} target="_blank" rel="noreferrer" className="ghost-link">
          NotebookLM <ExternalLink size={12} />
        </a>
      </section>

      <section className="hero compact bx-hero">
        <span className="hero-kicker">BX APPLY PROJECT</span>
        <h1>BX Consulting Business Plan Page</h1>
        <p>
          `BX컨설팅 초기창업패키지 지원사업 APPLY PROJECT` 노트북 기반으로 2026 창업중심대학/딥테크 트랙 대응안을
          구조화했습니다. 핵심은 Draft AI의 실현가능성 입증과 SI-to-SaaS 전환 로드맵입니다.
        </p>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-head">
            <Rocket size={16} /> Target Program
          </div>
          <strong>2026 Startup Tracks</strong>
          <p>창업중심대학(지역기반) + 딥테크형 초기창업패키지</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <HandCoins size={16} /> Funding Cap
          </div>
          <strong>최대 1억원</strong>
          <p>평균 0.5억원 / 협약 약 8개월 가정</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <TrendingUp size={16} /> Revenue Goal
          </div>
          <strong>11 → 30 → 58억</strong>
          <p>2026~2028 base scenario from notebook plan</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <Landmark size={16} /> Core Play
          </div>
          <strong>SI to SaaS</strong>
          <p>Enterprise references then subscription scale-up</p>
        </article>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>Submission Fit Checklist</h2>
          </div>
          <ul className="fit-list">
            <li>지원자격: 예비창업자 또는 창업 7년 이내</li>
            <li>사업화 자금: 최대 1억원, 평균 5천만원</li>
            <li>평가 축: 문제인식 / 실현가능성 / 성장전략 / 팀구성</li>
            <li>사업모델: RAG + Multi-Agent + Self-Critique Loop</li>
            <li>실행전략: 엔터프라이즈 SI 수주 후 SaaS 전환</li>
          </ul>
          <div className="decision">
            <p>
              <strong>Plan A:</strong> 딥테크 특화형으로 기술점수 극대화
            </p>
            <p>
              <strong>Plan B:</strong> 창업중심대학 트랙으로 실증/멘토링 연계 강화
            </p>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>Funding Mix (억원)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bxBudget} layout="vertical" margin={{ left: 12, right: 18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis type="number" stroke="#a9bed1" />
                <YAxis dataKey="item" type="category" stroke="#a9bed1" width={90} />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}억원`} />
                <Bar dataKey="value" fill="#65d5ce" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>Revenue Projection</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bxRevenueProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="year" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}억원`} />
                <Legend />
                <Line type="monotone" dataKey="base" stroke="#65d5ce" strokeWidth={2.5} name="Base" />
                <Line type="monotone" dataKey="stretch" stroke="#f4b64b" strokeWidth={2.5} name="Stretch" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>Evaluation Coverage</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={bxEvaluation}>
                <PolarGrid stroke="#385068" />
                <PolarAngleAxis dataKey="axis" stroke="#a9bed1" fontSize={11} />
                <PolarRadiusAxis domain={[0, 100]} stroke="#6e879c" />
                <Radar name="Coverage" dataKey="score" stroke="#65d5ce" fill="#65d5ce" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>2026 Execution Milestones</h2>
        </div>
        <div className="roadmap">
          {bxMilestones.map((step) => (
            <article key={step.period} className="roadmap-step">
              <span>{step.period}</span>
              <h3>{step.detail}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>
            <FileText size={17} /> Source Index
          </h2>
        </div>
        <SourceTable rows={bxSources} />
      </section>
    </>
  )
}

function App() {
  const [view, setView] = useState<ViewKey>('hub')

  return (
    <div className="page-shell">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-grid" />

      <main className="content">
        {view === 'hub' && <HubView onSelect={setView} />}
        {view === 'samhwa' && <SamhwaView onBack={() => setView('hub')} />}
        {view === 'bx' && <BxView onBack={() => setView('hub')} />}
      </main>
    </div>
  )
}

export default App
