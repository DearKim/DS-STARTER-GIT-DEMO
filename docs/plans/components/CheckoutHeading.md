---
kind: component
component: CheckoutHeading
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-12216&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — CheckoutHeading

> 작성: Claude Code(재정립 계획 에이전트 E), 2026-11-26. 사용자 요청: "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘." 이 부품은 CheckoutStep 계획 Q-01 의 답(추천안 A: 새 작은 구역 부품)으로 생겼다. 사용자 결정(AskUserQuestion, 2026-11-26): 구역도 부품으로 (권장) · 페이지 모양 유지 (권장) · "추천안 모두 채택 (권장)" · Figma 변수·스타일이 아닌 값은 "Figma 스타일 값으로 맞춤" · 글자 크기·자간은 "지금 크기·자간 유지 (권장)". 이 문서는 계획이다. 승인("Approve revision 1") 전에는 부품·CSS·stories·토큰·페이지를 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Checkout 맨 위 제목 줄(왼쪽 바깥의 둥근 뒤로 링크 + "Confirm and pay")을 새 구역 부품 `CheckoutHeading` 으로 만든다. 뒤로 링크는 /detail 로 간다(PRD). 페이지는 이 부품을 놓기만 한다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`, `src/tokens/tokens.css`
- Figma 파일·노드·조회 시점: Q5QDGE5WoXefOxgm5fziH3 `get_metadata 812:1056`, 2026-11-26 Figma Desktop MCP 직접 조회(캐시 아님). "Section" **812:12216**(215,117 1010×747) 안에서 이 부품이 맡는 것은 두 가지다:
  - 뒤로: 812:12217 "Container:margin"(0,32, 폭 0 — 자식이 왼쪽 바깥에 있음) > 812:12218 "Text"(−68,0) 44×44 원, 812:12219 "Text"(−54,14) 16×16 > 812:12220 "Container" 16×16(화살표).
  - 제목: 812:12223 "Container"(0,32) > 812:12224 "Heading 1"(0,0) 1010×36 > text 812:12225 "Confirm and pay" 226×36.
  - 같은 Section 의 812:12226(단계 열 + 요약 열)은 CheckoutStep·ReservationSummary 계획이 맡는다.
  - 사본: `my-website/figma/Checkout.layers.xml`(h1Tq… 10613:12374 = 812:12216, 10613:12376·10613:12377 = 뒤로, 10613:12382 = Heading 1).
- Figma 호출: 이 에이전트 2회(`get_metadata 812:1056` 성공, `get_design_context 812:12280` 실패). 리드 확인: design-context 는 지금 응답하지 않는다(부르지 않음). 그래서 원·화살표·제목의 Figma 색·글자 스타일 이름은 읽지 못했다 → 사용자 결정 대응표(리드, tokens revision 6)와 현재 페이지 asset 으로 정한다(6·7절).
- 값의 근거(사용자가 검수한 현재 사이트): `my-website/pages/CheckoutPage.tsx` 90~96행, `CheckoutPage.css` 100~141행, Playwright 1440px 측정(`<로컬 측정 폴더>/rebuild/E/checkout-measure.json`, 확대 그림 `checkout-heading@4x.png`). 동작은 PRD `my-docs/inbox/website-plan.md` Checkout 절("Title, back arrow: a link that goes back to /detail").
- 대상 코드·토큰 기준: git-demo HEAD `aa9a593`, `src/tokens/tokens.css`(semantic 46개).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 812:12216 의 뒤로 원 + "Heading 1". PRD: "a back arrow and 'Confirm and pay'" | 결제 화면의 페이지 제목 줄. 화면의 `<h1>` 과 이전 화면으로 가는 링크 | Q-01 추천안 채택 |
| 누를 수 있는 영역 | 원 44×44(812:12218). 현재 페이지: `<a href="/detail">` 44×44 | 원 전체가 링크 | Q-01 추천안 채택 |
| 클릭 동작 | PRD: "a link that goes back to /detail" | 실제 `href` 로 이동하는 `<a>`(버튼 아님). 브라우저 "뒤로 가기"(history)가 아니라 /detail 주소로 감 | Q-01 추천안 채택 |
| 키보드·포커스 범위 | 현재 Tab 순서(측정): 내비 3개 다음 뒤로 링크가 첫 번째, 그다음 라디오 묶음. 지금 링크에 **읽기 이름 없음**(aria-label 없음, 그림 alt "") | Tab 으로 링크에 오고 Enter 로 이동. 읽기 이름 "Back"(Q-02). Figma 에 Focus 모양이 없어 브라우저 기본 포커스 링(ListingCard 하트와 같은 승인 관례) | Q-02 추천안 채택 |
| disabled 동작 | 없음 | 만들지 않음 | Q-01 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 컴포넌트: 없음.
  - `IconButton` 은 `<button>` 이라 /detail 로 이동할 수 없고(PRD: 링크) 크기 40/28·모양이 다르다.
  - `Link` 는 글자 링크(14pt Semibold)라 원 모양이 없다.
  - `Button` 은 `href` 로 `<a>` 를 낼 수 있지만, 모양(primary·secondary·tertiary와 revision 2 의 ghost #F2F2F2·text 밑줄)에 "#F7F7F7 44 원 + 화살표만" 모양이 없다. → 이 뒤로 링크는 **Button ghost·text 모양이 아니다**. 사용자가 정한 공용 모양은 두 가지뿐이라 이 부품 안에서 `<a href>` 로 그린다(CheckoutStep Q-01 A 가 이 방식을 적었다).
  - `Text` 의 variant(body·body-sm·title 20px)에 32px 이 없다.
- 새 부품이 필요한 이유: 사용자 결정 "구역도 부품으로" + CheckoutStep Q-01 A. 페이지에 남은 `.page-Checkout__heading-wrapper`·`__back-link`·`__title` CSS 는 P05·P06 위반이다.
- 변경할 파일(승인 뒤): `src/components/CheckoutHeading/CheckoutHeading.tsx`·`.css`·`.stories.tsx`·`CheckoutHeading.figma.tsx`·`index.ts`(새로).
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품).
- 페이지 배치(이 부품 밖): 내비 아래 위 여백(현재 37 + 32)과 1010 폭 가운데 칸은 페이지 계획이 정한다. 참고 — 현재 페이지 내비가 71 높이라 h1 이 y 140(Figma 는 내비 80 → y 149). Navigation 개정으로 내비 높이가 바뀌면 이 줄도 따라 움직인다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (뒤로 원 812:12218 + 화살표 칸 812:12219 — frame, 인스턴스 아님) | — | — | 812:12216 | none — 이 부품 안에서 `<a href>` 44×44 원 + 화살표 `<svg>`(현재 페이지 asset 경로)로 그림. Button ghost·text 모양이 아님(3절) | confirmed |

- 인스턴스가 없음을 확인한 근거: get_metadata 812:1056 에서 812:12217·812:12223·812:12224 아래는 frame·text 뿐이다(`instance` 태그 없음).
- 제목은 키트 `Text` 를 쓰지 않는다(32px variant 없음).

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:12216 의 뒤로 + 제목 | get_metadata + 페이지 측정 | 기본(변형 하나) | 줄 전체 | 기준(아래 표) | 화살표 | 기본 렌더 | 확정 (Q-01) |
| 뒤로 링크 hover | 페이지 CSS `#ebebeb` | 포인터 | 원 | **없앰**(Figma 에 상태 없음) | 화살표 | 만들지 않음 | 확정 (Q-03) |
| 뒤로 링크 포커스 | 페이지: 브라우저 기본 링(auto 1px) | 키보드 | 원 | Figma 에 상태 없음 → 브라우저 기본 링 유지 | 화살표 | `:focus-visible` 에 따로 그리지 않음 | 확정 (Q-01) |

### 크기·간격 (현재 페이지 = Figma 위치 → CSS)

| 요소 | 값 | CSS |
|---|---|---|
| 줄(루트) | 부모 폭(페이지 1010 칸), 높이 = 제목 36. 위 여백 없음(페이지 배치) | `position: relative`, 폭 100% |
| 뒤로 원 | 44×44, 제목 시작에서 왼쪽 68 바깥(x −68), 제목과 같은 위(y 0). 모서리 22(=반지름) | `position: absolute`, left `calc(var(--spacing) * -17)`, top 0, 크기 `calc(var(--spacing) * 11)`, `--radius-full` |
| 화살표 | 14.29×13.41, 원 안 가운데(측정 오프셋 14.84·15.3 — Figma 16×16 칸 (14,14) 안 가운데와 같음) | `<svg width="14.2929" height="13.4142">`, 원은 flex 가운데 정렬 |
| 제목 | `<h1>` 1010×36, 글자 226 폭(Figma) | 6절 글자 표 |

- Figma에 실제로 없는 상태·조합: hover·pressed·focus 모양, disabled, 뒤로 링크 없는 제목.
- 미조회: 원 바탕·화살표·제목의 Figma 변수·스타일 이름(design_context 응답 없음). 사용자 결정 대응표와 현재 페이지 값·asset 으로 대신한다 — 남은 빈칸 없음.

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | 현재 값·alpha (Figma 변수: 미조회) | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 뒤로 원 바탕 | #F7F7F7 | fills-vibrant-use-plus-lighter-darker-quaternary | `surface-raised` | #F7F7F7 | 일치(살짝 떠 보이는 표면) | — |
| 화살표 선 | #222222, stroke 2 | shade-02 | `text`(`currentColor`) | #222222 | 일치 | — |
| 제목 | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| 뒤로 hover | #EBEBEB | — | 없음 | — | — | Q-03: Figma 에 없는 hover 색은 없앰 |

- 같은 값 후보: #F7F7F7 은 `surface-raised`·`surface-focus`(neutral-01, Pill 탭 포커스) 그리고 리드 rev 6 의 `surface-subtle`·`surface-hover-subtle` 이 있다. 상태가 아닌 고정 바탕이고 Rare find 띠(Callout banner)와 같은 판단 → `surface-raised`.
- 컴포넌트 fill과 부모 배경: 원만 바탕이 있고 줄 자체는 바탕이 없다(투명). 페이지·Storybook 캔버스 흰색.
- 제목 글자(Q-04 답대로):

| 값 | 현재 | CSS |
|---|---|---|
| 크기 | 32px(토큰에 32 글자 크기 없음) | `calc(var(--spacing) * 8)` — 사용자 결정 "지금 크기·자간 유지" |
| 글꼴 | `.SF NS`(페이지 글꼴·토큰 글꼴 모두 이 Mac 에서 같은 글꼴 — CDP 확인) | `--font-type-header-22pt-semibold` |
| 굵기 | 600 | **590** `--font-weight-type-header-22pt-semibold`(32px 크기의 Semibold 토큰이 없어 제목 스타일 Header Semibold 의 590 을 씀; 모든 Semibold 굵기 토큰이 590) |
| 줄 높이 | 36 | `calc(var(--spacing) * 9)` |
| 자간 | -0.5537px | `calc(var(--spacing) * -0.138425)`(= -0.5537px) |

- 신규 token: 없음.
- 검증: `pnpm ds:guard`(G10·G13).

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 화살표 812:12219 > 812:12220 (h1Tq 10613:12377 > 10613:12378) | `my-assets/images/checkout-icon-back.svg`(sha256 090f217ccc35), viewBox 0 0 14.2929 13.4142, path `M1.29293 6.70711H14.2929M6.79293 12.7071L1.14293 7.05711C1.05132 6.96364 1 6.83798 1 6.70711C1 6.57623 1.05132 6.45057 1.14293 6.35711L6.79293 0.707107` | 14.29×13.41, stroke #222222 2, 채움 없음, 회전 없음 | 기본 | — | 확인 — 현재 페이지 asset(사용자 결정: Figma 를 다시 읽을 수 없을 때 현재 페이지 asset 사용) |

- 키트 규칙대로 `<svg>` JSX 로 그리고(`<img src>` 금지) 경로·크기는 파일 그대로, stroke 는 `currentColor` → `text`. 장식이라 `aria-hidden`(이름은 링크의 aria-label).

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `title` | text 812:12225 | 문자열, 필수. "Confirm and pay" | `<h1>` | — | Q-01 추천안 채택 |
| `backHref` | PRD "goes back to /detail" | 문자열, 필수. "/detail" | 원을 누르면 그 주소로 이동(`<a href>`) | Tab 으로 포커스, Enter 로 이동 | Q-01 추천안 채택 |
| `backLabel` | 측정: 지금 읽기 이름 없음 | "Back" | 링크의 `aria-label` | 화면 읽기가 "Back, link" 로 읽음 | Q-02 추천안 채택 |
| `className` | 키트 관례 | — | 루트에 붙음(배치용) | — | Q-01 추천안 채택 |

- 루트: `<div class="ds-checkoutheading" data-testid="ds-checkoutheading">` 안에 `<a class="ds-checkoutheading__back" href={backHref} aria-label={backLabel}>`(화살표 svg) + `<h1 class="ds-checkoutheading__title">`. `state` prop 없음.

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | (CheckoutStep Q-01) 페이지 제목을 어디에 둘지. IconButton·Link·Text·Button 으로는 그릴 수 없음 | **A (추천)** 새 작은 구역 부품 `CheckoutHeading`(뒤로 `<a href>` + `<h1>`) · B CheckoutStep 에 넣음 · C Navigation 개정에 넣음 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | (CheckoutStep Q-07) 뒤로 링크에 읽기 이름이 없음 | **A (추천)** `aria-label="Back"` · B "Back to the listing" · C 다른 문구 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | (CheckoutStep Q-04) 뒤로 링크 hover #EBEBEB 는 페이지 CSS 에만 있음 | **A (추천)** 없앰 · B 유지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드 대응표도 "Figma 에 없는 hover 색은 없앰" | resolved |
| Q-04 | (CheckoutStep Q-06) 토큰에 없는 제목 값: 32px, 굵기 600, 자간 -0.5537px | A 새 토큰 · B Figma 글자 스타일 값 | 사용자 결정 "Figma 스타일 값으로 맞춤" + "지금 크기·자간 유지 (권장)" (chosen in chat, 2026-11-26) → 크기 `calc(var(--spacing) * 8)`, 굵기 590, 자간 `calc(var(--spacing) * -0.138425)`(6절) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 1010 칸: 원 44×44 가 제목 왼쪽 68 바깥, 제목 36 높이, 흰 캔버스(원이 칸 밖이라 캔버스 왼쪽 여백 필요) | Storybook iframe·`/checkout` 나란히 DOM 측정·스크린샷 | |
| 모든 상태·크기 | 원 #F7F7F7·모서리 원형, 화살표 14.29×13.41 가운데, 제목 32/590/36/-0.5537px | DOM 측정 | |
| 아이콘과 노출 조건 | 화살표 `<svg>`(img 아님), `aria-hidden` | DOM 검사 | |
| 클릭·이동 | 원을 누르면 `/detail` 로 이동 | Storybook play: `getByRole("link", { name: "Back" })` 의 `href` 확인 / Playwright: `/checkout` 에서 눌러 주소 확인 | |
| disabled / Tab / Focus | Tab 으로 링크에 포커스(브라우저 기본 링), Enter 로 이동. 제목은 `heading` level 1 | play `userEvent.tab`, `getByRole("heading", { level: 1 })` | |
| Nested parts identity | 키트 부품 import 없음(행이 none) | 코드 검토, `ai:check` | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용 | `pnpm ai:check CheckoutHeading`, `pnpm ai:verify CheckoutHeading`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 대조를 따로 기록한다. 아직 수행한 검사는 없다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정:
  - Q: 열린 질문 약 100개를 어떻게 답할까요? → A: 추천안 모두 채택 (권장) (chosen in chat, 2026-11-26) — Q-01~Q-03(CheckoutStep Q-01·Q-07·Q-04)
  - Q: Figma 변수·스타일이 아닌 값은? → A: Figma 스타일 값으로 맞춤 (chosen in chat, 2026-11-26) — Q-04(굵기)
  - Q: 글자 크기·자간은? → A: 지금 크기·자간 유지 (권장) (chosen in chat, 2026-11-26) — Q-04(크기·자간)
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 이 계획 승인. 새 토큰·다른 부품 개정은 필요 없다.
