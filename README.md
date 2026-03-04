# 0chul's lair

NotebookLM 리서치 자산을 기반으로 전략 보고서와 사업계획서 페이지를 제공하는 웹 허브 프로젝트입니다.

## Pages

- 삼화페인트 사옥 자산가치 전략 보고서 (시나리오 A~E)
- 2026 창업중심대학(지역기반) 사업계획서 (BX컨설팅 Draft AI)

## Data Sources

- NotebookLM: Seoul Headquarters Annex 1 Expansion and Relocation Strategy
- NotebookLM: BX컨설팅 APPLY PROJECT / 창업중심대학 사업계획서 관련 노트북
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
