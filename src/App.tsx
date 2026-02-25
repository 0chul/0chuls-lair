import { motion } from 'framer-motion'
import {
  ArrowRightLeft,
  Building2,
  ChartNoAxesCombined,
  CircleDollarSign,
  Landmark,
  ShieldAlert,
  Sparkles,
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

type ScenarioCode = 'A' | 'B' | 'C' | 'D' | 'E'

type ScenarioModel = {
  code: ScenarioCode
  label: string
  strategy: string
  capexBillionKrw: number
  fcfBase: number
  fcfUp: number
  fcfDown: number
  irrBase?: number
  paybackYear?: number
  go: string
  noGo: string
  pros: string[]
  cons: string[]
  refs: string[]
}

type SourceDoc = {
  id: string
  title: string
  org: string
  year: string
  url: string
  usage: string
}

const notebookUrl =
  'https://notebooklm.google.com/notebook/bef72a22-da35-42f5-b92e-6074e8ac0b6e'

const scenarioModels: ScenarioModel[] = [
  {
    code: 'A',
    label: 'A. 매각 후 리스백',
    strategy: 'Sale & Leaseback',
    capexBillionKrw: 0,
    fcfBase: 1600,
    fcfUp: 1800,
    fcfDown: 1400,
    go: '부채비율과 유동성 개선이 최우선일 때',
    noGo: '장기 지가상승/보유가치 포기가 클 때',
    pros: ['현금 유입 즉시성 최고', '업무 연속성 유지', 'EBITDA 지표 개선 효과'],
    cons: ['장기 임차료 고정 부담', 'IFRS16 리스부채 계상', '자산상승 이익 포기'],
    refs: ['S1', 'S4'],
  },
  {
    code: 'B',
    label: 'B. 매각 후 신규 매입',
    strategy: 'Sell & Acquire',
    capexBillionKrw: 170.5,
    fcfBase: 400,
    fcfUp: 750,
    fcfDown: 100,
    irrBase: 8.5,
    paybackYear: 7.5,
    go: '리브랜딩·인재유치형 신거점 전략을 추진할 때',
    noGo: '취득세 중과와 조달비용이 목표수익률을 훼손할 때',
    pros: ['거점전략 유연성', '장기 자본이득 잠재력', '신규 오피스 경쟁력 확보'],
    cons: ['취득세 중과(최대 약 9.4%)', '초기 CAPEX 큼', '매물/타이밍 리스크'],
    refs: ['S1', 'S9', 'S12'],
  },
  {
    code: 'C',
    label: 'C. 단독 신축',
    strategy: 'Standalone Reconstruction',
    capexBillionKrw: 53,
    fcfBase: -80,
    fcfUp: -30,
    fcfDown: -150,
    irrBase: 5.2,
    paybackYear: 8.2,
    go: '공간 부족 해소와 브랜드 업그레이드가 핵심일 때',
    noGo: '문화재 발굴/인허가 지연 리스크를 감당하기 어려울 때',
    pros: ['연면적 확장(약 803평)', '사옥 기능 재설계 가능', '중장기 운영 효율화'],
    cons: ['높이 제한(14m/17m)', '문화재 심의·발굴 리스크', 'NPV 하방 변동성 큼'],
    refs: ['S2', 'S6', 'S12'],
  },
  {
    code: 'D',
    label: 'D. 대수선(리모델링)',
    strategy: 'Great Repair',
    capexBillionKrw: 26.75,
    fcfBase: -15,
    fcfUp: 10,
    fcfDown: -40,
    irrBase: 9.4,
    paybackYear: 4.5,
    go: '1년 내 환경개선과 비용효율이 목표일 때',
    noGo: '층고/코어 등 구조적 한계 해소가 필수일 때',
    pros: ['신축 대비 20~30% 비용 절감', '공기 단축(약 11개월)', 'OPEX 15% 절감 잠재'],
    cons: ['근본적 평면 한계', '증축 한계/규제 연동', '대규모 확장성 제한'],
    refs: ['S5', 'S11'],
  },
  {
    code: 'E',
    label: 'E. 필지 통합 신축',
    strategy: 'Integrated Development',
    capexBillionKrw: 95,
    fcfBase: 120,
    fcfUp: 350,
    fcfDown: -100,
    irrBase: 10.1,
    paybackYear: 8.5,
    go: '랜드마크형 자산가치 극대화를 노릴 때',
    noGo: '인접 필지 협의/행정합의가 확보되지 않을 때',
    pros: ['용적률 인센티브 잠재(최대 960%)', '건폐율 완화 가능성', '장기 가치 최상위'],
    cons: ['조정·합의 리드타임 길음', '대형 자본투입 필요', '정책·협상 민감도 높음'],
    refs: ['S8', 'S12'],
  },
]

const marketTrend = [
  { year: '2026', rate: 2.1, pfCost: 4.9, capRate: 4.8, rentGrowth: 2.8, vacancy: 6.1 },
  { year: '2027', rate: 2.2, pfCost: 4.7, capRate: 4.7, rentGrowth: 2.9, vacancy: 5.9 },
  { year: '2028', rate: 2.3, pfCost: 4.6, capRate: 4.6, rentGrowth: 3.0, vacancy: 5.7 },
  { year: '2029', rate: 2.4, pfCost: 4.5, capRate: 4.5, rentGrowth: 3.1, vacancy: 5.5 },
  { year: '2030', rate: 2.4, pfCost: 4.4, capRate: 4.4, rentGrowth: 3.2, vacancy: 5.3 },
  { year: '2031', rate: 2.5, pfCost: 4.4, capRate: 4.3, rentGrowth: 3.0, vacancy: 5.1 },
  { year: '2032', rate: 2.5, pfCost: 4.3, capRate: 4.2, rentGrowth: 2.9, vacancy: 5.0 },
  { year: '2033', rate: 2.6, pfCost: 4.3, capRate: 4.1, rentGrowth: 2.8, vacancy: 4.9 },
  { year: '2034', rate: 2.6, pfCost: 4.2, capRate: 4.0, rentGrowth: 2.8, vacancy: 4.8 },
  { year: '2035', rate: 2.7, pfCost: 4.2, capRate: 3.9, rentGrowth: 2.7, vacancy: 4.7 },
]

const riskRadar = [
  { risk: '할인율', A: 2, B: 4, C: 3, D: 2, E: 4 },
  { risk: '공실률', A: 3, B: 3, C: 2, D: 2, E: 4 },
  { risk: '공사비', A: 1, B: 2, C: 5, D: 4, E: 5 },
  { risk: '인허가', A: 1, B: 2, C: 5, D: 3, E: 5 },
  { risk: 'PF금리', A: 2, B: 4, C: 4, D: 2, E: 4 },
  { risk: '세무규제', A: 2, B: 5, C: 3, D: 2, E: 3 },
]

const sourceDocs: SourceDoc[] = [
  {
    id: 'S1',
    title: '삼화페인트_사옥 시나리오 분석_20260210',
    org: 'BIGPLANNER PARTNERS',
    year: '2026',
    url: notebookUrl,
    usage: '시나리오별 FCF/NPV/IRR, 2026~2035 재무모델',
  },
  {
    id: 'S2',
    title: '서울본사 1별관 신축 검토_최종v.3',
    org: '삼화페인트 인사총무팀',
    year: '2023',
    url: notebookUrl,
    usage: '단독 신축 CAPEX(약 53억), 연면적·공기 가정',
  },
  {
    id: 'S3',
    title: '1별관 변경 검토안_최종v.3',
    org: '삼화페인트 인사총무팀',
    year: '2023',
    url: notebookUrl,
    usage: '신규매입/이전 대안 및 면적 요구치',
  },
  {
    id: 'S4',
    title: '종로구 묘동 7번지 업무시설 규모검토안 (2022.03.29)',
    org: '건축사사무소 대륜',
    year: '2022',
    url: notebookUrl,
    usage: '건폐율·규모·규제 검토',
  },
  {
    id: 'S5',
    title: '묘동7번지 업무시설 대수선 검토안',
    org: '사내/외부 합동 검토',
    year: '2023',
    url: notebookUrl,
    usage: '리모델링 비용(6~26.75억), 공사기간(약 11개월)',
  },
  {
    id: 'S6',
    title: '묘동 7번지 일대 신축 및 리모델링 검토의견서 (2021.04.16)',
    org: '지호도시건축사사무소',
    year: '2021',
    url: 'http://www.jihoarchi.com',
    usage: '신축/리모델링 기술 검토',
  },
  {
    id: 'S7',
    title: '묘동 7번지 일대 신축 및 리모델링 검토의견서 (2021.04.19)',
    org: '지호도시건축사사무소',
    year: '2021',
    url: 'http://www.jihoarchi.com',
    usage: '공사비·공기 민감도 보완',
  },
  {
    id: 'S8',
    title: '돈화문로 지구단위계획 재정비(안) - 특별계획구역 계획안',
    org: '종로구',
    year: '2021',
    url: notebookUrl,
    usage: '필지통합·용적률 인센티브·공개공지 조건',
  },
  {
    id: 'S9',
    title: '일반건축물대장(갑) - 서울특별시 종로구 묘동 7',
    org: '종로구청',
    year: '2023',
    url: notebookUrl,
    usage: '법규·자산기초·규모검증',
  },
  {
    id: 'S10',
    title: '서울본사 적정면적 분석',
    org: '삼화페인트 인사총무팀',
    year: 'N/A',
    url: notebookUrl,
    usage: '면적 부족률(70~83%) 및 수요 계산',
  },
  {
    id: 'S11',
    title: 'AJOU_삼화페인트종로구_묘동_7_개략공사비_검토',
    org: '아주산업건설',
    year: '2021',
    url: notebookUrl,
    usage: '리모델링/신축 단가와 CAPEX 밴드',
  },
  {
    id: 'S12',
    title: '종로구 묘동 7번지 지구단위계획 검토서 (2023.08.30)',
    org: '건축사사무소 대륜',
    year: '2023',
    url: notebookUrl,
    usage: '인허가 리스크, 높이제한, GO/NO-GO 기준',
  },
]

const fcfChartData = scenarioModels.map((s) => ({
  scenario: s.code,
  전략: s.strategy,
  Down: s.fcfDown,
  Base: s.fcfBase,
  Up: s.fcfUp,
}))

const executionRoadmap = [
  {
    period: '2026-2027',
    title: '유동화·허가 패키지',
    detail:
      'A·D 동시 검토로 재무방어선 확보. 문화재/지구단위 사전협의를 병렬로 실행하고 PF term sheet를 선확보.',
  },
  {
    period: '2028-2030',
    title: '핵심 투자 실행',
    detail:
      'D(리모델링) 선집행 후, E(필지통합) 인허가 가시화 시점에 단계적 CAPEX 전환. 비핵심 비용은 변동비 구조화.',
  },
  {
    period: '2031-2035',
    title: '가치 실현·재배치',
    detail:
      '임대수익/운영효율 지표 기반으로 리츠·세일다운 등 Exit 옵션 검토. 자본이득 실현 구간을 분할해 리스크 헤지.',
  },
]

const summaryCards = [
  {
    title: '권고 전략',
    value: 'D → E 하이브리드',
    note: '단기 리모델링으로 FCF 방어 후 통합신축 옵션가치 극대화',
    icon: Sparkles,
  },
  {
    title: '기준 할인율',
    value: '4.5%',
    note: 'NotebookLM 모델 가정값',
    icon: CircleDollarSign,
  },
  {
    title: '핵심 규제 제약',
    value: '14m / 17m',
    note: '평지붕/경사지붕 높이 제한',
    icon: ShieldAlert,
  },
  {
    title: 'PF 레버리지 밴드',
    value: 'LTV 60~70%',
    note: '신규매입·개발 조달 공통 기준',
    icon: Landmark,
  },
]

const sourceLookup = new Map(sourceDocs.map((doc) => [doc.id, doc]))

const formatKrw = (value: number) =>
  `${value >= 0 ? '+' : ''}${value.toLocaleString('ko-KR')}억`

const formatPct = (value?: number) => (value ? `${value.toFixed(1)}%` : '-')

function SourceChips({ ids }: { ids: string[] }) {
  return (
    <div className="source-chips">
      {ids.map((id) => {
        const source = sourceLookup.get(id)
        if (!source) return null
        return (
          <a key={id} className="source-chip" href={source.url} target="_blank" rel="noreferrer">
            {id}
          </a>
        )
      })}
    </div>
  )
}

function App() {
  return (
    <div className="page-shell">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-grid" />

      <main className="content">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="hero"
        >
          <span className="hero-kicker">Seoul Headquarters Annex 1 Strategy</span>
          <h1>삼화페인트 사옥 자산가치 극대화 전략 보고서</h1>
          <p>
            NotebookLM 업데이트 자료 기반(세션: <code>b6715588</code>)으로 재무지표, 규제리스크, 실행우선순위를
            통합했습니다. 2026년 이후 시장 전환기를 가중 반영해 C레벨 의사결정에 바로 사용할 수 있도록
            설계했습니다.
          </p>
          <div className="hero-actions">
            <a href={notebookUrl} target="_blank" rel="noreferrer" className="btn primary">
              NotebookLM 원자료 열기
            </a>
            <a
              href="https://github.com/0chul/samhwa-asset-strategy"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              GitHub Repo
            </a>
          </div>
        </motion.header>

        <section className="summary-grid">
          {summaryCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                className="summary-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.45 }}
              >
                <div className="summary-head">
                  <Icon size={18} />
                  <span>{card.title}</span>
                </div>
                <strong>{card.value}</strong>
                <p>{card.note}</p>
              </motion.article>
            )
          })}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>
              <ChartNoAxesCombined size={18} />
              시나리오별 10년 재무효과 (FCF)
            </h2>
            <SourceChips ids={['S1', 'S2', 'S5']} />
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fcfChartData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f3345" />
                <XAxis dataKey="scenario" stroke="#8aa4b8" />
                <YAxis stroke="#8aa4b8" unit="억" />
                <Tooltip
                  contentStyle={{ background: '#0f1a25', border: '1px solid #294055', borderRadius: 10 }}
                  formatter={(value: number | string | undefined) =>
                    `${Number(value ?? 0).toLocaleString('ko-KR')}억`
                  }
                />
                <Legend />
                <Bar dataKey="Down" fill="#d15f42" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Base" fill="#1fa3a0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Up" fill="#6bc46d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="caption">
            단위: 억 KRW (10년 누적 FCF). A는 유동화 효과가 커서 절대값이 높고, D는 회수기간 단축형, E는 상방
            시나리오에서 자산가치 극대화가 두드러집니다.
          </p>
        </section>

        <section className="panel two-col">
          <article>
            <div className="panel-header">
              <h2>
                <TrendingUp size={18} />
                2026+ 시장 전망 가중치
              </h2>
              <SourceChips ids={['S1', 'S8', 'S12']} />
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3345" />
                  <XAxis dataKey="year" stroke="#8aa4b8" />
                  <YAxis stroke="#8aa4b8" />
                  <Tooltip
                    contentStyle={{ background: '#0f1a25', border: '1px solid #294055', borderRadius: 10 }}
                    formatter={(value: number | string | undefined) => `${Number(value ?? 0).toFixed(1)}%`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="rate" name="기준금리" stroke="#ffb547" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="pfCost" name="PF 조달비용" stroke="#63c8ff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="rentGrowth" name="임대료 성장률" stroke="#6bc46d" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="vacancy" name="공실률" stroke="#f17965" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="caption">
              Notebook 시그널(금리 2.00~2.25, PF LTV 60~70, CBD 가격밴드, 임대료/공실 흐름)을 결합한 경영판단용
              가중치 시나리오입니다.
            </p>
          </article>

          <article>
            <div className="panel-header">
              <h2>
                <ShieldAlert size={18} />
                리스크 민감도 레이더
              </h2>
              <SourceChips ids={['S4', 'S6', 'S12']} />
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadar}>
                  <PolarGrid stroke="#294055" />
                  <PolarAngleAxis dataKey="risk" tick={{ fill: '#9db4c6', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar name="E(통합신축)" dataKey="E" stroke="#29b7b3" fill="#29b7b3" fillOpacity={0.35} />
                  <Radar name="C(단독신축)" dataKey="C" stroke="#f17965" fill="#f17965" fillOpacity={0.2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="caption">
              점수 1(낮음)~5(높음). 통합신축(E)은 상방가치가 크지만 인허가/공사비 민감도가 높아 게이트형 실행이
              필요합니다.
            </p>
          </article>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>
              <ArrowRightLeft size={18} />
              시나리오별 장단점 및 Go/No-Go
            </h2>
            <SourceChips ids={['S1', 'S10', 'S11']} />
          </div>
          <div className="scenario-grid">
            {scenarioModels.map((scenario) => (
              <article key={scenario.code} className="scenario-card">
                <header>
                  <h3>{scenario.label}</h3>
                  <span>{scenario.strategy}</span>
                </header>
                <div className="scenario-metrics">
                  <div>
                    <small>CAPEX</small>
                    <strong>{formatKrw(scenario.capexBillionKrw)}</strong>
                  </div>
                  <div>
                    <small>Base IRR</small>
                    <strong>{formatPct(scenario.irrBase)}</strong>
                  </div>
                  <div>
                    <small>Payback</small>
                    <strong>{scenario.paybackYear ? `${scenario.paybackYear.toFixed(1)}년` : '-'}</strong>
                  </div>
                </div>
                <div className="lists">
                  <div>
                    <h4>장점</h4>
                    <ul>
                      {scenario.pros.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>단점</h4>
                    <ul>
                      {scenario.cons.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="decision">
                  <p>
                    <strong>Go:</strong> {scenario.go}
                  </p>
                  <p>
                    <strong>No-Go:</strong> {scenario.noGo}
                  </p>
                </div>
                <SourceChips ids={scenario.refs} />
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>
              <Building2 size={18} />
              융합 전략 (Blended Strategy) 제안
            </h2>
            <SourceChips ids={['S1', 'S5', 'S8', 'S12']} />
          </div>
          <div className="roadmap">
            {executionRoadmap.map((step) => (
              <article key={step.period} className="roadmap-step">
                <span>{step.period}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
          <p className="caption">
            제안: <b>D(리모델링)</b>로 단기 FCF·운영효율 방어 후, 인허가 확률이 임계치에 도달하면 <b>E(통합신축)</b>으로
            단계 전환하는 2단 로켓 구조.
          </p>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>
              <Landmark size={18} />
              출처 및 하이퍼링크
            </h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>출처명</th>
                  <th>기관</th>
                  <th>연도</th>
                  <th>링크</th>
                  <th>사용 지표</th>
                </tr>
              </thead>
              <tbody>
                {sourceDocs.map((source) => (
                  <tr key={source.id}>
                    <td>{source.id}</td>
                    <td>{source.title}</td>
                    <td>{source.org}</td>
                    <td>{source.year}</td>
                    <td>
                      <a href={source.url} target="_blank" rel="noreferrer">
                        바로가기
                      </a>
                    </td>
                    <td>{source.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="caption">
            링크가 외부 URL로 제공되지 않은 내부 문서는 NotebookLM 노트북 링크로 연결됩니다.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
