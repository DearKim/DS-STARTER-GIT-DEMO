---
kind: component
component: ListingOverview
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-11134&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — ListingOverview (숙소 요약: 종류 줄 · Guest favourite · 하이라이트 · 호스트)

> 작성: Claude Code(에이전트 C), 2026-11-26. 근거: 사용자 요청 "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘"와 같은 날의 결정 "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)"(chosen in chat). Q&A 는 같은 날 사용자 결정 "추천안 모두 채택 (권장)", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지 (권장)", "Button 에 공용 모양 추가 (권장)"(chosen in chat, 리드 전달 `rebuild-update.md`)으로 모두 답을 받았다. 계획 승인은 아직이다. 사용자 승인 전 구현 파일을 만들지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Detail 페이지 본문 왼쪽 열의 윗부분(숙소 종류 제목과 인원 줄, Guest favourite 상자, 하이라이트 4개, 호스트, "Learn more about summaries")을 Storybook 부품 `ListingOverview` 로 만든다. 같은 열의 번역 안내·설명(812:11223 · 812:11231)은 에이전트 D 의 `ListingDescription`, 침실 사진(812:11238)은 D 의 `SleepSection`, 오른쪽 예약 상자는 D 의 `Card` type reservation 이 맡는다. 두 열 배치는 페이지가 한다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`(재생성본)
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, 왼쪽 열 812:11134(80,0 · 653×1417) 중 첫 세 자식.
  - 구조: `my-website/figma/Detail.layers.xml`(2026-11-25 저장본) — "Section" 812:11135(653×114): "Heading 2" 812:11136(y 32, h 26) > text 812:11137, "Container:margin" 812:11138(y 58, h 24) > "Numbered List" 812:11139(y 4, h 20) > text 4개 812:11140~11143. "Button" 812:11144(y 114, 653.33×101) > Container 812:11145(644.58×89) > 812:11146(x 27 y 23): "Image - Top guest favourite" 812:11147(월계수 812:11148 20.25×36 · 글자 칸 812:11149 77×40 > text "Guest favourite" 812:11150 · 월계수 812:11151 23.64×36), 설명 812:11152(x 148.89, 265×43) > text 812:11153; 숫자 812:11154(x 464.89, 58×42: "4.98" 812:11155 + 별 5개 812:11157~11165 각 10×10 간격 12); 세로선 812:11167(x 546.89, 0.69×40); 812:11168("487" 812:11169 + "Reviews" 812:11170). "Section" 812:11171(y 215, 653×410).
  - MCP 직접 조회 2회(2026-11-26, 캐시 아님): `get_variable_defs 812:393`(페이지 변수 목록), `get_design_context 812:11171`(하이라이트 구역 코드 + 스크린샷, 이 계획의 Figma 값 근거).
- 현재 페이지(참조 모양): git-demo `aa9a593`, `my-website/pages/DetailPage.tsx` 185–354행(`.page-Detail__info`), `DetailPage.css` 312–541행. 1440×900 Playwright 측정(2026-11-26).
- 대상 코드·토큰 기준: `aa9a593` 작업 폴더, `src/tokens/tokens.css`. 색 역할은 리드가 토큰 계획 revision 6 에 모은다.

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | PRD 3절 "Summary (left)" 항목 전체 | 숙소 요약 정보 묶음(보여 주기 위주) | Q-01 추천안 채택 |
| 누를 수 있는 영역 | Figma 이름: Guest favourite 상자 812:11144 "Button", 호스트 사진 812:11204 "Button - 준구 is a superhost. Learn more about 준구.", 정보 아이콘 812:11218 "Button - Learn more about summaries". 페이지: 셋 다 `<div>`/`<img>` 라 Tab 에 안 잡힘 | PRD 가 동작을 적은 "Learn more about summaries" 만 버튼(공용 `Button variant="text"`, 아이콘+글자). Guest favourite 상자·호스트 사진은 그냥 보여 줌 | Q-02 추천안 채택, Q-03 → 결정 4 |
| 클릭/선택/열림 동작 | PRD 4절 "Summary, 'Learn more about summaries': nothing, just shows it" | `Button` 의 `onClick` 에 `onLearnMoreClick` 을 넘김 | Q-03 → 결정 4 |
| 키보드·포커스 범위 | Figma 에 focus 모양 없음 | 이 부품 안 Tab 은 Learn more 하나. focus 모양은 Button text(F) | Q-03 → 결정 4 |
| disabled 동작 | 없음 | 넘기지 않음 | Q-08 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 부품 조사(R05):

| 요소 | 후보 | 판정과 근거 |
|---|---|---|
| 인원 줄 "4 guests · 2 bedrooms · 2 beds · 2 bathrooms" | `Text { as="p" variant="body" }` | **사용**. body = 16px / 400 / 줄 1.5(24px) / `--color-text`. 페이지는 span 줄 높이 20 이지만 부모 줄 상자가 24 라 실제 높이 24(측정: 제목 묶음 118 = 32+26+4+24+32). 글꼴 `--font-sans` 도 페이지와 같은 `.SF NS` |
| 제목 22px/590, 숫자, Guest favourite 18px/590, 설명 16/400/20, 하이라이트 14/590·14/400 줄 20, 12/400 | `Text` | 쓰지 않음 — variant 3개(16/400/1.5, 14/400/1.5, 20/500/1.25)와 크기·굵기·줄 높이가 다름 |
| Guest favourite 상자 | `Card`(type), `Callout` | 쓰지 않음 — Figma 812:11144 는 Card/Callout 인스턴스가 아닌 frame, 모양도 다름 |
| Learn more | `Link` small / 현재 `Button` | 현재 API 로는 맞지 않음 → 사용자 결정 4 로 새 `Button variant="text"`(F)를 씀 |
| 별·정보 아이콘 | `Icon` | 쓰지 않음 — add·close·search 만. 원본 SVG 를 부품 안 `<svg>` 로 그림(정보 아이콘은 `Button` 의 `icon` 으로 넘김) |

- **Learn more 에 필요한 모양과 공용 text 모양의 차이(F 에게 전달):** 밑줄 없음, 글자 12px/400/줄 16, 글자·아이콘 색 `text-secondary`(#717171, 결정 2 표), padding·바탕·hover 없음, 앞 아이콘 16×16, 아이콘–글자 36(아이콘이 40 칸 가운데 + 칸–글자 24 = 12+24). 이 부품은 버튼을 줄 왼쪽에서 12 들여 놓는다(래퍼 `ds-listing-overview__learn-more`). 공용 text 모양이 밑줄·#222·다른 간격을 쓰면 페이지 모양과 달라진다 → F 의 Buttons revision 2 가 담거나 F/리드가 사용자에게 확인한다.
- 변경할 파일(승인 뒤): `src/components/ListingOverview/ListingOverview.tsx`·`.css`·`.stories.tsx`·`index.ts`(새로). Figma 원본 Component 없음 → Code Connect 없음(G11 경고).
- 의존: Buttons revision 2(`variant="text"`)가 승인·구현돼야 이 부품을 구현할 수 있다.
- 그림 파일은 props 로 받는다(페이지가 `imageUrl()` 로 넘김, P10): `detail-laurel-left.png`·`detail-laurel-right.png`(54×96), `detail-highlight-top/near/kitchen/cleanliness.png`(120×120), `detail-host-avatar.png`(120×80), `detail-icon-superhost.svg`.
- 영향받는 기존 사용처: 없음(새 부품). `Text`·`Button` 은 공개 API 로만 씀.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (인원 줄 812:11139 "Numbered List") | — | — | 812:11135 | Text { as="p" variant="body" tone="default" } | confirmed |
| — (제목·Guest favourite·숫자·하이라이트·호스트 글자) | — | — | 812:11135 · 812:11144 · 812:11171 | none — 이 부품 안 글자로 그린다(Text variant 에 해당 크기·굵기·줄 높이 없음, 3절) | confirmed |
| — (frame 812:11144 "Button", Guest favourite 상자) | — | — | 812:11144 | none — 이 부품 안 상자(Card·Callout 인스턴스 아님, 누를 수 없음 Q-02) | confirmed |
| — (frame 812:11218 "Button - Learn more about summaries" + text 812:11222) | — | — | 812:11171 | Button { variant="text" size="xsmall" tone="secondary" icon={정보 `<svg>`} onClick={onLearnMoreClick} children="Learn more about summaries" } — Buttons revision 2 §12.7(F), 3절 모양 | confirmed |

- Confirmed absence of nested instances and evidence: `Detail.layers.xml` 812:11135·812:11144·812:11171 아래는 모두 frame/text 이고, `get_design_context 812:11171` 코드에도 인스턴스가 없다. 문서 전체 `<instance>` 는 812:4703 Navigation, 812:8724 Card 뿐이다. Text·Button 행은 Figma 인스턴스가 아니라 키트 부품 사용이다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 812:11135 + 812:11144 + 812:11171 기본 | layers.xml, get_design_context 812:11171, 페이지 측정 | 기본 | 전체 | 기준(아래 표) | 별 5·정보·배지·그림 | 기본 렌더 | 확정(Q-01) |
| Learn more focus | Figma·페이지 모두 없음(Q-03) | 키보드 포커스 | 버튼 | Button text(F) 의 focus | 정보 | `Button` 의 `:focus-visible` | 확정(결정 4) |

- Figma에 실제로 없는 상태: hover·pressed·disabled. 만들지 않는다. 페이지에도 이 구역의 hover 는 없다(측정: Learn more hover 바탕 투명).
- 미조회: 812:11144 상자의 테두리 색·모서리(노드별 조회 안 함, design-context 조회 불가 — 리드 안내). 페이지 값(#DDDDDD 1px, 12)이 Figma 변수 Neutral 03 · Corner/Medium 12 와 같아 결정 2·3 으로 메워진다.

### 크기·간격 (현재 페이지 값 → CSS)

| 요소 | 페이지 측정(1440, 부품 폭 653 at x 160) | Figma | CSS(토큰 식) |
|---|---|---|---|
| 제목 묶음 | padding 위아래 32, 높이 118 | 812:11135 높이 114(제목 아래 여백 4 없음) | `padding: calc(var(--spacing) * 8) 0` |
| 제목 `<h2>` | 653×26 at y 870, 아래 4 | h 26 | `margin: 0 0 calc(var(--spacing) * 1)` |
| 인원 줄 | 줄 상자 24 | 812:11138 h 24 | `Text` body |
| Guest favourite 상자 | 645×89, 테두리 1, 모서리 12, padding 22/26, 칸 사이 24, 아래 12, 세로 가운데 | 644.58×89, 812:11144 높이 101(=89+12) | `width: calc(var(--spacing) * 161.25)`, `height: calc(var(--spacing) * 22.25)`, `border: var(--border-width-thin) solid`, `border-radius: var(--radius-lg)`, `padding: calc(var(--spacing) * 5.5) calc(var(--spacing) * 6.5)`, `gap: calc(var(--spacing) * 6)`, `margin-bottom: calc(var(--spacing) * 3)` |
| 월계수 묶음 | 122.3×36, 사이 2, 왼쪽 20×36 · 오른쪽 24×36 | 20.25 · 23.64 ×36, 사이 2 | `gap: calc(var(--spacing) * 0.5)`, 폭 `calc(var(--spacing) * 5)`·`calc(var(--spacing) * 6)`, 높이 `calc(var(--spacing) * 9)`, `object-fit: contain` |
| "Guest / favourite" | 74.3×36, 두 줄, 가운데 정렬 | 812:11150 69×36 | 글자 6절 |
| 설명 | 265×40(두 줄) | 265×43 | `width: calc(var(--spacing) * 66.25)` |
| 숫자 묶음 | 오른쪽 끝(margin-left auto), 칸 사이 24; 블록 세로 사이 4 | x 464.89 · 546.89 · 571.58 | `gap: calc(var(--spacing) * 6)`, 블록 `gap: calc(var(--spacing) * 1)` |
| 별 | 10×10 5개, 사이 2 | 10×10, 간격 12 | `calc(var(--spacing) * 2.5)`, `gap: calc(var(--spacing) * 0.5)` |
| 세로선 | 1×40 | 0.69×40 | `width: var(--border-width-thin)`, `height: calc(var(--spacing) * 10)` |
| 하이라이트 구역 | padding 위아래 32, 줄 사이 24 | py 32, gap 24 | `padding: calc(var(--spacing) * 8) 0`, `gap: calc(var(--spacing) * 6)` |
| 하이라이트 줄 | 그림 칸 40, 칸–글자 24, 제목 아래 2 | 같음(pt 2) | `gap: calc(var(--spacing) * 6)`, `margin-bottom: calc(var(--spacing) * 0.5)` |
| 그림: Top 10% | 40×40 칸 가운데 34×34 (y +3) | 40×34 칸 위쪽 34×34 (y +0) | 페이지값: `calc(var(--spacing) * 8.5)` |
| 그림: Near(Q-06 → Figma 대로) | 페이지 36×36(글자 x 220) | **40×40** 칸: 흰 테두리 2 + 그림 36, 모서리 12, overflow 잘림 → 글자 x 224 | `width/height: calc(var(--spacing) * 10)`, `border: var(--border-width-thick) solid`, `border-radius: var(--radius-lg)`, 그림 `calc(var(--spacing) * 9)`, 그림자 6절 |
| 그림: Kitchen·Cleanliness | 40×40 | 40×40 | `calc(var(--spacing) * 10)` |
| 호스트 사진(Q-06 → Figma 대로) | 페이지 40×40 원, `object-fit: contain`(띠 모양) | 40×40 원(모서리 20), 바탕 #DDD, **cover** | `calc(var(--spacing) * 10)`, `border-radius: var(--radius-full)`, `object-fit: cover`, 바탕 6절 |
| 슈퍼호스트 배지 | 20×20, 오른쪽·아래 −2 (left 22, top 22) | 20×20 at left 24, top 22 | 페이지값: `calc(var(--spacing) * 5)`, `right/bottom: calc(var(--spacing) * -0.5)` |
| Learn more 줄 | 버튼 왼쪽 들여쓰기 12(아이콘 x +12), 글자 x 224, 줄 높이 16(페이지는 글자 아래 2 더해 18) | 아이콘 칸 40 가운데 16, 글자 16 높이 | 래퍼 `margin-left: calc(var(--spacing) * 3)`; 버튼 모양은 Button text(F, 3절) |

- 사용자 결정 Q-06 B 로 두 결함(호스트 사진, Near 칸)만 Figma 대로 고치고, 나머지 차이(제목 묶음 4px, Top 10% 그림 3px, 배지 2px, Learn more 2px)는 페이지 값을 쓴다.
- Figma 글꼴은 제목 Pretendard Medium, 설명 Airbnb Cereal(자간 −0.15)이지만 토큰·페이지에 없다. 결정 3 "지금 크기·자간 유지"에 따라 페이지의 SF 590/400, 자간 0 을 쓴다.

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 제목·숫자·Guest favourite·하이라이트 제목·인원 줄 | #222222(페이지 측정, Figma `text-[#222]`) / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| 별 5개 | #222222(asset fill) | shade-02 | `text`(currentColor) | #222222 | 일치 | — |
| Guest favourite 테두리 · 세로선 | #DDDDDD(페이지 CSS) / Neutral 03 | neutral-03 | `border` | #DDDDDD | 일치(상자 외곽선·구분선) | — |
| 하이라이트 설명 · 호스트 설명 | 페이지·Figma #6C6C6C(원시값) → 결정 2 표로 **#717171** / Neutral 07 | neutral-07 | `text-secondary`(기존) | #717171 | 결정 2 로 값 변경(페이지보다 5 밝아짐) | 제안했던 `text-supporting` 은 없앰 |
| Learn more 글자 · 정보 아이콘 | 같음 #6C6C6C → **#717171** | neutral-07 | `text-secondary` | #717171 | 같음 | Button text(F) 가 칠함, 아이콘 currentColor |
| Near 그림 흰 테두리 | #FFFFFF(Figma `var(--grays/white)` "Grays/White") | shade-01 | `image-frame`(새 역할, 리드 목록에 유지 확정) | #FFFFFF | 일치(사진 둘레 액자) | 리드가 토큰 계획 revision 6 에 기록 |
| Near 그림자 | 원래 값: 페이지 `0 2px 8px rgba(0,0,0,.12)`(y 2) / Figma 3겹 원시값 `0 0 0 1px rgba(0,0,0,.02), 0 2px 6px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.1)` | — | 결정 2 표 "y 가 가장 가까운 Elevation" + 리드 결정(2026-11-26, 여러 겹 그림자는 가장 진한 층에 적용): Figma 3겹 중 가장 진한 층 `0 4px 8px rgba(0,0,0,.1)`(y 4) → **Elevation 01**(y 4) → `--shadow-elevation-01` | `0px 4px 18px 0px #0000002B` | 결정 2 로 값 변경(검정 17%, 흐림 18) | — |
| 호스트 사진 바탕 | #DDDDDD(Figma 812:11205 `bg-[#ddd]`) | neutral-03 | `image-placeholder-subtle`(기존, Callout 사진 칸) | #DDDDDD | 일치(사진 칸 바탕) | — |
| 슈퍼호스트 배지 | 흰색 + 선형 그라데이션 #E61E4D → #E31C5F → #D70466(asset 안) | — | 그림 파일 안의 색(Q-07 A) | — | — | — |
| 월계수·하이라이트 그림·호스트 사진 | PNG 래스터 | — | — | — | — | 그림 |

- 컴포넌트 fill 과 부모 배경: 부품은 투명, 페이지 배경 #FFFFFF. Storybook 캔버스 흰 배경, 폭 653.
- 이 부품이 쓰는 새 역할: `image-frame` 1개. `text-supporting` 은 결정 2 로 없앴다.

### 글자 (현재 페이지 값 → 토큰, 모두 정확한 값)

| 요소 | 페이지 값 | 토큰 | 그리는 곳 |
|---|---|---|---|
| 제목 `<h2>`, 숫자 "4.98"·"487" | 22 / 590 / 줄 26 | `--text-type-header-22pt-semibold` 묶음 + `line-height: calc(var(--spacing) * 6.5)` | ListingOverview |
| 인원 줄 | 16 / 400 / 줄 24 | `Text` body | Text |
| "Guest / favourite" | 18 / 590 / 줄 18, 가운데 | `--text-type-body-copy-18pt-semibold` 묶음 + `calc(var(--spacing) * 4.5)` | ListingOverview |
| Guest favourite 설명 | 16 / 400 / 줄 20 | `--text-type-body-copy-16pt-regular` 묶음 + `calc(var(--spacing) * 5)` | ListingOverview |
| "Reviews" | 12 / 400 / 줄 16 | `--text-type-body-copy-12pt-regular` 묶음 + `calc(var(--spacing) * 4)` | ListingOverview |
| 하이라이트·호스트 제목 | 14 / 590 / 줄 20 | `--text-type-body-copy-14pt-semibold` 묶음 + `calc(var(--spacing) * 5)` | ListingOverview |
| 하이라이트·호스트 설명 | 14 / 400 / 줄 20 | `--text-type-body-copy-14pt-regular` 묶음 + `calc(var(--spacing) * 5)` | ListingOverview |
| Learn more | 12 / 400 / 줄 16 / 밑줄 없음 | `--text-type-body-copy-12pt-regular` 묶음 + `calc(var(--spacing) * 4)` | Button text(F) |

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 별 / 812:11157~11165 "Container" 10×10 | `my-assets/images/detail-icon-star-small.svg`, path `M4.71875 0.49375L3.42813 3.26875 … H4.71875Z`, evenodd, clipPath 10×10 | fill #222222, 회전 없음 | 항상 5개(점수와 무관) | — | 확인 |
| 정보 / 812:11219 "Container" 16×16 | `my-assets/images/detail-icon-info.svg`, path `M8 0.25C12.2802 0.25 … Z` | 원본 fill #6C6C6C → currentColor(`text-secondary`, 결정 2) | 항상 | — | 확인 |
| 슈퍼호스트 배지 / 812:11208 20×20 | `my-assets/images/detail-icon-superhost.svg`(path 2개: 흰색 + 선형 그라데이션 3색) | 20×20 | 호스트 사진 위 | — | 확인 |
| 월계수 / 812:11148 · 812:11151 | `detail-laurel-left.png` · `detail-laurel-right.png`(54×96) | 20×36 · 24×36 contain | 항상 | — | 확인 |
| 하이라이트 그림 / 812:11174 · 11182 · 11189 · 11196 | `detail-highlight-top/near/kitchen/cleanliness.png`(120×120) | 5절 | 항상 | — | 확인 |
| 호스트 사진 / 812:11206 | `detail-host-avatar.png`(120×80) | 40 원, cover | 항상 | — | 확인 |

- 그리는 방법(Q-07 추천안 채택): 별·정보는 원본 path 를 부품 안 `<svg>` JSX(currentColor, `aria-hidden="true"`)로 옮긴다. 정보 `<svg>` 는 `Button` 의 `icon` prop 으로 넘긴다. 배지는 다색 그라데이션이라 그림 파일로 취급한다(주소 prop, `<img alt="">`). 모든 그림은 옆 글자가 뜻을 전하므로 장식(`alt=""`).

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `title` | 812:11137 "Heading 2" | 필수 string | `<h2>` | — | Q-08 추천안 채택 |
| `details` | 812:11139 | 필수 string, 예 "4 guests · 2 bedrooms · 2 beds · 2 bathrooms" | `Text as="p" variant="body"` | — | Q-08 추천안 채택 |
| `guestFavourite` | 812:11144 | `{ labelLines: [string, string]`(기본 ["Guest", "favourite"]), `description`, `rating`, `reviewCount`, `reviewLabel`(기본 "Reviews"), `laurelLeftSrc`, `laurelRightSrc` }` | 상자 하나, 별 5개 장식, 누를 수 없음 | — | Q-02·Q-08 추천안 채택 |
| `highlights` | 812:11172~11195 | 배열 `{ imageSrc, imageLook: "inset" \| "framed" \| "full", title, description }`. inset = 40 칸 안 34(Top 10%), framed = 흰 테두리 40 칸 그림(Near), full = 40(Kitchen·Cleanliness) | 줄마다 그림 + `<h3>` 제목 + 설명 | — | Q-06·Q-08 추천안 채택 |
| `host` | 812:11202 | `{ avatarSrc, badgeSrc, title, description }` 예 "Hosted by 준구", "Superhost · 6 years hosting" | 원형 사진(cover) + 배지 + `<h3>` + 설명, 누를 수 없음 | — | Q-02·Q-08 추천안 채택 |
| `learnMoreLabel` | 812:11222 | "Learn more about summaries" | `Button` children(=이름) | — | Q-03 → 결정 4 |
| `onLearnMoreClick` | PRD "nothing, just shows it" | 없음 / `(event) => void` | `Button` 의 `onClick` 으로 전달, 클릭 시 호출만 | `Button`(`type="button"`), Tab·Enter·Space | Q-03 → 결정 4 |
| 최상위 | 키트 규칙 | `data-testid="ds-listing-overview"`, 클래스 `ds-listing-overview` | — | — | Q-01 추천안 채택 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 부품 구성과 Nested parts | A 한 부품(인원 줄은 `Text`). / B 작은 부품 여러 개 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | Figma 이름이 "Button" 인데 PRD 에 동작이 없는 Guest favourite 상자·호스트 사진 | A 그냥 보여 줌. / B 버튼 + 콜백 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | "Learn more about summaries"(지금 페이지는 Tab 으로 갈 수 없음) | A 아이콘+글자를 한 `<button type="button">` 으로. / B 아이콘만 버튼. / C 지금처럼 | 추천안 A 채택 + 사용자 결정 4 "Button 에 공용 모양 추가 (권장)" (chosen in chat, 2026-11-26) → 아이콘+글자를 공용 `Button variant="text"` 하나로(Buttons revision 2, 에이전트 F) | resolved |
| Q-04 | #6C6C6C(설명·Learn more·정보 아이콘)의 색 역할 | A 원시 primitive + 새 `text-supporting`. / B Figma 변수 생성 | 사용자 결정 2 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → #717171 기존 `text-secondary`(neutral-07). `text-supporting` 없앰 | resolved |
| Q-05 | Near 그림의 흰 테두리 역할과 그림자 | A `image-frame` + 그림자는 Figma Effect 스타일 뒤. / B `on-image` 재사용. / C 둘 다 없앰 | 흰 테두리: 추천안 채택 — `image-frame`(리드 목록에 유지 확정). 그림자: 사용자 결정 2 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → y 가 가장 가까운 Elevation. 리드 결정(2026-11-26): 여러 겹 그림자는 가장 진한 층(Figma `0 4px 8px rgba(0,0,0,.1)`, y 4)에 적용 → `--shadow-elevation-01` | resolved |
| Q-06 | 페이지와 Figma 가 눈에 띄게 다른 두 곳(호스트 사진 contain, Near 36 칸) | A 모두 페이지대로. / B 두 결함만 Figma 대로. / C 모두 Figma | 추천안 B 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | 그림 그리는 방법(배지는 다색 그라데이션) | A 별·정보 svg JSX, 배지·PNG 는 `<img alt="">`. / B 배지도 svg + 새 토큰. / C 모두 `<img>` | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | 공개 API 와 제목 단계(Figma "Heading 3") | A 8절 API, `<h2>` + `<h3>`. / B 하이라이트 제목은 일반 글자 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 5절 표 값(폭 653; Near 줄 글자 x +64, 호스트 사진 원을 꽉 채움), 흰 배경 | Storybook iframe(653 폭) box·computed style, 페이지·Figma 스크린샷 대조 | |
| 글자 | 6절 글자 표의 크기·굵기·줄 높이, 색 `text` / `text-secondary` | computed style | |
| 그림·아이콘 | 별·정보 원본 path, 그림 깨짐 없음(naturalWidth > 0), 크기 5절, alt "" | DOM·asset 대조 | |
| Nested parts identity | 루트 안에 `data-testid="ds-text"` 1개, `data-testid="ds-button"` 1개 | `ai:verify` DOM 검사 | |
| Nested part → callback | Learn more 클릭 → `onLearnMoreClick` 1회 | `play`: `fn()` + `userEvent.click` | |
| Tab / Focus | 이 부품 안 Tab 은 Learn more 하나, 링 보임 | `play` `userEvent.tab()` + Playwright 스크린샷 | |
| 제목 순서 | h2 1개, h3 5개 | DOM | |
| 공통 규칙 | 토큰만 사용, `.ds-button*`·`.ds-text*` 선택 없음 | `pnpm ai:check ListingOverview`, `pnpm ai:verify ListingOverview`, `pnpm typecheck`, `pnpm ds:guard` | |

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 열린 질문 → A: "추천안 모두 채택 (권장)"; Q: Figma 변수가 아닌 값 → A: "Figma 스타일 값으로 맞춤"; Q: 글자 크기·자간 → A: "지금 크기·자간 유지 (권장)"; Q: 공용 버튼 → A: "Button 에 공용 모양 추가 (권장)" (모두 chosen in chat, 2026-11-26).
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 이 계획 revision 1 승인, Buttons revision 2(`variant="text"`, 3절 Learn more 모양 포함 여부)의 승인·구현, 토큰 계획 revision 6(`image-frame`) 적용.
