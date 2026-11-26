---
kind: component
component: PhotoGallery
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-4767&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — PhotoGallery (큰 사진 1 + 작은 사진 4 + "사진 모두 보기")

> 작성: Claude Code(에이전트 C), 2026-11-26. 근거: 사용자 요청 "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘"와 같은 날의 결정 "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)"(chosen in chat). Q&A 는 같은 날 사용자 결정 "추천안 모두 채택 (권장)", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지 (권장)", "Button 에 공용 모양 추가 (권장)"(chosen in chat, 리드 전달 `rebuild-update.md`)으로 모두 답을 받았다. 계획 승인은 아직이다. 사용자 승인 전 구현 파일을 만들지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Detail 페이지 사진 구역(큰 사진 1장, 작은 사진 4장, 마지막 사진 위 "사진 모두 보기" 버튼)을 Storybook 부품 `PhotoGallery` 로 만든다. 버튼은 공용 `Button` 의 새 `variant="ghost"`(Buttons revision 2, 에이전트 F)를 쓴다. 페이지 교체는 이 계획 범위 밖.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`(재생성본)
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, 812:4767 "Container"(80,187 · 1280×567.30).
  - 구조: `my-website/figma/Detail.layers.xml`(2026-11-25 저장본) — 812:4768 > 812:4769(1280×640) > 열 3개: 812:4770(640) 안 "Button - Kalani’s guesthouse TAHAA 이미지 1" 812:4771(640×567.30) > Image 812:4772; 812:4773 > 812:4774(x 9.14, 310.86×567.30) 안 이미지 2 버튼 812:4775(310.86×283.64) · 812:4777 > 이미지 3 버튼 812:4778(y 9.14, 310.86×274.5); 812:4780 > 812:4781 안 이미지 4 버튼 812:4782 · 812:4784 > 이미지 5 버튼 812:4785. 버튼 "Button" 812:4787(1116.09,503.30 · 136.48×36.57) > "Text" 812:4788(18.29,9.14 · 100.86×19) > "Container" 812:4789(18.29×18.29, 아이콘) + text "사진 모두 보기" 812:4791(x 22.86, 78×19).
  - MCP 직접 조회(이 에이전트 공용, 2026-11-26): `get_variable_defs 812:393` — 이 페이지 변수 목록에 "Fills - Vibrant (Use Plus Lighter | Darker)/Tertiary" #f2f2f2, `sds-typography-weight-medium` 500 이 있음. 리드가 Fills - Vibrant/Tertiary 를 가져왔다(`rebuild-update.md`: "now imported, it IS a Figma variable").
- 현재 페이지(참조 모양): git-demo `aa9a593`, `my-website/pages/DetailPage.tsx` 140–184행, `DetailPage.css` 224–302행. 1440×900 Playwright 측정(2026-11-26).
- 대상 코드·토큰 기준: `aa9a593` 작업 폴더, `src/tokens/tokens.css`. 색 역할은 리드가 토큰 계획 revision 6 에 모은다.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | PRD 3절 "1 big photo and 4 small photos with round outer corners, a '사진 모두 보기' button on the last photo" | 숙소 사진 묶음 미리보기 | Q-01 추천안 채택 |
| 누를 수 있는 영역 | Figma: 사진 5장 각각 "Button - … 이미지 N", 812:4787 "Button". 페이지: 사진은 `<img>`, "사진 모두 보기"만 `<button>`(type 없음) | "사진 모두 보기" 버튼 하나(`Button variant="ghost"`). 사진은 그냥 사진 | Q-02 추천안 채택 |
| 클릭/선택/열림 동작 | PRD 4절 "Photos, '사진 모두 보기': nothing, just shows it" | `Button` 의 `onClick` 에 `onShowAllClick` 을 넘김 | Q-07 추천안 채택 |
| 키보드·포커스 범위 | 페이지: 제목 버튼 2개 다음 Tab 3번째, 브라우저 기본 링 | 버튼 하나만 Tab. focus 모양은 Button ghost(F) | Q-06 추천안 채택 |
| disabled 동작 | 없음 | 넘기지 않음 | Q-07 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 부품 조사(R05) — 계획 작성 시점의 현재 API 기준:

| 후보 | 현재 공개 API | 역할 | 모양 | 판정 |
|---|---|---|---|---|
| `Button` primary/secondary/tertiary · small | 91×48, 13pt 590, padding 16/24 | 동작 버튼 → 일치 | 불일치(바탕·크기·글자) | 현재 variant 는 못 씀 → 사용자 결정 4 로 새 `variant="ghost"`(회색 #F2F2F2 둥근 버튼)를 F 가 더함 |
| `ListingCard`, `Card` | 카드 | 불일치 | 불일치 | 쓰지 않음 |
| `Icon` | add·close·search 만 | — | 격자 아이콘 없음 | 쓰지 않음(원본 SVG 를 부품 안 `<svg>` 로 그려 `Button` 의 `icon` 에 넘김) |

- 사용자 결정 4: "사진 모두 보기"는 공용 `Button variant="ghost"` 를 쓴다. 이 부품은 버튼 바탕·글자·hover 를 그리지 않고, `.ds-button*` 를 선택하거나 `className`·`style` 을 넘기지 않는다(R05). 사진 위 위치(오른쪽 28 · 아래 27)만 자기 래퍼 `ds-photo-gallery__show-all` 로 정한다.
- 변경할 파일(승인 뒤): `src/components/PhotoGallery/PhotoGallery.tsx`·`.css`·`.stories.tsx`·`index.ts`(새로). Figma 원본 Component 가 없어 Code Connect 없음(G11 경고).
- 의존: Buttons revision 2(`variant="ghost"`)가 승인·구현돼야 이 부품을 구현할 수 있다.
- 사진 파일: `my-assets/images/detail-photo-1.png`~`detail-photo-5.png`(1200×900, 720×958, 720×1019, 720×960, 720×960). 부품은 주소를 props 로 받고, 페이지가 `imageUrl("detail-photo-N")` 로 넘긴다(P10). 스토리도 같은 파일 주소를 쓴다.
- 영향받는 기존 사용처: 없음(새 부품).

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (frame 812:4771·4775·4778·4782·4785 "Button - … 이미지 N") | — | — | 812:4767 | none — 이 부품 안 `<img>` 5장, 주소·alt 는 props(Q-02·Q-03) | confirmed |
| — (frame 812:4787 "Button", 사진 모두 보기) | — | — | 812:4767 | Button { variant="ghost" size="medium" icon={격자 `<svg>`} onClick={onShowAllClick} children="사진 모두 보기" } — Buttons revision 2 §12.7(F), 5절 모양 | confirmed |

- Confirmed absence of nested instances and evidence: `Detail.layers.xml` 812:4767 아래는 모두 frame/text 다. 문서 전체 `<instance>` 는 812:4703 Navigation, 812:8724 Card 뿐이다. Button 행은 Figma 인스턴스가 아니라 사용자 결정 4 로 쓰는 키트 부품이다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:4767 기본 | layers.xml + 페이지 측정 | 기본 | 전체 | 기준(아래 표) | 격자 아이콘 | 기본 렌더 | 확정(Q-01) |
| (페이지만) 버튼 hover | 페이지 CSS `:hover` #E8E8E8 → 결정 2 표로 #EBEBEB | 포인터 올림 | 버튼 | 바탕 `control-bg-subtle-hover` | 같음 | `Button variant="ghost"` 의 `:hover`(F) | 확정(Q-05 → 결정 2) |
| (페이지만) 버튼 focus | 측정: 브라우저 기본 outline | 키보드 포커스 | 버튼 | — | 같음 | `Button variant="ghost"` 의 `:focus-visible`(F) | 확정(Q-06) |

- Figma에 실제로 없는 상태: pressed·disabled, 사진 hover. 만들지 않는다.
- 사실 공백 없음: 812:4787 의 바탕 변수 연결은 조회하지 않았지만(design-context 조회 불가), 사용자 결정 2 표가 #F2F2F2 → `control-bg-subtle`(Figma 변수 Fills - Vibrant/Tertiary)로 정해 공백을 메운다. 글자 13.7px 는 결정 3 으로 값이 정해졌다.
- AI 해석(근거): Figma 사진 구역은 8/7 배율 캡처로 보인다(간격 9.14 = 8×8/7, 아이콘 18.29 = 16×8/7, 글자 13.7 ≈ 12×8/7). 결정 3 "지금 크기·자간 유지"에 따라 페이지 값을 그대로 쓴다.

### 크기·간격 (현재 페이지 값 → CSS)

| 요소 | 페이지 측정(1440) | Figma | 누가 그리나 / CSS(정확한 값) |
|---|---|---|---|
| 묶음 | 1280×567 at (80,191), 바깥 모서리 14, 넘침 숨김 | 1280×567.30 | PhotoGallery: `width: calc(var(--spacing) * 320)`, `height: calc(var(--spacing) * 141.75)`, `border-radius: calc(var(--radius-sm) * 3.5)`, `overflow: hidden` |
| 열 사이·위아래 사이 | 9 | 9.14 | PhotoGallery: `gap: calc(var(--spacing) * 2.25)` |
| 큰 사진 | 640×567, `object-fit: cover` | 640×567.30 | PhotoGallery: `calc(var(--spacing) * 160)` |
| 작은 사진 열 | 311 폭 2개 | 310.86 | PhotoGallery: `calc(var(--spacing) * 77.75)` |
| 위 사진 2·4 | 311×284 | 310.86×283.64 | PhotoGallery: `height: calc(var(--spacing) * 71)` |
| 아래 사진 3·5 | 311×274.5(합계 567.5, 넘친 0.5 는 잘림) | 310.86×274.5 | PhotoGallery: `height: calc(var(--spacing) * 68.625)` |
| 버튼 위치 | 오른쪽 28 · 아래 27 | 오른쪽·아래 27.43 | PhotoGallery 래퍼 `ds-photo-gallery__show-all`: `position: absolute; right: calc(var(--spacing) * 7); bottom: calc(var(--spacing) * 6.75)` |
| 버튼(공용 ghost 모양) | 136×37, padding 0/16(내용은 왼쪽부터, 내용 폭 100.94 → 오른쪽 남는 폭 19.06), 모서리 9, 앞 아이콘 18×18, 아이콘–글자 4.6 | 136.48×36.57 | **Button(F)**: `width: calc(var(--spacing) * 34)`, `height: calc(var(--spacing) * 9.25)`, `padding: 0 calc(var(--spacing) * 4)`, `border-radius: calc(var(--radius-sm) * 2.25)`, 아이콘 `calc(var(--spacing) * 4.5)`, `gap: calc(var(--spacing) * 1.15)` |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 버튼 글자·격자 아이콘 | #222222(페이지 CSS, asset fill) | shade-02 | `text` | #222222 | 일치 | Button ghost(F) 가 칠함, 아이콘 currentColor |
| 버튼 바탕 | #F2F2F2(페이지 측정) / Figma 변수 Fills - Vibrant (Use Plus Lighter \| Darker)/Tertiary | fills-vibrant-use-plus-lighter-darker-tertiary(리드가 가져옴) | `control-bg-subtle`(새 역할, 결정 2 표) | #F2F2F2 | 일치 | Button ghost(F). 리드가 토큰 계획 revision 6 에 기록 |
| 버튼 hover 바탕 | 페이지 #E8E8E8 → 결정 2 표로 **#EBEBEB** / Neutral 02 | neutral-02 | `control-bg-subtle-hover`(새 역할, 결정 2 표) | #EBEBEB | 결정 2 로 값 변경(페이지보다 3 밝아짐) | Button ghost(F) |

- 컴포넌트 fill 과 부모 배경: 묶음 자체는 투명, 페이지 배경 #FFFFFF. 버튼은 사진 위에 놓인다. 이 부품이 직접 쓰는 색 토큰은 없다.

### 글자 (현재 페이지 값 → 토큰)

| 요소 | 페이지 값 | 토큰(결정 3) | 그리는 곳 |
|---|---|---|---|
| 사진 모두 보기 | 13.7px / 500 / 줄 20.55(=13.7×1.5) | 크기 `calc(var(--spacing) * 3.425)`(=13.7px, 결정 3 "지금 크기 유지, `calc(var(--spacing) * n)`"), 굵기 `--font-weight-medium`(500, 결정 2 표), 줄 `--leading-normal` | Button ghost(F) |

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 격자 아이콘 / 812:4789 "Container" 18.29×18.29 | `my-assets/images/detail-icon-show-all.svg`(g id "Container"), 점 9개 path `M3.42857 13.1429C3.88323 … Z`, fill-rule evenodd | viewBox 0 0 18.2857 18.2857, fill #222222, 회전 없음. 페이지는 18×18 | 기본·hover·focus | — | 확인 |
| 사진 1~5 / 812:4772·4776·4779·4783·4786 | `my-assets/images/detail-photo-1.png`~`5.png` | 칸을 `object-fit: cover` 로 채움 | 항상 | — | 확인 |

- 그리는 방법: 격자 아이콘은 원본 path 를 이 부품 안 `<svg>` JSX(`fill="currentColor"`, `aria-hidden="true"`)로 옮겨 `Button` 의 `icon` prop 으로 넘긴다(ListingTitle Q-04 와 같은 원칙).

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `photos` | PRD "1 big photo and 4 small photos", 812:4771~4785 | 필수, 정확히 5개 `{ src: string; alt: string }`(타입으로 5개 고정) | 1번 = 큰 사진, 2·3 = 가운데 열 위·아래, 4·5 = 오른쪽 열 위·아래 | — | Q-07 추천안 채택 |
| `showAllLabel` | 812:4791 | "사진 모두 보기" | `Button` children(=이름) | — | Q-07 추천안 채택 |
| `onShowAllClick` | PRD "nothing, just shows it" | 없음 / `(event) => void` | `Button` 의 `onClick` 으로 전달, 클릭 시 호출만 | `Button`(`type="button"`), Tab·Enter·Space | Q-07 추천안 채택 |
| `labelLang` | ListingTitle Q-06 과 같은 문제 | 없음 / 예 "ko" | 라벨을 `<span lang>` 으로 감싸 `Button` children 으로 넘김 | — | Q-06 추천안 채택 |
| 크기 | 1440 화면 전용(좁은 화면은 범위 밖) | 1280×567 고정(5절) | — | — | Q-07 추천안 채택 |
| 최상위 | 키트 규칙 | `data-testid="ds-photo-gallery"`, 클래스 `ds-photo-gallery` | — | — | Q-01 추천안 채택 |

- 사진 alt(Q-03): 1번 "Dining room"(페이지 계획 `docs/plans/pages/Airbnb.md`), 2~5번 Figma 레이어 이름 "Kalani’s guesthouse TAHAA 이미지 2"~"Kalani’s guesthouse TAHAA 이미지 5". 페이지가 `photos` 로 넘기고, 스토리 기본값도 같다.

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 부품 구성과 Nested parts. "사진 모두 보기"는 기존 Button 의 어느 variant 와도 모양이 다름 | A 부품 안에서 `<img>` 5장 + `<button>` 을 그림. / B 공용 `Button` 에 이 모양 variant 를 더하는 revision 뒤 사용 | 사용자 결정 4 "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26) → B: `Button variant="ghost"`(Buttons revision 2, 에이전트 F). 사진은 부품 안 `<img>`(추천안 채택) | resolved |
| Q-02 | 사진 5장을 누를 수 있게 할지 | A 그냥 사진. / B 사진마다 버튼 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | 사진 alt | A 1번 "Dining room", 2~5번 Figma 이름. / B 그대로. / C 사용자 작성 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | 버튼 글자 13.7px 토큰 없음 | A Figma 글자 스타일 추가 후 가져오기. / B 13px. / C `calc(var(--spacing) * 3.425)` | 사용자 결정 3 "지금 크기·자간 유지 (권장)" (chosen in chat, 2026-11-26) → C: `calc(var(--spacing) * 3.425)`. 굵기 500 → `--font-weight-medium`(결정 2 표). Button ghost 안에서 씀 | resolved |
| Q-05 | 버튼 바탕 #F2F2F2·hover #E8E8E8 의 색 역할 | A 둘 다 유지(새 역할 2개). / B hover 없앰 | 사용자 결정 2 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → #F2F2F2 = `control-bg-subtle`(Fills - Vibrant/Tertiary), hover #E8E8E8 → #EBEBEB `control-bg-subtle-hover`(neutral-02). Button ghost 안에서 씀 | resolved |
| Q-06 | focus 모양과 한국어 라벨 lang | A ListingTitle Q-03·Q-06 과 같은 답. / B 따로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). focus 는 Button ghost(F) | resolved |
| Q-07 | 공개 API: `photos` 5개, `showAllLabel`, `onShowAllClick`, 1280×567 고정 | A 8절 그대로. / B 폭 유동 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 5절 표의 페이지 값(사진 5칸 위치·크기, 바깥 모서리 14, 버튼 136×37 at 오른쪽 28·아래 27), 흰 배경 | Storybook iframe box·computed style, 페이지 스크린샷 대조 | |
| 상태 | hover 바탕 #EBEBEB, focus 링 보임(Button ghost) | Playwright 실제 포인터 hover·Tab | |
| 아이콘·사진 | 격자 아이콘 원본 path 18×18, 사진 5장 깨짐 없음(naturalWidth > 0), alt 가 8절 | DOM·asset 대조 | |
| Nested parts identity | 루트 안에 `data-testid="ds-button"` 1개 | `ai:verify` DOM 검사 | |
| Nested part → callback | "사진 모두 보기" 클릭 → `onShowAllClick` 1회 | `play`: `fn()` + `userEvent.click` | |
| Tab / Focus | 버튼 하나만 Tab | `play` `userEvent.tab()` | |
| 공통 규칙 | 토큰만 사용, `.ds-button*` 선택 없음 | `pnpm ai:check PhotoGallery`, `pnpm ai:verify PhotoGallery`, `pnpm typecheck`, `pnpm ds:guard` | |

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 열린 질문 → A: "추천안 모두 채택 (권장)"; Q: Figma 변수가 아닌 값 → A: "Figma 스타일 값으로 맞춤"; Q: 글자 크기·자간 → A: "지금 크기·자간 유지 (권장)"; Q: 공용 버튼 → A: "Button 에 공용 모양 추가 (권장)" (모두 chosen in chat, 2026-11-26).
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 이 계획 revision 1 승인, Buttons revision 2(`variant="ghost"`, 5절 크기 포함)의 승인·구현, 토큰 계획 revision 6(`control-bg-subtle`, `control-bg-subtle-hover`) 적용.
