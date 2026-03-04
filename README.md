# 0chul's lair

NotebookLM 리서치 자산을 기반으로 전략 보고서/제안서 페이지를 제공하는 웹 허브 프로젝트입니다.

## Pages

- 삼화페인트 사옥 자산가치 전략 보고서 (시나리오 A~E)
- BX컨설팅 2026 창업중심대학(지역기반) 사업계획서 작성 가이드 및 실행전략 (양식 미러형)

## Data Sources

- NotebookLM: Seoul Headquarters Annex 1 Expansion and Relocation Strategy
- NotebookLM: 2026 창업중심대학 사업계획서 작성 가이드 및 실행 전략
- Extract files:
  - `notebook-extract.json`
  - `source-links-raw.json`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (GitHub Pages)

```bash
npm run deploy
```

`vite.config.ts` base is set to `./` so it works in local preview and GitHub Pages path environments.
