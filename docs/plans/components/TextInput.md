---
kind: component
component: TextInput
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=208-2159&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — TextInput

> 작성: Claude Code(유지보수자), 2026-11-26. 사용자 요청: "둘 다 확인해서 디자인 시스템에 적용해줘" → 1단계 목록(`docs/plans/design-system-airbnb.md`)의 `TextInput`. 같은 날 사용자가 채팅에서 "추천안 모두 채택"을 골라 Q-01~Q-12 를 답했다. 이후 사용자가 "Approve revision 1·5 (권장)"을 골라 이 계획 revision 1 과 토큰 계획 revision 5 를 승인했다(리드가 AskUserQuestion 답을 그대로 전달).

## 1. 요청과 적용 규칙

- 요청한 작업: 키트 기본 `TextInput`(size, disabled, helperText, invalid, label, placeholder, readOnly)을 Figma "Inputs" 에 맞게 고친다(R05, 기존 원본 수정). Textarea(208:2718)는 2단계라 범위 밖.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1
- Figma 파일·노드·조회 시점: Q5QDGE5WoXefOxgm5fziH3, "Inputs" 세트 **208:2159**(40개 변형), 2026-11-26 Figma Desktop MCP 직접 조회(캐시 아님)
  - `get_design_context 208:2159`(스크린샷 포함, sparse 표시 없음 — 40개 변형 코드 전부), `get_variable_defs 208:2159`
  - `get_metadata 208:2159`(40개 변형 크기), `get_metadata 208:2065`·`208:2060`(하위 레이어 종류)
  - `get_screenshot 208:2149`(Focus 테두리 픽셀 측정)
  - 응답의 SVG 4개를 내려받아 경로·색을 읽음(프로젝트에 복사하지 않음)
- 대상 코드·토큰 기준: git-demo 작업 폴더 HEAD `f3aed50` + 리드가 Colors 245:3518·Typography 245:3517·Elevation 245:3354 를 다시 가져온 `src/tokens/tokens.css`(값 추가만: `--color-error-01`, `body-copy-12pt-regular` 글자 토큰 등). 새 색 역할은 리드가 쓰는 토큰 계획 `docs/plans/tokens.md` revision 5 에 들어갔다(승인·적용 완료, 리드).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 둥근 상자(폭 520, radius 8) 안에 [라벨 12pt] + [자리 글 / 값 16pt] + [달력 아이콘], 상자 아래 helper 또는 오류 줄 | 한 줄 글자 입력 칸. 네이티브 `<input>` 이 실제 입력·값 변경을 맡음(C07) | Q-12 A 채택 |
| 누를 수 있는 영역 | Figma 에 표시 없음. 라벨은 상자 **안쪽** 위에 있음 | 상자 아무 곳을 눌러도 입력 칸에 포커스(라벨과 input 연결). 달력 아이콘은 장식 | Q-06 A·Q-12 A 채택 |
| 입력·값 변경 | State=Filled: 값 "Filling the input with real text" #222222 + 세로 caret 선 | Filled = 포커스 중 값이 있는 모습. 포커스가 빠지면 값이 있어도 Default 모양 | Q-01 A 채택 |
| 키보드·포커스 범위 | State=Focus: 상자 테두리가 2px #222222 로 바뀜(별도 링 없음) | 상자에 `:focus-within`. 1px 테두리 색 변경 + 바깥 1px 링(글자 고정). Error 포커스도 같은 방식 | Q-04 A 채택 |
| 오류 | Status=Error: 상자·라벨 #C13515, 상자 아래 오류 아이콘 + "Error message" | `invalid` + `errorMessage`. `errorMessage` 가 있으면 입력 중에도 helper 대신 오류 줄. 라벨·helper 없는 조합에도 같은 색 규칙 | Q-03 A 채택 |
| disabled·readOnly | Figma 에 변형 없음 | 네이티브 속성만 전달, 새 모양·스토리 없음 | Q-08 A 채택 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트: `src/components/TextInput/`(키트 기본). 공개 import `@/components/TextInput`, `index.ts` 가 `TextInput`·`TextInputProps` 를 내보냄.
- 기존 props·stories 지원 범위: `size`(sm|md|lg, 높이 28/32/40), `invalid`, `helperText`, `label`(상자 **위 바깥**, 14px secondary), `children`, 나머지 input 속성 전달. CSS: 테두리 1px `--color-border-strong`, 바탕 `--color-surface-raised`(#F7F7F7), hover 테두리 primary(#FF385C), focus 2px primary outline offset 2px, invalid 2px danger 테두리, disabled 회색. stories 는 `@ds-generated`(기준선 `components.baseline.json#TextInput`) Sm·Md·Lg·Invalid·Matrix(size).
- 기존 원본 수정이 필요한 이유: 라벨 위치(상자 안), 색·바탕·hover·focus·오류 표현과 크기 축이 Figma 와 다르다. 새 부품을 만들지 않고 이 원본을 고친다(R05).
- 없애거나 바꿀 현재 API (Q-03·Q-06·Q-07·Q-12 A 채택으로 확정):

| 현재 | 결정 | 이유 |
|---|---|---|
| `size: "sm" \| "md" \| "lg"`, 타입 `TextInputSize`, CSS `ds-textinput--sm/md/lg` | 삭제. 폭은 부모를 채움(100%) | Figma 에 크기 축 없음(Q-07 A) |
| `children` | 삭제 | Figma 에 추가 내용 자리 없음 |
| `label`·`helperText`·`invalid` | 유지(모양은 Figma 대로) | Label·Helper Text·Status=Error 축 |
| (없음) | `errorMessage` 추가(문자열) | Error 변형의 "Error message" 줄(Q-03 A) |
| (없음) | `icon` 추가(boolean, 달력 고정) | Icon 축(Q-06 A) |
| 네이티브 `placeholder`·`value`·`defaultValue`·`onChange`·`disabled`·`readOnly`·`name`·`type`·`id`·`aria-describedby` | 유지(input 에 전달, `aria-describedby` 는 합침) | 기준선 |
| CSS `:hover` primary 테두리, `outline` focus, `__help--invalid`, disabled 바탕·색, `--color-surface-raised` 바탕 | 삭제·교체 | Figma 값과 다름(Q-02 A·Q-08 A) |

- 변경할 파일: `src/components/TextInput/TextInput.tsx`·`TextInput.css`·`TextInput.stories.tsx`(생성물 표시가 있어 고치면 충돌로 보고되고 보존됨)·`index.ts`(타입 `TextInputSize` 를 내보내지 않으므로 변경 없음). 새 색 역할은 토큰 계획 revision 5 에서(6절).
- 사용처 조사(`grep TextInput src my-website`): 컴포넌트·페이지 import **없음**. 걸린 곳은 생성물 `src/docs/CATALOG.md`·`src/docs/Overview.stories.tsx`(파이프라인이 다시 만듦)뿐. `Slider` 의 `hideTextInput` 은 이름만 겹침. → 깨지는 사용처 없음.
- Detail 예약 상자와 비교: `my-website/pages/DetailPage.tsx` 362~377행 CHECK-IN / CHECKOUT / GUESTS 는 네이티브 `<input readOnly>` 자유 모드. 모양이 Figma Inputs 와 **다르다** — 라벨 10px 굵게(590) #222 대문자 vs Figma 12pt Regular #717171, 값 14px #5E5E5E vs 16pt #222222, 테두리 1px #717171 vs #B0B0B0, 모서리 12(칸끼리 붙음) vs 8, 높이 56 vs 61. 라벨이 상자 안에 있는 구조만 같다. 그래서 예약 상자는 이 부품으로 그대로 바꿀 수 없다(페이지 계획에서 다룸).
- 참고(범위 밖): `components.baseline.json#TextInput`·`.ds/lock.json` 에 옛 API(size sm/md/lg)가 남아 있다. 이 계획은 그 파일을 고치지 않는다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (Calendar today, 프레임·인스턴스 아님: 207:1522, 208:1670 등) | — | — | Icon=on 변형 20개 | none — drawn inside this part from the Figma SVG (키트 Icon 에는 calendar 가 없음: add·close·search 만, Q-06 A) | confirmed |
| — (오류 Vector, vector: 208:1675 등) | — | — | Status=Error 의 Default·Hover·Focus 6개 | none — drawn inside this part from the Figma SVG (Q-03 A 로 오류 줄이 나오는 모든 경우에 씀) | confirmed |

- Confirmed absence of nested instances and evidence: `get_design_context 208:2159` 응답에 하위 컴포넌트 함수가 하나도 없고(라디오 세트에서는 인스턴스가 별도 함수로 나옴), `get_metadata 208:2065`·`208:2060` 의 자식은 frame·text·vector 뿐이다. 상자 프레임 이름이 "State=Default, Status=Default, Icon=off, Helper text=off, Label=On" 으로 모든 변형에서 같지만 종류는 frame 이다(207:1516).
- 라벨·helper·오류 글자: Text 부품을 쓰지 않는다. Text 의 `body`/`body-sm` 은 `--font-sans`·`line-height: 1.5` 로 Figma "Body Copy/*pt Regular"(SF Pro, line-height normal)와 다르다. 이 부품 안에서 글자로 그린다(ListingCard 와 같음).

## 5. Figma 상태·크기 전체 목록

### 변형 노드 ID (40개)

Status=Default — (Label, Helper Text, Icon) 조합별:

| Label / Helper / Icon | State=Default | State=Hover | State=Focus | State=Filled |
|---|---|---|---|---|
| off / off / off | 208:2061 (520×51) | 208:2131 (520×51) | 208:2149 (522×53) | 208:2147 (522×53) |
| off / on / off | 208:2062 (520×82) | 208:2136 (520×82) | 208:2158 (522×84) | 208:2145 (522×84) |
| off / off / on | 208:2063 (520×51) | 208:2132 (520×51) | 208:2144 (522×53) | 208:2143 (522×53) |
| off / on / on | 208:2064 (520×82) | 208:2133 (520×82) | 208:2148 (522×84) | 208:2157 (522×84) |
| on / off / off | 208:2067 (520×61) | 208:2134 (520×61) | 208:2154 (522×61) | 208:2140 (522×61) |
| on / on / off | 208:2066 (520×92) | 208:2141 (520×92) | 208:2152 (522×92) | 208:2151 (522×92) |
| on / off / on | 208:2068 (520×61) | 208:2135 (520×61) | 208:2150 (522×61) | 208:2142 (522×**71**) |
| on / on / on | 208:2065 (520×92) | 208:2137 (520×92) | 208:2155 (522×92) | 208:2139 (522×**102**) |

Status=Error — Label=on·Helper Text=on 만 있음:

| Icon | State=Default | State=Hover | State=Focus | State=Filled |
|---|---|---|---|---|
| off | 208:2059 (520×90) | 208:2129 (520×90) | 208:2153 (520×90) | 208:2146 (520×92) |
| on | 208:2060 (520×90) | 208:2130 (520×90) | 208:2156 (520×90) | 208:2138 (520×92) |

### 상태별 차이

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| Default·Default (8개, 위 표 1열) | design_context + metadata | 기본 | 상자 | 기준: 테두리 1 #B0B0B0, **채움 없음**, radius 8. Label=off: 좌우 12·상하 16. Label=on: 사방 12, 라벨→값 줄 gap 4. 자리 글 16pt #717171. 라벨 12pt #717171. helper 16pt #717171, 상자 아래 12 | Icon=on: 달력 16×16 오른쪽 끝, 줄 위쪽 정렬 | 기본 렌더 | 확정 |
| Hover·Default (8개) | design_context | 포인터 올림 | — | **Default 와 값이 모두 같음** | 같음 | hover CSS 없음(Q-02 A) | 확정 |
| Focus·Default (8개) | design_context + metadata + 208:2149 픽셀 측정 | 입력 칸 포커스 | 상자 | 테두리 2 #222222. 변형 프레임 522×53 안에 상자(520)가 left 1·top 1 → 테두리가 상자 바깥으로 1px, 안쪽으로 1px(측정: 0~1열과 520~521열이 #222222). 글자 위치는 상자 기준 그대로 | 같음 | `:focus-within` → 1px 테두리 색 + 바깥 1px 링(Q-04 A) | 확정 |
| Filled·Default (8개) | design_context + metadata | 포커스 중 값 있음 | 상자·글자 | Focus 와 같은 2px #222222 테두리 + 값 16pt **#222222** + caret 선(19 높이, 0.5 두께, #717171). Figma 의 Label+Icon 두 변형(208:2142·208:2139)만 상하 여백 16·아이콘 가운데 정렬 → **Q-05 A 로 여백 12·위쪽 정렬로 통일** | 같음 | 추가 CSS 없음: `:focus-within` 테두리 + 값 글자색 + 네이티브 caret(Q-01 A·Q-11 A) | 확정 |
| Error·Default / Error·Hover (4개) | design_context | 지속(invalid) | 상자·라벨·아래 줄 | 테두리 1 #C13515 + **채움 #FEF8F6**, 라벨 #C13515, 자리 글 #717171 그대로. helper 자리에 오류 줄: [오류 아이콘 16×16] gap 8 [오류 문구 14pt #C13515], 아래쪽 정렬, 높이 17. Hover 는 Default 와 같음 | 달력(Icon=on) + 오류 아이콘 | `invalid` + `errorMessage`(Q-03 A) | 확정 |
| Error·Focus (2개) | design_context + metadata | invalid + 포커스 | 상자 | 테두리 2 #C13515, **채움 없음**. 오류 줄 그대로. 테두리는 Default 포커스와 같은 방식(1px 테두리 + 바깥 1px 링)으로 그림 | 같음 | `invalid` + 상자 `:focus-within`(Q-04 A) | 확정 |
| Error·Filled (2개) | design_context + metadata | invalid + 포커스 중 값 있음 | 상자·아래 줄 | 테두리 2 #C13515, 채움 없음, 값 #222222 + caret. Figma 는 오류 줄 대신 helper 를 보이지만 **Q-03 A 로 오류 줄 유지** | 달력(Icon=on) + 오류 아이콘 | Q-03 A | 확정 |

### 크기·간격 (Figma 값 → CSS)

| 요소 | Figma 값 | CSS |
|---|---|---|
| 상자 | 폭 520, radius 8, 테두리 1(Default)·포커스 때 2(1 + 바깥 1) | 폭 100%(Q-07 A), `--radius-md`, `--border-width-thin` + 포커스 `box-shadow: 0 0 0 var(--border-width-thin) …` |
| 상자 안 여백 | Label=off: 12 / 16, Label=on: 12(모든 State, Q-05 A) | `calc(var(--spacing) * 3)` / `calc(var(--spacing) * 4)`. Figma 테두리는 여백 안쪽에 겹치므로 CSS 여백에서 `--border-width-thin` 을 빼서 글자 위치를 맞춤 |
| 라벨 → 값 줄 | gap 4 | `calc(var(--spacing) * 1)` |
| 값 줄 | 높이 19(16pt line-height normal), 아이콘 16×16 오른쪽 끝, 위쪽 정렬(Q-05 A) | `justify-content: space-between`, `align-items: flex-start`, 아이콘 `calc(var(--spacing) * 4)` |
| 상자 → helper / 오류 줄 | gap 12 | `calc(var(--spacing) * 3)` |
| 오류 줄 | 아이콘 16 + gap 8 + 문구, 아래쪽 정렬, 높이 17 | `gap: calc(var(--spacing) * 2)`, `align-items: flex-end` |
| 글자 줄 높이 | 측정 높이 12pt→14, 14pt→17, 16pt→19(line-height normal). 스타일 정의는 "lineHeight: 100" | `line-height: normal`(ListingCard 와 같음) |

- Focus 링이 감싸는 정확한 범위와 근거: 별도 링 없음. 상자 테두리 자체가 2px 로 바뀐다. 208:2149 스크린샷(522×53)에서 바깥 2px 가 모두 #222222, 안쪽은 채움 없이 세트 배경(#F3F3F3, 측정값)이 비친다.
- Figma에 실제로 없는 상태·조합: Disabled, ReadOnly, 크기 축, Error + (Label=off 또는 Helper=off) 조합 6×4 = 24개, Hover 의 시각 변화, 포커스 없이 값만 있는 모습. 결정: Error 미조합은 같은 색 규칙(Q-03 A), 값만 있는 모습은 Default 모양(Q-01 A).
- 미조회/실패/잘린 응답: 없음. Error·Focus/Filled 의 테두리 정렬은 픽셀로 재지 않았지만, Q-04 A 로 모든 포커스 테두리를 같은 방식으로 그리므로 구현에 필요한 사실이 아니다.
- 결정으로 생기는 원본과의 차이(검수 항목): Error·Focus/Filled 는 Figma 변형 폭이 520 인데 구현은 바깥 1px 링 때문에 522 로 보일 수 있음(1px). Filled+Label+Icon 은 Figma 보다 8px 낮음(Q-05 A). Error·Filled 는 helper 대신 오류 줄(Q-03 A).

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 상자 테두리 Default·Hover | #B0B0B0 / Neutral 06 | neutral-06 | `--color-border-strong` | #B0B0B0 | 일치(입력 칸 테두리 = Strong border) | — |
| 상자 채움 Default·Hover·Focus·Filled, Error·Focus/Filled | 없음(투명) | — | — | — | — | 바탕을 칠하지 않음. 현재 `--color-surface-raised`(#F7F7F7) 바탕은 삭제 |
| 상자 테두리 Focus·Filled | #222222, 2px / Shade 02 | shade-02 | `focus-ring`(새 역할, RadioButton 과 공용) | #222222(토큰 계획 rev 5 적용 뒤) | 일치 | 새 역할(Q-09 A). `--color-text` 는 값만 같아 쓰지 않음 |
| 상자 테두리 Error(1px·포커스 2px) | #C13515 / Error 02 | error-02 | `--color-danger` | #C13515 | 일치(오류) | — |
| 상자 채움 Error·Default/Hover | #FEF8F6 / Error 01 | error-01(이제 있음, `--color-error-01`) | `danger-subtle`(새 역할) | #FEF8F6(rev 5 적용 뒤) | 일치 | 새 역할(Q-09 A) |
| 라벨 Default·Focus·Filled | #717171 / Neutral 07 | neutral-07 | `--color-text-secondary` | #717171 | 일치(보조 글자) | — |
| 라벨 Error | #C13515 / Error 02 | error-02 | `--color-danger` | #C13515 | 일치 | — |
| 자리 글(placeholder) | #717171 / Neutral 07 | neutral-07 | `--color-text-secondary` | #717171 | 일치 | `::placeholder` |
| 값(Filled) | #222222 / Shade 02 | shade-02 | `--color-text` | #222222 | 일치 | — |
| caret | #717171, 0.5px / Neutral 07 | neutral-07 | `--color-text-secondary` (`caret-color`) | #717171 | 일치 — caret 을 보조 글자색 역할로 봄(Q-11 A). 두께 0.5px 는 네이티브 caret 이라 재현하지 않음 | — |
| helper | #717171 / Neutral 07 | neutral-07 | `--color-text-secondary` | #717171 | 일치 | — |
| 오류 문구·오류 아이콘 | #C13515 / Error 02 | error-02 | `--color-danger` | #C13515 | 일치 | — |
| 달력 아이콘 | #222222 / Shade 02(SVG fill) | shade-02 | `--color-text` | #222222 | 일치(아이콘 = 글자색, ListingCard 별 아이콘과 같은 선례) | — |

- 컴포넌트 fill과 Figma 부모 배경: 상자는 Error·Default/Hover 를 빼면 **투명**이다. 세트 프레임 배경 #F3F3F3 은 측정값이며 변수가 아니다. Storybook 캔버스는 흰색(Q-10 A, 실제 페이지 배경과 같음).
- 같은 값의 후보가 여러 개일 때 선택 근거: 값과 역할이 함께 맞는 것만 골랐다(R01). 새 역할 이름은 사용자가 "합친 목록 + 다시 가져오기"로 정한 목록을 쓴다.
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: `focus-ring`(Focus·Filled 테두리), `danger-subtle`(Error 바탕). 기존 역할은 값만 같거나(#222222) 같은 값이 없다(#FEF8F6). 리드가 `docs/plans/tokens.md` revision 5 에 쓰며 이 계획은 그 파일을 고치지 않는다.
- 글자 토큰(모두 있음):
  - 라벨 "Body Copy/12pt Regular" = `--font-type-body-copy-12pt-regular` + `--text-type-body-copy-12pt-regular`(12px) + `--font-weight-type-body-copy-12pt-regular`(400) + `--tracking-type-body-copy-12pt-regular`(0px) — 리드가 Typography 245:3517 을 다시 가져와 생김.
  - 자리 글·값·helper "Body Copy/16pt Regular" = `--font-type-body-copy-16pt-regular` + `--text-type-body-copy-16pt-regular`(16px) + `--font-weight-type-body-copy-16pt-regular`(400) + `--tracking-type-body-copy-16pt-regular`.
  - 오류 문구 "Body Copy/14pt Regular" = `--font-type-body-copy-14pt-regular` + `--text-type-body-copy-14pt-regular`(14px) + `--font-weight-type-body-copy-14pt-regular`(400).
- 토큰 생성 경로·검증 계획: 토큰 계획 rev 5 승인 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens` → `pnpm ds:guard`(G10·G13).

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| Calendar today (Label=on 변형·Error) 207:1522, 208:1670 등 | MCP asset 8b0cc0a0… (sha256 4cc225416a7a) path `M13.333 2.00008H12.6663V0.666748…Z` | 16×16, 채움 #222222, clip 16×16 | `icon` 이 true 인 모든 상태 | `icon` false | 확인 — 이 파일 하나로 씀(Q-06 A) |
| Calendar today (Label=off 변형) | MCP asset 6e644eec… (sha256 3889df6b3e20) path `M13.3333 2H12.6667V0.666667…Z` | 16×16, 채움 #222222 | Figma 의 Label=off·Icon=on | — | 확인 — 위와 같은 모양(좌표 소수 자릿수만 다름), 따로 쓰지 않음 |
| 오류 Vector 208:1675 등 | MCP asset 868c79c8… (sha256 da5a9405d15d) 원 + 느낌표 path `M8 0C3.58011 0…Z` | 16×16, 채움 #C13515 | `invalid` 이고 `errorMessage` 가 있을 때(입력 중 포함, Q-03 A) | 그 밖 | 확인 |
| caret Line 2 | MCP asset def73d19… (sha256 647e8e502439) `line x2=19` | 19×0.5, stroke 0.5 #717171, 90° 회전(세로) | Figma Filled | — | 확인 — 그림으로 넣지 않고 네이티브 caret + `caret-color` 로 대신함(Q-11 A) |

- 아이콘은 `<svg>` JSX 로 원본 경로 그대로 그리고 색은 CSS 토큰(`currentColor`)으로 준다. `<img src>` 에 SVG 를 넣지 않는다. 다른 달력·경고 아이콘을 쓰지 않는다.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `label` | Label 축, "Label" 207:1519 | 없음 / 문자열 | 상자 안 위쪽 12pt 글자, input 과 연결. 없으면 `aria-label` 필요 | 라벨을 눌러도 포커스 | Q-12 A |
| `placeholder` | "Placeholder text" 207:1521 | 네이티브 | 값이 없을 때 16pt #717171 | — | Q-12 A |
| `value` / `defaultValue` / `onChange` | Filled "Filling the input with real text" | 네이티브 | 입력하면 값이 바뀌고 `onChange` 호출, 값 글자 #222222 | — | Q-01 A·Q-12 A |
| `helperText` | Helper Text 축, "Optional helper text" 207:1518 | 없음 / 문자열 | 상자 아래 12, 16pt #717171, `aria-describedby` 연결. 오류 줄이 나오면 숨김 | — | Q-12 A |
| `invalid` | Status=Error | false | 상자·라벨 빨강, Default/Hover 에서 #FEF8F6 바탕, `aria-invalid="true"`. 라벨·helper 가 없어도 같은 규칙 | — | Q-03 A |
| `errorMessage` | "Error message" 208:1676 | 없음 / 문자열 | `invalid` 이고 `errorMessage` 가 있으면 helper 대신 오류 아이콘 + 문구(입력 중에도), `aria-describedby` 연결 | — | Q-03 A |
| `icon` | Icon 축, Calendar today | false / boolean | 값 줄 오른쪽 끝에 달력 16×16(장식, `aria-hidden`) | 누르는 동작 없음 | Q-06 A |
| `disabled` / `readOnly` / `name` / `type` / `id` / aria-* | 기준선·네이티브 | — | input 에 전달. 새 모양 없음, 현재 disabled CSS 삭제 | disabled 면 Tab 에서 빠짐 | Q-08 A |
| `className` | 키트 관례 | — | 루트에 붙음(배치용) | — | Q-12 A |
| ref | 현재 API | — | input 을 가리킴(form 라이브러리 register·`focus()`) | — | Q-12 A |

- 구조: 루트 `div.ds-textinput[data-testid="ds-textinput"]` → 상자 `ds-textinput__box`(테두리·바탕, `:focus-within`) → 라벨 `ds-textinput__label` + 줄 `ds-textinput__row`(테두리 없는 `input.ds-textinput__field` + 달력 svg) → 상자 밖 `ds-textinput__helper` 또는 `ds-textinput__error`. Focus·Filled 는 CSS 가 처리하고 `state` prop 을 만들지 않는다.

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | State=Filled 의 뜻(Focus 테두리 + 값 + caret) | **A (추천)** 포커스 중 값 있음, 추가 CSS 없음, 포커스가 빠지면 Default 모양 · B 값이 있으면 계속 2px | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | Hover 변형 10개(Status=Default 8 + Status=Error 2)가 같은 조합의 Default 와 값이 똑같음 | **A (추천)** hover 모양 없음 · B 디자이너 확인 후 추가 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | 오류 표시 범위(Error 는 Label·Helper on 만, Error·Filled 는 helper 표시) | **A (추천)** `invalid` + `errorMessage`, 오류 줄은 입력 중에도 유지, 다른 조합에도 같은 색 규칙 · B Figma 그대로 · C label·errorMessage 모두 있을 때만 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | Focus 2px 테두리를 그리는 방법 | **A (추천)** 모두 1px 테두리 + 바깥 1px 링, 글자 고정 · B 변형마다 그대로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). Error 포커스 테두리 정렬은 측정할 필요 없어짐 | resolved |
| Q-05 | Filled+Label+Icon 여백 16·아이콘 가운데 정렬 불일치 | **A (추천)** 여백 12·위쪽 정렬로 통일 · B 그대로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-06 | 아이콘 | **A (추천)** `icon` boolean → 달력 SVG 고정, 장식 · B ReactNode · C 날짜 선택 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | 크기·폭 | **A (추천)** `size` 삭제, 폭 100% · B 폭 520 고정 · C `size` 유지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | disabled·readOnly 모양 | **A (추천)** 네이티브 속성만, 새 모양 없음, 현재 disabled CSS 삭제 · B 사용자가 모양 지정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-09 | 새 토큰 3개(`focus-ring`, `danger-subtle`, 12pt Regular 글자) | **A (추천)** 입력 경로로 가져와 토큰 계획에 추가 · B #222222 는 `--color-text` | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 이름: "합친 목록 + 다시 가져오기" → `focus-ring`·`danger-subtle`(primitive error-01, 이제 있음). 12pt Regular 는 `--text-type-body-copy-12pt-regular` 등으로 이제 있음 | resolved |
| Q-10 | Storybook 캔버스 배경 | **A (추천)** 흰색 · B #F3F3F3 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-11 | caret 색(Figma #717171 0.5px) | **A (추천)** 네이티브 caret + `caret-color: var(--color-text-secondary)` · B 새 역할 `caret` · C 브라우저 기본 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-12 | 공개 API(8절) | **A (추천)** 8절 표대로 · B 고칠 부분 알려 줌 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 208:2061·208:2065 처럼 투명 상자, 1px rgb(176,176,176), radius 8, 높이 51(Label=off)·61(Label=on), 흰 캔버스 | Storybook iframe 스크린샷·computed style·DOM 크기 | |
| 모든 상태·크기 | Focus·Filled 2px #222222(바깥 1px 포함, 글자 위치 그대로), Error 1px #C13515 + 바탕 #FEF8F6, Error 포커스 2px #C13515 바탕 없음, hover 변화 없음 | Playwright 실제 포인터·키보드 포커스 후 computed style | |
| 결정에 따른 차이 | Error 포커스 폭 1px 차이, Filled+Label+Icon 높이 61(Figma 71), Error·Filled 오류 줄 표시 | DOM 크기·스크린샷, 검수자가 확인 | |
| 아이콘과 노출 조건 | 달력은 `icon` 일 때만 오른쪽 끝(위쪽 정렬), 오류 아이콘은 오류 줄에만 | DOM·스크린샷 대조 | |
| 입력 기능 | 글자를 치면 값이 바뀌고 `onChange` 호출, 값 글자 #222222, caret 색 #717171 | play `userEvent.type` + `fn()` 호출 확인, computed `caret-color` | |
| 오류 연결 | `aria-invalid="true"`, `aria-describedby` 가 오류 문구 id 를 가리킴 | play DOM 확인 | |
| disabled / Tab / Focus | Tab 한 번에 input 포커스, disabled 면 입력 안 됨·Tab 에서 빠짐 | play `userEvent.tab` | |
| Nested parts identity | 키트 부품 import 없음(아이콘은 이 부품 안 SVG) | `ai:verify` DOM | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 사용처 없음 | `pnpm ai:check TextInput`, `pnpm ai:verify TextInput`, `pnpm typecheck`, `pnpm ds:guard` | |

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정:
  - Q: 부품 계획 질문을 어떻게 답할까요? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26) — Q-01~Q-12 모두 A
  - Q: 새 색 역할 이름은? → A: 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26) — `focus-ring`·`danger-subtle` 그대로
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 없음 — 토큰 계획 `docs/plans/tokens.md` revision 5 승인·적용 완료(리드, `src/tokens/tokens.css`)
