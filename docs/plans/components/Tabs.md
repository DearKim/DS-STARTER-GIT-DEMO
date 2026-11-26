---
kind: component
component: Tabs
revision: 2
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=229-2214&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Tabs (Underline Tabs · Pill Tabs)

> 작성: Claude Code, 2026-11-26. 전체 목록 `docs/plans/design-system-airbnb.md` 1단계의 `Tabs`(기존 키트 부품을 Figma 에 맞게 고침). 사용자 승인 전 구현 파일을 고치지 않는다. `approved` 는 사용자만 정한다.
> 2026-11-26 갱신: 사용자가 채팅에서 "추천안 모두 채택", "합친 목록 + 다시 가져오기", 그림자 "Figma 이름으로 추가"를 골라 Q-01~Q-11 답·색 역할 이름·그림자를 반영했다. 리드가 Dome 원본과 획 정렬 처리 방법을 확인해 주었다(4·5절). Q-08 추천안이 "탭 사이 간격 숫자는 사용자가 정함"이라 그 숫자를 Q-12 로 물었고 사용자가 "32px (권장)" 을 골랐다. 사용자가 "Approve revision 1·5 (권장)" 으로 승인했다.
> **2026-11-26 revision 2 (에이전트 A, 승인 대기):** 사용자 결정 "구역도 부품으로 (권장)"·"페이지 모양 유지 (권장)"(chosen in chat)에 따라 새 부품 `Inspiration`(`docs/plans/components/Inspiration.md`)이 Tabs 를 쓰도록, Home "Inspiration" 탭 줄 모양(3px 막대 + 1px 목록 선)을 그리는 **옵션 하나만 더한다**. revision 1 에서 승인한 line·pill 의 내용·값·질문 답은 그대로이며 바꾸지 않는다. 바뀐 곳은 각 절의 "revision 2" 표시 부분뿐이다(1·3·4·5·6·7·8·9·10·11절).
> 2026-11-26 갱신(리드 전달 `rebuild-update.md`): 사용자가 "추천안 모두 채택 (권장)", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지 (권장)"을 골랐다(chosen in chat). Q-13~Q-16 답을 반영했다 — `variant="bar"`, hover 없음 + `focus-ring` 2px, 막대는 현재 사이트 위치, 안 고른 라벨 #6C6C6C → **#717171 `text-secondary`**(결정 2, 새 역할 없음).

## 1. 요청과 적용 규칙

- 요청한 작업: 기존 키트 부품 `src/components/Tabs` 를 Figma 두 세트에 맞게 고치는 계획.
  - Underline Tabs **229:2214**(변형 16개: State Default/Hover/Pressed/Focus × Line On/Off × Icon On/Off) — `source_url` 의 노드
  - Pill Tabs **237:2219**(변형 3개: State Default/Hover/Focus) — https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=237-2219&m=dev
- 우리 사이트에서 비슷한 모양: Home "Inspiration for future getaways" 밑줄 탭(Popular, Arts & culture, …), Home 위쪽 아이콘 서비스 탭(All·Homes·Hotels·Experience·Services — 3절의 주의 참고). 사이트 페이지는 자유 모드 HTML 이며 이 계획에서 고치지 않는다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, 2026-11-26 Figma Desktop MCP 직접 조회, 캐시 아님. `get_design_context(229:2214)`·`get_design_context(237:2219)`(각각 모든 변형 코드 + 스크린샷), `get_variable_defs` 두 세트 각 1회, `get_metadata(229:2214)`(변형별 크기). SVG asset 8개를 Figma 로컬 서버에서 내려받아 경로·색을 읽음(프로젝트에 복사하지 않음). 리드의 문서 전체 메타데이터(`get_metadata 0:0`, 2026-11-26)로 Dome 원본 확인. 보조 근거: `my-website/figma/Home.layers.xml`·`Home.png`(2026-11-25 저장).
- 대상 코드·토큰 기준 버전: git-demo 작업 폴더 현재 상태(HEAD f3aed50), `src/tokens/tokens.css`(리드가 2026-11-26 Colors·Typography·Elevation 을 다시 가져온 뒤의 상태: `--color-neutral-01` #F7F7F7, `--shadow-elevation-01/02/03` 추가). 새 색 역할과 새 그림자는 리드가 `docs/plans/tokens.md` revision 5 에 모은다.
- **revision 2 요청(2026-11-26):** Home "Inspiration for future getaways" 의 탭 줄을 Tabs 로 그릴 수 있게 새 옵션을 더한다(사용자 결정 "페이지 모양 유지" — 페이지 모양을 Figma 세트 쪽으로 바꾸지 않고 부품에 옵션을 더함).
  - 근거 노드: Home 프레임 389:2752 의 일반 frame "Tab List" 389:7214(1416×40) + 막대 389:7240(65×3) + 목록 선 389:7241(1416×1) + "Tab Panel" 389:7243(목록 y 32). 사본 Detail 812:433·Checkout 10613:12104 안 같은 구조(id 를 뺀 레이어 비교 차이 0). 인스턴스 아님.
  - 값의 근거: `my-website/figma/Home.layers.xml`(2026-11-25 저장본) + **현재 사이트**(git-demo `aa9a593`, `HomePage.css` 401–446·702–731, 세 페이지 같은 값) 1440×900 Playwright 측정(2026-11-26, scratchpad `rebuild/A/measure.mjs` → `measure.json`).
  - Figma MCP: 에이전트 A 몫 2회(`get_design_context 424:10741`, `389:7203`)가 모두 실패(연결 끊김·300초 무응답) → revision 2 값에 Figma MCP 값 없음. 색·글꼴의 Figma 변수 연결은 미확인.
  - 기준 코드: 지금 `src/components/Tabs/Tabs.tsx`·`Tabs.css` 는 revision 1 대로 구현되어 있다(`variant: "line" | "pill"`).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | Underline Tabs 의 변형은 **탭 하나**(라벨 + 밑줄, 아이콘 선택). Pill Tabs 의 변형은 **두 칸짜리 묶음 전체**("Choose dates" / "I'm flexible", 회색 바탕 안에 흰 칸 하나) | 둘 다 "같은 자리의 내용을 바꾸는 탭 목록". Underline 은 `variant="line"`, Pill 은 `variant="pill"` | 확정(Q-01·Q-09 추천안 채택) |
| 누를 수 있는 영역 | Underline: 탭 하나 전체(아이콘 + 라벨 + 밑줄). Pill: 칸 하나(151 너비) | 탭마다 `<button role="tab">` (지금 키트와 같음) | 확정(Q-04) |
| 클릭/선택/열림 동작 | Underline 의 Line On/Off 는 밑줄 유무. Default·Line On 은 검은 글자 + 검은 밑줄, Default·Line Off 는 회색 글자 | Line On = 선택된 탭(`aria-selected="true"`). 누르면 그 탭이 선택되고 패널이 바뀜 | 확정(Q-01) |
| 키보드·포커스 범위 | Underline Focus: 아이콘+라벨(또는 라벨+밑줄)을 감싸는 모서리 8 링. Pill Focus: 선택된 칸에만 2px 테두리 | 지금 키트의 tablist/tab/tabpanel + roving tabindex + 화살표 = 선택 유지. 포커스 링은 탭 상자 크기를 바꾸지 않게 그림 | 확정(Q-03·Q-04) |
| disabled 동작 | 두 세트 모두 Disabled 변형 없음 | 기능만 유지(네이티브 `disabled`, 화살표 이동에서 건너뜀), 새 모양 없음(지금의 회색 처리도 없앰) | 확정(Q-06) |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트 / 공개 import / 사용처: `src/components/Tabs`(`import { Tabs } from "@/components/Tabs"`). R05 에 따라 새 부품을 만들지 않고 이 원본을 고친다. Pill 은 모양이 `ContentSwitcher`(분할 컨트롤, `role="radiogroup"`)와 닮았지만 Q-09 에서 Tabs `variant="pill"` 로 정했다.
- 기존 props·stories 에서 확인한 지원 범위: `variant: "line" | "contained"`, `size: "sm" | "md"`, `orientation: "horizontal" | "vertical"`, `items: { id, label, content, disabled? }[]`, `defaultTab`, `onTabChange(id)`, `label`(tablist 이름, 기본 i18n "탭"/"Tabs"), `children`. 동작: roving tabindex, 화살표 이동 = 바로 선택(automatic activation), Home/End. 선택 표시는 primary 분홍 글자 + 2px 밑줄. stories: `Line`·`Contained`·`Matrix`(Variant × Size) — `Tabs.stories.tsx` 는 `@ds-generated` 생성물.
- 기존 원본 수정이 필요한 이유: 지금 모양(분홍 선택색, contained, sm/md, 세로 방향)은 Figma 근거가 없다. Figma 는 가로 탭 한 크기, 밑줄형·알약형 두 가지다.
- 바뀌는 공개 API(Q-05 추천안 채택):

| 지금 | 바뀜 | 이유 |
|---|---|---|
| `variant="line"` | 유지 = Underline Tabs | 이름 그대로 써서 사용처 변경 없음 |
| `variant="contained"` | **삭제**, `variant="pill"` 추가 | Figma 에 contained 없음, Pill Tabs 있음 |
| `size: "sm" \| "md"` | **삭제** | Figma 에 크기 축 없음(14pt 한 가지) |
| `orientation: "horizontal" \| "vertical"` | **삭제**(가로만) | Figma 에 세로 탭 없음 |
| `items[].icon` | **새로**: `ReactNode`(선택) | Underline Icon On(Q-07) |
| `items[].disabled` | 유지(기능만, 모양 없음) | Q-06 |
| `items[].id/label/content`, `defaultTab`, `onTabChange`, `label`, `children` | 유지 | — |
| CSS `ds-tabs--contained`·`--sm`·`--md`·`--horizontal`·`--vertical` | 삭제, `ds-tabs--pill` 추가 | 위와 같음 |

- 사용처 조사(`grep`, 2026-11-26):
  - `src/`: `Tabs` 를 import 하는 부품·페이지 없음. 이름이 나오는 곳은 생성 문서 `src/docs/Overview.stories.tsx`·`src/docs/CATALOG.md`(파이프라인이 다시 만듦), `src/lib/i18n.tsx` 의 기본 라벨(유지), `ContentSwitcher.tsx` 주석뿐.
  - `my-website/`: `Tabs` 사용 없음. `HomePage.tsx` 는 자기 버튼(`page-Home__service-tab`, `page-Home__inspiration-tab`, `aria-pressed`)으로 그린다 — 바뀌지 않음.
  - 그 밖: `scripts/verify-interactions.mjs` 의 Tabs 검사(2번째 탭 클릭 → 선택, → 키 → 3번째 선택)는 Q-04 추천안(지금 키보드 방식 유지)이라 그대로 통과해야 한다. `components.baseline.json` 의 Tabs 명세와 `scripts/starter-catalog-baseline.json` 의 Tabs 해시는 키트 기준선이라 고친 뒤 기준선과 달라진다(Figma 로 고치는 다른 키트 부품과 같은 영향, 이 계획에서 기준선 파일은 고치지 않음).
- 변경할 파일(승인 후): `src/components/Tabs/Tabs.tsx`·`Tabs.css`·`Tabs.stories.tsx`(생성물 — 고치면 충돌로 보고되고 보존됨)·`index.ts`(타입 export). 새 색·그림자 토큰은 토큰 계획 rev 5 승인 뒤 `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens`.
- 승인된 변경에서 영향받는 기존 사용처: 페이지·부품 없음. 위 검사 스크립트·기준선·생성 문서만.
- **주의(사이트와 Figma 의 차이):**
  - Home 위쪽 아이콘 서비스 탭은 Figma 에서 `Service tab` 인스턴스(418:3155·418:8261·418:8265·418:8269·418:8273, 60×94, 48×48 컬러 그림 아이콘)다. Underline Tabs(24×24 선 아이콘, 40×65)가 아니며, 승인된 `IconButton` 계획의 Status=Default/Hover/Selected 아이콘 항목(418:3148 등, 60×93)과 같은 모양으로 보인다. 그래서 Underline 의 Icon On 은 지금 사이트에 쓰이는 곳이 없다.
  - Home "Inspiration" 탭은 Figma 에서 인스턴스가 아니라 일반 프레임(389:7214 `Tab List`)이다. 선택 표시가 3px(389:7240, 65×3), 목록 아래 1px 선(389:7241)이 있어 Underline Tabs 세트(2px 밑줄, 목록 선 없음)와 다르다. 나중에 페이지가 Tabs 를 쓰면 모양이 세트 쪽으로 바뀐다.

### revision 2 — 바뀌는 범위

| 지금(rev 1) | 바뀜(rev 2) | 이유 |
|---|---|---|
| `variant: "line" \| "pill"` | `variant: "line" \| "pill" \| "bar"`(이름은 Q-13) | Inspiration 탭 줄 모양(5절 revision 2 표)을 그리는 옵션 |
| CSS `ds-tabs--line`·`ds-tabs--pill` | `ds-tabs--bar` 추가 | 위와 같음 |
| `items[].icon` | `bar` 에서는 그리지 않음(pill 과 같음) | 389:7214 에 아이콘 없음 |
| line·pill 의 모양·키보드·API | 그대로 | rev 1 승인 내용 유지 |

- 변경할 파일(rev 2 승인 후): `Tabs.tsx`(variant 타입·주석), `Tabs.css`(`ds-tabs--bar` 규칙), `Tabs.stories.tsx`(생성물 — `Bar` 견본 추가, 충돌로 보고되고 보존됨). `Tabs.figma.tsx` 는 그대로(bar 는 Figma 세트가 아닌 페이지 frame 이라 Code Connect 대상 아님).
- 영향받는 사용처: 지금 Tabs 를 쓰는 부품·페이지 없음(rev 1 조사와 같음, 2026-11-26 다시 grep). 새로 쓸 곳은 `Inspiration` 계획뿐. line·pill 은 바뀌지 않으므로 `scripts/verify-interactions.mjs` 의 Tabs 검사도 그대로다.
- 키보드: `bar` 도 rev 1 Q-04 방식(roving tabindex, ←→ = 선택, Home/End)을 그대로 쓴다. 지금 페이지는 탭마다 Tab 멈춤(8번)·`aria-pressed` 라 페이지 쪽 키보드는 바뀐다(Inspiration Q-03 에서 확인).

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| Dome | Dome — Internal Only Canvas 의 단독 컴포넌트 235:1803(24×24, 세트 아님). 225:1692 안의 인스턴스는 235:1853 | — | 150:2355, 225:1728, 229:1866, 225:1762, 225:1692, 225:1727, 229:1867, 227:1790 (Icon On 8개) | none — 키트에 이름이 같은 부품 없음. 부품은 `items[].icon` 칸만 제공하고, Dome 은 Figma SVG path 를 `<svg>` JSX(`fill="currentColor"`)로 옮겨 **stories 견본으로만** 쓴다(Q-07) | confirmed |
| — (탭 라벨 글자) | — | — | 19개 변형 전부 | none — 이 부품 안에서 글자로 만든다(Text 의 variant body/body-sm/title·tone default/secondary 에 SF Pro 14pt Semibold 590 과 상태별 #B0B0B0 이 없음) | confirmed |

- 확정 근거: 사용자가 "추천안 모두 채택" 선택(chosen in chat, 2026-11-26). Dome 원본은 리드의 문서 전체 메타데이터(`get_metadata 0:0`)에서 `<symbol id="235:1803" name="Dome" width="24" height="24">` 로 확인.
- 같은 세트로 본 안쪽 레이어(행 없음): 229:2083(Focus·Line On·Icon Off) 안의 229:2026 레이어 이름이 "State=Focus, Line=On, Icon=Off" 로 같은 세트의 변형 이름이다. 템플릿 규칙대로 만드는 부품 자신의 안쪽 레이어로 보고 행을 만들지 않는다.
- Pill Tabs(237:2219): 응답의 모든 레이어가 `div` + 글자뿐이고 인스턴스 표시가 없다 → 하위 부품 없음.
- 밑줄(`Line 4`)은 벡터 레이어(인스턴스 아님).
- revision 2 `bar`(389:7214·389:7240·389:7241·389:7243): `Home.layers.xml` 에서 모두 frame·text 이고 `<instance` 0개 → 하위 부품 없음. 막대·목록 선은 CSS 로 그린다.

## 5. Figma 상태·크기 전체 목록

19개 변형 모두 `get_design_context` 로 읽었다. 크기는 Underline 은 `get_metadata(229:2214)`, Pill 은 코드 값으로 계산했다. "API/CSS" 열은 Q-01(Line On = 선택)·Q-02·Q-03 답 기준이다.

### Underline Tabs 229:2214 — Icon On (라벨 "Dome", SF Pro 14 **Semibold 590**)

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 150:2355 Default·Line On | context + 스크린샷 + metadata | 선택됨 | 탭 | 40×65. 아이콘 24 #222 → 8 → 라벨 #222 → 16 → 밑줄 2px #222, 폭 = 라벨 폭(40) | Dome #222 위 | `[aria-selected=true]` | 확정(Q-01) |
| 225:1728 Hover·Line On | 〃 | 선택 + 포인터 | 밑줄 | 밑줄 #222 → **#D3D3D3**(폭 = 라벨). 글자·아이콘 #222 | Dome #222 | `[aria-selected=true]:hover` | 확정(Q-01·Q-02) |
| 229:1866 Pressed·Line On | 〃 | 선택 + 누름 | 밑줄 | 밑줄 #D3D3D3(Figma 40 고정 → 라벨 폭, Q-02) | Dome #222 | `[aria-selected=true]:active` | 확정(Q-01·Q-02) |
| 225:1762 Focus·Line On | 〃 | 선택 + 키보드 포커스 | 아이콘+라벨 | 60×75. 링 상자(225:1752) 2px #222, 모서리 8, 아이콘+라벨과 10 띄움. 링 아래 6 띄우고 밑줄 2px #222(Figma 40 고정 → 라벨 폭) | Dome #222 | `[aria-selected=true]:focus-visible`, 링은 탭 밖에 그림(Q-03) | 확정(Q-03) |
| 225:1692 Default·Line Off | 〃 | 선택 안 됨 | 탭 | 40×49(밑줄 자리 없음 → Q-08 로 자리 확보). 아이콘·라벨 **#717171** | Dome #717171(같은 path, 색만 다름) | `[aria-selected=false]` | 확정(Q-01·Q-08) |
| 225:1727 Hover·Line Off | 〃 | 포인터 | 아이콘·라벨 | 아이콘·라벨 #717171 → #222. 밑줄 없음 | Dome #222 | `[aria-selected=false]:hover` | 확정(Q-01) |
| 229:1867 Pressed·Line Off | 〃 | 누름 | 아이콘·라벨 | Hover·Line Off 와 같은 값 | Dome #222 | `[aria-selected=false]:active` | 확정(Q-01) |
| 227:1790 Focus·Line Off | 〃 | 키보드 포커스 | 아이콘+라벨 | 60×69. 링 상자(225:1778) 2px #222, 모서리 8, 10 띄움. 아이콘·라벨 #222 | Dome #222 | `[aria-selected=false]:focus-visible`(지금 키보드 방식에서는 거의 보이지 않음, Q-04) | 확정(Q-03·Q-04) |

### Underline Tabs 229:2214 — Icon Off (라벨 "Stays", SF Pro 14 **Regular 400**)

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 229:2085 Default·Line On | context + 스크린샷 + metadata | 선택됨 | 탭 | 37×33. 라벨 #222 → 16 → 밑줄 2px #222 폭 = 라벨(37) | 없음 | `[aria-selected=true]` | 확정(Q-01) |
| 229:2087 Hover·Line On | 〃 | 선택 + 포인터 | 라벨·밑줄 | 라벨 **#B0B0B0**, 밑줄 #B0B0B0(Figma 39 고정 → 라벨 폭) | 없음 | `[aria-selected=true]:hover` | 확정(Q-01·Q-02) |
| 229:2082 Pressed·Line On | 〃 | 선택 + 누름 | 라벨·밑줄 | Hover·Line On 과 같은 값 | 없음 | `[aria-selected=true]:active` | 확정(Q-01·Q-02) |
| 229:2083 Focus·Line On | 〃 | 선택 + 키보드 포커스 | 라벨+밑줄 | 72×51. 안쪽 상자(229:2028) 2px **#D3D3D3** + 그 바깥 2px #222, 모서리 8. 라벨+밑줄과 위·좌우 16, 아래 2 띄움. 라벨 #222, 밑줄 #222(Figma 40 고정 → 라벨 폭) | 없음 | `[aria-selected=true]:focus-visible`, 두 겹 링을 탭 밖에 그림(Q-03) | 확정(Q-03) |
| 229:2086 Default·Line Off | 〃 | 선택 안 됨 | 라벨 | 37×17(밑줄 자리 없음 → Q-08 로 자리 확보). 라벨 **#717171** | 없음 | `[aria-selected=false]` | 확정(Q-01·Q-08) |
| 229:2084 Hover·Line Off | 〃 | 포인터 | 라벨 | 라벨 #717171 → **#B0B0B0**(더 옅어짐, Figma 그대로 — Q-02) | 없음 | `[aria-selected=false]:hover` | 확정(Q-02) |
| 229:2081 Pressed·Line Off | 〃 | 누름 | 라벨 | Hover·Line Off 와 같은 값 | 없음 | `[aria-selected=false]:active` | 확정(Q-02) |
| 229:2080 Focus·Line Off | 〃 | 키보드 포커스 | 라벨 | 69×49. 안쪽 상자(229:2069) 2px #D3D3D3 + 바깥 2px #222, 모서리 8, 16 띄움. 라벨 #222 | 없음 | `[aria-selected=false]:focus-visible` | 확정(Q-03·Q-04) |

### Pill Tabs 237:2219 (라벨 SF Pro 14 **Semibold 590** #222)

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 237:2217 Default | context + 스크린샷 | 기본(두 번째 칸 선택) | 묶음 | 바깥(목록) 바탕 #EBEBEB, 안쪽 여백 4, 모서리 50. 칸: 151 너비, 여백 좌우 12·위아래 8, 모서리 500. 선택 칸(237:2209) 바탕 #FFFFFF + 그림자 `drop-shadow(0px 6px 8.5px rgba(0,0,0,0.08))`, 다른 칸(237:2207) 바탕 없음. 계산 크기 310×41 | 없음 | `variant="pill"`, 선택 칸 `[aria-selected=true]` | 확정(Q-09·Q-10) |
| 237:2216 Hover | 〃 | 선택 안 된 칸에 포인터 | 칸 | 선택 안 된 칸(237:2212) 바탕 #FFFFFF(그림자 없음). 선택 칸 그대로 | 없음 | `[aria-selected=false]:hover` | 확정(Q-09) |
| 237:2218 Focus | 〃 | 선택 칸에 키보드 포커스 | 칸 | 선택 칸(237:2194) 바탕 **#F7F7F7** + 테두리 2px #222, 그림자 유지. 칸 크기 그대로 | 없음 | `[aria-selected=true]:focus-visible`, 테두리는 칸 안쪽(Q-03) | 확정(Q-03·Q-11) |

- Focus 링이 감싸는 정확한 범위와 근거(Q-03 추천안 채택 — 탭 크기 유지, 링은 바깥에 그림; 획 위치는 리드 지시대로 이미 받은 MCP 코드로 정함):
  - Underline·Icon On: 링은 **아이콘+라벨만** 감싼다. MCP 코드 `border-2 p-[10px]` → 내용에서 10 띄우고 2px #222 링(모서리 8). 밑줄은 링 밖 아래, Default 와 같은 위치(라벨 아래 16 의 마지막 2px).
  - Underline·Icon Off: 링은 **라벨+밑줄**을 감싼다. MCP 코드 = 바깥 래퍼 `border-2 #222` 안에 안쪽 상자 `border-2 #D3D3D3` + 여백(위·좌우 16, 아래 2) → 내용에서 16(아래 2) 띄우고 2px #D3D3D3, 그 바로 바깥 2px #222(스크린샷의 두 겹과 같음).
  - Pill: 선택 칸 **안쪽** 2px #222 테두리(MCP 코드 `w-[151px] border-2` 고정 폭). 칸 크기는 그대로.
  - Figma 메타데이터의 Focus 변형 크기(60×69, 72×51)와 위 코드 해석은 획 두께만큼(2px 이내) 다를 수 있다. 이 차이는 미확정 사실이 아니라 10절 렌더 대조 항목으로 기록한다.
- Figma에 실제로 없는 상태·조합: Disabled(두 세트), Pill 의 Pressed, Pill 의 선택 안 된 칸 Focus, Pill 선택 칸 Hover, 세로 방향, 크기 변형. 만들지 않는다. 탭 목록 전체(간격·목록 선)는 Underline 세트에 없다 → Q-08·Q-12.
- 미조회/실패/잘린 응답과 필요한 추가 조회: 없음. Dome 원본은 리드 메타데이터로 확인했고, 획 위치는 위 코드 해석 + 렌더 대조, Pill 그림자는 정확한 값을 기록했고 Elevation 01/02/03 어느 것과도 같지 않음을 확인했다(6절).

### 크기·간격 (Figma 값 → CSS)

| 요소 | Figma 값 | CSS |
|---|---|---|
| 아이콘 | 24×24 | `calc(var(--spacing) * 6)` |
| 아이콘 → 라벨 | 8 | `calc(var(--spacing) * 2)` |
| 라벨 → 밑줄 아래끝 | 16(2px 선이 이 16 의 마지막 2px 에 그려짐) — Line Off 에서도 자리 확보(Q-08) | `calc(var(--spacing) * 4)` |
| 밑줄 두께 | 2 | `--border-width-thick`(2px) |
| 밑줄 폭 | 라벨 폭(Q-02) | `width: 100%`(라벨 칸 기준) |
| Focus 모서리 | 8 | `--radius-md` |
| Focus 링 두께 | 2 | `--border-width-thick` |
| Focus 띄움 | Icon On 10 / Icon Off 위·좌우 16·아래 2 | `calc(var(--spacing) * 2.5)` / `* 4` / `* 0.5` |
| Pill 바깥 여백 | 4 | `calc(var(--spacing) * 1)` |
| Pill 칸 여백 | 좌우 12, 위아래 8 | `calc(var(--spacing) * 3)`, `* 2` |
| Pill 칸 너비 | 151 고정, 모든 칸 같은 너비(Q-10) | `calc(var(--spacing) * 37.75)` |
| Pill 모서리 | 50 / 500 | `--radius-full` |
| Underline 탭 사이 간격 | 세트에 없음 → Q-12 답 32 | `gap: calc(var(--spacing) * 8)` |

### revision 2 — `bar` (Home "Inspiration" 탭 줄 389:7214, 현재 사이트 값)

Figma 에는 Popular 가 선택된 한 장면만 있다(사이트 캡처 frame, 상태 변형 없음). 상태는 현재 사이트 동작에서 읽었다.

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 389:7215 등 선택 안 됨 | layers.xml + 측정 | 선택 안 됨 | 탭 | 탭 상자 높이 40(여백 위아래 11·좌우 16), 라벨 14 / **500** / 줄 높이 18 / 자간 −0.15, 현재 사이트 #6C6C6C → 구현 **#717171**(결정 2, Q-16), 바탕·테두리 없음, 한 줄 | 없음 | `.ds-tabs--bar [aria-selected=false]` | 확정(Q-13·Q-16) |
| 389:7215(Popular) + 막대 389:7240 선택됨 | layers.xml + 측정(3번째 탭 클릭 → 막대가 그 탭으로 이동) | 선택 | 탭 + 막대 | 라벨 **#222222**. 막대 3px #222222, 모서리 위 3·3 아래 0, 가로 = 라벨 시작 ~ 라벨 끝 + 16(탭 상자 오른쪽 끝; Popular 65.5, Figma 65 = 라벨 48 + 17), 세로 = 탭 아래 끝에서 3 위(탭 기준 y 34~37). **Figma 막대는 y 37~40 으로 목록 선에 붙어 있다** — 현재 사이트 위치로 구현(Q-15) | 없음 | `[aria-selected=true]` | 확정(Q-13·Q-15) |
| Hover | 현재 사이트: 변화 없음(손가락 커서만, 측정 색 그대로). Figma: 없음 | 포인터 | — | 없음 | — | — | 확정(Q-14) |
| Pressed | 둘 다 없음 | 누름 | — | 없음 | — | — | 확정(Q-14) |
| Focus | 현재 사이트: 브라우저 기본 링 `auto 1px rgb(0, 95, 204)` 이 탭 상자(예: 81.5×40)를 모서리 8(버튼 `border-radius: 8px`)로 감쌈. Figma: 없음 | 키보드 | 탭 상자 | 같은 자리(탭 상자 둘레, 모서리 8 = `--radius-md`)에 키트 `focus-ring` 2px 링, 탭 크기 변화 없음 | — | `:focus-visible` | 확정(Q-14) |

- 목록 전체: 탭 사이 간격 0(라벨 사이 32 = 좌우 여백 16 + 16, rev 1 Q-12 의 32 와 같은 값), **첫 탭만 왼쪽 −16**(첫 라벨이 Tabs 왼쪽 끝에 맞고, 탭 상자는 16 바깥으로 나감 — Figma 389:7215 x −16 과 같음), 목록 높이 40, **목록 아래 1px #DDDDDD 선**(Tabs 전체 폭, 389:7241), 막대는 그 선 위 3(현재 사이트).
- 패널: Figma "Tab Panel" 389:7243 은 목록 선 바로 아래에서 시작하고 안의 List 가 y **32** → `bar` 패널은 위 32·아래 0(현재 사이트도 선 아래 32 에 목록). rev 1 의 패널 여백(16·16)과 글자 값은 line·pill 에서 그대로.
- Figma 에 실제로 없는 상태: hover · pressed · focus · disabled 모양(사이트 캡처). 만들지 않거나 Q-14 답대로만 그린다. disabled 는 rev 1 Q-06 대로 기능만.

| 요소 | 현재 사이트(측정) / Figma | CSS |
|---|---|---|
| 탭 여백 | 위아래 11, 좌우 16 / "Tab" frame 높이 18 이 "Tab:margin" 40 안 y 11 | `padding: calc(var(--spacing) * 2.75) calc(var(--spacing) * 4)` |
| 첫 탭 왼쪽 | −16 | `margin-inline-start: calc(var(--spacing) * -4)` |
| 라벨 줄 높이 / 자간 | 18 / −0.15 | `calc(var(--spacing) * 4.5)` / `calc(var(--spacing) * -0.0375)` — Q-16 |
| 막대 | 높이 3, 모서리 3·3·0·0, 아래 3 위 | `calc(var(--spacing) * 0.75)` 세 곳(높이·모서리·아래 위치), 왼쪽 = 탭 왼쪽 여백 `calc(var(--spacing) * 4)`, 오른쪽 0 |
| 목록 선 | 1px | `--border-width-thin` |
| 패널 위 | 32 | `calc(var(--spacing) * 8)` |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| Underline 라벨·아이콘 · 선택됨, Icon On Hover/Pressed, Focus | #222222 α1 / Shade 02 | shade-02 | `text` | #222222 | 일치 | 아이콘은 `currentColor` 로 라벨 색을 따름(ListingCard 별과 같은 처리) |
| Underline 라벨·아이콘 · Default·Line Off | #717171 α1 / Neutral 07 | neutral-07 | `text-secondary` | #717171 | 일치 | — |
| Underline 라벨 · Icon Off Hover/Pressed | #B0B0B0 α1 / Neutral 06 | neutral-06 | `text-muted`(새 역할) | rev 5 적용 뒤 #B0B0B0 | 일치 | 합친 목록의 새 역할. `text-disabled` 는 값만 같고 비활성 역할 |
| 밑줄 · 선택됨(Default·Line On, Focus·Line On) | #222222(SVG stroke; 세트 변수 Shade 02) | shade-02 | `selected`(새 역할) | rev 5 적용 뒤 #222222 | 일치 | 합친 목록의 새 역할(선택 표시, Chip 과 공유). `text` 는 값만 같음 |
| 밑줄 · Icon On Hover/Pressed·Line On | #D3D3D3(SVG stroke) / Neutral 04 | neutral-04 | `indicator-hover`(새 역할) | rev 5 적용 뒤 #D3D3D3 | 일치 | 합친 목록의 새 역할. 기존 `indicator`(#DDDDDD, 사진 점)와 값·역할 다름 |
| 밑줄 · Icon Off Hover/Pressed·Line On | #B0B0B0(SVG stroke) / Neutral 06 | neutral-06 | `text-muted`(같은 상태 라벨 색, `currentColor`) | rev 5 적용 뒤 #B0B0B0 | 일치 | Icon Off 에서는 밑줄 색이 언제나 그 상태의 라벨 색과 같다(#222/#B0B0B0) → `currentColor` 로 칠함(Q-02) |
| Focus 링 · Underline(Icon On 한 겹, Icon Off 바깥) · Pill 테두리 | #222222 α1 / Shade 02 | shade-02 | `focus-ring`(새 역할) | rev 5 적용 뒤 #222222 | 일치 | 합친 목록의 새 역할(Chip 과 공유) |
| Focus 안쪽 링 · Underline Icon Off | #D3D3D3 α1 / Neutral 04 | neutral-04 | `focus-ring-inner`(새 역할) | rev 5 적용 뒤 #D3D3D3 | 일치 | 합친 목록의 새 역할. `indicator-hover` 와 값만 같고 역할 다름 |
| Pill 바깥 바탕 | #EBEBEB α1 / Neutral 02 | neutral-02 | `track`(새 역할) | rev 5 적용 뒤 #EBEBEB | 일치 | 합친 목록의 새 역할(분할 탭의 바탕 홈) |
| Pill 선택 칸·Hover 칸 바탕 | #FFFFFF α1 / Shade 01 | shade-01 | `surface` | #FFFFFF | 일치(부품 표면 — Q-11 확정) | `bg`·`on-primary`·`on-image`·`control-bg`·`info`·`success`·`warning` 도 #FFFFFF 지만 역할이 다르거나 자리표시라 쓰지 않음 |
| Pill Focus 칸 바탕 | #F7F7F7 α1 / 노드에 변수 연결 없음(값은 Figma "Neutral 01" 과 같음) | neutral-01(#F7F7F7, 리드가 2026-11-26 가져옴) | `surface-focus`(새 역할) | rev 5 적용 뒤 #F7F7F7 | 일치 | 합친 목록의 새 역할(Q-11). `surface-raised`(fills-vibrant-… #F7F7F7)는 값만 같고 "떠 있는 표면" 역할 |
| Pill 라벨 | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| Pill 선택 칸 그림자 | `drop-shadow(0px 6px 8.5px rgba(0,0,0,0.08))` — 237:2209·237:2214·237:2194, Elevation 스타일 연결 없음 | — | layout 새 그림자 토큰 제안 **`--shadow-pill-tabs`** = `0px 6px 8.5px rgba(0,0,0,0.08)`(#00000014) | 없음 — **보류** | 보류 | `--shadow-elevation-01`(0 4 18 #0000002B)·`-02`(0 1 5 −363 #00000030)·`-03`(0 6 16 #0000001F) 어느 것과도 같지 않음. 키트 입력 경로(`scripts/lib/figma-merge.mjs`)가 Figma 효과 스타일이 아닌 그림자를 버려 토큰을 만들 수 없다 → 사용자 결정 "근거와 함께 토큰 추가 (권장)" 에 따라 리드가 보류: 지금은 그림자를 그리지 않고 리터럴도 쓰지 않음. pending: Figma effect style needed, then re-import |

- `--color-primary`·`--color-primary-hover`·`--color-primary-active`(셋 다 #FF385C)는 지금 Tabs CSS 가 선택 표시에 쓰지만 Figma 에 분홍이 없으므로 쓰지 않는다. `--color-info`·`--color-success`·`--color-warning` 은 #FFFFFF 자리표시라 어디에도 쓰지 않는다.
- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: Underline 탭은 바탕이 없다(투명). Pill 은 바깥 #EBEBEB·선택 칸 #FFFFFF 가 자기 바탕이다. 스크린샷의 회색 바탕·보라 점선은 세트 프레임 장식이다. Home Inspiration 탭이 놓인 곳은 흰 페이지(`bg`) → Storybook 캔버스는 흰 배경. Pill 도 같은 흰 캔버스로 둔다.
- 같은 값의 후보가 여러 개일 때 선택 근거: 값이 같아도 역할(글자/선택 표시/hover 표시/포커스/바탕)이 다르면 고르지 않았다.
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: 새 색 역할 `text-muted`, `selected`, `indicator-hover`, `focus-ring`, `focus-ring-inner`, `track`, `surface-focus`(합친 목록 이름 그대로) — 토큰 계획 revision 5 로 승인·적용되어 `tokens.css` 에 있다. 새 그림자 `--shadow-pill-tabs` 는 보류(위 표, Figma 효과 스타일이 생기면 다시 가져옴).
- 글자 토큰(현재 `tokens.css` 에 있음): "Body Copy/14pt Semibold"(Icon On 라벨, Pill) → `--font-type-body-copy-14pt-semibold`, `--text-type-body-copy-14pt-semibold`(14px), `--font-weight-type-body-copy-14pt-semibold`(590), `--tracking-type-body-copy-14pt-semibold`(0px). "Body Copy/14pt Regular"(Icon Off 라벨) → `--…-14pt-regular`(400). 줄 높이는 Figma 코드가 `leading-[normal]`(메타데이터 라벨 높이 17) → `line-height: normal`.
- 토큰 생성 경로·검증 계획: 토큰 계획 rev 5 승인 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens` → `pnpm ds:guard`(G10·G13).

### revision 2 — `bar` 의 색·글자

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 라벨 · 선택 안 됨 | 현재 사이트 #6C6C6C α1(측정 rgb(108,108,108)), Figma 변수 아님(같은 사이트 캡처의 Detail 노드에서 원시값 `#6c6c6c` — `ListingOverview.md` 6절) | neutral-07 | **`text-secondary`** — 사용자 결정 "Figma 스타일 값으로 맞춤" 리드 매핑 표: #6C6C6C → #717171(Neutral 07). line 의 안 고른 라벨과 같은 역할 | #717171 | 결정 2 로 값을 바꿈(일치) | 제안했던 `text-supporting` 은 없앰(Q-16) |
| 라벨 · 선택됨 | #222222 | shade-02 | `text` | #222222 | 일치 | — |
| 막대 | #222222 | shade-02 | `selected`(line 밑줄과 같은 선택 표시 역할) | #222222 | 일치 | — |
| 목록 선 | #DDDDDD 1px | neutral-03 | `border`("Light border") | #DDDDDD | 일치 | — |
| 포커스 링 | 현재 사이트 브라우저 기본 rgb(0, 95, 204), Figma 없음 | shade-02 | `focus-ring`(Q-14) | #222222 | 일치 | — |
| 바탕 | 없음(투명). 놓이는 곳은 Inspiration 의 #F7F7F7 띠 | — | — | — | — | Storybook `Bar` 견본은 흰 캔버스(Tabs 다른 견본과 같음) — 띠 바탕은 Inspiration 견본에서 확인 |

- 글자: 크기 `--text-type-body-copy-14pt-regular`(14px), 굵기 **500** = `--font-weight-medium`(layout 토큰, Figma 변수 `sds-typography-weight-medium` 500 이 Detail 변수 목록에 있음 — 에이전트 C 의 `get_variable_defs 812:393`), 글꼴 `--font-type-body-copy-14pt-regular`("SF Pro", var(--font-sans)) — 현재 사이트는 `-apple-system, BlinkMacSystemFont, …` 라 macOS 화면 대조 필요(Q-16). 줄 높이 18·자간 −0.15 는 사용자 결정 "지금 크기·자간 유지" 대로 `calc(var(--spacing) * 4.5)`·`calc(var(--spacing) * -0.0375)`.
- 신규 token: 없음(결정 2 로 `text-secondary` 를 씀). 이 계획은 `docs/plans/tokens.md` 를 고치지 않는다.

## 7. 원본 아이콘·asset

내려받은 위치(분석용, 프로젝트 밖): `<로컬 측정 폴더>/figma-assets/ChipTabs/`

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| Dome 235:1803(Group 235:1799) | MCP asset 7e837e2e… (sha256 30f86417f1a6), path `M22.2857 0V5.81657C23.3451 7.57371 …Z` 하나 | 24×24, fill #222222, 회전 없음, 그룹이 아래로 1.11% 밀림(inset 1.11% 0 −1.11% 0) | Icon On 의 Default·Line On, Hover·Line On/Off, Pressed·Line On/Off, Focus·Line On/Off | Icon Off 8개, Default·Line Off | 확인 — stories 견본으로만 사용(Q-07) |
| Dome 인스턴스 235:1853 | MCP asset f56ea8f1… (sha256 d519ebc424ae), 위와 **같은 path** | 24×24, fill #717171 | Default·Line Off·Icon On(225:1692) | 그 밖 | 확인 — 같은 그림에 색만 다름 → `currentColor` 한 벌 |
| 밑줄 150:2359 | asset df2dab54… (sha256 a113d64c2eaa) `line y1=1 x2=40 y2=1` | 40×2, stroke #222222 2 | Default·Line On·Icon On | — | 확인 |
| 밑줄 229:2054 | asset 12bc8c55… (sha256 5cc442871fcd) `line x2=37` | 37×2, stroke #222222 2 | Default·Line On·Icon Off | — | 확인 |
| 밑줄 225:1708 | asset 10542f43… (sha256 2b69e1d8a3b6) `line x2=40` | 40×2, stroke #D3D3D3 2 | Hover·Line On·Icon On | — | 확인 |
| 밑줄 229:1859 | asset ad8f329b… (sha256 2b69e1d8a3b6, 225:1708 과 같은 내용) | 40×2, stroke #D3D3D3 2 | Pressed·Line On·Icon On | — | 확인 |
| 밑줄 229:2019·229:2077 | asset e8ae5790… (sha256 7bafed6161a8) `line x2=39` | 39×2, stroke #B0B0B0 2 | Hover·Line On·Icon Off, Pressed·Line On·Icon Off | — | 확인 |
| 밑줄 225:1744·229:2032 | asset 363362aa… (sha256 a113d64c2eaa, 150:2359 와 같은 내용) | 40×2, stroke #222222 2 | Focus·Line On(Icon On·Off) | — | 확인 |
| Pill Tabs | asset 없음 | — | — | 3개 변형 | 확인 |

- 밑줄은 단색 직선 2px 라 그림 파일이 아니라 CSS(가상 요소, 토큰 색)로 그린다. 두께·위치·색은 원본 그대로이고 폭은 Q-02 대로 라벨 폭. Dome 은 키트 규칙대로 `<svg>` JSX + `fill="currentColor"` 로 stories 에만 둔다.
- revision 2 `bar`: 그림 asset 없음. 막대 389:7240·목록 선 389:7241 은 단색 사각 frame 이라 CSS 로 그린다.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `variant` | Underline 229:2214 / Pill 237:2219 | `"line"` / `"line" \| "pill"` | 밑줄형 또는 알약형 모양 | 같음 | 확정(Q-05·Q-09) |
| `items` | 기존 API | `[]` / `{ id, label, content, icon?, disabled? }[]` | 탭마다 `role="tab"` 버튼 + `role="tabpanel"` 패널 | — | 확정(Q-05) |
| `items[].icon` | Icon On 변형 8개 | 없음 / `ReactNode` | `line` 에서 라벨 위 24×24 칸에 그림, 색은 탭 글자색(`currentColor`) | 장식(`aria-hidden`) | 확정(Q-07) |
| `items[].disabled` | 기존 API, Figma 모양 없음 | `false` | 네이티브 `disabled`, 새 모양 없음 | 화살표 이동에서 건너뜀 | 확정(Q-06) |
| `defaultTab` | 기존 API | 첫 번째 사용 가능 탭 | 처음 선택된 탭(Line On / Pill 흰 칸) | — | 확정(Q-05) |
| `onTabChange(id)` | 기존 API | 없음 | 선택이 바뀔 때 호출 | 클릭·화살표 모두 | 확정(Q-04) |
| `label` | 기존 API | i18n "탭"/"Tabs" | tablist 의 `aria-label` | — | 확정(Q-05) |
| 키보드 | 기존 API(WAI-ARIA tabs) | — | Tab 한 번에 선택 탭으로 들어옴, ←→ 이동 = 선택, Home/End | `:focus-visible` 에 Figma 링 | 확정(Q-04) |
| `size`, `orientation` | Figma 축 없음 | 삭제 | — | — | 확정(Q-05) |

- 최상위 요소: `<div class="ds-tabs ds-tabs--line|pill" data-testid="ds-tabs">`. Hover/Pressed/Focus 는 CSS 의사 클래스, 선택은 `aria-selected`(prop 아님).

### revision 2 — API 변화

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `variant` | rev 1 + Home 389:7214 | `"line"` / `"line" \| "pill" \| "bar"` | `bar` = 5절 revision 2 표의 모양, 패널 위 32·아래 0 | line·pill 과 같은 키보드 | 확정(Q-13) |
| `items[].icon` | 389:7214 에 아이콘 없음 | — | `bar` 에서는 그리지 않음 | — | 확정(Q-13) |
| 그 밖의 prop | rev 1 | 그대로 | 그대로(`label` 은 Inspiration 이 제목 글자를 넘김) | 그대로 | rev 1 확정 |

- 최상위 요소: `bar` 이면 `class="ds-tabs ds-tabs--bar"`. 다른 부품은 `.ds-tabs*` 를 고치지 않고 `variant` 로만 고른다(R05).

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | Underline 의 "Line" 의미. Hover/Pressed·Line On 은 밑줄이 회색 | A. Line On = 선택된 탭, 16개 변형을 그대로 씀(선택 탭 hover·누름 때 밑줄이 회색) **(AI 추천)** / B. Hover 의 Line On = 선택 안 된 탭의 hover 밑줄 / C. 사용자가 설명 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-02 | Figma 안의 불일치(Icon Off hover 색이 옅어짐, 굵기 Regular/Semibold, 밑줄 39·40 고정 폭, hover 밑줄색 차이) | A. 색·굵기는 Figma 그대로, 밑줄 폭은 라벨 폭 **(AI 추천)** / B. 숫자까지 전부 그대로 / C. Figma 를 고친 뒤 다시 읽음 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-03 | Focus 링의 모양과 배치 | A. 탭 크기 유지, 링은 바깥(Icon On 한 겹 10 띄움 / Icon Off 두 겹 16 띄움 / Pill 칸 안쪽 테두리) **(AI 추천)** / B. 포커스 때 탭이 커짐 / C. 획 정렬을 Figma 에서 다시 확인 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. 획 위치는 MCP 코드로 정하고 2px 이내 차이는 렌더 대조 항목(리드 확인, 5절) | resolved |
| Q-04 | 키보드 방식 | A. 지금 방식 유지(화살표 = 선택) **(AI 추천)** / B. 수동 선택(Enter/Space), 검사 스크립트 수정 필요 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-05 | 공개 API 변경 | A. `variant: "line" \| "pill"`, `size`·`orientation` 삭제 **(AI 추천)** / B. `underline \| pill` 로 이름 변경 / C. 지금 모양 유지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-06 | `items[].disabled` | A. 기능만 유지, 새 모양 없음 **(AI 추천)** / B. 삭제 / C. Figma 에 먼저 그림 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-07 | 아이콘(Icon On), Dome 은 키트 부품이 아님 | A. `items[].icon` 칸 + Dome 은 stories 견본으로만 **(AI 추천)** / B. 키트 Icon 에 먼저 등록 / C. Icon On 보류 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. Dome 원본 = Internal Only Canvas 단독 컴포넌트 235:1803(24×24) → Nested parts `none`(리드 확인) | resolved |
| Q-08 | 탭 목록 배치(목록 선, 밑줄 자리, 간격) | A. 목록 아래 선 없음, 밑줄 자리는 늘 확보, 탭 사이 간격은 사용자가 숫자로 정함 **(AI 추천)** / B. 키트 값(4px + 1px 선) 유지 / C. Home Inspiration 프레임 값을 따름 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. 간격 숫자는 Q-12 | resolved |
| Q-09 | Pill Tabs 의 역할 | A. Tabs `variant="pill"` **(AI 추천)** / B. ContentSwitcher 로 / C. 2단계로 미룸 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-10 | Pill 칸 너비 | A. 모든 칸 151 고정(Figma 그대로) **(AI 추천)** / B. 라벨 폭 + 좌우 12 / C. 부모 너비를 나눔 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-11 | 색·그림자 역할 | A. 흰색 = `surface`, #F7F7F7 = `surface-focus`, 새 역할 6개, 그림자는 Elevation 확인 뒤 **(AI 추천)** / B. #F7F7F7 에 `surface-raised` 재사용 / C. 이름을 사용자가 정함 | 추천안 채택 — 사용자가 "추천안 모두 채택"·"합친 목록 + 다시 가져오기"·그림자 "Figma 이름으로 추가" 선택 (chosen in chat, 2026-11-26) → A. `surface-focus` = neutral-01, 그림자는 Elevation 과 달라 `--shadow-pill-tabs` 새 토큰 제안 → 키트 입력 경로가 없어 보류, 지금은 그리지 않음(6절) | resolved |
| Q-12 | Underline 탭 사이 간격 숫자(Q-08 A 에서 사용자가 정하기로 함). 세트에는 탭 한 개만 있다. Home Inspiration 일반 프레임(389:7214)은 탭마다 좌우 16 안쪽 여백으로 붙어 있어 라벨 사이가 32(첫 칸만 35) | A. 라벨 사이 32 = `calc(var(--spacing) * 8)`(Home Inspiration 실측) **(AI 추천)** / B. 다른 숫자를 사용자가 알려 줌 | Q: 탭 사이 간격? → A: "32px (권장)" (chosen in chat, 2026-11-26) → A. 라벨 사이 32 | resolved |
| Q-13 | (rev 2) Inspiration 탭 줄 모양(5절 revision 2 표)을 Tabs 에 어떻게 더할지 | **A (추천)** 새 값 `variant="bar"` — 5절 revision 2 표 전체(3px 막대, 1px 목록 선, 첫 탭 −16, 패널 위 32·아래 0, 아이콘 없음) / B `variant="line"` 에 새 prop(예: `indicator="bar"`)을 더해 line 의 모양 일부만 바꿈 — line 의 Figma 값과 섞여 규칙이 복잡해짐 / C 다른 이름을 사용자가 정함 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A `variant="bar"` | resolved |
| Q-14 | (rev 2) `bar` 의 hover·focus 모양. 현재 사이트는 hover 변화 없음, focus 는 브라우저 기본 링(파란 1px, 탭 상자 둘레 모서리 8). Figma 는 둘 다 없음(스펙: 포커스 표시를 새로 정하면 사용자 결정 필요) | **A (추천)** hover 변화 없음(현재 사이트), focus 는 지금 링 자리(탭 상자 둘레, 모서리 8 = `--radius-md`)에 키트 `focus-ring`(#222) 2px 링 / B 브라우저 기본 링 그대로(현재 사이트와 똑같음, 키트 다른 탭과 다름) / C line 의 Figma 모양을 그대로(hover 때 라벨 #B0B0B0, 두 겹 링) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A(hover 없음은 결정 2 "Figma 에 없는 hover 색은 없앰"과도 같음) | resolved |
| Q-15 | (rev 2) 막대 세로 위치. 현재 사이트는 막대가 목록 선보다 3 위(탭 기준 y 34~37), Figma 389:7240 은 y 37~40 으로 선에 붙음. 막대 폭은 둘 다 라벨 + 16·17 로 같음 | **A (추천)** 현재 사이트 그대로(사용자 결정 "페이지 모양 유지", 브리프: 현재 사이트가 기준) / B Figma 처럼 선에 붙임(막대 아래 위치 0) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A(막대 크기·위치는 결정 3 "지금 크기 유지"와도 같음) | resolved |
| Q-16 | (rev 2) 색·글자 값(Footer Q-06·Inspiration Q-06 과 같은 질문, 답 하나로 셋 다 정함). 안 고른 라벨 #6C6C6C 는 primitive·역할 없음, 굵기 500·자간 −0.15·줄 높이 18 은 Figma 글자 스타일 토큰에 없음 | **A (추천)** #6C6C6C → 새 역할 `text-supporting`(리드 토큰 계획 rev 6), 굵기 `--font-weight-medium`, 자간 `calc(var(--spacing) * -0.0375)`, 줄 높이 `calc(var(--spacing) * 4.5)`, 글꼴 토큰 + macOS 화면 대조 / B 안 고른 라벨에 기존 `text-secondary`(#717171)와 키트 14pt 글자 스타일을 씀 — 현재 사이트보다 조금 옅고 굵기·자간이 달라짐 / C Figma 에 색 변수·글자 스타일을 먼저 만들고 다시 가져옴 | 사용자 결정 "Figma 스타일 값으로 맞춤" + "지금 크기·자간 유지 (권장)" (chosen in chat, 2026-11-26), 리드 매핑 표 → 안 고른 라벨 #6C6C6C 는 #717171 `text-secondary`(새 역할 없음), 굵기 500 = `--font-weight-medium`, 크기·자간·줄 높이는 지금 값(`--text-type-body-copy-14pt-regular`, `calc(var(--spacing) * -0.0375)`, `calc(var(--spacing) * 4.5)`), 글꼴 토큰 + macOS 화면 대조 | resolved |

답을 받으면 사실·상태·토큰·API 표도 함께 갱신한다. 모든 필요한 질문이 해결된 경우에만 `open_questions: 0`을 기록한다.

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | Underline: 선택 탭 #222 + 2px #222 밑줄, 나머지 #717171, 투명 바탕. Pill: #EBEBEB 묶음, 선택 칸 흰색 + 그림자. 캔버스 흰색 | Storybook iframe computed style·스크린샷, 229:2214·237:2219 스크린샷 대조 | |
| 모든 상태·크기 | 5절 19개 변형(Q-01·Q-02·Q-03 답 반영) | Playwright 실제 포인터 hover·mousedown, 실제 Tab·화살표 키, 원본 대조 | |
| Focus 링 위치(렌더 대조 항목) | Icon On 10 띄운 2px 링, Icon Off 16 띄운 #D3D3D3 + #222 두 겹, Pill 칸 안쪽 2px. 탭·칸 크기 변화 없음. Figma Focus 변형 크기와 2px 이내 차이는 기록 | 원본 스크린샷과 브라우저 스크린샷 대조, DOM 크기 측정 | |
| 아이콘과 노출 조건 | Icon On: 24×24 Dome(견본), 라벨 색을 따름(#717171/#222). Icon Off: 아이콘 없음 | DOM·크기 측정, 원본 asset 경로 대조 | |
| 클릭·입력·선택 등 기능 | 탭 클릭 → `aria-selected`·패널 전환·`onTabChange(id)` 1회 | Storybook play `fn()` + `userEvent.click`, `scripts/verify-interactions.mjs` Tabs 검사 | |
| disabled / Tab / Focus | Tab 한 번에 선택 탭, →/←/Home/End 이동 = 선택, 비활성 탭 건너뜀 | play `userEvent.tab`·`keyboard` | |
| Nested parts identity | 키트 하위 부품 없음(Dome 은 stories 의 `icon` 값) | `ai:verify` DOM 확인 | |
| Nested part → composite callback | 해당 없음(아이콘은 누르는 부품이 아님) | — | |
| Pill 선택 칸 그림자 | 237:2209 `0 6px 8.5px rgba(0,0,0,0.08)` | **보류** — pending: Figma effect style needed, then re-import. 지금 구현은 그림자 없음(알려진 차이) | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 페이지 영향 없음, 삭제한 prop 을 쓰는 곳 없음 | `pnpm ai:check Tabs`, `pnpm ai:verify Tabs`, `pnpm typecheck`, `pnpm ds:guard` | |
| (rev 2) `bar` 기본 모양 | 현재 사이트 측정과 같음: 목록 높이 40 + 선 1(#DDDDDD, 전체 폭), 라벨 14/500/18 #717171(결정 2, rgb(113,113,113))·선택 #222, 첫 라벨이 왼쪽 끝, 라벨 사이 32, 막대 3px #222 라벨 시작 ~ +16, 탭 아래 3 위(Q-15 답), 패널 위 32 | Storybook `Bar` 견본 iframe 1440 Playwright 측정 → scratchpad `rebuild/A/measure.json`(Home `tabs`·`tabList`·`divider`·`grid`) 대조 | |
| (rev 2) `bar` 상태 | hover 변화 없음, focus 링(Q-14 답), 선택 이동 | Playwright 실제 포인터·Tab·←→ | |
| (rev 2) `bar` 기능 | 클릭·화살표 → 선택·`onTabChange(id)` 1회, 패널 전환 | Storybook `play`(`fn()` + `userEvent.click`·`keyboard`) | |
| (rev 2) line·pill 회귀 | rev 1 값 그대로 | 기존 견본·`scripts/verify-interactions.mjs` Tabs 검사 | |

필수 명령: `pnpm ai:check Tabs`, `pnpm ai:verify Tabs`, `pnpm typecheck`, `pnpm ds:guard`. 명령 검사와 시각 원본 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 부품 계획 질문을 어떻게 답할까? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26). Q: 새 색 역할 → A: 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26). Q: 그림자 → A: Figma 이름으로 추가 (chosen in chat, 2026-11-26). Q: 탭 사이 간격 → A: "32px (권장)" (chosen in chat, 2026-11-26). Q: 연결 안 된 값 → A: "근거와 함께 토큰 추가 (권장)" (chosen in chat, 2026-11-26) — 키트에 입력 경로가 없어 `--shadow-pill-tabs` 는 보류. Q-01~Q-12 와 Nested parts 행에 반영했다(그림자 보류는 10절에도 기록).
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26)
- 승인한 revision: 2 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 없음. 토큰 계획 revision 5 는 승인·적용됨. Pill 그림자는 보류(Figma 효과 스타일이 생기면 다시 가져온 뒤 추가).
- **revision 2(2026-11-26, 승인 대기):** `bar` 옵션 추가. 사용자 결정 근거 "구역도 부품으로 (권장)"·"페이지 모양 유지 (권장)"(chosen in chat). Q-13~Q-16 은 사용자 결정 "추천안 모두 채택 (권장)"·"Figma 스타일 값으로 맞춤"·"지금 크기·자간 유지 (권장)"(chosen in chat, 2026-11-26, 리드 전달)으로 해결. 새 토큰 필요 없음. 구현 전에 남은 조건: 사용자 승인("Approve revision 2"). revision 1 의 line·pill 구현은 이 revision 과 상관없이 승인 상태 그대로 유지된다.
