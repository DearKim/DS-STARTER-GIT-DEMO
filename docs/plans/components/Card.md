---
kind: component
component: Card
revision: 2
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=238-2378&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Card (Card type 5종)

> 작성: Claude Code, 2026-11-26. 근거: `docs/plans/design-system-airbnb.md` 1단계 목록과 사용자 결정 Q-02("Card 하나에 type", chosen in chat). Q&A 는 사용자가 "추천안 모두 채택"을 골라 모두 답을 받았다(2026-11-26). 계획 승인은 아직이다. 사용자 승인 전 구현 파일을 수정하지 않는다.
>
> **revision 2 (2026-11-26, 사이트 재정립 계획 단계 에이전트 D):** Detail 페이지의 예약 상자와 "Where you'll sleep" 침실 카드를 이 Card 로 그리기 위한 변경만 §12 에 적었다. §1~§11 은 revision 1 에서 승인된 내용 그대로이며, §12 의 변경이 승인되기 전까지 §8 표가 현재 계약이다. 새 질문 Q-18~Q-25 는 §9 끝에 있고, 사용자가 "추천안 모두 채택 (권장)"과 결정 2~4(리드 업데이트 2026-11-26)로 모두 답했다. 계획 승인은 아직이며, 사용자 승인 전 구현 파일·페이지를 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Figma `Card` 세트(238:2378)의 Card type 가운데 Default 를 뺀 5종(Sleep·Reservation·Reservation Confirmation·Discount·Map)을 키트의 `Card` 한 부품의 `type` prop 으로 만든다. Default Card(238:2494)는 승인된 `ListingCard` 가 그대로 맡는다(Q-01). 기존 `src/components/Card`(키트 기본 상자)를 그 자리에서 고친다(R05). 페이지는 이 계획에서 고치지 않는다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, 2026-11-26 Figma Desktop MCP 직접 조회(캐시 아님).
  - 첫 조회 10회: `get_metadata` 238:2378 · 238:2379 · 238:2383 · 238:2420 · 238:2461 · 238:2517, `get_design_context` 238:2378(세트 전체 6종 코드+스크린샷) · 238:2418, `get_variable_defs` 238:2378 · 238:2383.
  - 리드 조회: 문서 전체 `get_metadata 0:0`(인스턴스 원본 이름, 리드 브리프 4절).
  - 추가 2회(이 revision): `get_design_context` 72:1406 — 300초 무응답으로 실패, `get_variable_defs` 72:1406 — 빈 값 `{}`.
- 대상 코드·토큰 기준 버전: git-demo `f3aed50`(브랜치 HEAD). `src/tokens/tokens.css` 는 리드가 Colors 245:3518 · Typography 245:3517 · Elevation 245:3354 를 다시 가져와 만든 현재본(추가만, 기존 값 변화 없음). 색 역할은 토큰 계획 `docs/plans/tokens.md` revision 4(approved) + 리드가 모으는 revision 5(새 역할). `.claude/rules/design-tokens.md` 의 목록(gray-50 등)은 실제 토큰과 다르므로 쓰지 않고 `tokens.css` 를 기준으로 했다.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 238:2378 의 variant 축은 `Card type` 하나, 값 6개. 종류마다 내용·크기가 완전히 다름(§5) | 숙소 정보를 보여 주는 카드 묶음. `type` 은 시각 상태가 아니라 **카드 종류**(지속 구조)라 prop 으로 둔다. Default 는 ListingCard | 확정 — Q-01·Q-15 추천안 채택 |
| 누를 수 있는 영역 | Discount·Map: 하트 frame(24×24). Map: 닫기 Group 12(원 + `clear`). Reservation: `gradient` 인스턴스 "Reserve". 날짜·인원 칸, 밑줄 글자는 모양만 있음 | 하트·닫기·Reserve 만 실제 `<button>`. 날짜 칸·밑줄 글자는 보여 주기만, 카드 전체 링크 없음 | 확정 — Q-04·Q-06·Q-07 추천안 채택 |
| 클릭/선택/열림 동작 | Card 의 어느 종류에도 눌림·선택·열림 모양 없음. `gradient` 원본 세트(72:1406)에는 Property 1 = hover 변형이 있음(값은 Figma 에서 읽지 못함, §5) | 하트·닫기는 콜백만 부르고 모양은 바꾸지 않는다. Reserve 는 콜백 + `:hover` 에서 Primary 버튼 hover 와 같은 채움 | 확정 — Q-04·Q-06 추천안 채택, Q-16 사용자 결정 |
| 키보드·포커스 범위 | Focus 변형 없음 | 버튼(하트·닫기·Reserve)만 Tab 으로 잡히고 브라우저 기본 포커스 링을 쓴다 | 확정 — Q-06 추천안 채택 |
| disabled 동작 | Disabled 변형 없음 | disabled 모양·스토리를 만들지 않는다. 버튼의 네이티브 속성 전달은 기본 계약으로 유지 | 확정 — Q-15 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트 / 공개 import / 사용처:
  - `src/components/Card/` — 키트 기본 상자. `CardProps extends HTMLAttributes<HTMLDivElement> { children?: ReactNode }`, `forwardRef<HTMLDivElement>`, 루트 `<div class="ds-card" data-testid="ds-card">`. CSS: 테두리 1px `--color-border`, 모서리 `--radius-lg`, 안쪽 여백 16, `--color-surface-raised` 배경, `--shadow-sm`. Figma 근거 없음(샘플 노드 0:5400).
  - `Card.stories.tsx`·`Card.figma.tsx` 는 생성물(`@ds-generated`, Figma `SAMPLEKEY123` 0:5400). 고치면 생성기가 충돌로 보고하고 보존한다.
  - 사용처: `my-website/pages/HomePage.tsx:3` 이 `import { Card } from "@/components/Card"` 만 하고 그리지 않는다. `src/docs/CATALOG.md`(생성물)에 import 문구. `src/docs/foundation/*.stories.tsx` 의 `Card` 는 `./ui` 의 다른 함수라 무관.
  - `src/components/ListingCard/` — Default Card(238:2494) 구현(승인 rev 3). 이 계획은 건드리지 않는다(Q-01 B).
- 기존 props·stories에서 확인한 지원 범위: 기본 Card 는 `children` 상자 하나, 변형 없음. stories 는 Default 하나.
- 기존 원본 수정 또는 새 부품이 필요한 이유: 사용자 결정 Q-02(rollout)가 "Card 하나에 type"이고 R05 가 같은 역할의 새 부품(`ReservationCard` 등)을 금지한다. 그래서 `Card` 를 그 자리에서 고친다.
- 공개 API 변화(확정, Q-02·Q-15):
  - 새 prop `type`(필수, 5종)과 종류별 내용 prop(§8).
  - `children` 상자와 그 모양(여백 16, `--color-surface-raised`, `--shadow-sm`)을 없앤다.
  - `ref`·`className`·나머지 HTML 속성 전달은 유지.
- 변경할 파일: `src/components/Card/Card.tsx`·`Card.css`·`Card.stories.tsx`(생성물 충돌 보고 예상)·`Card.figma.tsx`(Figma URL 을 238:2378 로)·`index.ts`(타입 export). 메달 PNG 를 쓰므로 Card 폴더 안의 그림 파일 1개(Q-13).
- 승인된 변경에서 영향받는 기존 사용처: HomePage 의 사용하지 않는 import 는 이름 `Card` 가 남으므로 깨지지 않는다(타입 검사로 확인). `src/docs/CATALOG.md`·Overview 는 파이프라인이 다시 만든다. `.ds/descriptions.json` 의 Card 설명("A surface that groups related content.")은 사람 소유라 고치지 않고 낡은 문장으로 보고만 한다.
- 비슷한 모양이 있는 우리 사이트(자유 모드 페이지, 이 계획에서 바꾸지 않음):
  - Detail 예약 상자(`DetailPage.tsx` 약 370~420줄). Figma Detail 화면은 여기에 Card 인스턴스 812:8724(373×532 = Reservation Card 크기)를 쓴다. Detail 의 CHECK-IN 칸 모양은 Figma 와 다르다(rollout §6).
  - Detail "Where you'll sleep" 침실 카드(`DetailPage.tsx:470~485`). Figma 는 Card 인스턴스가 아니라 frame(812:11250 등, 318.66×212.44 — Sleep Card 319×212 와 비슷).
  - Checkout 예약 요약(`CheckoutPage.tsx:210~` "Price details"). Checkout Figma 레이어에 Card 인스턴스 없음.
  - Home "Your reservation"(`HomePage.tsx:140~146`)은 Figma 에서 Callouts(Cancelation) 인스턴스다(rollout §6). Card 가 아니라 Callout 계획에 해당한다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| `gradient` (238:2418, "Reserve") | Internal Only Canvas 의 component set "gradient" (72:1406, Property 1 = hover / default) | 응답에 Property 1 값 없음. 채움 스타일 Gradient 02(= Primary Default 238:2164 와 같은 스타일) → default 로 해석 | 238:2383 Reservation Card | none — Card 안에서 `<button>` 으로 그린다: 325×51, 안쪽 16/24, 모서리 8, 채움 `--gradient-selfmake-1`(Gradient 02), "Reserve" 16pt Regular `--color-on-primary`. 모양은 Primary 버튼 그라데이션과 같음(키트에 "gradient" 부품 없음) | confirmed |
| `clear` (238:2541, Map 의 frame Group 12 238:2539 안) | Internal Only Canvas 의 component "clear" (223:1489, 12×12) | — (변형 없음) | 238:2517 Map Card | none — Card 안에서 Figma SVG(Group 12: 원 + X, MCP fd9e4b42…)로 그린 닫기 `<button>` 안의 그림(키트에 "clear" 부품 없음) | confirmed |
| — (모든 글자) | — | — | 5종 전체 | none — Card 안에서 글자로 만든다(Text 의 variant body·body-sm·title 에 SF Pro 10·12·14·16·22pt 스타일이 없음) | confirmed |
| — (revision 2: Detail 화면 Button frame 812:7557 "리스팅 신고하기", Card 인스턴스 812:8724 밖의 형제) | — (frame, 인스턴스 아님) | — | revision 2 `type="reservation"` 의 `reportLabel` | `Button { variant="text", size="medium", tone="secondary", icon=<깃발 svg>, onClick=onReportClick }` — Buttons revision 2 §12.7(에이전트 F)의 `text` 모양 (근거: Q-22(결정 4). Buttons revision 2 승인·구현 뒤 사용) | confirmed |
| — (revision 2: 깃발 812:7560, 16×16) | — | — | 위와 같음 | none — Card 안에서 `my-assets/images/detail-icon-flag.svg` 의 경로로 그린 `<svg fill="currentColor" aria-hidden>` 을 Button `icon` 으로 넘김(키트 Icon 에 깃발 없음) (근거: Q-22) | confirmed |

- Confirmed absence of nested instances and evidence: `get_metadata` 로 읽은 238:2379(Sleep), 238:2383(Reservation), 238:2420(Reservation Confirmation), 238:2461(Discount), 238:2517(Map)의 인스턴스는 위 두 개뿐이다. 하트(238:2465·238:2537)·사진 점(238:2485·238:2519)·Superhost 배지(238:2463)·별·aircover 로고(238:2436)·메달(238:2456)은 frame/vector/이미지이며 인스턴스가 아니다(§7). Default(238:2494)는 범위 밖(Q-01, ListingCard).
- Card 세트의 **Sleep Card(238:2379)는 회색 사진 + 글자 2줄뿐이고, Sleep Areas 아이콘(234:3680)·Property Type 아이콘(234:3911)을 쓰지 않는다.** 아이콘이 있는 침실 카드는 Tiles 탭의 다른 원본 "Sleep Card"(234:3666)이며 이 계획의 범위가 아니다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 238:2379 Sleep Card 319×268 | metadata + 세트 design_context | 지속: 카드 종류 | 카드 전체 | 사진 + 제목 + 설명. fill·그림자 없음 | 없음 | `type="sleep"` | 확정 |
| 238:2461 Discount Card 324×429 | metadata + 세트 design_context | 지속: 카드 종류 | 카드 전체 | 사진 + 배지 + 하트 + 점 + 글자 4줄 + 할인 가격 줄 + 별점(후기 수). fill·그림자 없음 | 하트·별·점·구분점 | `type="discount"` | 확정 |
| 238:2517 Map Card 327×289 | metadata + 세트 design_context | 지속: 카드 종류 | 카드 전체 | 사진 + 아래 흰 패널 + 하트 + 닫기 + 점. 그림자 | 하트·닫기·별·점·구분점 | `type="map"` | 확정 |
| 238:2383 Reservation Card 373×532 | metadata + 세트 design_context + variable_defs 238:2383 + design_context 238:2418 | 지속: 카드 종류 | 카드 전체 | 흰 바탕·테두리·그림자, 가격 머리줄, 날짜·인원 칸, Reserve, 금액 줄 | 별·구분점 | `type="reservation"` | 확정 |
| 238:2420 Reservation Confirmation Card 477×509 | metadata + 세트 design_context | 지속: 카드 종류 | 카드 전체 | 흰 바탕·테두리·그림자, 작은 사진 + 숙소 정보, aircover 줄, Price details 금액 줄 | 별·구분점·메달(PNG)·aircover 로고 | `type="reservation-confirmation"` | 확정 |
| Reserve(238:2418) 기본 | design_context 238:2418 | 기본 | Reserve 버튼 | Gradient 02 채움, 흰 글자 | 없음 | 기본 렌더 | 확정 |
| Reserve hover — 원본 세트 72:1406 의 Property 1 = hover | Figma 에서 읽지 못함(이 계획의 `get_design_context` 72:1406 300초 무응답·`get_variable_defs` 72:1406 `{}`, 리드의 72:1401 조회도 전송 끊김 2회·`{}`). 값은 사용자 결정 Q-16 | 포인터 올림(`:hover`) | Reserve 버튼 | 채움만 Gradient 03(= Primary Hover 238:2156 의 스타일, `--gradient-selfmake-2`). 크기·글자·모서리는 기본과 같음 | 없음 | `.ds-card__reserve:hover` | 확정 — 사용자 결정(Figma 에서 읽은 값 아님) |

- Focus 링이 감싸는 정확한 범위와 근거: Figma 에 Focus 변형 없음. 하트·닫기·Reserve 버튼에만 브라우저 기본 포커스 링(ListingCard 와 같은 접근성 기본값).
- Figma에 실제로 없는 상태·조합: 모든 카드 종류의 hover·pressed·focus·disabled·선택, 하트 채움, 숨김 레이어(Discount 238:2492 두 번째 Superhost 배지) — 만들지 않는다.
- 미조회/실패/잘린 응답과 필요한 추가 조회: `gradient` 원본 세트 72:1406 의 hover 변형은 끝내 Figma 에서 읽지 못했다. Reserve 를 Card 안에서 그리기로 했으므로(Q-03) 그 hover 도 이 카드의 상태라(R02) 사용자에게 물었고, 사용자가 "Primary 버튼 hover 와 같게"를 골랐다(Q-16). 이 값은 **사용자 결정이며 Figma 에서 읽은 값이 아니다.** 이 결정으로 `facts_complete: true`. Map Card 루트 그림자의 스타일 연결은 노드별로 확인하지 않았지만 값이 `--shadow-elevation-03` 과 같아 구현에 영향이 없다.

### 크기·간격 (Figma 값 → CSS 해석)

간격은 모두 `calc(var(--spacing) * n)` 으로 쓴다. 4의 배수가 아닌 값(21·19·2)은 원본 그대로 소수 배수(예 5.25)로 적는다. 1px 구분선은 원본 SVG 와 같은 값의 CSS border 로 그린다(Q-15 추천안 채택).

**Sleep (238:2379)** — 카드 fill 없음

| 요소 | Figma 값 |
|---|---|
| 사진 Rectangle 5 (238:2380) | 319×212, 모서리 12, #B0B0B0 |
| 제목 "Bedroom 2" (238:2382) | 사진 아래 16, SF Pro **Medium 510** 16px, #222222, 줄 높이 normal(19) |
| 설명 "2 single beds" (238:2381) | 제목 아래 4, 14pt Regular, #5E5E5E |

**Discount (238:2461)** — 카드 fill 없음

| 요소 | Figma 값 |
|---|---|
| 사진 image (238:2462) | 324×308, 모서리 12, #B0B0B0 |
| 배지 superhost / badge (238:2463) | 왼쪽 위 16·16, 88×25, 흰 바탕, 안쪽 4/8, 모서리 4, "Superhost" 14pt Semibold #222222 |
| 하트 (238:2465) | 24×24, 오른쪽 위 16·16 |
| 사진 점 ellipses (238:2485) | 49×6, 사진 아래 끝에서 8, 가운데(x 138 — 정확한 가운데는 137.5) |
| 글 묶음 Location / Dates (238:2467) | 사진 아래 16, 세로 간격 8. Info(238:2468) 간격 4 |
| Info | "Private room in San Francisco" 14pt Semibold #222222 / "Private Room & Balcony-Connected..." · "1 queen bed" · "Oct 23 - 28" 14pt Regular #5E5E5E. 말줄임표 "..." 는 글자 자체(Figma 에 자르기 설정 없음, nowrap) |
| 가격 줄 price (238:2473) | 가로 간격 4: 원래 가격 "$289" 14pt Semibold #5E5E5E + 취소선(1px #5E5E5E, 글자 위에서 9, 폭 37) / "$289"(14pt Semibold) + " night"(14pt Regular) #222222 / 구분점 2×2 #5E5E5E / "$120 total" 14pt Regular #5E5E5E |
| 별점 star / price (238:2481) | 글 묶음과 같은 높이, 간격 4: 별 16 + "4.91" + "(484)" 14pt Regular #222222. x 235 + 폭 90 = 325 로 카드(324)보다 1px 넘침 → 카드 오른쪽 끝 정렬로 해석 |

**Map (238:2517)** — 그림자

| 요소 | Figma 값 |
|---|---|
| 카드 | 327×289, 그림자 0 6 16 0 #0000001F(MCP 출력은 루트의 `drop-shadow(0 6px 8px rgba(0,0,0,0.12))` — CSS filter 의 값은 반지름의 절반), 모서리 12 |
| 사진 Rectangle 9 (238:2518) | 327×289 전체, 모서리 12, #B0B0B0. 아래 78 은 패널이 덮음 |
| 패널 Rectangle 10 (238:2526) | y 211, 327×78, 흰색, 아래 모서리 12 |
| 사진 점 (238:2519) | 49×6, 패널 위 12(y 193), 가운데 |
| 하트 (238:2537) | 24×24, 오른쪽 위 16·16 |
| 닫기 Group 12 (238:2539) | 24×24, 왼쪽 위 16·16: 원 24 #222222 30% + `clear` 12×12(흰 X) |
| 글 묶음 (238:2527) | 패널 안 16·16, Info 간격 12: "Groveland, California" 14pt Semibold #222222 / 가격 줄 간격 4: "$289"(Semibold)+" night"(Regular) #222222, 구분점 #5E5E5E, "Apr 17-22" 14pt Regular #5E5E5E |
| 별점 (238:2534) | 패널 안 위 16, 오른쪽 16: 별 + "4.91" 14pt Regular #222222 |

**Reservation (238:2383)** — 루트 그림자(Elevation 03 연결 확인)

| 요소 | Figma 값 |
|---|---|
| 바탕 Rectangle 1 (238:2384) | 373×532, 흰색, 테두리 1px #DDDDDD, 모서리 12. 안쪽 여백 24 |
| 머리줄 | "$500"(238:2397) 22pt Semibold #717171 + 취소선(2px #717171, 위에서 13, 폭 57) / 간격 4 / "$440" 22pt Semibold #222222 + 간격 4 + "night" 16pt Regular #222222(글자 기준선 정렬) / 오른쪽 끝(238:2403, y 30): 별 16 + "4.99" 14pt Regular #222222, 구분점 2×2 **#222222**, "337 reviews" 14pt Regular #5E5E5E(간격 4) |
| 날짜·인원 칸 | 머리줄 아래 24(y 74). Rectangle 3(238:2416) 162.5×56 테두리 1px #717171 왼쪽 위 모서리 12 / Rectangle 4(238:2417) 163×56 위·오른쪽·아래 테두리 1px #717171 오른쪽 위 모서리 12 / Rectangle 2(238:2409, vector) 325×56 y 129(위 칸과 1px 겹침) 안쪽 선 1px #717171 아래 모서리 12. 칸 안 여백 12, 이름 → 값 간격 2 |
| 칸 글자 | "CHECK-IN"·"CHECKOUT"·"GUESTS" 10pt Semibold(Mirco Text) #222222 / "2/6/2023"·"2/11/2023"·"1 guest" 14pt Regular #5E5E5E |
| Reserve (238:2418) | 칸 아래 19(y 204), 325×51, 안쪽 16/24, 모서리 8, Gradient 02 채움, "Reserve" 16pt Regular 흰색 |
| 안내 "You won’t be charged yet" (238:2385) | 버튼 아래 21, 가운데, 14pt Regular #5E5E5E |
| 금액 줄 4개 | 안내 아래 24, 줄 간격 16: "500 x 5 nights"·"Long stay discount"·"Cleaning fee"·"Service fee" 16pt Regular Underlined #222222 / 오른쪽 끝 "$2,500"·**"-$300"(#008A05)**·"$200"·"$0" 16pt Regular |
| 구분선 Line 17 (238:2419) | 마지막 줄 아래 24, 325×1 #DDDDDD |
| 합계 | 구분선 아래 24: "Total before taxes" 16pt Semibold #222222 / "$2,400" **16pt Regular** #222222. 아래 여백 24 |

**Reservation Confirmation (238:2420)** — 바탕 사각형 그림자

| 요소 | Figma 값 |
|---|---|
| 바탕 Rectangle 1 (238:2421) | 477×509, 흰색, 테두리 1px #DDDDDD, 모서리 12, box-shadow 0 6 16 0 rgba(0,0,0,0.12). 안쪽 여백 24 |
| 사진 Rectangle 8 (238:2460) | 124×106, 모서리 12, #B0B0B0 |
| 숙소 정보(사진 오른쪽 12) | "Entire cabin"(238:2459) **12px Regular** #717171 / 간격 4 / "Glacier Pines Cabin (New Hot Tub Installed!)"(238:2458) 14pt Regular #222222 / 사진 아래 끝에 맞춘 줄(238:2447) 간격 8: [별 + "4.66" #222222, "(110 reviews)" #5E5E5E] · 구분점 #5E5E5E · [메달 16×16(흰 frame 안 12×15 PNG) + "Superhost" #5E5E5E], 모두 14pt Regular |
| 구분선 3개 Line 18·19·20 (238:2445·238:2446·238:2425) | 429×1 #DDDDDD, 위·아래 간격 24 |
| 보호 줄 Group 11 (238:2434) | "Your booking is protected by" 14pt Regular #5E5E5E + 간격 4 + aircover 로고 67×14 |
| 제목 "Price details" (238:2433) | 22pt Semibold #222222 |
| 금액 줄 4개 | 제목 아래 24, 줄 간격 16: "500 x 5 nights"·"Long stay discount"·"Cleaning fee"·"Service fee" 16pt Regular Underlined #222222 / 오른쪽 "$2,500"·"$2,500"·"$200"·"$0" 16pt Regular #222222(두 번째 금액도 Figma 문구 그대로 "$2,500") |
| 합계 | "Total (USD)" · "$2,400" 둘 다 16pt Semibold #222222. 아래 여백 24 |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 사진 자리(5종) | #B0B0B0 / Neutral 06 | neutral-06 | `image-placeholder` | #B0B0B0 | 일치 | — |
| 기본 글자·별·금액 | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| 구분점(Reservation 238:2407) | #222222 (SVG) | shade-02 | `text` | #222222 | 일치 | 같은 줄 글자 사이 점 |
| 장소·날짜·후기 수·안내 글자, 취소선(Discount) | #5E5E5E / Neutral 08 | neutral-08 | `text-tertiary` | #5E5E5E | 일치 | — |
| 구분점(Discount·Map·Reservation Confirmation) | #5E5E5E (SVG) | neutral-08 | `text-tertiary` | #5E5E5E | 일치 | — |
| "$500"·취소선(Reservation), "Entire cabin" | #717171 / Neutral 07 | neutral-07 | `text-secondary` | #717171 | 일치 | — |
| 날짜·인원 칸 테두리(238:2416·238:2417·238:2409) | #717171 / Neutral 07 | neutral-07 | `border-field`(새 역할) | #717171(적용 뒤) | 일치 | Q-09 추천안 채택. 리드가 토큰 계획 revision 5 에 추가(합친 목록 이름 그대로) |
| "-$300" (238:2392) | #008A05 / Discounts | `discounts`(가져옴, `--color-discounts` #008A05) | `text-discount`(새 역할) | #008A05(적용 뒤) | 일치 | Q-08 추천안 채택. 리드가 토큰 계획 revision 5 에 추가. `success` 는 자리표시 #FFFFFF 라 쓰지 않음 |
| 카드 바탕(Reservation·Reservation Confirmation), Map 패널 | #FFFFFF / Shade 01 | shade-01 | `surface` | #FFFFFF | 일치 | 토큰 계획 근거 "Card surface" |
| 카드 테두리, 구분선 | #DDDDDD / Neutral 03 | neutral-03 | `border` | #DDDDDD | 일치 | — |
| Superhost 배지 바탕(238:2463) | #FFFFFF / Shade 01 | shade-01 | `surface` | #FFFFFF | 일치 | Q-10 추천안 채택 |
| 메달 뒤 frame(238:2455) | #FFFFFF | shade-01 | `surface` | #FFFFFF | 일치 | 흰 카드 위 흰 칸(Q-13 추천안 채택) |
| 하트 속(Discount·Map) | #222222 alpha 0.3 / Shade 02 - 30% | shade-02 | `text` + `fill-opacity: 0.3` | #222222 @30% | 일치 | ListingCard 와 같은 방식. `shade-02-30` primitive 는 alpha 가 빠져 쓰지 않음 |
| 하트 테두리, 현재 사진 점, 닫기 X | #FFFFFF / Shade 01 | shade-01 | `on-image` | #FFFFFF | 일치 | 사진 위 흰색 |
| 나머지 사진 점 | #DDDDDD / Neutral 03 | neutral-03 | `indicator` | #DDDDDD | 일치 | — |
| 닫기 원(Group 12) | #222222 alpha 0.3 (SVG) | shade-02 | `text` + `fill-opacity: 0.3` | #222222 @30% | 일치 | 하트 속과 같은 값 |
| aircover 로고 | #222222 ×5 경로, #FF385C ×3 경로 / Primary 02 | shade-02, primary-02 | `text`, `primary` | #222222, #FF385C | 일치 | Q-13 추천안 채택(원본 경로의 `<svg>` JSX, 색은 토큰) |
| Reserve 바탕 | Gradient 02 | — | layout `--gradient-selfmake-1` | 같은 정지점·같은 상대 변환(325×51 / 40×40 비율 일치) | 일치 | 리드 확인: Gradient 02 = `--gradient-selfmake-1` |
| Reserve 바탕 `:hover` | Gradient 03(사용자 결정 Q-16, Figma 72:1406 hover 는 읽지 못함) | — | layout `--gradient-selfmake-2` | Primary Hover 238:2156 과 같은 값 | 사용자 결정 | Figma 에서 읽은 값이 아님 |
| Reserve 글자 | #FFFFFF / Shade 01 | shade-01 | `on-primary` | #FFFFFF | 일치 | 브랜드 채움 위 글자 |

그림자

| 요소 | Figma 원본 값 / 스타일 | 토큰 | 대응 |
|---|---|---|---|
| Reservation 루트(238:2383) | DROP_SHADOW #0000001F, (0, 6), radius 16, spread 0 / **Elevation 03**(238:2383 variable_defs 에서 연결 확인) | `--shadow-elevation-03: 0px 6px 16px 0px #0000001F` | 일치 |
| Reservation Confirmation Rectangle 1(238:2421) | box-shadow 0 6 16 0 rgba(0,0,0,0.12) = Elevation 03 값 | `--shadow-elevation-03` | 일치 |
| Map 루트(238:2517) | MCP 출력 `drop-shadow(0 6px 8px rgba(0,0,0,0.12))` — Reservation 루트와 같은 출력, Elevation 03 값과 같음 | `--shadow-elevation-03` | 값 일치(노드별 스타일 연결은 미확인, 영향 없음) |

글자 (모든 토큰에 `--font-type-*`·`--font-weight-type-*`·`--tracking-type-*` 가 함께 있음)

| Figma 스타일 | 값 | 토큰 | 대응 |
|---|---|---|---|
| Body Copy/14pt Regular | 14 / 400 | `--text-type-body-copy-14pt-regular` | 일치 |
| Body Copy/14pt Semibold | 14 / 590 | `--text-type-body-copy-14pt-semibold` | 일치 |
| Body Copy/16pt Regular | 16 / 400 | `--text-type-body-copy-16pt-regular` | 일치 |
| Body Copy/16pt Semibold | 16 / 590 | `--text-type-body-copy-16pt-semibold` | 일치 |
| Header/22pt Semibold | 22 / 590 | `--text-type-header-22pt-semibold` | 일치 |
| Body Copy/16pt Regular Underlined | 16 / 400 + 밑줄(두께·위치 from-font, skip-ink none) | `--text-type-body-copy-16pt-regular-underlined` + CSS `text-decoration: underline` | 일치(Q-11 추천안 채택, 같은 이름의 토큰이 생겨 그것을 씀) |
| Mirco Text/10pt Semibold | 10 / 590 | `--text-type-mirco-text-10pt-semibold` | 일치(Q-12) |
| (스타일 연결 없음) "Entire cabin" | 12 / 400 | `--text-type-body-copy-12pt-regular` | 값 일치(Q-12, 리드 확인) |
| (스타일 연결 없음) "Bedroom 2" | 16 / Medium 510 | 크기 `--text-type-body-copy-16pt-regular`(16px) + 굵기 `--font-weight-type-body-copy-18pt-medium`(510) + 글꼴 `--font-type-body-copy-16pt-regular` | 값 일치(Q-17). 16pt Medium 스타일이 없어 굵기 토큰은 18pt Medium 스타일의 것을 쓴다 |

- 글꼴: 모든 글자 SF Pro → `--font-type-*`("SF Pro", var(--font-sans)). 줄 높이는 Figma 코드의 `leading-[normal]` 대로 `line-height: normal`(ListingCard 와 같음).
- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: Sleep·Discount 는 카드 자체 fill 없음(투명). Map 은 사진+흰 패널, Reservation·Reservation Confirmation 은 흰 사각형(`surface`)이 카드 바탕. 세트 프레임(238:2378) 배경은 스크린샷에서 연회색이며 컴포넌트 값이 아니다 — Storybook 캔버스 배경은 페이지와 같은 흰색으로 확인 예정.
- 같은 값의 후보가 여러 개일 때 선택 근거: #FFFFFF 는 `bg`·`surface`·`on-image`·`on-primary`·`info`·`success`·`warning` 가 같은 값. 카드·배지 바탕은 "Card surface" 근거의 `surface`, 사진 위 흰색은 `on-image`, 브랜드 채움 위 글자는 `on-primary`. `info`·`success`·`warning` 은 자리표시라 쓰지 않는다.
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: 색 역할 `border-field`(칸 테두리, 테두리 역할 중 #717171 없음)·`text-discount`(할인 금액, `success` 는 자리표시) — 리드가 토큰 계획 revision 5 에 쓴다. 글자 16/510 — 리드가 글자 계획에 쓴다. 이 계획은 `docs/plans/tokens.md` 를 고치지 않는다.
- 토큰 생성 경로·검증 계획: 토큰 계획 revision 5 승인 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens`. 글자는 `docs/templates/typography-plan.md` 경로. `pnpm ds:guard`(G10·G13)로 확인.

## 7. 원본 아이콘·asset

다운로드 위치(읽기 확인용, 프로젝트에 복사하지 않음): `<로컬 측정 폴더>/figma-assets/Card/`

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| heart 238:2465 · 238:2537 | MCP f68c3df5… (sha256 73d9e48c28c9), ListingCard 와 같은 파일 | 24×24, fill #222222 @0.3, stroke 흰색 2, round | Discount, Map | Sleep, Reservation, Reservation Confirmation | 확인 |
| Star 1 238:2482 · 238:2535 · 238:2405 · 238:2450 | MCP 962426c6… (sha256 e47569cc2491) | 13.99×13.36 를 16×16 칸 안(inset 4.19% 6.28% 12.34%), fill #222222 | Discount, Map, Reservation, Reservation Confirmation | Sleep | 확인 |
| ellipses 238:2485 · 238:2519 | MCP bee15707… (sha256 ea1389caf39f) 원 5개 cx 3·14·25·36·47, r 3·3·3·3·2 | 49×6, 1번 흰색, 2~5번 #DDDDDD. 고정(넘김 없음, Q-14) | Discount, Map | Sleep, Reservation, Reservation Confirmation | 확인 |
| 구분점 Ellipse 16 238:2407 | MCP 4a6bfa6b… (sha256 0645e486f8a3) | 2×2 원, #222222 | Reservation | 나머지 | 확인 |
| 구분점 238:2479 · 238:2532 · 238:2453 | MCP b3441974… (sha256 6dacd1c5aa87) | 2×2 원, #5E5E5E | Discount, Map, Reservation Confirmation | 나머지 | 확인 |
| 취소선 Line 16 238:2398 | MCP 75493c86… (sha256 952fa0b30c6f) | 57×2, stroke 2 #717171 | Reservation "$500" | 나머지 | 확인 |
| 취소선 Line 16 238:2477 | MCP 35cc5e2c… (sha256 c6118e280162) | 37×1, stroke 1 #5E5E5E | Discount "$289" | 나머지 | 확인 |
| 구분선 Line 17 238:2419 | MCP 25cd2d4f… (sha256 c8523ca0a17a) | 325×1, #DDDDDD | Reservation | 나머지 | 확인 |
| 구분선 Line 18·19·20 238:2445 · 238:2446 · 238:2425 | MCP 2b5ddf53… (sha256 5ac7ad45a152) | 429×1, #DDDDDD | Reservation Confirmation | 나머지 | 확인 |
| 인원 칸 Rectangle 2 238:2409 | MCP 34c6ec9b… (sha256 68c2362407dc) `M0 0H325V44C325 50.6274 319.627 56 313 56H12C5.37257 56 0 50.6274 0 44V0Z` | 325×56, 아래 모서리 12, stroke 2 를 자기 모양으로 mask → 안쪽 1px #717171 | Reservation | 나머지 | 확인 |
| 닫기 Group 12 238:2539 (+ `clear` 223:1489) | MCP fd9e4b42… (sha256 2683581e3fee): 원 r12 + X 경로 `M15.5 9.205L14.795 8.5L12 11.295…Z` | 24×24, 원 #222222 @0.3, X 흰색(12×12 clip, 6·6) | Map | 나머지 | 확인 |
| aircover 로고 238:2436 | MCP 77042ce2… (sha256 61eae9573354), 경로 8개 + clip | 67×14, fill #222222 ×5·#FF385C ×3 → `<svg>` JSX, 색은 `text`·`primary` | Reservation Confirmation | 나머지 | 확인 |
| 메달 image 7 238:2456 | MCP d1b1939c….png (sha256 47efc3871e52), **래스터 PNG 350×362 RGBA** | 16×16 흰 frame 안 12×15, 원본 자르기 h 121.05% · w 148.25% · left −20.79% · top −10.53% → 장식 `<img alt="">` | Reservation Confirmation | 나머지 | 확인 |

- 단색 SVG 는 `<svg>` JSX 로 그리고 색은 CSS 토큰으로 준다. 경로·크기는 원본 그대로. 메달은 원본 PNG 를 자르기 그대로 장식 그림으로, 로고는 원본 경로에 토큰 색(Q-13 추천안 채택).

## 8. 공개 API와 실제 기능

글자 기본값은 모두 Figma 문구 그대로. TypeScript 에서는 `type` 별로 받을 수 있는 prop 을 나누는 구조(구분 합집합)로 만든다.

> revision 2 에서 제안한 API 변경(`layout`, `reserveHref`, `reportLabel`·`onReportClick`)은 §12.7 에 있다. 승인 전까지 아래 표가 현재 계약이다.

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `type` | 238:2378 `Card type` 축 | 필수: `"sleep"` · `"discount"` · `"map"` · `"reservation"` · `"reservation-confirmation"` | 카드 종류에 맞는 구조를 그림. 클래스 `ds-card--<type>`. Default 는 ListingCard | — | 확정 — Q-01·Q-02 |
| `imageSrc` / `imageAlt` | 사진 자리 238:2380 · 238:2462 · 238:2518 · 238:2460 | 없음 / "" | 있으면 사진, 없으면 `image-placeholder` 바탕 | — | 확정 — Q-15 |
| `title` | 238:2382 · 238:2469 · 238:2529 · 238:2458 | sleep "Bedroom 2", discount "Private room in San Francisco", map "Groveland, California", reservation-confirmation "Glacier Pines Cabin (New Hot Tub Installed!)" | 굵기·크기는 종류별 Figma 값 | — | 확정 — Q-15 |
| `description` | 238:2381 | "2 single beds" | Sleep 둘째 줄 | — | 확정 — Q-15 |
| `details` | 238:2470 · 238:2471 · 238:2472 | ["Private Room & Balcony-Connected...", "1 queen bed", "Oct 23 - 28"] | Discount 둘째~넷째 줄 | — | 확정 — Q-15 |
| `badge` | 238:2463 · 238:2457 | discount "Superhost"(흰 배지), reservation-confirmation "Superhost"(메달 + 글자) | 없으면 숨김 | — | 확정 — Q-13·Q-15 |
| `originalPrice` | 238:2476 · 238:2397 | discount "$289", reservation "$500" | 취소선 가격 | — | 확정 — Q-15 |
| `price` / `priceUnit` | 238:2478 · 238:2531 · 238:2401·238:2402 | "$289"(map·discount) · "$440"(reservation) / "night" | 굵은 금액 + 보통 단위 | — | 확정 — Q-15 |
| `totalPrice` | 238:2480 | "$120 total" | Discount 가격 줄 끝 | — | 확정 — Q-15 |
| `dates` | 238:2533 | "Apr 17-22" | Map 가격 줄 끝 | — | 확정 — Q-15 |
| `rating` / `reviewCount` | 238:2483·238:2484, 238:2536, 238:2406·238:2408, 238:2451·238:2452 | "4.91"/"(484)", "4.91"/—, "4.99"/"337 reviews", "4.66"/"(110 reviews)" | 별 + 점수 + 후기 수 | — | 확정 — Q-15 |
| `propertyType` | 238:2459 | "Entire cabin" | Reservation Confirmation 첫 줄 | — | 확정 — Q-15 |
| `checkIn` / `checkOut` / `guests` | 238:2411 · 238:2412 · 238:2410 | "2/6/2023" / "2/11/2023" / "1 guest" | 칸 안 값, 보여 주기만. 칸 이름 "CHECK-IN"·"CHECKOUT"·"GUESTS" 는 Figma 문구 고정 | 누를 수 없음 | 확정 — Q-07·Q-15 |
| `note` | 238:2385 | "You won’t be charged yet" | Reserve 아래 안내 | — | 확정 — Q-15 |
| `lineItems` | 238:2386~2394, 238:2422~2432 | `{ label, amount, tone?: "discount" }[]`. reservation 기본 4줄(두 번째 `tone: "discount"`), reservation-confirmation 기본 4줄 | 밑줄 이름 + 오른쪽 금액, 보여 주기만. `tone: "discount"` 금액만 `text-discount` 색 | 누를 수 없음 | 확정 — Q-07·Q-08·Q-15 |
| `totalLabel` / `total` | 238:2390·238:2395, 238:2423·238:2424 | "Total before taxes"/"$2,400"(금액 Regular), "Total (USD)"/"$2,400"(둘 다 Semibold) | 합계 줄 | — | 확정 — Q-15 |
| `protectionText` | 238:2435 | "Your booking is protected by" | aircover 로고 앞 글자 | — | 확정 — Q-13·Q-15 |
| `heading` | 238:2433 | "Price details" | Reservation Confirmation 금액 제목 | — | 확정 — Q-15 |
| `reserveLabel` / `onReserveClick` | 238:2418 "Reserve" | "Reserve" / — | Card 안의 `<button>`. 클릭 시 `onReserveClick` 호출. 이동은 페이지가 정함. `:hover` 채움 `--gradient-selfmake-2` | Tab·Enter/Space, `disabled` 속성 전달 없음(Figma 근거 없음) | 확정 — Q-03·Q-04·Q-16 |
| `isFavorite` / `onFavoriteClick` | 하트 238:2465 · 238:2537 | false / — | `<button>`, 클릭 시 콜백, `aria-pressed`, 모양 변화 없음(ListingCard 와 같음) | Tab·Enter/Space | 확정 — Q-06 |
| `onClose` | Group 12 238:2539 | — | `<button aria-label="Close">`, 클릭 시 콜백, 모양 변화 없음 | Tab·Enter/Space | 확정 — Q-05·Q-06 |
| `ref` / `className` / 나머지 HTML 속성 | 기존 API | 유지 | 루트 요소에 전달, `data-testid="ds-card"` | — | 확정 — Q-02 |
| `children` | 기존 API | 없앰 | Figma 에 자유 내용 상자 없음 | — | 확정 — Q-02 |
| `href` / 사진 넘김 | — | 만들지 않음 | 카드 전체 링크 없음(Q-06), 사진 점은 고정(Q-14) | — | 확정 — Q-06·Q-14 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | `type="default"` 와 ListingCard 의 관계 | **B (추천)** Card 는 나머지 5종만, Default 는 ListingCard 그대로 / A Card 안에서 ListingCard 를 그림 / C Default 를 Card 로 옮김 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 결과: B. 범위는 5종(238:2379·238:2383·238:2420·238:2461·238:2517). 머리말 `scope_nodes` 줄은 키트가 238:2378 의 Figma 사실을 저장해야 검사할 수 있어(지금 없음, 계획 검사기가 거부) 그 뒤에 더한다 | resolved |
| Q-02 | 기존 기본 Card 상자의 처리 | **A (추천)** 상자 모양과 `children` 을 없애고 `type` 필수 / B type 이 없으면 예전 상자 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | Reserve 인스턴스 `gradient`(238:2418)의 원본 | **A (추천)** 원본 이름 확인 → 다시 계획 / B 키트 부품 아님 → none / C 정확한 매핑 지정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 확인 결과(리드, `get_metadata 0:0`): 원본은 Internal Only Canvas 의 component set "gradient"(72:1406, Property 1 = hover/default). 같은 이름의 키트 부품이 없어 none — Card 안에서 `<button>` 으로 그림(모양은 Primary 버튼 그라데이션과 같음). 72:1406 hover 변형 값은 §5 의 남은 사실 | resolved |
| Q-04 | Reserve 를 누르면 무엇이 되는지 | **A (추천)** `onReserveClick` 콜백 / B `reserveHref` / C 둘 다 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | Map 닫기 안의 인스턴스 `clear`(238:2541) | **A (추천)** none — Card 안에서 Figma SVG 로 그린 `<button>` / B 원본 이름 확인 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 원본(리드 확인): Internal Only Canvas "clear"(223:1489, 12×12), 같은 이름의 키트 부품 없음 | resolved |
| Q-06 | 하트·닫기·카드 링크 동작 | **A (추천)** 하트 = ListingCard 와 같게, 닫기 = `onClose`, 카드 링크 없음 / B A + `href` / C 장식만 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | 날짜·인원 칸과 밑줄 금액 이름의 동작 | **A (추천)** 보여 주기만 / B 버튼 + 콜백 / C 입력 부품 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | "-$300" 색 #008A05 | **A (추천)** primitive `discounts` + 새 역할 `text-discount` / B `success` 다시 매핑 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). `--color-discounts` 는 가져옴, 역할 `text-discount` 는 합친 목록 이름 그대로 토큰 계획 rev 5(리드) | resolved |
| Q-09 | 칸 테두리 #717171 | **A (추천)** 새 역할 `border-field` / B 다른 이름 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 합친 목록 이름 `border-field` 그대로, 토큰 계획 rev 5(리드) | resolved |
| Q-10 | Superhost 배지 바탕 #FFFFFF 의 역할 | **A (추천)** `surface` / B `on-image` / C 새 역할 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-11 | 16pt Regular Underlined 스타일 | **A (추천)** 16pt Regular 크기·굵기 + `text-decoration: underline` / B 별도 토큰 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드가 스타일을 다시 가져와 `--text-type-body-copy-16pt-regular-underlined`(16/400)가 생겨, 그 토큰 + `underline` 을 씀 | resolved |
| Q-12 | 토큰 없는 글자 3개 | **A (추천)** 글자 계획으로 새 토큰 / B 디자이너가 기존 스타일 연결 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 10/590 → `--text-type-mirco-text-10pt-semibold`, 12/400 → `--text-type-body-copy-12pt-regular`(생김). 16/510 은 리드가 글자 계획에 추가 | resolved |
| Q-13 | 메달 PNG 와 aircover 여러 색 로고 | **A (추천)** 메달은 원본 PNG 장식 그림, 로고는 원본 경로 `<svg>` + `text`·`primary` / B 차단 / C 로고를 그림 파일로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-14 | Discount·Map 사진 점 | **A (추천)** Figma 대로 고정 / B 자동 넘김 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-15 | 공개 API(§8), 글자를 Card 안에서 그리기, 1px 선을 CSS border 로 | **A (추천)** §8 표대로 / B 수정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

| Q-16 | Reserve hover: 원본 세트 72:1406 의 hover 변형을 Figma 에서 읽지 못함 | Primary 버튼 hover 와 같게(Gradient 03 = `--gradient-selfmake-2`) / hover 없음 | "Primary 버튼 hover 와 같게" (chosen in chat, 2026-11-26). Figma 에서 읽은 값이 아니라 사용자 결정 | resolved |
| Q-17 | "Bedroom 2" 16px/510 은 Figma 스타일이 없고, 키트에는 Figma 스타일이 아닌 값을 넣는 경로가 없음 | 있는 토큰의 정확한 값 조합(크기 16pt Regular + 굵기 18pt Medium 510) / 새 토큰 | "근거와 함께 토큰 추가 (권장)" (chosen in chat, 2026-11-26) → 리드 확인: 입력 경로가 없어 같은 값의 기존 토큰 조합을 씀(§6 글자 표) | resolved |

revision 1 의 질문 Q-01~Q-17 은 모두 답을 받았다. 아래는 revision 2(§12)의 새 질문이다.

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-18 | 페이지 모양과 승인된 Card 모양의 차이(§12.3 D1~D16, §12.4 S1~S5)를 어떻게 담을지. 사용자 결정 "페이지 모양 유지 (권장)"은 부품에 옵션을 더하라는 것 | **A (추천)** 새 prop `layout`(`"card"` 기본 = 승인 모양 그대로, `"detail"` = §12.3·§12.4 표의 페이지 값을 그대로 재현). detail 은 페이지처럼 구분점을 글자 "·"로, 별을 16 폭으로 그린다(D5·D6). 이름이 마음에 들지 않으면 다른 이름을 알려 주면 된다. 덧붙여 기본 모양의 Reserve 높이 50·취소선 위치 11 은 승인 §5 값(51·13)과 달라 같은 revision 에서 계획 값으로 맞춘다 / B 옵션 없이 reservation·sleep 의 기본 모양을 페이지 값으로 바꿈(Storybook 의 Reservation·Sleep 이 1~3px·굵기가 바뀜, 승인 모양을 버림) / C 승인 모양 그대로 두고 페이지가 바뀜(사용자 결정과 다름) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-19 | Reserve 를 누르면 어떻게 이동할지. PRD "Reserve: a link that goes to /checkout", 지금 페이지는 `<a href="/checkout">`. 승인 Q-04 는 "`onReserveClick` 콜백만, 이동은 페이지가 정함"이라 진짜 링크를 만들 수 없음(CLAUDE 규칙: 이동은 `href` 있는 `<a>`) | **A (추천)** 새 prop `reserveHref`: 있으면 같은 모양의 `<a href>`(클릭 시 `onReserveClick` 도 부름), 없으면 지금처럼 `<button>` — 승인 Q-04 를 "둘 다"로 바꿈 / B 콜백만 유지하고 페이지가 콜백에서 주소를 바꿈(링크 역할·새 탭 열기·주소 미리보기가 사라짐, 비추천) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-20 | Reserve 바탕과 hover. 페이지: `linear-gradient(to right, #D33753 0%, #D13660 50%, #C72D65 100%)`(Figma Gradient 02 를 손으로 흉내 낸 근사값, 토큰 없음), hover 변화 없음. Card: `--gradient-selfmake-1`(Figma Gradient 02 정확값), hover `--gradient-selfmake-2`(사용자 결정 Q-16) | **A (추천)** detail 에서도 토큰 바탕 + 승인 hover 유지(기본 상태 색은 거의 같고, 근사값을 토큰으로 만들지 않음) / B 토큰 바탕 + detail 에서는 hover 없음(지금 페이지 동작) / C 페이지의 linear-gradient 를 새 토큰으로 만들고 hover 없음(근사값을 굳힘, R01 위반 소지) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-21 | 날짜·인원 값의 요소. 지금 페이지는 `<input readOnly>` 3개: Tab 에 잡히지만 CSS `outline: none` 으로 포커스가 보이지 않고, `<label>` 이 연결되지 않아 이름이 없음(접근성 스냅샷 `textbox: 2/6/2023`). PRD "You can't change them". 승인 Q-07 은 "보여 주기만" | **A (추천)** 승인대로 글자(`<span>`)로 그림 — Tab 정지 3개가 없어지고 모양은 D9 값으로 같게 / B 읽기 전용 입력칸 유지 + 이름 연결 + 보이는 포커스 표시(Figma 에 없는 새 시각 결정 필요) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-22 | "리스팅 신고하기"(§12.5). Figma 에서는 Card 인스턴스 812:8724 **바깥**의 형제 Button frame 812:7557. 지금 페이지는 `<div>` 에 손가락 커서·hover 밑줄이 있어 눌리는 것처럼 보이지만 Tab 으로 갈 수 없고 역할이 없음. PRD "nothing, just shows it". 브리프는 이 줄을 Card revision 에 넣으라고 배정 | **A (추천)** Card reservation 의 선택 prop `reportLabel` + `onReportClick`: 상자 아래 24 에 `<button type="button">`(깃발 + 글자, hover 밑줄, 기본 포커스 링, 콜백만 부름) / B 같은 자리에 일반 글자(커서·hover 밑줄 없음 — hover 모양이 지금과 달라짐) / C Card 밖 새 구역 부품(Figma 812:7432 예약 열 = Card + 신고 버튼)으로 — 담당·새 계획 필요 | 위치는 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26): Card reservation 의 `reportLabel`·`onReportClick`. 요소는 결정 4 "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26): Card 가 버튼을 그리지 않고 키트 `<Button variant="text">`(Buttons revision 2, 에이전트 F)를 쓰며, Card 가 그린 깃발 `<svg>` 를 Button `icon` 으로 넘긴다(§12.5) | resolved |
| Q-23 | 새 색 매핑과 글자 굵기. #6C6C6C(침실 설명 S4, 신고 글자·깃발 §12.5)는 primitive·역할이 없음(`text-secondary` #717171, `text-tertiary` #5E5E5E 와 값이 다름 → 근사 금지). 굵기 500(침실 제목 S3)은 synthesized `--font-weight-medium` 만 같은 값 | **A (추천)** 새 매핑: primitive #6C6C6C(Figma 변수 없음 — Detail 화면은 사이트 캡처의 원시 색) + 역할 `text-supporting`(보조 회색 글자·아이콘 — ListingOverview 계획 Q-04 가 같은 값에 제안한 이름에 맞춤). 리드가 토큰 계획 revision 6 에서 ListingOverview·Checkout 사용처와 합쳐 이름을 정한다. 굵기 500 은 `--font-weight-medium` 사용 / B 글자용·아이콘용 역할을 따로 / C Figma 에 이 색의 변수를 먼저 만들고 다시 가져옴 | 결정 2 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26, 리드 매핑표): #6C6C6C → #717171 기존 `text-secondary`(neutral-07). 새 역할 `text-supporting` 은 만들지 않는다. 굵기 500 → `--font-weight-medium`(= Figma 변수 `sds-typography-weight-medium` 500) | resolved |
| Q-24 | "Where you'll sleep" 제목(h2 22/590 줄 높이 26)·위 구분선·두 칸 줄(간격 16, 가로 넘김, 스크롤바 숨김)은 Card 가 아니고, 페이지는 부품만 놓아야 하는데 담당 부품이 없음(브리프 배정 목록에 없음) | **A (추천)** 새 구역 부품(가칭 `SleepSection`)이 Card `type="sleep" layout="detail"` 을 칸마다 쓴다 — 리드가 담당을 정함 / B 페이지가 Text + Card 를 배치(Text 에 22/590/26 제목 모양이 없어 Text revision 이 먼저 필요) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드가 에이전트 D 에 배정 → `docs/plans/components/SleepSection.md` | resolved |
| Q-25 | 침실 사진 대체 글. 지금 `alt="Bedroom 1"` 이 바로 아래 제목 "Bedroom 1"과 같아 화면 읽기에서 두 번 읽힘(Figma frame 이름은 "Image (Bedroom1, 1 Queen sized bed)") | **A (추천)** 지금처럼 `imageAlt="Bedroom N"`(동작·화면 그대로) / B `imageAlt=""`(장식 그림, 제목만 읽힘) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

revision 2 의 질문도 모두 답을 받았다(`open_questions: 0`). 답에 따라 §4(Nested parts 추가 행)·§12.4~§12.9 를 고쳤다.

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 종류별로 §5 치수·색, 흰 캔버스. Sleep·Discount 는 카드 fill 없음, 예약 두 종은 흰 바탕+테두리+`--shadow-elevation-03`, Map 은 `--shadow-elevation-03` | Storybook iframe 스크린샷, computed style(`background-color`·`box-shadow`·`border`) | |
| 모든 상태·크기 | 종류 5개 각 기본 하나. Reserve `:hover` 채움 = `--gradient-selfmake-2`(Q-16) | 종류별 스토리 + 세트 스크린샷 대조, Reserve hover 는 Playwright 실제 포인터 | |
| 아이콘과 노출 조건 | §7 표의 종류에만 하트·별·점·닫기·구분점·로고·메달 | DOM 크기·위치 측정, 원본 SVG 경로·PNG 자르기 대조 | |
| 클릭·입력·선택 등 기능 | 하트 → `onFavoriteClick`, 닫기 → `onClose`, Reserve → `onReserveClick` 각 1회. 날짜 칸·밑줄 이름은 버튼이 아님 | Storybook `play`: `fn()` + `userEvent.click` + 호출 확인 | |
| disabled / Tab / Focus | Discount: 하트 하나, Map: 닫기 → 하트, Reservation: Reserve 하나가 Tab 으로 잡힘, 기본 포커스 링 | `play` `userEvent.tab`, 실제 키보드 | |
| Nested parts identity | Each approved kit part renders its own `data-testid` inside the composite root | `ai:verify` DOM check; copied markup fails. 승인 표는 모두 `none` 이라 확인할 키트 부품 없음 | |
| Nested part → composite callback | Clicking each actionable child calls the planned composite callback | Storybook `play` with `fn()`, `userEvent.click`, and call assertion (Reserve → `onReserveClick`, 닫기 → `onClose`) | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, HomePage import 가 깨지지 않음, ListingCard 변화 없음 | `pnpm ai:check Card`, `pnpm ai:verify Card`, `pnpm typecheck`, `pnpm ds:guard` | |

필수 명령: `pnpm ai:check Card`, `pnpm ai:verify Card`, `pnpm typecheck`, `pnpm ds:guard`. 명령 검사와 시각 원본 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 부품 계획 8개의 질문을 어떻게 답할까? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26) — Q-01~Q-15 반영. Q: 새 색 역할 → A: 합친 목록 + 다시 가져오기 (chosen in chat). Q: 그림자 → A: Figma 이름으로 추가 (chosen in chat). 기존 rollout 결정 Q-02("Card 하나에 type")·Q-03("Elevation 그림자를 Figma 값으로"). Q: Card Reserve hover → A: "Primary 버튼 hover 와 같게" (chosen in chat, 2026-11-26, Q-16). Q: 연결 없는 값 → A: "근거와 함께 토큰 추가 (권장)" (chosen in chat, 2026-11-26) → "Bedroom 2" 는 기존 토큰의 정확한 값 조합(Q-17).
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26).
- 승인한 revision: 2 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: revision 1 범위는 없음(토큰 계획 revision 5 `border-field`·`text-discount` 승인·적용됨, 리드). revision 2 는 Q-18~Q-25 가 모두 답을 받았고(2026-11-26), 남은 조건은 Buttons revision 2 의 `text` 모양(에이전트 F, 신고 줄)의 승인·구현과 이 revision 의 사용자 승인이다. 새 색 역할은 필요 없다(결정 2: #6C6C6C → `text-secondary`).

## 12. Revision 2 — Detail 예약 상자·침실 카드를 Card 로 그리기

### 12.1 요청과 근거

- 요청: 리드 브리프(2026-11-26). 사용자 결정 원문 — 구역: "구역도 부품으로 (권장)", 모양: "페이지 모양 유지 (권장)"(페이지와 Figma 부품 모양이 다르면 페이지를 바꾸지 않고 부품에 옵션을 더해 계획 revision 으로), UX 기준: 1440 화면 일치·키보드·접근성·PRD 동작. 기준 모양은 지금 사이트(git-demo `aa9a593`, 사용자 검수).
- 대상
  - Detail 예약 상자 `my-website/pages/DetailPage.tsx:338~435`(`.page-Detail__booking-*`, CSS `DetailPage.css:543~794`·`1196~1205`) → `<Card type="reservation" …>`. Figma: Card 인스턴스 812:8724(373×532, Reservation Card 크기). Reserve `<a href="/checkout">` 와 상자 아래 "리스팅 신고하기" 포함.
  - "Where you'll sleep" 침실 카드 2개 `DetailPage.tsx:470~489`(`.page-Detail__sleep-card`, CSS `859~915`) → `<Card type="sleep" …>`. Figma: frame 812:11249·812:11256(인스턴스 아님, 318.66×270.44).
- 동작 근거(PRD `my-docs/inbox/website-plan.md` §4 Detail): 날짜·인원 칸 "show the dates and guests. You can't change them", Reserve "a link that goes to /checkout", "리스팅 신고하기: nothing, just shows it". 침실 카드는 동작 항목 없음 → 보여 주기만.
- 읽은 규칙: `docs/ai-component-workflow.md` 1.0 R01~R09, `docs/ai-design-system-spec.md` 1.1, `src/tokens/tokens.css`(semantic 46개).
- Figma: **호출 0회.** 구조는 `my-website/figma/Detail.layers.xml` — 예약 열 812:7432(372.33×622) = Card 812:8724(0,0) + Container 812:7556(0,532, 372.33×42) → Button 812:7557(126.28,24, 119.77×18) → 깃발 칸 812:7560(16×16, y 1) + 글자 812:7562("리스팅 신고하기", x 32, 88×18). 침실 812:11249 = 사진 812:11250(318.66×212.44) + 제목 칸 812:11251(36 높이, 글자 812:11252 y 16·20 높이) + 설명 칸 812:11253(22 높이, 글자 812:11254 y 4·18 높이). 두 칸 간격 16(List Item 334.66 − 318.66).
- 측정: Playwright 1.62.1 Chromium, 1440×1000(잉크 비교는 배율 4). 페이지 http://127.0.0.1:5175/detail, 지금 Card 는 git-demo Storybook http://127.0.0.1:6007 `Components/Card` Reservation·Sleep 스토리. 스크립트와 결과: `<로컬 측정 폴더>/rebuild/D/`(`measure-page.mjs`→`page-measure.json`, `measure-card.mjs`→`card-measure.json`, 잉크 비교 `star.mjs`·`ink.mjs`·`ul.mjs`). 콘솔 오류 0(두 쪽 모두).
- 코드 기준: git-demo `aa9a593`(작업 트리 변경 없음). 글자 폭은 두 쪽이 같다(예: "$500" 55.55, "500 x 5 nights" 103.94, "Total before taxes" 135.03) — 페이지 글꼴 `-apple-system, BlinkMacSystemFont, …` 와 Card 의 `--font-type-*`("SF Pro", system-ui …)가 이 Mac 에서 같은 글꼴로 그려진다. 다른 환경의 차이는 검수 때 따로 기록한다.

### 12.2 범위

- `type="reservation"`·`type="sleep"` 에 페이지 모양을 그리는 옵션(Q-18), Reserve 링크(Q-19), 신고 줄(Q-22)을 더한다. 다른 세 종류(discount·map·reservation-confirmation)와 ListingCard 는 바뀌지 않는다.
- 페이지 파일은 이 계획에서 고치지 않는다(페이지 조립은 별도 단계). 날짜 칸을 승인대로 글자로 그리면(Q-21) 페이지의 Tab 순서가 바뀐다(§12.8).

### 12.3 예약 상자 — 지금 페이지와 지금 Card 의 차이

좌표는 상자 바깥 왼쪽 위 기준(px). "detail" 칸이 Q-18 A 로 만들 값이다. 색은 모두 기존 역할과 같다(§12.6).

| # | 항목 | 지금 페이지(측정) | 지금 Card(측정) | detail 에서 | 토큰·표현 |
|---|---|---|---|---|---|
| D1 | 상자 높이 | 373×532 고정(`height: 532`), 내용 끝 505 아래 27 | 373×526(내용 높이), 내용 끝 502 아래 24 | 최소 높이 532(Figma 812:8724 와 같음) | `calc(var(--spacing) * 133)` |
| D2 | 안쪽 시작 | 테두리 1 + padding 24 → 내용 x·y 25, 내용 폭 323(오른쪽 끝 348) | 1 + 23 → 24, 폭 325(끝 349) | 1 + 24 | `calc(var(--spacing) * 6)` |
| D3 | 날짜 칸·Reserve 폭 | 325 고정이라 내용(323)보다 2 넓어 x 25~350(오른쪽 여백 23) | x 24~349 | 폭 325, 왼쪽 25(페이지처럼 오른쪽으로 2 넘침) | `calc(var(--spacing) * 81.25)` |
| D4 | 머리줄 | 높이 27: "night" 줄 높이 24 가 가격과 기준선 정렬. 별점 묶음은 세로 가운데(묶음 y 28, 21 높이). 칸까지 24 → 칸 y 76 | 높이 26("night" 줄 높이 normal 18), 별점 묶음 `margin-top` 6. 칸 y 74 | "night" 줄 높이 24, 별점 묶음 세로 가운데·줄 높이 21. 글자 y 는 두 쪽 같음(별점 글자 30, 별 30.5) | `calc(var(--spacing) * 6)`, `* 5.25` |
| D5 | 별 | `<img>` 16×16 `object-fit: contain` → 별 그림이 16×15.27로 커짐(잉크 16×15), x 208.8 | 13.99×13.36 를 16 칸 안 inset(잉크 14×13.5), x 211.81 | Figma 별 경로 그대로, 폭 16·높이 비율(15.27), 16 칸 세로 가운데 | `calc(var(--spacing) * 4)` |
| D6 | 별점·후기 사이 점 | 글자 "·"(14/400 #222, 폭 4.02, 양옆 간격 4). 점 잉크 2×2 가 x 263.4·y 39 | Figma Ellipse 16 SVG 2×2, x 265.19·y 37.5 | 글자 "·"(장식, 화면 읽기에서 숨김) | 글자 `--text-type-body-copy-14pt-regular`, 색 `text` |
| D7 | 별점 묶음 가로 | x 208.8~348(폭 139.2), 후기 수 x 270.19 | x 211.81~349(폭 137.19), 후기 수 x 271.19 | D2·D5·D6 결과 | — |
| D8 | 칸 구조 | 위 묶음 325×56(사방 선 1, 모서리 12 12 0 0, 안쪽 세로선 1 이 x 187.5) + 아래 칸 325×56(위 선 없음 — 위 묶음의 아래 선을 같이 씀, 모서리 0 0 12 12). 합 112(y 76~188) | 칸 3개가 각자 선, 아래 칸 1 겹침. 합 111(y 74~185), 세로선 x 185.5 | 페이지 구조 | 선 `--border-width-thin` `border-field`, 모서리 `--radius-lg`, 높이 `calc(var(--spacing) * 14)` |
| D9 | 칸 글자 | 이름: 선 안쪽 12(위 칸 y 89, 아래 칸 y 144), 줄 높이 12, 이름→값 2, 값 칸 높이 21(입력칸)이라 값 잉크가 Card 보다 2 아래. 값 잉크 x 가 1 오른쪽(입력칸 그리기) | 이름: 칸 바깥에서 12(y 86, 142), 줄 높이 normal, 값 줄 높이 normal | 이름 줄 높이 12·위 여백 선 안쪽 12, 값 줄 높이 21. 입력칸의 가로 1 은 일반 글자로 재현하지 않고 검수 때 기록(Q-21) | `calc(var(--spacing) * 3)`, `* 5.25` |
| D10 | 값 요소 | `<input readOnly>`(Tab 정지·포커스 안 보임·이름 없음) | `<span>` 글자 | Q-21 | — |
| D11 | Reserve | `<a href="/checkout">` 325×51, 칸 아래 18(y 206), 근사 linear-gradient, hover 변화 없음 | `<button>` 325×**50**(승인 §5 는 51), 칸 아래 19(y 204), `--gradient-selfmake-1`, hover `--gradient-selfmake-2` | 높이 51, 칸 아래 18. 링크 Q-19, 바탕·hover Q-20 | `calc(var(--spacing) * 12.75)`, `* 4.5` |
| D12 | 안내 | 버튼 아래 21(y 278), 가운데(중심 x 186.5), 문구 "You won't be charged yet"(곧은 ') | 21(y 275), 중심 186.5, 기본 문구 "You won’t …"(굽은 ’) | 같음. 문구는 페이지가 `note` 로 넘김 | — |
| D13 | 금액 줄 4개 | 안내 아래 24(y 319·353·387·421), 18 높이·간격 16, 왼쪽 25·오른쪽 끝 348. 밑줄: 브라우저 기본(두께·위치 auto, `skip-ink: auto` → "Long stay" 의 y 아래가 끊김), 글자 위에서 16 | y 316·350·384·418, 오른쪽 끝 349. 밑줄 `from-font`·`skip-ink: none`(끊김 없음), 글자 위에서 17 | 페이지 밑줄(기본값) | `text-decoration: underline` 만 |
| D14 | 구분선 | 마지막 줄 아래 24(y 463), 합계까지 23 | 23(y 459), 합계까지 24 | 24 / 23 | `calc(var(--spacing) * 6)`, `* 6 - var(--border-width-thin)` |
| D15 | 합계 | "Total before taxes"·"$2,400" 둘 다 16/590 | 금액 16/400(Figma 238:2395 Regular) | 둘 다 Semibold | `--text-type-body-copy-16pt-semibold` |
| D16 | "$500" 취소선 | 글꼴 line-through: 글자 위에서 13, 두께 2, 폭 = 글자 폭 55.5 | `::after` 글자 위에서 **11**(승인 §5 는 "위에서 13"), 두께 2 | 위에서 13 | `calc(var(--spacing) * 3.25)`, `--border-width-thick` |

- 그대로 같은 것: 상자 폭 373, 테두리 1 #DDDDDD, 모서리 12, 그림자(페이지 `0 6px 16px rgba(0,0,0,.12)` = `--shadow-elevation-03`), 흰 바탕, 가격·별점·금액 글자 크기·굵기·색, 할인 금액 #008A05, 안내 간격 21, 금액 줄 간격 16, 글자 폭.
- 지금 Card 구현과 승인 §5 의 차이 두 개(D11 높이 50 ↔ 51, D16 취소선 11 ↔ 13)는 기본 모양에서도 승인 값으로 맞추자고 제안했다(Q-18 A).

### 12.4 침실 카드 — 지금 페이지와 지금 Card 의 차이

좌표는 카드 왼쪽 위 기준. 지금 Card 측정은 Storybook Sleep(폭 319, 사진 없음).

| # | 항목 | 지금 페이지(측정) | 지금 Card | detail 에서 | 토큰·표현 |
|---|---|---|---|---|---|
| S1 | 카드 폭 | 318.69(`flex: 0 0 318.7px`) | 부모 폭 100% | 그대로 — 폭은 놓는 쪽(Q-24) | — |
| S2 | 사진 | `<img>` 318.69×212 고정, 모서리 8, `object-fit: cover`, `my-assets/images/detail-bedroom-1.png`·`-2.png`(720×480), alt "Bedroom 1/2" | `aspect-ratio: 319/212`(318.69 폭에서 211.79), 모서리 12, 사진 없으면 `image-placeholder` | 높이 212 고정, 모서리 8. 사진은 기존 `imageSrc`·`imageAlt` | `calc(var(--spacing) * 53)`, `--radius-md` |
| S3 | 제목 "Bedroom N" | 사진 아래 16, 16/**500** 줄 높이 20, #222 | 16, 16/510 줄 높이 normal(18), #222 | 굵기 500, 줄 높이 20 | `--text-type-body-copy-16pt-regular` 크기, `--font-weight-medium`(500 = Figma 변수 `sds-typography-weight-medium`, Q-23), `calc(var(--spacing) * 5)` |
| S4 | 설명 "1 queen bed" | 제목 아래 4, 14/400 줄 높이 18, **#6C6C6C** | 4, 14/400 normal(17), #5E5E5E(`text-tertiary`) | 줄 높이 18, 색 **#717171** — 결정 2(Q-23): Figma 변수가 아닌 #6C6C6C 를 Figma Neutral 07 로 맞춤. 지금 페이지보다 아주 조금 밝아진다(사용자 결정) | `calc(var(--spacing) * 4.5)`, `text-secondary` |
| S5 | 카드 높이 | 270(212+16+20+4+18) | 267 | 270 | — |

- 침실 카드는 누르는 곳이 없다(지금 페이지 `<div>`, PRD 동작 없음). Figma frame 이름 "Button" 은 원본 사이트의 흔적이라 버튼으로 만들지 않는다.
- 제목 "Where you'll sleep"·위 구분선·두 칸 줄은 Card 가 아니다 — 구역 부품 `SleepSection`(Q-24, `docs/plans/components/SleepSection.md`)이 이 Card 를 칸마다 쓴다.

### 12.5 "리스팅 신고하기"(Q-22 — 위치 A, 요소는 결정 4)

Card 는 상자 아래 자리(위치·가운데 정렬)와 깃발 그림만 맡고, 버튼 자체는 키트 `Button variant="text"`(Buttons revision 2, 에이전트 F)가 그린다. Card CSS 는 `.ds-button*` 를 고르지 않고, Button 에 `className`·`style` 로 모양을 넘기지 않는다(R05).

| # | 항목 | 지금 페이지(측정) | Figma(layers.xml) | 계획 |
|---|---|---|---|---|
| R1 | 위치 | 상자 아래 24(y 556), 상자 폭 가운데(x 126.22, 폭 120.56) | 812:7557 x 126.28, y 532+24 | Card 의 `ds-card__report` 줄: 위 `calc(var(--spacing) * 6)`, 가운데 정렬 |
| R2 | 깃발 | `<img src="detail-icon-flag.svg">` 16×16(경로 1개, fill #6C6C6C), 글자 줄 가운데(y +2.5) | 812:7560 16×16 | 같은 경로의 `<svg fill="currentColor" aria-hidden>` 을 Card 가 그려 Button `icon` 으로 넘김. 색은 Button 글자 색을 따른다 |
| R3 | 글자·간격 | 14/400 줄 높이 21, #6C6C6C, 깃발과 간격 16, 글자 폭 88.56 | 812:7562 x 32 | Button `text` 모양이 그린다 — F 에게 보낼 정확한 값은 아래 |
| R4 | 동작·모양 | `<div>`, 손가락 커서, hover 에 글자 밑줄(쉴 때는 밑줄 없음), Tab 에 안 잡힘, 역할 없음 | Button frame(인스턴스 아님) | Button 이 `<button type="button">`, 클릭 시 `onReportClick` 만 부름, Tab 으로 Reserve 다음, 기본 포커스 링 |

Button `text` 에 필요한 모양(F 에게): 상자 120.56×21(안쪽 여백 0), 앞 아이콘 16×16 + 간격 16, 글자 14px/400(`--text-type-body-copy-14pt-regular`)·줄 높이 21(`calc(var(--spacing) * 5.25)`)·자간 normal, 글자·아이콘 색 `text-secondary` #717171(결정 2, 지금 페이지 #6C6C6C), **쉴 때 밑줄 없음·hover 때 글자에만 밑줄**(브라우저 기본 밑줄), 바탕 없음, 손가락 커서, 브라우저 기본 포커스 링. F 의 `text` 모양이 늘 밑줄이면 쉴 때도 밑줄이 생겨 지금 화면과 달라진다 — 그때는 F·리드가 정한다.

### 12.6 색·글자 토큰 (detail 에서 쓰는 것)

| 요소 | 값 | primitive | semantic | 일치 | 비고 |
|---|---|---|---|---|---|
| 상자 바탕 / 테두리·구분선 / 그림자 | #FFFFFF / #DDDDDD / 0 6 16 #0000001F | shade-01 / neutral-03 | `surface` / `border` / `--shadow-elevation-03` | 일치 | revision 1 과 같음 |
| "$500"·취소선 | #717171 | neutral-07 | `text-secondary` | 일치 | |
| 가격·별·"·"·금액·칸 이름·침실 제목 | #222222 | shade-02 | `text` | 일치 | |
| 후기 수·칸 값·안내 | #5E5E5E | neutral-08 | `text-tertiary` | 일치 | |
| 칸 선 | #717171 | neutral-07 | `border-field` | 일치 | |
| "-$300" | #008A05 | discounts | `text-discount` | 일치 | |
| Reserve 글자 / 바탕 | #FFFFFF / Gradient 02 | shade-01 / — | `on-primary` / `--gradient-selfmake-1` | 글자 일치, 바탕은 Q-20 | 페이지의 linear-gradient 는 근사값이라 토큰 없음 |
| 침실 설명 | 지금 페이지 #6C6C6C(Figma 변수 아님) → **#717171** | neutral-07 | `text-secondary` | 결정 2 값으로 일치 | Q-23(결정 2). 신고 글자·깃발 색은 Button `text` 이 정한다(같은 `text-secondary` 요청) |

| 글자 | 값 | 토큰 |
|---|---|---|
| 칸 이름 | 10/590, 줄 높이 12 | `--text-type-mirco-text-10pt-semibold` + `calc(var(--spacing) * 3)` |
| 칸 값, 별점 묶음 | 14/400, 줄 높이 21 | `--text-type-body-copy-14pt-regular` + `calc(var(--spacing) * 5.25)` |
| "night" | 16/400, 줄 높이 24 | `--text-type-body-copy-16pt-regular` + `calc(var(--spacing) * 6)` |
| 합계 금액 | 16/590 | `--text-type-body-copy-16pt-semibold` |
| 침실 제목 | 16/500, 줄 높이 20 | 크기 `--text-type-body-copy-16pt-regular`, 굵기 `--font-weight-medium`(500 = Figma 변수 `sds-typography-weight-medium`, Q-23), `calc(var(--spacing) * 5)` |
| 침실 설명 | 14/400, 줄 높이 18 | `--text-type-body-copy-14pt-regular` + `calc(var(--spacing) * 4.5)` |

- 크기·자간·줄 높이는 지금 페이지 값 그대로(사용자 결정 3 "지금 크기·자간 유지"), 토큰(Figma 스타일)에 줄 높이가 없어 정확한 px 값을 `--spacing` 배수로 쓴다(근사 아님). 색만 결정 2 를 따른다. 새 토큰은 없다.

### 12.7 공개 API 변경 (제안)

| prop | 근거 | 기본값·허용값 | 실제 동작 | 키보드 | 사용자 확정 |
|---|---|---|---|---|---|
| `layout` | Q-18 | reservation·sleep 에만: `"card"`(기본, 승인 모양) · `"detail"`(§12.3·§12.4) | 클래스 `ds-card--layout-detail`. 모양만 바꾸고 문구·동작은 그대로 | — | 확정 |
| `reserveHref` | Q-19, PRD | reservation: 없음 | 있으면 Reserve 가 같은 모양의 `<a href>`, 클릭 시 `onReserveClick` 도 부름. 없으면 지금처럼 `<button>`. Reserve 는 Button ghost·text 가 아니라 승인대로 Card 가 그리는 그라데이션 버튼(Q-03·Q-20) | 링크: Tab·Enter | 확정 |
| `reportLabel` / `onReportClick` | Q-22(결정 4) | reservation: 없음 / — | 있으면 상자 아래 24 에 `<Button variant="text" size="medium" tone="secondary" icon={깃발}>{reportLabel}</Button>`, 클릭 시 `onReportClick`. 이때 루트는 상자와 신고 줄을 담는 세로 묶음이 되고 상자는 `ds-card__box`. 없으면 지금 구조 그대로 | Button 이 처리(Tab·Enter/Space) | 확정 |
| 기존 prop | §8 | 바뀜 없음 | 페이지 값은 기존 문구 prop(`note`·`lineItems` 등)과 `imageSrc`·`imageAlt`·`title`·`description` 으로 넘긴다 | — | revision 1 |

페이지가 쓸 모양(승인 뒤 페이지 단계의 참고, 지금 고치지 않음):

```tsx
<Card type="reservation" layout="detail" reserveHref="/checkout" note="You won't be charged yet" reportLabel="리스팅 신고하기" />
// 나머지 문구는 Figma 기본값과 페이지가 같다: $500 · $440 · night · 4.99 · 337 reviews · 2/6/2023 · 2/11/2023 · 1 guest · Reserve · 금액 4줄 · Total before taxes $2,400
<Card type="sleep" layout="detail" imageSrc={imageUrl("detail-bedroom-1")} imageAlt="Bedroom 1" title="Bedroom 1" description="1 queen bed" />
```

- 변경 파일(승인 뒤): `src/components/Card/Card.tsx`(`@/components/Button` 공개 import 추가)·`Card.css`·`Card.stories.tsx`(생성물 충돌 보고 예상, 새 스토리 "Reservation Detail"·"Sleep Detail" — 사진은 ListingCard 스토리처럼 `imageUrl`)·`index.ts`(타입). 새 prop 이름은 루트로 넘기지 않는 목록에 더한다. 신고 줄은 Buttons revision 2(F)가 구현된 뒤에 만든다.
- 영향: 지금 Card 를 그리는 페이지는 없다(HomePage 는 import 만). Q-18 A 의 기본 모양 수정(Reserve 51·취소선 13)으로 Storybook Reservation 이 1~2px 바뀐다.

### 12.8 접근성·동작 메모 (지금 페이지에서 찾은 것)

- Tab 순서(측정): CHECK-IN 입력칸 → CHECKOUT 입력칸 → GUESTS 입력칸 → Reserve(`/checkout`) → Show original → Show more → Inspiration 탭. 입력칸 3개는 포커스 표시가 없다(`outline: none`)·이름이 없다 → Q-21 A(글자로). 계획대로면 Reserve → 리스팅 신고하기(Button text) → (ListingDescription 의 Show original → Show more) 순서.
- "리스팅 신고하기"는 눌리는 모양인데 키보드로 갈 수 없다 → Q-22(Button text 로 Tab 가능).
- Reserve 링크: Tab·Enter 로 이동, 포커스는 브라우저 기본 링(auto 1px). 그대로 유지한다.
- 침실 사진 alt 가 제목과 겹친다 → Q-25. 그림 깨짐 없음(사진 두 장 720×480 로드).

### 12.9 검증 추가

| 확인 대상 | 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| Reservation detail 기본 모양 | §12.3 detail 칸 값(373×532, 내용 25, 칸 y 76~188, Reserve y 206·51, 금액 y 319~, 구분선 463, 합계 487, 합계 금액 590) | Storybook iframe(흰 바탕, 폭 373) computed style·DOM 위치를 페이지 측정(`page-measure.json`)과 대조, 두 스크린샷 비교 | |
| Sleep detail | §12.4 detail 칸 값(사진 212·모서리 8, 제목 228·20·500, 설명 252·18·#717171, 높이 270) | 같음(폭 318.69) | |
| 신고 줄 | 상자 아래 24 가운데, `ds-button`(text)이 Card 루트 안에 렌더, 깃발 16 + 16 + 글자, 색 #717171 | `ai:verify` DOM(`data-testid="ds-button"`), 위치 측정, hover 는 Button 계약대로 | |
| Reserve 링크·콜백 | `reserveHref` → `<a href="/checkout">`, 클릭 시 `onReserveClick` 1회. 없으면 `<button>` | Storybook `play`(`fn()`·`userEvent.click`), DOM 태그·href | |
| 신고 버튼 → Card 콜백 | Button 클릭 시 `onReportClick` 1회, Tab 으로 Reserve 다음에 잡힘 | `play` `userEvent.tab`·`click`·호출 확인 | |
| Reserve hover | Q-20 답대로 | Playwright 실제 포인터 | |
| 기본 모양 회귀 | `layout` 없으면 revision 1 모양(Q-18 A 의 두 값만 승인 값으로) | 기존 스토리 + `pnpm ai:check Card`, `pnpm ai:verify Card`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 페이지 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.
