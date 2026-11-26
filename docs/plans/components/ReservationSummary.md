---
kind: component
component: ReservationSummary
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-12281&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — ReservationSummary

> 작성: Claude Code(재정립 계획 에이전트 E), 2026-11-26. 사용자 요청: "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘." 사용자 결정(AskUserQuestion): 구역도 부품으로 (권장) · 페이지 모양 유지 (권장) · 1440px 화면 일치·키보드·접근성·동작 점검. 같은 날 질문 답: "추천안 모두 채택 (권장)", Figma 변수·스타일이 아닌 값은 "Figma 스타일 값으로 맞춤", 글자 크기·자간은 "지금 크기·자간 유지 (권장)", 공용 버튼은 "Button 에 공용 모양 추가 (권장)". 이 문서는 계획이다. 승인("Approve revision 1") 전에는 부품·CSS·stories·토큰·페이지를 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Checkout 오른쪽 열의 예약 요약 카드(숙소 사진·이름·별점·배지, 무료 취소, 날짜·인원과 Change, 금액)를 새 구역 부품 `ReservationSummary` 로 만든다. 그 아래 "Rare find!" 띠는 페이지가 `Callout`(revision 2 의 `type="banner"`)으로 놓는다(Q-01).
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`, `src/tokens/tokens.css`
- Figma 파일·노드·조회 시점:
  - Q5QDGE5WoXefOxgm5fziH3 `get_metadata 812:1056`, 2026-11-26 Figma Desktop MCP 직접 조회(캐시 아님). 오른쪽 열 812:12280(390×591) = 요약 카드 **812:12281**(390×519) + 띠 812:12362(위 여백 24 + 812:12363 390×48).
  - 같은 디자인의 사본 `my-website/figma/Checkout.layers.xml`(h1Tq… 10613:12434 = 812:12281).
  - 이 에이전트의 Figma 호출 2회: `get_metadata 812:1056` 성공, `get_design_context 812:12280`(바로 이 열) 실패(MCP 전송 끊김). 리드 확인: design-context 는 지금 응답하지 않는다(다시 부르지 않음). 색·글자의 Figma 변수·스타일 이름은 읽지 못했다 → 사용자 결정 "Figma 스타일 값으로 맞춤" 대응표(리드, tokens revision 6)로 정한다(6절).
- 값의 근거(사용자가 검수한 현재 사이트): `my-website/pages/CheckoutPage.tsx` 153~230행, `CheckoutPage.css` 285~506행, Playwright 1440px 측정(`<로컬 측정 폴더>/rebuild/E/checkout-measure.json`). 동작은 PRD `my-docs/inbox/website-plan.md` Checkout 절.
- 대상 코드·토큰 기준: git-demo HEAD `aa9a593`, `src/tokens/tokens.css`(semantic 46개) + 리드의 tokens revision 6(승인 대기). 쓰는 부품: `Button` revision 2(에이전트 F 의 `variant="ghost"`·`variant="text"`, 승인 대기).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 812:12281: 사진 103×103 + "STAY 2572"·배지 2개 / "Free cancellation" 설명 / Dates·Guests 줄과 "Change" / "Price details" 금액 | 예약할 숙소와 금액을 요약하는 카드. 정보 표시가 주 역할 | Q-03 추천안 채택 |
| 누를 수 있는 영역 | Figma frame 이름이 "Button": "Full policy" 812:12309, "Change" 812:12314·812:12322·812:12327·812:12335, "GBP" 812:12354("Button - Current currency: GBP. Change payment currency"), "Price breakdown" 812:12360. 현재 페이지: Change 는 `<button>`(type 없음), 나머지는 `<a href="#">` | 다섯 곳 모두 키트 `Button`(`<button type="button">`)으로 — 링크가 아니다(어디로도 가지 않음) | Q-02 사용자 결정·Q-03 추천안 채택 |
| 클릭 동작 | PRD: "Full policy", 2개 "Change", "GBP", "Price breakdown" — nothing, just shows them | 각자 콜백만 부르고 화면은 그대로. 지금 `href="#"` 는 누르면 주소에 `#` 이 붙고 페이지 맨 위로 튄다(PRD 와 다름) → 버튼으로 바로잡음 | Q-03 추천안 채택 |
| 키보드·포커스 범위 | 현재 Tab 순서(측정): Full policy → Change → Change → GBP → Price breakdown. "Price breakdown" 은 `display:block` 이라 누르는 영역이 340 폭 전체(Figma 812:12360 은 110.45×18) | 같은 순서. 누르는 영역은 글자 폭(Figma) | Q-03 추천안 채택 |
| disabled 동작 | 없음 | 만들지 않음 | Q-03 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 컴포넌트: 승인된 `Card` 의 `type="reservation-confirmation"`(Figma Card 238:2420, 477×509: 흰 바탕·그림자·aircover 줄·메달)이 가장 가깝지만 모양·내용이 다르다(그림자·aircover 있음, Change·Free cancellation 없음). Checkout Figma 의 요약 카드는 **Card 인스턴스가 아니다**(812:12281 은 frame, Card.md 3절도 "Checkout Figma 레이어에 Card 인스턴스 없음"). 사용자 결정 "페이지 모양 유지"에 따라 Card 를 바꾸지 않고 새 구역 부품으로 만든다. `ListingCard` 도 역할·모양이 다르다.
- 이 부품이 쓰는 키트 부품: `Button` — `variant="ghost"`("Change" ×2), `variant="text"`("Full policy"·"GBP"·"Price breakdown"). 두 모양은 Buttons revision 2(에이전트 F)가 더한다. 이 부품은 버튼을 직접 그리지 않는다(사용자 결정 "Button 에 공용 모양 추가").
- 변경할 파일(승인 뒤): `src/components/ReservationSummary/ReservationSummary.tsx`·`.css`·`.stories.tsx`·`ReservationSummary.figma.tsx`·`index.ts`(새로).
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품).
- 구현 순서: Buttons revision 2 → 이 부품.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — ("Change" ×2: frame 812:12314·812:12327 "Button" 75.94×32, 인스턴스 아님) | — | — | 812:12281 | Button { variant="ghost" size="small" onClick=onChangeDates / onChangeGuests } children "Change" — 크기는 10절 아래 "Button 에 필요한 모양"(Buttons revision 2 §12.7, size="small" 은 기본값) | confirmed |
| — ("Full policy" 812:12309, "GBP" 812:12354, "Price breakdown" 812:12360: frame "Button…", 인스턴스 아님) | — | — | 812:12281 | Button { variant="text" size="small" onClick=onPolicyClick / onCurrencyClick / onBreakdownClick } children 각 글자(Buttons revision 2 §12.7, size="small" 은 기본값), GBP 는 aria-label "Current currency: GBP. Change payment currency" | confirmed |

- 인스턴스가 없음을 확인한 근거: get_metadata 812:1056 에서 812:12281 아래는 모두 frame·text 다(`instance` 태그 없음). 별·배지 그림(812:12293·812:12299 "Container" 12×12)도 frame 이다. 위 두 행은 인스턴스가 아니지만 사용자 결정(공용 Button 모양)으로 키트 부품을 쓰므로 표에 적었다(템플릿 4절).
- 글자는 키트 `Text` 를 쓰지 않는다. Text 의 variant(body 16·body-sm·title 20)에 14px Semibold·12px Medium·18px Semibold 가 없다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:12281 요약 카드 (390×519) | get_metadata + 페이지 측정 | 기본(변형 하나) | 카드 전체 | 기준(아래 표) | 별·월계수 12×12 | 기본 렌더 | 확정 (Q-03) |
| "Change" hover | 페이지 CSS `#e8e8e8` | 포인터 | Change | Button ghost 의 hover(#EBEBEB, `control-bg-subtle-hover`)가 맡음 | 없음 | 이 부품 CSS 없음 | 확정 (Q-04) |
| 글자 버튼 hover | 페이지: 변화 없음(측정) | 포인터 | Full policy·GBP·Price breakdown | Button text 가 맡음(변화 없음 요청) | 없음 | 이 부품 CSS 없음 | 확정 (Q-02) |
| 포커스 | 페이지: 브라우저 기본 링 | 키보드 | 버튼 5개 | Button 의 포커스 규칙 | 없음 | 이 부품 CSS 없음 | 확정 (Q-02) |

### 크기·간격 (현재 페이지 = Figma 위치 → CSS)

| 요소 | 값 | CSS |
|---|---|---|
| 카드 | 390×519(부모 폭), 테두리 1 #DDDDDD, 모서리 24, 여백 24, 바탕 투명, 그림자 없음. 칸 사이 16, 칸 높이 103·40·1·44·1·44·1·123 | 폭은 부모를 채움(Storybook 390 칸). padding `calc(var(--spacing) * 6)`, gap `* 4`, 모서리 `calc(var(--spacing) * 6)`(Q-06) |
| 1줄: 사진 + 정보 | 사진 103×103 모서리 8 `object-fit: cover`, 사진과 정보 사이 16, 정보 칸 221 폭·세로 가운데(y 30.5) | `calc(var(--spacing) * 25.75)`, `--radius-md`, gap `* 4`, `align-items: center` |
| 숙소 이름 | `<h2>`(Q-07) "STAY 2572" 18px, 줄 높이 24 | 6절 글자 표 |
| 배지 줄 | 이름 아래 2, 배지 사이 12. 배지 = 그림 12×12 + 4 + 글자 12px 줄 높이 16 #222(줄바꿈 없음) | margin-top `* 0.5`, gap `* 3`·`* 1`, 그림 `* 3`, 줄 높이 `* 4` |
| 2줄: 무료 취소 | "Free cancellation", 아래 4, 설명 + 공백 + `Button text` "Full policy"(글자 흐름 안) | 줄 높이 `* 4.5`, 사이 `* 1` |
| 구분선 3개 | 340×1 #EBEBEB | `--border-width-thin`, `border-subtle` |
| 3·4줄: Dates·Guests | 이름, 아래 8, 값. 오른쪽 위 `Button ghost` "Change"(76×32) | 사이 `* 2`, 줄 `justify-content: space-between`, `align-items: flex-start` |
| 5줄: Price details | `<h2>`(Q-07) 제목, 아래 8: "2 nights x £170.46" ↔ "£340.91"(양 끝), 구분선 #DDDDDD 위아래 16, "Total" + 4 + `Button text` "GBP"(글자 기준선 맞춤) ↔ "£340.91", 아래 8 `Button text` "Price breakdown"(글자 폭) | 사이 `* 2`·`* 4`·`* 1`, 구분선 `border` |

- 측정 좌표(1440 화면): 카드 (835,200) 390×519. 사진 (860,225). 이름 (979,255.5). 배지 y 281.5. 무료 취소 y 344. 구분선 y 400·477·554. Dates y 417, Guests y 494, Change x 1124. Price details y 571, 금액 줄 y 597, 진한 구분선 y 631, Total y 648, Price breakdown y 674.
- Figma에 실제로 없는 상태·조합: hover·pressed·focus 모양, disabled, 할인·세금 줄, 다른 통화.
- 미조회: 812:12281 의 색·글자 스타일 이름(design_context 응답 없음). 사용자 결정 대응표로 대신한다 — 남은 빈칸 없음.

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | 현재 값·alpha (Figma 변수: 미조회) | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 모든 글자·그림(별·월계수) | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| 카드 테두리 | #DDDDDD, 1px | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 금액 위 진한 구분선 | #DDDDDD | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 연한 구분선 3개 | #EBEBEB | neutral-02 | `border-subtle` | #EBEBEB | 일치(가는 구분선) | — |
| 카드 바탕 | 투명 | — | 없음 | — | 일치 | 페이지 흰 바탕이 비침 |
| "Change" 바탕·hover | #F2F2F2 · #E8E8E8 | — | Button ghost 안에서 `control-bg-subtle`(#F2F2F2, Figma "Fills - Vibrant/Tertiary") · `control-bg-subtle-hover`(#EBEBEB) | — | 사용자 결정 대응표 | 이 부품 CSS 에 쓰지 않음(Q-04·Q-05) |

- 컴포넌트 fill과 부모 배경: 카드는 바탕이 없다(투명). 페이지 흰 배경. Storybook 캔버스 흰색.
- 같은 값 후보: #EBEBEB 는 `border-subtle`·`track`·`loading-dot-muted` 가 있다. 구분선이므로 `border-subtle`.
- 글자(Q-06 답대로: 굵기 600 → Figma Semibold 590, 500 → `--font-weight-medium`, 크기·자간은 지금 값 그대로 `calc`):

| 쓰는 곳 | 현재 값 | 크기·글꼴 | 굵기 | 줄 높이 | 자간 |
|---|---|---|---|---|---|
| 숙소 이름 | 18 / 600 / 24 / -0.4395px | `--text-type-body-copy-18pt-semibold`, `--font-type-body-copy-18pt-semibold` | `--font-weight-type-body-copy-18pt-semibold`(590) | `calc(var(--spacing) * 6)` | `calc(var(--spacing) * -0.109875)` |
| 소제목·합계(Free cancellation, Dates, Guests, Price details, Total, 합계 금액) | 14 / 600 / 18 / -0.1504px | `--text-type-body-copy-14pt-semibold`, font 같음 | `--font-weight-type-body-copy-14pt-semibold`(590) | `calc(var(--spacing) * 4.5)` | `calc(var(--spacing) * -0.0376)` |
| 설명·값·금액 줄 | 14 / 400 / 18 / -0.1504px | `--text-type-body-copy-14pt-regular`, font 같음 | `--font-weight-type-body-copy-14pt-regular`(400) | `* 4.5` | `* -0.0376` |
| 배지 글자 | 12 / 500 / 16 / 자간 없음 | `--text-type-body-copy-12pt-regular`, font 같음 | `--font-weight-medium`(500 = Figma 변수 sds-typography-weight-medium) | `calc(var(--spacing) * 4)` | 0 |
| 버튼 글자 | — | Button ghost·text 가 그림 | — | — | — |

- 글꼴: 현재 페이지 `-apple-system…` 과 토큰 `"SF Pro", var(--font-sans)` 은 이 Mac 에서 모두 `.SF NS` 로 그려진다(CDP `getPlatformFontsForNode` 확인).
- 신규 token: 이 부품 CSS 가 새로 쓰는 것은 없다. `control-bg-subtle`·`control-bg-subtle-hover` 는 Button ghost 가 쓴다(리드 tokens revision 6).

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 별 812:12293 (h1Tq 10613:12446) | `my-assets/images/checkout-icon-star.svg` (sha256 4f2468b0feff), path 1개 evenodd + clip 12×12(clipPath id `clip0_10613_12963`) | 12×12, fill #222222 | 기본 | — | 확인(페이지 asset — 사용자 결정: Figma 를 다시 읽을 수 없을 때 현재 페이지 asset 사용) |
| 월계수 812:12299 (h1Tq 10613:12452) | `checkout-icon-guest-favourite.svg` (sha256 ed2df3bb17ba), path 1개 + clip 12×12 | 12×12(16×12 칸 왼쪽), fill #222222 | 기본 | — | 확인(같음) |
| 숙소 사진 812:12285 "Image" | `checkout-stay-thumb.png` (sha256 db5867bbda13, 1200×753) | 103×103 cover, 모서리 8 | 기본 | — | 확인 — 페이지가 `imageUrl()` 로 넘기는 데이터 |

- 별·월계수는 키트 규칙대로 `<svg>` JSX 로 그리고 경로·크기는 파일 그대로, 색은 `text` 토큰(`currentColor`). SVG 를 `<img src>` 로 쓰지 않는다. 장식이라 `aria-hidden`(옆에 글자가 있음).
- 사진은 부품이 파일을 import 하지 않고 `imageSrc` 로 받는다(의존 방향 pages → components).

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `imageSrc` / `imageAlt` | 812:12285 | 없음 / ""(장식, Q-08) | 103×103 사진. 없으면 빈 칸 | — | Q-03·Q-08 추천안 채택 |
| `title` | 812:12288 "STAY 2572" | 문자열 | `<h2>` 이름(Q-07) | — | Q-03 추천안 채택 |
| `rating` / `badge` | 812:12296 "4.98 (487)" / 812:12302 "Guest favourite" | 문자열 | 별 + 글자 / 월계수 + 글자 | — | Q-03 추천안 채택 |
| `cancellationTitle` / `cancellationText` | 812:12305 / 812:12308 | "Free cancellation" / "Cancel before 21 January for a full refund." | 굵은 줄 + 설명 | — | Q-03 추천안 채택 |
| `policyLabel` / `onPolicyClick` | 812:12310 "Full policy" | "Full policy" | 설명 뒤 `Button variant="text" size="small"`, 콜백만 | Button(`type="button"`), Tab | Q-02·Q-03 |
| `dates` / `onChangeDates` | 812:12319·812:12321·812:12316 | "22–24 Jan 2027" | "Dates" 줄 + `Button variant="ghost" size="small"` "Change", 콜백만 | 같음 | Q-02·Q-03 |
| `guests` / `onChangeGuests` | 812:12332·812:12334·812:12329 | "1 adult" | "Guests" 줄 + `Button variant="ghost" size="small"` "Change", 콜백만 | 같음 | Q-02·Q-03 |
| `priceLine` / `priceAmount` | 812:12343 / 812:12345 | "2 nights x £170.46" / "£340.91" | 양 끝 정렬 금액 줄 | — | Q-03 추천안 채택 |
| `total` / `currency` / `onCurrencyClick` | 812:12357 / 812:12355 "GBP" | "£340.91" / "GBP" | 합계 줄, `Button variant="text" size="small"` "GBP" 콜백만 | 같음. 읽기 이름 `aria-label="Current currency: GBP. Change payment currency"`(Figma 이름) | Q-02·Q-03 |
| `breakdownLabel` / `onBreakdownClick` | 812:12361 "Price breakdown" | "Price breakdown" | 글자 폭 `Button variant="text" size="small"`, 콜백만 | 같음 | Q-02·Q-03 |
| `className` | 키트 관례 | — | 루트에 붙음(배치용) | — | Q-03 추천안 채택 |

- 고정 글자("Dates", "Guests", "Price details", "Total", "Change")는 Figma 문구 그대로 부품 안에 둔다(바꿀 근거 없음).
- 루트: `<section class="ds-reservationsummary" data-testid="ds-reservationsummary" aria-labelledby={이름 id}>`. 이 부품 CSS 는 자기 `ds-reservationsummary__*` 래퍼만 꾸미고 `.ds-button` 을 선택하거나 `style`·`className` 으로 바꾸지 않는다(R05). 버튼 자리(오른쪽 위·글자 흐름 안)는 래퍼 배치로만 정한다.

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 범위: 카드 812:12281 만인지, 오른쪽 열 812:12280 전체인지 | **A (추천)** 카드만, 띠는 페이지가 `Callout` 으로 · B 열 전체 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | "Change" 와 밑줄 글자 버튼을 그릴 키트 부품이 없음(스펙 C03) | A Button 개정 · B 이 부품 안에서 직접 · C Link | 사용자 결정 "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26) → Buttons revision 2(에이전트 F)의 `variant="ghost"`("Change")·`variant="text"`(Full policy·GBP·Price breakdown)를 쓴다. 이 부품은 버튼을 그리지 않는다 | resolved |
| Q-03 | 공개 API(8절)와 동작: 버튼 5개는 `<button type="button">` + 콜백만, `href="#"` 없앰, Price breakdown 누름 영역은 글자 폭, GBP 읽기 이름은 Figma 이름 | **A (추천)** 8절 표대로 · B 고정 글자도 prop · C 다른 API | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | "Change" hover #E8E8E8 은 페이지 CSS 에만 있음 | A 없앰 · B 유지 | 사용자 결정 "Button 에 공용 모양 추가" (chosen in chat, 2026-11-26) → Button ghost 의 hover = Neutral 02 #EBEBEB(`control-bg-subtle-hover`, #E8E8E8 의 대응) | resolved |
| Q-05 | "Change" 바탕 #F2F2F2 의 역할이 없었음 | A 새 매핑 · B 다른 기존 색 | 사용자 결정 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → #F2F2F2 는 Figma 변수 "Fills - Vibrant/Tertiary" 로 가져와짐 → `control-bg-subtle`, Button ghost 안에서 씀 | resolved |
| Q-06 | 토큰에 없는 값: 굵기 600, 자간 -0.4395px·-0.1504px, 굵기 500, 모서리 24 | A 새 토큰 · B Figma 글자 스타일 값 | 사용자 결정 "Figma 스타일 값으로 맞춤" + "지금 크기·자간 유지 (권장)" (chosen in chat, 2026-11-26) → 600 은 590 Semibold 토큰, 500 은 `--font-weight-medium`, 자간·모서리는 `calc(var(--spacing) * n)`(6절) | resolved |
| Q-07 | 제목 단계: 현재 "STAY 2572" h3, "Price details" 일반 글자. Figma 레이어 이름은 둘 다 "Heading 2" | **A (추천)** 둘 다 `<h2>` · B 현재대로 · C 둘 다 h3 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | 사진 대체 글: 지금 `alt="STAY 2572"` 는 옆 제목과 같아 두 번 읽힘 | **A (추천)** `imageAlt=""` · B 숙소 이름 · C 다른 문구 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 390×519 카드, 투명 바탕·흰 캔버스, 현재 페이지와 같은 좌표(5절). 소제목 굵기만 600 → 590(사용자 결정) | Storybook iframe(390 칸)·`/checkout` 나란히 DOM 측정·스크린샷 | |
| 모든 상태·크기 | 칸 높이 103·40·1·44·1·44·1·123, 간격 16, 사진 103 모서리 8, Change 76×32 | DOM 측정 | |
| 아이콘과 노출 조건 | 별·월계수 12×12, #222, `<svg>`(img 아님) | DOM·스크린샷 대조 | |
| 클릭·입력·선택 등 기능 | 버튼 5개 각각 콜백 1회, 주소·스크롤 변화 없음 | Storybook play `fn()` + `userEvent.click` | |
| disabled / Tab / Focus | Tab: Full policy → Change → Change → GBP → Price breakdown, 모두 `<button type="button">` | play `userEvent.tab`, `getByRole("button")` | |
| 접근성 | 제목 h2 두 개, 사진 alt "", GBP 읽기 이름 | play 접근성 이름 검사 | |
| Nested parts identity | `ds-button` 5개(ghost 2·text 3)가 `ds-reservationsummary` 안에 렌더 | `ai:verify` DOM | |
| Nested part → composite callback | 버튼 5개 클릭이 각 콜백으로 이어짐 | play `fn()` | |
| 공통 규칙 및 기존 사용처 | 토큰만, `.ds-button` 선택자 없음 | `pnpm ai:check ReservationSummary`, `pnpm ai:verify ReservationSummary`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 대조를 따로 기록한다. 아직 수행한 검사는 없다.

### Button 에 필요한 모양 (Buttons revision 2, 에이전트 F 에게 — 현재 페이지 측정값)

| 버튼 | 변형 | 크기·여백 | 글자 | 바탕·모서리·hover | 아이콘 |
|---|---|---|---|---|---|
| "Change" ×2 | `ghost` | 높이 32, 좌우 16(폭은 글자대로 ≈76, Figma 75.94), 테두리 없음, 글자 가운데 | 12px / 500 / 자간 없음 / #222 `text`, 글자 상자 높이 16(Figma) | `control-bg-subtle` #F2F2F2, 모서리 8 `--radius-md`, hover `control-bg-subtle-hover` #EBEBEB | 없음 |
| "Full policy" · "GBP" · "Price breakdown" | `text` | 여백 0, 바탕·테두리 없음, 글자 폭(64.83·28.06·≈105 × 18), 문장 안에 이어 놓임(GBP 는 "Total" 과 기준선 맞춤) | 14px / 500 / 줄 높이 18 / 자간 -0.1504px / #222 `text` / 밑줄(브라우저 기본 두께·위치) | 없음, hover 변화 없음 | 없음 |

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정:
  - Q: 열린 질문 약 100개를 어떻게 답할까요? → A: 추천안 모두 채택 (권장) (chosen in chat, 2026-11-26) — Q-01·Q-03·Q-07·Q-08
  - Q: Figma 변수·스타일이 아닌 값은? → A: Figma 스타일 값으로 맞춤 (chosen in chat, 2026-11-26) — Q-05·Q-06
  - Q: 글자 크기·자간은? → A: 지금 크기·자간 유지 (권장) (chosen in chat, 2026-11-26) — Q-06
  - Q: 공용 버튼은? → A: Button 에 공용 모양 추가 (권장) (chosen in chat, 2026-11-26) — Q-02·Q-04
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 이 계획 승인, Buttons revision 2(`ghost`·`text`) 승인·구현, 리드 tokens revision 6 적용(`control-bg-subtle`·`control-bg-subtle-hover` — Button 이 씀).
