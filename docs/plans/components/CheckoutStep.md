---
kind: component
component: CheckoutStep
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-12227&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — CheckoutStep

> 작성: Claude Code(재정립 계획 에이전트 E), 2026-11-26. 사용자 요청: "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘." 사용자 결정(AskUserQuestion): 구역도 부품으로 (권장) · 페이지 모양 유지 (권장) · 1440px 화면 일치·키보드·접근성·동작 점검. 같은 날 질문 답: "추천안 모두 채택 (권장)", Figma 변수·스타일이 아닌 값은 "Figma 스타일 값으로 맞춤", 글자 크기·자간은 "지금 크기·자간 유지 (권장)", 공용 버튼은 "Button 에 공용 모양 추가 (권장)". 이 문서는 계획이다. 승인("Approve revision 1") 전에는 부품·CSS·stories·토큰·페이지를 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Checkout 왼쪽 열의 "단계 패널"을 새 구역 부품 `CheckoutStep` 으로 만든다. 열린 단계(1. Choose when to pay: 결제 시점 라디오 3개 + Next)와 닫힌 단계(2·3: 제목만) 두 모양이다. 페이지는 이 부품을 세 번 놓기만 한다(페이지 조립은 별도 단계). 페이지 제목(뒤로 화살표 + "Confirm and pay")은 새 부품 `CheckoutHeading`(계획 `docs/plans/components/CheckoutHeading.md`)이 맡는다(Q-01).
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`, `src/tokens/tokens.css`
- Figma 파일·노드·조회 시점:
  - Q5QDGE5WoXefOxgm5fziH3 `get_metadata 812:1056`(Checkout "Booking" 1440×2234), 2026-11-26 Figma Desktop MCP 직접 조회(캐시 아님). 단계 열 **812:12227**(540×591) = 열린 단계 **812:12228**(540×361) + 닫힌 단계 **812:12274**·**812:12277**(각 540×74), 사이 24.
  - 같은 디자인의 사본 `my-website/figma/Checkout.layers.xml`(파일 h1TqwpPwdkZJJK2Hb9qAj7 10613:12099). 대응: 10613:12386 = 812:12228, 10613:12427 = 812:12274, 10613:12430 = 812:12277.
  - 이 에이전트의 Figma 호출은 2회다: `get_metadata 812:1056` 성공, `get_design_context 812:12280` 실패(MCP 전송 끊김). 리드 확인: Figma Desktop 의 design-context 는 지금 응답하지 않는다(다시 부르지 않음). 그래서 Checkout 화면의 색·그림자가 Figma 변수·스타일에 연결됐는지는 읽지 못했다 → 사용자 결정 "Figma 스타일 값으로 맞춤"의 대응표(리드, tokens revision 6)로 정한다(6절).
- 값의 근거(사용자가 검수한 현재 사이트): `my-website/pages/CheckoutPage.tsx` 98~152행, `CheckoutPage.css` 143~283행·823~864행, Playwright 1440px 측정(`<로컬 측정 폴더>/rebuild/E/measure-checkout.mjs` → `checkout-measure.json`, 콘솔 오류 0·실패 요청 0). 동작은 `my-docs/inbox/website-plan.md`(PRD) Checkout 절.
- 대상 코드·토큰 기준: git-demo 작업 폴더 HEAD `aa9a593`, `src/tokens/tokens.css`(semantic 46개) + 리드의 tokens revision 6(승인 대기). 쓰는 부품: `Button`(Buttons.md rev 1 그대로, Secondary Small), `RadioButton`(revision 2 의 `variant="list"` — 승인 대기).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 812:12228: "Heading 2" "1. Choose when to pay" + 선택 줄 3개(각각 Radio Button 인스턴스) + "Secondary Buttons" 인스턴스. 812:12274·812:12277: "Heading 2" 만 | 결제 과정의 한 단계를 보여 주는 패널. 지금 단계는 열려서 내용을, 다른 단계는 제목만 보여 준다 | Q-02 추천안 채택 |
| 누를 수 있는 영역 | 열린 단계: 선택 줄 3개(글자·원), "More info" 2개, "Next". 닫힌 단계: 없음 | 패널 자체는 누르는 곳이 아니다. 누르는 곳은 하위 부품(RadioButton·Button)이 맡는다 | Q-02 추천안 채택 |
| 클릭/선택/열림 동작 | PRD: 선택은 글자나 원을 누르면 되고 한 번에 하나, **처음엔 아무것도 선택 안 됨**, 선택된 원은 검정 + 흰 점, hover·키보드 포커스 모양은 Figma 대로. "More info"·"Next": 아무 일 없음. 2·3단계: "nothing, they stay closed" | 선택은 RadioButton 의 네이티브 동작 + `onValueChange` 콜백. Next·More info 는 콜백만 부르고 화면은 그대로. 닫힌 단계는 여닫는 동작이 없다(버튼 아님) | Q-02 추천안 채택 |
| 키보드·포커스 범위 | 현재 페이지 Tab 순서(측정): 뒤로 링크 → 라디오 묶음(1번 Tab) → More info → More info → Next → (요약 칸) | 같은 순서를 유지한다. 라디오 묶음은 네이티브 묶음(Tab 1번, 화살표로 이동) | Q-02 추천안 채택 |
| disabled 동작 | Figma·PRD 에 없음 | 만들지 않는다 | Q-02 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 컴포넌트: 없음. `src/components/` 에 Step·Checkout 이름의 부품이 없다. `ProgressIndicator`(키트 기본 진행 표시)는 단계 번호를 점·선으로 보여 주는 부품이라 역할·모양이 다르다. `Accordion` 은 여닫이 부품인데 PRD 는 2·3단계가 "닫힌 채" 아무 동작이 없다. 승인된 Card(type 5종)에도 이 모양이 없다.
- 이 부품이 쓰는 키트 부품: `RadioButton`(revision 2 의 `variant="list"`), `Button`(승인 rev 1 그대로, `variant="secondary" size="small"`).
- 새 부품이 필요한 이유: 사용자 결정 "구역도 부품으로". 페이지에 남은 단계 패널 CSS(`.page-Checkout__step-card*` 등)는 P05·P06 위반이다.
- 변경할 파일(승인 뒤): `src/components/CheckoutStep/CheckoutStep.tsx`·`CheckoutStep.css`·`CheckoutStep.stories.tsx`·`CheckoutStep.figma.tsx`·`index.ts`(새로). 페이지(`CheckoutPage.tsx|.css`)는 이 계획에서 고치지 않는다.
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품). RadioButton revision 2 는 `variant` 를 더하기만 하고 기본 모양은 그대로다.
- 구현 순서: RadioButton revision 2 → 이 부품. 페이지 제목은 `CheckoutHeading`(Q-01, 별도 계획).

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| Radio Button 812:12964 · 812:12958 · 812:12961 (24×24, 각 선택 줄의 오른쪽 끝) | Radio Button (set 213:1944, 승인 RadioButton 계획) | metadata 는 변형을 주지 않는다. 현재 페이지 그림은 157:2614 Default·Unchecked 와 같은 SVG(sha256 a2c2d41b0845) — 상태는 RadioButton 이 CSS 로 그림 | 812:12228 (열린 단계) | RadioButton { variant="list", name, value, label, subtext, actionLabel, onActionClick, checked, onChange } — RadioButton revision 2 승인 뒤 | confirmed |
| Secondary Buttons 812:12685 (78×48, 줄 812:12271 안 x 414 y 16) | Secondary Buttons (set 238:2188, 승인 Buttons 계획) | 페이지 값(#222 바탕·흰 13pt 590·padding 16/24·모서리 8·높이 48)이 Size=Small·State=Default 와 같다(Buttons.md 3절) | 812:12228 | Button { variant="secondary" size="small" onClick=onNext } children "Next" | confirmed |

- 인스턴스가 없음을 확인한 근거: 닫힌 단계 812:12274·812:12277 의 자식은 frame "Heading 2" + text 뿐이다(get_metadata 812:1056). 열린 단계의 나머지(제목·선택 줄 frame "Label"·구분선 frame 812:12243·812:12257·Next 줄 frame 812:12271)도 frame/text 다.
- "More info" 버튼은 RadioButton 이 `Button { variant="text" }`(Buttons revision 2)로 그린다 — 이 부품의 행이 아니다(인스턴스 안의 것은 하위 부품의 일부, R05).
- 단계 제목은 키트 `Text` 를 쓰지 않는다. Text 의 variant 에 18px Semibold 가 없다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:12228 열린 단계 (540×361) | get_metadata + 페이지 측정 | 지속: 지금 단계 | 패널 전체 | 기준: 여백 24, 모서리 24, 바탕 투명, 테두리 없음, 그림자 `--shadow-elevation-01`(6절). 제목(24,24) 492×24 → 위 16 → 선택 묶음 492×209(아래 선 1) → Next 줄 492×64(위 16, 오른쪽 정렬) | 없음(원은 RadioButton) | `open` | 확정 (Q-02·Q-05) |
| 812:12274 · 812:12277 닫힌 단계 (540×74) | get_metadata + 페이지 측정 | 지속: 다른 단계 | 패널 전체 | 테두리 1 #DDDDDD, 모서리 20, 여백 24 → 제목 (25,25) 490×24. 그림자·내용 없음 | 없음 | `open={false}`(기본) | 확정 (Q-02) |
| 선택 줄 hover·포커스·선택 | 현재 페이지(`checkout-radio*.svg` = 213:1944 그림) | 포인터·키보드·지속 | 줄·원 | RadioButton 이 그림(revision 2) | 원 | 이 부품에 CSS 없음 | 확정 (Q-03) |
| Next hover | 페이지 CSS `#333` | 포인터 | 버튼 | **없앰** — Button Secondary Small 그대로(Figma 238:2225: 기본과 차이 없음) | 없음 | 만들지 않음 | 확정 (Q-04) |

### 크기·간격 (현재 페이지 = Figma 값 → CSS)

| 요소 | 값 | CSS |
|---|---|---|
| 패널 폭 | 540 (페이지 왼쪽 열) | 부모 폭을 채운다(Storybook 은 540 칸) |
| 패널 여백 | 24 | `calc(var(--spacing) * 6)`; 닫힌 단계는 테두리 1 이 더해져 제목이 (25,25) |
| 모서리 | 열린 24 · 닫힌 20 | `calc(var(--spacing) * 6)` · `calc(var(--spacing) * 5)`(Q-06: 지금 값 유지) |
| 제목 | 높이 24 | 줄 높이 `calc(var(--spacing) * 6)` |
| 제목 → 선택 묶음 | 16 | `calc(var(--spacing) * 4)` |
| 선택 묶음 | 492×209 = 줄 40 + 선 1 + 줄 74 + 선 1 + 줄 92 + 아래 선 1 | 줄·줄 사이 선은 RadioButton `variant="list"`. **아래 선 1 #DDDDDD 는 이 부품의 묶음 래퍼** `ds-checkoutstep__options` |
| Next 줄 | 높이 64, 위 여백 16, 오른쪽 정렬. Next 77.38×48(Figma 78×48) | `calc(var(--spacing) * 16)`, padding-top `* 4`, `justify-content: flex-end` |
| 패널 사이 | 24 | 페이지 배치(페이지 계획) |

- Focus 링: 패널 자체에는 없다(누르는 요소가 아님). 라디오 링은 RadioButton(원 바깥 2+2, 레이아웃 밖), Next 링은 Button Secondary Small(바깥 4px #222 + 안쪽 2px #D3D3D3, Storybook 측정 확인).
- Figma에 실제로 없는 상태·조합: 패널 hover/pressed/focus, 닫힌 단계 여닫기, disabled, 오류.
- 미조회: 812:12228 의 그림자·글자 스타일 이름(design_context 응답 없음). 사용자 결정 "Figma 스타일 값으로 맞춤" 대응표로 대신한다(6절) — 남은 빈칸 없음.

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | 현재 값·alpha (Figma 변수: 미조회) | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 단계 제목 | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| 닫힌 단계 테두리 | #DDDDDD, 1px | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 선택 묶음 아래 선 | #DDDDDD, 1px | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 열린 단계 바탕 | rgba(255,255,255,0) = 투명 | — | 없음(바탕을 칠하지 않음) | — | 일치 | 페이지 흰 바탕이 비친다 |
| 열린 단계 그림자 | 원래 `0 0 0 1px rgba(0,0,0,.02), 0 2px 6px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.1)` | — | `--shadow-elevation-01` = `0 4px 18px 0 #0000002B` | 0 4px 18px 0 rgba(0,0,0,.17) | 사용자 결정으로 바꿈 | Q-05: "Figma 스타일 값으로 맞춤" — y 오프셋이 가장 가까운 Elevation. 가장 진한 층(0 4px 8px, 10%)의 y 4 = Elevation 01 의 y 4. Elevation 02(y 1)는 퍼짐 −363 으로 보이지 않고, 03 은 y 6 |
| 줄 사이 선·보조 글 | #EBEBEB · #6C6C6C→#717171 | — | RadioButton revision 2 에서 정함 | — | — | 이 부품 CSS 에 쓰지 않음 |
| Next | #222222 / #FFFFFF | — | Button 이 그림 | — | — | 이 부품 CSS 에 쓰지 않음 |

- 컴포넌트 fill과 부모 배경: 열린·닫힌 단계 모두 바탕이 없다(투명). 페이지 배경 흰색(`bg`). Storybook 캔버스도 흰색.
- 단계 제목 글자(Q-06 답대로):

| 값 | 현재 | CSS |
|---|---|---|
| 크기·글꼴 | 18px, `.SF NS`(페이지 글꼴과 토큰 글꼴이 이 Mac 에서 같은 글꼴로 그려짐 — CDP 확인) | `--text-type-body-copy-18pt-semibold`, `--font-type-body-copy-18pt-semibold` |
| 굵기 | 600 | **590** `--font-weight-type-body-copy-18pt-semibold` (사용자 결정: 600 은 Figma Semibold 값으로) |
| 줄 높이 | 24 | `calc(var(--spacing) * 6)` |
| 자간 | -0.6195px | `calc(var(--spacing) * -0.154875)`(= -0.6195px, 지금 값 유지) |

- 신규 token: 없음. 그림자는 기존 `--shadow-elevation-01`. 리드의 tokens revision 6 이 새로 만드는 역할을 이 부품은 쓰지 않는다.
- 토큰 생성 경로·검증: `pnpm ds:guard`(G10·G13)로 이 부품 CSS 의 모든 `var(--…)` 가 정의돼 있는지 확인한다. 생성물은 직접 고치지 않는다.

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| (없음) | — | — | — | — | 확인 — 이 부품은 그림을 그리지 않는다. 라디오 원은 RadioButton 이 213:1944 대로 그린다. 페이지의 `checkout-radio*.svg` 5개는 부품으로 바꾼 뒤 쓰지 않는다 |

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `title` | text 812:12230·812:12276·812:12279 (번호 포함 한 글자 상자) | 문자열, 필수. 예 "1. Choose when to pay" | `<h2>`(Figma "Heading 2", 현재 페이지도 h2) | — | Q-02 추천안 채택 |
| `open` | 812:12228 / 812:12274 | `false` / `true` | true: 그림자 패널 + 내용. false: 테두리 패널 + 제목만 | 닫힌 단계는 포커스 받는 요소 없음 | Q-02 추천안 채택 |
| `options` | 선택 줄 3개(812:12234·812:12244·812:12258) | `{ value, label, subtext?, actionLabel? }[]`, 열린 단계에서만 | 줄마다 RadioButton `variant="list"` 를 그림 | 네이티브 라디오 묶음 | Q-02 추천안 채택 |
| `name` | 현재 페이지 `pay-when` | 문자열 | 라디오 묶음 이름 | Tab 1번 + 화살표 이동 | Q-02 추천안 채택 |
| `value` / `defaultValue` / `onValueChange(value)` | PRD: 처음엔 선택 없음, 한 번에 하나 | `null`(선택 없음) / options 의 value | 누른 줄이 선택되고 콜백 1회 | Space·화살표(네이티브) | Q-02 추천안 채택 |
| `onOptionAction(value)` | "More info" frame "Button - Learn more about Pay Less Up Front"(812:12252·812:12266) | — | 그 줄의 More info(RadioButton 안의 Button text)를 누르면 콜백만(화면 변화 없음, PRD) | `<button type="button">`, Tab 으로 감. 라디오는 선택하지 않음 | Q-02 추천안 채택 |
| `nextLabel` / `onNext()` | Secondary Buttons 812:12685 "Next" | "Next" / — | Button 클릭 → 콜백만(PRD: 아무 일 없음) | Button 기본(`type="button"`, Tab, Enter/Space) | Q-02 추천안 채택 |
| `className` | 키트 관례 | — | 루트에 붙음(배치용만) | — | Q-02 추천안 채택 |

- 루트: `<section class="ds-checkoutstep ds-checkoutstep--open|--closed" data-testid="ds-checkoutstep" aria-labelledby={제목 id}>`. 선택 묶음 `<div class="ds-checkoutstep__options" role="radiogroup" aria-labelledby={제목 id}>`(현재 페이지의 `aria-label="Choose when to pay"` 대신 보이는 제목을 이름으로). Next 줄 `ds-checkoutstep__actions`.
- 이 부품 CSS 는 자기 `ds-checkoutstep__*` 래퍼만 꾸민다. `.ds-radiobutton`·`.ds-button` 을 선택하거나 `style`·`className` 으로 바꾸지 않는다(R05).

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 페이지 제목(뒤로 화살표 + "Confirm and pay")을 어디에 둘지. Figma 812:12216 의 frame(인스턴스 아님). IconButton·Link·Text 로는 그릴 수 없음 | **A (추천)** 새 작은 구역 부품 `CheckoutHeading`(뒤로 `<a href>` + `<h1>`) · B CheckoutStep 에 `heading` · C Navigation 개정에 넣음 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 계획 `docs/plans/components/CheckoutHeading.md` 를 썼다 | resolved |
| Q-02 | 공개 API(8절) — 데이터로 받아 이 부품이 RadioButton·Button 을 그릴지, children 자리를 줄지 | **A (추천)** 8절 표대로 데이터 · B `children` 자리 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | Nested parts 두 행(4절) | **A (추천)** 4절 표대로 확정(RadioButton revision 2 승인 뒤) · B 다른 대응 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | Figma 에 없는 hover 색: Next #333333, 뒤로 링크 #EBEBEB | **A (추천)** 없앰 · B 유지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드 대응표도 "Figma 에 없는 hover 색은 없앰". 뒤로 링크는 CheckoutHeading 에서 같은 결정 | resolved |
| Q-05 | 열린 단계 그림자 3겹은 Figma Elevation 스타일이 아님 | A 같은 값의 새 토큰 · B Elevation 으로 바꿈 · C 그림자 없음 | 사용자 결정 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → y 오프셋이 가장 가까운 `--shadow-elevation-01`(원래 값은 6절에 기록) | resolved |
| Q-06 | 토큰에 없는 값: 제목 굵기 600, 자간 -0.6195px, 모서리 24·20 | A 새 토큰 · B Figma 글자 스타일 값으로 | 사용자 결정 "Figma 스타일 값으로 맞춤" + "지금 크기·자간 유지 (권장)" (chosen in chat, 2026-11-26) → 굵기 590(`--font-weight-type-body-copy-18pt-semibold`), 자간 `calc(var(--spacing) * -0.154875)`, 모서리 `calc(var(--spacing) * 6)`·`* 5` | resolved |
| Q-07 | 뒤로 링크에 읽기 이름이 없음(측정: aria-label 없음, 그림 alt "") | **A (추천)** `aria-label="Back"` · B "Back to the listing" · C 다른 문구 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). CheckoutHeading 계획에 반영 | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 열린 단계 540×361·닫힌 단계 540×74, 흰 캔버스, 현재 페이지와 같은 위치·크기(그림자만 Elevation 01 로 바뀜 — 사용자 결정) | Storybook iframe(540 칸) 스크린샷·computed style, `/checkout` 과 나란히 | |
| 모든 상태·크기 | 5절 표: 여백 24·모서리 24/20·그림자 Elevation 01·테두리·제목 (24,24)/(25,25)·묶음 209·Next 줄 64. 제목 굵기 590·자간 -0.6195px | DOM 측정(현재 페이지 값과 비교) | |
| 아이콘과 노출 조건 | 이 부품은 그림 없음. 원·점·링은 RadioButton 의 것 | DOM 검사 | |
| 클릭·입력·선택 등 기능 | 줄 글자 클릭 → 그 라디오 선택 + `onValueChange` 1회, 처음엔 선택 없음, More info → `onOptionAction` 1회(선택 안 바뀜), Next → `onNext` 1회 | Storybook play `fn()` + `userEvent.click` | |
| disabled / Tab / Focus | Tab: 라디오 묶음 1번 → More info → More info → Next. 화살표로 선택 이동. 닫힌 단계는 Tab 이 멈추지 않음 | play `userEvent.tab`·`keyboard`, Playwright 실제 키보드로 링 확인 | |
| Nested parts identity | `ds-radiobutton` 3개·`ds-button` 1개(+ RadioButton 안의 More info `ds-button` 2개)가 `ds-checkoutstep` 안에 렌더 | `ai:verify` DOM 검사 | |
| Nested part → composite callback | 라디오·More info·Next 클릭이 각 콜백으로 이어짐 | play `fn()` | |
| 공통 규칙 및 기존 사용처 | 토큰만, 하위 `.ds-*` 선택자 없음 | `pnpm ai:check CheckoutStep`, `pnpm ai:verify CheckoutStep`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 대조를 따로 기록한다. 아직 수행한 검사는 없다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정:
  - Q: 열린 질문 약 100개를 어떻게 답할까요? → A: 추천안 모두 채택 (권장) (chosen in chat, 2026-11-26) — Q-01~Q-04·Q-07
  - Q: Figma 변수·스타일이 아닌 값은? → A: Figma 스타일 값으로 맞춤 (chosen in chat, 2026-11-26) — Q-05(그림자)·Q-06(굵기)
  - Q: 글자 크기·자간은? → A: 지금 크기·자간 유지 (권장) (chosen in chat, 2026-11-26) — Q-06(자간·모서리는 spacing 계산)
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 이 계획 승인, RadioButton revision 2 승인·구현, (More info 를 위해) Buttons revision 2(`variant="text"`, 에이전트 F) 승인·구현.
