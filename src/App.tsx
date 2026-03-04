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
  diagnosis: string[]
  execution: string[]
  metrics: string[]
  evidence: string[]
  riskResponse: string[]
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
    title: '2026 창업중심대학(지역기반) 사업계획서',
    subtitle: 'BX컨설팅 Draft AI 사업계획서 본문(일반현황~조직구성)',
    icon: Rocket,
    bullets: [
      '양식 목차 순서에 맞춘 실사업계획서 문안 탑재',
      '현재 상태·실행 계획·정량 목표를 항목별 보고서 톤으로 명시',
      '협약기간(2026.5~12) 일정/예산/성과 지표를 동일 수치로 연동',
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

const bxNotebookQueryMeta =
  'NotebookLM 질의 세션 e03b2126 (2026-03-04 캡처) + BX v4 사업계획서 업로드본 기반 작성안'

const bxWritingPremise = [
  '본 문안은 BX컨설팅 v4 사업계획서와 NotebookLM 검증 수치를 결합해 확정함.',
  '심사 프레임은 Problem·Solution·Scale-up·Team 연결 논리로 일관되게 구성함.',
  '협약기간(2026.5~12) 기준으로 기존 개발 일정을 재배열해 실현 가능성을 높임.',
  '확정 수치(132건, 예산비율 70:30 준수, 11/30/100억 목표)와 가정 수치를 분리 표기함.',
]

const bxExecutionPlanSteps: BxStepItem[] = [
  {
    step: 'Step A (1일차) 기준값 확정',
    goal: '공고값·기업값·평가축을 단일 기준으로 확정함',
    inputs: [
      '지원규모 535개사, 자금 최대 1억/평균 5천만, 협약 2026.5~12',
      '설립일 2025-08-12, 법인사업자, 서울 송파 본사, 신청주체 기본정보',
      '평가축 Problem/Solution/Scale-up/Team',
    ],
    outputs: ['요건 체크시트', '일반현황 표 원본', '사업개요 요약문'],
    check: '수치·날짜·자격 문구가 본문 전 구간에서 동일하게 유지되는지 검증함',
  },
  {
    step: 'Step B (2~3일차) 본문 작성',
    goal: '양식 목차별 본문을 현재상태·실행·목표값으로 작성함',
    inputs: [
      '2025년 제안서 132건 수작업 처리 사례, 기대치 격차 73% vs 37%',
      'Draft AI 5종 에이전트 구조, Self-Critique 루프, MVP 실증 기록',
      '타깃시장 순서: 금융/교육컨설팅 → 공공조달 → 중소·중견 B2B',
    ],
    outputs: ['문제인식/실현가능성 본문', '성장전략 본문', '리스크 대응 문안'],
    check: '모든 핵심 문장에 숫자, 근거, 실행주체 중 2개 이상 포함되는지 확인함',
  },
  {
    step: 'Step C (4일차) 수치 정합화',
    goal: 'BM·KPI·예산·일정 수치를 하나의 체계로 정렬함',
    inputs: [
      '매출 목표 2026년 11억, 2027년 30억, 2028년 100억',
      '작성시간 90% 단축, 지식허브 1,000건+, 성능 95% 고도화 목표',
      '비율 준수 예산안: 정부지원 100백만원, 자기부담 45백만원(현금 20/현물 25), 총 145백만원',
    ],
    outputs: ['사업화/재무 섹션 최종안', 'KPI-예산 매핑표', '차트 수치 동기화본'],
    check: '본문·표·차트의 수치가 1:1로 일치하는지 교차 검증함',
  },
  {
    step: 'Step D (5일차) 제출본 확정',
    goal: '양식 제약을 지킨 최종본으로 패키징함',
    inputs: ['검증 완료 원고', '최종 체크리스트', '출처 인덱스'],
    outputs: ['최종 제출본(본문 10p 이내)', '심사 질의 대응 메모', '내부 실행 리스트'],
    check: '목차/안내문구/마스킹/수치일관성 최종 점검을 완료함',
  },
]

const bxFormMirrorSections: BxSectionItem[] = [
  {
    title: '□ 일반현황',
    diagnosis: [
      '비엑스컨설팅은 2025-08-12 설립된 법인사업자임.',
      '본사 소재지는 서울 송파구이며, 지식서비스/정보통신 분야로 분류함.',
      '창업아이템은 AI 기반 B2B 제안서 자동 생성 SaaS 솔루션 Draft AI임.',
    ],
    execution: [
      '기업 기본정보는 사업자등록증·법인등기 기준값과 동일하게 고정 입력함.',
      '협약 산출물은 Draft AI 솔루션 v1.0, 나라장터 PoC 결과보고서, SI 계약 2~3건으로 정의함.',
      '인력 정보는 직책/역할 중심으로 표기하고 개인식별 정보는 비노출 처리함.',
    ],
    metrics: [
      '협약기간은 2026년 5월~12월(8개월)로 확정함.',
      '비율 준수 예산 예시안은 총사업비 145백만원으로 설계함.',
      '지원분야는 지식서비스, 전문기술분야는 정보통신으로 고정함.',
    ],
    evidence: ['사업자등록증/법인등기', '일반현황 표 원본', '산출물 Definition of Done 표'],
    riskResponse: [
      '기업 고유정보 오기재 리스크는 제출 전 증빙-본문 대조표로 차단함.',
      '산출물 과대기재 리스크는 완료조건(문서/계약/운영증빙) 병기로 통제함.',
    ],
  },
  {
    title: '□ 개요(요약)',
    diagnosis: [
      'Draft AI는 RFP 분석부터 PPTX 초안 생성까지 B2B 제안 핵심 공정을 자동화함.',
      '핵심 문제는 제안 작성의 과다 시간 소모와 품질 편차, 낮은 고객 체감가치임.',
      '해결 전략은 온프레미스 SI 레퍼런스 확보 후 구독형 SaaS로 확장하는 이중 구조임.',
    ],
    execution: [
      '요약문은 문제-해결-실행-수익화-팀 역량 순으로 단문 보고서 형식으로 작성함.',
      '지원금 사용처는 에이전트 고도화, 실증, 초기 계약 전환 중심으로 배치함.',
      '파트너사 연계 계획을 요약단에서 명시해 판로 가능성을 선제 증명함.',
    ],
    metrics: [
      '지원규모 535개사 내외를 기준값으로 사용함.',
      '사업화 자금 최대 1억, 평균 5천만 원을 반영함.',
      '작성시간 90% 단축, 2026년 매출 11억 달성을 핵심 KPI로 설정함.',
    ],
    evidence: ['모집공고 요약', '사업개요 원문(v4)', '요약 KPI 표'],
    riskResponse: [
      '요약-본문 불일치 리스크를 막기 위해 핵심 수치를 단일 데이터셋으로 관리함.',
      '수식어 중심 문장을 배제하고 수치·행동 중심 단문으로 통일함.',
    ],
  },
  {
    title: '1-1. 문제인식(Problem) - 배경 및 필요성',
    diagnosis: [
      '2025년 제안서 132건을 수작업으로 처리해 고급 인력 시간이 과다 투입됨.',
      '제안 품질이 작성자 역량에 의존해 결과물 편차와 리워크 비용이 누적됨.',
      '고객 기대치와 실제 체감 간 격차(73% 기대 vs 37% 체감)가 고착화됨.',
    ],
    execution: [
      '문제 구조를 시간(리드타임), 비용(기회비용), 품질(일관성) 3축으로 재정의함.',
      '수작업·외주·단일생성AI 대안의 한계를 비교해 자동화 우선 영역을 도출함.',
      '내부자료 단절, 검증 루프 부재, 도메인 맥락 반영 부족을 핵심 원인으로 확정함.',
    ],
    metrics: [
      '기준 문제지표는 연간 132건 수작업 처리값으로 고정함.',
      '기대치 격차 지표 73%/37%를 문제 크기 값으로 고정함.',
      '개선 목표는 작성시간 90% 단축으로 설정함.',
    ],
    evidence: ['v4 문제인식 본문', '고객 미팅 로그', '프로세스 분석 메모'],
    riskResponse: [
      '문제 과장 리스크를 막기 위해 내부 실적 수치와 외부 지표를 분리 표기함.',
      '출처 없는 시장주장 문장은 본문 반영 금지 원칙으로 통제함.',
    ],
  },
  {
    title: '1-2. 문제인식(Problem) - 목표시장 현황 분석',
    diagnosis: [
      '1차 타깃은 금융권·교육컨설팅 대형 제안 조직으로 정의함.',
      '2차 타깃은 공공입찰 참여기업과 일반 B2B 제안 조직으로 확장함.',
      '도입 결정요인은 보안성, 도메인 정확도, 제안 리드타임 단축으로 확인됨.',
    ],
    execution: [
      '시장 세분화는 우선 진입군 중심 SAM/SOM 역산 방식으로 산정함.',
      '경쟁구조는 수작업·외주·범용AI·전문 솔루션 4개 군으로 비교함.',
      '초기 영업은 기존 네트워크가 있는 고부가 B2B 고객군에 집중함.',
    ],
    metrics: [
      '2026년 온프레미스 SI 2~3건 수주를 1차 시장 KPI로 설정함.',
      '2027년 유료 고객사 100개 확보 목표를 반영함.',
      '시장 확장 단계는 2026 진입 → 2027 확장 → 2028 스케일업으로 운영함.',
    ],
    evidence: ['시장 세분화 시트', '경쟁 매트릭스', '채널 인터뷰 요약'],
    riskResponse: [
      '타깃 과분산 리스크는 산업별 우선순위와 영업 리소스 상한으로 통제함.',
      '레퍼런스 확보 전 SaaS 대규모 확장 집행을 제한함.',
    ],
  },
  {
    title: '2-1. 실현가능성(Solution) - 개발/개선 준비현황',
    diagnosis: [
      'Draft AI는 핵심 기능 MVP를 구현하고 고객 시나리오 실증을 완료함.',
      '5종 에이전트(RFP 분석/트렌드 리서치/커리큘럼 매칭/조립/품질평가)를 확보함.',
      'RAG 기반 검색-생성 구조와 Human-in-the-Loop UX를 동시 설계함.',
    ],
    execution: [
      '현재 단계는 MVP 검증 완료, 상용 전환 직전 단계로 정의함.',
      '자동차그룹 CES 교육 시나리오 기준으로 기능 정확도와 추천 적합도를 검증함.',
      '검증 산출물은 로그, 피드백, 개선 이력으로 통합 관리함.',
    ],
    metrics: [
      '에이전트 성능 95% 이상 고도화를 목표로 설정함.',
      '지식허브 데이터 1,000건 이상 구조화를 목표로 설정함.',
      '협약기간 내 파일럿 2건과 나라장터 PoC 1건 수행을 목표로 설정함.',
    ],
    evidence: ['MVP 테스트 로그', '실증 시나리오 결과표', '파트너 검토 기록'],
    riskResponse: [
      'MVP 성공을 상용 안정성으로 과대해석하지 않도록 범위를 분리 명시함.',
      '미검증 기능은 차기 고도화 항목으로 별도 분류해 일정 리스크를 차단함.',
    ],
  },
  {
    title: '2-2. 실현가능성(Solution) - 실현 및 고도화 방안',
    diagnosis: [
      '협약기간 내 기능 고도화와 실증 결과 확보를 동시에 달성해야 함.',
      'AI 생성품질은 자기개선 루프와 전문가 검수 병행이 필수 조건임.',
      '데이터 거버넌스와 지식재산 보호 체계를 함께 구축해야 확장 리스크가 낮아짐.',
    ],
    execution: [
      '5~7월에 5종 에이전트와 멀티스텝 UX를 고도화함.',
      '8~9월에 베타 테스트와 Critique-Refine 개선 사이클을 반복 적용함.',
      '10~11월에 나라장터 PoC와 온프레미스 SI 제안 실증을 병행함.',
      '12월에 Draft AI v1.0 결과물과 성과보고서를 확정 제출함.',
    ],
    metrics: [
      '협약 종료 시 Draft AI v1.0 운영본 1식을 제공함.',
      '품질 평가는 요구사항 충족도·논리성·설득력 3축으로 월 단위 관리함.',
      '초기 SI 계약 2~3건 수주를 실현가능성 최종 지표로 설정함.',
    ],
    evidence: ['개발 일정표', 'PoC 운영 기록', '품질 점검표', '기술보호 실행안'],
    riskResponse: [
      '일정지연은 기능 우선순위 재조정으로 즉시 대응함.',
      '품질이슈는 자기개선 루프와 전문가 검수 병행으로 통제함.',
      '보안이슈는 온프레미스 옵션 및 접근권한 통제로 대응함.',
    ],
  },
  {
    title: '3-1. 성장전략(Scale-up) - 비즈니스 모델',
    diagnosis: [
      '초기 고객은 데이터 보안 요구가 높은 대기업군으로 형성됨.',
      '초기 수익모델은 온프레미스 SI, 중기 수익모델은 구독형 SaaS로 구분함.',
      'AI 해커톤/워크숍은 리드 확보와 부가매출 동시 창출 채널로 유효함.',
    ],
    execution: [
      '2026년 온프레미스 SI 프로젝트로 초기 레퍼런스를 확보함.',
      '검증된 기능을 표준화해 2027년 구독형 SaaS 출시로 전환함.',
      'SI 고객 갱신 시 SaaS 업셀과 추가 모듈 판매를 병행함.',
    ],
    metrics: [
      '매출 목표는 2026년 11억, 2027년 30억, 2028년 100억으로 설정함.',
      '2027년 유료 고객사 100개 확보를 사업화 기준으로 설정함.',
      '2026년 온프레미스 SI 2~3건, 2027년 SaaS 본전환을 달성 목표로 설정함.',
    ],
    evidence: ['매출 목표표', '전환 퍼널 정의서', '채널별 영업 실적 데이터'],
    riskResponse: [
      'SI 의존 장기화 리스크는 SaaS 전환 KPI로 통제함.',
      '가격 저항 리스크는 단계형 요금제와 파일럿 할인으로 대응함.',
    ],
  },
  {
    title: '3-2. 성장전략(Scale-up) - 시장 진입 및 사업화 전략',
    diagnosis: [
      '초기 진입은 기존 B2B 네트워크를 활용한 파트너 동반 영업이 가장 빠름.',
      '공공조달 시장은 나라장터 양식/요건 대응 기능이 선행되어야 진입 가능함.',
      '리드-전환 퍼널을 월 단위로 운영하지 않으면 수주 속도 확보가 어려움.',
    ],
    execution: [
      '엑스퍼트컨설팅을 퍼스트 커스터머로 지정해 실사용 검증을 수행함.',
      '컨슈머인사이트 데이터 연계를 통해 프리미엄 제안 근거를 강화함.',
      'AI 해커톤/워크숍을 리드 확보 채널로 운영해 SI 파이프라인으로 전환함.',
    ],
    metrics: [
      '2026년 SI 2~3건 + 나라장터 PoC 1건 확보를 1차 사업화 목표로 설정함.',
      '2027년 유료 고객사 100개 확보와 유지율 개선을 목표로 설정함.',
      '작성시간 90% 단축 KPI를 영업 제안 가치지표로 표준 적용함.',
    ],
    evidence: ['채널 실행표', '퍼널 KPI 리포트', 'PoC 결과 보고서'],
    riskResponse: [
      '채널 과분산 리스크는 파트너 2개사 우선 집중 정책으로 통제함.',
      '전환 지연 리스크는 PoC 범위 축소와 의사결정자 동시 미팅으로 대응함.',
    ],
  },
  {
    title: '3-3. 성장전략(Scale-up) - 추진 일정 및 자금 운용 계획',
    diagnosis: [
      '협약기간 8개월 내 개발·검증·사업화를 병행해야 하는 구조임.',
      '총사업비는 정부지원 70% 이하, 자기부담 30% 이상 기준으로 재설계함.',
      '예산항목과 KPI 연결이 약하면 집행 타당성 심사에서 불리함.',
    ],
    execution: [
      '5월 착수 후 6~7월 핵심개발, 8~9월 베타/해커톤, 10~11월 PoC/SI, 12월 결과정리로 추진함.',
      '인건비, 클라우드/LLM 비용, 기자재, 임대/수수료 항목을 성과 KPI와 직접 연계함.',
      '외주비는 AWS 구축 자문 등 필수범위로 제한하고 산출물 검수기준을 명시함.',
    ],
    metrics: [
      '예시 신청안은 정부지원 100백만원, 자기부담 45백만원(현금 20/현물 25)으로 운영함.',
      '비율은 정부 68.9%, 자기부담 31.1%로 공고 기준을 충족함.',
      '협약 종료 시 솔루션 v1.0, PoC 결과보고서, SI 계약 2~3건 확보를 목표로 설정함.',
    ],
    evidence: ['월별 마일스톤 표', '사업비 구성표', '예산-KPI 매핑표'],
    riskResponse: [
      '집행 지연 리스크는 월 단위 집행률 점검과 항목 재배정으로 통제함.',
      '예산 초과 리스크는 기능 우선순위 조정과 필수비용 우선 집행으로 대응함.',
    ],
  },
  {
    title: '4-1. 조직구성(Team) - 조직 역량',
    diagnosis: [
      '핵심조직은 대표·팀장·선임·주임·개발 매니저 5인 체계로 운영함.',
      '주요 경력은 25년, 12년, 8년+, 1년, 12년으로 역할별 전문성을 확보함.',
      '컨설팅 도메인 역량과 AI 개발 역량을 동일 팀 내에서 결합 운용함.',
    ],
    execution: [
      '대표는 사업총괄/대외협력, 팀장은 기획·마케팅, 개발 매니저는 AI 시스템을 전담함.',
      '선임·주임은 컨설팅/사업수행을 분담해 제안 도메인 품질을 관리함.',
      '필요 시 협약 중후반에 실무형 인력 1명 내외를 탄력 채용함.',
    ],
    metrics: [
      '핵심 업무 오너 지정률 100%를 유지함.',
      '주간 운영회의와 월간 성과리뷰를 고정 운영함.',
      '협약기간 내 핵심역량 공백 0건을 조직 KPI로 관리함.',
    ],
    evidence: ['역할 매트릭스', '인력 투입 계획표', '주간 운영 리포트'],
    riskResponse: [
      '핵심인력 과부하 리스크는 업무 우선순위 조정과 역할 분산으로 대응함.',
      '의사결정 지연 리스크는 주간 의사결정 슬롯 고정으로 대응함.',
    ],
  },
  {
    title: '4-2. 조직구성(Team) - 외부 네트워크 활용 계획',
    diagnosis: [
      '외부 파트너는 퍼스트 커스터머 확보와 데이터 경쟁력 강화의 핵심 축임.',
      '엑스퍼트컨설팅은 실사용 검증과 공동 제안 채널에서 즉시 활용 가능함.',
      '컨슈머인사이트 연계는 정량 리서치 기반 제안서 품질 향상에 직접 기여함.',
    ],
    execution: [
      '엑스퍼트컨설팅과 공동 PoC를 통해 초기 도입사례를 확보함.',
      '컨슈머인사이트 데이터 소스를 통합해 프리미엄 공동 오퍼링을 구성함.',
      '파트너 협업은 분기별 목표와 월간 실행로그로 관리함.',
    ],
    metrics: [
      '파트너 채널 기반 SI 2~3건 수주를 협약기간 핵심 KPI로 관리함.',
      '공동 PoC 1건 이상을 사업화 전환 게이트로 적용함.',
      '협업 시작시점은 2026년 1분기 준비, 협약기간 내 실행으로 연계함.',
    ],
    evidence: ['파트너 협의 문서', '공동 PoC 계획서', '채널 실행 로그'],
    riskResponse: [
      '파트너 의존 리스크는 직접 영업 채널 병행 운영으로 완화함.',
      '협업 지연 리스크는 분기별 공동 KPI와 책임자 지정으로 대응함.',
    ],
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

const bxTargetTrend = [
  { year: '2026', sales: 11, customers: 40, performance: 92 },
  { year: '2027', sales: 30, customers: 100, performance: 95 },
  { year: '2028', sales: 100, customers: 220, performance: 97 },
]

const bxFinalChecklist: BxChecklistItem[] = [
  { item: '양식 변경/삭제 없이 작성', criterion: '양식 표/순서/항목 그대로 유지' },
  { item: '목차 페이지 삭제', criterion: '제출본에서 목차 페이지 삭제 확인' },
  { item: '파란 안내문구 삭제', criterion: '안내문구 제거 후 검정 텍스트로 정리' },
  { item: '개인정보 마스킹 준수', criterion: '이름/생년/학교/직장 유추정보 비식별 처리' },
  { item: '공고 고정값 일치', criterion: '535개사, 최대1억/평균5천만, 협약 2026.5~12 표기 일치' },
  { item: '기업 기본값 일치', criterion: '설립일 2025-08-12 및 지원 자격 문구 전 페이지 동일' },
  { item: '가정 수치 구분 표기', criterion: '불확실 수치는 “가정”으로 명시하고 확정 수치와 분리' },
  { item: '협약기간 산출물 완료기준 명시', criterion: '산출물별 Definition of Done 작성' },
  { item: '예산-KPI 1:1 연결', criterion: '집행항목마다 대응 KPI/성과지표 부착' },
  { item: 'Problem-Solution-Scale-up-Team 논리 일관성', criterion: '서로 모순되는 수치/문구 없음' },
]

const bxSources: SourceDoc[] = [
  {
    title: '2026년도 초기창업패키지(딥테크 특화형) 사업계획서_BX컨설팅_v4 (NotebookLM 업로드본)',
    org: 'BX컨설팅 내부 작성본',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '일반현황, 문제지표(132건, 73/37), 5종 에이전트, 기존 예산 구조 및 팀/파트너 원문 반영',
  },
  {
    title: 'NotebookLM 질의 로그(Session e03b2126, 2026-03-04)',
    org: 'NotebookLM / BX컨설팅 APPLY PROJECT',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: 'v4 원문 정합 검증, 시장진입 전략, 3개년 목표지표(11/30/100) 교차확인',
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
    usedFor: '지원규모 535개사, 최대1억/평균5천만, 협약기간 8개월 반영',
  },
  {
    title: 'Draft AI 2026-2028 중장기 로드맵(NotebookLM 응답)',
    org: 'BX컨설팅 내부 전략자료',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '매출목표 11/30/100억, 2026~2028 연차별 추진계획 반영',
  },
  {
    title: 'Draft AI 2026-2027 통합 경영전략(NotebookLM 응답)',
    org: 'BX컨설팅 내부 전략자료',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '매출 11억/30억, 지식허브 1,000건+, 성능 95% 목표 반영',
  },
  {
    title: '나라장터 공공조달 제안서 PoC 검토(NotebookLM 응답)',
    org: 'BX컨설팅 실증 검토자료',
    year: '2026',
    url: bxNotebookUrl,
    usedFor: '공공조달 진입전략과 PoC 기반 사업화 단계 반영',
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
        <h1>2026 창업중심대학(지역기반) 사업계획서</h1>
        <p>
          본 페이지는 BX컨설팅 Draft AI의 실제 사업계획서 본문입니다. 양식 목차 순서에 맞춰 현재 상태, 실행 계획,
          정량 목표, 근거, 리스크 대응을 항목별 보고서 형식으로 정리했습니다.
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
          <h2>양식 목차별 실사업계획서 본문</h2>
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

      <section className="panel">
        <div className="panel-header">
          <h2>2026~2028 목표지표 추이(Line)</h2>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bxTargetTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3c4f" />
              <XAxis dataKey="year" stroke="#a9bed1" />
              <YAxis yAxisId="left" stroke="#a9bed1" />
              <YAxis yAxisId="right" orientation="right" stroke="#a9bed1" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" name="매출목표(억원)" stroke="#65d5ce" strokeWidth={2.6} />
              <Line yAxisId="left" type="monotone" dataKey="customers" name="유료고객(개사)" stroke="#f4b64b" strokeWidth={2.4} />
              <Line yAxisId="right" type="monotone" dataKey="performance" name="에이전트 성능(%)" stroke="#9bc1ff" strokeWidth={2.4} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="chart-note">
          주: 유료고객(2026/2028), 성능(2026/2028) 수치는 운영 가정이며, 2027년 기준값(유료고객 100개사, 성능 95%)
          과 연동해 설정함.
        </p>
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
              1. <strong>문제정의:</strong> 연간 130건 수작업과 73/37 격차 지표를 기준 문제값으로 확정함.
            </p>
            <p>
              2. <strong>실행경로:</strong> 2026년 SI 레퍼런스 확보 후 2027년 SaaS 전환을 본 전략으로 채택함.
            </p>
            <p>
              3. <strong>재무목표:</strong> 매출 11억(2026) → 30억(2027) → 100억(2028) 목표를 반영함.
            </p>
            <p>
              4. <strong>운영원칙:</strong> 확정 수치와 가정 수치를 분리 표기하고, 근거 문서와 1:1로 연결함.
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
