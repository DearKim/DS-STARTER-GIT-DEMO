---
kind: component
component: Callout
revision: 2
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=235-2641&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Callout

> **revision 2 (2026-11-26, 재정립 계획 에이전트 E, 승인 대기):** (1) Home "Your reservation" 줄을 Cancelation + 사진으로 그리는 방법을 확인하고(이미 승인된 `imageSrc` 로 됨, 새 prop 없음 — 스토리·차이만 더함), (2) Checkout 의 한 줄 "Rare find!" 띠 모양을 `type="banner"` 로 더한다. 사용자 결정 "페이지 모양 유지 (권장)" 때문이다. revision 1 에서 승인된 내용(1~11절)은 바꾸지 않고 바뀌는 것은 **12절**에만 적었다. 4절에 행 하나, 9절에 Q-10~Q-15, 11절에 한 줄을 더했다. 같은 날 사용자 답("추천안 모두 채택", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지")을 반영했다: 띠 바탕은 `surface-raised`(#F7F7F7), 띠 아이콘은 현재 페이지 그림을 쓴다. 띠 아이콘의 Figma 원본 형식(벡터/그림)은 여전히 읽지 못했지만, 사용자가 채택한 대안(현재 페이지 asset)이 그 빈칸을 덮어 `facts_complete: true` 로 했다(12.5).

> 작성: Claude Code, 2026-11-26. 근거: `docs/plans/design-system-airbnb.md` 1단계 목록의 `Callout`(새로 만듦). 이 문서는 계획이며, 사용자 승인 전에는 구현 파일을 만들지 않는다. 사이트 페이지는 이 계획에서 고치지 않는다.
> 갱신(2026-11-26, revision 1 유지): 사용자가 채팅에서 "추천안 모두 채택"을 골랐다. 그 결정과 리드가 확인한 사실(새 토큰)을 반영했다. 계획 승인은 아직 받지 않았다.

## 1. 요청과 적용 규칙

- 요청한 작업: Figma "Callouts" 세트(235:2641)를 Storybook 부품 `Callout`으로 만든다. 세트 안에서 쓰는 "Callout Icons" 세트(235:2613)의 아이콘 3종은 Callout 안에서 그린다(Q-03 A2).
- 원본 노드:
  - Callouts 235:2641(이 계획의 `source_url`)
  - Callout Icons 235:2613(https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=235-2613&m=dev)
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09(R05의 Nested parts 규칙 포함)
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 조회: 2026-11-26 Figma Desktop MCP로 직접 조회했다(캐시 아님).
  - `get_design_context 235:2641`: 두 변형의 코드와 스크린샷
  - `get_design_context 235:2613`: 세 변형의 코드와 스크린샷
  - `get_variable_defs 235:2641`, `get_variable_defs 235:2613`
  - 응답은 잘리지 않았다.
  - asset 3개는 scratchpad로 내려받아 읽었고, 프로젝트에는 복사하지 않았다.
- 리드가 확인한 사실(2026-11-26): Colors 245:3518·Typography 245:3517·Elevation 245:3354를 가져와 `ds:tokens`를 실행했다. 그 결과 primitive `--color-accent-01`·`--color-accent-02`와 글자 토큰 `body-copy-12pt-regular`가 생겼다.
- 페이지 쪽 참고 자료(읽기만 함, `my-website/figma/*.layers.xml`과 `Checkout.png`):
  - Home의 "Your reservations"(767:348)에는 `Callouts` 인스턴스 4개(424:10809·424:10810·424:10811·767:349, 각 361×165)가 있다. Cancelation 변형이며, 롤아웃 문서 §6에서도 Callout 대응으로 바로잡았다.
  - Checkout의 "Rare find! This place is usually booked"는 Callout 인스턴스가 아닌 일반 frame이다(분홍 바탕 한 줄, 아이콘이 왼쪽).
- 대상 코드·토큰 기준: git-demo 작업 폴더의 현재 `src/tokens/tokens.css`(위 가져오기 반영 뒤). 새 색 역할은 리드가 `docs/plans/tokens.md` revision 5에 넣는다.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 세트의 축은 `Property 1` 하나이고 값은 Property Highlight와 Cancelation이다(Figma 기본값은 Cancelation). Property Highlight(235:2640): 흰 상자 안에 굵은 문장 + 보통 문장, 오른쪽에 아이콘 32. Cancelation(235:2639): "Your reservation" 제목, 사진 자리, "CANCELED", 숙소 이름, 예약 코드. | 숙소의 특징이나 예약 상태를 알려 주는 정보 상자. 누르는 부품이 아니다. | Q-01 A·Q-02 A 채택 |
| 누를 수 있는 영역 | Figma에 링크·버튼·hover 모양이 없다. | 없음(정적 상자) | Q-06 A 채택 |
| 클릭/선택/열림 동작 | 없음 | 만들지 않음 | Q-06 A 채택 |
| 키보드·포커스 범위 | Focus 변형 없음 | 포커스가 가는 요소 없음 | Q-06 A 채택 |
| disabled 동작 | 없음 | 만들지 않음 | Q-06 A 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 컴포넌트, 공개 import, 사용처:
  - `src/components/`에 Callout·Callouts·Callout Icons라는 이름의 부품이 없다.
  - 가장 가까운 것은 `Notification`이다. 다만 tone(info/success/warning/danger), inline/toast, 닫기 버튼을 갖고 `role="status"`/`"alert"`로 읽히는 상태 알림이라 역할이 다르다. 그대로 둔다(Q-01 A).
  - `Card`(키트 기본 상자)와 `Tile`도 이름과 역할이 다르다.
- 기존 props·stories에서 확인한 지원 범위: 해당 없음(새 부품).
- 새 부품이 필요한 이유: 같은 이름의 키트 부품이 없고, Notification을 바꾸면 그 부품의 상태 알림 계약이 달라진다.
- 변경할 파일(승인 후): `src/components/Callout/Callout.tsx`·`.css`·`.stories.tsx`·`Callout.figma.tsx`·`index.ts`(새로).
- 승인된 변경에서 영향받는 기존 사용처: 없음. 새 색 역할은 기존 역할의 값을 바꾸지 않는다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| `Callout Icons` 235:2614 | `Callout Icons`(set 235:2613) | Type=Diamond. 인스턴스 안쪽 노드 I235:2614;235:2573은 Diamond 변형 235:2578의 그룹 235:2573이다. | 235:2640 Property Highlight | none — drawn inside this part from the Figma SVG(`icon`: diamond·tags·clock, 기본 diamond, 세트 235:2613의 원본 SVG 3종) | confirmed |
| — (rev 2: Checkout 띠 아이콘, frame "Icon" 812:12367 32×32 — 인스턴스 아님) | — | — | rev 2 `type="banner"`(Checkout 812:12363) | none — 페이지가 `iconSrc` 로 주는 그림(`checkout-icon-rare-find.png`)을 장식 `<img alt="">` 32×32 로 그림(Q-11 A) | confirmed |

- 인스턴스가 없음을 확인한 근거: Cancelation 235:2639에는 인스턴스가 없다. get_design_context에서 이 변형의 노드(232:2130~232:2138)는 모두 frame·text이고, 인스턴스를 뜻하는 `I…;…` id나 컴포넌트 함수가 없다.
- 글자는 키트 `Text`를 쓰지 않고 Callout 안에서 글자 토큰으로 그린다. Text의 variant(body·body-sm·title)에 16pt·18pt·12pt Semibold가 없다(Q-04 A·Q-05 A).
- 키트 부품을 import하지 않는다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 235:2640 Property 1=Property Highlight | get_design_context + 스크린샷 | 지속: 변형 | 상자 전체 | 폭 349, 여백 24, 간격 8, 문장(flex 1) + 아이콘 32 | 있음(기본 Diamond, 오른쪽 위) | `type="highlight"` | 확정 |
| 235:2639 Property 1=Cancelation | get_design_context + 스크린샷 | 지속: 변형 | 상자 전체 | 폭 361, 여백 24, 세로 간격 24. 제목 / 사진 108×72 + 글 묶음 | 없음 | `type="cancelation"` | 확정 |
| 235:2578 Callout Icons Type=Diamond | get_design_context 235:2613 | 지속: 아이콘 종류 | 아이콘 32×32 | 그룹 30.742×29.79, 위치 (0.63, 1.1) | — | `icon="diamond"`(기본) | 확정 |
| 235:2602 Callout Icons Type=Tags | get_design_context 235:2613 | 지속: 아이콘 종류 | 아이콘 32×32 | 그룹 33.157×31.427, 위치 (−0.58, 0.29). 32 칸을 조금 넘는다(넘는 부분을 자르지 않음). | — | `icon="tags"` | 확정 |
| 235:2611 Callout Icons Type=Clock | get_design_context 235:2613 | 지속: 아이콘 종류 | 아이콘 32×32 | 그룹 32×32, 위치 (0, 0) | — | `icon="clock"` | 확정 |

- Focus 링이 감싸는 범위: 해당 없음(누를 요소 없음, Q-06 A).
- Figma에 실제로 없는 상태·조합: hover, pressed, focus, disabled. Cancelation에 아이콘을 넣은 모양도 없다(`icon`은 highlight에서만 쓴다). CANCELED 말고 다른 예약 상태 모양도 없다.
- Tags·Clock: Callouts 안에서 그린 모양은 Figma에 없다. 사용자가 Q-03 A2로 아이콘 세트의 3종을 Callout 안 같은 32×32 자리에서 고르도록 정했다.
- 미조회·실패·잘린 응답:
  - 실패나 잘림은 없다.
  - Property Highlight의 높이는 내용에 맞춰 늘어난다(코드에 고정 높이 없음).
  - Cancelation 높이 165는 Home 인스턴스에서 읽었다. 165 = 24+21+24+72+24로 테두리 두께가 더해지지 않았으므로, 테두리는 Figma 안쪽 선으로 본다. 렌더 검사에서 2px 이내 차이를 확인한다.
  - design context가 보고한 Callouts의 속성은 `Property 1` 하나뿐이다.

### 크기·간격 (Figma 값 → CSS)

| 요소 | Figma 값 | CSS |
|---|---|---|
| 상자(두 변형 공통) | 흰 바탕, 테두리 1 #DDDDDD(안쪽 선), 모서리 12, 여백 24 | `--border-width-thin`, `--radius-lg`, padding `calc(var(--spacing) * 6)`. 안쪽 선과 맞추는 방법(테두리 두께만큼 padding을 빼기)은 구현 때 원본 대조로 확인한다. |
| 폭 | Property Highlight 349, Cancelation 361 | 부모 폭을 채운다(Q-07 A). Storybook은 Figma 폭(349·361)의 칸에서 보여 준다. |
| Property Highlight | 문장과 아이콘 사이 8. 위쪽 정렬(items-start). 아이콘 32×32 | gap `calc(var(--spacing) * 2)`, 아이콘 `calc(var(--spacing) * 8)` |
| Cancelation 세로 묶음 232:2130 | 제목과 아래 줄 사이 24 | gap `calc(var(--spacing) * 6)` |
| Cancelation 줄 232:2132 | 사진 108×72(모서리 12)과 글 묶음 사이 16 | `calc(var(--spacing) * 27)`×`calc(var(--spacing) * 18)`, `--radius-lg`, gap `* 4` |
| 글 묶음 232:2134 / 232:2136 | CANCELED와 다음 묶음 사이 2. 이름과 코드 사이 8 | gap `calc(var(--spacing) * 0.5)` / `* 2` |
| 줄 높이 | 글자 상자는 `leading-normal`. 스타일의 lineHeight 100은 단위를 알 수 없다. | `line-height: normal` |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 상자 바탕 | #FFFFFF / Shade 01 | shade-01 | `surface` | #FFFFFF | 일치(부품 표면) | — |
| 상자 테두리 | #DDDDDD / Neutral 03 | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 문장·제목·숙소 이름·예약 코드 | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| "CANCELED" | #C13515 / Error 02 | error-02 | `danger` | #C13515 | 일치(오류·위험 = 취소 상태, Q-08 A) | — |
| 사진 자리 232:2133 | #DDDDDD / Neutral 03 | neutral-03 | `image-placeholder-subtle`(새, 합친 목록) | rev 5 적용 뒤 #DDDDDD | 일치 | 기존 `image-placeholder`는 #B0B0B0(Neutral 06)이라 값이 다르다. `border`·`indicator`는 값만 같고 역할이 다르다. |
| 아이콘 선(세 아이콘 모두) | #D03660 / Accent 02 | accent-02(지금 있음) | `icon-accent`(새, 합친 목록) | rev 5 적용 뒤 #D03660 | 일치 | 새 역할. primitive는 리드가 가져옴 |
| 아이콘 연한 채움(세 아이콘 모두) | #F6D7DF / Accent 01 | accent-01(지금 있음) | `icon-accent-subtle`(새, 합친 목록) | rev 5 적용 뒤 #F6D7DF | 일치 | 새 역할 |
| 아이콘 흰 채움(Tags·Clock) | #FFFFFF(SVG `white`) / Shade 01 | shade-01 | `surface` | #FFFFFF | 일치(아이콘이 놓인 상자 바탕과 같은 흰색, Q-08 A) | — |
| Diamond 마스크 | `fill="white"`(`<mask>` 안) | — | 없음 | — | 해당 없음 | Figma 안쪽 선을 표현하는 마스크라 화면에 보이는 색이 아니다. |
| 그림자 | 없음 | — | — | — | — | 두 변형 모두 effect가 없다. |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: 상자 자체가 흰색 fill이다. 세트 스크린샷의 회색은 Figma 세트 캔버스 배경이다. Storybook 캔버스는 페이지와 같은 흰 배경을 쓴다.
- 같은 값의 후보가 여러 개일 때 선택 근거:
  - #DDDDDD는 `border`·`indicator` 역할이 이미 있다. 하지만 사진 자리 채움은 둘 다와 역할이 달라 `image-placeholder-subtle`을 쓴다.
  - 흰색은 부품 표면인 `surface`만 쓴다. `info`·`success`·`warning`은 흰색으로 잘못 매핑된 역할이라 쓰지 않는다.
- 신규 token:
  - 새 역할: `icon-accent`·`icon-accent-subtle`·`image-placeholder-subtle`. 리드가 tokens.md revision 5에 넣는다.
  - primitive `accent-01`·`accent-02`·`neutral-03`은 지금 `tokens.css`에 있다.
- 글자 토큰(모두 지금 `tokens.css`에 있음):

| Figma 스타일 | 쓰는 곳 | 토큰 |
|---|---|---|
| Body Copy/16pt Semibold(16/590) | "This is a rare find.", 숙소 이름 | `--text-type-body-copy-16pt-semibold` + `--font-weight-type-body-copy-16pt-semibold` + `--font-type-body-copy-16pt-semibold` |
| Body Copy/16pt Regular(16/400) | "Hope’s place on Airbnb is usually fully booked." | `--text-type-body-copy-16pt-regular` + weight + font |
| Body Copy/18pt Semibold(18/590) | "Your reservation" | `--text-type-body-copy-18pt-semibold` + weight + font |
| Body Copy/12pt Semibold(12/590) | "CANCELED" | `--text-type-body-copy-12pt-semibold` + weight + font |
| 스타일 없음: SF Pro Regular 12/400(232:2138) | "Reservation code: XMPQKAPZ6D" | `--text-type-body-copy-12pt-regular` + `--font-weight-type-body-copy-12pt-regular` + `--font-type-body-copy-12pt-regular`(값 12/400이 정확히 같음, Q-09 A) |

- 토큰 생성 경로·검증 계획: 리드가 tokens.md revision 5를 적용한다(`pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens`). 그 뒤 구현에서 쓰는 모든 `var(--…)`가 정의돼 있는지 `pnpm ds:guard`(G13)로 확인한다. 생성물은 직접 고치지 않는다.

## 7. 원본 아이콘·asset

asset 이름은 MCP asset 해시 앞 8자이고, 괄호 안은 내려받은 파일의 sha256 앞 12자다.

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| Diamond 그룹 235:2573(변형 235:2578, Callouts 안 I235:2614;235:2573) | 569836a9….svg (d7494e75e365) | 상자 30.879×30.386. 채움 #F6D7DF. 다이아 외곽 stroke #D03660 2.383(마스크로 안쪽만), 윗면 선·가운데 선 stroke #D03660 1.192. 회전 없음 | highlight + `icon="diamond"`(기본) | cancelation | 확인 |
| Tags 그룹 235:2600(변형 235:2602) | f229b359….svg (3d1799b7c383) | 상자 33.244×31.872. 꼬리표 2장(채움 흰색, stroke #D03660 1), 안쪽 채움 #F6D7DF, 구멍 원 r1.3 stroke #D03660 1.25 | highlight + `icon="tags"` | cancelation | 확인 |
| Clock 그룹 235:2609(변형 235:2611) | 6f0ace34….svg (62dec7217a5c) | 32×32. 원 r15.25(채움 흰색, stroke #D03660 1.5), 부채꼴 #F6D7DF, 바늘 stroke #D03660 1.5 | highlight + `icon="clock"` | cancelation | 확인 |

- 그리는 방법: 키트 규칙대로 `<svg>` JSX로 그리고, 경로·크기·위치는 원본 그대로 쓴다. 아이콘이 여러 색이라 `currentColor` 하나로는 칠할 수 없으므로, 각 path의 색을 CSS 토큰 클래스로 준다(ListingCard 하트와 같은 방식).
- Diamond의 `<mask>`는 그대로 둔다.
- 아이콘은 장식이라 `aria-hidden`을 붙인다.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `type` | 세트 축 `Property 1` | `"highlight"` / `"cancelation"` | 변형에 맞게 렌더 | — | Q-02 A |
| `title`(highlight) | text 145:1889 앞부분 | "This is a rare find." | 굵은 글(16pt Semibold) | — | Q-04 A |
| `children`(highlight) | text 145:1889 뒷부분 | "Hope’s place on Airbnb is usually fully booked." | title 뒤에 공백을 두고 같은 문단에 보통 글(16pt Regular) | — | Q-04 A |
| `icon`(highlight) | Callout Icons 235:2613 | `"diamond"`(기본) / `"tags"` / `"clock"` | 오른쪽 위 32×32 아이콘, `aria-hidden` | — | Q-03 A2 |
| `title`(cancelation) | 232:2131 | "Your reservation" | 18pt Semibold 제목 | — | Q-05 A |
| `imageSrc` / `imageAlt` | 232:2133 | 없음 / "" | 있으면 108×72 사진을 채우고, 없으면 #DDDDDD 자리 | — | Q-05 A |
| `status` | 232:2135 | "CANCELED" | 12pt Semibold, 늘 `danger` 색 | — | Q-05 A |
| `name` | 232:2137 | "tiny house, tiny farm" | 16pt Semibold | — | Q-05 A |
| `code` | 232:2138 | "Reservation code: XMPQKAPZ6D" | 12pt Regular | — | Q-05 A |
| 최상위 요소 | — | `<div>` | `data-testid="ds-callout"`, 클래스 `ds-callout`·`ds-callout--<type>`. 링크·버튼 없음 | 포커스가 가는 요소 없음 | Q-06 A |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 부품 이름과 역할(Notification은 상태 알림) | A. 새 `Callout`, Notification 유지(추천). B. Notification에 variant 추가 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | 범위. Home "Your reservations"가 Cancelation 인스턴스 | A. 두 변형 모두(추천). B. Property Highlight만 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 롤아웃 문서 §6도 Home "Your reservation"을 Callout으로 바로잡았다. | resolved |
| Q-03 | 아이콘(`Callout Icons` 235:2614, 같은 이름의 키트 부품 없음) | A1. `none`, diamond만. A2. `none`, diamond·tags·clock(추천). B. 별도 `CalloutIcon` 부품 | 추천안 채택(A2) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | Property Highlight 문장 API | A. `title` + `children`(추천). B. `children` 하나 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | Cancelation API | A. `title`·`imageSrc`·`imageAlt`·`status`·`name`·`code`, status는 늘 danger(추천). B. 상태를 canceled로 고정 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-06 | 동작(Figma에 누를 곳 없음) | A. 정적 상자(추천). B. Cancelation 전체를 링크로 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | 폭(Figma 349·361 고정) | A. 부모 폭 채움, Storybook은 Figma 폭(추천). B. 고정 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | 색 역할 | A. 제안대로(추천). B. 사용자가 이름 지정. C. 다시 가져온 뒤 역할만 지정 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 새 색 역할은 "합친 목록 + 다시 가져오기"로 결정했다. `icon-accent`·`icon-accent-subtle`·`image-placeholder-subtle`은 합친 목록의 이름과 같고, primitive `accent-01`·`accent-02`는 리드가 가져왔다. | resolved |
| Q-09 | 스타일 없는 12px/400 글자(232:2138) | A. 새 글자 토큰(추천). B. Figma에 스타일 지정 후 가져오기. C. 다른 토큰 섞기 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드가 Typography를 가져와 생긴 `body-copy-12pt-regular`(12/400)가 정확히 같다 → 그 토큰을 쓴다. | resolved |
| Q-10 | (rev 2) Checkout "Rare find!" 띠(812:12363, Callout 인스턴스 아님)를 어떻게 만들지. 사용자 결정 "구역도 부품으로"·"페이지 모양 유지" | **A (추천)** Callout 에 `type="banner"` 를 더함: 분홍 바탕 한 줄, 가운데, `children` = 글자, `iconSrc` = 그림(12.3절) · B 새 부품(예 `Banner`) — 정보 상자라는 같은 역할의 복제 · C 기존 `type="highlight"` 로 그림(흰 상자·테두리·두 문장 — 현재 모양과 다름) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-11 | (rev 2) 띠 아이콘. 현재 페이지는 `checkout-icon-rare-find.png`(32×32 RGBA 래스터, 분홍 보석, sha256 535b9a25c90e). Callout Icons Diamond(235:2578, 선 그림)와 다른 그림. Figma 812:12367 의 원본 형식은 읽지 못함(design_context 실패) | **A (추천)** 페이지가 `iconSrc` 로 PNG 를 넘기고 Callout 은 장식 `<img alt="">` 32×32 로 그림(현재 모양 그대로, Card 메달 PNG 와 같은 방식) · B Callout Icons `icon="diamond"` SVG 를 씀(모양이 바뀜) · C 구현 전에 Figma 812:12367 을 한 번 더 읽어 벡터면 `<svg>` JSX 로 그림 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드 확인: Figma design-context 가 응답하지 않아 C 는 할 수 없음 — 현재 페이지 asset 을 쓰는 것이 채택된 대안 | resolved |
| Q-12 | (rev 2) 띠 바탕 #FBEFF8 의 primitive·역할이 없음(accent-01 #F6D7DF 와 다름) | **A (추천)** 새 매핑: primitive #FBEFF8(Figma 이름 미조회) → 새 역할(예 `surface-accent-subtle`, 리드 tokens rev 6) · B `icon-accent-subtle`(#F6D7DF)로 바꿈(더 진한 분홍, 모양이 달라짐) | 사용자 결정 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → #FBEFF8 은 #F7F7F7, 기존 역할 `surface-raised`(리드 대응표). 새 역할 `surface-accent-subtle` 은 만들지 않음 | resolved |
| Q-13 | (rev 2) 띠 글자 14px / 500 / 줄 높이 18 / 자간 -0.1504px: 500 은 키트 합성 토큰 `--font-weight-medium`, 자간 토큰 없음(모두 0) | **A (추천)** 500 은 `--font-weight-medium` 사용 확정, 자간은 같은 값의 새 토큰(리드 tokens rev 6), 줄 높이 `calc(var(--spacing) * 4.5)` · B 자간 0(글자 폭 약 6px 넓어짐, 가운데 정렬이라 위치가 3px 씩 바뀜) | 사용자 결정 "Figma 스타일 값으로 맞춤" + "지금 크기·자간 유지 (권장)" (chosen in chat, 2026-11-26) → 500 은 `--font-weight-medium`(Figma 변수 sds-typography-weight-medium), 자간 `calc(var(--spacing) * -0.0376)`, 줄 높이 `calc(var(--spacing) * 4.5)` | resolved |
| Q-14 | (rev 2) Home 카드 크기 차이(12.2 표): 현재 페이지 363 폭(Figma 361 보다 2 넓음 → 카드 간격이 386, Figma 384), CANCELED·이름 줄 높이 1px 차이. Callout(rev 1)은 Figma 값(361, 줄 높이 normal) | **A (추천)** Callout rev 1 그대로(Figma 와 같음). 페이지는 361 칸 + 사이 23 으로 놓는다(현재보다 2번째 카드부터 2·4·6…px 왼쪽, 글자 1px 이내) · B 현재 페이지에 맞추는 옵션을 더함(363 폭·줄 높이 14/19 — Figma 근거 없음) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-15 | (rev 2) Home 사진의 대체 글. 현재 `alt=""`. 바로 옆에 숙소 이름 "tiny house, tiny farm" 이 글자로 있음 | **A (추천)** `imageAlt=""`(장식 — 이름은 글자가 읽음, 지금과 같음) · B 숙소 이름을 alt 로(화면 읽기가 이름을 두 번 읽음) · C 사진을 설명하는 다른 문구 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

revision 1 의 질문(Q-01~Q-09)과 revision 2 의 질문(Q-10~Q-15)이 모두 해결됐다. revision 2 계획 승인("Approve revision 2")은 아직 받지 않았다.

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 235:2641 스크린샷과 같은 모양. 흰 상자와 흰 캔버스 | Storybook iframe 스크린샷·computed style | |
| 모든 상태·크기 | highlight(349 칸)와 cancelation(361 칸, 높이 165)이 같은 여백·간격·글자 크기. 테두리 안쪽 선과의 차이(2px 이내)를 기록 | DOM 측정, 원본 대조 | |
| 아이콘과 노출 조건 | `icon` 3종이 235:2613 스크린샷과 같은 모양·위치로 오른쪽 위 32×32에 있음. cancelation에는 아이콘 없음 | DOM·스크린샷 대조 | |
| 클릭·입력·선택 등 기능 | 누를 요소가 없음 | Storybook play에서 버튼·링크가 없음을 확인 | |
| disabled / Tab / Focus | Tab이 Callout 안에서 멈추지 않음 | play `userEvent.tab` | |
| Nested parts identity | 해당 없음: 아이콘 행이 `none`이라 키트 부품을 import하지 않음 | 코드 검토, `ai:check` | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, Notification 등 기존 부품에 영향 없음 | `pnpm ai:check Callout`, `pnpm ai:verify Callout`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 원본 대조를 따로 기록한다. 아직 수행한 검사는 없다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 부품 계획 8개의 질문 91개를 어떻게 답할까요? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26). Q: 새 색 역할 → A: 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26).
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 없음. tokens.md revision 5(`icon-accent`·`icon-accent-subtle`·`image-placeholder-subtle`)는 적용됐다.
- revision 2(12절) 사용자 결정(chosen in chat, 2026-11-26): "추천안 모두 채택 (권장)" — Q-10·Q-11·Q-14·Q-15 / "Figma 스타일 값으로 맞춤" — Q-12·Q-13(굵기) / "지금 크기·자간 유지 (권장)" — Q-13(자간).
- 승인한 revision: 2 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- revision 2 구현 전 조건: 없음 — 새 토큰이 필요 없다(`surface-raised`·`text`·`--font-weight-medium`·`--radius-lg` 는 이미 있음).

## 12. Revision 2 — Home 예약 사진과 Checkout "Rare find!" 띠 (바뀌는 내용만)

### 12.1 요청과 근거

- 요청: 사이트 재정립(2026-11-26). 사용자 결정 "구역도 부품으로 (권장)"·"페이지 모양 유지 (권장)" — 페이지 모양과 Figma 부품 모양이 다르면 페이지를 바꾸지 않고 부품에 variant 를 더한다.
- 읽은 자료:
  - Home: `my-website/figma/Home.layers.xml` "Your reservations" 767:348(1513×165)의 `Callouts` 인스턴스 424:10809·424:10810·424:10811·767:349(각 361×165, x 0·384·768·1152 → 카드 사이 23). 현재 페이지 `HomePage.tsx` 136~153행, `HomePage.css` 247~327행.
  - Checkout: Q5QD `get_metadata 812:1056`(2026-11-26 직접 조회) 오른쪽 열 812:12280 > 812:12362(위 여백 24) > 띠 **812:12363**(390×48): 아이콘 묶음 812:12364 (56.5,16) 40×16 > 812:12365 32×32(y −8) > 812:12366 32×36 > frame "Icon" **812:12367** 32×32, 글자 812:12679 (96.5,15) 237×18 "Rare find! This place is usually booked". 인스턴스 없음(rev 1 1절과 같음). 현재 페이지 `CheckoutPage.tsx` 231~235행, `CheckoutPage.css` 508~537행.
  - Playwright 1440px 측정과 Storybook(6007) `components-callout--cancelation`·`--property-highlight` 측정: `<로컬 측정 폴더>/rebuild/E/parts-measure.json`, `checkout-measure.json`. 두 페이지 모두 콘솔 오류 0, 깨진 그림 0.
- Figma 호출: 이 에이전트 2회(`get_metadata 812:1056` 성공, `get_design_context 812:12280` 실패 — 전송 끊김, 다시 부르지 않음). 그래서 띠의 Figma 색·글자 스타일 이름과 812:12367 아이콘의 원본 형식(벡터/그림 채우기)을 읽지 못했다.
- 읽은 규칙: `docs/ai-component-workflow.md` 1.0 R01~R09, `docs/ai-design-system-spec.md` 1.1.

### 12.2 Home "Your reservation" — 사진이 있는 Cancelation

- 사실: rev 1 이 승인한 `imageSrc`·`imageAlt`(Q-05 A)로 이미 그릴 수 있다. 사진이 있으면 108×72 자리를 `object-fit: cover` 로 채우고 모서리 12 로 자른다. 사진 `reservation-1.jpg`~`reservation-6.jpg` 는 240×160(3:2 = 108×72 와 같은 비율). → **새 prop 이 필요 없다.**
- 페이지는 6장(PRD), Figma 는 4장(줄이 옆으로 넘침). 장 수는 페이지 데이터다.
- 현재 페이지와 Callout(rev 1, Storybook 측정)의 차이:

| 요소 | 현재 Home 페이지 | Callout Cancelation (Storybook) | Figma |
|---|---|---|---|
| 카드 | **363**×165(flex 361 이지만 안쪽 최소 폭 313 + 여백 48 + 테두리 2 때문에 2 늘어남), 여백 24 + 테두리 1 | 361×165(여백 23 + 테두리 1, 안쪽 313) | 361×165 |
| 카드 사이 | 23 → 간격 386 | (페이지 배치) | 23 → 간격 384 |
| 제목 "Your reservation" | 313×21, 18/590 | 313×21, 18/590 | 1절 표 |
| 사진 | 108×72, 모서리 12, 바탕 #DDD | 108×72, 모서리 12, `image-placeholder-subtle` | 108×72 |
| CANCELED | 높이 14(줄 높이 14px), #C13515 12/590 | 높이 15(normal) | leading normal |
| 숙소 이름 | 위에서 16, 높이 19(19px) | 위에서 17, 높이 18(normal) | |
| 예약 코드 | 위에서 43, 높이 14 | 위에서 43, 높이 15 | |
| 사진 대체 글 | `alt=""` | `imageAlt` 기본 "" | — |

- 이 revision 에서 더하는 것: 스토리 `CancelationWithPhoto`(361 칸, `imageUrl("reservation-1")` — 스토리가 `@/assets/images` 를 읽음, 부품 코드는 그림을 import 하지 않음). Q-14·Q-15 의 답에 따라 차이를 기록한다.

### 12.3 Checkout "Rare find!" 띠 — `type="banner"` (Q-10 A 기준)

| 요소 | 현재 페이지(측정) | Figma 812:12363 | CSS |
|---|---|---|---|
| 상자 | 390×48(부모 폭), 바탕 원래 #FBEFF8, 모서리 12, 여백 12, 테두리·그림자 없음 | 390×48 | 폭 100%, 높이 `calc(var(--spacing) * 12)`, padding `* 3`, `--radius-lg`, 바탕 `surface-raised` #F7F7F7(Q-12 사용자 결정) |
| 배치 | 아이콘 + 8 + 글자, 가로 가운데·세로 가운데. 아이콘 x +51.81, 글자 x +91.81 | 아이콘 x 56.5, 글자 x 96.5(237 폭) — 같은 가운데 정렬, 글꼴 폭 차이 | `justify-content: center`, `align-items: center`, gap `* 2` |
| 아이콘 | 32×32 `<img>` PNG(분홍 보석, 장식) | frame "Icon" 812:12367 32×32(원본 형식 미조회) | `* 8`, 페이지가 주는 `iconSrc` 를 `<img alt="">`(Q-11) |
| 글자 | 14px / 500 / 줄 높이 18 / 자간 -0.1504px / #222222, 한 줄(줄바꿈 없음), 246.38 폭 | 237×18 | `--text-type-body-copy-14pt-regular`·`--font-type-body-copy-14pt-regular`, `--font-weight-medium`, 줄 높이 `calc(var(--spacing) * 4.5)`, 자간 `calc(var(--spacing) * -0.0376)`, `white-space: nowrap`(Q-13) |

| prop | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `type` | Checkout 812:12363 | rev 1 의 `"highlight"`·`"cancelation"` + `"banner"` | `banner`: 위 표의 한 줄 띠. Figma Callouts 세트(235:2641)에는 없는 모양이고 Checkout 화면 frame 이 근거 | 누를 요소 없음(rev 1 Q-06 A 와 같음) | Q-10 추천안 채택 |
| `children`(banner) | text 812:12680 | "Rare find! This place is usually booked" | 한 줄 글자 | — | Q-10 추천안 채택 |
| `iconSrc`(banner) | 812:12367 / `checkout-icon-rare-find.png` | 없음 / 그림 주소(페이지가 `imageUrl()` 로 넘김) | 32×32 장식 `<img alt="">`. 없으면 글자만 | — | Q-11 추천안 채택 |

- `title`·`icon`·`imageSrc`·`status`·`name`·`code` 는 banner 에서 쓰지 않는다. 루트는 rev 1 과 같은 `<div data-testid="ds-callout" class="ds-callout ds-callout--banner">`(정적 정보, `role="status"` 없음 — 바뀌는 알림이 아님).
- CSS 는 `.ds-callout--banner` 가 rev 1 공통 상자(흰 바탕·테두리·여백 23)를 이 모양으로 바꾼다. 다른 부품의 `.ds-*` 를 건드리지 않는다.

### 12.4 색·글자 토큰 (rev 2 에서 더 쓰는 것)

| 요소 / 상태 | 현재 값·alpha (Figma 변수: 미조회) | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 띠 바탕 | 원래 #FBEFF8 | fills-vibrant-use-plus-lighter-darker-quaternary | `surface-raised` | #F7F7F7 | 사용자 결정으로 바꿈 | Q-12: "Figma 스타일 값으로 맞춤" — #FBEFF8 → #F7F7F7(리드 대응표). 새 역할 없음 |
| 띠 글자 | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| Home 사진·글자 | rev 1 6절 그대로 | — | — | — | 일치 | — |

- 띠 글자: 크기 `--text-type-body-copy-14pt-regular`(14px)·글꼴 `--font-type-body-copy-14pt-regular`(이 Mac 에서 페이지 글꼴과 같은 `.SF NS`, CDP 확인), 굵기 500 → `--font-weight-medium`(Figma 변수 sds-typography-weight-medium), 줄 높이 `calc(var(--spacing) * 4.5)`, 자간 -0.1504px → `calc(var(--spacing) * -0.0376)`(Q-13 사용자 결정: 지금 값 유지).
- 신규 token: 없음.

### 12.5 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 띠 아이콘 812:12367 | `my-assets/images/checkout-icon-rare-find.png`(sha256 535b9a25c90e, 32×32 RGBA, 커밋 de048b6 에서 들어옴) | 32×32, 분홍 보석(여러 색 래스터) | `type="banner"` + `iconSrc` | 다른 type | 확인 — 사용자가 채택한 대안(현재 페이지 asset, Q-11 A). Figma 812:12367 원본 형식(벡터/그림 채우기)은 design-context 가 응답하지 않아 읽지 못한 채로 남는다 |
| Home 사진 | `reservation-1.jpg`~`-6.jpg`(예 reservation-1 sha256 e7e058c5f486, 240×160) | 108×72 cover, 모서리 12 | `type="cancelation"` + `imageSrc` | — | 확인 — 페이지 데이터 |

### 12.6 영향받는 사용처와 파일

- `type` 기본값 `"highlight"` 와 기존 두 type 의 모양은 그대로다. Callout 을 쓰는 페이지는 아직 없다.
- 변경할 파일: `Callout.tsx`(`type` 에 `"banner"`, `iconSrc`), `Callout.css`(`.ds-callout--banner`), `Callout.stories.tsx`(`CancelationWithPhoto`·`Banner` 스토리), `Callout.figma.tsx`(banner 는 Figma 세트 변형이 아니므로 Code Connect 대응을 넣지 않음).

### 12.7 검증 계획 (rev 2 에서 더함)

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| `CancelationWithPhoto` | 361×165, 사진 108×72 cover·모서리 12, 글자 위치 12.2 표(Q-14 답대로) | Storybook iframe 과 Home 나란히 DOM 측정·스크린샷 | |
| `Banner` | 390 칸에서 390×48, 바탕 #F7F7F7(`surface-raised`, 사용자 결정 — 원래 #FBEFF8), 모서리 12, 아이콘 32 + 8 + 글자 한 줄 가운데, 글자 자간 -0.1504px | Storybook iframe 과 `/checkout` 나란히 DOM 측정·스크린샷 | |
| 기능·접근성 | banner·cancelation 모두 누를 요소 없음(Tab 이 멈추지 않음), 사진·아이콘 alt 가 Q-15·Q-11 답과 같음 | play `userEvent.tab`, DOM 검사 | |
| rev 1 회귀 | 기존 스토리 모양·play 그대로 | `pnpm ai:check Callout`, `pnpm ai:verify Callout`, `pnpm typecheck`, `pnpm ds:guard` | |
