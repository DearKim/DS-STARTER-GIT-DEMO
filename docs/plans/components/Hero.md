---
kind: component
component: Hero
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=418-8305&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Hero

> 작성: Claude Code(에이전트 B), 2026-11-26. 근거: 사용자 요청 "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘"와 같은 날의 결정 "구역도 부품으로 (권장)"(페이지 구역을 부품으로 만들고 페이지는 부품만 놓는다)·"페이지 모양 유지 (권장)". 이 문서는 계획이다. 사용자 승인 전에는 구현 파일을 만들지 않는다. 페이지(`my-website/pages/*`)는 이 계획에서 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Home 맨 위 아래의 히어로 구역(배경 사진, 제목 "Start Your Trip with Airbnb", 아이콘 탭 5개, 검색 막대)을 Storybook 구역 부품 `Hero`로 만든다. Home 페이지는 나중에 이 부품을 놓기만 한다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09(R05 Nested parts 포함)
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드: Q5QDGE5WoXefOxgm5fziH3, 프레임 418:8305 "Start Your Trip with Airbnb"(Home 389:2752 안). 이 노드는 Figma로 직접 조회하지 않았다(에이전트당 호출 2회를 ServiceTab 원본 확인에 썼고, 그 뒤 Figma Desktop의 `get_design_context`는 응답이 멈춰 쓸 수 없다고 리드가 확인했다). 채택한 대체 근거: 현재 페이지의 측정값·그림(Q-01 A, Q-03 A). 구조는 `my-website/figma/Home.layers.xml`(2026-11-25 저장)과 `Home.png`에서 읽었다.
  - 418:8305 (0,80) 1440×426
    - rounded-rectangle 418:3082 (0,0) 1912×426 — 배경 사진
    - frame `Frame 1` 418:8304 (80,80) 1280×266
      - text 418:3120 (0,0) 1280×48 — 제목
      - frame `Tab group` 418:8303 (0,80) 620×92 — `Service tab` 인스턴스 5개: 418:3155 (0,−1) 60×94, 418:8261 (140,−1) 60×94, 418:8265 (280,−1) 60×94, 418:8269 (420,−1) 60×94, 418:8273 (560,−0.5) 60×93
      - instance `Navigation` 418:8282 (0,204) 1280×62 — 검색 막대
- 현재 페이지 측정(기준 화면): Playwright, http://127.0.0.1:5175/ (커밋 `aa9a593`), 1440×900, DPR 1. 1920 폭도 확인. 스크립트·결과: scratchpad `rebuild/B/measure.mjs`·`measure.json`·`wide.mjs`·`home-top.png`. 콘솔 오류 0, 깨진 그림 0.
- 페이지 코드: `my-website/pages/HomePage.tsx` 96~133행, `HomePage.css` 108~245행·719~726행.
- 동작 근거: `my-docs/inbox/website-plan.md`(PRD) Home 2번 구역과 §4 Home.
- 대상 코드·토큰 기준: 현재 `src/tokens/tokens.css`(semantic 46개).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 418:8305: 배경 사진 위에 제목, 탭 묶음, 검색 막대. PRD Home 2번 | Home 첫 화면 구역. 페이지 제목(`<h1>`)을 담는다 | Q-01 A 채택 |
| 누를 수 있는 영역 | 탭 5개, 검색 칸 4개, 검색 원 1개. 제목·사진은 보여 주기만 | 탭 = `ServiceTab`, 검색 막대 = `Navigation`(펼친 막대). Hero 자신은 누를 곳을 직접 그리지 않는다 | Q-01 A 채택 |
| 클릭/선택/열림 동작 | PRD: 탭은 한 개만 선택, 처음은 "All", 나머지 화면은 그대로. 검색 칸은 입력 가능하고 그 밖에는 아무 일 없음. 검색 원은 보여 주기만 | Hero가 선택된 탭 하나를 기억한다. 입력값·검색 원은 콜백만 넘긴다 | Q-04 A 채택 |
| 키보드·포커스 범위 | 현재 페이지 Tab 순서: 탭 5개 → 입력칸 4개 → 검색 원. 입력칸은 `outline: none`이라 포커스가 보이지 않는다(접근성 문제, Navigation 계획 Q-20 A로 고침) | 같은 순서. 포커스 표시는 각 하위 부품이 맡는다 | 확정(Q-01 A, Navigation Q-20 A) |
| disabled 동작 | Figma·PRD에 없음 | 만들지 않는다 | 확정(Q-01 A) |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 컴포넌트: 없음. `src/components/`에 Hero·Banner 이름의 부품이 없다.
- 하위 부품: `ServiceTab`(새 계획 `docs/plans/components/ServiceTab.md`), `Navigation`(승인 revision 1 → 이 일을 위해 revision 2 계획, `docs/plans/components/Navigation.md`). 두 부품 계획이 승인·구현·검수된 뒤에만 Hero를 구현한다.
- 새 부품이 필요한 이유: 사용자 결정 "구역도 부품으로". 같은 역할의 키트 부품이 없다.
- 변경할 파일(승인 후): `src/components/Hero/Hero.tsx`·`.css`·`.stories.tsx`·`index.ts`(새로). Code Connect `Hero.figma.tsx`는 418:8305가 Figma 컴포넌트가 아니라 일반 프레임이라 만들 대상이 아니다(G11 경고는 리드가 판단).
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품).

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| `Service tab` 418:3155, 418:8261, 418:8265, 418:8269, 418:8273 | `Service tab` 세트 418:3150(get_metadata 389:7765). 인스턴스의 원본은 layers.xml 이름으로만 확인 | Status 값은 읽지 않음. Home.png에서 첫 탭만 선택 모양으로 보임 | 418:8305 | `ServiceTab { label, iconSrc, selected, onClick }` — Figma 세트 `Service tab`의 코드 부품(이번에 새로 계획, ServiceTab.md 승인 필요) | confirmed |
| `Navigation` 418:8282 (1280×62) | `Navigation` 세트 235:2441(layers.xml 이름) | 읽지 않음(Figma `get_design_context` 응답 멈춤). 채택한 해석(Q-01 A): `Type=Expanded Stays Navigation`(234:4360)을 1280×62로 늘린 것. 근거: 칸 4개, 테두리 #D3D3D3, 좌우 여백 6, 칸 여백 14·24, 줄 사이 4, 구분선 25, 검색 원 48이 234:4360 값과 같다(현재 페이지 CSS) | 418:8305 | `Navigation { type="expanded", stretch, editable, onFieldChange, onSearchClick }` — `stretch`·`editable`은 Navigation revision 2의 새 옵션(Q-19 A·Q-20 A) | confirmed |
| —(제목 text 418:3120) | — | — | 418:8305 | none — Hero 안의 `<h1>`. `Text` 부품의 variant(body·body-sm·title, 키트 기본 글꼴 20px 이하)로는 40px/590 흰 글자를 그릴 수 없다(ListingCard와 같은 처리) | confirmed |
| —(배경 사진 418:3082) | — | — | 418:8305 | none — Hero 안의 장식 그림 `<img alt="">`(가운데 자르기, Q-03 A) | confirmed |

- 인스턴스 안의 인스턴스(Service tab 안 `Service Icon`, Navigation 안 칸)는 행을 만들지 않았다.
- Hero CSS는 `.ds-service-tab`·`.ds-navigation`을 선택하지 않는다. 배치는 `ds-hero__*` 래퍼에만 둔다(R05).

## 5. Figma 상태·크기 전체 목록

Hero는 Figma 컴포넌트가 아닌 프레임이라 variant·상태가 없다. 상태는 하위 부품(ServiceTab: 기본/선택/hover, Navigation: 입력·포커스)에 있다.

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 418:8305 (한 가지) | layers.xml + Home.png + 페이지 측정 | 지속: 선택된 탭 하나(처음 "All") | 탭 묶음 | 선택 탭만 ServiceTab `selected` | 탭 그림(ServiceTab) | `defaultService`·`onServiceChange` (Q-04 A) | 확정 |

### 크기·간격 (현재 페이지 측정값 → CSS, Figma 값 비교)

| 요소 | 현재 페이지(기준 후보) | Figma 418:8305 | CSS(페이지 값 기준) |
|---|---|---|---|
| 구역 | `<section>` 1440×426, 위 여백 80, 좌우 80, 아래 60, 최소 높이 426 | 1440×426 | padding `calc(var(--spacing) * 20) calc(var(--spacing) * 20) calc(var(--spacing) * 15)`, min-height `calc(var(--spacing) * 106.5)` |
| 제목 | `<h1>` (80, +80) 1280×47, 40px/590, 줄 높이 normal, 흰색, 아래 32 | (80,+80) 1280×48 | 크기 `calc(var(--spacing) * 10)`(Q-02 A, 사용자 결정 "지금 크기·자간 유지"), 자간 normal 그대로, 글꼴 `--font-type-body-copy-16pt-semibold`, 굵기 `--font-weight-type-body-copy-16pt-semibold`(590), margin-bottom `calc(var(--spacing) * 8)` |
| 탭 묶음 | (80, +159) 높이 98(탭 60×98), 탭 사이 80, 아래 32 | (80,+160) 620×92(인스턴스 94) | flex, gap `calc(var(--spacing) * 20)`, margin-bottom `calc(var(--spacing) * 8)` |
| 검색 막대 | (80, +289) 1280×62 | (80,+284) 1280×62 | 폭 `calc(var(--spacing) * 320)`, 막대 모양은 Navigation |
| 막대 아래 남는 높이 | 75 | 80 | 최소 높이로 생김 |
| 1920 폭 화면 | 사진은 전체 폭, 글은 왼쪽 80에서 시작, 검색 막대 1280 그대로 | — | 현재 페이지와 같게(좁은 화면은 범위 밖) |

- 페이지와 Figma의 세로 위치 차이(검색 막대 +5)는 탭 높이(98 vs 92·94, 글자 줄 높이 24 vs normal)와 제목 높이(47 vs 48)에서 생긴다. ServiceTab Q-01 A와 이 계획 Q-03 A(페이지 모양)로 페이지 값을 쓴다.
- 미조회: 418:8305 자체의 Figma 채움·글자 스타일·사진 자르기 방식. Q-03 A(페이지 모양)로 페이지 값을 채택해 사실 공백이 닫혔다(Figma `get_design_context`는 응답이 멈춰 쓸 수 없음).

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 제목 글자 | 페이지 #FFFFFF(Figma 미조회, 페이지 값 채택) | shade-01 | `on-image` | #FFFFFF | 일치(사진 위 흰 글자) | — |
| 사진 위 어두운 막 | 페이지 `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))`(Figma 미조회, 페이지 값 채택 Q-03 A) | grays-black(#000000, 새로 가져온 Figma 변수) | `image-scrim`(새 역할, 리드가 tokens.md revision 6에 넣음) | revision 6 적용 뒤 #000000 | 일치(사진을 어둡게 하는 막) | 불투명도 0.3은 부품 안에서 막 레이어에 준다(`opacity: 0.3`, `surface-hover`와 같은 방식, 리드 결정). `--color-overlay`(키트 합성 45%)는 쓰지 않는다 |
| 탭·검색 막대의 색 | — | — | ServiceTab·Navigation 계획을 따름 | — | — | Hero CSS는 하위 부품 색을 다루지 않는다 |

- 컴포넌트 fill과 부모 배경: Hero 바탕은 사진이다. Storybook 캔버스는 1440 폭, 여백 없이 렌더해 사진 자르기를 페이지와 같게 확인한다.
- 신규 token: `image-scrim` → grays-black 하나. 리드가 tokens.md revision 6에 넣는다. 사용처는 Hero뿐이다(R08).
- 글자 토큰: 제목 40px에 맞는 `--text-type-*` 스타일이 없다(가장 큰 것이 22pt). Q-02 A와 사용자 결정 "지금 크기·자간 유지"에 따라 크기 `calc(var(--spacing) * 10)`(정확히 40), 굵기 `--font-weight-type-body-copy-16pt-semibold`(590), 글꼴 `--font-type-body-copy-16pt-semibold`, 줄 높이 `normal`, 자간 normal(페이지와 같음).
- Button 공용 모양(ghost·text): Hero에는 해당 버튼이 없다. 쓰지 않는다.

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 배경 사진 418:3082 | `my-assets/images/bg.png`(SHA-1 5b2a2323, PNG 1912×426). Figma 사각형 크기 1912×426과 같다. Figma asset 해시는 미조회 | 페이지: `cover` + 가운데(사진 x 236~1676이 보임). Figma: 사각형이 x 0에서 시작(사진 x 0~1440이 보이는 것으로 해석, Home.png에서 야자수·파라솔이 페이지보다 오른쪽) | 항상 | — | 파일 확인. 자르기는 페이지 모양(가운데, `object-fit: cover`)으로 확정(Q-03 A) |
| 탭 그림 5개 | ServiceTab 계획 §7 | — | — | — | ServiceTab 계획 |
| 검색 원 | Navigation 계획 §7(48 원) | — | — | — | Navigation Q-21 A(Figma 48 원) |

- 사진은 장식이다 → `alt=""`. 그림은 `backgroundSrc`로 받고 페이지·stories가 `imageUrl("bg")`를 넘긴다(Q-05 A).

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `title` | 418:3120, PRD | `"Start Your Trip with Airbnb"` | `<h1>`로 보임 | — | 확정(Q-06 A) |
| `backgroundSrc` | 418:3082 | 필수 문자열. 페이지·stories가 `imageUrl("bg")` | 장식 배경 | — | Q-05 A 채택 |
| `services` | Tab group 418:8303, PRD | `{ value, label, iconSrc }[]`. 페이지는 All·Homes·Hotels·Experience·Services 5개와 `icon-*.png` | `ServiceTab` 5개를 간격 80으로 놓음 | 탭마다 Tab 정지 | Q-05 A 채택 |
| `defaultService` | PRD "All is chosen at first" | 첫 항목의 `value` | 처음 선택 | — | Q-04 A 채택 |
| `onServiceChange` | PRD | `(value) => void` | 다른 탭을 누르면 선택이 옮겨 가고 콜백 1회. 화면의 다른 곳은 바뀌지 않음 | Enter/Space | Q-04 A 채택 |
| `onFieldChange` | PRD "you can type in them" | `(field, value) => void` | Navigation(`editable`)에 그대로 넘김. 입력만 되고 다른 일은 없음 | 칸마다 Tab | 확정(Navigation Q-20 A) |
| `onSearchClick` | PRD "nothing, just shows it" | — | Navigation 검색 원에 넘김. 페이지는 아무것도 하지 않음 | Enter/Space | 확정 |
| 최상위 요소 | 규칙 | `<section>` | `data-testid="ds-hero"`, 클래스 `ds-hero` | — | 확정 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 구조와 Nested parts(§4 네 행). Navigation 418:8282의 변형은 값으로 추정했다 | A. 탭 = `ServiceTab` ×5, 검색 막대 = `Navigation type="expanded"`(revision 2 옵션 `stretch`·`editable`), 제목·사진은 Hero 안에서 그림(추천). B. 418:8282 변형을 Figma로 먼저 확인(호출 1회) 후 확정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | 제목 40px/590: `--text-type-*`에 40px 스타일이 없다 | A. 크기 `calc(var(--spacing) * 10)`(정확히 40) + 굵기 `--font-weight-type-body-copy-16pt-semibold`(590) + 글꼴 `--font-type-body-copy-16pt-semibold`(추천: 정확한 값, 다른 부품 영향 없음). B. Figma에 40pt 글자 스타일을 만들고 `ds:figma`로 다시 가져와 그 토큰을 씀(Figma 작업 필요). C. `Text` 부품에 새 variant(다른 계획·소유자) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | 페이지와 Figma의 모양 차이: 사진 자르기(페이지 가운데 / Figma 왼쪽으로 보임), 어두운 막 30%(Figma 미조회), 세로 위치(검색 막대 +5) | A. 현재 페이지 모양 그대로: 가운데 자르기, 검정 30% 막(새 역할 `image-scrim`), 페이지 간격(추천: 사용자 결정 "페이지 모양 유지"). B. Figma 모양: 418:8305를 Figma로 읽은 뒤(호출 1회) 그 값으로(Home 화면이 바뀜) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | 선택된 탭을 누가 기억하나 | A. Hero가 기억(`defaultService`, 바뀌면 `onServiceChange`)(추천: 페이지는 부품을 놓기만 함). B. 페이지가 기억하고 `service`·`onServiceChange`로 넘김 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | 사진·탭 데이터 공급 | A. props(`backgroundSrc`, `services`)로 받고 페이지·stories가 `imageUrl()`로 넘김(추천: ListingCard 선례, 부품이 사용자 파일 이름에 묶이지 않음). B. Hero 안에 Figma/PRD 문구와 그림 이름을 고정하고 `imageUrl()`로 찾음 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-06 | Nested parts의 none 두 행(제목 `<h1>`, 배경 사진)을 Hero 안에서 그리는 것 | A. 확정(추천: Text variant로 그릴 수 없고, 사진은 이 구역만의 장식). B. 제목은 `Text` revision을 먼저 계획 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 1440 폭에서 §5 표 기준 열(Q-03 답)과 같은 위치·크기, 사진 자르기·어두운 막 | Storybook iframe 스크린샷을 현재 페이지(`home-top.png`)와 나란히 대조, computed style | |
| 모든 상태·크기 | 처음 "All" 선택, 다른 탭 클릭 시 선택 이동, 한 개만 선택 | play `userEvent.click` + `aria-pressed` 확인, Playwright 실제 포인터 hover | |
| 아이콘과 노출 조건 | 사진·탭 그림 깨짐 없음 | `naturalWidth > 0` | |
| 클릭·입력 기능 | 탭 클릭 → `onServiceChange` 1회. 칸에 글자 입력 → 값이 보이고 `onFieldChange`. 검색 원 → `onSearchClick` 1회, 다른 변화 없음 | play `fn()` + `userEvent.click`·`userEvent.type` | |
| Tab / Focus | 탭 5 → 입력 4 → 검색 원 순서, 모든 정지에서 포커스가 보임 | play `userEvent.tab`, Playwright `:focus-visible` | |
| 제목 순서 | Home의 `<h1>`은 Hero 제목 하나 | DOM 검사 | |
| Nested parts identity | `ds-service-tab` 5개와 `ds-navigation` 1개가 `ds-hero` 안에 렌더 | `ai:verify` DOM 검사 | |
| Nested part → composite callback | 탭 클릭이 `onServiceChange`로, 검색 원이 `onSearchClick`으로 이어짐 | Storybook play | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 하위 부품 `.ds-*` 선택 없음 | `pnpm ai:check Hero`, `pnpm ai:verify Hero`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 원본 대조를 따로 기록한다. 아직 수행한 검사는 없다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: 2026-11-26 "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)". Q: 열린 질문 → A: 추천안 모두 채택 (chosen in chat, 2026-11-26). Q: Figma 변수가 아닌 값 → A: Figma 스타일 값으로 맞춤 (chosen in chat) — 어두운 막은 `image-scrim`(grays-black) + 부품 안 불투명도 0.3. Q: 글자 크기·자간 → A: 지금 크기·자간 유지 (chosen in chat) — 제목 40px `calc(var(--spacing) * 10)`. Q: 공용 버튼 → A: Button 에 공용 모양 추가 (chosen in chat) — Hero는 해당 없음.
- Figma 사실 공백: 418:8305·418:8282는 Figma `get_design_context`가 멈춰 읽지 못했다. Q-01 A(Expanded 해석)·Q-03 A(페이지 모양 채택)로 공백을 닫았다.
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: ServiceTab·Navigation revision 2 구현(같은 에이전트가 먼저 구현). tokens.md revision 6(`image-scrim`)은 적용됐다.
