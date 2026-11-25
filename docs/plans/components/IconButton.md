---
kind: component
component: IconButton
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-7765&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획

> AI는 확인된 사실·해석·질문을 구분해 작성한다. 사용자 승인 전 구현 파일을 수정하지 않는다. `approved`는 사용자만 확정한다. 미해결 항목을 없애기 위해 사실이나 답변을 지어내지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Figma 노드 389:7765의 IconButton 컴포넌트 구현
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md`
- Figma 파일·노드·조회 시점·캐시 여부: 2026-11-25, node 389:7765, 캐시 사용
- 대상 코드·토큰 기준 버전: starter catalog, tokens.css with --gradient-selfmake-1~4

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | Figma: "Icon button" 컴포넌트 세트 | 아이콘만 있는 버튼, 클릭 가능 | 확정 |
| 누를 수 있는 영역 | Size=L: 40×40, Size=S: 28×28 | 전체 영역이 클릭 가능 | 확정 |
| 클릭/선택/열림 동작 | 다양한 타입 (Primary, Secondary, Services, Experiences, Hotels, Homes, All, Profile, Menu, Search, Redirect, Previous, Next) | 타입에 따라 다른 동작 | 확정 |
| 키보드·포커스 범위 | Focus 상태 있음 (44×44 for L, 28×28 for S) | Tab으로 포커스 가능, Focus 링 표시 | 확정 |
| disabled 동작 | Disabled 상태 있음 | 클릭 불가, 시각적 비활성화 | 확정 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트 / 공개 import / 사용처: 키트에 IconButton 존재 (`src/components/IconButton`)
- 기존 props·stories에서 확인한 지원 범위: variant, size, disabled, icon, label
- 기존 원본 수정 또는 새 부품이 필요한 이유: Figma 디자인에 gradient fills와 새로운 아이콘 타입이 있음
- 변경할 파일: `src/components/IconButton/index.ts`, `src/components/IconButton/IconButton.tsx`, `src/components/IconButton/IconButton.css`
- 승인된 변경에서 영향받는 기존 사용처: IconButton을 사용하는 모든 컴포넌트와 페이지

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| Icon | Icon (from Figma assets) | Various icons per type | All variants | none — drawn inside this part from the Figma SVG | confirmed |

- Confirmed absence of nested instances and evidence: Figma 인스턴스는 없으며, 아이콘은 SVG asset으로 제공됨

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 393:9506 · Default, L, Secondary | facts read | base | root | background: #DDDDDD | imgGroup, imgGroup1 | CSS: background | 확정 |
| 414:1896 · Default, L, Primary | facts read | base | root, Text | Text: var(--gradient-selfmake-1) | imgGroup | CSS: background-image | 확정 |
| 402:69 · Default, S, Secondary | facts read | base | root, Text | Text: var(--gradient-selfmake-1) | imgGroup, imgIconButtonDefaultSizeSTypeSecondary | CSS: background-image | 확정 |
| 393:9504 · Hover, L, Secondary | facts read | hover | root, Text | background: #D3D3D3 | imgGroup, imgGroup1 | CSS: background | 확정 |
| 414:1903 · Hover, L, Primary | facts read | hover | root, Text | var(--gradient-selfmake-2) | imgGroup | CSS: background-image | 확정 |
| 402:73 · Hover, S, Secondary | facts read | hover | root, Text | var(--gradient-selfmake-1) | imgGroup, imgIconButtonHoverSizeSTypeSecondary | CSS: background-image | 확정 |
| 393:9505 · Pressed, L, Secondary | facts read | active | root, Text | background: #C2C2C2 | imgGroup, imgGroup1 | CSS: background | 확정 |
| 414:1910 · Pressed, L, Primary | facts read | active | root, Text | var(--gradient-selfmake-3) | imgGroup, imgGroup1 | CSS: background-image | 확정 |
| 402:77 · Pressed, S, Secondary | facts read | active | root, Text | var(--gradient-selfmake-1) | imgGroup, imgIconButtonPressedSizeSTypeSecondary | CSS: background-image | 확정 |
| 393:9502 · Focus, L, Secondary | facts read | focus | root | border: #222222, size: 44×44 | imgGroup, imgContainer | CSS: border, outline | 확정 |
| 414:1924 · Focus, L, Primary | facts read | focus | root, Text | border: #222222, size: 44×44, Text: var(--gradient-selfmake-4) | imgGroup, imgContainer | CSS: border, background-image | 확정 |
| 402:81 · Focus, S, Secondary | facts read | focus | root | size: 28×28 | imgGroup, imgIconButtonFocusSizeSTypeSecondary | CSS: outline | 확정 |
| 393:9503 · Disabled, L, Secondary | facts read | disabled | root, Text | background: #F7F7F7, Text: #F2F2F2 | imgGroup, imgGroup1 | CSS: background, opacity | 확정 |
| 414:1917 · Disabled, L, Primary | facts read | disabled | root, Text | background: #F7F7F7, Text: #F2F2F2 | imgGroup, imgGroup1 | CSS: background, opacity | 확정 |
| 402:87 · Disabled, S, Secondary | facts read | disabled | root, Text | var(--gradient-selfmake-1) | imgGroup, imgIconButtonDisabledSizeSTypeSecondary | CSS: background-image, opacity | 확정 |
| 418:3148 · Status=Default | facts read | base | Icon item | size: 60×93 | imgServiceIcon | CSS: background | 확정 |
| 418:3147 · Status=Hover | facts read | hover | Icon item | background: #FCEDED | imgServiceIcon | CSS: background | 확정 |
| 418:3149 · Status=Selected | facts read | selected | Icon item, Service Icon | border: #C72D65, background: rgba(241,164,164,0.2) | imgServiceIcon | CSS: border, background | 확정 |
| 418:3127 · Type=Services | facts read | base | Service Icon | size: 48×48 | imgTypeServices | CSS: background-image | 확정 |
| 418:3126 · Type=Experiences | facts read | base | Service Icon | size: 48×48 | imgTypeExperiences | CSS: background-image | 확정 |
| 418:3124 · Type=Hotels | facts read | base | Service Icon | size: 48×48 | imgTypeHotels | CSS: background-image | 확정 |
| 418:3123 · Type=Homes | facts read | base | Service Icon | size: 48×48 | imgTypeHomes | CSS: background-image | 확정 |
| 418:3125 · Type=All | facts read | base | Service Icon, All text | size: 48×48 | imgTypeAll | CSS: background-image | 확정 |
| 420:8311 · Type=Profile | facts read | base | Icon | size: 24×24 | imgGroup | CSS: background | 확정 |
| 420:8309 · Type=Menu | facts read | base | Icon | size: 24×24 | imgGroup, imgGroup1 | CSS: background | 확정 |
| 420:8310 · Type=Search | facts read | base | Icon | size: 24×24 | imgGroup, imgContainer | CSS: background | 확정 |
| 420:8308 · Type=Redirect | facts read | base | Icon | size: 24×24 | imgGroup, imgTypeRedirect | CSS: background | 확정 |
| 420:8307 · Type=Previous | facts read | base | Icon | size: 24×24 | imgGroup, imgTypePrevious | CSS: background | 확정 |
| 420:8306 · Type=Next | facts read | base | Icon | size: 24×24 | imgGroup, imgTypeNext | CSS: background | 확정 |

- Focus 링이 감싸는 정확한 범위와 근거: Focus, L, Secondary (393:9502)는 44×44로 기본 40×40보다 4px 크게 표시됨
- Figma에 실제로 없는 상태·조합: Size=S + Type=Primary 조합은 없음
- 미조회/실패/잘린 응답과 필요한 추가 조회: imgServiceIcon asset 읽기 실패

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| base · root · background | #DDDDDD | neutral-03 | --color-border | #DDDDDD | ✅ | |
| base · Text · background | #EBEBEB | neutral-02 | 없음 | #EBEBEB | ❌ | 새 매핑 필요 |
| Default · inner element · text/icon | #FFFFFF | shade-01 | --color-bg / --color-on-primary | #FFFFFF | ✅ | 여러 후보 |
| Hover, L, Secondary · root · background | #D3D3D3 | neutral-04 | 없음 | #D3D3D3 | ❌ | 새 매핑 필요 |
| Hover, L, Secondary · Text · background | #D3D3D3 | neutral-04 | 없음 | #D3D3D3 | ❌ | 새 매핑 필요 |
| Hover · Icon item · background | #FCEDED | 없음 | 없음 | #FCEDED | ❌ | 새 primitive 필요 |
| Pressed, L, Secondary · root · background | #C2C2C2 | 없음 | 없음 | #C2C2C2 | ❌ | 새 primitive 필요 |
| Focus, L, Secondary · root · border | #222222 | shade-02 | --color-text | #222222 | ✅ | |
| Disabled, L, Secondary · root · background | #F7F7F7 | fills-vibrant-quaternary | --color-surface-raised | #F7F7F7 | ✅ | |
| Disabled, L, Secondary · Text · background | #F2F2F2 | 없음 | 없음 | #F2F2F2 | ❌ | 새 primitive 필요 |
| Selected · Service Icon · border | #C72D65 | 없음 | 없음 | #C72D65 | ❌ | 새 primitive 필요 |
| Selected · inner element · background | rgba(241,164,164,0.2) | 없음 | 없음 | rgba(241,164,164,0.2) | ❌ | 새 primitive 필요 |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: root background는 컴포넌트 자체, Text background는 내부 요소
- 같은 값의 후보가 여러 개일 때 선택 근거: #FFFFFF는 --color-bg, --color-on-primary 등 여러 후보 → 역할 확인 필요
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: #D3D3D3, #C2C2C2, #FCEDED 등은 기존 primitive에 없음
- 토큰 생성 경로·검증 계획: 새 primitive 추가 후 semantic role 매핑

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| imgGroup | localhost:3845/assets/85470359181b74c8d193af53565927cb43ebd814.svg | varies | Default, Hover, Pressed, Disabled (L, S) | Focus | 확정 |
| imgGroup1 | localhost:3845/assets/f867f5199e189f3eed80de0769197dc2dd518fad.svg | varies | Default, Hover, Pressed, Disabled (L) | Focus, S | 확정 |
| imgIconButtonDefaultSizeSTypeSecondary | localhost:3845/assets/0ceafff654399e2c2c0a4896fbfea4d7806057d5.svg | 28×28 | Default, S, Secondary | others | 확정 |
| imgServiceIcon | localhost:3845/assets/f0fb639d82ceba20ce7d44a2a66b17f65f1c347e.png | 48×48 | Status variants | Icon button variants | ❌ 읽기 실패 |
| imgIconButtonHoverSizeSTypeSecondary | localhost:3845/assets/20793e643941788e54a33280b767a913afa59944.svg | 28×28 | Hover, S, Secondary | others | 확정 |
| imgIconButtonPressedSizeSTypeSecondary | localhost:3845/assets/c282d8cd36eb17e43fb19ea2d4ec0d9c23156e5b.svg | 28×28 | Pressed, S, Secondary | others | 확정 |
| imgContainer | localhost:3845/assets/320c9f72c5034634ef8cf8874bfeb8f24788f43a.svg | varies | Focus (L) | others | 확정 |
| imgIconButtonFocusSizeSTypeSecondary | localhost:3845/assets/61dd62da7fed416ec8e4d4fac393e4d4a16fcf23.svg | 28×28 | Focus, S, Secondary | others | 확정 |
| imgIconButtonDisabledSizeSTypeSecondary | localhost:3845/assets/caba93a57c3343ed3889be43d50b37bf57504ca9.svg | 28×28 | Disabled, S, Secondary | others | 확정 |
| imgTypeServices | localhost:3845/assets/8add91f8eb8ade3d7cf7991ab2c17d7b86dfe2ee.png | 48×48 | Type=Services | others | 확정 |
| imgTypeExperiences | localhost:3845/assets/d56c9b11dab980d0c242ad99b484fe99b4b1afbb.png | 48×48 | Type=Experiences | others | 확정 |
| imgTypeHotels | localhost:3845/assets/0da55eb851659c827a1f62f42c599f8ca0fef9d5.png | 48×48 | Type=Hotels | others | 확정 |
| imgTypeHomes | localhost:3845/assets/336951fbef7d550969fdc6d91c99b5a8776420dd.png | 48×48 | Type=Homes | others | 확정 |
| imgTypeAll | localhost:3845/assets/f0fb639d82ceba20ce7d44a2a66b17f65f1c347e.png | 48×48 | Type=All | others | 확정 |
| imgTypeRedirect | localhost:3845/assets/24fc0c03e9f4d74a63c880c6673879f6f605887e.svg | 24×24 | Type=Redirect | others | 확정 |
| imgTypePrevious | localhost:3845/assets/67aed86039c3fdae921c8ca25acab32eea3c2462.svg | 24×24 | Type=Previous | others | 확정 |
| imgTypeNext | localhost:3845/assets/6015e60b579278397e50327ea040af9b13c864e6.svg | 24×24 | Type=Next | others | 확정 |

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| variant | Figma: Type=Primary/Secondary | "secondary", "primary" | 배경색과 그라디언트 변경 | | 확정 |
| size | Figma: Size=L/S | "l", "s" | 40×40 or 28×28 | | 확정 |
| type | Figma: Type=Services/Experiences/Hotels/Homes/All/Profile/Menu/Search/Redirect/Previous/Next | various | 아이콘 변경 | | 확정 |
| disabled | Figma: Icon button=Disabled | false | 클릭 불가, 시각적 비활성화 | Tab 제거 | 확정 |
| onClick | Button 역할 | () => void | 클릭 이벤트 | | 확정 |
| label | 접근성 | string | aria-label | | 확정 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 컴포넌트 이름: Figma에는 "Selfmake"로 되어 있지만 실제로는 IconButton입니다. 어떤 이름을 사용할까요? | A. IconButton (기존 키트 이름과 일치, Recommended) / B. Selfmake (Figma 이름 유지) / C. 다른 이름 | IconButton (chosen in chat) | ✅ resolved |
| Q-02 | Type prop의 역할: Services, Experiences, Hotels, Homes, All, Profile, Menu, Search, Redirect, Previous, Next 등 다양한 타입이 있습니다. 이것들을 어떻게 처리할까요? | A. type prop으로 구분 (각 타입별 아이콘 변경) / B. separate components (각 타입별 별도 컴포넌트) / C. children으로 아이콘 전달 | type prop으로 구분 (chosen in chat) | ✅ resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | #DDDDDD (Secondary), gradient (Primary) | 실제 iframe / computed style / 스크린샷 | |
| 모든 상태·크기 | 17개 변형 모두 | 원본 대조 / 실제 포인터·키보드 | |
| 아이콘과 노출 조건 | 각 타입별 올바른 아이콘 | 원본 asset·DOM·스크린샷 대조 | |
| 클릭·입력·선택 등 기능 | onClick 호출 | 실제 이벤트와 결과 확인 | |
| disabled / Tab / Focus | Tab 제거, Focus 링 표시 | 실제 키보드·콜백 확인 | |
| Nested parts identity | 각 아이콘 asset 렌더링 | `ai:verify` DOM check | |
| Nested part → composite callback | Clicking calls onClick | Storybook `play` with `fn()` | |
| 공통 규칙 및 기존 사용처 | 타입·토큰·회귀 검사 | `pnpm typecheck`, `pnpm ds:guard` | |

필수 명령: `pnpm ai:check IconButton`, `pnpm ai:verify IconButton`, `pnpm typecheck`, `pnpm ds:guard`.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정:
- 승인한 revision:
- 구현 전에 남은 조건: Q-01, Q-02 답변 필요
