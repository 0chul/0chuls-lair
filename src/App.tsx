import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
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
  what: string[]
  how: string[]
  evidence: string[]
  devilCheck: string
}

type BxStepItem = {
  step: string
  goal: string
  inputs: string[]
  outputs: string[]
  check: string
}

type BxChecklistItem = {
  item: string
  criterion: string
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
    title: 'BX컨설팅 창업중심대학 사업계획서',
    subtitle: '2026 지역기반 양식 미러형 작성 가이드/실행전략',
    icon: Rocket,
    bullets: [
      '양식 목차(일반현황~조직구성) 그대로 반영한 섹션 구조',
      '제한사항/요구사항/평가항목 대응 전략을 지시형으로 정리',
      '협약기간(2026.5~12) 월별 마일스톤·예산 집행 프레임 시각화',
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

const bxNotebookQueryMeta = 'NotebookLM 질의 세션 e03b2126 (2026-03-04 캡처) 기반 작성안'

const bxWritingPremise = [
  '본 페이지 문안은 NotebookLM 노트북(ebefd664...) 질의 결과와 2026 지역기반 양식을 교차 반영했습니다.',
  '핵심 채점축은 Problem/Solution/Scale-up/Team이며, 각 축은 숫자와 증빙으로 연결되어야 합니다.',
  '협약기간 8개월(2026년 5월~12월) 내 산출물 완료기준(Definition of Done)을 월 단위로 고정해야 합니다.',
  'BX컨설팅 Draft AI는 “RAG+멀티에이전트+Self-Critique+Human-in-the-Loop” 조합을 차별 포인트로 고정합니다.',
]

const bxExecutionPlanSteps: BxStepItem[] = [
  {
    step: 'Step A (1일차) 요건/자격 고정',
    goal: '공고 원문과 기업 기본 사실을 1페이지 팩으로 확정',
    inputs: [
      '모집공고 핵심값: 지원규모 535개사, 자금 최대 1억/평균 5천만, 협약 2026.5~12',
      '기업 사실값: 설립일 2025-08-12, 업력요건 충족, 신청 주체/대표자 정보',
      '평가지표: 문제인식-실현가능성-성장전략-팀 구성',
    ],
    outputs: ['요건 체크시트', '일반현황 표 입력 원본', '상단 요약 고정 문장 10줄'],
    check: '공고 숫자/날짜/자격 문구가 본문 전체에서 단 하나의 버전으로 유지되는지 확인',
  },
  {
    step: 'Step B (2~3일차) 핵심 본문 작성',
    goal: '문제-해결-시장-팀을 Draft AI 실증 데이터로 채움',
    inputs: [
      '문제 데이터: 연간 제안서 130건 이상 수작업 작성 사례, 고객 기대치 격차(73% vs 37%)',
      '솔루션 데이터: RFP/트렌드/커리큘럼/조립/품질평가 5종 에이전트 및 MVP 검증 이력',
      '시장 데이터: 금융/대형 교육컨설팅 → 공공조달 → 중소·중견 B2B 확장 순서',
    ],
    outputs: ['문제인식/실현가능성 섹션 초안', '성장전략 초안', '섹션별 악마의 대변인 반박문'],
    check: '모든 핵심 주장마다 최소 1개의 로그·사례·실적 근거가 붙어 있는지 점검',
  },
  {
    step: 'Step C (4일차) 사업화/재무 정합화',
    goal: 'BM, KPI, 예산, 일정을 한 체계로 맞춤',
    inputs: [
      '매출 목표: 2026년 11억, 2027년 30억 파이프라인',
      '제품 KPI: 제안서 작성 시간 90% 단축, 지식허브 1,000건 구조화, 에이전트 성능 95% 이상',
      '협약기간 월별 일정표(5~12월)와 집행 항목 초안',
    ],
    outputs: ['3-1/3-2/3-3 최종안', 'KPI-예산 1:1 연결표', '월별 마일스톤 표'],
    check: '세일즈 사이클(리드-미팅-PoC-유료전환)과 비용 집행 시점이 일치하는지 확인',
  },
  {
    step: 'Step D (5일차) 제출본 패키징',
    goal: '심사위원이 즉시 채점 가능한 형태로 최종 편집',
    inputs: ['검증 완료 원고', '최종 체크리스트', '출처 인덱스'],
    outputs: ['최종 제출본(본문 10p 이내)', '발표 대응 Q&A 1장', '내부 실행 태스크 리스트'],
    check: '목차 삭제/파란문구 삭제/마스킹/양식불변/수치일관성 5개 항목을 마지막으로 재검증',
  },
]

const bxFormMirrorSections: BxSectionItem[] = [
  {
    title: '□ 일반현황',
    what: [
      '기업 정보는 “비엑스컨설팅, 설립일 2025-08-12, 업력요건 충족”을 기준값으로 고정',
      '아이템명은 “RAG 기반 멀티에이전트 Draft AI로 B2B 제안 작성 시간을 단축하는 자동화 솔루션”으로 명시',
      '협약기간 산출물은 “핵심 5종 에이전트 고도화 + 파일럿 2건 + SaaS 베타 1식”으로 정의',
    ],
    how: [
      '사업자등록증과 동일 표기로 기업명/주소/대표정보를 입력하고 표기 오차를 0으로 관리',
      '산출물마다 기능 범위와 완료조건(성능, 테스트, 적용고객)을 DoD 형태로 기재',
      '팀은 직무-성과-투입기간 포맷으로 작성하고 개인정보는 비식별 처리',
    ],
    evidence: ['사업자등록증', '법인 등기/설립일 증빙', '핵심 인력 수행 이력', '산출물 DoD 표'],
    devilCheck: '“플랫폼 구축 예정” 같은 추상 문구 금지. 협약기간 내 납품 가능한 단위로 쪼개야 함',
  },
  {
    title: '□ 개요(요약)',
    what: [
      '한 줄 정의: “우리는 B2B 제안팀의 비효율을 Draft AI로 해결한다”를 첫 문장으로 고정',
      '공고 핵심값(535개사, 최대 1억/평균 5천만, 협약 8개월)을 요약 상단에 명시',
      '성과목표는 “작성시간 90% 단축, 초기 레퍼런스 2~3건 확보”를 수치로 제시',
    ],
    how: [
      '요약 10줄 내에서 Problem/Solution/Scale-up/Team 순서를 지키고 문장당 숫자 1개 이상 포함',
      '첫 6개월 채널은 온프레미스 SI와 파트너 네트워크 중심으로 좁혀 기재',
      '요약 말미에 지원금 사용 목적(개발/실증/전환)을 항목화',
    ],
    evidence: ['요약 KPI 표', 'MVP 검증 결과', '초기 고객 반응 메모', '수익모델 요약표'],
    devilCheck: '일반론 문장(“AI 시장 성장”)만 있으면 바로 약해짐. 문제수치와 목표수치를 함께 적어야 함',
  },
  {
    title: '1-1. 문제인식(Problem) - 배경 및 필요성',
    what: [
      'B2B 제안 업무는 연간 130건 이상 수작업 사례가 존재하는 노동집약 영역임을 제시',
      '품질이 작성자 개인 역량에 과도하게 의존해 수주경쟁력 변동이 큰 구조를 설명',
      '고객 기대와 현실 격차(선제 니즈 예측 기대 73% vs 실제 경험 37%)를 정량 근거로 제시',
    ],
    how: [
      'pain point를 시간(작성 리드타임), 비용(인력 투입), 리스크(품질편차) 3축으로 분리',
      '기존 대안(수작업/외주 템플릿/단일 생성AI)의 실패 원인을 표로 비교',
      '문제 원인을 “데이터 단절 + 품질 검증 부재 + 재사용 구조 부재”로 구조화',
    ],
    evidence: ['고객 인터뷰/미팅 로그', '내부 제안 프로세스 타임라인', '산업 통계 인용', 'NotebookLM 질의 결과'],
    devilCheck: '“불편하다”가 아니라 “얼마나 느리고 비싼지”를 써야 함. 수치 없는 문제정의는 설득력 부족',
  },
  {
    title: '1-2. 문제인식(Problem) - 목표시장 현황 분석',
    what: [
      '1차 타깃은 보안 민감도가 높은 금융권/대형 교육컨설팅의 제안 조직으로 설정',
      '2차 타깃은 나라장터 기반 공공조달 참여기업과 중소·중견 B2B로 확장',
      '고객 요구는 “속도+정확도+도메인 맥락 반영” 3요건으로 정의',
    ],
    how: [
      'TAM/SAM/SOM은 “제안 수행 조직 수 × 평균 프로젝트 규모 × 전환율” 식으로 계산',
      '경쟁 구도는 직접(제안 자동화 SaaS), 간접(문서 협업툴), 대체(수작업/외주) 3분류로 작성',
      '초기 승부처를 “레퍼런스 2~3건 확보 가능성이 높은 파트너 연계 고객군”으로 한정',
    ],
    evidence: ['시장 세분화 계산표', '경쟁/대체 솔루션 매트릭스', '고객 요구사항 우선순위표'],
    devilCheck: '처음 3개월 고객군이 불명확하면 매출 예측이 공허해짐. “누가 먼저 돈 내는지”를 못 박아야 함',
  },
  {
    title: '2-1. 실현가능성(Solution) - 개발/개선 준비현황',
    what: [
      'Draft AI는 핵심 기능 MVP와 실제 시나리오 테스트를 완료한 단계로 명시',
      'RFP 분석-트렌드 리서치-커리큘럼 매칭-제안서 조립-품질평가 에이전트 구성 현황을 제시',
      '보유역량은 컨설팅 도메인 경험 + 개발 역량 + 파트너 네트워크로 정리',
    ],
    how: [
      '현재 단계를 “MVP 검증 완료/상용 전환 준비”로 정의하고 남은 항목을 기능별로 분해',
      '지식허브 데이터 구조화 계획(1,000건+)과 성능 목표(95%+)를 함께 제시',
      '실증 증빙은 데모 로그, 내부 평가표, 파트너 검토 의견으로 연결',
    ],
    evidence: ['MVP 데모 및 사용 로그', '시나리오 테스트 결과표', '파트너 협업 기록', '성능 지표 기준안'],
    devilCheck: '“개발 중”만 적으면 약함. 이미 검증된 범위와 미검증 범위를 분리해 제시해야 함',
  },
  {
    title: '2-2. 실현가능성(Solution) - 실현 및 고도화 방안',
    what: [
      '협약기간(2026.5~12) 내 핵심 기능 고도화, 파일럿 적용, SaaS 베타 공개까지 단계별로 제시',
      '품질 안정화는 Self-Critique 루프와 Human-in-the-Loop 검수 흐름으로 설계',
      '기술보호는 데이터 거버넌스, 운영 매뉴얼, 지식재산권 확보 계획으로 정리',
    ],
    how: [
      '입력-처리-출력 기준 기능명세와 API/워크플로 경계를 먼저 확정',
      '리스크(일정·품질·보안·고객전환)별 대응 시나리오와 우회안(Plan B) 작성',
      '외주 항목은 최소화하고 자체개발 범위를 명확히 분리',
      'IP는 상표/저작권/영업비밀 관리 체계 중 즉시 실행 가능한 항목부터 반영',
    ],
    evidence: ['기능 명세서', '협약기간 월별 일정표', '리스크 대응표', '기술보호 실행안'],
    devilCheck: '산출물 변경 여지가 큰 표현은 위험. “완료조건 + 검증방법 + 책임자”를 함께 써야 함',
  },
  {
    title: '3-1. 성장전략(Scale-up) - 비즈니스 모델',
    what: [
      '1단계 수익모델은 보안 민감 고객 대상 온프레미스 SI 구축료 중심으로 설계',
      '2단계는 구독형 SaaS(사용자수/생성제안서수 기준)로 반복매출 구조 전환',
      '부가매출은 AX Sprint 워크숍/리서치 결합 서비스로 확장',
    ],
    how: [
      '2026년 매출 11억 목표, 2027년 30억 파이프라인 목표를 단계별 매출원과 연결',
      'SI 고객을 SaaS 전환하는 업셀 경로를 계약 갱신 시점에 맞춰 설계',
      'CAC/LTV는 “파트너 채널 리드 vs 직접영업 리드” 2트랙으로 추정',
    ],
    evidence: ['가격 정책표', '매출 시나리오표', '유닛이코노믹스 가정표', '전환 퍼널 정의'],
    devilCheck: '매출 목표만 있고 채널/전환 논리가 없으면 신뢰도 하락. 세일즈 사이클을 월 단위로 써야 함',
  },
  {
    title: '3-2. 성장전략(Scale-up) - 시장 진입 및 사업화 전략',
    what: [
      '초기 채널은 파트너 네트워크(엑스퍼트컨설팅/컨슈머인사이트)와 직접 영업을 병행',
      '공공조달 시장은 나라장터 제안서 PoC로 진입장벽을 낮춘 뒤 확장',
      'KPI는 리드-미팅-PoC-유료전환-레퍼런스 확보 순으로 설계',
    ],
    how: [
      '채널별 획득비용/전환속도/통제력을 비교해 우선순위를 부여',
      '2026년 내 레퍼런스 2~3건을 목표로 산업별 케이스 템플릿을 표준화',
      '확장조건은 “PoC 성과 충족 + 파트너 공동세일즈 가능”으로 정의',
    ],
    evidence: ['채널별 실행 계획표', '영업 퍼널 KPI 시트', 'PoC 결과 리포트', '레퍼런스 확보 계획'],
    devilCheck: '채널을 넓게 깔면 실행력이 약해 보임. 첫 8개월은 “좁고 깊게” 운영해야 함',
  },
  {
    title: '3-3. 성장전략(Scale-up) - 추진 일정 및 자금 운용 계획',
    what: [
      '전체 로드맵은 2026~2028 3개년(진입-확대-지배력 강화)으로 제시',
      '협약기간(2026.5~12)은 월별 산출물과 검증 활동을 1:1로 배치',
      '자금은 정부지원·자기부담 비율과 집행 목적(개발/실증/판로)으로 구분',
    ],
    how: [
      '5월 요건고정 → 6~7월 에이전트 고도화 → 8~9월 PoC/개선 → 10~12월 베타/전환 준비로 전개',
      '사업비 구조는 정부지원 70% 이하·자기부담 30% 이상(현금 10% 이상, 현물 20% 이하) 기준 준수',
      '집행항목별 KPI(개발완료율, 전환율, 리드수, 파일럿수)를 명시',
    ],
    evidence: ['3개년 로드맵', '협약기간 월별 마일스톤', '총사업비 구성표', '예산-KPI 매핑표'],
    devilCheck: '예산이 “개발비/마케팅비” 수준으로만 나뉘면 약함. 반드시 산출물과 KPI를 연결해야 함',
  },
  {
    title: '4-1. 조직구성(Team) - 조직 역량',
    what: [
      '대표(25년), 개발 매니저(12년), 기획/마케팅(12년), 선임 컨설턴트(8년+)의 역할을 명확히 제시',
      '기술/사업/운영 3축 조직으로 협약기간 책임 범위를 구분',
      '협약기간 내 부족역량은 최소 채용 또는 외부 전문인력으로 보완 계획 수립',
    ],
    how: [
      '팀원 프로필은 “직무-핵심성과-현재업무-협약기간 목표” 4열 표로 통일',
      '실행단계별 책임자를 지정해 의사결정 지연 리스크를 축소',
      '채용 계획은 개발 1명/사업개발 1명 범위 내에서 월별 투입 시점을 명시',
    ],
    evidence: ['핵심 인력 경력표', '현재 투입 인력표', '역할별 책임 매트릭스', '채용/활용 일정표'],
    devilCheck: '이력 나열보다 역할 완결성이 중요. “누가 언제 무엇을 끝내는지”가 보여야 함',
  },
  {
    title: '4-2. 조직구성(Team) - 외부 네트워크 활용 계획',
    what: [
      '엑스퍼트컨설팅/컨슈머인사이트 등 파트너와의 채널 연계 전략을 명시',
      'AX Sprint 워크숍 실적을 리드 제너레이션 채널로 재활용',
      '지역기반 사업 취지에 맞춰 지역 파트너와 실증/고용/판로 기여 계획을 제시',
    ],
    how: [
      '파트너별 역할을 “리드발굴/실증공간/공동제안/데이터연계”로 분해',
      '협업 성과를 계약·PoC·레퍼런스 건수로 측정 가능하게 설계',
      '협력일정은 협약 마일스톤(5~12월)에 연결하여 관리',
    ],
    evidence: ['파트너 협의 문서', '공동 PoC 일정안', '미팅 노트', '채널 실행 결과 로그'],
    devilCheck: '파트너 명단만 제시하면 약함. “파트너별 산출물”이 명시되어야 심사에서 강함',
  },
]

const bxEvaluationRadar = [
  { axis: 'Problem', score: 96 },
  { axis: 'Solution', score: 94 },
  { axis: 'Scale-up', score: 92 },
  { axis: 'Team', score: 93 },
]

const bxMilestonePlan = [
  { month: '5월', 개발: 2, 검증: 1, 누적완료율: 12 },
  { month: '6월', 개발: 3, 검증: 1, 누적완료율: 24 },
  { month: '7월', 개발: 3, 검증: 2, 누적완료율: 39 },
  { month: '8월', 개발: 2, 검증: 2, 누적완료율: 53 },
  { month: '9월', 개발: 2, 검증: 3, 누적완료율: 67 },
  { month: '10월', 개발: 2, 검증: 3, 누적완료율: 81 },
  { month: '11월', 개발: 1, 검증: 3, 누적완료율: 91 },
  { month: '12월', 개발: 1, 검증: 2, 누적완료율: 100 },
]

const bxFundingFrame = [
  { item: '정부지원금(총사업비 대비)', value: 70 },
  { item: '자기부담금(총사업비 대비)', value: 30 },
  { item: '자기부담 현금(총사업비 대비)', value: 10 },
  { item: '자기부담 현물(총사업비 대비)', value: 20 },
]

const bxFinalChecklist: BxChecklistItem[] = [
  { item: '양식 변경/삭제 없이 작성', criterion: '양식 표/순서/항목 그대로 유지' },
  { item: '목차 페이지 삭제', criterion: '제출본에서 목차 페이지 삭제 확인' },
  { item: '파란 안내문구 삭제', criterion: '안내문구 제거 후 검정 텍스트로 정리' },
  { item: '개인정보 마스킹 준수', criterion: '이름/생년/학교/직장 유추정보 비식별 처리' },
  { item: '공고 고정값 일치', criterion: '535개사, 최대1억/평균5천만, 협약 2026.5~12 표기 일치' },
  { item: '기업 기본값 일치', criterion: '설립일 2025-08-12 및 지원 자격 문구 전 페이지 동일' },
  { item: '협약기간 산출물 완료기준 명시', criterion: '산출물별 Definition of Done 작성' },
  { item: '예산-KPI 1:1 연결', criterion: '집행항목마다 대응 KPI/성과지표 부착' },
  { item: 'Problem-Solution-Scale-up-Team 논리 일관성', criterion: '서로 모순되는 수치/문구 없음' },
]

const bxSources: SourceDoc[] = [
  {
    title: 'NotebookLM 질의 로그(Session e03b2126, 2026-03-04)',
    org: 'NotebookLM / BX컨설팅 APPLY PROJECT',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: 'Draft AI 문제정의, 3개년 로드맵, 팀/KPI/시장전략 작성 근거',
  },
  {
    title: '2026 창업중심대학 지역기반 (예비)창업기업 사업계획서 양식(별첨1)',
    org: '창업중심대학 운영기관',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '양식 구조, 작성 제한사항(목차 삭제/분량/안내문구 삭제/마스킹) 반영',
  },
  {
    title: '2026 창업중심대학 지역기반 모집공고',
    org: '중소벤처기업부/창업진흥원',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '협약기간(2026.5~12), 평가구조, 신청 및 운영 요건 반영',
  },
  {
    title: '2026 창업중심대학 대학발 모집공고(비교 참고)',
    org: '중소벤처기업부/창업진흥원',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '지원유형별 숫자/일정 차이 검토 및 비교 참고',
  },
  {
    title: 'Draft AI 2026-2028 중장기 로드맵(NotebookLM 응답)',
    org: 'BX컨설팅 내부 전략자료',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '연도별 목표, KPI, BM 전환(SI→SaaS) 및 ESG 계획 반영',
  },
  {
    title: 'Draft AI 2026-2027 통합 경영전략(NotebookLM 응답)',
    org: 'BX컨설팅 내부 전략자료',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '매출 목표(11억/30억), 지식허브(1,000건), 성능목표(95%) 반영',
  },
  {
    title: 'K-Startup 공식 포털',
    org: '중소벤처기업부 / 창업진흥원',
    year: '2026',
    url: 'https://www.k-startup.go.kr/',
    usedFor: '최종 공고 확인 및 제출 채널 검증',
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
        <h1>2026 창업중심대학(지역기반) 사업계획서 작성 가이드 및 실행전략</h1>
        <p>
          본 페이지는 사업계획서 양식 목차를 그대로 반영한 미러형 구조입니다. “무엇을/어떻게/근거”를 각 섹션별로
          지시형으로 배치해, 작성 과정에서 누락 없이 바로 실행할 수 있도록 구성했습니다.
        </p>
        <div className="notice-box">
          고정 수치(협약기간/비율 등)는 본문에 명시했으며, 제출 직전 최종 지원유형 공고와 일치 여부를 반드시 재확인해야
          합니다. {bxNotebookQueryMeta}
        </div>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-head">
            <Rocket size={16} /> 채점 프레임
          </div>
          <strong>Problem → Solution → Scale-up → Team</strong>
          <p>문제의 크기, 해결의 실현성, 수익화 경로, 팀 수행력을 일관되게 증명</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <HandCoins size={16} /> 협약기간
          </div>
          <strong>2026년 5월 ~ 12월 (8개월)</strong>
          <p>월별 1~2개 마일스톤 중심으로 개발+검증 병행 배치</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <TrendingUp size={16} /> 총사업비 구조(창업기업)
          </div>
          <strong>정부지원 70% 이하 / 자기부담 30% 이상</strong>
          <p>자기부담 내 현금 10% 이상, 현물 20% 이하 기준으로 집행 설계</p>
        </article>
        <article className="summary-card">
          <div className="summary-head">
            <Landmark size={16} /> 작성 제한사항
          </div>
          <strong>양식 변경 불가 / 본문 10페이지 이내</strong>
          <p>목차 페이지 삭제, 파란 안내문구 삭제, 개인정보 마스킹 준수</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>작성 전제(심사위원 채점 프레임)</h2>
        </div>
        <div className="premise-grid">
          {bxWritingPremise.map((item) => (
            <article key={item} className="premise-card">
              <CheckCircle2 size={15} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>실행 계획(작성 프로세스 | Step A~D)</h2>
        </div>
        <div className="exec-grid">
          {bxExecutionPlanSteps.map((step) => (
            <article key={step.step} className="exec-card">
              <header>
                <span>{step.step}</span>
                <h3>{step.goal}</h3>
              </header>
              <div className="exec-columns">
                <div>
                  <h4>입력물</h4>
                  <ul>
                    {step.inputs.map((input) => (
                      <li key={input}>{input}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>산출물</h4>
                  <ul>
                    {step.outputs.map((output) => (
                      <li key={output}>{output}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="devil-box">
                <strong>검증 포인트</strong>
                <p>{step.check}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>양식 목차 미러 섹션(무엇을/어떻게/근거/악마의 대변인 체크)</h2>
        </div>
        <div className="mirror-grid">
          {bxFormMirrorSections.map((section) => (
            <article key={section.title} className="mirror-card">
              <h3>{section.title}</h3>
              <div className="mirror-group">
                <h4>무엇을</h4>
                <ul>
                  {section.what.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mirror-group">
                <h4>어떻게</h4>
                <ul>
                  {section.how.map((item) => (
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
                <strong>악마의 대변인 체크</strong>
                <p>{section.devilCheck}</p>
              </div>
            </article>
          ))}
        </div>
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
            <h2>평가항목 대응도(Radar)</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={bxEvaluationRadar}>
                <PolarGrid stroke="#385068" />
                <PolarAngleAxis dataKey="axis" stroke="#a9bed1" fontSize={11} />
                <PolarRadiusAxis domain={[0, 100]} stroke="#6e879c" />
                <Radar name="대응도 점수" dataKey="score" stroke="#65d5ce" fill="#65d5ce" fillOpacity={0.35} />
              </RadarChart>
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

      <section className="panel two-col">
        <div>
          <div className="panel-header">
            <h2>최종 점검 체크리스트(탈락 방지용)</h2>
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
            <h2>의사결정 핵심 메시지</h2>
          </div>
          <div className="decision-box expanded">
            <p>
              1. <strong>양식 적합성:</strong> 양식 구조를 바꾸지 않고 목차별 요구 항목을 정확히 채우는 것이 1순위입니다.
            </p>
            <p>
              2. <strong>수치 중심 작성:</strong> 설명보다 표·숫자·완료기준 중심으로 10페이지 내 압축해야 합니다.
            </p>
            <p>
              3. <strong>협약기간 실행력:</strong> 2026.5~12 내 개발+검증 마일스톤을 월별로 제시해야 신뢰도가 올라갑니다.
            </p>
            <p>
              4. <strong>증빙 기반 주장:</strong> 모든 핵심 문장에 인터뷰/로그/LOI/근거자료를 연결해야 심사 질의에 버틸 수 있습니다.
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
