---
kind: component
component: ServiceTab
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=418-3150&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — ServiceTab

> 작성: Claude Code(에이전트 B), 2026-11-26. 근거: 사용자 요청 "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘"와 같은 날의 결정 "구역도 부품으로 (권장)"·"페이지 모양 유지 (권장)". 이 문서는 계획이다. 사용자 승인 전에는 구현 파일을 만들지 않는다. 페이지(`my-website/pages/*`)는 이 계획에서 고치지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Home 히어로의 아이콘 탭 5개("All"·"Homes"·"Hotels"·"Experience"·"Services")를 Storybook 부품 `ServiceTab`으로 만든다. 히어로 구역 부품 `Hero`(별도 계획 `docs/plans/components/Hero.md`)가 이 부품을 5번 쓴다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, 2026-11-26 Figma Desktop MCP로 직접 조회(캐시 아님).
  - `get_metadata 389:7765`(Homework 페이지의 "Selfmake" 섹션): 원본 세트 `Service tab` 418:3150(268×123)과 변형 3개를 찾았다. Status=Default 418:3148, Status=Selected 418:3149, Status=Hover 418:3147(모두 60×93). 같은 섹션에 아이콘 세트 `Service Icon` 418:3128(Type=All 418:3125·Homes 418:3123·Hotels 418:3124·Experiences 418:3126·Services 418:3127, 모두 48×48)이 있다.
  - `get_design_context 418:3150`: 세 변형의 코드와 스크린샷 1장. 응답은 잘리지 않았다.
  - asset `f0fb639d….png`(Service Icon 기본 그림)를 scratchpad에 내려받아 대조했다. 프로젝트에는 복사하지 않았다.
- 페이지 쪽 사실(읽기만 함):
  - `my-website/figma/Home.layers.xml`: 히어로 418:8305 → Frame 1 418:8304 → Tab group 418:8303(620×92) 안에 `Service tab` 인스턴스 5개. 418:3155 (0,−1) 60×94, 418:8261 (140,−1), 418:8265 (280,−1), 418:8269 (420,−1), 418:8273 (560,−0.5) 60×93. 인스턴스별 Status 값은 읽지 않았다(Home.png 캡처에서는 첫 탭만 선택 모양으로 보인다).
  - 현재 페이지 측정: Playwright, http://127.0.0.1:5175/ (커밋 `aa9a593`), 1440×900, DPR 1. 스크립트·결과: scratchpad `rebuild/B/measure.mjs`·`measure.json`·`icon.mjs`.
  - 페이지 코드: `my-website/pages/HomePage.tsx` 99~106행, `HomePage.css` 128~169행·719~726행.
- 대상 코드·토큰 기준: git-demo 작업 폴더의 현재 `src/tokens/tokens.css`(semantic 46개).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 세트 418:3150, 축 `Status` = Default / Selected / Hover. 아이콘 칸(Icon item 62×62) + 글자 한 줄. PRD: "clicking a tab makes it the chosen one … Only one is chosen at a time. "All" is chosen at first. The rest of the page doesn't change" | 여러 개 중 하나를 고르는 선택 버튼 한 개. 묶음(한 개만 선택)은 부모 `Hero`가 관리한다 | Q-02 A 채택 |
| 누를 수 있는 영역 | Figma에 누름 모양 없음. 현재 페이지는 탭 전체(60×98)가 `<button type="button" aria-pressed>` | 탭 전체가 버튼 하나 | Q-02 A 채택 |
| 클릭/선택/열림 동작 | Selected는 지속 상태(R02). Hover는 포인터 의사 상태 | `selected` prop(지속 상태)과 `onClick` 콜백. Hover는 CSS `:hover`. 선택을 옮기는 일은 부모가 한다 | Q-02 A, Q-05 A 채택 |
| 키보드·포커스 범위 | Figma에 Focus 변형 없음. 현재 페이지는 탭마다 Tab으로 가고, 브라우저 기본 포커스 링(outline auto 1px, 60×98 버튼 둘레)이 보인다 | 탭마다 Tab 정지. 포커스 링은 브라우저 기본값(Navigation·ListingCard와 같은 방식) | Q-06 A 채택 |
| disabled 동작 | Figma에 Disabled 변형 없음. PRD에도 없음 | 만들지 않는다. 네이티브 `disabled` 전달만 유지 | Q-02 A 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 컴포넌트, 공개 import, 사용처:
  - `src/components/`에 ServiceTab·"Service tab" 이름의 부품이 없다.
  - `Tabs`는 Figma "Underline Tabs"(229:2214)·"Pill Tabs"(237:2219)의 부품이다. 원본 이름이 다르다(`docs/plans/design-system-airbnb.md` §6도 "Home 위쪽 아이콘 탭은 Underline Tabs 가 아니라 `Service tab` 인스턴스다"라고 바로잡았다).
  - `Chip`은 Figma "Chips"(234:2568)의 부품이다. 원본 이름이 다르다.
  - **`IconButton`과의 관계(R05)**: `docs/plans/components/IconButton.md`(revision 1)는 같은 Selfmake 섹션의 서로 다른 세트 4개 — `Icon button` 393:9507, `Service Icon` 418:3128, `Service tab` 418:3150, `Button Icon` 420:8330 — 를 한 부품에 합쳐 적었다. "Status=Default/Hover/Selected" 행(418:3148·418:3147·418:3149)이 바로 이 `Service tab` 세트다. 그래서 지금 `src/components/IconButton/IconButton.tsx`에는 `status: "default" | "hover" | "selected"` prop과 `iconType: "services" | … | "all"`이 들어 있다(커밋 7159c65). 이 계획의 판단:
    - 원본 이름이 `Service tab`이고 역할(글자 있는 선택 탭)이 아이콘만 있는 버튼과 다르므로 `IconButton`으로 그리지 않고 새 부품 `ServiceTab`으로 만든다(R05: 원본 이름으로 대응).
    - IconButton의 `status="hover"`는 상태를 prop으로 만든 것이라 공통 규칙(체크리스트 1, R02)에 어긋난다.
    - IconButton.md는 머리말이 `status: approved`인데 §11에 승인 기록이 없고 "구현 전에 남은 조건: Q-01, Q-02 답변 필요"라고 적혀 있다. 승인 근거가 불분명하다.
    - IconButton은 이 계획의 소유 범위가 아니다. IconButton에서 Service tab·Service Icon 부분을 빼는 일은 리드가 별도 revision으로 정한다. 이 계획은 IconButton 파일을 고치지 않는다. IconButton을 쓰는 페이지는 없다(`Icon` stories·문서만 참조).
- 기존 props·stories에서 확인한 지원 범위: 해당 없음(새 부품).
- 새 부품이 필요한 이유: 같은 원본 이름의 키트 부품이 없다.
- 변경할 파일(승인 후): `src/components/ServiceTab/ServiceTab.tsx`·`.css`·`.stories.tsx`·`ServiceTab.figma.tsx`·`index.ts`(새로). 페이지·IconButton은 고치지 않는다.
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품). 새 색 역할은 기존 역할 값을 바꾸지 않는다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| `Service Icon` 418:3134(Default·Hover), 418:3129(Selected) | `Service Icon` 세트 418:3128(get_metadata 389:7765). 응답의 기본 그림 asset `f0fb639d…`가 Type=All 그림과 같다 | Type=All(세트 안 기본값). 탭마다 Type이 바뀐다 | 418:3148, 418:3147, 418:3149 | none — 이 부품 안의 `<img alt="">`로 그림. 키트에 "Service Icon" 이름의 부품이 없다(`Icon`은 이름이 다름). 그림은 `iconSrc` prop으로 받음(Q-03 A) | confirmed |
| —(글자 "All" 418:3136·418:3135) | — | — | 세 변형 모두 | none — 이 부품 안의 글자. `Text` 부품의 variant(body·body-sm·title)는 키트 기본 글꼴이라 Figma 16pt SF Pro·흰색을 그릴 수 없다(ListingCard와 같은 처리) | confirmed |

- 인스턴스 안의 인스턴스는 행을 만들지 않았다. Service Icon 안쪽은 이미지 채움 사각형뿐이다(design context).

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 418:3148 Status=Default | get_design_context + 스크린샷 | 기본 | 탭 전체 | 기준: 폭 60, 세로 묶음 간격 12, 가운데 정렬. Icon item 62×62(폭 60 칸 밖으로 양쪽 1씩 나감), 안쪽 여백 6, 모서리 12, 흰색. Service Icon 48×48, 그림은 166.67%×150% 크기로 왼쪽 −31.3%·위 −23.85% 자리에 두고 잘라 보임. 글자 16 Regular 흰색, 줄 높이 normal → 높이 93 | 있음(Service Icon) | `selected={false}` | 확정 |
| 418:3147 Status=Hover | get_design_context + 스크린샷 | 포인터 hover | Icon item | Icon item 바탕만 #FCEDED. 나머지 Default와 같음 | 있음 | Figma Hover 모양은 쓰지 않음. 페이지 모양: CSS `:hover`에서 탭 전체 불투명도 0.8(Q-05 A) | 확정 |
| 418:3149 Status=Selected | get_design_context + 스크린샷 | 지속: 선택 | Service Icon, 글자 | Service Icon 48×48에 테두리 1.5 #C72D65(모서리 6)와 바탕 rgba(241,164,164,0.2)가 그림 아래에 깔림. Icon item은 흰색 그대로. 글자 16 Semibold(590) | 있음 | `selected={true}`. 모양은 페이지 모양(아이콘 칸 전체 테두리, 분홍 바탕 없음, Q-01 A), 색은 #D03660(Q-04) | 확정 |

- Figma 응답의 스타일 목록에 `Gradient 03`이 값 없이(",,") 나왔다. 어느 레이어가 쓰는지 응답에 없다. 선택 테두리가 그라디언트 스타일일 가능성이 있다(MCP 코드는 단색 #C72D65로 냄). 사용자 결정(Figma 스타일 값으로 맞춤)에 따라 선택 테두리는 Figma 변수 Accent 02 #D03660으로 그린다(Q-04).
- Focus 링이 감싸는 범위와 근거: Figma에 없다. 브라우저 기본 링(Q-06).
- Figma에 실제로 없는 상태·조합: Pressed, Focus, Disabled, 선택+hover 조합. 모두 만들지 않는다.
- 미조회·실패: 없음. 인스턴스 418:3155 등의 Status 값과 글자는 읽지 않았다(Hero 계획의 데이터로 다룸).

### 현재 페이지의 모양(기준 화면, Playwright 측정)과 Figma 차이

사용자 결정 "페이지 모양 유지"와 Q-01 A에 따라 아래 페이지 값이 기준이다. 단, 색은 Figma 값으로 맞춘다(선택 테두리 #C72D65 → #D03660, Q-04).

| 요소 | 현재 페이지(측정값) | Figma 418:3150 | 차이 |
|---|---|---|---|
| 탭 전체 | `<button>` 60×98, 세로 묶음 간격 12, 가운데 정렬. 탭 사이 간격 80(페이지 배치) | 60×93 | 높이 +5(글자 줄 높이) |
| 아이콘 칸 | 60×62(`box-sizing: border-box`, `max-width: 100%`로 62가 60으로 줄어듦), 여백 6, 모서리 12, 흰색 | 62×62, 여백 6, 모서리 12, 흰색 | 폭 −2 |
| 아이콘 그림 | `<img>` 자체가 칸. 240×216 PNG 전체를 `object-fit: contain`으로 48×50 안에 넣음(그림 48×43.2) | 48×48 칸에 그림을 확대해 잘라 넣음(80×72로 그려 일부만 보임) | 페이지 그림이 작게 보임 |
| 선택 | 아이콘 칸 전체(60×62)에 테두리 1.5px #C72D65(DPR 1 화면에서는 1px로 그려짐), 분홍 바탕 없음. 글자 590 | 안쪽 48×48에만 테두리 1.5 #C72D65(모서리 6) + 분홍 20% 바탕 | 테두리 위치·바탕 |
| Hover | 탭 전체 `opacity: 0.8`(실제 포인터로 측정) | Icon item 바탕 #FCEDED | 다름 |
| 글자 | 16px/400(선택 590), 줄 높이 24px, 흰색, 글꼴 `-apple-system` 목록(macOS에서 SF Pro) | SF Pro 16 Regular/Semibold, 줄 높이 normal(19) | 줄 높이 24 vs 19 |
| 포커스 | 브라우저 기본 링(outline auto 1px) 버튼 둘레 | 없음 | — |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 아이콘 칸 바탕(기본·선택) | #FFFFFF / Shade 01 | shade-01 | `surface` | #FFFFFF | 일치(부품 표면) | — |
| 글자(모든 상태) | #FFFFFF / Shade 01 | shade-01 | `on-image` | #FFFFFF | 일치(사진 위 흰 글자, ListingCard·Navigation과 같은 역할) | — |
| 선택 테두리 | 페이지·Figma 코드 #C72D65(변수 없음) → 사용자 결정 2에 따라 Figma 변수 Accent 02 **#D03660** | accent-02 | `border-accent`(새 역할, 리드가 tokens.md revision 6에 넣음) | revision 6 적용 뒤 #D03660 | 일치(선택 강조 테두리) | 원래 값 #C72D65는 Figma 변수가 아니어서 Figma 스타일 값으로 맞춤(Q-04, chosen in chat). 페이지 화면의 테두리 색이 조금 바뀐다 |
| Hover 바탕(Figma #FCEDED) | #FCEDED | — | 쓰지 않음 | — | 해당 없음 | Q-05 A(페이지 불투명도 0.8)라 색이 필요 없다 |
| 선택 바탕(Figma rgba(241,164,164,0.2)) | — | — | 쓰지 않음 | — | 해당 없음 | Q-01 A(페이지 모양)라 분홍 바탕을 그리지 않는다 |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: 탭 자체는 투명하고, 아이콘 칸만 흰색이다. 글자가 흰색이라 Storybook 캔버스는 히어로 사진(`bg.png`) 또는 어두운 배경이 필요하다. 미리보기 배경은 stories에서만 정하고 부품 CSS로 옮기지 않는다.
- 같은 값의 후보가 여러 개일 때 선택 근거: 흰 글자는 `on-image`(사진 위), 흰 칸은 `surface`(부품 표면).
- 신규 token: `border-accent` → accent-02(#D03660) 하나. 리드가 `docs/plans/tokens.md` revision 6에 넣는다(이 계획은 tokens.md를 고치지 않는다). 사용처는 ServiceTab뿐이다(R08).
- 크기·글자 토큰(페이지 모양 기준, Q-01 A):

| 값 | CSS |
|---|---|
| 탭 폭 60 | `calc(var(--spacing) * 15)` |
| 아이콘 칸 60×62, 여백 6 | `calc(var(--spacing) * 15)` × `calc(var(--spacing) * 15.5)`, `calc(var(--spacing) * 1.5)` |
| 모서리 12 | `--radius-lg`(12px) |
| 세로 간격 12 | `calc(var(--spacing) * 3)` |
| 선택 테두리 1.5 | `calc(var(--border-width-thin) * 1.5)` |
| 글자 16 Regular / Semibold | `--text-type-body-copy-16pt-regular` + `--font-weight-type-body-copy-16pt-regular`(400) + `--font-type-body-copy-16pt-regular` / `--font-weight-type-body-copy-16pt-semibold`(590) |
| 글자 줄 높이 24 | `calc(var(--spacing) * 6)` |
| Hover 0.8 불투명도 | 토큰 없음. 색·간격·모서리·글꼴이 아니어서 금지 목록 밖. Q-05 A로 리터럴 `opacity: 0.8` 허용 |

- 글꼴: 페이지는 `-apple-system` 목록, 토큰은 `"SF Pro", system-ui, …`이다. macOS에서는 둘 다 SF Pro로 그려진다. 다른 OS의 차이는 범위 밖(검사 화면은 macOS 1440).
- 토큰 생성 경로·검증 계획: 리드의 tokens.md revision 6 적용 → `pnpm ds:tokens` → `pnpm ds:guard`(G13)로 모든 `var(--…)` 정의를 확인한다.

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| Service Icon Type=All 418:3125 | MCP asset `f0fb639d…`(내려받아 확인) = `my-assets/images/icon-all.png`(SHA-1 f0fb639d, PNG 240×216). `service-icon.png`도 같은 파일 | 240×216 RGBA | 모든 Status | — | 확인 |
| Type=Homes 418:3123 | `icon-homes.png` SHA-1 336951fb = IconButton.md에 적힌 MCP asset 이름 `336951fb…` | 240×216 | 모든 Status | — | 파일 일치 확인, Figma 노드와의 대응은 IconButton.md(2026-11-25 조회) 근거 |
| Type=Hotels 418:3124 | `icon-hotels.png` SHA-1 0da55eb8 | 240×216 | 모든 Status | — | 위와 같음 |
| Type=Experiences 418:3126 | `icon-experiences.png` SHA-1 d56c9b11 | 240×216 | 모든 Status | — | 위와 같음 |
| Type=Services 418:3127 | `icon-services.png` SHA-1 8add91f8 | 240×216 | 모든 Status | — | 위와 같음 |

- MCP asset 이름은 파일 SHA-1이다(All에서 직접 확인). 페이지 그림 5개가 Figma 원본과 같은 파일이므로 새 그림을 만들지 않는다.
- 그림은 장식이다(글자가 이름을 준다) → `alt=""`.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `label` | 글자 418:3136 | 필수 문자열. 예 "All", "Experience"(PRD 문구) | 버튼의 이름 | — | 확정(Q-02 A) |
| `iconSrc` | Service Icon 418:3128 | 필수 문자열(그림 주소) | `<img alt="">`로 그림. stories·Hero가 `imageUrl("icon-all")` 등을 넘김 | — | Q-03 A 채택 |
| `selected` | Status=Selected | `false` / `true` | 선택 모양, `aria-pressed={selected}` | — | Q-02 A 채택 |
| `onClick` | PRD 탭 클릭 | — | 클릭 시 콜백. 선택을 옮기는 일은 부모 | Tab, Enter/Space | Q-02 A 채택 |
| 네이티브 button 속성 | 접근성 기본 계약 | `type="button"` 고정, `disabled` 전달 | — | disabled면 Tab 제외 | 확정(Q-02 A) |
| 최상위 요소 | 규칙 | `<button>` | `data-testid="ds-service-tab"`, 클래스 `ds-service-tab`, 선택 시 `ds-service-tab--selected` | — | 확정 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 모양 기준. 페이지와 Figma가 §5 표처럼 다르다(아이콘 칸 60 vs 62, 그림 크기, 선택 테두리 위치·분홍 바탕, 탭 높이 98 vs 93) | A. 현재 페이지 모양 하나만 만든다(추천: 사용자 결정 "페이지 모양 유지", 쓰지 않는 variant를 미리 만들지 않음 R08). B. Figma 모양만(페이지 히어로가 바뀜). C. 둘 다 만들고 옵션으로 고름(쓰지 않는 모양이 생김) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | 역할과 선택 표현 | A. `<button type="button" aria-pressed>` + `selected`·`onClick`, 한 개만 고르는 일은 Hero(추천: 현재 페이지와 같고 탭마다 Tab 정지). B. 라디오 묶음(화살표 키 이동, 탭이 1개 정지). C. `role="tab"`(보여 줄 패널이 없어 맞지 않음) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | Service Icon 그림 공급(Nested parts 행) | A. `iconSrc` prop. stories·Hero가 `my-assets/images/icon-*.png`를 `imageUrl()`로 넘김(추천: ListingCard 선례, 부품이 사용자 파일 이름에 묶이지 않음). B. `icon="all" \| …` 값을 받아 부품 안에서 `imageUrl()`로 찾음. C. Figma PNG 5개를 부품 폴더에 복사(Navigation 로고 방식) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | 선택 테두리 색 #C72D65(새 매핑) | A. 단색 #C72D65를 새 primitive + 역할 `border-accent`로 리드가 tokens.md revision 6에 넣음(추천: 페이지 모양과 같음). B. Figma에서 테두리가 `Gradient 03`인지 다시 읽은 뒤 정함(Figma 호출 1회) | 사용자 결정 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26): #C72D65 → Figma 변수 Accent 02 #D03660, 새 역할 `border-accent`(accent-02). A·B 대신 이 결정을 적용 | resolved |
| Q-05 | Hover 모양 | A. 페이지 모양: 탭 전체 불투명도 0.8, 리터럴 `0.8` 허용(추천: 사용자 결정 "페이지 모양 유지", 새 색 불필요). B. Figma Hover: 아이콘 칸 바탕 #FCEDED(새 색 매핑 필요) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-06 | 포커스 표시 | A. 브라우저 기본 포커스 링(추천: 현재 페이지와 같고 Navigation·ListingCard 선례). B. 디자인 결정을 받을 때까지 보류 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | Q-01 답의 모양. 흰 글자가 보이는 배경(히어로 사진)에서 렌더 | Storybook iframe 스크린샷·computed style | |
| 모든 상태·크기 | 기본·선택·hover(실제 포인터)의 크기·색·테두리가 §5 표의 기준 열과 같음 | DOM 측정, Playwright 실제 포인터 hover | |
| 아이콘과 노출 조건 | 5개 그림이 §7 파일과 같고 깨지지 않음 | `naturalWidth > 0`, 파일 해시 | |
| 클릭·선택 기능 | 클릭하면 `onClick` 1회, `aria-pressed`가 `selected`를 따름 | play `fn()` + `userEvent.click` | |
| disabled / Tab / Focus | Tab으로 포커스되고 링이 보임. `disabled`면 Tab 제외 | play `userEvent.tab`, Playwright `:focus-visible` | |
| Nested parts identity | 키트 부품 import 없음(행이 모두 none일 때). 복제 마크업 없음 | 코드 검토, `ai:check` | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 기존 부품 영향 없음 | `pnpm ai:check ServiceTab`, `pnpm ai:verify ServiceTab`, `pnpm typecheck`, `pnpm ds:guard` | |

명령 검사와 시각 원본 대조를 따로 기록한다. 아직 수행한 검사는 없다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: 2026-11-26 "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)". Q: 열린 질문 → A: 추천안 모두 채택 (chosen in chat, 2026-11-26). Q: Figma 변수가 아닌 값 → A: Figma 스타일 값으로 맞춤 (chosen in chat) — 선택 테두리 #D03660. Q: 글자 크기·자간 → A: 지금 크기·자간 유지 (chosen in chat) — 16px·줄 높이 24 그대로. Q: 공용 버튼 → A: Button 에 공용 모양 추가 (chosen in chat) — ServiceTab은 Button ghost/text 모양을 쓰지 않는다(탭은 그 모양이 아님).
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 없음. tokens.md revision 6(`border-accent`)은 적용됐다.
