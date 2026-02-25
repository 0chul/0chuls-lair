# samhwa-asset-strategy

C-level 의사결정용 웹 보고서 프로젝트입니다.  
주제: **삼화페인트 사옥(묘동 7번지/인접 필지) 자산가치 극대화 및 효율 운용 전략**

## Live

- GitHub Pages: https://0chul.github.io/samhwa-asset-strategy/

## 핵심 구현

- 2026~2035 시나리오별 재무 비교 대시보드
- 5개 전략안(A~E) 장단점/Go-NoGo 기준
- 2026년 이후 시장 전망 가중치 차트
- 리스크 민감도 레이더
- 융합전략(D→E) 실행 로드맵
- 차트별 출처 하이퍼링크

## 데이터 출처

- NotebookLM: `Seoul Headquarters Annex 1 Expansion and Relocation Strategy`
- 질의 추출 파일:
  - `notebook-extract.json`
  - `source-links-raw.json`

## 개발

```bash
npm install
npm run dev
```

## 배포

```bash
npm run deploy
```

배포는 `gh-pages` 브랜치 기준이며 `vite.config.ts`의 `base`는 `/samhwa-asset-strategy/`로 설정되어 있습니다.
