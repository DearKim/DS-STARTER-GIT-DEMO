---
kind: component
component: ListingDescription
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-11223&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — ListingDescription (Detail 숙소 설명 구역)

> 작성: Claude Code(사이트 재정립 계획 단계 에이전트 D), 2026-11-26. 근거: 리드 브리프와 사용자 결정 "구역도 부품으로 (권장)"·"페이지 모양 유지 (권장)". Q-01~Q-06 은 사용자가 "추천안 모두 채택 (권장)"과 결정 2~4(리드 업데이트 2026-11-26)로 답했다. 계획 승인은 아직이다. 사용자 승인 전 구현 파일·페이지를 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Detail 페이지 "description" 구역(`my-website/pages/DetailPage.tsx:438~468`, CSS `DetailPage.css:796~857`·`1207~1210`·`1279~1282`)을 새 구역 부품 `ListingDescription` 으로 만든다. 페이지는 이 부품만 놓는다. 기준 모양은 지금 사이트(git-demo `aa9a593`, 사용자 검수), 1440 화면에서 위치·크기·색·글자가 같아야 한다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `src/tokens/tokens.css`(semantic 46개)
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3 Detail 화면 812:393 안의 두 형제 Container — 812:11223(번역 안내, 653×83)과 812:11231(설명 글 + Show more, 653×320). `source_url` 은 첫 노드 812:11223. **Figma 호출 0회** — 구조는 `my-website/figma/Detail.layers.xml` 625~649줄. 이 화면은 원본 사이트를 캡처한 frame 이라 컴포넌트·상태가 없다.
- 측정: Playwright 1.62.1 Chromium 1440×1000, http://127.0.0.1:5175/detail. 스크립트·결과 `<로컬 측정 폴더>/rebuild/D/measure-page.mjs` → `page-measure.json`, 스크린샷 `page-description.png`. 콘솔 오류 0.
- 동작 근거: PRD `my-docs/inbox/website-plan.md` §4 Detail — "Description, 'Show original' and 'Show more': nothing, just shows them". 문구는 §3 Detail 6번.
- 사용자 결정(2026-11-26, 리드 업데이트): 결정 2 "Figma 스타일 값으로 맞춤" + 결정 3 "지금 크기·자간 유지 (권장)"(크기·자간은 지금 값, 색·그림자·굵기 600 만 Figma 값), 결정 4 "Button 에 공용 모양 추가 (권장)"(회색 버튼 = `Button variant="ghost"`, 밑줄 글자 버튼 = `Button variant="text"`, Buttons revision 2 — 에이전트 F).
- 대상 코드·토큰 기준 버전: git-demo `aa9a593`(작업 트리 변경 없음), 토큰 계획 `docs/plans/tokens.md` revision 5(approved), revision 6 은 리드가 작성 중.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 위 구분선, 회색 번역 안내("Some info has been automatically translated." + "Show original"), 숙소 설명 글(176 높이에서 자름), "Show more" 버튼, 아래 여백 48. Figma 812:11223 + 812:11231 = 403 높이, 페이지 측정도 403 | 숙소 설명을 보여 주는 구역. 상태·변형 없음 | 확정 — Q-01 |
| 누를 수 있는 영역 | 페이지: "Show original" = `<a href="#">`, "Show more" = `<button>`(type 없음, 동작 없음). Figma frame 이름 "Button - Show original", "Link - Show more about this place"(둘 다 인스턴스 아님) | 두 버튼 모두 키트 `Button`(text·ghost)이 그리고 이 부품은 콜백만 넘긴다 | 확정 — Q-02·Q-03(결정 4) |
| 클릭/선택/열림 동작 | PRD: 둘 다 "nothing, just shows them". 측정: 지금 "Show original" 을 누르면 주소가 `/detail#` 로 바뀌고 화면이 맨 위로 튄다(scrollY 2113 → 0) | 이동·펼침 없음. `<button type="button">` 이라 화면이 튀지 않는다. 콜백 prop 만 둔다 | 확정 — Q-02 |
| 키보드·포커스 범위 | 지금 Tab: Reserve → Show original → Show more → Inspiration 탭 | 같은 순서. 포커스 모양은 Button 계약을 따른다 | 확정 — Q-02·Q-03 |
| disabled 동작 | Figma·페이지에 disabled 없음 | disabled 모양·스토리를 만들지 않는다 | 확정 — Q-06 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트: 없음(`src/components/` 49개 조사). 사용자 결정 "구역도 부품으로"에 따라 새로 만든다.
- 쓰는 키트 부품과 지원 범위:
  - `Text`(승인 rev 2): `as="span" variant="body"` 가 안내 문장(16/400/줄 높이 24/#222)과 정확히 같다. 설명 글(줄 높이 22)은 Text 에 없어 이 부품 안에서 그린다(Q-04).
  - `Button`(Buttons revision 2, 에이전트 F — 아직 계획 단계): `variant="ghost"`(회색 둥근 버튼)와 `variant="text"`(밑줄 글자 버튼). 이 부품은 두 버튼을 그리지 않고 Button 을 쓴다(결정 4). 이 부품에 필요한 정확한 모양은 §5 끝.
  - `Link` 는 쓰지 않는다(이동 전용 `<a href>`, PRD 는 이동 없음).
- 변경할 파일(승인 뒤 새로 만듦): `src/components/ListingDescription/ListingDescription.tsx`·`.css`·`.stories.tsx`·`index.ts`, Code Connect `ListingDescription.figma.tsx`(G11, Figma URL 812:11223).
- 영향받는 기존 사용처: 없음(새 부품). 페이지 연결은 별도 페이지 단계. 구현 순서: Buttons revision 2 가 승인·구현된 뒤.

## 4. Nested parts

Figma 에는 인스턴스가 없다(아래). 계획이 쓰는 키트 부품과 이 부품 안에서 그리는 부분을 적는다.

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (글자 812:11228 "Some info has been automatically translated.") | — | — | 812:11223 | `Text { as="span", variant="body" }` (근거: Q-04) | confirmed |
| — (frame 812:11229 "Button - Show original") | — (frame, 인스턴스 아님) | — | 812:11223 | `Button { variant="text", size="large", onClick=onShowOriginalClick }`, 글자 `showOriginalLabel`(Buttons revision 2 §12.7) (근거: Q-02(결정 4). Buttons revision 2 구현 뒤) | confirmed |
| — (글자 812:11233 설명) | — | — | 812:11231 | none — 이 부품 안의 `<p>` 글자(줄 높이 22 를 Text 가 그리지 못함) (근거: Q-04) | confirmed |
| — (frame 812:11236 "Link - Show more about this place") | — (frame, 인스턴스 아님) | — | 812:11231 | `Button { variant="ghost", size="large", onClick=onShowMoreClick }`, 글자 `showMoreLabel`(Buttons revision 2 §12.7) (근거: Q-03(결정 4). Buttons revision 2 구현 뒤) | confirmed |

- Confirmed absence of nested instances and evidence: `Detail.layers.xml` 625~649줄(812:11223·812:11231 아래 전부)에 `<instance>` 가 0개다. 이 화면의 인스턴스는 Navigation 812:4703 과 Card 812:8724 둘뿐이다(그 둘은 이 구역 밖).
- 이 부품 CSS 는 `.ds-text*`·`.ds-button*` 를 고르지 않고, 두 부품에 `className`·`style` 로 모양을 넘기지 않는다. 배치는 `ds-listing-description__*` 래퍼에만 둔다(R05).

## 5. Figma 상태·크기 전체 목록

이 구역은 캡처 frame 이라 Figma 에 변형·상태가 없다. 크기 하나. 버튼의 hover·focus 는 Button(ghost·text)의 계약이다.

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:11223 + 812:11231 기본 653×403 | layers.xml + 페이지 측정 | 기본 | 구역 전체 | 아래 크기 표 | 없음 | 기본 렌더 | 확정 — Q-01 |
| "Show more" hover | 지금 페이지 #E8E8E8 → 결정 2 로 #EBEBEB | `:hover`(Button ghost 안) | Show more | 바탕만 바뀜 | 없음 | Button ghost 의 hover(`control-bg-subtle-hover`) | 확정 — Q-03(결정 2·4) |
| "Show original" hover | 측정: 바뀜 없음 | — | — | 없음 | 없음 | Button text 의 계약 | 확정 — Q-02 |
| 두 버튼 focus | 측정: 브라우저 기본 링 | `:focus-visible` | 각 버튼 | — | 없음 | Button 의 계약 | 확정 — Q-02·Q-03 |

- Focus 링이 감싸는 정확한 범위와 근거: 각 Button 상자(Button 계약). Figma 에 Focus 없음.
- Figma에 실제로 없는 상태·조합: 모든 hover·pressed·focus·disabled, 펼친 설명. 이 부품은 상태를 그리지 않는다.
- 미조회/실패/잘린 응답과 필요한 추가 조회: Figma 설명 글 812:11233 의 전체 문구는 layers.xml 이름이 잘려 있어 모른다(656×1584 = 22 × 72줄). 문구는 PRD·지금 페이지 것을 쓰므로(Q-06) 조회가 필요 없다.

### 크기·간격 (지금 페이지 측정, 구역 왼쪽 위 기준 → CSS 해석)

크기·자간은 지금 값 그대로(결정 3).

| 요소 | 지금 페이지 | Figma(layers.xml) | CSS 해석(이 부품) |
|---|---|---|---|
| 구역 | 653×403, 페이지 x 160 | 812:11223 653×83 + 812:11231 653×320 | 폭 100%(배치는 페이지) |
| 위 구분선 | y 0, 653×1, #DDDDDD | 812:11224 653×1 | `border-top: var(--border-width-thin) solid var(--color-border)` |
| 번역 안내 상자 | 구분선 아래 32(y 33), 653×50, 바탕 #F7F7F7, 모서리 8, 안쪽 16, 가로 줄·세로 가운데, 사이 4 | 812:11226 y 32, 653×50, 글자 칸 16·16 | 위 `calc(var(--spacing) * 8)`, 높이 `* 12.5`, 안쪽 `* 4`, 사이 `* 1`, `--radius-md`, 바탕 `surface-raised` |
| 안내 문장 | x 16, 줄 상자 y 13(24 높이), 16/400 줄 높이 24 #222, 폭 324.83 | 812:11228 325×18 | `Text as="span" variant="body"` |
| "Show original" | 문장 뒤 4(x 344.83), 97×24 | 812:11229 x 334.03(문장 끝에서 9 — 페이지는 4) | `Button variant="text"`(모양은 아래 F 요청) |
| 설명 글 칸 | 안내 아래 32(y 115), 653×176, 넘치면 숨김 | 812:11232 y 32, 653.33×176 | 위 `* 8`, 높이 `* 44`, `overflow: hidden` |
| 설명 글 | 16/400 줄 높이 22 #222, 7줄(빈 줄 2개 포함) = 154 높이라 지금은 잘리지 않음 | 812:11233 656×1584(긴 글을 176 에서 자름) | `--text-type-body-copy-16pt-regular`(글꼴·크기·굵기·자간), 줄 높이 `* 5.5`, `white-space: pre-line`, 색 `text` |
| "Show more" | 글 칸 아래 16(y 307), 132×48 | 812:11236 y 16, 132.22×48, 글자 26·12 80×20 | 위 `* 4`, `Button variant="ghost"`(모양은 아래 F 요청) |
| 아래 여백 | 버튼 아래 48(구역 끝 403) | 812:11231 끝 320 = 272 + 48 | `padding-bottom: calc(var(--spacing) * 12)` |

### Button 에 필요한 정확한 모양 (에이전트 F 에게)

| 버튼 | 변형 | 상자·여백 | 모서리 | 글자 | 색 | 아이콘 | hover / focus |
|---|---|---|---|---|---|---|---|
| "Show more" | `ghost` | 132×48(지금 페이지 고정 크기. 글자 폭 83 기준 안쪽 여백 12 / 24.5 와 같은 상자), 글자 가운데 | 12(`--radius-lg`) | 16px / 500(`--font-weight-medium`) / 줄 높이 24 / 자간 normal | 바탕 #F2F2F2 `control-bg-subtle`, 글자 #222 `text`, 테두리 없음 | 없음 | hover 바탕 #EBEBEB `control-bg-subtle-hover`(결정 2), 손가락 커서, 브라우저 기본 포커스 링 |
| "Show original" | `text` | 97×24, 안쪽 여백 0 | 없음 | 16px / 400(`--text-type-body-copy-16pt-regular`) / 줄 높이 24 / 자간 normal, **쉴 때도 밑줄**(브라우저 기본 밑줄: 두께·위치 auto, skip-ink auto) | 글자·밑줄 #222 `text`, 바탕 없음 | 없음 | hover 변화 없음, 손가락 커서, 브라우저 기본 포커스 링 |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 위 구분선 | #DDDDDD(페이지 CSS, Figma 캡처 원시 색) | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 번역 안내 바탕 | #F7F7F7 | fills-vibrant-use-plus-lighter-darker-quaternary | `surface-raised`("Slightly elevated surface") | #F7F7F7 | 일치 | Q-05: 같은 값 `surface-focus`(Tabs focus 채움)는 역할이 달라 쓰지 않음 |
| 설명 글 | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| 안내 문장 | #222222 | shade-02 | `text`(Text tone default) | #222222 | 일치 | Text 가 그림 |
| "Show more"·"Show original" 색 | #F2F2F2 / #E8E8E8→#EBEBEB / #222222 | — | Button ghost·text 안(`control-bg-subtle`·`control-bg-subtle-hover`·`text`) | — | 결정 2·4 | 이 부품 CSS 는 버튼 색을 쓰지 않는다. 역할은 리드의 토큰 계획 revision 6 |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: 구역 자체 바탕은 투명(페이지 흰 바탕 `bg`). 안내 상자만 이 부품이 바탕을 칠한다. Storybook 캔버스는 페이지와 같은 흰색.
- 같은 값의 후보가 여러 개일 때 선택 근거: #F7F7F7 은 `surface-raised`·`surface-focus` 둘. 안내 상자는 포커스 표시가 아니라 살짝 다른 면이라 `surface-raised`(Q-05).
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: 이 부품이 직접 쓰는 새 토큰은 없다.

글자(크기·자간은 지금 값, 결정 3)

| 요소 | 값 | 토큰 | 대응 |
|---|---|---|---|
| 안내 문장 | 16/400, 줄 높이 24 | Text body(`--text-body-1`·`--font-weight-regular`·`--leading-normal`) | 값 일치(Q-04) |
| 설명 글 | 16/400, 줄 높이 22 | `--text-type-body-copy-16pt-regular` + `calc(var(--spacing) * 5.5)` | 값 일치 |
| 버튼 글자 | 위 F 요청 표 | Button 안 | — |

- 글꼴: 지금 페이지는 `-apple-system, BlinkMacSystemFont, …`, 토큰은 `"SF Pro", var(--font-sans)`·`--font-sans`. 이 Mac 에서 같은 글꼴로 그려진다(Card 측정에서 글자 폭 동일). 다른 환경 차이는 검수 기록.
- 토큰 생성 경로·검증 계획: 이 부품은 기존 토큰만 쓴다. `pnpm ds:guard`(G10·G13).

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 없음 | — | — | — | — | 확인 — 812:11223·812:11231 아래 그림·벡터 없음(layers.xml), 지금 페이지 구역에도 `<img>`·`<svg>` 없음 |

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `noticeText` | 812:11228, PRD | "Some info has been automatically translated." | 회색 상자 안 첫 문장(Text) | — | 확정 — Q-06 |
| `showOriginalLabel` / `onShowOriginalClick` | 812:11229, PRD "nothing" | "Show original" / — | `Button variant="text" size="large"` 의 글자·`onClick`. 이동·스크롤 없음 | Button 이 처리 | 확정 — Q-02·Q-06 |
| `text` | 812:11233, PRD §3 Detail 6번 | 지금 페이지 문구 그대로: "Inbyulgram \| @stay_2572\nThis is' stay 2572 ', located on the way to Anmok Coffee Street.\nWe will try to provide a complete 'rest' for our guests.\n\n\nStay 2572 provides a 40-pyeong space used by the host as a private house.\n(This is for 4 people)" | `\n` 은 줄바꿈(빈 줄 유지). 176 높이를 넘는 부분은 숨김 | — | 확정 — Q-06 |
| `showMoreLabel` / `onShowMoreClick` | 812:11236, PRD "nothing" | "Show more" / — | `Button variant="ghost" size="large"` 의 글자·`onClick`. 글이 펼쳐지지 않음 | Button 이 처리 | 확정 — Q-03·Q-06 |
| `ref` / `className` / 나머지 HTML 속성 | 키트 관례 | — | 루트 `<div class="ds-listing-description" data-testid="ds-listing-description">` 에 전달. `className` 은 배치용 | — | 확정 — Q-06 |
| disabled / 펼치기 상태 | Figma·PRD 근거 없음 | 만들지 않음 | — | — | 확정 — Q-06 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 구역 범위. Figma 812:11223(위 구분선 + 안내) + 812:11231(글 + Show more + 아래 48)을 합치면 지금 페이지 구역과 같은 403 높이 | **A (추천)** 위 구분선부터 아래 여백 48 까지 이 부품이 그린다 / B 구분선과 아래 여백은 페이지 배치로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | "Show original" 의 요소. 지금 `<a href="#">` 는 누르면 주소가 `/detail#` 로 바뀌고 맨 위로 튄다(측정). PRD 는 "nothing" | **A (추천)** `<button type="button">` + `onShowOriginalClick`, 밑줄 글자 모양 / B 일반 밑줄 글자 / C 지금처럼 `<a href="#">` | 결정 4 "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26): 이 부품이 그리지 않고 키트 `Button variant="text"` 를 쓴다(버튼 요소·콜백은 A 와 같음) | resolved |
| Q-03 | "Show more" 를 무엇으로 그릴지. 키트 Button 에 회색 모양이 없었음 | **A (추천)** 이 부품 안의 `<button>` + hover / B 공용 Button 에 회색 variant 를 먼저 더함 / C A 와 같되 hover 없음 | 결정 4 "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26): `Button variant="ghost"`(Buttons revision 2, 에이전트 F). hover 는 결정 2 로 #EBEBEB | resolved |
| Q-04 | 글자를 키트 Text 로 그릴지 | **A (추천)** 안내 문장만 `Text as="span" variant="body"`, 설명 글은 이 부품 안에서 / B 모든 글자를 이 부품 안에서 / C Text 에 줄 높이 22 모양을 먼저 더함 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | 색과 굵기. #F2F2F2·#E8E8E8 은 primitive·역할이 없었음. 안내 바탕 #F7F7F7 은 같은 값 역할이 둘. 굵기 500 | **A (추천)** 새 역할 2개(`control-bg-subtle`·`control-bg-subtle-hover`), 안내 바탕 `surface-raised`, 굵기 `--font-weight-medium` / B 부품마다 따로 / C 안내 바탕도 새 역할 | 결정 2 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26, 리드 매핑표): #F2F2F2 → `control-bg-subtle`(Figma 변수 "Fills - Vibrant/Tertiary"), #E8E8E8 → #EBEBEB `control-bg-subtle-hover`(neutral-02), 굵기 500 → `--font-weight-medium`(= Figma `sds-typography-weight-medium`). 셋 다 Button ghost 안에서 쓴다(결정 4). 안내 바탕은 추천대로 `surface-raised` | resolved |
| Q-06 | 공개 API(§8). 기본 문구는 PRD·지금 페이지, 설명은 문자열 하나 | **A (추천)** §8 표대로 / B 설명을 `children` 으로 / C 설명을 `lines: string[]` 로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

질문은 모두 답을 받았다(`open_questions: 0`). 답에 따라 §2~§8·§10 을 고쳤다.

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | §5 크기 표(653×403: 구분선 0, 안내 33~83, 글 칸 115~291, Show more 307~355), §6 색, 흰 캔버스 | Storybook iframe(폭 653) computed style·DOM 위치를 `page-measure.json` 과 대조, 페이지 스크린샷 `page-description.png` 와 비교 | |
| 모든 상태·크기 | 기본 하나. 버튼 hover 는 Button 계약(Show more #EBEBEB) | Playwright 실제 포인터 | |
| 아이콘과 노출 조건 | 아이콘 없음 | DOM 에 `svg`·`img` 없음 | |
| 클릭·입력·선택 등 기능 | Show original → `onShowOriginalClick` 1회, 주소·스크롤 그대로. Show more → `onShowMoreClick` 1회, 글 높이 176 그대로 | Storybook `play`(`fn()`·`userEvent.click`·호출 확인), Playwright 로 주소·scrollY 확인 | |
| disabled / Tab / Focus | Tab: Show original → Show more | `play` `userEvent.tab`, 실제 키보드 | |
| Nested parts identity | `ds-text` 1개, `ds-button` 2개가 루트 안에 렌더 | `ai:verify` DOM check; copied markup fails | |
| Nested part → composite callback | 각 Button 클릭이 이 부품의 콜백으로 이어짐 | Storybook `play` with `fn()`, `userEvent.click`, and call assertion | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, `.ds-*` 선택자 없음 | `pnpm ai:check ListingDescription`, `pnpm ai:verify ListingDescription`, `pnpm typecheck`, `pnpm ds:guard` | |

필수 명령: `pnpm ai:check ListingDescription`, `pnpm ai:verify ListingDescription`, `pnpm typecheck`, `pnpm ds:guard`. 명령 검사와 시각 원본 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: 사이트 재정립 결정(브리프 원문) — "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)", UX 기준 화면 일치·키보드·접근성·동작 점검(좁은 화면 제외). Q: 열린 질문 → A: "추천안 모두 채택 (권장)" (chosen in chat, 2026-11-26). Q: Figma 에 없는 값 → A: "Figma 스타일 값으로 맞춤" + "지금 크기·자간 유지 (권장)" (chosen in chat). Q: 공용 버튼 → A: "Button 에 공용 모양 추가 (권장)" (chosen in chat).
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: Buttons revision 2(`ghost`·`text`, 에이전트 F)의 승인·구현, 리드의 토큰 계획 revision 6(`control-bg-subtle*` — Button 쪽 의존), 이 계획의 사용자 승인.
