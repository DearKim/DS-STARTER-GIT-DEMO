---
kind: design-system-rollout
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-
status: draft
---

# Airbnb UI Kit → 디자인 시스템 적용 계획 (전체 목록)

> 작성: Claude Code, 2026-11-26. 사용자 요청: "둘 다 확인해서 디자인 시스템에 적용해줘" (왼쪽 탭 페이지 + 🧩 Components 페이지).
> 이 문서는 전체 범위·순서를 정하는 목록이다. 실제 구현은 부품마다 `docs/plans/components/<Name>.md` 계획을 쓰고 사용자 승인을 받은 뒤에만 한다.

## 1. 읽은 자료

- Figma 파일 Q5QDGE5WoXefOxgm5fziH3, 문서 전체 구조(`get_metadata 0:0`), 2026-11-26 Figma Desktop MCP 직접 조회.
- 🧩 Components(208:2874)는 원본을 가져다 놓은 **인스턴스 모음**이다. variant 를 가진 **원본 묶음(Component Set)** 은 왼쪽 탭 페이지들에 있다. 그래서 원본은 탭 페이지에서, 쓰임새·배치는 🧩 Components 에서 본다.
- 아직 읽지 않은 것: 각 묶음의 색·치수·아이콘(`get_design_context`·`get_variable_defs`). 부품 계획을 쓸 때 묶음마다 읽는다.

## 2. Figma 원본 묶음과 코드 부품 대응

| Figma 탭 | 원본 묶음 (노드) | variant 축 | 코드 부품 | 할 일 | 우리 페이지에서 쓰는 곳 |
|---|---|---|---|---|---|
| Buttons | Primary Buttons (238:2153) | State 6 × Size Full Width/Small × Icon Off | `Button` | 기존 키트 부품을 Figma 에 맞게 고침 | Detail "Reserve" |
| Buttons | Secondary Buttons (238:2188) | State 6 × Size 2 × Icon Off/On | `Button` | 〃 | — |
| Buttons | Tertiary Buttons (238:2256) | State 6 × Size 2 × Icon Off/On | `Button` | 〃 | Checkout "Next" |
| Buttons | Links (238:2309) | State Default/Focus × Size Small/Medium × Type Subtle/Legal × Icon | `Link` | 기존 부품 고침 | "Become a Host", 푸터 링크 |
| Accordion | Accordion (208:3237), FAQ / Desktop (35:1850) | State Open/Closed | `Accordion` | 기존 부품 고침 | — |
| Card | Card (238:2378) | Card type: Default/Sleep/Reservation/Reservation Confirmation/Discount/Map | Default = `ListingCard`(완료). 나머지 5종 | Q-02 | Home "Your reservation", Detail 침실, Checkout 요약 |
| Checkbox | Checkboxes with labels (209:1419), Checkboxes (209:1420) | State 3 × Checked × Size Medium/Small × Sub Text | `Checkbox` | 기존 부품 고침 | — |
| Callout | Callouts (235:2641), Callout Icons (235:2613) | Property Highlight/Cancelation, 아이콘 Diamond/Tags/Clock | `Callout` | 새로 만듦 | Checkout "Rare find!" |
| Chips | Chips (234:2568) | State Default/Hover/Pressed/Select/Focus | `Chip` | 새로 만듦 (Select 는 선택 상태 prop) | Home "Hotels·Motel·…" |
| Chips | Map Chips (234:2560) | State Default/Hover/Pressed/Selected/Viewed/Favorited | `MapChip` | 새로 만듦 | — |
| Drop Down | Drop Down (233:1865), Menu / Open, Drop down / Open | State 4 × Label × Icon | `Dropdown` | 기존 부품 고침 | — |
| Inputs | Inputs (208:2159) | State 4 × Status Error/Default × Label × Helper Text × Icon (40개) | `TextInput` | 기존 부품 고침 | Detail 예약 상자 칸 |
| Inputs | Textarea (208:2718) | 1개 | `Textarea` | 기존 부품 고침 | — |
| Navigation | Navigation (235:2441) | Main / Stays / Expanded Stays | `Navigation` | 새로 만듦 | 세 페이지 맨 위 |
| Reviews | Reviews (234:2300) | Review / Review Scale | `Review` | 새로 만듦 | — |
| Radio Buttons | Radio Buttons with Labels (213:1943), Radio Button (213:1944) | State 3 × Checked × Subtext | `RadioButton` | 기존 부품 고침 | Checkout "Choose when to pay" |
| Tabs | Underline Tabs (229:2214), Pill Tabs (237:2219) | State 4 × Line × Icon / State 3 | `Tabs` | 기존 부품 고침 | Home 서비스 탭, "Inspiration" 탭 |
| Toggle | Toggle with Labels (218:1869), Toggle (234:4190) | State 3 × On/Off × Subtext | `Toggle` | 기존 부품 고침 | — |
| Tooltip | Tooltips (235:2931), Union (235:2863) | 방향 4 × Title × White/Black | `Tooltip` | 기존 부품 고침 | — |
| Tiles | Property Type (234:2853) | State Default/Hover/Focus/Selected/Pressed | `Tile` | 기존 부품 고침 (Selected 는 선택 상태 prop) | — |
| Tiles | Sleep Card (234:3666), Sleep Areas 아이콘 (234:3680), Property Type 아이콘 (234:3911) | 아이콘 5종·4종 | Card 의 Sleep 과 함께 결정 | Q-02 | Detail "Where you'll sleep" |
| 🎨 Colors & Typography | Colors (245:3518), Typography (245:3517) | — | 토큰 | 이미 가져옴(토큰 계획 rev 4). 빠진 값만 확인 | 전체 |
| ☁️ Elevation | Rectangle 1~3 (245:3512~3514) | 그림자 3단계로 보임 | 토큰 `--shadow-*` | 지금은 키트 기본값(합성) → Figma 값으로 바꿀지 확인 | 카드·메뉴 그림자 |

- Internal Only Canvas(0:2)의 묶음(Accordian, Boxes, checkbox, gradient, Login, Logo, 아이콘 등)은 위 원본들이 안에서 쓰는 하위 부품이다. 각 부품 계획의 Nested parts 에서 다룬다.
- 기존 키트 부품을 고치면 공개 API 가 Figma 축에 맞게 바뀐다. 지금 페이지가 실제로 그리는 키트 부품은 `ListingCard` 와 `Link`(3곳)뿐이라 영향이 작다. 페이지는 자유 모드로 만든 것이라, 부품을 고쳐도 페이지 모양은 바뀌지 않는다(페이지가 부품을 쓰게 바꾸는 일은 별도).

## 3. 진행 방법

- 부품마다: Figma 읽기 → `docs/plans/components/<Name>.md` 계획 → **사용자 승인** → 구현 → `pnpm ai:check`·`ai:verify`·실제 hover/눌림/focus 색 대조.
- Figma 읽기는 묶음마다 2~3번 호출이 든다. 전체는 약 60~90번이라 하루 한도에 걸릴 수 있어 단계로 나눈다.
- 계획은 단계마다 묶어서 한 번에 승인받는다.

## 4. 결정이 필요한 것

| ID | 질문 | 선택지 | 사용자 답 | 상태 |
|---|---|---|---|---|
| Q-01 | 범위·순서 | 페이지에서 쓰는 부품부터 단계별 / 전부 한 번에 / 몇 개만 | 페이지 부품부터 단계별 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | Card 의 나머지 5종(Sleep·Reservation·Reservation Confirmation·Discount·Map)을 어떻게 나눌지 | 종류마다 부품 하나 / Card 하나에 `type` / 페이지에서 쓰는 것만 | Card 하나에 type (chosen in chat, 2026-11-26) | resolved |
| Q-03 | Elevation 그림자를 Figma 값으로 바꿀지 | 바꿈 / 키트 기본값 유지 | Figma 값으로 바꿈 (chosen in chat, 2026-11-26) | resolved |

## 5. 그림자(Elevation) 토큰 — 읽은 사실

`get_variable_defs 245:3354`(☁️ Elevation 페이지), 2026-11-26. Figma 효과 스타일 3개:

| Figma 스타일 | 원문 | CSS 로 옮기면 | 보이는 모양 |
|---|---|---|---|
| Elevation 01 | DROP_SHADOW #0000002B, offset (0, 4), radius 18, spread 0 | `0 4px 18px 0 #0000002B` (검정 17%) | 아래로 퍼지는 부드러운 그림자 |
| Elevation 02 | DROP_SHADOW #00000030, offset (0, 1), radius 5, spread -363 | `0 1px 5px -363px #00000030` (검정 19%) | **퍼짐 -363px 때문에 Figma 에서도 보이지 않음**(245:3513 렌더 확인) |
| Elevation 03 | DROP_SHADOW #0000001F, offset (0, 6), radius 16, spread 0 | `0 6px 16px 0 #0000001F` (검정 12%) | 아래로 퍼지는 그림자 |

- 지금 `--shadow-sm/md/lg` 는 키트 기본값(합성)이고, 키트 기본 부품 일부가 쓴다.
- 가져오는 길: 키트의 `pnpm ds:figma "<URL>" …` 는 Effect 를 그림자 토큰으로 바꿔 준다. 이미 가져온 변수가 있으면 이름 기준으로 합친다(새 이름 추가, 같은 이름은 Figma 값으로 갱신, 이번에 안 보인 이름은 유지 — `scripts/figma-tokens.mjs` 머리말). Colors(245:3518)·Typography(245:3517)·Elevation(245:3354) 세 노드를 한 번에 가져오고, 가져오기 전후 색 목록을 대조한다.

| ID | 질문 | 선택지 | 사용자 답 | 상태 |
|---|---|---|---|---|
| Q-04 | 그림자 토큰 이름 | Figma 이름 그대로 `--shadow-elevation-01~03` 추가(부품은 Figma 가 쓴 스타일을 그대로 씀) / 키트 `--shadow-sm·md·lg` 값만 바꿈(어느 단계가 sm·md·lg 인지 정해야 함) | Figma 이름으로 추가, 키트 sm/md/lg 는 그대로 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | Elevation 02 의 퍼짐 -363px | Figma 그대로(작은 요소에선 안 보임) / 퍼짐 0 으로 바로잡음(Figma 와 달라짐) / Elevation 02 는 쓰지 않음 | Figma 값 그대로 (Q-04 와 함께 chosen in chat, 2026-11-26) | resolved |
| Q-06 | 부품 계획 8개의 질문 91개 | 추천안 모두 채택 / 중요한 것만 직접 / 계획서 직접 보고 답함 | 추천안 모두 채택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | 새 색 역할 정리 | 합친 목록 + Colors & Typography 다시 가져오기 / 계획서 제안 그대로 | 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | Tabs 탭 사이 간격 | 32px / 24px | 32px (chosen in chat, 2026-11-26) | resolved |
| Q-09 | Card Reserve hover(72:1401, Figma 에서 못 읽음) | hover 없이 / Primary 버튼 hover 와 같게 / Card 보류 | Primary 버튼 hover 와 같게 (chosen in chat, 2026-11-26) — Figma 값이 아닌 사용자 결정 | resolved |
| Q-10 | Figma 스타일에 연결되지 않은 값 3개(검색 알약 그림자 235:2440, 알약 탭 그림자 237:2219, Card 침실 제목 16px/510) | 근거와 함께 토큰 추가 / 이번엔 빼기 | 근거와 함께 토큰 추가 (chosen in chat, 2026-11-26) | blocked — 아래 참고 |

**Q-10 처리:** 키트에는 Figma 스타일이 아닌 값을 토큰으로 넣는 입력 경로가 없다. `scripts/lib/figma-merge.mjs` 는 Figma 에서 오지 않은 그림자를 지우고, 글자 계획은 기존 토큰만 바꾼다. Figma 변수를 꾸며 넣지 않는다.
- 그림자 2개: 지금은 그리지 않는다. Figma 에서 두 그림자를 Effect 스타일로 만들면 `ds:figma` 로 다시 가져와 토큰이 생기고, 그때 Navigation·Tabs 에 더한다.
- 16px/510: 같은 값의 기존 토큰(크기 `--text-type-body-copy-16pt-regular`, 굵기 `--font-weight-type-body-copy-18pt-medium`)으로 정확히 그린다. Figma 에 "16pt Medium" 글자 스타일을 만들면 그 토큰으로 바꾼다.

**승인:** 부품 계획 8개 revision 1 과 토큰 계획 revision 5 — 사용자 "Approve revision 1·5 (권장)" (chosen in chat, 2026-11-26). 토큰 계획은 같은 날 적용(semantic 20 → 46).

## 6. 부품 계획 결과 (1단계, 2026-11-26)

| 계획 | 부품 | 열린 질문 | facts_complete | 못 읽은 것 |
|---|---|---|---|---|
| `components/Buttons.md` | Button, Link | 15 | false | 238:2153·238:2188·238:2309 metadata(변형 이름·크기), 238:2320 원본 이름, Hover·Pressed 스타일 이름 |
| `components/Chip.md` | Chip(새) | 6 | true | — |
| `components/Tabs.md` | Tabs | 11 | false | 포커스 획 정렬, Dome 아이콘 원본 세트, Pill 그림자 원래 효과 |
| `components/Navigation.md` | Navigation(새) | 13 | false | Drop down 27:9260 원본 이름, 그림자 스타일 이름 |
| `components/Callout.md` | Callout(새) | 9 | true | — |
| `components/RadioButton.md` | RadioButton | 10 | false | 213:1943 변형 크기, Subtext 변형이 체크박스로 그려진 Figma 오류 |
| `components/TextInput.md` | TextInput | 12 | false | Error Focus/Filled 테두리 정렬 |
| `components/Card.md` | Card(type) | 15 | false | `gradient` 238:2418·`clear` 238:2541 원본 이름 |

### Figma 와 페이지 대응 바로잡기 (계획 중 확인한 사실)

- Home "Your reservation" 카드는 Figma 에서 **Callouts(Cancelation) 인스턴스**다. 위 2절 표의 Card 칸이 아니라 Callout 에 해당한다.
- Checkout "Rare find!" 는 Callout 인스턴스가 아니다(분홍 바탕 한 줄). Callout 을 만들어도 그 페이지 모양과 다르다.
- Home 위쪽 아이콘 탭("All"…"Services")은 Underline Tabs 가 아니라 `Service tab` 인스턴스다. Home "Inspiration" 탭은 인스턴스가 아닌 일반 프레임이다.
- Checkout "Next" 는 페이지 값이 Secondary Small 과 같다(Tertiary 아님).
- 맨 위 막대는 Detail 만 Navigation 인스턴스(812:4703)이고 Home·Checkout 은 일반 프레임이다. "Become a Host" 는 Link 인스턴스가 아니라 Login 안의 글자다.
- Detail 예약 상자는 Card 인스턴스 812:8724(Reservation Card 크기)를 쓴다. Detail 의 CHECK-IN 칸 모양은 Figma Inputs 와 다르다.

### 새 색 역할 — 계획들의 제안을 합친 목록 (값과 역할이 모두 같은 것만 합침, R01·R08)

| 역할 | 값 | Figma 이름 | primitive | 쓰는 계획 |
|---|---|---|---|---|
| `selected` | #222222 | Shade 02 | shade-02 | Chip 선택 바탕, Tabs 선택 밑줄, Radio 선택 원 |
| `on-selected` | #FFFFFF | Shade 01 | shade-01 | Chip 선택 글자, Radio 안쪽 점 |
| `focus-ring` | #222222 | Shade 02 | shade-02 | Button·Chip·Tabs·Radio·TextInput 포커스 |
| `focus-ring-inner` | #D3D3D3 | Neutral 04 | neutral-04 | Button·Tabs 포커스 안쪽 선 |
| `border-emphasis` | #222222 | Shade 02 | shade-02 | Chip·Radio hover 테두리, Secondary 테두리(Radio 의 `border-hover` 를 합침) |
| `surface-inverse` / `on-inverse` | #222222 / #FFFFFF | Shade 02 / 01 | shade-02 / shade-01 | Tertiary 버튼 |
| `surface-disabled` / `on-disabled` | #DDDDDD / #FFFFFF | Neutral 03 / Shade 01 | neutral-03 / shade-01 | 비활성 버튼 |
| `surface-hover` | rgba(34,34,34,0.05) | Shade 02 - 5% | **새** `shade-02-5`(지금 값은 alpha 가 빠진 #222222) | Button hover |
| `surface-focus` | #F7F7F7 | (변수 없음) | fills-…-quaternary | Pill 탭 포커스 |
| `link` | #004CC4 | Link | **새** `link` | Link |
| `text-muted` | #B0B0B0 | Neutral 06 | neutral-06 | Tabs hover 흐린 글자 |
| `indicator-hover` | #D3D3D3 | Neutral 04 | neutral-04 | Tabs hover 밑줄 |
| `track` | #EBEBEB | Neutral 02 | neutral-02 | Pill 탭 바탕 |
| `border-subtle` / `border-medium` | #EBEBEB / #D3D3D3 | Neutral 02 / 04 | neutral-02 / 04 | Navigation |
| `loading-dot-muted` | #EBEBEB | Neutral 02 | neutral-02 | Button 로딩 점 |
| `avatar-placeholder` | #717171 | Neutral 07 | neutral-07 | Navigation 아바타 |
| `border-field` | #717171 | Neutral 07 | neutral-07 | Card 날짜·인원 칸 |
| `text-discount` | #008A05 | Discounts | **새** | Card 할인 금액 |
| `icon-accent` / `icon-accent-subtle` | #D03660 / #F6D7DF | Accent 02 / 01 | **새** accent-02 / accent-01 | Callout 아이콘 |
| `image-placeholder-subtle` | #DDDDDD | Neutral 03 | neutral-03 | Callout 사진 칸 |
| `danger-subtle` | #FEF8F6 | Error 01 | **새** error-01 | TextInput 오류 바탕 |

- 새 primitive 6개(shade-02-5, link, discounts, accent-01, accent-02, error-01)와 글자 스타일(13pt Semibold·Regular, 12pt Regular, 10pt Semibold)은 Figma "🎨 Colors & Typography" 페이지에 있는 변수·스타일이므로, 그 페이지에서 색·글자를 한 번에 다시 가져오는 것이 정확하다(`ds:figma` 는 색을 전면 교체하므로 가져오기 전후 색 목록을 대조해 기존 13색이 모두 남는지 확인한다).
- Figma 스타일에 연결되지 않은 글자(12px Regular, 16px/510)는 각 계획의 질문으로 남아 있다.
- 기존 `info`·`success`·`warning` 이 흰색으로 잘못 잡혀 있다. 이번 부품들은 쓰지 않는다.

## 7. 단계

- **1단계 (지금):** `Button`(Primary·Secondary·Tertiary), `Link`, `Chip`, `Tabs`(Underline·Pill), `Navigation`, `Callout`, `RadioButton`, `TextInput`, `Card`(type 6종), 그림자 토큰(Elevation). 부품 계획을 모두 쓰고 한 번에 승인받는다.
- **2단계:** `Accordion`, `Checkbox`, `Dropdown`, `Toggle`, `Tooltip`, `Tile`, `Review`, `MapChip`, `Textarea`.
