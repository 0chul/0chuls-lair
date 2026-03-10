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

type SamhwaScenario = {
  code: 'A' | 'B' | 'C' | 'D' | 'E'
  name: string
  strategy: string
  capex: number
  fcfBase: number
  fcfUp: number
  fcfDown: number
  irr: number
  payback: number
  summary: string
  pros: string[]
  cons: string[]
  steps: string[]
  go: string
  noGo: string
}

type BxSectionItem = {
  title: string
  diagnosis: string[]
  execution: string[]
  metrics: string[]
  evidence: string[]
  riskResponse: string[]
}

type BxChecklistItem = {
  item: string
  criterion: string
}

type BxKpiItem = {
  id: string
  label: string
  before: number
  after: number
  target: number
  unit: string
  better: 'lower' | 'higher'
  note: string
}

type BxWorkflowStep = {
  id: string
  title: string
  detail: string
  output: string
}

const samhwaNotebookUrl =
  'https://notebooklm.google.com/notebook/bef72a22-da35-42f5-b92e-6074e8ac0b6e'
const bxNotebookUrl =
  'https://notebooklm.google.com/notebook/ebefd664-6d21-4d42-9c88-e897ead43a1e'

const reportCards: ReportCard[] = [
  {
    id: 'samhwa',
    title: '삼화페인트 사옥 자산가치 전략 보고서',
    subtitle: '2026-2035 시나리오 A~E 재무/리스크/실행 전략',
    icon: Building2,
    bullets: [
      '10개년 FCF·IRR·회수기간 3개 케이스(하향/기준/상향) 비교',
      '규제·인허가·PF 금리·공사비 리스크 레이더 시각화',
      '단기(D) + 중장기(E) 하이브리드 실행 로드맵 제시',
    ],
    sourceUrl: samhwaNotebookUrl,
  },
  {
    id: 'bx',
    title: '2026 창업중심대학(지역기반) 사업계획서',
    subtitle: 'BX컨설팅 Draft AI 사업계획서 본문(일반현황~조직구성)',
    icon: Rocket,
    bullets: [
      '사용자 제공 제출서류 기준으로 목차별 본문을 재작성',
      '일반현황~조직구성까지 수치·일정·예산 정합성 동기화',
      '인터랙티브 KPI 비교, 간트차트, 워크플로우 다이어그램 제공',
    ],
    sourceUrl: bxNotebookUrl,
  },
]

const samhwaScenarios: SamhwaScenario[] = [
  {
    code: 'A',
    name: '매각 후 리스백',
    strategy: '매각 후 재임차(리스백)',
    capex: 0,
    fcfBase: 1600,
    fcfUp: 1800,
    fcfDown: 1400,
    irr: 0,
    payback: 0.2,
    summary: '대규모 현금 유입으로 유동성을 즉시 확보하는 재무방어형 시나리오',
    pros: [
      '즉시 현금화로 차입금 상환 및 재무지표 개선 속도가 가장 빠름',
      '본사 운영 연속성 유지(이전 비용과 운영 중단 리스크 최소화)',
      '자산 매각 대금으로 전략적 투자 재원 확보 가능',
    ],
    cons: [
      '장기 순점유비용(NOC) 부담과 임대료 상승 리스크 노출',
      'IFRS16 리스부채 계상으로 재무비율 개선 효과 일부 상쇄 가능',
      '향후 지가 상승에 따른 보유자산 자본이득 기회 상실',
    ],
    steps: [
      '1단계(2026): 매각 구조 및 리스 조건 확정(임차기간·갱신옵션·관리비 구조 포함)',
      '2단계(2026~2027): 리스 조건 재협상 가능한 트리거(금리/공실률 연동) 계약 반영',
      '3단계(2028~2030): 절감된 재무여력을 본업 설비투자(CAPEX)·디지털 전환 투자로 전환',
      '4단계(2031~2035): 리스 연장/이전/재매입 옵션을 비교해 엑시트(Exit) 의사결정',
    ],
    go: '재무 건전성 개선과 현금 확보가 최우선 과제일 때',
    noGo: '장기 자산 보유 이득(지가 상승/임대 수익)을 핵심 전략으로 볼 때',
  },
  {
    code: 'B',
    name: '매각 후 신규 사옥 매입',
    strategy: '매각 후 신규 매입',
    capex: 170.5,
    fcfBase: 400,
    fcfUp: 750,
    fcfDown: 100,
    irr: 8.5,
    payback: 7.5,
    summary: '입지 업그레이드와 브랜드 리포지셔닝을 노리는 전략적 이전 시나리오',
    pros: [
      '도심 핵심권역 입지 확보 시 인재 채용·브랜드 이미지 개선 효과',
      '장기 보유 시 자본이득(Capital Gain) 수혜 가능성 확대',
      '업무공간 구조를 처음부터 최신 업무 방식에 맞춰 설계 가능',
    ],
    cons: [
      '취득세 중과(최대 9.4%) 및 PF 조달금리 민감도가 높음',
      '매입 경쟁 심화 시 고가 매수 리스크가 수익성을 훼손',
      '이전 과정에서 운영 공백·전환 비용(IT/인테리어/이전) 발생',
    ],
    steps: [
      '1단계(2026): 권역별 후보지 롱리스트 작성(GBD·마곡·성수 등)',
      '2단계(2026~2027): PF 구조(담보인정비율 LTV 60~70%)와 세무 시뮬레이션 동시 검증',
      '3단계(2027~2029): 우선협상 매물 2~3개를 동일 조건으로 투자심의위원회(IC) 심의',
      '4단계(2030~2035): 매입 자산의 임대/자가 사용 비율 최적화',
    ],
    go: '입지 전략과 조직문화 전환을 동시에 달성해야 할 때',
    noGo: '세금·조달비용을 감안한 순현재가치가 내부 기준에 미달할 때',
  },
  {
    code: 'C',
    name: '단독 신축',
    strategy: '단독 신축 개발',
    capex: 53,
    fcfBase: -80,
    fcfUp: -30,
    fcfDown: -150,
    irr: 5.2,
    payback: 8.2,
    summary: '기존 부지에서 기능을 재정의해 장기 거점화를 추진하는 개발형 시나리오',
    pros: [
      '연면적 확대로 공간 부족 문제를 구조적으로 해소 가능',
      '건물 성능(에너지/설비/업무동선) 기준을 최신화 가능',
      '중장기적으로 본사 자산가치 체계적 증대 가능',
    ],
    cons: [
      '문화재 조사·심의·인허가 절차에 따라 일정 변동성이 큼',
      '높이 제한(14m/17m)과 지구단위계획 제약으로 개발 효율 제한',
      '공사비·금리 변동이 수익성에 직접 반영',
    ],
    steps: [
      '1단계(2026): 사전 타당성(법규/건축/사업비) + 발굴조사 계획 수립',
      '2단계(2027): 기본·실시설계, 심의, 인허가 협의 병행',
      '3단계(2028~2029): 본공사 착수 및 공정·원가 통합관리',
      '4단계(2030~2035): 완공 이후 자가사용+부분임대 운영모델 최적화',
    ],
    go: '공간 재편과 자산가치 제고를 동일 부지에서 달성해야 할 때',
    noGo: '인허가 불확실성을 수용할 수 없거나 단기성과가 필요한 경우',
  },
  {
    code: 'D',
    name: '대수선(리모델링)',
    strategy: '대수선 리모델링',
    capex: 26.75,
    fcfBase: -15,
    fcfUp: 10,
    fcfDown: -40,
    irr: 9.4,
    payback: 4.5,
    summary: '투자대비 속도와 효율을 중시하는 단기 성과형 시나리오',
    pros: [
      '신축 대비 총투자비(CAPEX)를 크게 절감하면서 실행 속도 확보',
      '회수기간이 가장 짧아 재무 부담 관리에 유리',
      '스마트빌딩/설비 개선을 통해 운영비 절감 효과 확보',
    ],
    cons: [
      '골조·층고 한계로 근본적인 평면 혁신에는 제약',
      '보강 공사 범위 확대 시 초기 예산 초과 가능성 존재',
      '장기 랜드마크 전략 관점에서는 상한이 뚜렷함',
    ],
    steps: [
      '1단계(2026): 구조진단 + 설비진단 기반 대수선 범위 확정',
      '2단계(2026~2027): 층별 공정 분할로 운영중 공사(사업 연속성 유지)',
      '3단계(2027~2028): 에너지 관리시스템·승강기·공조 설비 고도화',
      '4단계(2029~2035): 운영비 절감 성과 모니터링 후 2차 개선 반영',
    ],
    go: '단기간에 업무환경 개선·비용효율 개선이 필요한 경우',
    noGo: '연면적 확장이나 구조 재편이 필수인 경우',
  },
  {
    code: 'E',
    name: '필지 통합 후 신축',
    strategy: '필지 통합 개발',
    capex: 95,
    fcfBase: 120,
    fcfUp: 350,
    fcfDown: -100,
    irr: 10.1,
    payback: 8.5,
    summary: '가장 높은 장기 가치 창출 잠재력을 가진 대형 개발 시나리오',
    pros: [
      '용적률 인센티브 활용 시 임대 가능 면적 극대화 가능',
      '랜드마크급 복합 업무거점으로 자산 밸류에이션 상향 여지 큼',
      '장기적으로 임대수익 + 자본이득 이중 수익구조 기대 가능',
    ],
    cons: [
      '인접 필지 협상 지연(알박기) 시 일정·비용 동시 악화 가능',
      '초기 투자 규모가 커 자금조달 구조 설계 난이도 높음',
      '인허가·도시계획 협의 프로세스가 복잡하고 장기화 가능',
    ],
    steps: [
      '1단계(2026~2027): 이해관계자 맵 작성 및 필지통합 협상 프레임 확정',
      '2단계(2027~2028): 도시계획 협의(공개공지/공공기여 조건) 선제 정리',
      '3단계(2029~2031): 통합 개발 인허가 + PF/에쿼티 구조 확정',
      '4단계(2032~2035): 임대·자가사용 포트폴리오 운영 및 자산 유동화 옵션 검토',
    ],
    go: '중장기 랜드마크 전략과 자산가치 극대화가 핵심일 때',
    noGo: '협상·인허가 장기 프로젝트를 수용할 조직/재무 체력이 부족할 때',
  },
]

const samhwaMarketTrend = [
  { year: '2026', 기준금리: 2.1, PF금리: 4.9, 캡레이트: 4.8, 공실률: 6.1 },
  { year: '2027', 기준금리: 2.2, PF금리: 4.7, 캡레이트: 4.7, 공실률: 5.9 },
  { year: '2028', 기준금리: 2.3, PF금리: 4.6, 캡레이트: 4.6, 공실률: 5.7 },
  { year: '2029', 기준금리: 2.4, PF금리: 4.5, 캡레이트: 4.5, 공실률: 5.5 },
  { year: '2030', 기준금리: 2.4, PF금리: 4.4, 캡레이트: 4.4, 공실률: 5.3 },
  { year: '2031', 기준금리: 2.5, PF금리: 4.4, 캡레이트: 4.3, 공실률: 5.1 },
  { year: '2032', 기준금리: 2.5, PF금리: 4.3, 캡레이트: 4.2, 공실률: 5.0 },
  { year: '2033', 기준금리: 2.6, PF금리: 4.3, 캡레이트: 4.1, 공실률: 4.9 },
  { year: '2034', 기준금리: 2.6, PF금리: 4.2, 캡레이트: 4.0, 공실률: 4.8 },
  { year: '2035', 기준금리: 2.7, PF금리: 4.2, 캡레이트: 3.9, 공실률: 4.7 },
]

const samhwaRiskRadar = [
  { risk: '금리 민감도', A: 2, B: 4, C: 3, D: 2, E: 4 },
  { risk: '공사비 리스크', A: 1, B: 2, C: 5, D: 4, E: 5 },
  { risk: '인허가 난이도', A: 1, B: 2, C: 5, D: 3, E: 5 },
  { risk: 'PF 의존도', A: 2, B: 4, C: 4, D: 2, E: 4 },
  { risk: '운영 연속성', A: 2, B: 3, C: 4, D: 2, E: 4 },
]

const samhwaDecisionMatrix = [
  { criterion: '단기 유동성', A: 5, B: 3, C: 1, D: 3, E: 2 },
  { criterion: '중장기 가치상승', A: 2, B: 4, C: 4, D: 3, E: 5 },
  { criterion: '실행 속도', A: 5, B: 3, C: 2, D: 4, E: 1 },
  { criterion: '인허가/규제 안정성', A: 4, B: 3, C: 1, D: 3, E: 1 },
  { criterion: '자본 효율성', A: 4, B: 2, C: 2, D: 4, E: 2 },
]

const samhwaExecutionStages = [
  {
    phase: '1단계: 2026 Q1-Q2',
    detail:
      '시나리오 D(대수선) 상세 설계와 예산 고정(락인), 병행으로 E(필지통합) 이해관계자 협상 프레임 구축. 법무/세무/건축/재무 합동 전담조직(TF) 운영.',
  },
  {
    phase: '2단계: 2026 Q3-Q4',
    detail:
      'D 시나리오 공사 착수(운영중 공사 분할 방식), 핵심성과지표(KPI)는 공기 준수·예산 준수·업무중단 시간 최소화. E는 도시계획 협의 사전 미팅 수행.',
  },
  {
    phase: '3단계: 2027~2028',
    detail:
      'D 준공 후 운영효율 검증(에너지, 유지관리, 공간활용). E는 인허가/사업성 재검증 및 PF 구조(고정금리/변동금리 혼합) 확정.',
  },
  {
    phase: '4단계: 2029~2031',
    detail:
      '시장 여건이 우호적이면 E 본사업 착수, 비우호적이면 D 고도화와 A/B 옵션 재평가. 의사결정 게이트를 반기 단위로 운영.',
  },
  {
    phase: '5단계: 2032~2035',
    detail:
      'E 완성 또는 대체안 확정 후 임대/자가사용 포트폴리오 최적화. 필요 시 리츠/유동화 구조 검토로 자본회전율 극대화.',
  },
]

const samhwaSources: SourceDoc[] = [
  {
    title: '삼화페인트_사옥 시나리오 분석_20260210',
    org: 'BIGPLANNER PARTNERS',
    year: '2026',
    url: samhwaNotebookUrl,
    usedFor: '시나리오 A~E 수치(FCF, IRR, 회수기간) 및 가정치',
  },
  {
    title: '서울본사 1별관 신축 검토_최종v.3',
    org: '삼화페인트 인사총무팀',
    year: '2023',
    url: samhwaNotebookUrl,
    usedFor: '단독 신축 총투자비(CAPEX) 범위 및 면적 확장 논리',
  },
  {
    title: '묘동7번지 업무시설 대수선 검토안',
    org: '대륜 건축사사무소',
    year: '2023',
    url: samhwaNotebookUrl,
    usedFor: '대수선 공사 범위·공기·성능개선 항목',
  },
  {
    title: '종로구 묘동 7번지 지구단위계획 검토서',
    org: '대륜 건축사사무소',
    year: '2023',
    url: samhwaNotebookUrl,
    usedFor: '높이 제한(14m/17m) 및 지구단위 규제 반영',
  },
]

const bxNotebookQueryMeta = 'NotebookLM 자료 + 사용자 제공 제출서류(2026-03-10) 반영'

const bxBudgetPlan = {
  gov: 100,
  cash: 15,
  inKind: 28,
  total: 143,
}

const bxPercent = (value: number, total: number) => Number(((value / total) * 100).toFixed(1))
const bxSelfAmount = bxBudgetPlan.cash + bxBudgetPlan.inKind
const bxGovRatio = bxPercent(bxBudgetPlan.gov, bxBudgetPlan.total)
const bxSelfRatio = bxPercent(bxSelfAmount, bxBudgetPlan.total)
const bxCashRatio = bxPercent(bxBudgetPlan.cash, bxBudgetPlan.total)
const bxInKindRatio = bxPercent(bxBudgetPlan.inKind, bxBudgetPlan.total)

const bxFormMirrorSections: BxSectionItem[] = [
  {
    title: '□ 일반현황',
    diagnosis: [
      '기업명은 주식회사 비엑스컨설팅이며 2025.08.12 개업 법인사업자임.',
      '사업자등록번호 625-87-03471 / 법인등록번호 110111-0934324를 기준값으로 고정함.',
      '본사 소재지는 서울특별시 송파구 중대로 121, 2층이며 대표자 유형은 단독임.',
    ],
    execution: [
      '창업아이템은 Draft AI: AI 기반 B2B 제안서 초안 자동화 및 검증 솔루션으로 확정함.',
      '협약 산출물은 Beta v1.0 1식, 외부 실증 결과보고서 2건, 정량 성과 리포트 1부로 정의함.',
      '팀 정보는 이름을 제외하고 직책·담당업무·경력 중심으로 비식별 표기함.',
    ],
    metrics: [
      '정부지원사업비 100,000,000원, 자기부담 현금 15,000,000원, 현물 28,000,000원으로 편성함.',
      `총사업비는 143,000,000원이며 비율은 정부 ${bxGovRatio}% / 자기 ${bxSelfRatio}% / 현금 ${bxCashRatio}% / 현물 ${bxInKindRatio}%임.`,
      '지원분야는 지식서비스, 전문기술분야는 정보·통신으로 고정함.',
    ],
    evidence: ['사업자등록증/법인등기', '총사업비 구성 계획표', '팀 구성 현황표'],
    riskResponse: [
      '기본정보 오기재 리스크는 제출본-증빙 서류 1:1 대조로 통제함.',
      '팀 구성 상태의 변동 가능성은 주임 배치일 최종 확인 후 즉시 반영함.',
    ],
  },
  {
    title: '□ 개요(요약)',
    diagnosis: [
      'Draft AI는 요구사항 정리-근거 탐색-초안 작성-검토 수정을 하나의 워크플로우로 통합함.',
      '핵심 병목은 숙련자 의존 수작업, 반복 수정 라운드, 제출 직전 누락/형식 오류임.',
      '당사는 금융권 AI 워크플로우 자동화 교육·실습 1건 납품 완료, 1건 진행으로 초기 신뢰를 확보함.',
    ],
    execution: [
      '현재 단계는 내부 시나리오 기반 MVP 테스트 단계로 제품화 전환을 진행함.',
      '2025.11~2026.03 동안 민간 제안서 10건 기준 50회 테스트 케이스를 운영함.',
      '지역기반 사업에서는 지역 실증 고객 확보 후 전국 확산 2단계 전략으로 전개함.',
    ],
    metrics: [
      '초안 작성시간: 3시간 → 5분.',
      '수정 라운드: 6회 → 2회, 필수항목 누락: 3개 → 0개.',
      '근거 인용 포함률: 20% → 80%.',
    ],
    evidence: ['내부 테스트 로그 50건', '금융권 교육·실습 납품 산출물', 'KPI 전후 비교표'],
    riskResponse: [
      '내부 테스트 성과를 외부 실증 성과로 과대해석하지 않도록 KPI 재현성 검증을 별도 수행함.',
      '초기 도입 장벽(보안/승인/자료 표준화)은 실증 온보딩 문서로 선제 대응함.',
    ],
  },
  {
    title: '1-1. 문제인식(Problem) - 창업아이템 배경 및 필요성',
    diagnosis: [
      'B2B 문서 업무의 핵심 문제는 작성 자체보다 정리·연결·검증 단계의 비효율임.',
      '수작업 기반 제안 프로세스는 시간 소모, 품질 편차, 제출 직전 리스크를 반복 발생시킴.',
      '범용 생성형 AI는 초안 속도는 높지만 통제·추적·형식검증 수준이 실무 요구에 미달함.',
    ],
    execution: [
      '외부 배경: 문서 품질과 속도가 영업·입찰 성과를 직접 좌우하는 환경으로 전환됨.',
      '내부 배경: 금융권/대기업 AI 교육·실습 수행 과정에서 프로세스형 자동화 니즈를 확인함.',
      '추진 경과: 2025.11 문제정의 → 2025.12~2026.01 MVP 설계 → 2026.01~03 테스트 50회 수행.',
    ],
    metrics: [
      '테스트 대상 문서: 민간 제안서 10건.',
      '테스트 횟수: 총 50회 케이스 운영.',
      '핵심 문제축: 시간(초안/검토)·품질(누락/근거)·확장성(숙련자 의존).',
    ],
    evidence: ['문제정의 노트', '업무 흐름 분석 문서', 'KPI 측정 체계 문서'],
    riskResponse: [
      '문제 서술의 추상화를 막기 위해 실제 테스트 데이터 기반으로 본문을 고정함.',
      '요구사항 변동이 큰 고객군은 실증 범위에서 단계적으로 편입함.',
    ],
  },
  {
    title: '1-2. 문제인식(Problem) - 목표시장(고객) 현황 분석',
    diagnosis: [
      '초기 목표시장: 대기업/계열사/공공기업, 컨설팅·교육·SI 조직의 반복 제안서 수요군.',
      '2차 목표시장: 보안 민감도가 높은 금융권·엔터프라이즈 내부형 도입 수요군.',
      '중장기 시장: 공공조달·나라장터 등 서식 규정이 강한 문서 시장.',
    ],
    execution: [
      '민간 제안서 중심 표준형 제품을 먼저 완성하고 공공조달 특화 모듈은 후속 개발함.',
      '진입전략은 트랙A(기존 네트워크) + 트랙B(지역 실증 확산) 병행으로 운영함.',
      '고객 요구사항은 제출 가능 형식, 누락 검증, 근거 연결, 사용자 검토 구조, 보안성으로 정리함.',
    ],
    metrics: [
      '협약기간 실증 고객 2개사 확보.',
      '실증 적용 문서 최소 10건 이상 운영.',
      '추가 파트너/도입의향 1~2건 확보.',
    ],
    evidence: ['시장 세그먼트 정의서', '요구사항 정리표', '실증 후보군 리스트'],
    riskResponse: [
      '공공조달 확장을 협약기간 내 핵심 목표로 과도 설정하지 않고 후속 단계로 분리함.',
      '채널 의존 리스크는 기존 네트워크와 지역기관 채널을 병행해 완화함.',
    ],
  },
  {
    title: '2-1. 실현가능성(Solution) - 개발/개선 준비현황',
    diagnosis: [
      'Draft AI는 내부 MVP 단계에 진입했으며 문서 입력-구조화-초안생성-검증 4단계를 구축함.',
      '성과 측정 로그(시간/라운드/누락/인용률)를 이미 운영해 정량 검증 기반을 확보함.',
      '현업 니즈(보안, 승인, 자료 표준화 수준)를 기능 우선순위에 반영한 상태임.',
    ],
    execution: [
      '민간 제안서 구조 분석으로 필수항목 체크리스트 자동화 기능을 설계함.',
      '근거자료 기반 초안 생성과 수정 포인트 출력 기능을 MVP에서 검증함.',
      '금융권 교육·실습 납품 접점에서 PoC 전환 가능한 고객 접점을 확보함.',
    ],
    metrics: [
      '초안 작성시간 180분 → 5분.',
      '수정 라운드 6회 → 2회, 필수항목 누락 3개 → 0개.',
      '근거 인용 포함률 20% → 80%.',
    ],
    evidence: ['MVP 기능 점검표', '테스트 로그(10건/50회)', '초기 납품 실적 문서'],
    riskResponse: [
      '내부 테스트와 외부 실무 환경 간 격차는 실증 단계에서 템플릿 미세조정으로 대응함.',
      '문서 유형 다양성 리스크는 유형별 룰셋 자산화를 통해 단계적 해소함.',
    ],
  },
  {
    title: '2-2. 실현가능성(Solution) - 실현 및 구체화/고도화 방안',
    diagnosis: [
      '협약기간 핵심 목표는 민간 제안서 중심 Draft AI Beta v1.0 완성과 외부 실증 2건임.',
      '차별화 핵심은 생성 기능이 아니라 누락·형식·근거 검증 레이어의 제품화임.',
      '기술보호는 브랜드/룰셋/검증로직/템플릿 자산 관리로 다층 설계가 필요함.',
    ],
    execution: [
      '요구사항 구조화 정확도, 근거 인용 처리, 검증 리포트 자동화를 우선 고도화함.',
      '출력 형식(PDF/PPT/문서) 안정화와 실증 온보딩 프로세스를 협약기간 내 고정함.',
      '단기(2026): Beta/PoC/성과리포트, 중기(2027H1): 권한·보안 확장, 장기(2027H2+): 공공조달 모듈로 전개함.',
    ],
    metrics: [
      'Draft AI Beta v1.0 1식: 2026.12 완료.',
      '외부 실증(PoC) 결과보고서 2건: 2026.11~12 완료.',
      '정량 성과 리포트 1부: 2026.12 완료.',
    ],
    evidence: ['협약기간 로드맵', '고도화 백로그', '기술보호 실행 체크리스트'],
    riskResponse: [
      '기능 확장 욕심으로 일정이 지연되지 않도록 협약 초기 범위 고정을 시행함.',
      '외주 품질 리스크는 출력 모듈 검수 기준과 인수조건을 계약서에 명시해 통제함.',
    ],
  },
  {
    title: '3-1. 성장전략(Scale-up) - 비즈니스 모델',
    diagnosis: [
      '수익모델은 PoC/도입 패키지형(1단계)과 구독형 SaaS(2단계)로 설계함.',
      '초기에는 교육·실습 연계형 진입으로 도입 저항을 낮추는 구조가 효과적임.',
      '중장기에는 기업형 보안/관리 옵션을 별도 과금해 ARPU를 확장함.',
    ],
    execution: [
      '1단계에서 요구사항 정의·템플릿 세팅 포함 프로젝트형 매출을 확보함.',
      '2단계에서 사용자 수/처리 문서 수/템플릿 수 기준 요금제를 적용함.',
      '납품 레퍼런스를 실증 사례집으로 전환해 반복 세일즈 재료로 자산화함.',
    ],
    metrics: [
      '협약기간 내 제품 직접 매출보다 PoC 전환율과 실증 성과 재현성을 우선 KPI로 둠.',
      '협약 종료 후 상용 SaaS 전환 및 반복매출 구조 전환을 목표로 함.',
      '도입 패키지형 매출에서 구독형 전환 비중을 단계적으로 확대함.',
    ],
    evidence: ['수익모델 설계안', '요금제 초안', '도입 패키지 구성안'],
    riskResponse: [
      '프로젝트형 매출 편중 리스크는 SaaS 표준 기능 출시 일정 준수로 완화함.',
      '가격 저항 리스크는 체험형 데모/워크숍으로 도입 체감가치를 선제 제공해 대응함.',
    ],
  },
  {
    title: '3-2. 성장전략(Scale-up) - 시장 진입 및 사업화 전략',
    diagnosis: [
      '전국형 제품이지만 지역기반 사업에서는 지역 실증/확산 인프라를 진입엔진으로 활용함.',
      '트랙A(기존 금융·대기업 네트워크)와 트랙B(지역기관 실증 채널)의 병행이 핵심임.',
      '초기 고객 획득은 문서 자동화 데모/교육 연계 방식이 가장 전환율이 높음.',
    ],
    execution: [
      '협약기간 내 Beta v1.0 실증형 출시와 데모 세션 운영을 병행함.',
      '엑스퍼트컨설팅 채널과 지역 프로그램 연계로 PoC 고객 2곳을 조기 확보함.',
      '실증 결과를 요금체계/도입 프로세스 표준안으로 문서화해 확산 기반을 마련함.',
    ],
    metrics: [
      '외부 실증 고객 2개사 확보.',
      '초안 작성시간 1건 20분 이내 또는 수작업 대비 80% 이상 단축.',
      '수정 라운드 평균 3회 이하, 필수항목 누락 0개, 근거 인용률 70% 이상 유지.',
    ],
    evidence: ['채널 운영계획', '실증 운영계획서', '성과지표 정의서'],
    riskResponse: [
      '실증 고객 모집 지연 리스크는 지역기관/기존 네트워크 동시 모집으로 대응함.',
      '단일 파트너 의존 리스크는 협약기간 중 추가 접점 1~2건 확보로 분산함.',
    ],
  },
  {
    title: '3-3. 성장전략(Scale-up) - 추진 일정 및 자금 운용 계획',
    diagnosis: [
      '2025.11~2026.03 MVP 검증 단계 이후, 협약기간(2026.05~12) 제품화/실증 단계로 진입함.',
      '협약기간 핵심 게이트는 Beta v1.0 완성, 실증 2건 완료, KPI 재현성 확보임.',
      '자금은 인건비·클라우드/모델비·출력 안정화·실증 운영비 중심으로 집행함.',
    ],
    execution: [
      '전체 로드맵: MVP 검증 → Beta 개발/실증 → 상용화 준비 → 2027 SaaS 전환.',
      '협약 마일스톤: 5월 범위확정, 6~8월 개발, 7~10월 실증, 11~12월 보고/사업화 정리.',
      '자금조달은 자기부담 투입 + 협약 종료 후 PoC/초기 SaaS 매출 기반 재투자를 기본축으로 설정함.',
    ],
    metrics: [
      '총사업비 143,000,000원 / 정부 100,000,000원 / 현금 15,000,000원 / 현물 28,000,000원.',
      `비율은 정부 ${bxGovRatio}%, 자기 ${bxSelfRatio}%, 현금 ${bxCashRatio}%, 현물 ${bxInKindRatio}%로 기준 충족.`,
      '주요 집행 항목: 인건비 75백만원, API·클라우드·데이터 20백만원, 외주 12백만원, 기자재 8백만원, 운영비 13백만원.',
    ],
    evidence: ['사업 추진 일정표', '사업비 집행계획안', '자금 필요성·조달계획서'],
    riskResponse: [
      '집행 지연 리스크는 월별 집행률 점검과 항목 재배정 룰로 통제함.',
      '과집행 리스크는 필수기능 우선 원칙과 단계별 지출 승인으로 차단함.',
    ],
  },
  {
    title: '4-1. 조직구성(Team) - 대표자 및 조직 역량',
    diagnosis: [
      '조직은 대표(총괄), 팀장(기획·마케팅), 선임(컨설팅), 매니저(AI개발), 주임(운영지원) 구조임.',
      '핵심 인력은 각 역할에서 1~12년 이상 실무경험을 보유하고 있으며 이름은 비노출 처리함.',
      '기획-현장-개발 인력이 단일팀으로 운영돼 피드백 반영 속도가 빠름.',
    ],
    execution: [
      '대표는 제품전략/고객개발/실증 총괄, 팀장은 0→1 사업기획과 마케팅 실행을 담당함.',
      '선임·주임은 실증 운영, 문서 수집·정리, 피드백 반영, KPI 기록 체계를 운영함.',
      '매니저는 시스템 구현과 운영 안정화, 성능·보안 개선을 전담함.',
    ],
    metrics: [
      '협약기간 핵심 업무 오너 100% 지정.',
      '실증 운영·온보딩 담당 인력 2026.06 투입 계획.',
      '템플릿/QA 보강 인력은 2026.07~08 선택 채용으로 운영.',
    ],
    evidence: ['팀 구성 현황표', '역할-책임 매트릭스', '인력 활용 계획표'],
    riskResponse: [
      '인력 과부하 리스크는 실증 운영 전담 배치와 우선순위 재조정으로 대응함.',
      '핵심인력 공백 리스크는 업무 매뉴얼·로그 기반 인수인계 체계로 완화함.',
    ],
  },
  {
    title: '4-2. 조직구성(Team) - 외부 네트워크 현황 및 활용 계획',
    diagnosis: [
      '지역기반 사업의 핵심은 지역 고객 한정이 아니라 지역 실증·확산 인프라 활용임.',
      '핵심 네트워크는 지역 창업중심대학/유관기관, 엑스퍼트컨설팅, 기존 납품 고객군으로 구성함.',
      '외부 네트워크는 실증 고객 모집, PoC 고도화, 후속 확산 채널 역할을 수행함.',
    ],
    execution: [
      '지역 주관기관과 실증 참여 조직 모집 및 데모/발표 기회를 연계함.',
      '엑스퍼트컨설팅 채널로 초기 PoC 후보를 발굴하고 요구사항 정리를 공동 수행함.',
      '기존 납품 고객군 피드백을 통해 보안 요구사항과 도입 장벽을 사전 반영함.',
    ],
    metrics: [
      '협약기간 내 실증 기반 파트너 접점 1~2건 추가 확보.',
      '지역기관 연계 실증 확산 채널 최소 1개 이상 확보.',
      '단일 채널 의존도 완화를 위한 병행 채널 운영률 100% 유지.',
    ],
    evidence: ['협력기관 활용계획', 'PoC 후보군 목록', '채널 실행 로그'],
    riskResponse: [
      '특정 파트너 의존 리스크는 엑스퍼트 채널+지역기관 채널 병행 운영으로 대응함.',
      '협업 지연 리스크는 월간 공동 KPI 리뷰와 담당자 지정으로 통제함.',
    ],
  },
]

const bxKpiComparison: BxKpiItem[] = [
  {
    id: 'draft-time',
    label: '초안 작성시간',
    before: 180,
    after: 5,
    target: 20,
    unit: '분',
    better: 'lower',
    note: '민간 제안서 10건, 50회 테스트 평균',
  },
  {
    id: 'revision-round',
    label: '수정 라운드',
    before: 6,
    after: 2,
    target: 3,
    unit: '회',
    better: 'lower',
    note: '검토-재수정 반복 횟수 기준',
  },
  {
    id: 'missing-items',
    label: '필수항목 누락',
    before: 3,
    after: 0,
    target: 0,
    unit: '개',
    better: 'lower',
    note: '제출 직전 체크리스트 기준',
  },
  {
    id: 'citation-rate',
    label: '근거 인용 포함률',
    before: 20,
    after: 80,
    target: 70,
    unit: '%',
    better: 'higher',
    note: '근거 연결 기능 적용 후 평균',
  },
]

const bxWorkflowSteps: BxWorkflowStep[] = [
  {
    id: 'input',
    title: '문서 입력',
    detail: 'RFP, 기존 제안서, 내부 레퍼런스 문서를 업로드하고 처리 가능한 단위로 분해함.',
    output: '입력 문서셋 및 전처리 로그',
  },
  {
    id: 'structure',
    title: '요구사항 구조화',
    detail: '요구사항, 평가 포인트, 필수 제출항목을 자동 추출해 체크리스트로 변환함.',
    output: '요구사항 구조화 시트',
  },
  {
    id: 'evidence',
    title: '근거 연결',
    detail: '내부 사례/성과지표/전문가 이력 등 근거자료를 요구사항 항목과 매핑함.',
    output: '근거 매핑 테이블',
  },
  {
    id: 'draft',
    title: '초안 생성',
    detail: '구조화된 요구사항과 근거를 바탕으로 제출 형식에 맞는 초안을 자동 생성함.',
    output: '제안서 초안(PDF/PPT/문서)',
  },
  {
    id: 'verify',
    title: '검증 리포트',
    detail: '누락·형식·근거 인용 상태를 자동 점검하고 수정 포인트를 리포트로 제공함.',
    output: '검증 리포트',
  },
  {
    id: 'review',
    title: '사용자 검토',
    detail: '담당자가 수정 포인트를 반영해 최종본을 확정하고 결과 로그를 저장함.',
    output: '최종 제출본 및 개선 로그',
  },
]

const bxGanttPlan = [
  { task: '기능 범위 확정', start: 5, duration: 1, period: '2026.05' },
  { task: 'Beta 개발·고도화', start: 6, duration: 3, period: '2026.06~08' },
  { task: '외부 실증 1차', start: 7, duration: 2, period: '2026.07~08' },
  { task: '피드백 반영', start: 8, duration: 2, period: '2026.08~09' },
  { task: '외부 실증 2차', start: 9, duration: 2, period: '2026.09~10' },
  { task: '결과보고·사업화 정리', start: 11, duration: 2, period: '2026.11~12' },
]

const bxMilestonePlan = [
  { month: '5월', 개발: 2, 검증: 0, 누적완료율: 10 },
  { month: '6월', 개발: 3, 검증: 1, 누적완료율: 22 },
  { month: '7월', 개발: 3, 검증: 2, 누적완료율: 38 },
  { month: '8월', 개발: 3, 검증: 3, 누적완료율: 55 },
  { month: '9월', 개발: 2, 검증: 3, 누적완료율: 70 },
  { month: '10월', 개발: 1, 검증: 3, 누적완료율: 83 },
  { month: '11월', 개발: 1, 검증: 3, 누적완료율: 92 },
  { month: '12월', 개발: 0, 검증: 2, 누적완료율: 100 },
]

const bxFundingFrame = [
  { item: '정부지원금(총사업비 대비)', value: bxGovRatio },
  { item: '자기부담금(총사업비 대비)', value: bxSelfRatio },
  { item: '자기부담 현금(총사업비 대비)', value: bxCashRatio },
  { item: '자기부담 현물(총사업비 대비)', value: bxInKindRatio },
]

const bxBudgetAmount = [
  { item: '정부지원', value: bxBudgetPlan.gov },
  { item: '자부담 현금', value: bxBudgetPlan.cash },
  { item: '자부담 현물', value: bxBudgetPlan.inKind },
  { item: '자부담 합계', value: bxSelfAmount },
]

const bxGoalComparison = [
  { metric: '실증 고객(개사)', baseline: 0, target: 2 },
  { metric: '실증 문서(건)', baseline: 0, target: 10 },
  { metric: '초안 시간(분)', baseline: 180, target: 20 },
  { metric: '수정 라운드(회)', baseline: 6, target: 3 },
  { metric: '근거 인용률(%)', baseline: 20, target: 70 },
]

const bxFinalChecklist: BxChecklistItem[] = [
  { item: '양식 순서 유지', criterion: '일반현황→개요→Problem→Solution→Scale-up→Team 순서 유지' },
  { item: '개인정보 비노출', criterion: '이름/생년/학교/직장 식별정보 제거, 직책·역할만 표기' },
  { item: '수치 정합성', criterion: '10건/50회, 3시간→5분, 6→2, 3→0, 20%→80% 수치 일치' },
  {
    item: '예산 비율 준수',
    criterion: `총 143백만원 기준 정부 ${bxGovRatio}% / 자기 ${bxSelfRatio}% / 현금 ${bxCashRatio}% / 현물 ${bxInKindRatio}%`,
  },
  { item: '협약기간 목표 명시', criterion: 'Beta v1.0 1식, PoC 보고서 2건, 성과리포트 1부 완료기준 기재' },
  { item: '실증 KPI 명시', criterion: '실증고객 2개사, 실증문서 10건+, 누락 0개, 인용률 70%+ 목표 기재' },
  { item: '근거 문서 연결', criterion: '각 핵심 문장에 테스트 로그/실증계획/예산표 근거 연결' },
  { item: '리스크 대응 포함', criterion: '채널의존, 일정지연, 품질변동, 보안이슈 대응 문구 포함' },
]

const bxSources: SourceDoc[] = [
  {
    title: '사용자 제공 제출용 Draft AI 사업계획서 원문(2026-03-10)',
    org: 'BX컨설팅 제출 초안',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '일반현황, 테스트 수치(10건/50회), 예산(100/15/28/143), 실증 목표 및 일정 반영',
  },
  {
    title: 'NotebookLM 질의 로그(Session e03b2126)',
    org: 'NotebookLM / BX컨설팅 APPLY PROJECT',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '기존 리서치 근거와 제출 원문의 정합 검증, 섹션별 근거 연결',
  },
  {
    title: '2026 창업중심대학 지역기반 (예비)창업기업 사업계획서 양식(별첨1)',
    org: '창업중심대학 운영기관',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '목차 구조, 제출 제한사항, 마스킹 기준 적용',
  },
  {
    title: '2026 창업중심대학 지역기반 모집공고',
    org: '중소벤처기업부/창업진흥원',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '사업화자금 상한(정부지원 1억원), 협약기간(2026.05~12) 및 비율 기준 확인',
  },
  {
    title: 'K-Startup 공식 포털',
    org: '중소벤처기업부 / 창업진흥원',
    year: '2026',
    url: 'https://www.k-startup.go.kr/',
    usedFor: '최종 공고값·제출 채널 확인',
  },
]

function SourceTable({ rows }: { rows: SourceDoc[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>문서명</th>
            <th>기관</th>
            <th>연도</th>
            <th>활용 목적</th>
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
        <span className="hero-kicker">보고서 허브</span>
        <h1>0chul&apos;s lair</h1>
        <p>
          NotebookLM 기반 리서치 산출물을 실행 가능한 보고서 화면으로 구성한 상위 리스트뷰입니다. 문서별로 요약이 아니라
          의사결정에 필요한 수치, 단계, 리스크 대응, 출처 링크를 분리해 확인할 수 있습니다.
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
                  NotebookLM <ExternalLink size={12} />
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
                상세 페이지 열기 <ArrowUpRight size={15} />
              </button>
            </motion.article>
          )
        })}
      </section>
    </>
  )
}

function SamhwaScenarioCard({ scenario }: { scenario: SamhwaScenario }) {
  return (
    <article className="detail-card">
      <header>
        <div className="detail-title-row">
          <h3>
            {scenario.code}. {scenario.name}
          </h3>
          <span>{scenario.strategy}</span>
        </div>
        <p>{scenario.summary}</p>
      </header>

      <div className="metric-inline">
        <div>
          <small>총투자비(CAPEX)</small>
          <strong>{scenario.capex.toLocaleString('ko-KR')}억원</strong>
        </div>
        <div>
          <small>기준 자유현금흐름(FCF)</small>
          <strong>{scenario.fcfBase.toLocaleString('ko-KR')}억원</strong>
        </div>
        <div>
          <small>내부수익률(IRR)</small>
          <strong>{scenario.irr.toFixed(1)}%</strong>
        </div>
        <div>
          <small>회수기간</small>
          <strong>{scenario.payback.toFixed(1)}년</strong>
        </div>
      </div>

      <div className="detail-columns">
        <div>
          <h4>장점</h4>
          <ul>
            {scenario.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>한계/리스크</h4>
          <ul>
            {scenario.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="detail-columns">
        <div>
          <h4>단계별 실행</h4>
          <ol className="ordered-list">
            {scenario.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h4>추진 / 중단 기준</h4>
          <div className="decision-box">
            <p>
              <strong>추진:</strong> {scenario.go}
            </p>
            <p>
              <strong>중단:</strong> {scenario.noGo}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

function SamhwaView({ onBack }: { onBack: () => void }) {
  const bestScenario = useMemo(
    () => samhwaScenarios.reduce((acc, cur) => (cur.fcfBase > acc.fcfBase ? cur : acc), samhwaScenarios[0]),
    [],
  )

  return (
    <>
      <section className="top-nav">
        <button type="button" onClick={onBack} className="back-btn">
          <ArrowLeft size={14} /> 리스트로 돌아가기
        </button>
        <a href={samhwaNotebookUrl} target="_blank" rel="noreferrer" className="ghost-link">
          NotebookLM 열기 <ExternalLink size={12} />
        </a>
      </section>

      <section className="hero compact">
        <span className="hero-kicker">삼화페인트 사옥 전략</span>
        <h1>자산가치 극대화 및 효율 운용 종합 대시보드</h1>
        <p>
          본 페이지는 삼화페인트 사옥 활용 전략을 단일안이 아닌 포트폴리오 관점에서 평가합니다. 2026~2035 기간 동안
          재무성과(FCF/IRR/회수기간), 규제·인허가 리스크, 실행 난이도, 조직 운영 연속성을 동시에 고려해 단계별 의사결정
          프레임을 제공합니다.
        </p>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-head">
            <HandCoins size={16} /> 기준 FCF 최고
          </div>
          <strong>
            {bestScenario.code}안 ({bestScenario.name})
          </strong>
          <p>단기 유동성 기준 가장 높은 재무효과</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <Landmark size={16} /> 기본 조달 가정
          </div>
          <strong>LTV 60~70%</strong>
          <p>PF 구조 설계 시 금리 구간 및 상환구조 분산 필요</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <ShieldAlert size={16} /> 규제 핵심 포인트
          </div>
          <strong>높이 14m / 17m</strong>
          <p>역사문화환경권역 인허가 선검증 필수</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <TrendingUp size={16} /> 권고 포트폴리오
          </div>
          <strong>D 단기 + E 중장기</strong>
          <p>현금흐름 안정화와 자산가치 상승의 균형 접근</p>
        </article>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>
              <BarChart3 size={17} /> 시나리오별 10개년 FCF(억원)
            </h2>
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={samhwaScenarios}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="code" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" unit="억" />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}억원`} />
                <Legend />
                <Bar dataKey="fcfDown" fill="#f08a71" name="하향" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fcfBase" fill="#1fb4a8" name="기준" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fcfUp" fill="#65d5ce" name="상향" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>
              <TrendingUp size={17} /> IRR / 회수기간 복합차트
            </h2>
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={samhwaScenarios}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="code" stroke="#a9bed1" />
                <YAxis yAxisId="left" stroke="#a9bed1" unit="%" />
                <YAxis yAxisId="right" orientation="right" stroke="#a9bed1" unit="년" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="irr" stroke="#65d5ce" strokeWidth={2.5} name="IRR" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="payback"
                  stroke="#f4b64b"
                  strokeWidth={2.5}
                  name="회수기간"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>거시환경 가중치(2026~2035)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={samhwaMarketTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="year" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="기준금리" stroke="#65d5ce" name="기준금리" />
                <Line type="monotone" dataKey="PF금리" stroke="#f4b64b" name="PF금리" />
                <Line type="monotone" dataKey="캡레이트" stroke="#9bc1ff" name="캡레이트" />
                <Line type="monotone" dataKey="공실률" stroke="#f08a71" name="공실률" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>핵심 리스크 레이더</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={samhwaRiskRadar}>
                <PolarGrid stroke="#385068" />
                <PolarAngleAxis dataKey="risk" stroke="#a9bed1" fontSize={11} />
                <PolarRadiusAxis domain={[0, 5]} stroke="#6e879c" tickCount={6} />
                <Radar name="A(리스백)" dataKey="A" stroke="#65d5ce" fill="#65d5ce" fillOpacity={0.2} />
                <Radar name="D(대수선)" dataKey="D" stroke="#f4b64b" fill="#f4b64b" fillOpacity={0.2} />
                <Radar name="E(통합신축)" dataKey="E" stroke="#f08a71" fill="#f08a71" fillOpacity={0.2} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>시나리오 상세 분석(장점·한계·실행 단계·추진/중단)</h2>
        </div>
        <div className="detail-grid">
          {samhwaScenarios.map((scenario) => (
            <SamhwaScenarioCard key={scenario.code} scenario={scenario} />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>통합 실행 로드맵(단계별 액션)</h2>
        </div>
        <div className="roadmap long">
          {samhwaExecutionStages.map((stage) => (
            <article key={stage.phase} className="roadmap-step">
              <span>{stage.phase}</span>
              <h3>{stage.detail}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>의사결정 매트릭스(5점 척도)</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>평가 기준</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              {samhwaDecisionMatrix.map((row) => (
                <tr key={row.criterion}>
                  <td>{row.criterion}</td>
                  <td>{row.A}</td>
                  <td>{row.B}</td>
                  <td>{row.C}</td>
                  <td>{row.D}</td>
                  <td>{row.E}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>
            <FileText size={17} /> 출처 인덱스
          </h2>
        </div>
        <SourceTable rows={samhwaSources} />
      </section>
    </>
  )
}

function BxView({ onBack }: { onBack: () => void }) {
  const [selectedKpiId, setSelectedKpiId] = useState('draft-time')
  const [activeWorkflowId, setActiveWorkflowId] = useState('input')

  const activeKpi = useMemo(
    () => bxKpiComparison.find((item) => item.id === selectedKpiId) ?? bxKpiComparison[0],
    [selectedKpiId],
  )

  const activeWorkflow = useMemo(
    () => bxWorkflowSteps.find((item) => item.id === activeWorkflowId) ?? bxWorkflowSteps[0],
    [activeWorkflowId],
  )

  const kpiChartData = useMemo(
    () => [
      {
        category: activeKpi.label,
        수작업: activeKpi.before,
        'Draft AI': activeKpi.after,
        협약목표: activeKpi.target,
      },
    ],
    [activeKpi],
  )

  const kpiDeltaText = useMemo(() => {
    if (activeKpi.before <= 0) {
      return '기준값 없음'
    }
    const diff =
      activeKpi.better === 'lower'
        ? ((activeKpi.before - activeKpi.after) / activeKpi.before) * 100
        : ((activeKpi.after - activeKpi.before) / activeKpi.before) * 100

    return `${diff.toFixed(1)}% ${activeKpi.better === 'lower' ? '개선' : '상승'}`
  }, [activeKpi])

  return (
    <>
      <section className="top-nav">
        <button type="button" onClick={onBack} className="back-btn">
          <ArrowLeft size={14} /> 리스트로 돌아가기
        </button>
        <a href={bxNotebookUrl} target="_blank" rel="noreferrer" className="ghost-link">
          NotebookLM 열기 <ExternalLink size={12} />
        </a>
      </section>

      <section className="hero compact bx-hero">
        <span className="hero-kicker">BX컨설팅 | 창업중심대학(지역기반)</span>
        <h1>2026 창업중심대학(지역기반) 사업계획서</h1>
        <p>
          본 페이지는 BX컨설팅 Draft AI의 제출용 사업계획서 본문입니다. 일반현황부터 조직구성까지 양식 목차 순서의
          확정 문안을 배치했고, 하단 차트와 체크리스트는 내부 검토용 참고 부록으로 분리했습니다.
        </p>
        <div className="notice-box">
          정부지원금은 공고 상한인 100백만원(1억원)으로 고정하고, 총사업비 143백만원(정부 {bxGovRatio}%, 자기{' '}
          {bxSelfRatio}%, 현금 {bxBudgetPlan.cash} / 현물 {bxBudgetPlan.inKind})으로 비율 기준을 충족했습니다.
          제출 직전 최종 공고와 수치 일치 여부를 재확인해야 합니다.
          {bxNotebookQueryMeta}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>제출 본문 안내</h2>
        </div>
        <p className="chart-note">
          아래 섹션은 실제 제출 문안 기준으로 작성되었습니다. 본문은 지시형 문구를 제외하고 현재 상태, 실행 항목, 정량
          목표 중심으로만 구성했습니다.
        </p>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>핵심 시각 자료(인터랙티브)</h2>
        </div>
        <div className="visual-grid">
          <article className="visual-card">
            <h3>내부 테스트 성과 비교(수작업 vs Draft AI)</h3>
            <div className="chip-row">
              {bxKpiComparison.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip-btn${item.id === selectedKpiId ? ' active' : ''}`}
                  onClick={() => setSelectedKpiId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="chart-wrap short">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpiChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                  <XAxis dataKey="category" stroke="#a9bed1" />
                  <YAxis stroke="#a9bed1" />
                  <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}${activeKpi.unit}`} />
                  <Legend />
                  <Bar dataKey="수작업" fill="#f08a71" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Draft AI" fill="#65d5ce" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="협약목표" fill="#f4b64b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="chart-note">
              현재 선택 지표: {activeKpi.label} | 개선폭: {kpiDeltaText} | 기준: {activeKpi.note}
            </p>
          </article>

          <article className="visual-card">
            <h3>Draft AI 서비스 개요도(인터랙티브)</h3>
            <div className="workflow-rail">
              {bxWorkflowSteps.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  className={`wf-node${step.id === activeWorkflowId ? ' active' : ''}`}
                  onClick={() => setActiveWorkflowId(step.id)}
                  aria-pressed={step.id === activeWorkflowId}
                >
                  <span>{idx + 1}</span>
                  <strong>{step.title}</strong>
                </button>
              ))}
            </div>
            <div className="workflow-detail">
              <h4>{activeWorkflow.title}</h4>
              <p>{activeWorkflow.detail}</p>
              <small>출력물: {activeWorkflow.output}</small>
            </div>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>제출 본문(양식 목차 순서)</h2>
        </div>
        <div className="mirror-grid">
          {bxFormMirrorSections.map((section) => (
            <article key={section.title} className="mirror-card">
              <h3>{section.title}</h3>
              <div className="mirror-group">
                <h4>핵심 진단</h4>
                <ul>
                  {section.diagnosis.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mirror-group">
                <h4>실행 계획</h4>
                <ul>
                  {section.execution.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mirror-group">
                <h4>정량 목표</h4>
                <ul>
                  {section.metrics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mirror-group">
                <h4>근거</h4>
                <ul>
                  {section.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="devil-box">
                <strong>리스크 대응</strong>
                <ul>
                  {section.riskResponse.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>참고 부록(내부 검토용)</h2>
        </div>
        <p className="chart-note">
          아래 자료는 제출 본문을 보완하는 내부 검토용 부록입니다. 차트, 점검표, 의사결정 메모는 제출용 원문과 동일 수치로
          동기화해 관리합니다.
        </p>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>협약기간 간트차트(2026.05~12)</h2>
        </div>
        <div className="chart-wrap tall">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bxGanttPlan} layout="vertical" margin={{ left: 6, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
              <XAxis
                type="number"
                stroke="#a9bed1"
                domain={[5, 12]}
                ticks={[5, 6, 7, 8, 9, 10, 11, 12]}
                tickFormatter={(value) => `${value}월`}
              />
              <YAxis dataKey="task" type="category" stroke="#a9bed1" width={170} />
              <Tooltip
                formatter={(value, name, item) =>
                  name === '기간'
                    ? `${value ?? 0}개월 (${((item?.payload as { period?: string } | undefined)?.period ?? '-')})`
                    : ''
                }
              />
              <Bar dataKey="start" stackId="gantt" fill="rgba(0,0,0,0)" legendType="none" />
              <Bar dataKey="duration" stackId="gantt" fill="#f4b64b" name="기간" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="chart-note">주: 막대 길이는 개월 수, 툴팁은 상세 기간(연월)을 표시함.</p>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>총사업비 집행 프레임(비율, %)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bxFundingFrame} layout="vertical" margin={{ left: 8, right: 18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis type="number" stroke="#a9bed1" unit="%" />
                <YAxis dataKey="item" type="category" stroke="#a9bed1" width={170} />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}%`} />
                <Bar dataKey="value" fill="#65d5ce" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>총사업비 구성(금액, 백만원)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bxBudgetAmount}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="item" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" unit="백만원" />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}백만원`} />
                <Bar dataKey="value" fill="#9bc1ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>협약기간 월별 마일스톤(Bar)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bxMilestonePlan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="month" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}개`} />
                <Legend />
                <Bar dataKey="개발" fill="#65d5ce" radius={[6, 6, 0, 0]} />
                <Bar dataKey="검증" fill="#f4b64b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="panel-header">
            <h2>협약기간 누적 완료율(Line)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bxMilestonePlan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
                <XAxis dataKey="month" stroke="#a9bed1" />
                <YAxis stroke="#a9bed1" unit="%" />
                <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}%`} />
                <Line type="monotone" dataKey="누적완료율" stroke="#9bc1ff" strokeWidth={2.6} name="누적완료율" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>실증 KPI 목표 비교(현재 vs 협약 목표)</h2>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bxGoalComparison} layout="vertical" margin={{ left: 4, right: 18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
              <XAxis type="number" stroke="#a9bed1" />
              <YAxis dataKey="metric" type="category" stroke="#a9bed1" width={140} />
              <Tooltip formatter={(v: number | string | undefined) => `${v ?? 0}`} />
              <Legend />
              <Bar dataKey="baseline" name="현재" fill="#f08a71" radius={[0, 6, 6, 0]} />
              <Bar dataKey="target" name="협약목표" fill="#65d5ce" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="chart-note">
          주: 단위가 서로 다른 지표는 절대 비교가 아닌 목표 방향성 확인 용도로 사용함.
        </p>
      </section>

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>참고 부록 | 제출 점검 체크리스트</h2>
          </div>
          <ul className="fit-list">
            {bxFinalChecklist.map((item) => (
              <li key={item.item}>
                <div>
                  <strong>{item.item}</strong>
                  <span>{item.criterion}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="panel-header">
            <h2>참고 부록 | 의사결정 메모</h2>
          </div>
          <div className="decision-box expanded">
            <p>
              1. <strong>문제정의:</strong> 민간 제안서 10건, 50회 테스트에서 문서 병목을 수치로 확인함.
            </p>
            <p>
              2. <strong>실행경로:</strong> 2026.05~12 Beta v1.0 완성과 외부 실증 2건을 우선 달성함.
            </p>
            <p>
              3. <strong>예산원칙:</strong> 총 143백만원 기준 정부 {bxGovRatio}% / 자기 {bxSelfRatio}%로 비율을 준수함.
            </p>
            <p>
              4. <strong>운영원칙:</strong> 이름 비노출 원칙을 유지하고 수치·근거·산출물을 1:1로 연결함.
            </p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>
            <FileText size={17} /> 출처 인덱스
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
