---
kind: component
component: ListingTitle
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-4793&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — ListingTitle (숙소 제목 + 공유하기·저장)

> 작성: Claude Code(에이전트 C), 2026-11-26. 근거: 사용자 요청 "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘"와 같은 날의 결정 "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)"(chosen in chat). Q&A 는 같은 날 사용자 결정 "추천안 모두 채택 (권장)", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지 (권장)", "Button 에 공용 모양 추가 (권장)"(chosen in chat, 리드 전달 `rebuild-update.md`)으로 모두 답을 받았다. 계획 승인은 아직이다. 사용자 승인 전 구현 파일을 만들지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Detail 페이지 맨 위 제목 줄(숙소 이름 + 오른쪽 "공유하기"·"저장")을 Storybook 부품 `ListingTitle` 로 만든다. 두 버튼은 공용 `Button` 의 새 `variant="text"`(Buttons revision 2, 에이전트 F)를 쓴다. 페이지는 이후 이 부품을 놓기만 한다(페이지 수정은 이 계획 범위 밖).
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`(재생성본, `src/tokens/tokens.css` 와 같음)
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, Detail 프레임 812:393.
  - 구조: `my-website/figma/Detail.layers.xml`(2026-11-25 저장본) — 제목 text 812:4793(80,121 · 1280×26), 공유 frame 812:6948(1219,117 · 72.45×34) > "Button" 812:6949(x −8, 88.45×34) > Container 812:6950(x 8 y 8, 72×18) > "Text:margin" 812:6951(24×16) > "Text" 812:6952(16×16) + text "공유하기" 812:6954(x 24, 48×18). 저장 frame 812:6955(1291.45,117 · 68.23×34) > "Button - 위시리스트에 담기" 812:6956(x 12, 64.23×34) > 812:6957 > 812:6958 > "Text" 812:6959(16×16) + text "저장" 812:6961(x 24, 25×18).
  - MCP 직접 조회 1회(이 에이전트 공용, 2026-11-26): `get_variable_defs 812:393` — 페이지 전체에 쓰인 변수·스타일 목록(Header/22pt Semibold, Shade 02 #222222, `sds-typography-weight-medium` 500, Fills - Vibrant/Quaternary #f7f7f7 등). 노드별 연결은 읽지 않았다.
- 현재 페이지(참조 모양): git-demo `aa9a593`, `my-website/pages/DetailPage.tsx` 117–139행, `DetailPage.css` 175–223행. 1440×900 Playwright 측정(2026-11-26).
- 대상 코드·토큰 기준: git-demo 작업 폴더 현재 상태(`aa9a593`), `src/tokens/tokens.css`. 색 역할은 리드가 토큰 계획 revision 6 에 모은다(이 계획은 그 파일을 고치지 않는다).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | Figma: 제목 text 와 버튼 frame 2개가 812:393 바로 아래 형제(묶는 frame 없음). 페이지: `<section data-section="title">` 안 `<h1>` + `<button>` 2개 | 숙소 상세의 맨 위 제목 줄. 제목은 페이지의 유일한 `<h1>` | Q-01 추천안 채택 |
| 누를 수 있는 영역 | Figma 이름 "Button", "Button - 위시리스트에 담기"(34 높이 frame 전체). 페이지: 버튼 전체 96.45×34 / 72.23×34 | 공용 `Button variant="text"` 두 개, 아이콘+글자 전체가 누르는 영역 | Q-01 → 결정 4 |
| 클릭/선택/열림 동작 | PRD(`my-docs/inbox/website-plan.md` 4절): "Title, '공유하기' and '저장': nothing, just shows them" | `Button` 의 `onClick` 에 `onShareClick`·`onSaveClick` 을 넘김. 모양 변화 없음 | Q-02 추천안 채택 |
| 키보드·포커스 범위 | 페이지: 두 버튼이 Tab 순서 1·2번(제목 다음), 브라우저 기본 링. Figma 에 Focus 모양 없음 | Tab·Enter·Space 는 `Button`(네이티브 `<button type="button">`)이 처리 | Q-03 추천안 채택 |
| disabled 동작 | Figma·PRD 에 없음 | 넘기지 않음 | Q-02 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 부품 조사(R05) — 계획 작성 시점의 현재 API 기준:

| 후보 | 현재 공개 API | 역할 일치 | 모양 일치 | 판정 |
|---|---|---|---|---|
| `Button` primary/secondary/tertiary | `size` full-width/small, `icon` 은 secondary·tertiary full-width 에서만 | 동작 버튼 → 일치 | 불일치(테두리·48 높이·13pt 590 등) | 현재 variant 는 못 씀 → 사용자 결정 4 로 새 `variant="text"` 를 F 가 더함 |
| `Link` subtle medium + `hasIcon` | `<a>` 이동 전용 | 불일치(PRD 는 이동 없음) | 불일치(590, 아이콘 뒤) | 쓰지 않음 |
| `IconButton` | 글자 없는 아이콘 버튼, share·heart 없음 | 일부 | 불일치 | 쓰지 않음 |
| `Text` | body·body-sm·title | 정적 글자 | 제목 22px/590/26 과 다름 | 쓰지 않음(제목은 부품 안 `<h1>`) |
| `Icon` | add·close·search 만 | 아이콘 | share·heart 없음 | 쓰지 않음(원본 SVG 를 부품 안 `<svg>` 로 그려 `Button` 의 `icon` 에 넘김) |

- 사용자 결정 4("Button 에 공용 모양 추가 (권장)"): 공유·저장은 공용 `Button variant="text"`(밑줄 글자 버튼, 앞 아이콘 선택)을 쓴다. 이 부품은 버튼 모양을 그리지 않고, `Button` 의 `.ds-button*` 클래스를 선택하거나 `className`·`style` 을 넘기지 않는다(R05).
- **필요한 모양과 공용 text 모양의 차이(F 에게 전달):** 지금 페이지의 공유·저장은 **밑줄이 없다**(측정 `text-decoration-line: none`). 높이 34 · padding 8/12 · 모서리 8 · 글자 14px/500/줄 21 · 색 `text` · 앞 아이콘 16×16 · 아이콘–글자 8 · hover 바탕 `surface-hover-subtle`(#F7F7F7). 공용 text 모양이 밑줄을 그리면 페이지 모양과 달라진다 → F 의 Buttons revision 2 가 이 조합(밑줄 없음, hover 바탕)을 담거나, 밑줄을 받아들일지 F/리드가 사용자에게 확인한다.
- 변경할 파일(승인 뒤): `src/components/ListingTitle/ListingTitle.tsx`·`.css`·`.stories.tsx`·`index.ts`(새로). CSS 는 줄 배치(`ds-listing-title__*`)만. Figma 원본 Component 가 없어 Code Connect 없음(G11 경고).
- 의존: Buttons revision 2(`variant="text"`)가 승인·구현돼야 이 부품을 구현할 수 있다.
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품).

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (제목 text 812:4793) | — | — | 812:4793 | none — 이 부품의 `<h1>` 안 글자로 그린다(Text 의 variant 에 22px/590/26 이 없음) | confirmed |
| — (frame 812:6949 "Button", 공유하기) | — | — | 812:6948 | Button { variant="text" size="xlarge" icon={공유 `<svg>`} onClick={onShareClick} children="공유하기" } — Buttons revision 2 §12.7(F), 5절 모양 | confirmed |
| — (frame 812:6956 "Button - 위시리스트에 담기", 저장) | — | — | 812:6955 | Button { variant="text" size="xlarge" icon={하트 `<svg>`} onClick={onSaveClick} children="저장" } — Buttons revision 2 §12.7(F), 5절 모양 | confirmed |

- Confirmed absence of nested instances and evidence: `Detail.layers.xml` 에서 812:4793 은 text, 812:6948·812:6955 아래는 모두 frame/text 다. 문서 전체 `<instance>` 는 812:4703 Navigation 과 812:8724 Card 뿐이다. Button 두 행은 Figma 인스턴스가 아니라 사용자 결정 4 로 쓰는 키트 부품이다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:4793 + 812:6948 + 812:6955 기본 | layers.xml + 페이지 측정 | 기본 | 전체 | 기준(아래 표) | 공유·하트 | 기본 렌더 | 확정(Q-01) |
| (페이지만) 버튼 hover | 페이지 CSS `.page-Detail__action-button:hover`, 측정 rgb(247,247,247) | 포인터 올림 | 버튼 하나 | 바탕 #F7F7F7 | 같음 | `Button variant="text"` 의 `:hover`(F) | 확정(Q-03, 역할 `surface-hover-subtle` 유지 — 리드 목록) |
| (페이지만) 버튼 focus | 측정: 브라우저 기본 outline | 키보드 포커스 | 버튼 하나 | 기본 링 | 같음 | `Button variant="text"` 의 `:focus-visible`(F) | 확정(Q-03) |

- Focus 링: Figma 에 없음. 지금 페이지는 버튼 상자(34 높이)를 브라우저 기본 링이 감싼다. 이 부품에서는 F 가 정한 text 모양의 focus 를 그대로 쓴다.
- Figma에 실제로 없는 상태·조합: pressed·disabled·저장 눌림(채워진 하트). 만들지 않는다(Q-02).
- 미조회: 812:6954·812:6961 글자의 Figma 글자 스타일·밑줄 여부(design-context 조회 불가 — 리드 안내). "페이지 모양 유지" 결정으로 페이지 값을 쓰므로 사실 공백이 아니다.

### 크기·간격 (현재 페이지 값 → CSS)

| 요소 | 페이지 측정(1440) | Figma(layers.xml) | 누가 그리나 / CSS |
|---|---|---|---|
| 줄 전체 | 폭 1280, 제목 왼쪽 위, 버튼 묶음 오른쪽 위 | 제목 x 80 · 버튼 x 1211~1368 | ListingTitle: `display:flex; justify-content:space-between; align-items:flex-start`, 폭은 부모를 채움 |
| 제목 | 276.28×26 at (80,121) | 812:4793 (80,121) h 26 | ListingTitle: 글자 6절, `line-height: calc(var(--spacing) * 6.5)` |
| 버튼 묶음 | 위로 4 올라감(y 117), 버튼 사이 8 | 버튼 사이 4 | ListingTitle 의 `ds-listing-title__actions`: `margin-top: calc(var(--spacing) * -1)`, `gap: calc(var(--spacing) * 2)` |
| 버튼(공용 text 모양) | 높이 34, padding 8/12, 모서리 8, 아이콘 16×16, 아이콘–글자 8, 공유하기 96.45×34 · 저장 72.23×34(내용 폭) | 높이 34, padding 8/8 | **Button(F)**: `height: calc(var(--spacing) * 8.5)`, `padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3)`, `border-radius: var(--radius-md)`, 아이콘 `calc(var(--spacing) * 4)`, `gap: calc(var(--spacing) * 2)` |

- 페이지와 Figma 의 버튼 위치·padding 차이는 사용자 결정 "페이지 모양 유지"·"지금 크기·자간 유지"에 따라 페이지 값을 쓴다.

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 제목 글자 | #222222(페이지 측정) / Figma 변수 Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| 버튼 글자·공유/하트 아이콘 선 | #222222(페이지 CSS, asset stroke) | shade-02 | `text`(Button text 모양의 글자색, 아이콘은 currentColor) | #222222 | 일치 | Button(F) 이 칠함 |
| 버튼 hover 바탕 | #F7F7F7(페이지 CSS, 측정). Figma 에 hover 상태 없음, 같은 값 변수 Fills - Vibrant/Quaternary | neutral-01 | `surface-hover-subtle`(새 역할, 리드 목록에 유지 확정) | #F7F7F7 | 일치 | Button text 모양의 hover(F). 리드가 토큰 계획 revision 6 에 기록 |

- 컴포넌트 fill 과 부모 배경: 부품 자체는 투명. 페이지 배경 #FFFFFF. Storybook 캔버스도 흰 배경.
- 이 부품이 직접 쓰는 새 token: 없음(`surface-hover-subtle` 은 Button text 안에서 쓰임).

### 글자 (현재 페이지 값 → 토큰)

| 요소 | 페이지 값 | 토큰 | 그리는 곳 |
|---|---|---|---|
| 제목 | 22px / 590 / 줄 26 | `--font-type-header-22pt-semibold`, `--text-type-header-22pt-semibold`, `--font-weight-type-header-22pt-semibold`, `--tracking-type-header-22pt-semibold` + `line-height: calc(var(--spacing) * 6.5)` | ListingTitle |
| 버튼 글자 | 14px / 500 / 줄 21 / 밑줄 없음 | 크기 `--text-type-body-copy-14pt-regular`(14px) + 굵기 `--font-weight-medium`(500 = Figma 변수 `sds-typography-weight-medium`, 결정 2 표) + `--leading-normal`(21px) | Button text(F) |

- 글꼴: 페이지는 `-apple-system, …`, 토큰은 `"SF Pro", var(--font-sans)`. 이 Mac 측정에서 페이지 글자는 `.SF NS`. 구현 뒤 같은 폭(제목 276.28)인지 10절에서 확인한다.

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 공유 / 812:6952 "Text" 16×16 | `my-assets/images/detail-icon-share.svg`(g id "Text"), path `M13.5 9V13.5C13.5 14.0523 … L13 6.5` | viewBox 0 0 16 16, fill none, stroke #222222 1px, 회전 없음 | 기본·hover·focus | — | 확인 |
| 하트 / 812:6959 "Text" 16×16 | `my-assets/images/detail-icon-save.svg`(g id "Text"), path `M7.9999 14.3334C11.5832 … Z` | viewBox 0 0 16 16, fill none, stroke #222222 1px | 기본·hover·focus | 채워진 하트(없음) | 확인 |

- 그리는 방법(Q-04 추천안 채택): 원본 path 를 이 부품 안 `<svg>` JSX(16×16, `stroke="currentColor"`, `fill="none"`, `aria-hidden="true"`)로 옮기고 `Button` 의 `icon` prop 으로 넘긴다. `<img src>` 로 넣지 않는다.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `title` | 812:4793, PRD 3절 | 필수 string, 예 "Kalani’s guesthouse TAHAA" | `<h1>` 글자 | — | Q-01 추천안 채택 |
| `shareLabel` | 812:6954 | "공유하기" | 첫 `Button` 의 children(=버튼 이름) | — | Q-01 추천안 채택 |
| `saveLabel` | 812:6961 | "저장" | 둘째 `Button` 의 children | — | Q-01 추천안 채택 |
| `onShareClick` | PRD "nothing, just shows them" | 없음 / `(event) => void` | 첫 `Button` 의 `onClick` 으로 전달, 클릭 시 호출만 | `Button`(`type="button"`), Tab·Enter·Space | Q-02 추천안 채택 |
| `onSaveClick` | 같음 | 없음 / `(event) => void` | 둘째 `Button` 의 `onClick`. `aria-pressed` 없음 | 같음 | Q-02 추천안 채택 |
| `labelLang` | 페이지 `<html lang="en">` 인데 라벨이 한국어 | 없음 / 예 "ko" | 두 라벨을 `<span lang>` 으로 감싸 `Button` children 으로 넘김(모양 변화 없음) | — | Q-06 추천안 채택 |
| 최상위 | 키트 규칙 | `data-testid="ds-listing-title"`, 클래스 `ds-listing-title` | — | — | Q-01 추천안 채택 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 부품 구성과 Nested parts. 공유·저장은 기존 Button·Link·IconButton 과 역할·모양이 함께 맞지 않음(3절). 제목 22px/590 은 Text 에 없음 | A 새 부품 안에서 `<h1>` + `<button>` 2개를 그림. / B 공용 `Button` 에 이 모양 variant 를 더하는 revision 뒤 사용. / C Link 에 버튼 모양 | 사용자 결정 4 "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26) → B: 공유·저장은 `Button variant="text"`(Buttons revision 2, 에이전트 F). 제목은 부품 안 `<h1>`(추천안 채택) | resolved |
| Q-02 | 동작. PRD: 아무 일 없음 | A 콜백만, 상태 변화 없음. / B 저장 토글 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | hover·focus. 페이지 hover #F7F7F7, Figma 에 없음 | A hover 유지(`surface-hover-subtle`) + 브라우저 기본 링. / B hover 없앰. / C 2px 링 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드 목록에 `surface-hover-subtle`(#F7F7F7 → neutral-01) 유지. 결정 4 에 따라 hover·focus 는 `Button variant="text"` 안에서 그림(F 에 요청) | resolved |
| Q-04 | 아이콘 그리는 방법 | A 원본 path 를 `<svg>` JSX 로. / B Icon revision. / C `<img>` | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). `<svg>` 는 `Button` 의 `icon` 으로 넘김 | resolved |
| Q-05 | 버튼 글자 굵기 500 | A `--font-weight-medium`. / B 새 굵기 토큰. / C 590 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 결정 2 표도 "500 → `--font-weight-medium`(= Figma `sds-typography-weight-medium`)". Button text 안에서 씀 | resolved |
| Q-06 | 한국어 라벨의 언어 표시(접근성) | A `labelLang` prop. / B 그대로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 5절 표의 페이지 값(1280 폭에서 제목 276.28×26, 버튼 96.45×34 · 72.23×34, 오른쪽 끝 정렬), 흰 배경 | Storybook iframe(1280 폭) box·computed style, 페이지 스크린샷 대조 | |
| 상태 | hover 바탕 #F7F7F7, focus 링 보임(Button text 모양) | Playwright 실제 포인터 hover·Tab | |
| 아이콘 | 16×16, 원본 path, 색 `--color-text` | DOM 의 `<svg>` path 와 asset 대조 | |
| Nested parts identity | 루트 안에 `data-testid="ds-button"` 2개 | `ai:verify` DOM 검사(복제 마크업이면 실패) | |
| Nested part → callback | 공유·저장 클릭 → `onShareClick`·`onSaveClick` 각 1회 | Storybook `play`: `fn()` + `userEvent.click` + 호출 검사 | |
| Tab / Focus | 제목 다음 Tab 1 = 공유하기, Tab 2 = 저장 | `play` `userEvent.tab()` 2회 | |
| 접근성 | `<h1>` 1개, 버튼 이름 = 라벨, 아이콘 `aria-hidden`, 라벨 `lang="ko"` | DOM 검사 | |
| 글꼴 | 토큰 글꼴로 페이지와 같은 폭 | 렌더 폭 비교 | |
| 공통 규칙 | 토큰만 사용, `.ds-button*` 선택 없음 | `pnpm ai:check ListingTitle`, `pnpm ai:verify ListingTitle`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 원본 대조를 구분해 기록한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 열린 질문 → A: "추천안 모두 채택 (권장)" (chosen in chat, 2026-11-26). Q: 공용 버튼 → A: "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26) — 공유·저장은 `Button variant="text"`.
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 이 계획 revision 1 승인, Buttons revision 2(`variant="text"`, 밑줄 없음·hover 바탕 조합 포함 여부 — 3절)의 승인·구현, 토큰 계획 revision 6(`surface-hover-subtle`) 적용.
