---
kind: component
component: SleepSection
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-11238&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — SleepSection (Detail "Where you'll sleep" 구역)

> 작성: Claude Code(사이트 재정립 계획 단계 에이전트 D), 2026-11-26. 근거: Card 계획 revision 2 의 Q-24 — 사용자가 "추천안 모두 채택 (권장)"을 골라 "새 구역 부품이 Card `type="sleep"` 을 칸마다 쓴다"로 정했고, 리드가 이 부품을 에이전트 D 에 배정했다(리드 업데이트 2026-11-26). 이 계획에 새 질문은 없다 — 필요한 결정은 이미 받은 답(§9)에서 왔다. 계획 승인은 아직이다. 사용자 승인 전 구현 파일·페이지를 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Detail 페이지 "Where you'll sleep" 구역(`my-website/pages/DetailPage.tsx:470~489`, CSS `DetailPage.css:859~915`·`1279~1282`)을 새 구역 부품 `SleepSection` 으로 만든다. 위 구분선 + 제목 + 침실 카드 줄. 침실 카드는 키트 `Card type="sleep" layout="detail"`(Card 계획 revision 2)을 쓴다. 페이지는 이 부품만 놓는다. 기준 모양은 지금 사이트(git-demo `aa9a593`, 사용자 검수), 1440 화면.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `src/tokens/tokens.css`(semantic 46개)
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3 Detail 화면 812:393 의 Container 812:11238(653×417.44). **Figma 호출 0회** — 구조는 `my-website/figma/Detail.layers.xml` 650~686줄. 캡처 frame 이라 컴포넌트·상태가 없다.
- 측정: Playwright 1.62.1 Chromium 1440×1000, http://127.0.0.1:5175/detail. 스크립트·결과 `<로컬 측정 폴더>/rebuild/D/measure-page.mjs` → `page-measure.json`, `headings.mjs`(제목 순서·줄 넘침), 스크린샷 `page-sleep.png`. 콘솔 오류 0.
- 동작 근거: PRD `my-docs/inbox/website-plan.md` §3 Detail 7번 "title 'Where you'll sleep', 2 photos side by side — 'Bedroom 1' '1 queen bed', 'Bedroom 2' '1 queen bed'". §4 에 이 구역의 동작 항목 없음 → 보여 주기만.
- 사용자 결정(2026-11-26): "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)", "추천안 모두 채택 (권장)", 결정 2 "Figma 스타일 값으로 맞춤" + 결정 3 "지금 크기·자간 유지 (권장)".
- 대상 코드·토큰 기준 버전: git-demo `aa9a593`(작업 트리 변경 없음), 토큰 계획 revision 5(approved).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | Figma 812:11238 = 위 구분선(812:11239) + 제목 "Where you'll sleep"(812:11244) + 침실 2칸 목록(812:11247). 지금 페이지 `<section>` 안 `<h2>` + 카드 2개 | 숙소의 침실을 보여 주는 구역. 카드는 Card(sleep) | 확정 — Card Q-24 A |
| 누를 수 있는 영역 | 지금 페이지: 없음(카드는 `<div>`). Figma 의 카드 frame 이름 "Button"(812:11249·812:11256)은 원본 사이트의 흔적. PRD 동작 없음 | 누를 곳 없음. 버튼·링크를 만들지 않는다 | 확정 — Card revision 2 §12.4(승인 대기) |
| 클릭/선택/열림 동작 | 없음 | 없음 | 확정 |
| 키보드·포커스 범위 | 지금 Tab 순서에 이 구역 요소 없음(측정). 카드 줄은 넘치지 않음(scrollWidth 677 = clientWidth 677) | Tab 에 잡히는 것 없음. 제목은 `<h2>`(페이지 제목 순서 H1 → H2 "Entire home…" → **H2 "Where you'll sleep"** → H2 "Inspiration…" 그대로) | 확정 — §9 |
| disabled 동작 | 없음 | 만들지 않음 | 확정 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트: 없음(`src/components/` 49개 조사). 사용자 결정으로 새로 만든다.
- 쓰는 키트 부품: `Card`(revision 2 승인·구현 뒤) — `type="sleep" layout="detail"` 이 침실 카드 하나(사진 318.69×212·모서리 8, 제목 16/500/20, 설명 14/400/18 `text-secondary`, 높이 270)를 그린다. 이 부품은 카드 모양을 그리지 않는다.
- `Text` 는 쓰지 않는다: Text title(20/500/줄 높이 1.25)은 제목 22/590/26 과 다르다. Card Q-24 에서 "Text revision 먼저"(B)가 아니라 A 가 골라졌으므로 제목은 이 부품 안에서 그린다(ListingDescription Q-04 A 와 같은 기준: 정확히 같을 때만 Text).
- 변경할 파일(승인 뒤 새로 만듦): `src/components/SleepSection/SleepSection.tsx`·`.css`·`.stories.tsx`·`index.ts`, Code Connect `SleepSection.figma.tsx`(G11, Figma URL 812:11238).
- 영향받는 기존 사용처: 없음(새 부품). 페이지 연결은 별도 페이지 단계. 구현 순서: Card revision 2 가 승인·구현된 뒤.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (frame 812:11249 "Button", 812:11256 "Button" — 인스턴스 아님) | — (frame) | — | 812:11238 | `Card { type="sleep", layout="detail", imageSrc, imageAlt, title, description }` — 칸마다 하나 (근거: Card Q-24 A. Card revision 2 승인·구현 뒤 사용) | confirmed |
| — (글자 812:11244 "Where you'll sleep") | — | — | 812:11238 | none — 이 부품 안의 `<h2>`(Text 에 22/590/26 모양 없음) (근거: §3 근거) | confirmed |

- Confirmed absence of nested instances and evidence: `Detail.layers.xml` 650~686줄(812:11238 아래 전부)에 `<instance>` 가 0개다. 이 화면의 인스턴스는 Navigation 812:4703 과 Card 812:8724 뿐이고 이 구역 밖이다.
- 이 부품 CSS 는 `.ds-card*` 를 고르지 않고 Card 에 `className`·`style` 로 모양을 넘기지 않는다. 칸 폭·간격은 `ds-sleep-section__item` 래퍼에 둔다(R05).

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:11238 기본 | layers.xml + 페이지 측정 | 기본 | 구역 전체 | 아래 크기 표 | 없음(카드의 사진은 Card) | 기본 렌더 | 확정 |

- Focus 링이 감싸는 정확한 범위와 근거: 포커스 받는 요소 없음.
- Figma에 실제로 없는 상태·조합: hover·pressed·focus·disabled 전부. 방 3개 이상의 배치(PRD·Figma 모두 2칸) — 만들지 않는다.
- 미조회/실패/잘린 응답과 필요한 추가 조회: 없음.

### 크기·간격 (구역 왼쪽 위 기준, 크기는 지금 페이지 값 — 결정 3)

| 요소 | 지금 페이지(측정) | Figma(layers.xml) | CSS 해석 |
|---|---|---|---|
| 구역 | 653×425(페이지 x 160, 설명 구역 바로 아래) | 812:11238 653×417.44 | 폭 100%(배치는 페이지). 높이는 내용으로 425 |
| 위 구분선 | y 0, 1 #DDDDDD(`border-top`) | 812:11239 653×1 | `border-top: var(--border-width-thin) solid var(--color-border)` |
| 위·아래 안쪽 여백 | 48 / 48 | 812:11240 안 Section y 48, 아래 40(+ 목록 칸 여백 8) | `padding: calc(var(--spacing) * 12) 0` |
| 제목 | y 49, 653×26, `<h2>` 22/590 줄 높이 26 자간 normal #222, 아래 24 | 812:11244 170×26, 제목 칸 50(= 26 + 24) | `--text-type-header-22pt-semibold`(글꼴·크기·굵기·자간), 줄 높이 `calc(var(--spacing) * 6.5)`, 아래 `* 6`, 색 `text`, `margin` 기본값 0 |
| 카드 줄 | y 99, 가로 줄, 간격 16, 아래 안쪽 8. 페이지 CSS 는 `overflow-x: auto`·스크롤바 숨김·오른쪽 −24 이지만 두 칸(653.38)이 677 안에 들어가 넘치지 않는다(측정) | 812:11247 칸 334.66 간격(= 318.66 + 16), 칸 위·아래 8 | `display: flex`, 간격 `* 4`, 아래 `* 2`. 넘침·가로 스크롤·음수 여백은 만들지 않는다 — 1440 에서 화면이 같고, 스크롤 영역이 키보드로 닿지 않는 문제를 만들지 않음 |
| 칸(카드) | 318.69×270, x 0 · 334.69 | 812:11249 318.66×270.44 | `ds-sleep-section__item` 폭 318.7(지금 CSS 값) = `calc(var(--spacing) * 79.675)`, 안에 Card |
| 구역 끝 | 카드 끝(369) + 8 + 48 = 425 | 카드 끝 + 8 + 40 = 417.44 | 지금 페이지 값(425) |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 위 구분선 | #DDDDDD(페이지 CSS, 캡처 원시 색) | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 제목 | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| 카드 안 색 | — | — | Card 가 정함(설명 #6C6C6C → `text-secondary` #717171, 결정 2) | — | — | 이 부품 CSS 는 카드 색을 쓰지 않는다 |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: 구역 바탕은 투명(페이지 흰 바탕). Storybook 캔버스는 흰색.
- 같은 값의 후보가 여러 개일 때 선택 근거: 없음.
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: 새 토큰 없음. 제목 줄 높이 26·칸 폭 318.7 은 Figma 스타일 토큰에 없어 정확한 px 를 `--spacing` 배수로 쓴다(근사 아님).
- 토큰 생성 경로·검증 계획: 기존 토큰만. `pnpm ds:guard`(G10·G13).

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 침실 사진 812:11250·812:11257 | `my-assets/images/detail-bedroom-1.png`·`detail-bedroom-2.png`(720×480, 지금 페이지가 쓰는 파일) | 칸 안 318.69×212 cover — Card 가 그림 | 기본 | — | 확인 — 이 부품은 `imageSrc` 를 Card 에 넘기기만. 부품 코드는 `my-assets` 를 가져오지 않고, 페이지·스토리가 `imageUrl()` 로 넘긴다 |

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `heading` | 812:11244, PRD | "Where you'll sleep" | `<h2>` 제목 | — | 확정 — §9 |
| `rooms` | PRD §3 Detail 7번, Figma 2칸 | `{ imageSrc?: string; imageAlt?: string; title: string; description: string }[]`. 기본 `[{ title: "Bedroom 1", description: "1 queen bed" }, { title: "Bedroom 2", description: "1 queen bed" }]`(사진 없음 → Card 의 자리 색) | 칸마다 `Card type="sleep" layout="detail"` 에 그대로 넘김 | 누를 곳 없음 | 확정 — §9 |
| `ref` / `className` / 나머지 HTML 속성 | 키트 관례 | — | 루트 `<section class="ds-sleep-section" data-testid="ds-sleep-section">`(이름 없는 section — 지금 페이지와 같은 접근성 트리)에 전달. `className` 은 배치용 | — | 확정 — §9 |

페이지가 쓸 모양(승인 뒤 페이지 단계의 참고, 지금 고치지 않음):

```tsx
<SleepSection rooms={[1, 2].map((i) => ({ imageSrc: imageUrl(`detail-bedroom-${i}`), imageAlt: `Bedroom ${i}`, title: `Bedroom ${i}`, description: "1 queen bed" }))} />
```

## 9. Q&A와 사용자 결정

이 계획에서 새로 열린 질문은 없다. 결정은 아래 이미 받은 답에서 왔다.

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Card Q-24 | "Where you'll sleep" 제목·구분선·줄을 누가 그릴지 | **A (추천)** 새 구역 부품이 Card sleep 을 쓴다 / B 페이지가 Text + Card 를 배치(Text revision 먼저) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드가 이 계획을 D 에 배정. B 가 아니므로 제목은 이 부품 안에서 그린다 | resolved |
| Card Q-25 | 침실 사진 alt 가 제목과 같음 | **A (추천)** 지금처럼 `imageAlt="Bedroom N"` / B `""` | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → 페이지가 `imageAlt` 를 넘긴다 | resolved |
| Card Q-18 | 페이지 모양을 담는 방법 | **A (추천)** Card `layout="detail"` | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → 칸마다 `layout="detail"` | resolved |
| 결정 2·3 | Figma 변수가 아닌 값 | "Figma 스타일 값으로 맞춤" + "지금 크기·자간 유지 (권장)" | (chosen in chat, 2026-11-26) → 크기는 지금 값(425, 318.7, 26 …), 색은 기존 역할(`border`·`text`) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | §5 크기 표(653×425: 구분선 y 0, 제목 y 49·26, 카드 y 99 · x 0 / 334.69, 318.69×270), 흰 캔버스, 사진 2장 로드 | Storybook iframe(폭 653, 사진은 스토리에서 `imageUrl`) computed style·DOM 위치를 `page-measure.json` 과 대조, `page-sleep.png` 와 비교 | |
| 모든 상태·크기 | 기본 하나 | 위와 같음 | |
| 아이콘과 노출 조건 | 아이콘 없음, 사진은 Card | DOM | |
| 클릭·입력·선택 등 기능 | 누를 곳 없음 | `play`: `queryByRole("button")`·`("link")` 없음 | |
| disabled / Tab / Focus | Tab 에 잡히는 요소 없음, `<h2>` 제목 | `play` 의 heading role(level 2) 확인 | |
| Nested parts identity | `ds-card` 2개가 루트 안에 렌더(`ds-card--sleep`) | `ai:verify` DOM check; copied markup fails | |
| Nested part → composite callback | 누를 하위 부품 없음 | 해당 없음 | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, `.ds-card*` 선택자 없음 | `pnpm ai:check SleepSection`, `pnpm ai:verify SleepSection`, `pnpm typecheck`, `pnpm ds:guard` | |

필수 명령: `pnpm ai:check SleepSection`, `pnpm ai:verify SleepSection`, `pnpm typecheck`, `pnpm ds:guard`. 명령 검사와 시각 원본 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: §9 의 답(2026-11-26, chosen in chat).
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: Card revision 2(`layout="detail"`)의 승인·구현, 이 계획의 사용자 승인.
