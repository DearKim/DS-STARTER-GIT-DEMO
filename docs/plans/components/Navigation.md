---
kind: component
component: Navigation
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=235-2441&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Navigation

> 작성: Claude Code, 2026-11-26. 근거: `docs/plans/design-system-airbnb.md` 1단계 목록의 `Navigation`(새로 만듦). 이 문서는 계획이며, 사용자 승인 전에는 구현 파일을 만들지 않는다. 사이트 페이지(`my-website/pages/*`)는 자유 모드로 만든 것이며, 이 계획에서 고치지 않는다.
> 갱신(2026-11-26, revision 1 유지): 사용자가 채팅에서 "추천안 모두 채택"을 골랐다. 그 결정과 리드가 확인한 사실(Drop down 원본, 새 토큰, 그림자 대조)을 반영했다. 계획 승인은 아직 받지 않았다.

## 1. 요청과 적용 규칙

- 요청한 작업: Figma "Navigation" 세트(235:2441)의 변형 3종(Main / Stays / Expanded Stays Navigation)을 Storybook 부품 `Navigation`으로 만든다. 사이트 세 페이지 맨 위의 내비게이션 바가 나중에 이 부품을 쓸 수 있게 하는 것이 목적이다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09(R05의 Nested parts 규칙 포함)
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, 2026-11-26 Figma Desktop MCP로 직접 조회했다(캐시 아님).
  - `get_design_context 235:2441`: 세트 전체 코드와 스크린샷 1장. 세 변형을 모두 읽었고 응답이 잘리지 않았다.
  - `get_variable_defs 235:2441`
  - `get_metadata 235:2441`: 변형 3개의 id와 크기만 나왔다.
  - `get_metadata 235:2440`, `get_metadata 234:4360`: 직계 자식의 종류를 확인했다.
  - `get_metadata 8:189`: 원본 Login 컴포넌트.
  - asset 14개는 `http://localhost:3845/assets/`에서 scratchpad로 내려받아 읽었다. 프로젝트에는 복사하지 않았다.
- 리드가 확인한 사실(2026-11-26):
  - `get_metadata 0:0`(문서 전체) 결과, Internal Only Canvas에 원본 컴포넌트 "Drop down"(symbol 27:9237, 352×48)이 있다. 인스턴스 27:9260의 레이어 이름·크기와 같다.
  - `node scripts/figma-tokens.mjs`로 Colors 245:3518·Typography 245:3517·Elevation 245:3354를 가져온 뒤 `ds:tokens`를 실행했다. 13pt 글자 토큰과 `--shadow-elevation-01/02/03`이 생겼다.
- 페이지 쪽 참고 자료(읽기만 함): `my-website/figma/*.layers.xml`
  - Home(418:3084)과 Checkout(10613:12100)의 맨 위는 Navigation 인스턴스가 아니다. `Login`·`Logo` 인스턴스를 담은 일반 frame이다.
  - Detail의 맨 위는 Navigation 인스턴스 812:4703(1440×81)이다.
  - Home 히어로에는 Navigation 인스턴스 418:8282(1280×62)가 있다. 어느 변형인지는 읽지 않았다(페이지 범위).
- 대상 코드·토큰 기준: git-demo 작업 폴더의 현재 `src/tokens/tokens.css`(위 가져오기 반영 뒤). 새 색 역할은 리드가 `docs/plans/tokens.md` revision 5에 넣는다.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 세트 235:2441의 축은 `Type` 하나이고 값은 Main / Stays / Expanded Stays Navigation 세 가지다. Main(8:297)은 1440×81 흰 바로, 로고·검색 알약·Login 묶음을 담는다. Stays(235:2440)는 352×48 검색 알약 단독이다. Expanded(234:4360)는 743×63 펼친 검색 막대다. | 사이트 맨 위의 내비게이션 바와 그 안의 검색 막대. 하나의 부품에 `type` 3종을 둔다. | Q-01 A 채택 |
| 누를 수 있는 영역 | Figma에는 누름·hover 모양이 없다. 보이는 것은 로고, "Become a Host" 글자, 지구본, 메뉴·아바타 알약, 검색 알약의 세 칸, 빨간 검색 원, 펼친 막대의 네 칸이다. | 로고·"Become a Host"는 링크, 지구본·메뉴 알약·검색 칸·검색 원은 버튼으로 만든다. | Q-04~Q-09 A 채택 |
| 클릭/선택/열림 동작 | Figma에 메뉴 열림, 언어 선택, 검색 결과, 날짜 선택 모양이 없다. | 링크 이동과 콜백 호출만 한다. 메뉴·팝업·입력칸은 만들지 않는다. | Q-04~Q-09 A 채택 |
| 키보드·포커스 범위 | Figma에 Focus 변형이 없다. | 누를 수 있는 요소마다 Tab으로 이동하고, 포커스 링은 브라우저 기본값을 쓴다(ListingCard와 같은 방식). | Q-05~Q-09 A 채택 |
| disabled 동작 | Figma에 Disabled 변형이 없다. | disabled는 만들지 않는다. | Q-01 A 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 컴포넌트, 공개 import, 사용처:
  - `src/components/`에 Navigation·Header·Logo·Login·"Drop down"이라는 이름의 부품이 없다.
  - `components.baseline.json`의 "Navigation (Global)" 분류에 `UIShell`·`PageHeader`·`Menu` 항목이 있다. 다만 `src/components`에 구현된 키트 부품이 아니다.
  - `Dropdown`은 combobox·listbox 패턴의 값 선택 부품이라 역할이 다르다. 원본 이름 "Drop down"과도 철자가 정확히 같지 않다.
  - `Search`는 글자 입력 부품이고 `Link`는 `<a>` 부품이다. 둘 다 Navigation 세트의 Figma 인스턴스가 아니며 쓰지 않는다.
- 기존 props·stories에서 확인한 지원 범위: 해당 없음(새 부품).
- 새 부품이 필요한 이유: 같은 역할이나 같은 이름의 키트 부품이 없다.
- 변경할 파일(승인 후):
  - `src/components/Navigation/Navigation.tsx`·`.css`·`.stories.tsx`·`Navigation.figma.tsx`·`index.ts`(새로)
  - Figma 로고 PNG를 `src/components/Navigation/`에 둔다.
  - 페이지는 이 계획에서 고치지 않는다.
- 승인된 변경에서 영향받는 기존 사용처: 없음. 새 색 역할과 그림자 토큰은 기존 역할의 값을 바꾸지 않는다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| `Drop down` 27:9260 | `Drop down`(symbol 27:9237, 352×48, Internal Only Canvas). 리드가 문서 전체 metadata로 확인했고, 레이어 이름과 크기가 같다. | — | 8:297 Main Navigation | none — Navigation 안에서 Stays 알약과 같은 마크업으로 그림(키트에 "Drop down"이라는 부품이 없고, `Dropdown`은 이름과 역할이 다름) | confirmed |
| `Login` 8:194 | `Login`(symbol 8:189, variant 없음). get_metadata 8:189의 자식 6:802·6:807·8:187이 인스턴스 안쪽 id와 일치한다. | — | 8:297 Main Navigation | none — Navigation 안에서 그림("Become a Host" 링크, 지구본 버튼, 메뉴·아바타 버튼) | confirmed |
| `Logo`(원본 8:192) | `Logo`(component 8:192). design context가 원본 id 8:192로 렌더했다. | — | 8:297 Main Navigation | none — Figma PNG를 부품 폴더에 두고 `<a href={logoHref}>` 안의 `<img alt="Airbnb">`로 그림 | confirmed |
| —("Become a Host" 글자, Login 안 text 8:187) | — | — | 8:297 Main Navigation | none — Navigation 안의 `<a href={hostHref}>`, Figma 글자 모양 그대로(키트 `Link`를 쓰지 않음) | confirmed |

- 인스턴스가 없음을 확인한 근거:
  - Stays 235:2440의 자식은 frame `Frame 9`(text 3·line 2)와 frame `Group 2`뿐이다(get_metadata 235:2440).
  - Expanded 234:4360의 자식은 frame 4개(각각 text 2), line 3개, frame `Group 2`뿐이다(get_metadata 234:4360).
- 인스턴스 안의 인스턴스는 행을 만들지 않았다. 예: Login 안의 Frame 19 6:802는 get_metadata로 frame임을 확인했다.
- 모든 행이 `none`이라 Navigation은 키트 부품을 import하지 않는다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 8:297 Type=Main Navigation | get_design_context + 스크린샷, get_metadata(세트) | 지속: 변형 | 바 전체 | 1440×81, 바탕 흰색, 네 변에 1px #DDDDDD 테두리. 로고·검색 알약·Login을 절대 위치로 배치(오토 레이아웃 없음) | 로고 PNG, 구분선 2, 검색 원 32, 지구본, 메뉴 선, 아바타, 알림 점 | `type="main"` | 확정 |
| 235:2440 Type=Stays Navigation | get_design_context + get_metadata | 지속: 변형 | 알약 | 352×48, 흰색, 1px #EBEBEB, 모서리 500, 그림자 있음 | 구분선 2, 검색 원 32 | `type="stays"` | 확정 |
| 234:4360 Type=Expanded Stays Navigation | get_design_context + get_metadata | 지속: 변형 | 막대 | 743×63, 흰색, 1px #D3D3D3, 모서리 500, 그림자 없음, 칸 4개 | 구분선 3, 검색 원 48 | `type="expanded"` | 확정 |

- Focus 링이 감싸는 범위와 근거: Figma에 없다. 누를 수 있는 요소마다 브라우저 기본 포커스 링을 쓴다(접근성 기본값).
- Figma에 실제로 없는 상태·조합: hover, pressed, focus, disabled, 칸 선택(펼친 막대에서 한 칸이 강조된 모양), 메뉴 열림, 로그인 뒤 사진 아바타. 모두 만들지 않는다.
- 미조회·실패·잘린 응답:
  - 남은 사실 공백은 없다.
  - Drop down 원본은 리드가 확인했다(1·4절).
  - Main 안 Logo 인스턴스 자신의 id는 읽지 않았다. 원본 8:192로 대응하므로 구현에는 필요 없다.
  - 테두리 선 정렬은 안쪽 선으로 본다. 근거는 높이에 테두리가 더해지지 않은 것이다: Stays 48 = 8+32+8, Expanded 63 = 14+14+4+17+14, Main 81. 렌더 검사에서 2px 이내 차이를 확인한다.
  - 그림자는 Elevation 스타일 어느 것과도 같지 않다(리드 대조, 6절).

### 크기·간격 (Figma 값 → CSS)

| 요소 | Figma 값 | CSS |
|---|---|---|
| Main 바 | 1440×81, 테두리 1(네 변). 로고 (80,21) 102×32, 검색 알약 (544,17) 352×48, Login (1111,21) 249×38. 좌우 여백은 80으로 같고 알약 중심은 720이다. | 부모 폭을 채운다(Q-10 A). 좌우 여백 `calc(var(--spacing) * 20)`, 검색 알약은 가운데, 세로 위치는 Figma 좌표 그대로. 새 breakpoint는 만들지 않는다. 테두리는 `--border-width-thin`. |
| Login 묶음 | 249×38. "Become a Host" (0,11) 104×17, 지구본 6:807 (128,11) 16×16, 메뉴·아바타 알약 6:802 (168,0) 81×38. 요소 사이는 24. | gap `calc(var(--spacing) * 6)` |
| 메뉴·아바타 알약 6:802 | 81×38, 모서리 29, 테두리 1 #EBEBEB, 흰색. 메뉴 선 (12,15) 14×8, 아바타 frame 6:789 (42,2) 32×34: 원 30×30 (2,2), 알림 점 10×10 (23,−1) | 모서리 29는 높이 38의 절반을 넘으므로 화면에서는 `--radius-full`과 같다. |
| 검색 알약(Stays, Main 안) | 왼쪽 여백 28, 오른쪽 8, 위아래 8. 간격 24. 글자 묶음 260×24 안의 간격 16. 구분선 길이 24·두께 1. 검색 원 32×32 | padding `calc(var(--spacing) * 2) calc(var(--spacing) * 2) calc(var(--spacing) * 2) calc(var(--spacing) * 7)`, gap `* 6`·`* 4`, 원 `* 8`, `--radius-full` |
| 펼친 막대 | 좌우 여백 6, 자식 사이 1. 칸 폭 209·129·129·209. 칸 안 여백 위아래 14·좌우 24, 줄 사이 4. 첫 칸은 왼쪽 모서리 500. 구분선 길이 25. 검색 원 48×48(y 7.5) | padding `* 1.5`, gap `* 0.25`, 칸 padding `* 3.5`/`* 6`, gap `* 1`, 원 `* 12` |
| 글자 줄 높이 | 13px 글자 상자 높이 16, 12px은 14, 14px은 17. Figma 스타일의 lineHeight 100은 단위를 알 수 없다(`.ds/provenance.json`). | `line-height: normal`(ListingCard와 같음) |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| Main 바·검색 알약·펼친 막대·칸·메뉴 알약 바탕 | #FFFFFF / Shade 01 | shade-01 | `surface` | #FFFFFF | 일치(부품 표면, Q-11 A) | — |
| Main 바 테두리 | #DDDDDD / Neutral 03 | neutral-03 | `border` | #DDDDDD | 일치 | — |
| 검색 알약 테두리, 알약 안 구분선 Line 1·2(235:2432·235:2434), 메뉴 알약 테두리(6:747) | #EBEBEB / Neutral 02 | neutral-02 | `border-subtle`(새, 합친 목록) | tokens.md rev 5 적용 뒤 #EBEBEB | 일치 | `border`(#DDDDDD)와 값이 다르다. |
| 펼친 막대 테두리, 구분선 Line 9·10·11 | #D3D3D3 / Neutral 04 | neutral-04 | `border-medium`(새, 합친 목록) | rev 5 적용 뒤 #D3D3D3 | 일치 | `border`·`border-strong`과 값이 다르다. |
| "Anywhere"·"Any week"·칸 제목(Where·Check-in·Check-out·Who)·"Become a Host" | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| 지구본 선·메뉴 선(stroke 1.5) | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치(아이콘을 글자색으로 칠함) | — |
| "Add guests"(검색 알약) | #5E5E5E / Neutral 08 | neutral-08 | `text-tertiary` | #5E5E5E | 일치 | ListingCard의 장소·날짜와 같은 보조 정보 글자다. |
| 칸 값(Search destinations·Add dates·Add guests) | #717171 / Neutral 07 | neutral-07 | `text-secondary` | #717171 | 일치 | — |
| 검색 원 바탕(32·48) | #FF385C / Primary 02 | primary-02 | `primary` | #FF385C | 일치 | 주 행동 색이다. |
| 검색 돋보기 선 | #FFFFFF(SVG `white`) | shade-01 | `on-primary` | #FFFFFF | 일치 | primary 위 흰색 |
| 아바타 원(6:790) | #717171 / Neutral 07 | neutral-07 | `avatar-placeholder`(새, 합친 목록) | rev 5 적용 뒤 #717171 | 일치 | 값은 `text-secondary`와 같지만 아바타 자리 채움이라 역할이 다르다. |
| 아바타 사람 모양(6:796 Group 6) | #FFFFFF | shade-01 | `on-image` | #FFFFFF | 일치(Q-11 A: 이미지 위 흰색 재사용) | — |
| 알림 점 채움(6:792) | #FF385C / Primary 02 | primary-02 | `primary` | #FF385C | 일치(Q-11 A: 브랜드 색 재사용) | — |
| 알림 점 둘레 선(stroke 1) | #FFFFFF | shade-01 | `surface` | #FFFFFF | 일치(Q-11 A) | — |
| 아바타 마스크(Group 5) | #737373 | — | 없음 | — | 해당 없음 | 화면에 보이지 않는 alpha 마스크 모양이라 토큰이 필요 없다. |
| 검색 알약 그림자(235:2440, Main 안 27:9260) | drop-shadow X 0, Y 4, blur 2, #000000 4%. spread는 응답에 없었다(filter `drop-shadow`로 출력되어 0으로 봄). | — | 제안 `--shadow-search-pill: 0px 4px 2px 0px rgba(0, 0, 0, 0.04)` — **보류** | 없음 | 해당 Elevation 없음 | `--shadow-elevation-01/02/03` 어느 것과도 같지 않다(근거 노드 235:2440). 키트에는 Figma 스타일이 아닌 그림자를 넣는 입력 경로가 없다(`figma-merge.mjs`가 버림). 그래서 리드 결정(2026-11-26)에 따라 지금은 그리지 않고 리터럴도 쓰지 않는다. 보류 사유: Figma effect 스타일이 필요하고, 그 뒤 다시 가져와야 한다. |
| 로고 PNG | 래스터 안의 색 | — | — | — | 해당 없음 | 이미지라 토큰 대상이 아니다. |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: Main 바, 알약, 막대는 모두 자기 fill이 흰색이다(투명이 아님). 세트 스크린샷의 회색은 Figma 세트 캔버스 배경이다. Storybook 캔버스는 원본 페이지와 같은 흰 배경을 쓴다.
- 같은 값의 후보가 여러 개일 때 선택 근거:
  - 바탕 흰색은 `bg`와 `surface`가 모두 #FFFFFF지만, 부품 표면이라 `surface`를 쓴다.
  - 알림 점·점 둘레·아바타 사람 모양은 Q-11 A대로 기존 역할을 다시 쓴다.
- 신규 token: `border-subtle`·`border-medium`·`avatar-placeholder`(리드가 tokens.md revision 5에 넣음), `--shadow-search-pill`(리드가 layout 토큰으로 추가). primitive는 모두 이미 있다(neutral-02·neutral-04·neutral-07).
- 글자 토큰(모두 지금 `tokens.css`에 있음):

| Figma 스타일 | 쓰는 곳 | 토큰 |
|---|---|---|
| Body Copy/13pt Semibold(SF Pro 13/590) | "Anywhere"·"Any week" | `--text-type-body-copy-13pt-semibold` + `--font-weight-type-body-copy-13pt-semibold` + `--font-type-body-copy-13pt-semibold` |
| Body Copy/13pt Regular(13/400) | "Add guests"(알약) | `--text-type-body-copy-13pt-regular` + weight + font |
| Body Copy/14pt Semibold(14/590) | "Become a Host" | `--text-type-body-copy-14pt-semibold` + weight + font |
| Body Copy/12pt Semibold(12/590) | 칸 제목 | `--text-type-body-copy-12pt-semibold` + weight + font |
| Body Copy/14pt Regular(14/400) | 칸 값 | `--text-type-body-copy-14pt-regular` + weight + font |

- 토큰 생성 경로·검증 계획: 리드가 tokens.md revision 5를 적용한다(`pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens`). 그 뒤 구현에서 쓰는 모든 `var(--…)`가 정의돼 있는지 `pnpm ds:guard`(G13)로 확인한다. 생성물은 직접 고치지 않는다.

## 7. 원본 아이콘·asset

asset 이름은 MCP asset 해시 앞 8자이고, 괄호 안은 내려받은 파일의 sha256 앞 12자다.

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| Logo 8:192 | 37640204….png (3956c591c87f), PNG 1200×375 RGBA | 102×32 칸에 object-cover. 사이트의 `my-assets/images/logo.png`(204×64)와 다른 파일이다. | Main | Stays, Expanded | 확인 |
| Line 1·2 235:2432·235:2434(Main 안 I27:9260;27:9203·27:9205) | b86af410… (38cb5ec4df2c), 699faa0a… (e0b22d584a55) | 길이 24를 90° 돌린 세로선, stroke #EBEBEB 1 | Main, Stays | Expanded | 확인 |
| 검색 원 32 235:2436(Main 안 I27:9260;27:9207) | 6285cd99… (d6a69a51cf53) | 32×32. 원 r16 #FF385C, 고리 r4 stroke 2 흰색, 손잡이 선 (21.29,21.71)→(17.05,17.46) stroke 2 흰색 | Main, Stays | Expanded | 확인 |
| 검색 원 48 234:4356 | cdaacc7a… (595e20c6bade) | 48×48. 원 r24 #FF385C, 고리 r5.986 stroke 2.972 흰색, 손잡이 선 stroke 2.972 흰색 | Expanded | Main, Stays | 확인 |
| Line 9·10·11 234:4341·4345·4349 | 298ecb88… (3e98b21cc4ce) | 길이 25 세로선, stroke #D3D3D3 1 | Expanded | Main, Stays | 확인 |
| 메뉴 선 I8:194;6:761 | 7adb53f0… (e4081c795956) | 14×9.5, 가로선 3개(y 0.75·4.75·8.75), stroke 1.5 #222222 | Main | Stays, Expanded | 확인 |
| 지구본 I8:194;6:803·6:804·6:806 | 0031613a… (dd67e2b2063a) 원 r8, 1fd1a705… (d47be8736ffe) 타원 rx3 ry8, 90f8c41d… (9995f85bb9b0) 가로선 길이 16(y 9) | 16×16 칸. 모두 stroke 1.5 #222222 | Main | Stays, Expanded | 확인 |
| 아바타 원 I8:194;6:790 | c79f0349… (1e4d97119446) | 30×30, fill #717171 | Main | Stays, Expanded | 확인 |
| 아바타 사람 I8:194;6:796 | fd64d932… (1db73166cca6) 흰 원 2개(22.5×33.75), 마스크 d652e8e7… (7753c0d72c54) 원 지름 24.375 | 마스크 위치 (−0.938, −3.75), 사람 모양 (5.75, 8.56) | Main | Stays, Expanded | 확인 |
| 알림 점 I8:194;6:792 | 85c219bd… (586a0c12fb9b) | 지름 10(선 포함 12), fill #FF385C, stroke 흰색 1 | Main | Stays, Expanded | 확인 |

- SVG는 `<svg>` JSX로 그리고 색은 CSS 토큰으로 준다. 경로와 크기는 원본 그대로 쓴다.
- 로고는 래스터 PNG라 부품 폴더의 파일을 `<img>`로 넣는다(Q-04 A). 구현 때 MCP에서 원본 해시와 같은 파일을 다시 받아 둔다.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `type` | 세트 축 `Type` | `"main"`(Figma 기본값) / `"stays"` / `"expanded"` | 변형에 맞게 렌더 | — | Q-01 A |
| `logoHref` | Logo 8:192 | `"/"` | 로고를 `<a href>`로 감싸고, `<img alt="Airbnb">` | Tab, Enter로 이동 | Q-04 A |
| `hostHref` | text 8:187 | 없음 / 주소. 글자 "Become a Host" | `<a href>`, Figma 글자 모양 그대로 | Tab, Enter로 이동 | Q-05 A |
| `onLanguageClick` | 지구본 6:807 | — | `<button aria-label="Language">` 클릭 시 콜백. 메뉴는 만들지 않음 | Tab, Enter/Space | Q-06 A |
| `onMenuClick` | 메뉴·아바타 알약 6:802 | — | 알약 전체가 `<button aria-label="Menu">` 하나. 클릭 시 콜백. 메뉴는 만들지 않음. 알림 점과 아바타는 Figma 그대로 고정하고 prop을 만들지 않음 | Tab, Enter/Space | Q-07 A |
| `onFieldClick` | 검색 알약 235:2430, 펼친 막대 234:4346·4333·4334·4342 | Stays·Main: `"where"`·`"when"`·`"who"` / Expanded: `"where"`·`"checkIn"`·`"checkOut"`·`"who"` | 칸마다 `<button>`. 누르면 그 칸 이름으로 콜백. 펼친 막대로 바꾸는 일은 부모가 한다 | Tab, Enter/Space | Q-08 A, Q-09 A |
| `onSearchClick` | 검색 원 235:2436·234:4356 | — | `<button aria-label="Search">` 클릭 시 콜백 | Tab, Enter/Space | Q-08 A, Q-09 A |
| `values`(Expanded) | 234:4348·4332·4336·4344 | `{ where: "Search destinations", checkIn: "Add dates", checkOut: "Add dates", who: "Add guests" }` | 칸 값 글자를 바꿀 수 있음. 칸 제목과 Stays 알약 글자는 Figma 문구로 고정 | — | Q-09 A |
| 최상위 요소 | — | `type="main"`이면 `<header>`, 검색 묶음은 `<div role="search">` | `data-testid="ds-navigation"`, 클래스 `ds-navigation`·`ds-navigation--<type>` | — | Q-01 A |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 부품 구조와 범위 | A. 한 부품에 `type` 3종, 세 변형 모두(추천). B. Main 바와 검색 막대를 분리. C. Main만 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | Main 안 `Drop down` 27:9260의 원본 | A. `none` — Stays 알약 마크업으로 그림(추천). B. 원본 이름 확인 후 다시 계획 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드 확인: 원본은 Internal Only Canvas의 "Drop down"(27:9237, 352×48)이고 같은 이름의 키트 부품이 없다 → `none` | resolved |
| Q-03 | `Login` 8:194(원본 8:189) | A. `none` — Navigation 안에서 그림(추천). B. 별도 Login 부품 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | `Logo` 8:192와 링크 여부 | A. `none` + PNG를 부품 폴더에 두고 `<a href={logoHref}>`, 기본 "/"(추천). B. 링크 없음. C. 별도 Logo 부품 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | "Become a Host"(일반 text 8:187) | A. `none` — 직접 `<a href={hostHref}>`(추천). B. 키트 `Link`. C. `<button>` | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-06 | 지구본 동작 | A. 버튼 + `onLanguageClick`(추천). B. 장식 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | 메뉴·아바타 알약과 알림 점 | A. 버튼 하나 + `onMenuClick`, 점과 아바타는 고정(추천). B. 버튼 둘. C. prop 추가 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | 검색 알약 동작 | A. 칸별 버튼 + `onFieldClick`·`onSearchClick`(추천). B. 알약 전체가 버튼 하나 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-09 | 펼친 막대 동작 | A. 칸 버튼 + 콜백, 값 글자는 props(추천). B. 실제 `<input>` | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-10 | Main 바 폭과 배치 | A. 부모 폭 채움 + 좌우 80, 알약 가운데, breakpoint 없음(추천). B. 1440 고정 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-11 | 색 역할 | A. 제안대로(추천). B. 모두 새 역할. C. 사용자가 이름 지정 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 새 색 역할은 "합친 목록 + 다시 가져오기"로 결정했고, `border-subtle`·`border-medium`·`avatar-placeholder`는 합친 목록의 이름과 같다. | resolved |
| Q-12 | 13pt 글자 토큰 2개 | A. `ds:figma`로 다시 가져오기(추천). B. 다른 크기로 대체 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드가 Typography 245:3517을 가져와 `--text-type-body-copy-13pt-semibold`·`-13pt-regular`(+font·weight·tracking)가 생겼다. | resolved |
| Q-13 | 검색 알약 그림자 | A. 리드가 Elevation과 대조하고, 같은 값이 없으면 새 `--shadow-*`(추천). B. 그림자 없음 | 추천안 채택(A) — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 리드 대조 결과 Elevation 01/02/03 어느 것과도 같지 않다 → 새 layout 토큰 `--shadow-search-pill: 0px 4px 2px 0px rgba(0, 0, 0, 0.04)`(근거 노드 235:2440)를 제안했다. | resolved |

모든 질문이 해결됐다. 이 결정들은 계획 내용이며, 계획 승인("Approve revision 1")은 아직 받지 않았다.

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 세 변형이 235:2441 스크린샷과 같은 모양. 부품 fill은 흰색이고 캔버스도 흰 배경 | Storybook iframe 스크린샷·computed style | |
| 모든 상태·크기 | Stays 352×48, Expanded 743×63. Main은 1440 폭 캔버스에서 높이 81이고 위 크기 표의 위치. 테두리 안쪽 선과의 차이(2px 이내)를 기록 | DOM 크기·위치 측정, 원본 대조 | |
| 아이콘과 노출 조건 | 7절 표의 asset이 변형별로 정확한 위치·크기에 있음. 로고 PNG가 원본 해시와 같음 | DOM·스크린샷 대조 | |
| 클릭·입력·선택 등 기능 | 로고·"Become a Host"는 `href`가 있는 `<a>`. `onLanguageClick`·`onMenuClick`·`onSearchClick`은 1회 호출되고, `onFieldClick`은 칸 이름과 함께 1회 호출됨 | Storybook play `fn()` + `userEvent.click` + 호출 인자 검사 | |
| disabled / Tab / Focus | 누를 수 있는 요소가 화면 순서대로 Tab 포커스됨 | play `userEvent.tab` | |
| 그림자 | 보류: 검색 알약 그림자는 Figma effect 스타일이 필요하고, 그 뒤 다시 가져와야 한다. 지금은 모든 변형에 box-shadow가 없어야 한다(리터럴 금지). | computed style | |
| Nested parts identity | 해당 없음: 모든 행이 `none`이라 키트 부품을 import하지 않음. 키트 부품의 복제 마크업이 없음을 확인 | 코드 검토, `ai:check` | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 기존 부품에 영향 없음 | `pnpm ai:check Navigation`, `pnpm ai:verify Navigation`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 원본 대조를 따로 기록한다. 아직 수행한 검사는 없다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 부품 계획 8개의 질문 91개를 어떻게 답할까요? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26). Q: 새 색 역할 → A: 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26). Q: 그림자 → A: Figma 이름으로 추가 (chosen in chat, 2026-11-26).
- 기준 없는 값 처리: Q: 기준 없는 값 → A: 근거와 함께 토큰 추가 (chosen in chat, 2026-11-26). 다만 키트에 Figma 스타일이 아닌 그림자를 넣는 입력 경로가 없다. 그래서 리드 결정으로 `--shadow-search-pill`은 보류하고, 검색 알약 그림자는 지금 그리지 않는다(Figma effect 스타일이 필요하고, 그 뒤 다시 가져와야 한다).
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 없음. tokens.md revision 5는 적용됐다. 검색 알약 그림자는 위 보류 사유대로 빠진다.
