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

const bxWritingPremise = [
  'Problem/Solution/Scale-up/Team의 연결 논리가 심사 점수의 핵심입니다.',
  '아이디어 소개보다 문제의 크기와 해결 실현가능성을 수치로 증명해야 합니다.',
  '협약기간 8개월(2026.5~12) 내 완료 가능한 산출물과 검증 계획을 제시해야 합니다.',
  '예산은 항목 나열이 아니라 KPI/산출물과 1:1로 연결되어야 합니다.',
]

const bxExecutionPlanSteps: BxStepItem[] = [
  {
    step: 'Step A (1일차) 자료 수집',
    goal: '심사 대응에 필요한 근거 팩을 빠짐없이 확보',
    inputs: [
      '고객/시장 팩: 타깃 고객 1장, 문제 Top3, 경쟁·대체재 정리',
      '제품/기술 팩: 데모·프로토타입·파일럿 현황, 남은 개발항목',
      '사업화 팩: 과금단위, CAC 가정, 세일즈 사이클, 유통 채널',
      '실행/예산 팩: 월별 마일스톤, 집행 항목 초안',
    ],
    outputs: ['근거 팩 1차본', '증빙 자료 목록(MOU/LOI/인터뷰/로그)'],
    check: '문제-해결-매출-팀을 뒷받침하는 증빙이 최소 1개 이상 연결되어야 함',
  },
  {
    step: 'Step B (2~3일차) 1차 원고 작성',
    goal: '양식 구조를 유지한 상태에서 수치 중심 원고 완성',
    inputs: ['사업계획서 양식 원본', 'Step A 근거 팩'],
    outputs: ['목차별 1차 원고', '표/도식 중심 10페이지 초안'],
    check: '설명 문장 과다를 줄이고 표·숫자·완료기준 문장으로 압축했는지 점검',
  },
  {
    step: 'Step C (4일차) 악마의 대변인 검증',
    goal: '심사 질의(문제의 크기/지불의사/8개월 실행력) 대응력 확보',
    inputs: ['1차 원고', '증빙 팩'],
    outputs: ['취약 문장 수정본', '반박 대응 Q&A 메모'],
    check: '모든 핵심 주장에 증빙 링크 또는 수치가 붙어 있는지 확인',
  },
  {
    step: 'Step D (5일차) 최종 편집/제출',
    goal: '제출 규격 100% 준수 상태로 최종본 확정',
    inputs: ['검증 완료 원고', '양식 작성 규정'],
    outputs: ['제출본 최종 PDF/HWPX', '최종 점검 체크리스트 완료'],
    check: '목차 페이지 삭제, 파란 안내문구 삭제, 개인정보 마스킹을 최종 확인',
  },
]

const bxFormMirrorSections: BxSectionItem[] = [
  {
    title: '□ 일반현황',
    what: [
      '기업/대표/사업자 정보와 창업아이템 정의를 양식 표 기준으로 기재',
      '협약기간 내 산출물을 “무엇을 몇 개, 어떤 수준”까지인지 명시',
    ],
    how: [
      '사업자등록증/등기부와 동일한 표기(기업명, 주소, 대표자 유형 등)',
      '창업아이템명은 “기술+기능+고객혜택” 한 문장으로 고정',
      '팀 구성은 역할-성과-기간 중심으로 기재하고 개인정보는 마스킹',
    ],
    evidence: ['사업자등록증', '법인등기', '역할별 수행 이력', '산출물 정의표(DoD)'],
    devilCheck: '“앱 1개 개발”처럼 추상적 문구는 감점. 기능·검증범위·완료기준을 명확히 작성',
  },
  {
    title: '□ 개요(요약)',
    what: ['아이템 소개, 문제인식, 실현가능성, 성장전략, 조직구성을 1페이지에 요약'],
    how: [
      '한 줄 정의: 타깃/문제/핵심해결',
      '문제 크기 수치 1개 + 협약기간 성과목표 수치 1개 필수 기재',
      'BM(과금 단위/가격)과 첫 6개월 진입채널을 명확히 제시',
    ],
    evidence: ['요약 KPI 2개', '초기 고객 반응 지표', '수익모델 표'],
    devilCheck: '“시장 크다, AI 한다” 같은 일반론 금지. 수치 없는 요약은 경쟁력이 약함',
  },
  {
    title: '1-1. 문제인식(Problem) - 배경 및 필요성',
    what: ['외부적 배경(시장/사회/기술), 내부적 배경(대표 경험), 추진 이력을 제시'],
    how: [
      '외부 배경은 규제/비용상승/인력부족 등 3요인으로 정리',
      '고객 pain을 시간·비용·리스크 축 중 2개 이상 정량화',
      '기존 대안(수작업/외주/엑셀)의 실패 포인트 3개 명시',
    ],
    evidence: ['고객 인터뷰 5~10건', '시장통계 2~3개 출처', '현장 업무흐름 캡처'],
    devilCheck: '“고객이 불편하다”는 문장만으로는 부족. 불편의 규모와 현재 비용을 숫자로 못 박아야 함',
  },
  {
    title: '1-2. 문제인식(Problem) - 목표시장 현황 분석',
    what: ['시장 규모/특성/경쟁강도/전망/고객 요구사항을 정량 중심으로 기술'],
    how: [
      'TAM/SAM/SOM을 수치와 계산식으로 제시',
      '초기 1순위 고객군을 구매속도 기준으로 좁혀 선정',
      '경쟁지도(직접/간접/대체)를 3x3 매트릭스로 작성',
    ],
    evidence: ['시장 규모 산정 근거표', '경쟁 서비스 비교표', 'Must-have/Nice-to-have 목록'],
    devilCheck: '처음 어디서 이길지(초기 3개월 고객군)가 없으면 실행전략 신뢰도가 급락',
  },
  {
    title: '2-1. 실현가능성(Solution) - 개발/개선 준비현황',
    what: ['신청 전 추진경과와 현재 성과(정량/정성)를 제시'],
    how: [
      '현재 단계(아이디어/목업/프로토/베타/유료고객)를 솔직히 표기',
      '이미 확보한 자산(데이터/알고리즘/파트너)을 표로 정리',
      '성과지표 3개 이상(테스트 사용자, 전환율, LOI 등) 명시',
    ],
    evidence: ['데모 화면', '사용 로그', 'LOI/MOU', '반복 사용률 데이터'],
    devilCheck: '“준비 중” 단독 문구는 0점에 가까움. 최소한의 검증 흔적을 제시해야 함',
  },
  {
    title: '2-2. 실현가능성(Solution) - 실현 및 고도화 방안',
    what: ['협약기간 내 개발방안, 사업화 대응, 기술보호 계획을 기술'],
    how: [
      '핵심기능 3~5개를 입력-처리-출력 흐름으로 작성',
      '자체개발/외주 범위를 분리하고 외주 산출물 정의서 작성',
      '기술·일정·규제·데이터·영업 리스크별 Plan B 명시',
      '특허/상표/영업비밀 중 최소 1개 실행계획 포함',
    ],
    evidence: ['기능 명세서', '개발 일정표', '외주 산출물 기준', '기술보호 실행계획'],
    devilCheck: '최종 산출물은 변경이 어려우므로 “완료기준(Definition of Done)”까지 반드시 명시',
  },
  {
    title: '3-1. 성장전략(Scale-up) - 비즈니스 모델',
    what: ['수익모델과 진입 성과/전략을 구조적으로 설명'],
    how: [
      '과금단위(월구독/건당/프로젝트/수수료) 중 주모델 1개 확정',
      '대체재 대비 절감/증대 효과로 가격 정당화',
      'LTV, CAC, 마진, 회수기간 중 2개 이상 수치화(가정 명시)',
    ],
    evidence: ['가격 정책표', '유닛이코노믹스 시트', '초기 고객 지불의사 근거'],
    devilCheck: '세일즈 사이클(주/월)을 쓰지 않으면 수익 실현 가능성 설득이 어려움',
  },
  {
    title: '3-2. 성장전략(Scale-up) - 시장 진입 및 사업화 전략',
    what: ['초기 채널, KPI, 확장조건을 협약기간 성과 중심으로 제시'],
    how: [
      '초기 채널은 1~2개만 선택하고 선택 이유(비용/속도/통제)를 설명',
      'B2B 기준 KPI를 리드-미팅-파일럿-유료전환-재계약으로 설계',
      '확장 조건(예: 파일럿 2건 + NPS 30 이상)을 명시',
    ],
    evidence: ['채널 실행 계획표', '월별 KPI 목표치', '파일럿 확장 조건 정의'],
    devilCheck: '채널을 많이 나열하면 실행력이 낮아 보임. 적은 채널을 깊게 설계해야 함',
  },
  {
    title: '3-3. 성장전략(Scale-up) - 추진 일정 및 자금 운용 계획',
    what: ['전체 로드맵, 협약기간 목표, 자금 필요성/조달/집행을 정리'],
    how: [
      '전체 단계는 18~24개월 로드맵으로 게이트 조건과 함께 제시',
      '협약기간(2026.5~12)은 월별 1~2개 마일스톤만 설정',
      '개발 마일스톤과 검증 마일스톤을 항상 짝으로 배치',
      '정부지원/자기부담(현금/현물) 비율을 수치로 명시',
    ],
    evidence: ['월별 마일스톤 표', '총사업비 구성표', '집행항목-KPI 연결표', '조달 계획'],
    devilCheck: '예산이 산출물/KPI와 연결되지 않으면 “근거 없는 비용”으로 판단될 가능성이 큼',
  },
  {
    title: '4-1. 조직구성(Team) - 조직 역량',
    what: ['대표/팀 역량, 보유자원, 협약기간 내 인력 활용계획을 제시'],
    how: [
      '대표 역량은 도메인/기술/사업화 3축으로 압축',
      '팀원은 직무-성과-기간-담당업무 포맷으로 통일',
      '채용은 1~2명 범위로 현실적으로 설정하고 투입 시점 명시',
    ],
    evidence: ['핵심 인력 이력', '보유 장비/공간/데이터 표', '채용 및 투입 일정표'],
    devilCheck: '화려한 이력보다 “협약기간 내 실제 수행 가능성”이 높은 역할 배치가 중요',
  },
  {
    title: '4-2. 조직구성(Team) - 외부 네트워크 활용 계획',
    what: ['개발/실증/유통/지역 연계를 위한 외부 네트워크 활용 방안을 제시'],
    how: [
      '파트너별 필요 이유를 개발·실증·판로 기준으로 명확화',
      '협업 결과를 산출물 중심(테스트베드, 공동 PoC, 데이터 제공)으로 작성',
      '협력 일정과 기대성과를 마일스톤과 연결',
    ],
    evidence: ['LOI/MOU', '파트너 미팅노트', '공동 실증 일정안'],
    devilCheck: '네트워크는 “관계”보다 “성과 산출”이 핵심. 증빙 없는 협업 문구는 설득력이 낮음',
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
  { item: '협약기간 산출물 완료기준 명시', criterion: '산출물별 Definition of Done 작성' },
  { item: '예산-KPI 1:1 연결', criterion: '집행항목마다 대응 KPI/성과지표 부착' },
  { item: 'Problem-Solution-Scale-up-Team 논리 일관성', criterion: '서로 모순되는 수치/문구 없음' },
]

const bxSources: SourceDoc[] = [
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
          합니다.
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
