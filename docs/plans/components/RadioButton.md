---
kind: component
component: RadioButton
revision: 2
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=213-1943&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — RadioButton

> **revision 2 (2026-11-26, 재정립 계획 에이전트 E, 승인 대기):** Checkout "1. Choose when to pay" 의 현재 페이지 모양(글자 왼쪽·원 오른쪽, 보조 글 + "More info", 줄 사이 선)을 `variant="list"` 로 더한다. 사용자 결정 "페이지 모양 유지 (권장)" 때문이다. revision 1 에서 승인된 내용(1~11절)은 바꾸지 않고, 바뀌는 것은 **12절**에만 적었다. 4절에 행 하나, 9절에 Q-11~Q-15, 11절에 한 줄을 더했다. 같은 날 사용자 답("추천안 모두 채택", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지", "Button 에 공용 모양 추가")을 반영했다: 보조 글 색은 `text-secondary`(#717171), "More info" 는 키트 `Button variant="text"`.

> 작성: Claude Code(유지보수자), 2026-11-26. 사용자 요청: "둘 다 확인해서 디자인 시스템에 적용해줘" → 1단계 목록(`docs/plans/design-system-airbnb.md`)의 `RadioButton`. 같은 날 사용자가 채팅에서 "추천안 모두 채택"을 골라 Q-01~Q-10 을 답했다. 이후 사용자가 "Approve revision 1·5 (권장)"을 골라 이 계획 revision 1 과 토큰 계획 revision 5 를 승인했다(리드가 AskUserQuestion 답을 그대로 전달).

## 1. 요청과 적용 규칙

- 요청한 작업: 키트 기본 `RadioButton`(checked, disabled, label, orientation)을 Figma "Radio Buttons with Labels"·"Radio Button" 에 맞게 고친다(R05, 기존 원본 수정). 우리 페이지 사용처는 Checkout "Choose when to pay"(페이지 조립은 별도).
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드·조회 시점: Q5QDGE5WoXefOxgm5fziH3, 2026-11-26 Figma Desktop MCP 직접 조회(캐시 아님)
  - "Radio Buttons with Labels" 세트 **213:1943** (12개 변형) — `get_design_context`(스크린샷 포함)·`get_variable_defs`
  - "Radio Button" 세트 **213:1944** (6개 변형) — `get_design_context`(스크린샷 포함)·`get_variable_defs`
  - 213:1943 변형 이름·크기: 리드가 같은 날 `get_metadata 0:0`(문서 전체)에서 뽑아 준 목록
  - 응답의 SVG 9개를 내려받아 경로·색을 읽음(프로젝트에 복사하지 않음)
- 대상 코드·토큰 기준: git-demo 작업 폴더 HEAD `f3aed50` + 리드가 Colors 245:3518·Typography 245:3517·Elevation 245:3354 를 다시 가져온 `src/tokens/tokens.css`(값 추가만). 새 색 역할은 리드가 쓰는 토큰 계획 `docs/plans/tokens.md` revision 5 에 들어갔다(승인·적용 완료, 리드).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 213:1944 는 원 하나(24×24). 213:1943 의 Subtext=off 변형 6개는 바로 아래에 **Radio Button(213:1944) 인스턴스** + 글자 "Keypad" | 여러 선택지 중 하나를 고르는 라디오. 라벨 세트는 같은 라디오에 글자를 붙인 것 → 한 부품 `RadioButton`, `label` 은 선택 | Q-01 A 채택: 한 부품 |
| 라벨+보조 글(Subtext=on) | 213:1943 의 Subtext=on 변형 6개는 원이 아니라 **Boxes 인스턴스(체크박스 모양)** + 제목 + 보조 글 | Figma 오류(체크박스 세트 복사)로 봄 | Q-02 A 채택: 원은 213:1944 그대로 + 글 배치는 Subtext=on 값 |
| 누를 수 있는 영역 | Figma 에 누름 영역 표시 없음. Hover 변형은 원 테두리만 바뀜(글자 그대로) | 원 + 라벨 전체가 하나의 `<label>`, 안의 네이티브 `<input type="radio">` 가 선택을 맡음 | Q-06 A 채택: 줄 전체 |
| 클릭/선택 동작 | Status=Unchecked/Checked 는 지속 상태 | 네이티브 `checked`. 누르면 선택되고 `onChange` 호출. 같은 `name` 끼리 하나만 선택 | Q-09 A 채택 |
| 키보드·포커스 범위 | Focus 변형: 원 바깥에 2px 링(157:2633·157:2711) | Tab 으로 묶음에 들어오고 화살표로 이동(네이티브). 링은 `:focus-visible` 일 때 원 둘레에만, 레이아웃 밖에 그림 | Q-05 A 채택 |
| disabled 동작 | Figma 에 Disabled 변형 없음 | 네이티브 `disabled` 만 전달, 새 모양·스토리 없음 | Q-07 A 채택 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트: `src/components/RadioButton/`(키트 기본). 공개 import `@/components/RadioButton`, `index.ts` 가 `RadioButton`·`RadioButtonProps`·`RadioButtonOption` 을 내보냄.
- 기존 props·stories 지원 범위: `orientation`(horizontal|vertical), `label`, `items`(있으면 fieldset+legend 묶음), `selected`/`defaultSelected`/`onSelectedChange`, `children`(라벨 대신), 나머지 input 속성 전달. CSS 는 브라우저 기본 라디오 + `accent-color: var(--color-primary)`(#FF385C), 포커스는 2px primary outline. stories 는 `@ds-generated`(기준선 `components.baseline.json#RadioButton`) Horizontal·Vertical·Matrix(orientation).
- 기존 원본 수정이 필요한 이유: 모양(브라우저 기본 원·브랜드색)과 묶음 API 가 Figma 와 다르다. 새 부품을 만들지 않고 이 원본을 고친다(R05).
- 없애거나 바꿀 현재 API (Q-03 A·Q-09 A 채택으로 확정):

| 현재 | 결정 | 이유 |
|---|---|---|
| `orientation: "horizontal" \| "vertical"`, 타입 `RadioButtonOrientation` | 삭제 | Figma 에 방향 축 없음 |
| `items`, 타입 `RadioButtonOption`, `selected`, `defaultSelected`, `onSelectedChange`, fieldset/legend 묶음 | 삭제 | Figma 에 묶음(간격·제목) 견본 없음. 묶음은 같은 `name` 의 라디오 여러 개로 만든다 |
| `children`(라벨 대신) | 삭제 | 라벨은 `label` 하나로 |
| `label` | 유지 | Figma 글자 "Keypad" |
| (없음) | `subtext` 추가(문자열) | Figma Subtext 축(Q-02 A) |
| 네이티브 `checked`·`defaultChecked`·`onChange`·`name`·`value`·`disabled`·`id` | 유지(input 에 전달) | 기준선 `checked`·`disabled` |
| CSS `ds-radiobutton--group`·`--horizontal`·`--vertical`·`__legend`·`__options`·`__option`·보이는 `__field` | 삭제 → 숨긴 input + 그린 원 `__control` | Figma 원 모양 |

- 변경할 파일: `src/components/RadioButton/RadioButton.tsx`·`RadioButton.css`·`RadioButton.stories.tsx`(생성물 표시가 있어 고치면 충돌로 보고되고 보존됨)·`index.ts`(`RadioButtonOption` 내보내기 삭제). 새 색 역할은 토큰 계획 revision 5 에서(6절).
- 사용처 조사(`grep RadioButton src my-website`): 컴포넌트·페이지 import **없음**. 걸린 곳은 생성물 `src/docs/CATALOG.md`·`src/docs/Overview.stories.tsx`(파이프라인이 다시 만듦)뿐. `Slider` 의 `hideTextInput` 은 이름만 겹침. → 깨지는 사용처 없음.
- Checkout 페이지는 이 부품을 쓰지 않는다: `my-website/pages/CheckoutPage.tsx` 105~135행이 네이티브 `<input type="radio">` + 페이지 CSS + `my-assets/images/checkout-radio*.svg` 로 그린 자유 모드 화면이다. 이 SVG 들은 Figma 213:1944 의 원과 같은 그림이다(checkout-radio.svg = fd327f…, checkout-radio-hover.svg = 46ddf4…와 내용 동일). 배치 차이(글자 왼쪽·원 오른쪽·구분선·"More info" 링크)는 Q-04 A 에 따라 페이지 계획에서 다룬다.
- 참고(범위 밖): `components.baseline.json#RadioButton`·`.ds/lock.json` 에 옛 API(orientation, items 예시)가 남아 있다. 이 계획은 그 파일을 고치지 않는다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| Radio Button (원) | Radio Button (213:1944) | 157:2614 Default·Unchecked / 157:2718 Default·Checked / 157:2619 Hover·Unchecked / 213:1527 Hover·Checked / 157:2633 Focus·Unchecked / 157:2711 Focus·Checked | 213:1934, 213:1938, 213:1941, 213:1932, 213:1933, 213:1931 | none — drawn inside this part from the Figma SVG (213:1944 는 이 계획이 만드는 같은 RadioButton 의 안쪽 원, Q-01 A) | confirmed |
| Boxes (사각형) | Boxes | Default·Unchecked(213:1926) / Checked(213:1908) / Hover·Unchecked(Boxes property1=Hover) / Hover·Checked(213:1917) / Focus·Unchecked(213:1894) / Focus·Checked(213:1883) | 213:1939, 213:1940, 213:1937, 213:1942, 213:1936, 213:1935 | none — not used; Subtext=on 도 213:1944 원을 이 부품 안에서 그린다(Q-02 A). 원본 이름 Boxes 는 키트 부품과 일치하지 않음 | confirmed |
| — (rev 2: "More info", Checkout frame "Button - Learn more about Pay Less Up Front" 812:12252·812:12266 — 인스턴스 아님) | — | — | rev 2 `variant="list"` (Checkout 812:12228 의 줄) | Button { variant="text" size="small" tone="secondary" onClick=onActionClick } children actionLabel("More info"), 글자 색 `text-secondary` — Buttons revision 2 §12.7(에이전트 F), label 밖에 놓음(12.4) | confirmed |

- 라벨·보조 글자: Text 부품을 쓰지 않는다. Text 의 `body` 는 `--font-sans`·`line-height: 1.5` 로 Figma "Body Copy/16pt Regular"(SF Pro, line-height normal)와 다르고, `<label>` 태그를 낼 수 없다. 글자는 이 부품 안에서 그린다(ListingCard 와 같은 방식).

## 5. Figma 상태·크기 전체 목록

### Radio Button 213:1944 (원만, 6개)

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 157:2614 Default·Unchecked | design_context + SVG fd327f… | 기본 | 원 | 기준: 24×24, 원 r 11.5 채움 #FFFFFF, 테두리 1 #DDDDDD | 원 | 기본 | 확정 |
| 157:2619 Hover·Unchecked | design_context + SVG 46ddf4… | 포인터 올림 | 원 | 테두리만 #222222 | 원 | `.ds-radiobutton:hover`(줄 전체, Q-06 A) | 확정 |
| 157:2633 Focus·Unchecked | design_context + SVG 8bbace… | 키보드 포커스 | 원 + 바깥 링 | 원 테두리 #222222 + 바깥 링(원 r 15, stroke 2 #222222, 채움 #FFFFFF). Figma 칸 32×32 | 원 | `input:focus-visible`, 링은 레이아웃 밖(Q-05 A) | 확정 |
| 157:2718 Default·Checked | design_context + SVG 27b2f5… | 지속(선택됨) | 원 | 원 채움 #222222·테두리 1 #222222, 가운데 흰 점 r 4(#FFFFFF) | 원+점 | `input:checked` | 확정 |
| 213:1527 Hover·Checked | design_context + SVG 27b2f5… | 포인터 올림 + 선택됨 | 원 | **Default·Checked 와 같은 SVG** → 바뀌지 않음 | 원+점 | 추가 CSS 없음 | 확정 |
| 157:2711 Focus·Checked | design_context + SVG 543a29… | 키보드 포커스 + 선택됨 | 원 + 바깥 링 | 선택된 원 + 바깥 링(위와 같음) | 원+점 | `input:checked:focus-visible` | 확정 |

### Radio Buttons with Labels 213:1943 (12개, 변형 이름 "State=…, Status=…, Size=Medium, Subtext=…")

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 213:1934 Default·Unchecked·Subtext=off (93×24) | design_context + metadata | 기본 | 줄 전체 | 기준: [원 24] gap 12 [라벨 "Keypad" 213:1614], 세로 가운데. 라벨 16 Regular #222222 | 원(157:2614) | `label` | 확정 |
| 213:1938 Default·Checked·off (93×24) | design_context + metadata | 선택됨 | 원 | 원만 157:2718 로. 라벨 213:1619 그대로 | 원+점 | `checked` | 확정 |
| 213:1941 Hover·Unchecked·off (93×24) | design_context + metadata | 포인터 올림 | 원 | 원만 157:2619. 라벨 213:1628 그대로 | 원 | `:hover` | 확정 |
| 213:1932 Hover·Checked·off (93×24) | design_context + metadata | 포인터 올림 + 선택됨 | 원 | 원 213:1527(변화 없음). 라벨 213:1635 | 원+점 | — | 확정 |
| 213:1933 Focus·Unchecked·off (101×32) | design_context + metadata | 키보드 포커스 | 원 + 링 | Figma 는 원 칸이 32×32 로 커져 라벨이 8px 밀림(라벨 x 36→44). **Q-05 A 로 라벨은 밀리지 않음**(구현 프레임 93×24 유지, 링만 원 바깥 4px 로 그려짐). 라벨 213:1642 | 원(157:2633) | `:focus-visible` | 확정 |
| 213:1931 Focus·Checked·off (101×32) | design_context + metadata | 키보드 포커스 + 선택됨 | 원 + 링 | 위와 같음, 원 157:2711. 라벨 213:1824 | 원+점 | `:checked:focus-visible` | 확정 |
| 213:1939 Default·Unchecked·Subtext=on (360×42) | design_context + metadata | 기본 | 줄 전체 | Figma: [Boxes 213:1926 사각형] gap 16 [글 묶음 213:1927: 위 여백 2, 제목 213:1928 16 #222222, gap 4, 보조 글 213:1929 14 #5E5E5E 폭 320], 위쪽 정렬. **Q-02 A: 사각형 대신 157:2614 원**(360 = 24 + 16 + 320) | 원 | `subtext` | 확정 |
| 213:1940 Default·Checked·on (360×42) | design_context + metadata | 선택됨 | 원 | Q-02 A: 157:2718 원. 글 213:1910·213:1911 | 원+점 | `subtext` + `checked` | 확정 |
| 213:1937 Hover·Unchecked·on (360×42) | design_context + metadata | 포인터 올림 | 원 | Q-02 A: 157:2619 원. 글 213:1903·213:1904 | 원 | `:hover` | 확정 |
| 213:1942 Hover·Checked·on (360×42) | design_context + metadata | 포인터 올림 + 선택됨 | 원 | Q-02 A: 213:1527 원(변화 없음). 글 213:1919·213:1920 | 원+점 | — | 확정 |
| 213:1936 Focus·Unchecked·on (368×42) | design_context + metadata | 키보드 포커스 | 원 + 링 | Q-02 A: 157:2633 원 + 링. Figma 는 칸이 32 로 커져 글이 8px 밀림 → Q-05 A 로 밀리지 않음. 글 213:1896·213:1897 | 원 | `:focus-visible` | 확정 |
| 213:1935 Focus·Checked·on (368×42) | design_context + metadata | 키보드 포커스 + 선택됨 | 원 + 링 | Q-02 A: 157:2711 원 + 링. 글 213:1885·213:1886 | 원+점 | `:checked:focus-visible` | 확정 |

### 크기·간격 (Figma 값 → CSS)

| 요소 | Figma 값 | CSS |
|---|---|---|
| 원 | 24×24, 테두리 1(r 11.5 stroke 1 → 바깥 지름 24) | `calc(var(--spacing) * 6)`, `--border-width-thin`, `--radius-full` |
| 선택 점 | 지름 8(r 4), 가운데 | `calc(var(--spacing) * 2)` |
| 포커스 링 | 원 가장자리에서 2px 흰 간격 + 2px #222222 링(바깥 지름 32) | 레이아웃 밖 `box-shadow` 두 겹: 간격 `--border-width-thick` `--color-control-bg`, 링 `--border-width-thick` `--color-focus-ring` |
| 라벨 줄(Subtext=off) | 원과 글자 사이 12, 세로 가운데, 프레임 93×24 | `gap: calc(var(--spacing) * 3)`, `align-items: center` |
| 라벨+보조 글(Subtext=on) | 원과 글 사이 16, 위쪽 정렬, 글 묶음 위 여백 2, 제목과 보조 글 사이 4, 프레임 360×42(보조 글 폭 320) | `gap: calc(var(--spacing) * 4)`, `align-items: flex-start`, `padding-top: calc(var(--spacing) * 0.5)`, `gap: calc(var(--spacing) * 1)`. 보조 글 폭은 부모를 따름(Q-09 A, 320 고정 아님) |
| 글자 줄 높이 | Figma 코드 `leading-[normal]`(스타일 정의는 "lineHeight: 100"), 글 묶음 높이 42 = 2 + 19 + 4 + 17 | `line-height: normal`(ListingCard 와 같음) |

- Focus 링이 감싸는 정확한 범위와 근거: 원 하나만 감싼다(157:2633·157:2711 의 SVG: 바깥 원 r 15 stroke 2 + 안쪽 원 r 11.5). 라벨 글자는 감싸지 않는다. 링과 원 사이 2px 는 흰색(바깥 원 채움 #FFFFFF).
- Figma에 실제로 없는 상태·조합: Disabled, Pressed/Click, 오류, Medium 외의 크기, 방향 묶음, 라벨이 원 왼쪽에 있는 배치. 원 + 보조 글 조합은 Figma 에 그려져 있지 않지만 Q-02 A(사용자 결정)로 위 값 조합을 근거로 한다.
- 응답 코드에 정의만 있고 그리는 곳이 없는 것: `Checkbox` 함수(35:1866/35:1898, SVG 510c4b…). 라디오와 무관.
- 미조회/실패/잘린 응답: 없음. 213:1943 의 프레임 크기는 리드가 준 `get_metadata 0:0` 값으로 확인했다(위 표 괄호).
- 결정으로 생기는 원본과의 차이(검수 항목): Focus 때 라벨·글이 Figma 처럼 8px 밀리지 않는다(Q-05 A).

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 원 안 채움(미선택 전부), 포커스 링 안쪽 간격 | #FFFFFF, alpha 1 / Shade 01 | shade-01 | `control-bg`(새 역할) | #FFFFFF(토큰 계획 rev 5 적용 뒤) | 일치 | 새 역할. 값만 같은 bg·surface·on-primary·on-image 는 역할이 달라 쓰지 않음(Q-08 A) |
| 미선택 기본 테두리 | #DDDDDD / Neutral 03 | neutral-03 | `--color-border` | #DDDDDD | 일치(컨트롤 테두리 = Light border) | — |
| 미선택 Hover·Focus 테두리 | #222222 / Shade 02 | shade-02 | `border-emphasis`(새 역할, 처음 제안한 `border-hover` 를 리드가 합친 이름) | #222222(rev 5 적용 뒤) | 일치 | 새 역할(Q-08 A) |
| 선택된 원 채움·테두리 | #222222 / Shade 02 | shade-02 | `selected`(새 역할) | #222222(rev 5 적용 뒤) | 일치 | 새 역할(Q-08 A) |
| 선택된 원의 점 | #FFFFFF (SVG `white`) / Shade 01 | shade-01 | `on-selected`(새 역할) | #FFFFFF(rev 5 적용 뒤) | 일치 | 새 역할(Q-08 A) |
| 포커스 링 | #222222, stroke 2 / Shade 02 | shade-02 | `focus-ring`(새 역할, TextInput 과 공용) | #222222(rev 5 적용 뒤) | 일치 | 새 역할(Q-08 A) |
| 라벨·제목 글자 | #222222 / Shade 02 | shade-02 | `--color-text` | #222222 | 일치 | — |
| 보조 글 | #5E5E5E / Neutral 08 | neutral-08 | `--color-text-tertiary` | #5E5E5E | 일치(보조 설명 글) | — |
| (Subtext=on 사각형 테두리) | #C2C2C2 / Neutral 05 | neutral-05(이제 있음) | 쓰지 않음 | — | — | Q-02 A 로 사각형을 그리지 않음 |
| (변수 목록에만 있음) | #FFFFFF / Gray_02/10 | — | 쓰지 않음 | — | — | Boxes 쪽 값. 라디오 SVG 에는 쓰이지 않음 |

- 컴포넌트 fill과 Figma 부모 배경: 원 안은 흰색으로 **채워져 있다**(투명 아님). 줄 전체는 채움 없음. Storybook 캔버스는 흰색(Q-10 A, 실제 페이지 배경과 같음).
- 같은 값의 후보가 여러 개일 때 선택 근거: 값과 역할이 함께 맞는 것만 골랐다(R01). #222222·#FFFFFF 의 새 역할은 사용자가 "합친 목록 + 다시 가져오기"로 정한 이름을 쓴다.
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: `control-bg`·`border-emphasis`·`selected`·`on-selected`·`focus-ring` — 위 표의 사용처. 기존 역할은 값만 같고 의미가 달라 쓸 수 없다. 리드가 `docs/plans/tokens.md` revision 5 에 쓰며 이 계획은 그 파일을 고치지 않는다.
- 토큰 생성 경로·검증 계획: 토큰 계획 rev 5 승인 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens` → `pnpm ds:guard`(G10·G13).
- 글자 토큰(있음): 라벨·제목 "Body Copy/16pt Regular" = `--font-type-body-copy-16pt-regular` + `--text-type-body-copy-16pt-regular`(16px) + `--font-weight-type-body-copy-16pt-regular`(400) + `--tracking-type-body-copy-16pt-regular`(0px). 보조 글 "Body Copy/14pt Regular" = `--font-type-body-copy-14pt-regular` + `--text-type-body-copy-14pt-regular`(14px) + `--font-weight-type-body-copy-14pt-regular`(400) + `--tracking-type-body-copy-14pt-regular`.

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 157:2614 원 | MCP asset fd327f76… (sha256 a2c2d41b0845) `circle cx12 cy12 r11.5` | 24×24, 채움 #FFFFFF, stroke 1 #DDDDDD | Default·Unchecked(Subtext off·on) | 나머지 | 확인 |
| 157:2619 원 | 46ddf4c2… (sha256 397ea30461fc) 같은 원 | 채움 #FFFFFF, stroke 1 #222222 | Hover·Unchecked | 나머지 | 확인 |
| 157:2633 원+링 | 8bbace26… (sha256 60a791523648) `r15 stroke2` + `r11.5 stroke1` | 32×32, 링 #222222 2, 채움 #FFFFFF, 안쪽 테두리 #222222 1 | Focus·Unchecked | 나머지 | 확인 |
| 157:2718 / 213:1527 선택 원 | 27b2f56b… (sha256 c6e9f808243b) `r11.5` 채움·stroke #222222 + `r4` white | 24×24 | Default·Checked, Hover·Checked(같은 파일) | Unchecked 전부 | 확인 |
| 157:2711 선택 원+링 | 543a29b3… (sha256 52b35b1e7226) | 32×32, 링 + 선택 원 + 점 | Focus·Checked | 나머지 | 확인 |
| Boxes 체크(Subtext=on) | b66cecc6… (94303ac88ef5), 34cb91a0… (0fcbc3e6c28b), 84f6c620… (139a95429859) | 24×24 둥근 사각형 + 체크 | Figma 213:1940·213:1942·213:1935 | — | 확인 — **쓰지 않음**(Q-02 A) |
| (정의만 있음) Checkbox | 510c4b10… (ddc7729fa2ac) | 24×24 | 렌더 경로 없음 | 전부 | 확인 — 쓰지 않음 |

- 원·점·링은 원본 SVG 와 같은 치수(원 지름 24·테두리 1·점 지름 8·링 2·간격 2)로 이 부품 안에서 `<svg>` JSX 또는 CSS 로 그리고 색은 6절 토큰으로 준다. `<img src>` 에 SVG 를 넣지 않는다. 다른 모양의 점·체크를 만들지 않는다.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `label` | 213:1614 등 "Keypad" | 없음 / 문자열 | 원 오른쪽 16pt 글자. 없으면 원만(이때 `aria-label` 또는 `aria-labelledby` 필수) | 글자를 눌러도 선택됨(`<label>`) | Q-01 A·Q-09 A |
| `subtext` | 213:1929 "Guests can open the door with a code" | 없음 / 문자열 | 제목 아래 14pt 보조 글, 배치가 위쪽 정렬·gap 16 으로 바뀜. 폭은 부모를 따름 | — | Q-02 A·Q-09 A |
| `checked` / `defaultChecked` / `onChange` | Status=Checked, 기준선 `checked` | 네이티브 | 선택 시 원이 157:2718 모양, `onChange` 호출 | Space 로 선택, 같은 `name` 묶음 안에서 화살표 이동(네이티브) | Q-09 A |
| `name` / `value` / `id` / `required` / aria-* | 네이티브 | — | input 에 전달 | — | Q-09 A |
| `disabled` | 기준선, Figma 견본 없음 | false | 네이티브 disabled 전달, 선택·포커스 안 됨. 새 모양 없음, 현재 disabled 색 규칙 삭제 | Tab 에서 빠짐 | Q-07 A |
| `className` | 키트 관례 | — | 루트 `<label>` 에 붙음(배치용) | — | Q-09 A |
| ref | 현재 API | — | input 을 가리킴 | `focus()` 동작 | Q-09 A |

- 루트: `<label class="ds-radiobutton" data-testid="ds-radiobutton">` 안에 시각적으로 숨긴 `<input type="radio">` + 그린 원 `ds-radiobutton__control`(aria-hidden) + 글자. 상태는 `input:checked + .ds-radiobutton__control`, `input:focus-visible + …`, `.ds-radiobutton:hover …`로 CSS 가 처리한다. `state` prop 을 만들지 않는다.

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 라벨 세트(213:1943)와 맨 원 세트(213:1944)를 한 부품으로 할지 | **A (추천)** 한 부품 `RadioButton`, `label` 은 선택 · B 두 부품 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | Subtext=on 변형 6개가 체크박스(Boxes) 모양 | **A (추천)** 원은 213:1944 그대로 + 글 배치는 Subtext=on 값 · B Subtext=off 6개만 · C 그림대로 사각형 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | 키트 묶음 API 를 남길지 | **A (추천)** 삭제, 묶음은 같은 `name` · B 유지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | Checkout 배치(글자 왼쪽·원 오른쪽)와 Figma(원 왼쪽)가 다름 | **A (추천)** Figma 대로만, 차이는 페이지 계획에서 · B `labelPosition` 추가 · C Figma 먼저 수정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | Focus 때 원 칸이 32 로 커져 라벨이 8px 밀림 | **A (추천)** 링을 레이아웃 밖에, 라벨 고정 · B Figma 처럼 밀림 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-06 | Hover 가 일어나는 영역 | **A (추천)** 줄 전체 · B 원 위에서만 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | Disabled 모양이 Figma 에 없음 | **A (추천)** 네이티브 `disabled` 만, 새 모양 없음, 현재 disabled 색 규칙 삭제 · B 사용자가 모양 지정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | 새 색 역할 5개 | **A (추천)** 새 매핑(이름은 리드가 합침) · B `text`·`surface` 재사용 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 이름: 사용자가 "합친 목록 + 다시 가져오기" 선택 → `control-bg`·`border-emphasis`(←`border-hover`)·`selected`·`on-selected`·`focus-ring` | resolved |
| Q-09 | 공개 API(8절)와 보조 글 폭 | **A (추천)** 8절 표대로, 보조 글 폭은 부모를 따름 · B 폭 320 고정 · C ReactNode | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-10 | Storybook 캔버스 배경 | **A (추천)** 흰색 · B Figma 세트 회색 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-11 | (rev 2) Checkout 목록 줄 모양을 어떤 API 로 더할지(12.3절). rev 1 Q-04 A 를 사용자 결정 "페이지 모양 유지"가 대신함 | **A (추천)** `variant="list"` 하나로 배치·글자·줄 사이 선을 함께 바꾸고, "More info" 는 `actionLabel` + `onActionClick` · B `labelPosition="start"` 등 낱낱의 prop 여러 개(조합이 늘어 검사할 모양이 많아짐) · C 새 부품(예 `RadioRow`) — 같은 역할의 복제라 C03 위반 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-12 | (rev 2) 줄 사이 선(#EBEBEB)과 첫 줄 위 여백 0 을 누가 그릴지 | **A (추천)** `variant="list"` 줄끼리 이어지면 자동으로 둘째 줄부터 위에 선 + 위 여백 16(CSS 인접 선택자, 자기 클래스만) · B `divider` prop 으로 줄마다 지정 · C 묶음(CheckoutStep)이 줄 사이에 자기 선 요소를 넣음 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-13 | (rev 2) "More info" 의 HTML. 지금은 `<label>` 안의 `<a href="#">`(누르면 주소에 # 이 붙고 맨 위로 튐 — PRD "아무 일 없음"과 다름). `<label>` 안에 `<button>` 을 넣는 것은 HTML 규칙 위반(button 은 라벨 대상 요소) | **A (추천)** 줄 루트를 `<div>` 로 하고 라벨 글자와 보조 글을 각각 `<label for>` 로, More info 는 label 밖 `<button type="button">`(보조 글 끝에 이어 보임). 글자·원을 누르면 선택(PRD "its words or its radio"), 줄의 빈 여백은 선택하지 않음. 모양은 ReservationSummary Q-02 결정을 따름 · B `<label>` 안 `<button>`(HTML 위반) · C 지금처럼 `<a href="#">` | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 모양은 사용자 결정 "Button 에 공용 모양 추가 (권장)"(chosen in chat, 2026-11-26) → 키트 `Button variant="text"`(Buttons revision 2, 에이전트 F) | resolved |
| Q-14 | (rev 2) 보조 글·More info 색 #6C6C6C 의 primitive·역할이 없음(neutral-07 #717171, neutral-08 #5E5E5E 와 다름). Inspiration 의 흐린 글자(#6c6c6c, 에이전트 A)도 같은 값 | **A (추천)** 새 매핑: primitive #6C6C6C(Figma 이름 미조회) → 새 역할(예 `text-supporting`, 리드 tokens rev 6 이 Inspiration 과 합침) · B `text-secondary`(#717171)로 바꿈(모양이 달라짐) · C Figma 라디오 보조 글 색 `text-tertiary`(#5E5E5E)로 바꿈 | 사용자 결정 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → #6C6C6C 는 #717171, 기존 역할 `text-secondary`(neutral-07). 새 역할 `text-supporting` 은 만들지 않음 | resolved |
| Q-15 | (rev 2) 토큰에 없는 글자 값: 라벨 자간 -0.3125px·보조 글/More info 자간 -0.1504px(모든 tracking 토큰 0), More info 굵기 500 은 키트 합성 토큰 `--font-weight-medium` | **A (추천)** 같은 값의 새 자간 토큰(리드 tokens rev 6), 500 은 `--font-weight-medium` 사용 확정, 줄 높이 20·18 은 `calc(var(--spacing) * 5)`·`* 4.5` · B Figma 라디오 글자 값(자간 0·줄 높이 normal)으로 맞춤 — Klarna 보조 글 줄바꿈 위치가 바뀔 수 있음 | 사용자 결정 "지금 크기·자간 유지 (권장)" (chosen in chat, 2026-11-26) → 자간 `calc(var(--spacing) * -0.078125)`(-0.3125px)·`calc(var(--spacing) * -0.0376)`(-0.1504px), 줄 높이 `* 5`·`* 4.5`. 500 은 `--font-weight-medium`(Figma 변수 sds-typography-weight-medium, More info 는 Button text 가 그림) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 213:1934 처럼 흰 원 + #DDDDDD 테두리 + "Keypad", 흰 캔버스 | Storybook iframe 스크린샷·computed style(원 24×24, 테두리 1px rgb(221,221,221), 채움 rgb(255,255,255)) | |
| 모든 상태·크기 | 5절 표: Hover 테두리 #222222(줄 전체 hover), Checked 원 #222222 + 점 8px 흰색, Focus 링 2px + 간격 2px. 프레임 93×24 / 보조 글 있을 때 높이 42 | Playwright 실제 포인터 hover·키보드 Tab 후 computed style·DOM 크기 | |
| 결정에 따른 차이 | Focus 때 라벨이 움직이지 않음(Figma 는 8px 밀림 — Q-05 A) | 포커스 전후 라벨 x 좌표 비교 | |
| 아이콘과 노출 조건 | 점은 Checked 에서만, 링은 키보드 포커스에서만, 사각형·체크는 어디에도 없음 | DOM·스크린샷 대조 | |
| 클릭·선택 기능 | 원/라벨 클릭 → 선택, `onChange` 1회 | Storybook play `fn()` + `userEvent.click` | |
| 묶음 키보드 | 같은 `name` 3개에서 Tab 진입 후 화살표로 선택 이동 | play `userEvent.tab`·`userEvent.keyboard("{ArrowDown}")` | |
| disabled / Tab / Focus | disabled 면 클릭해도 선택 안 됨, Tab 에서 빠짐 | play | |
| Nested parts identity | 키트 부품 import 없음(두 행 모두 none) | `ai:verify` DOM | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 사용처 없음 | `pnpm ai:check RadioButton`, `pnpm ai:verify RadioButton`, `pnpm typecheck`, `pnpm ds:guard` | |

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정:
  - Q: 부품 계획 질문을 어떻게 답할까요? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26) — Q-01~Q-10 모두 A
  - Q: 새 색 역할 이름은? → A: 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26) — `border-hover` 는 `border-emphasis` 로 합침
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 없음 — 토큰 계획 `docs/plans/tokens.md` revision 5 승인·적용 완료(리드, `src/tokens/tokens.css`)
- revision 2(12절) 사용자 결정(chosen in chat, 2026-11-26): "추천안 모두 채택 (권장)" — Q-11·Q-12·Q-13 / "Figma 스타일 값으로 맞춤" — Q-14 / "지금 크기·자간 유지 (권장)" — Q-15 / "Button 에 공용 모양 추가 (권장)" — Q-13 의 More info 모양.
- 승인한 revision: 2 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- revision 2 구현 전 조건: Buttons revision 2(`variant="text"`) 구현 — 리드가 완료를 알림(2026-11-26). 새 토큰은 필요 없다(`border-subtle`·`text-secondary`·`--font-weight-medium` 은 이미 있음).

## 12. Revision 2 — Checkout 목록 줄 모양 `variant="list"` (바뀌는 내용만)

### 12.1 요청과 근거

- 요청: 사이트 재정립(2026-11-26). 사용자 결정 "페이지 모양 유지 (권장)" — 페이지 모양과 Figma 부품 모양이 다르면 페이지를 바꾸지 않고 부품에 variant 를 더한다. rev 1 의 Q-04 A("Figma 대로만, 차이는 페이지 계획에서")는 이 결정으로 바뀐다.
- 새 부품 `CheckoutStep`(계획 `docs/plans/components/CheckoutStep.md`)이 "1. Choose when to pay" 의 세 줄을 이 부품으로 그린다. Figma 에서도 세 줄의 원은 Radio Button 인스턴스다: 812:12964·812:12958·812:12961(Q5QD `get_metadata 812:1056`, 2026-11-26 직접 조회). 줄 frame 은 812:12234(40)·812:12244(74)·812:12258(92), 사이 선 frame 812:12243·812:12257(492×1).
- Figma 호출: 이 에이전트 2회(`get_metadata 812:1056` 성공, `get_design_context 812:12280` 실패 — 전송 끊김). 그래서 아래 색·글자의 Figma 변수·스타일 이름은 읽지 못했다. 값은 사용자가 검수한 현재 페이지(git-demo `aa9a593`, `CheckoutPage.tsx` 105~137행, `CheckoutPage.css` 189~256·823~864행)를 Playwright 1440px 로 측정한 것이다(`<로컬 측정 폴더>/rebuild/E/checkout-measure.json`).
- 읽은 규칙: `docs/ai-component-workflow.md` 1.0 R01~R09, `docs/ai-design-system-spec.md` 1.1.

### 12.2 확인한 사실 — 현재 페이지(기준)와 rev 1 기본 모양의 차이

| 요소 | 현재 페이지(측정) | Figma 812:1056 | rev 1 기본 모양과 다른 점 |
|---|---|---|---|
| 줄 배치 | 글자 칸(남은 폭, 492 줄에서 452) + 사이 16 + 원 24(오른쪽 끝), 위쪽 정렬 | "Label" 492: Container 452 + Radio Button (468,0) | 원이 오른쪽, 줄이 부모 폭을 채움 |
| 줄 여백 | 첫 줄 위 0·아래 16(높이 40) / 다음 줄 위·아래 16(74·92) | 812:12234 40, 812:12244 74(Label y 16 h 42), 812:12258 92 | 새로 |
| 줄 사이 선 | 1px #EBEBEB, 줄 폭 | 812:12243·812:12257 492×1 | 새로 |
| 라벨 | 16px / 400 / 줄 높이 20 / 자간 -0.3125px / #222222 | text 812:12238 125×20, 아래 빈칸 4(칸 24) | 줄 높이 normal → 20, 자간 0 → -0.3125px |
| 보조 글 | 라벨 아래 4, 14px / 400 / 줄 높이 18 / 자간 -0.1504px / **#6C6C6C**, 글자 칸 안에서 줄바꿈(Klarna 는 2줄) | 812:12251 309×18, 812:12265 452×36 | 색 #5E5E5E → `text-secondary` #717171(사용자 결정, 원래 #6C6C6C), 줄 높이·자간 |
| More info | 보조 글 끝에 공백 뒤 이어 붙음(줄바꿈을 따라감), 14px / **500** / 18 / -0.1504px / #6C6C6C / 밑줄, 60.88×17. 지금 `<a href="#">` | frame "Button - Learn more about Pay Less Up Front" 812:12252 (301.7,0) 62.06×18 · 812:12266 (63.3,18) | 새로 — 키트 `Button variant="text"` 로 그림 |
| 원 | 24×24. 페이지 그림 `checkout-radio.svg`(a2c2d41b0845)·`-hover.svg`(397ea30461fc)는 rev 1 표의 157:2614·157:2619 와 같은 파일. `-checked.svg`(1c93a1ab897c: r12 채움 #222 + r4 흰 점)·`-focus.svg`(9971218b6cef)·`-focus-checked.svg`(b8572d6634c4)는 파일은 다르지만 같은 크기·색으로 그려짐. 포커스 32 링은 margin -4 로 레이아웃 밖 | Radio Button 인스턴스 | 없음 — rev 1 의 원·점·링 그대로 |
| hover | 줄 전체에 포인터 → 원 테두리 #222 | — | 없음(rev 1 Q-06 A) |
| 선택 | 줄 어디든 누르면 선택(줄 전체가 `<label>`). More info 는 선택하지 않음. 처음엔 선택 없음(PRD) | — | 12.4 |
| 접근성(현재) | 라디오 이름 = 줄 글자 전부(보조 글 + "More info" 까지). 묶음 `role="radiogroup" aria-label="Choose when to pay"` | — | rev 1 대로 이름 = 라벨, 설명 = 보조 글(12.4) |
| 다른 상태 | Disabled·오류 없음 | — | 없음 |

### 12.3 공개 API에 더하는 것 (기존 prop 은 그대로)

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `variant` | 12.2 표 | `"default"`(rev 1 그대로) / `"list"` | `list`: 글자 왼쪽·원 오른쪽, 부모 폭, 12.2 의 여백·글자·색, 줄끼리 이어지면 선 | 같음 | Q-11 추천안 채택 |
| `actionLabel` | 812:12253 "More info" | 없음 / 문자열. `list` 에서만 | 보조 글 끝에 이어 붙는 키트 `Button variant="text" size="small" tone="secondary"`(글자 색 `text-secondary`) | `<button type="button">`(Button 기본), Tab 으로 감, 라디오를 선택하지 않음 | Q-11·Q-13 추천안 채택 + "Button 에 공용 모양 추가" |
| `onActionClick` | PRD: "More info" — nothing, just shows it | — | Button 의 `onClick` 으로 넘김. 콜백만(화면·주소 변화 없음) | Enter/Space | Q-11·Q-13 추천안 채택 |

- 쓰는 모습: `<RadioButton variant="list" name="pay-when" value="zero" label="Pay £0 now" subtext="£340.91 charged on 13 Jan 2027. No extra fees." actionLabel="More info" onActionClick={…} checked={…} onChange={…} />`
- `subtext` 는 rev 1 대로 문자열. 페이지가 보조 글 안에 UI 를 넣지 않는다(P05).

### 12.4 구조와 상태 (Q-13 A 기준)

- 루트 `<div class="ds-radiobutton ds-radiobutton--list" data-testid="ds-radiobutton">`: 글자 칸 + 원 칸(`__control`: 숨긴 input 이 원을 덮어 누름·키보드를 받음, rev 1 과 같음).
- 글자 칸: `<label for={id} id={labelId}>` 라벨 + `<p id={subtextId}>` 안에 `<label for={id}>`보조 글`</label>` 과 label 밖의 키트 `<Button variant="text">`(More info). `<label>` 안에 버튼이 들어가지 않는다(HTML 규칙). 라디오 이름 = 라벨(`aria-labelledby`), 설명 = 보조 글 문단(`aria-describedby`, rev 1 과 같음).
- 이 부품 CSS 는 `.ds-button` 을 선택하거나 `style`·`className` 으로 바꾸지 않는다(R05). Button text 의 글자 색·크기·밑줄은 Button 이 그린다(Buttons revision 2 에 `text-secondary` 색이 필요 — 에이전트 F 에게 보냄).
- hover: `.ds-radiobutton--list:hover` 일 때 미선택 원 테두리 `border-emphasis`(rev 1 Q-06 A 와 같은 줄 전체). 선택·포커스는 rev 1 CSS 그대로.
- 줄 사이 선(Q-12 A): `.ds-radiobutton--list + .ds-radiobutton--list` 에 위 선 `--border-width-thin` `border-subtle` + 위 여백 16. 모든 list 줄은 아래 여백 16, 첫 줄은 위 여백 0. → 줄 높이 40 · 75 · 93(선 포함), 합계 208. 묶음 아래 선(#DDDDDD 1px)은 묶음을 가진 CheckoutStep 이 그린다.
- 크기: 사이 16 `calc(var(--spacing) * 4)`, 라벨 줄 높이 `* 5`, 보조 글 위 4 `* 1`·줄 높이 `* 4.5`, 줄 여백 `* 4`.
- `state` prop 을 만들지 않는다. Disabled 모양도 만들지 않는다(rev 1 Q-07 A).

### 12.5 색·글자 토큰 (rev 2 에서 더 쓰는 것)

| 요소 / 상태 | 현재 값·alpha (Figma 변수: 미조회) | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 줄 사이 선 | #EBEBEB 1px | neutral-02 | `border-subtle` | #EBEBEB | 일치(가는 구분선) | — |
| 라벨 | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| 보조 글 | 원래 #6C6C6C | neutral-07 | `text-secondary` | #717171 | 사용자 결정으로 바꿈 | Q-14: "Figma 스타일 값으로 맞춤" — #6C6C6C → #717171(리드 대응표). 새 역할 없음 |
| More info | 원래 #6C6C6C | neutral-07 | `text-secondary`(Button text 가 그림) | #717171 | 사용자 결정으로 바꿈 | 이 부품 CSS 에 쓰지 않음 |

| 쓰는 곳 | 현재 값 | 크기·글꼴·굵기 | 줄 높이 | 자간 (Q-15: 지금 값 유지) |
|---|---|---|---|---|
| 라벨 | 16 / 400 / 20 / -0.3125px | `--text-type-body-copy-16pt-regular` + `--font-type-…`·`--font-weight-type-body-copy-16pt-regular`(rev 1 과 같음) | `calc(var(--spacing) * 5)` | `calc(var(--spacing) * -0.078125)` |
| 보조 글 | 14 / 400 / 18 / -0.1504px | `--text-type-body-copy-14pt-regular` + font·weight | `calc(var(--spacing) * 4.5)` | `calc(var(--spacing) * -0.0376)` |
| More info | 14 / 500 / 18 / -0.1504px, 밑줄 | Button text 가 그림(`--font-weight-medium` 500) | Button | Button |

- 글꼴: 페이지 `-apple-system…` 과 토큰 `"SF Pro", var(--font-sans)` 모두 이 Mac 에서 `.SF NS` 로 그려진다(CDP 확인).
- 신규 token: 없음. `border-subtle`·`text-secondary`·`border-emphasis` 등은 이미 있다.

### 12.6 아이콘·asset

- 새 그림 없음. 원·점·링은 rev 1 그대로(213:1944). 페이지의 `checkout-radio*.svg` 5개는 이 부품으로 바꾼 뒤 쓰지 않는다.

### 12.7 영향받는 사용처

- `variant` 기본값이 `"default"` 라 rev 1 사용처(stories·Matrix)는 그대로다. 페이지에서 RadioButton 을 쓰는 곳은 아직 없다(rev 1 3절). 새 사용처: CheckoutStep(승인 뒤).
- 변경할 파일: `RadioButton.tsx`(Button import 추가)·`RadioButton.css`·`RadioButton.stories.tsx`(새 스토리 `List` — Checkout 세 줄, 492 칸, 흰 캔버스). 구현 순서: Buttons revision 2 → 이 revision.

### 12.8 검증 계획 (rev 2 에서 더함)

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| `List` 스토리 모양 | 492 칸에서 줄 높이 40·75·93, 원 x 468, 라벨 16/20 자간 -0.3125px, 보조 글 #717171 14/18 자간 -0.1504px, More info = `ds-button`(text), 선 #EBEBEB | Storybook iframe 과 `/checkout` 나란히 DOM 측정·스크린샷 | |
| 선택 | 라벨 글자·보조 글 글자·원 클릭 → 선택 + `onChange` 1회. More info 클릭 → `onActionClick` 1회, 선택 안 바뀜, 주소에 # 없음 | Storybook play `fn()` + `userEvent.click` | |
| 키보드 | Tab 1번으로 묶음에 들어오고 화살표로 이동, 다음 Tab 은 More info | play `userEvent.tab`·`keyboard`, Playwright 실제 키보드로 링 확인 | |
| 접근성·하위 부품 | 라디오 이름 = 라벨만, 설명 = 보조 글. `<label>` 안에 `<button>` 없음. More info 의 `ds-button` 이 `ds-radiobutton` 안에 렌더(Nested parts identity) | play `toHaveAccessibleName`·DOM 검사 | |
| rev 1 회귀 | `variant` 없는 기존 스토리 모양·play 그대로 | `pnpm ai:check RadioButton`, `pnpm ai:verify RadioButton`, `pnpm typecheck`, `pnpm ds:guard` | |
