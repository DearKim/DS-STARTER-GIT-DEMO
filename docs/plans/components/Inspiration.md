---
kind: component
component: Inspiration
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-7517&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Inspiration (제목 + 탭 + 여행지 목록 + Show more)

> 작성: Claude Code(에이전트 A), 2026-11-26. 근거: 사용자 요청 "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘"와 같은 날의 결정 "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)"(chosen in chat). 계획 단계이며 사용자 승인 전 구현 파일을 만들지 않는다. 탭 줄 모양은 `docs/plans/components/Tabs.md` revision 2 의 `variant="bar"` 로 그린다.
> 2026-11-26 갱신(리드 전달 `rebuild-update.md`): 사용자가 "추천안 모두 채택 (권장)", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지 (권장)", "Button 에 공용 모양 추가 (권장)"를 골랐다(chosen in chat). Q-01~Q-07 답과 색 매핑(결정 2: #6C6C6C → #717171 `text-secondary`, `surface-subtle` = neutral-01)을 반영했다. 이 부품의 버튼은 Button `ghost`·`text` 모양이 아니다(4절). 리드 확인(같은 날): `get_metadata 389:7354` 결과는 `<frame id="389:7354" name="Container" x="75" y="3" width="12" height="12" />` 이고 자식 노드가 없어, 안쪽 벡터는 `get_design_context`(멈춤) 없이 읽을 수 없다 → 채택된 대체대로 현재 페이지 화살표 path 를 그 12×12 자리에 쓴다(Q-02, 7절). 그래서 `facts_complete: true`. 링크·여행지 이름의 hover 밑줄은 유지(리드 확인: 결정 2 는 hover 색에 대한 것).

## 1. 요청과 적용 규칙

- 요청한 작업: 세 페이지 푸터 위의 "Inspiration for future getaways" 구역을 Storybook 부품 `Inspiration` 으로 만든다. 페이지는 이후 이 부품을 놓기만 한다(페이지 수정은 이 계획 범위 밖).
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`(재생성본, `src/tokens/tokens.css` 와 같음)
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, Home 프레임 389:2752 > "footer area" 424:10741 > **"Container:margin" 389:7517**(1440×359) > Container 389:7203.
  - 구조(`my-website/figma/Home.layers.xml`, 2026-11-25 저장본): "Heading 2" 389:7208(x 48 y 48, 1344×26) > text 389:7209 / Container 389:7211(x 48 y 74, **1416**×237) > Container 389:7212(y 8, 1416×41) > "Tab List" 389:7214(1416×40, "Tab:margin" 8개 폭 67·117·72·98·91·110·177·202, 각 "Tab" 안 글자 x 16 y 11 높이 18) + 막대 389:7240(목록 기준 x 0 y 37, 65×3) + 목록 선 389:7241(y 40, 1416×1) / "Tab Panel" 389:7243(y 49, 1416×188) > "List" 389:7245(y **32**, 1416×156) > "List Item" 18개(229.328×36, 열 간격 237.33, 줄 간격 60): 17개는 "Link"(이름 Text 18 + 종류 Text y 18) + 마지막 1개는 "Button" 389:7351(87×18 = Text 71×18 + Container 389:7354 12×12 at x 75 y 3).
  - 사본: Detail 812:433(같은 파일), Checkout 10613:12104(h1TqwpPwdkZJJK2Hb9qAj7, Q5QD 812:1056 과 같은 디자인). **세 사본 비교:** "footer area" 아래 430줄을 노드 id 만 빼고 비교 → 이름·위치·크기가 모두 같고, 페이지 안의 y(2267 · 2501 · 1134)만 다르다. **인스턴스 0개**("Tab List" 도 Tabs 세트 인스턴스가 아닌 일반 frame).
  - MCP 직접 조회(에이전트 A 몫 2회): `get_design_context 424:10741` 연결 끊김, `get_design_context 389:7203` 300초 응답 없음 — **둘 다 실패**(리드 확인: design-context 가 12×12 노드에서도 멈춤, 더 부르지 않음). 그래서 화살표 asset 389:7354 와 색·글자 변수 연결을 읽지 못했다. 보조 근거로 에이전트 C 의 `get_variable_defs 812:393`(`ListingTitle.md` 1절)과 C 의 Detail 노드 읽기(`ListingOverview.md` 6절: 이 사이트 캡처의 #6c6c6c 는 Figma 원시값)만 인용한다.
- 현재 페이지(참조 모양, git-demo `aa9a593`): `HomePage.tsx` 12(선택 상태)·23–41(여행지)·171–196, `HomePage.css` 385–505·702–731 / `DetailPage.tsx` 7–26·491–531, `DetailPage.css` 917–1039·1288–1307 / `CheckoutPage.tsx` 7–27·240–265, `CheckoutPage.css` 539–661·808–822·866–869.
  - 1440×900 Playwright 측정(2026-11-26, 개발 서버 http://127.0.0.1:5175). 스크립트·결과: scratchpad `rebuild/A/measure.mjs` → `measure.json`, 스크린샷 `Home-inspiration.png`·`Detail-inspiration.png`·`Checkout-inspiration.png`.
  - **세 페이지 비교:** CSS 는 클래스 접두어만 다르고, 다른 값은 구역 위 여백뿐이다 — Home 0, Detail `margin-top: 214px`, Checkout `margin-top: 270px`(페이지 안 배치라 페이지에 남는다). 렌더 측정(구역 기준 위치·크기·글자·색·hover·Tab 순서)은 클래스 이름 말고 차이 0. 탭·여행지 글자 배열도 같다. 콘솔 오류·깨진 그림 0.
- 대상 코드·토큰 기준: git-demo 작업 폴더(`aa9a593`), `src/tokens/tokens.css`(semantic 46개). 새 역할 `surface-subtle` 은 리드가 토큰 계획 revision 6 에 넣는다.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | Figma 389:7203: 제목 + "Tab List" + "Tab Panel"(여행지 List). PRD 3절 Home 5번: "title …, 8 tabs …, a list of 18 places (name and kind of rental), and 'Show more'", Detail 8번·Checkout 5번 "the same as on Home" | 여행 영감 구역. 루트 `<section aria-labelledby>` + `<h2>`. PRD "18 places" 는 PRD 목록(17곳)·Figma(17 + Show more = 18칸)에 맞춰 **17곳 + Show more 칸** | 확정(Q-07) |
| 탭 | PRD 4절: "clicking a tab makes it the chosen one (a line under it). Only one at a time. 'Popular' is chosen at first. The list of places doesn't change". 페이지: `<button type="button" aria-pressed>` 8개 | 키트 `Tabs variant="bar"`(Tabs rev 2). 목록은 탭과 상관없이 같다 | 확정(Q-03) |
| 여행지 17곳 | Figma frame 이름 "Link". 페이지: `<div>` + 손가락 커서 + hover 때 이름 밑줄 — 누를 수 있어 보이지만 Tab 으로 못 가고 역할도 없다. PRD 4절에 동작 없음 | 이동 없는 `<button type="button">` + `onDestinationClick(index)`, 모양 그대로 | 확정(Q-01) |
| Show more | Figma frame 이름 "Button" 389:7351. PRD 4절: "'Show more': nothing, just shows it". 페이지: `<div>`, Tab 불가 | 이동 없는 `<button type="button">` + `onShowMoreClick` | 확정(Q-01) |
| 키보드·포커스 범위 | 페이지: 탭 8개가 하나씩 Tab 멈춤(Enter/Space 선택, 화살표 없음) → 바로 푸터(여행지·Show more 건너뜀). 링은 브라우저 기본 | 탭 줄 Tab 1번 + ←→ 이동·선택(Tabs rev 1 Q-04 방식) → 패널 → 여행지 17 → Show more. 포커스는 키트 `focus-ring` 2px | 확정(Q-01·Q-03) |
| disabled 동작 | Figma·PRD 에 없음 | 만들지 않음 | 확정(Q-07) |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 부품 조사(R05):
  - `Tabs`(rev 1 승인, `line | pill`): 탭 줄 역할이 같지만 모양이 다름 → Tabs revision 2 에서 `variant="bar"` 를 더한다(`Tabs.md`, 에이전트 A). 이 부품은 그 옵션을 공개 API 로만 쓰고 `.ds-tabs*` 를 고치지 않는다.
  - `Text`: title 20/500/1.25 ≠ 제목 22/500/26, body-sm 14/400/1.5 ≠ 여행지 14/500·400 줄 높이 18.
  - `Link`: `<a>` 이동, 14pt 590 → 여행지와 다름. `Button`: rev 1 의 3종도, 사용자 결정 4 로 에이전트 F 가 더하는 `ghost`(#F2F2F2 바탕)·`text`(밑줄 글자)도 여행지(두 줄 글자)·Show more(바탕·밑줄 없는 글자 + 뒤 화살표)와 모양이 다르다. `Icon`: 아래 화살표 없음.
- 새 부품이 필요한 이유: 사용자 결정 "구역도 부품으로" — 세 페이지에 복사된 같은 구역을 한 원본으로 모은다.
- 변경할 파일(승인 후): `src/components/Inspiration/Inspiration.tsx`·`Inspiration.css`·`Inspiration.stories.tsx`·`index.ts`(새로). `Tabs` 파일은 Tabs rev 2 계획으로만 고친다.
- 영향받는 기존 사용처: 없음(새 부품). 페이지 3개가 이후 이 부품으로 바꾸면 `page-*__inspiration*`·`destination*`·`show-more` CSS 와 `destinations` 배열·`inspTab` 상태가 페이지에서 빠진다. Detail·Checkout 의 위 여백(214·270)은 페이지 CSS 에 남는다(페이지 계획 몫).
- 결정 2 로 보이는 변화: 여행지 종류 글자와 안 고른 탭 글자가 #6C6C6C → **#717171**(`text-secondary`)로 조금 옅어진다.

## 4. Nested parts

Figma 389:7517 안에 인스턴스가 없다. 키트 부품 중 `Tabs` 는 인스턴스가 아니지만 가져와 쓰므로 `—` 행으로 적는다.

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — ("Tab List" 389:7214 + 막대 389:7240 + 목록 선 389:7241 + "Tab Panel" 389:7243, 일반 frame) | — (Underline Tabs 229:2214 의 인스턴스 아님) | — | 389:7517 | `Tabs { variant="bar", items=8개 { id, label, content=여행지 목록 }, defaultTab="popular", onTabChange, label="Inspiration for future getaways" }` — Tabs revision 2 승인·구현 뒤 | confirmed |
| — (제목 389:7209, frame "Heading 2") | — | — | 389:7517 | none — Inspiration 안의 `<h2>` 글자(Text 에 22/500/26 없음) | confirmed |
| — (여행지 17개 frame "Link" 389:7247 …) | — | — | 389:7517 | none — Inspiration 안의 `<button type="button">`(이름 + 종류 두 줄, hover 이름 밑줄). Button `ghost`·`text` 와 모양이 다름 | confirmed |
| — (Show more frame "Button" 389:7351) | — | — | 389:7517 | none — Inspiration 안의 `<button type="button">`(글자 + 뒤 화살표, 바탕·밑줄 없음). Button `ghost`·`text` 와 모양이 다름 | confirmed |
| — (화살표 389:7354, 12×12 Container) | — | — | 389:7517 | none — drawn inside this part as `<svg>` JSX(원본은 Q-02, 7절) | confirmed |

- Confirmed absence of nested instances and evidence: `Home.layers.xml` 389:7517 아래 `<instance` 0개, Detail·Checkout 사본 같은 구조(1절).
- 사용자 결정 4(Button 공용 모양): 이 부품의 버튼은 `ghost`·`text` 어느 쪽도 아니므로 Button 을 쓰지 않는다. 정확한 모양은 5절에 적었고 리드·에이전트 F 에게 전달했다.

## 5. Figma 상태·크기 전체 목록

### 상태

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 389:7517 기본(Popular 선택) | layers.xml + 페이지 측정 | 기본 | 구역 전체 | 기준(아래 표) | Show more 화살표 | 기본 렌더 | 확정 |
| 탭 선택 | 페이지 측정(3번째 탭 클릭 → 그 탭만 선택, 막대 이동) | 지속 선택 | 탭 | Tabs `bar` 가 그림 | — | `Tabs` 의 선택 | 확정(Q-03) |
| 여행지 hover | 페이지 CSS + 측정 | 포인터 | 여행지 칸 | 이름에 밑줄, 손가락 커서. Figma 없음(사이트 캡처) — 색이 아니라 결정 2 의 "hover 색 없앰" 대상이 아니며 Q-01 추천안(모양 그대로)으로 유지 | — | `:hover` | 확정(Q-01) |
| Show more hover | 측정 | 포인터 | 칸 | 변화 없음(손가락 커서만) | 그대로 | — | 확정 |
| Focus | 측정: 지금 여행지·Show more 는 포커스 불가 | 키보드 | 각 버튼 상자 | 키트 `focus-ring` 2px 링(버튼 상자 둘레, 크기 변화 없음) | — | `:focus-visible` | 확정(Q-01) |

- Focus 링이 감싸는 정확한 범위와 근거: 원본에 없음 → Q-01 답대로 여행지 칸(229.3×36)·Show more 칸 둘레에 `focus-ring` 2px. 탭 줄 링은 Tabs rev 2 Q-14.
- Figma에 실제로 없는 상태·조합: hover · pressed · focus · disabled. 여행지 hover 밑줄만 유지, 나머지 만들지 않는다.
- 미조회/실패: Figma MCP 2회 실패, 화살표 벡터 389:7354 는 읽을 수 없음 — 대체 path 확정(7절), 색·글꼴 변수 연결 미조회(결정 2·3 으로 값이 정해져 구현은 막지 않음).

### 크기·간격 (구역 왼쪽 위 기준, 세 페이지 같음) — Q-04 A: 현재 사이트 값

| 요소 | 현재 사이트(측정) = 구현 값 | Figma | CSS(토큰) |
|---|---|---|---|
| 구역 | 1440×359, 바탕 #F7F7F7, 안쪽 48, 가로 넘침 숨김 | 389:7517 1440×359 | `padding: calc(var(--spacing) * 12)`, `overflow-x: hidden` |
| 제목 | x 48 y 48, 1344×26, 아래 8 | 389:7208 같음 | `margin-bottom: calc(var(--spacing) * 2)` |
| 탭 줄 | y 82, 높이 40 + 목록 선 1 = 41, 선은 x 48~**1440**(페이지 `margin-right: -48px`) | 389:7212 y 82 h 41, 선 x 48~1464(프레임 1440 에서 잘림) | 탭 줄을 감싼 `ds-inspiration__tabs` 에 `margin-right: calc(var(--spacing) * -12)`. 탭 줄 안 모양은 Tabs `bar` |
| 탭 글자 시작 x | 48 · 129.5 · 250.5 · 322.9 · 422.5 · 515.1 · 627.7 · 810.7 | 48 · 131 · 248 · 320 · 418 · 509 · 619 · 796 | 라벨 사이 32 는 같고 글자 폭(글꼴) 차이로 뒤로 갈수록 최대 14.7 벌어짐 — 글꼴 차이로 기록 |
| 목록 선 → 여행지 목록 | 32(목록 y 155) | Tab Panel y 123, List y +32 | Tabs `bar` 의 패널 위 32 |
| 여행지 목록 | 6열 × 229.3(측정 229.297), 열 사이 8, 줄 사이 24, 높이 156, 폭 1416 → x 1440 에서 잘림 | 칸 229.328, 1416×156 | `grid-template-columns: repeat(6, calc(var(--spacing) * 57.325))`, `gap: calc(var(--spacing) * 6) calc(var(--spacing) * 2)` |
| 여행지 칸 | 229.3×36, 세로 가운데, 넘침 숨김, 버튼 기본 여백·바탕·테두리 없음, 왼쪽 정렬 | "Link" 229.33×36 | `height: calc(var(--spacing) * 9)` |
| 이름 / 종류 | 각 높이 18(y 0 / 18), 한 줄, 넘치면 "…" | Text y 0 / 18 | — |
| Show more 칸 | 6열 3줄(x 1234.5 y 275), 글자는 칸 세로 가운데 → 글자 y 284(Figma 보다 9 아래, 현재 사이트 유지) | "Button" y 275, 87×18 | 칸 높이는 목록 줄 높이(36)를 따름 |
| Show more 글자 + 화살표 | 글자 72.4×18, 사이 4, 화살표 12×12 at 글자 위 +3, 모서리 8(바탕 없음) | Text 71×18, Container x 75 y 3 | `gap: calc(var(--spacing) * 1)`, `calc(var(--spacing) * 3)`, `--radius-md` |
| 구역 높이 합 | 48 + 26 + 8 + 41 + 32 + 156 + 48 = 359 | 359 | — |

### 글자 — 결정 3: 크기·자간은 지금 값 그대로 토큰 식으로, 색은 결정 2

| 요소 | 크기 / 굵기 / 줄 높이 / 자간 / 색 | 토큰 |
|---|---|---|
| 제목 | 22 / 500 / 26 / −0.7 / #222 | 크기 `--text-type-header-22pt-regular`(22px), 굵기 `--font-weight-medium`(500 = Figma 변수 `sds-typography-weight-medium`), 줄 높이 `calc(var(--spacing) * 6.5)`, 자간 `calc(var(--spacing) * -0.175)`, 색 `text` |
| 탭 라벨 | 14 / 500 / 18 / −0.15 / 선택 #222 · 안 됨 #717171 | Tabs `bar` 가 그림 |
| 여행지 이름 | 14 / 500 / 18 / −0.15 / #222, `nowrap` + `ellipsis` | 크기 `--text-type-body-copy-14pt-regular`, 굵기 `--font-weight-medium`, 줄 높이 `calc(var(--spacing) * 4.5)`, 자간 `calc(var(--spacing) * -0.0375)`, 색 `text` |
| 여행지 종류 | 14 / 400 / 18 / −0.15 / **#717171**(지금 #6C6C6C, 결정 2), `nowrap` + `ellipsis` | 굵기 `--font-weight-type-body-copy-14pt-regular`, 색 `text-secondary` |
| Show more | 14 / 500 / 18 / −0.15 / #222 | 여행지 이름과 같음 |
| 글꼴 | 지금 페이지 `-apple-system, BlinkMacSystemFont, "Segoe UI", …` | `--font-type-body-copy-14pt-regular`·`--font-type-header-22pt-regular`("SF Pro", var(--font-sans)) — macOS 화면 대조(10절) |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 구역 바탕 | 페이지 #F7F7F7 α1, 노드 변수 미확인 | neutral-01 | **`surface-subtle`(새 역할, 결정 2 표 — 리드 토큰 계획 rev 6)** | rev 6 적용 뒤 #F7F7F7 | 일치 | Footer 와 공유 |
| 제목 · 여행지 이름 · Show more 글자 · 화살표 | #222222(화살표 stroke #222) | shade-02 | `text` | #222222 | 일치(#F7F7F7 위 14.85:1) | 화살표는 `currentColor` |
| 여행지 종류 글자 | 페이지 #6C6C6C(Figma 원시값, 변수 아님) | neutral-07 | **`text-secondary`**(결정 2: #6C6C6C → #717171) | #717171 | 결정 2 로 값을 바꿈 | 제안했던 `text-supporting` 은 없앰. #F7F7F7 위 4.56:1(토큰 계획 대비 표) |
| 탭 글자·막대·목록 선 | Tabs rev 2 6절 | — | Tabs 가 그림 | — | — | 이 부품 CSS 에 쓰지 않음 |
| 포커스 링(여행지·Show more) | Figma 없음 | shade-02 | `focus-ring` | #222222 | 일치(Q-01) | — |

- 컴포넌트 fill과 Figma 부모 배경: 구역 자신이 #F7F7F7 바탕을 가진다. 페이지 바탕은 흰색. Storybook 은 1440 폭 흰 캔버스.
- 신규 token: `surface-subtle` 하나(Footer 와 공유). 리드 토큰 계획 rev 6 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens` → `pnpm ds:guard`.

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| Show more 화살표 / Figma 389:7354 "Container" 12×12 | **Figma asset 미조회**(design-context 멈춤). 대체(리드 지시, Q-02): 현재 페이지 코드(세 페이지 같음) `<svg viewBox="0 0 12 12">` path `M3 4.5L6 7.5L9 4.5`, fill none. 위치·크기(글자 뒤 4, 위 +3, 12×12)는 Figma 389:7354 와 같음 | 12×12, stroke #222 1.5, round cap·join, 회전 없음 | 늘 | — | 확인 — 채택된 대체(현재 페이지 path)로 확정. Figma 벡터는 읽을 수 없음(아래) |

- 그림 파일(`my-assets/images`)은 쓰지 않는다. 화살표는 키트 규칙대로 `<svg>` JSX + `currentColor` 로 그린다.
- 리드의 `get_metadata 389:7354`(2026-11-26): `<frame id="389:7354" name="Container" x="75" y="3" width="12" height="12" />`, 자식 노드 없음 → 안쪽 벡터는 `get_design_context`(멈춤) 없이 읽을 수 없다. 채택된 대체대로 현재 페이지 path 를 이 12×12 자리(글자 뒤 4, 위 +3)에 그린다. Figma 벡터 모양과의 path 대조는 할 수 없는 항목으로 기록한다.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `heading` | 389:7209 | "Inspiration for future getaways" | `<h2>`, 루트 `aria-labelledby` 와 Tabs `label` 에 씀 | — | 확정(Q-07) |
| `tabs` | 389:7214, PRD | Popular · Arts & culture · Beach · Mountains · Outdoors · Things to do · Travel tips & inspiration · Airbnb-friendly apartments / `{ id, label }[]` | Tabs `items` 로 넘김. 모든 탭의 패널 내용 = 같은 여행지 목록(PRD "list doesn't change"), 숨은 패널은 `hidden` | Tabs 키보드 | 확정(Q-03) |
| `defaultTab` | PRD "Popular is chosen at first" | `"popular"` | 처음 선택 | — | 확정(Q-03) |
| `onTabChange(id)` | Tabs API | 없음 | 선택이 바뀔 때 호출 | 클릭·화살표 | 확정(Q-03) |
| `destinations` | PRD 3절 목록, 389:7245 | 17곳 `{ title, subtitle }[]` | 6열 목록, 마지막 칸에 Show more | — | 확정(Q-07) |
| `onDestinationClick(index)` | PRD 없음 → Q-01 A | 없음 | 누르면 호출, 이동 없음 | Tab · Enter/Space | 확정(Q-01) |
| `showMoreLabel` / `onShowMoreClick()` | 389:7353, PRD "nothing" | "Show more" / 없음 | 누르면 호출만, 목록 변화 없음 | Tab · Enter/Space | 확정(Q-01) |
| 나머지 | — | `HTMLAttributes<HTMLElement>` 전달(배치용) | 최상위 `<section class="ds-inspiration" data-testid="ds-inspiration">` | — | 확정(Q-07) |

- 페이지의 구역 위 여백(Detail 214, Checkout 270)은 페이지 CSS 가 루트에 주는 배치 값이다. 부품 안 `ds-inspiration__*` 클래스는 페이지가 고치지 않는다(P06). 부품은 `.ds-tabs*` 를 고치지 않는다(R05).

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | `[NEEDS CLARIFICATION]` 여행지 17곳은 PRD 에 동작이 없다(`<div>` + 손가락 커서 + hover 밑줄, Tab 불가). Show more 는 PRD "nothing" 인데 `<div>` | **A (추천)** 여행지·Show more 모두 `<button type="button">` + 콜백, 아무 일 없음, 모양 그대로, Tab 가능, 포커스 `focus-ring` 2px / B 여행지는 글자만 / C 실제 링크 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. Button 공용 모양(결정 4)은 이 두 버튼과 모양이 달라 쓰지 않음(4절) | resolved |
| Q-02 | Show more 화살표 원본(Figma 389:7354 asset 미조회, 지금 path 는 페이지 코드에만 있음) | **A (추천)** 구현 전에 Figma 389:7354 를 다시 읽어 대조 / B 지금 페이지 path 를 원본으로 확정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. 그러나 리드 확인으로 `get_design_context` 가 멈춰 A 를 할 수 없어, 리드가 정한 대체(현재 페이지 asset·측정값)를 쓴다: 지금 path 로 구현. Figma 벡터는 `get_metadata` 에 자식이 없어 읽을 수 없음(리드 확인, 7절) | resolved |
| Q-03 | 탭 줄을 키트 `Tabs` 로 바꾸는 영향(Tab 멈춤 8번 → 1번 + ←→, 여행지 목록이 탭 패널 안으로) | **A (추천)** Tabs rev 2 `bar` / B 지금 버튼 8개를 이 부품 안에서 그림 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-04 | 현재 사이트와 Figma 프레임의 차이(Show more 9 아래, 칸 폭 229.3 vs 229.328, 탭 글자 위치는 글꼴 폭) | **A (추천)** 현재 사이트 그대로 / B Figma 값 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-05 | 색 역할: 여행지 종류·안 고른 탭 #6C6C6C, 바탕 #F7F7F7 | A #6C6C6C → 새 역할 `text-supporting` / B 역할 두 개 / C Figma 변수 먼저 | 사용자 결정 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26), 리드 매핑 표 → #6C6C6C 는 #717171 `text-secondary`, #F7F7F7 은 `surface-subtle`(neutral-01) | resolved |
| Q-06 | 글자 값 표현: 굵기 500, 자간 −0.7·−0.15, 줄 높이 26·18, 글꼴 | A 정확한 값을 토큰 식으로 / B 키트 글자 스타일 / C 새 글자 토큰 | 사용자 결정 "지금 크기·자간 유지 (권장)" + "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → 크기·자간·줄 높이는 지금 값을 `calc(var(--spacing) * n)` 으로, 굵기 500 = `--font-weight-medium`, 글꼴 토큰 | resolved |
| Q-07 | 공개 API(8절)와 데이터("18 places" = 17곳 + Show more, 제목 늘 `<h2>`, disabled 없음) | **A (추천)** 8절 그대로 / B 제목 수준을 prop 으로 / C 사용자가 바꿈 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |

답을 받으면 사실·상태·토큰·API 표도 함께 갱신한다. 모든 필요한 질문이 해결된 경우에만 `open_questions: 0`을 기록한다. 화살표는 7절의 채택된 대체로 확정(`facts_complete: true`).

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 5절 위치·크기(현재 사이트), 바탕 #F7F7F7, 높이 359, 1440 폭 흰 캔버스 | Storybook iframe 1440×900 Playwright 측정 → scratchpad `rebuild/A/measure.json` Home 값과 대조, `Home-inspiration.png` 와 나란히 비교 | |
| 색 변화(결정 2) | 여행지 종류·안 고른 탭 글자 rgb(113,113,113) | computed style | |
| 모든 상태 | 여행지 hover 이름 밑줄, Show more hover 변화 없음, 포커스 `focus-ring` 2px | Playwright 실제 포인터 hover, 실제 Tab 키 | |
| 아이콘과 노출 조건 | 화살표 12×12, 글자 뒤 4, 위 +3, stroke #222 1.5 | DOM 크기·위치, 현재 페이지 path 와 대조(7절) | |
| 클릭·선택 기능 | 탭 클릭 → 그 탭만 선택·막대 이동·`onTabChange(id)` 1회, 목록 그대로. 여행지·Show more 클릭 → 콜백 1회, 이동 없음 | Storybook `play`(`fn()` + `userEvent.click`) | |
| Tab / Focus | 탭 줄 Tab 1번 → ←→ 선택 이동 → 패널 → 여행지 17 → Show more, 모든 요소에 보이는 링 | play `userEvent.tab`·`keyboard`, Playwright 키보드 | |
| 접근성 | `<section aria-labelledby>` + `<h2>`, tablist 이름 = 제목, 숨은 패널은 접근성 트리에서 빠짐 | DOM·접근성 트리 확인 | |
| 글꼴 | 토큰 글꼴이 macOS 에서 지금 페이지와 같은 폭(예: "Popular" 49.5) | 글자 상자 폭 측정 대조 | |
| Nested parts identity | `Tabs` 의 `data-testid="ds-tabs"` 가 `ds-inspiration` 안에 렌더 | `ai:verify` DOM 확인(복사한 마크업이면 실패) | |
| Nested part → composite callback | 두 번째 탭 클릭 → `onTabChange("arts-culture")` 1회 | Storybook `play`(`fn()` + `userEvent.click`) | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 콘솔 오류 0, `.ds-tabs*` 를 고치는 CSS 없음 | `pnpm ai:check Inspiration`, `pnpm ai:verify Inspiration`, `pnpm typecheck`, `pnpm ds:guard` | |

필수 명령: `pnpm ai:check Inspiration`, `pnpm ai:verify Inspiration`, `pnpm typecheck`, `pnpm ds:guard`. 명령 검사와 시각 원본 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 열린 질문 → A: "추천안 모두 채택 (권장)"; Q: Figma 변수가 아닌 값 → A: "Figma 스타일 값으로 맞춤"; Q: 글자 크기·자간 → A: "지금 크기·자간 유지 (권장)"; Q: 공용 버튼 → A: "Button 에 공용 모양 추가 (권장)" (모두 chosen in chat, 2026-11-26, 리드 전달). Q-01~Q-07 에 반영했다.
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: Tabs revision 2 승인·구현, 토큰 계획 revision 6(`surface-subtle`, 리드), 사용자 승인("Approve revision 1").
