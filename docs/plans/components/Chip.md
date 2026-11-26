---
kind: component
component: Chip
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=234-2568&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Chip

> 작성: Claude Code, 2026-11-26. 전체 목록 `docs/plans/design-system-airbnb.md` 1단계의 `Chip`(새로 만듦). 사용자 승인 전 구현 파일을 만들지 않는다. `approved` 는 사용자만 정한다.
> 2026-11-26 갱신: 사용자가 채팅에서 "추천안 모두 채택"과 "합친 목록 + 다시 가져오기"를 골라 Q-01~Q-06 답과 색 역할 이름을 반영했다. 사용자가 "Approve revision 1·5 (권장)" 으로 승인했다.

## 1. 요청과 적용 규칙

- 요청한 작업: Figma "Chips" 세트(234:2568)를 Storybook 부품 `Chip` 으로 만드는 계획. 우리 사이트 Home "Stay in Seoul" 의 "Hotels / Motel / Guesthouse / Resort"(한 번에 하나만 선택)가 이 모양이다. 사이트 페이지는 자유 모드 HTML 이며 이 계획에서 고치지 않는다.
- 범위 밖: "Map Chips"(234:2560, State Default/Hover/Pressed/Selected/Viewed/Favorited)는 2단계 `MapChip` 이다. 이 계획에서 읽지도 만들지도 않는다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, 세트 234:2568(변형 5개), 2026-11-26 Figma Desktop MCP 직접 조회(`get_design_context` 1회 + 스크린샷, `get_variable_defs` 1회). 캐시 아님. 보조 근거: `my-website/figma/Home.layers.xml`·`Home.png`(2026-11-25 저장, Home 389:2752 의 Chips 인스턴스 422:10536·422:10540·422:10543·422:10545).
- 대상 코드·토큰 기준 버전: git-demo 작업 폴더 현재 상태(HEAD f3aed50), `src/tokens/tokens.css`(리드가 2026-11-26 Colors·Typography·Elevation 을 다시 가져온 뒤의 상태). 새 색 역할은 리드가 `docs/plans/tokens.md` revision 5 에 모은다.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 234:2568 는 알약 모양 글자 하나짜리 부품. Home 에서 4개를 나란히 두고 "Hotels" 하나만 Select(검은 바탕) 모양(Home.png) | 여러 개 중 하나를 고르는 필터 칩 한 개. 묶음(누가 선택됐는지)은 부모가 관리 | 확정(Q-01·Q-02 추천안 채택) |
| 누를 수 있는 영역 | 칩 전체(40 높이 알약). 안에 아이콘·닫기 버튼 없음 | 칩 전체가 `<button type="button">` 하나 | 확정(Q-02) |
| 클릭/선택/열림 동작 | Select 변형(234:2564)이 지속되는 선택 모양. Hover/Pressed/Focus 는 상호작용 모양 | 누르면 `onClick` 호출. 선택 여부는 `selected` prop(부모가 바꿈) → `aria-pressed` | 확정(Q-02) |
| 키보드·포커스 범위 | Focus 변형(234:2563): 칩 바깥 1px #222 링, 칩과 2px 띄움, 알약 모양 | 칩마다 Tab 으로 포커스, Enter/Space 로 누름. `:focus-visible` 에 링. 선택된 칩에도 같은 링 | 확정(Q-02·Q-04) |
| disabled 동작 | Figma 에 Disabled 변형 없음 | 네이티브 `disabled` 만 전달하고 새 모양은 만들지 않음(스펙 3절 "생략된 상태와 기본 기능") | 확정(Q-02) |

## 3. 기존 부품과 변경 범위

- R05 조사(같은 역할의 기존 부품):
  - `Tag`(`src/components/Tag`): 분류·필터 **라벨**. 누를 수 있는 곳은 × 버튼뿐이고 태그 자체는 `<span>` 이다. 선택 상태 없음 → 역할 다름.
  - `Badge`: 정적인 `<div>` 표시 → 역할 다름.
  - `ContentSwitcher`: 옵션 **묶음 전체**(`role="radiogroup"`, roving tabindex)로, 하나만 고르는 동작은 Home 칩 묶음과 겹친다. 그러나 부품 단위가 묶음이고(칩 한 개가 아님), 모양이 붙어 있는 분할 컨트롤(바깥 테두리 + 선택은 primary 분홍 채움)이며, Figma 원본이 없다 → 칩 하나에 대응하지 않음.
  - `Tile`(selectable = `role="checkbox"` 표면), `Button`(선택 상태 없음), `IconButton`(아이콘 전용) → 역할 다름.
  - 결론: 같은 역할의 기존 부품은 없다. 새 부품 `Chip` 을 만든다(Q-01 추천안 채택).
- 기존 props·stories 에서 확인한 지원 범위: 위 부품 어느 것도 "선택 유지되는 알약 버튼 한 개"를 지원하지 않는다. `aria-pressed` 는 `ListingCard` 하트에서만 쓴다.
- 변경할 파일(승인 후): `src/components/Chip/Chip.tsx`·`Chip.css`·`Chip.stories.tsx`·`index.ts`(새로). 새 색 역할은 토큰 계획 revision 5 승인 뒤 `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens`(이 계획 단계에서는 실행하지 않음).
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품). 페이지(`my-website/pages/HomePage.tsx` 의 `page-Home__chip`)는 자유 모드 HTML 이라 그대로다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (칩 글자) | — | — | 234:2567, 234:2565, 234:2566, 234:2564, 234:2563 | none — 이 부품 안에서 글자로 만든다(Text 부품 variant body/body-sm/title·tone default/secondary 에 SF Pro 14pt Regular 와 선택 시 흰 글자가 없음) | confirmed |

- Confirmed absence of nested instances and evidence: `get_design_context(234:2568)` 응답의 모든 변형이 `div` + 글자(`p`) 뿐이고 인스턴스 표시(`data-name`·`I…;…` id)가 없다. Focus 변형(234:2563)의 링(169:1579)·안쪽 칩(169:1580)도 일반 레이어다. 위 행은 사용자가 "추천안 모두 채택"으로 확정했다(chosen in chat, 2026-11-26).

## 5. Figma 상태·크기 전체 목록

Size 축은 없다(한 가지 크기). 변형 5개를 모두 `get_design_context` 로 읽었다.

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 234:2567 State=Default | design context + 스크린샷 | 기본 | 칩 전체 | 기준: 높이 40, 바탕 #FFFFFF, 테두리 1px #DDDDDD, 모서리 50(알약), 안쪽 여백 좌우 20·위아래 10, 글자 SF Pro 14 Regular #222222(169:1567), 가운데 정렬 | 없음 | 기본 렌더 | 확정 |
| 234:2565 State=Hover | 〃 | 포인터 올림 | 칩 테두리 | 테두리 #DDDDDD → #222222. 크기·바탕·글자 같음 | 없음 | `:hover` | 확정 |
| 234:2566 State=Pressed | 〃 | 누르는 동안 | 칩 상자 전체 | 상자가 0.898배: 53×35.932, 테두리 0.898px #222222, 모서리 44.915, 여백 17.966/8.983. 글자는 14px 그대로(234:2562) | 없음 | `:active` → 테두리 #222 + `transform: scale(0.898)`(글자도 함께 줄어 약 12.6px 로 보임 — Q-03 에서 받아들인 차이), 전환 효과 없음 | 확정(Q-03) |
| 234:2564 State=Select | 〃 + Home.png("Hotels" 선택) | 지속 선택 | 칩 전체 | 바탕 #222222, 테두리 1px #222222, 글자 #FFFFFF(169:1571). 크기 같음 | 없음 | `selected` prop → `aria-pressed="true"`, `.ds-chip--selected` | 확정(Q-02) |
| 234:2563 State=Focus | 〃 | 키보드 포커스 | 칩 + 바깥 링 | 전체 65×46. 링(169:1579) 65×46, 1px #222222, 모서리 500. 안쪽 칩(169:1580) 59×40 을 (3,3)에 두고 바탕 #FFFFFF·**테두리 1px #222222**·모서리 500. 글자 #222222(169:1581) | 없음 | `:focus-visible` → 테두리 #222 + `outline` 1px, 간격 2px. 선택된 칩에도 같은 링(Q-04) | 확정(Q-04) |

- Focus 링이 감싸는 정확한 범위와 근거: 링은 칩 전체(테두리 포함)를 감싼다. 링 프레임 65×46 = 칩 59×40 + 사방 3. MCP 코드는 링을 65×46 상자의 1px 테두리로, 칩을 (3,3)에 둔다 → 링 1px + 빈틈 2px. CSS: `outline: var(--border-width-thin) solid var(--color-focus-ring); outline-offset: calc(var(--spacing) * 0.5)` — 레이아웃을 바꾸지 않는다. Figma 획 정렬에 따른 0.5px 이내 차이는 렌더 대조에서 확인한다.
- 크기: 세트 변형은 "1" 한 글자에 너비 59 고정(`w-[59px]`). Home 인스턴스는 높이 40, 너비 83·78·119·84 로 "글자 폭 + 좌우 20 + 테두리"와 맞는다. Q-06 추천안 채택 → 너비는 글자 폭 + 좌우 20(최소 너비 없음), 높이 40 고정.
- Figma 에 실제로 없는 상태·조합: Disabled, 아이콘이 있는 칩, 크기 변형 — 만들지 않는다. Select+Hover/Pressed/Focus 는 Q-04 로 정함(상태를 따로 적용).
- 미조회/실패/잘린 응답과 필요한 추가 조회: 없음. 5개 변형 모두 코드와 스크린샷을 받았다. Map Chips(234:2560)는 범위 밖이라 읽지 않았다.

### 크기·간격 (Figma 값 → CSS)

| 요소 | Figma 값 | CSS |
|---|---|---|
| 높이 | 40 | `calc(var(--spacing) * 10)` |
| 여백 | 좌우 20, 위아래 10 | `calc(var(--spacing) * 5)`, `calc(var(--spacing) * 2.5)` |
| 모서리 | 50(높이 40 이라 완전한 알약), Focus 500 | `--radius-full`(값 9999px — 모양은 같음) |
| 테두리 | 1 | `--border-width-thin` |
| Focus 링 | 1px, 칩과 2px 띄움 | `outline-width: var(--border-width-thin)`, `outline-offset: calc(var(--spacing) * 0.5)` |
| Pressed 비율 | 0.898(53/59, 35.932/40) | `transform: scale(0.898)`(단위 없는 비율, 토큰 없음) |
| 칩 사이 간격(Home) | 20 | 부품이 아니라 부모 배치 — 이 계획 범위 밖 |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 바탕 · Default/Hover/Pressed/Focus | #FFFFFF α1 / Shade 01 | shade-01 | `surface`(Card surface) | #FFFFFF | 일치(부품 표면 — Q-05 확정) | `bg`(페이지 바탕)·`on-primary`·`on-image`·`control-bg` 도 #FFFFFF 지만 역할이 다르다. `info`·`success`·`warning` 은 자리표시라 쓰지 않는다 |
| 테두리 · Default | #DDDDDD α1 / Neutral 03 | neutral-03 | `border`(Light border) | #DDDDDD | 일치 | — |
| 글자 · Default/Hover/Pressed/Focus | #222222 α1 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| 테두리 · Hover/Pressed/Focus 안쪽 칩 | #222222 α1 / Shade 02 | shade-02 | `border-emphasis`(새 역할) | 토큰 계획 rev 5 적용 뒤 #222222 | 일치 | 합친 목록의 새 역할(리드가 rev 5 에 추가, 승인 대기). `text` 는 값만 같고 글자 역할 |
| Focus 링 | #222222 α1 / Shade 02 | shade-02 | `focus-ring`(새 역할) | rev 5 적용 뒤 #222222 | 일치 | 합친 목록의 새 역할. Tabs 와 공유 |
| 바탕·테두리 · Select | #222222 α1 / Shade 02 | shade-02 | `selected`(새 역할) | rev 5 적용 뒤 #222222 | 일치 | 합친 목록의 새 역할(선택 표시). Tabs 선택 밑줄과 공유. 테두리는 바탕과 같은 역할로 칠한다 |
| 글자 · Select | #FFFFFF α1 / Shade 01 | shade-01 | `on-selected`(새 역할) | rev 5 적용 뒤 #FFFFFF | 일치 | 합친 목록의 새 역할. `on-primary` 는 브랜드색 위 글자 역할이라 다름 |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: 칩은 자기 바탕(#FFFFFF, Select 는 #222222)이 있다. Figma 스크린샷의 회색 바탕과 보라 점선은 세트 프레임 장식이다. Home 에서 칩이 놓인 곳은 흰 페이지(`bg`). Storybook 캔버스는 흰 배경으로 둔다.
- 같은 값의 후보가 여러 개일 때 선택 근거: 값이 같아도 역할(글자/테두리/채움/포커스)이 다르면 고르지 않았다.
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: `border-emphasis`·`focus-ring`·`selected`·`on-selected` 4개(합친 목록의 이름 그대로). 모두 기존 primitive(shade-01·shade-02)를 가리키므로 새 primitive 는 필요 없다. 아직 `tokens.css` 에 없으며 리드가 `docs/plans/tokens.md` revision 5 에 쓴다. 이 계획에서 tokens.md 는 고치지 않는다.
- 글자 토큰(현재 `tokens.css` 에 있음): "Body Copy/14pt Regular"(SF Pro, 14, 400, 자간 0) → `--font-type-body-copy-14pt-regular`, `--text-type-body-copy-14pt-regular`(14px), `--font-weight-type-body-copy-14pt-regular`(400), `--tracking-type-body-copy-14pt-regular`(0px). 줄 높이는 Figma 코드가 `leading-[normal]` 이라 `line-height: normal`(ListingCard 승인 계획과 같은 처리).
- 그림자: 없음(Elevation 토큰을 쓰지 않음).
- 토큰 생성 경로·검증 계획: 토큰 계획 rev 5 승인 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens` → `pnpm ds:guard`(G10·G13).

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 없음 | `get_design_context(234:2568)` 응답에 이미지·SVG asset 이 하나도 없다 | — | — | 5개 변형 모두 | 확인 |

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `children` | 글자 169:1567 등("1"), Home "Hotels" 등 | 필수 / 글자 | 칩 안 가운데 글자 | — | 확정(Q-02) |
| `selected` | Select 234:2564, Home 에서 하나만 선택 | `false` / boolean | true 면 Select 모양 + `aria-pressed="true"`, false 면 `aria-pressed="false"` | 상태만 알림. 바꾸는 것은 부모 | 확정(Q-02) |
| `onClick` | 버튼 역할(R04) | 없음 | 누르면 호출. 부모가 `selected` 를 바꿔 하나만 고르게 함 | Tab 으로 포커스, Enter/Space 로 호출 | 확정(Q-02) |
| `disabled` | Figma 없음 → 스펙 3절 | `false` | 네이티브 `disabled` 전달, 콜백 안 됨. 새 모양 없음 | Tab 에서 빠짐 | 확정(Q-02) |
| 나머지 | `ButtonHTMLAttributes` | `type="button"` 기본 | `className`·`aria-*` 등 전달 | — | 확정(Q-02) |

- 최상위 요소: `<button class="ds-chip [ds-chip--selected]" data-testid="ds-chip">`. Hover/Pressed/Focus 는 prop 이 아니라 CSS 의사 클래스.

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 새 부품인가 기존 부품 수정인가(R05). Tag·Badge 는 선택이 없고, ContentSwitcher 는 하나를 고르는 묶음이지만 칩 한 개가 아니고 모양이 다르며 Figma 원본이 없다 | A. 새 부품 `Chip`(버튼 한 개) **(AI 추천)** / B. ContentSwitcher 에 칩 모양을 더함 / C. Tag 에 선택 기능을 더함 | Q: 새 부품인가? → A: 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. 새 부품 `Chip` | resolved |
| Q-02 | 선택 상태와 접근성 계약 | A. `<button aria-pressed>` 한 개 + `selected`·`onClick`·`disabled`(제어형, 하나만 고르는 것은 부모) **(AI 추천)** / B. `ChipGroup` radiogroup 을 함께 만듦 / C. 비제어 토글 | Q: 선택 계약? → A: 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-03 | Pressed(234:2566) 구현 방법. 상자 값은 0.898배인데 글자만 14px 그대로 | A. `:active` 에서 칩 전체 `transform: scale(0.898)` **(AI 추천)** — 글자도 약 12.6px 로 보임 / B. 상자 값을 Figma 숫자 그대로 / C. 테두리만 #222. 전환 효과는 넣지 않음 | Q: Pressed 방법? → A: 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. scale(0.898) | resolved |
| Q-04 | Figma 에 없는 조합(선택된 칩의 Focus·Hover·Pressed) | A. 상태는 독립: 선택된 칩에도 같은 링, Hover 는 변화 없음, Pressed 는 Q-03 그대로 **(AI 추천)** / B. Figma 에 먼저 그림 | Q: 없는 조합? → A: 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-05 | 색 역할(6절) | A. `surface` 재사용 + 새 역할 `border-emphasis`·`focus-ring`·`selected`·`on-selected` **(AI 추천)** / B. 한 역할로 합침 / C. 사용자가 이름 지정 | Q: 색 역할? → A: 추천안 채택 — 사용자가 "추천안 모두 채택" 선택, 새 색 역할은 "합친 목록 + 다시 가져오기" 선택 (chosen in chat, 2026-11-26) → A. 이름은 합친 목록과 같음 | resolved |
| Q-06 | 칩 너비. 세트 견본은 59 고정, Home 인스턴스는 글자 폭에 맞음 | A. 글자 폭 + 좌우 20(최소 너비 없음) **(AI 추천)** / B. 최소 너비 59 | Q: 칩 너비? → A: 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 234:2567: 흰 바탕, 1px #DDDDDD, 높이 40, 알약, 글자 14 #222. 캔버스 흰색 | Storybook iframe computed style·스크린샷 | |
| 모든 상태·크기 | Hover 테두리 #222 / Pressed scale(0.898) + 테두리 #222 / Select #222 바탕·흰 글자 / Focus 링 1px·2px 간격(선택 칩 포함) | Playwright 실제 포인터 hover·mousedown, 실제 Tab 키, 원본 스크린샷 대조(링 위치 0.5px 이내 차이 기록) | |
| 아이콘과 노출 조건 | 아이콘 없음 | DOM 에 svg 없음 | |
| 클릭·입력·선택 등 기능 | 클릭 → `onClick` 1회, `selected` 에 따라 `aria-pressed` | Storybook play `fn()` + `userEvent.click` + 속성 확인 | |
| disabled / Tab / Focus | Tab 으로 포커스, Enter/Space 로 호출, `disabled` 면 호출 없음·Tab 제외 | play `userEvent.tab`·`keyboard`, disabled 전달 확인(시각 스토리는 만들지 않음) | |
| Nested parts identity | 키트 하위 부품 없음(글자만) | `ai:verify` DOM 확인 | |
| Nested part → composite callback | 해당 없음(하위 부품 없음) | — | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 기존 부품 영향 없음 | `pnpm ai:check Chip`, `pnpm ai:verify Chip`, `pnpm typecheck`, `pnpm ds:guard` | |

필수 명령: `pnpm ai:check Chip`, `pnpm ai:verify Chip`, `pnpm typecheck`, `pnpm ds:guard`. 명령 검사와 시각 원본 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 부품 계획 질문을 어떻게 답할까? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26). Q: 새 색 역할 → A: 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26). Q-01~Q-06 과 Nested parts 행에 반영했다.
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 없음. 토큰 계획 revision 5(새 역할 4개 포함)는 승인·적용됨.
