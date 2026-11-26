---
kind: component
components: [Button, Link]
revision: 2
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=238-2153&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Buttons (Button · Link)

> **revision 2 (2026-11-26, 재정립 계획 에이전트 F, 승인 대기):** 사용자 결정 4 "Button 에 공용 모양 추가 (권장)"에 따라, 구역 부품들이 자기 버튼을 그리지 않고 쓰는 공용 모양 두 가지 — `variant="ghost"`(#F2F2F2 회색 상자)와 `variant="text"`(바탕 없는 글자 버튼, 앞 아이콘 선택) — 를 `Button` 에 더한다. revision 1 에서 승인된 내용(1~11절, Link 포함)은 바꾸지 않고, 바뀌는 것은 **12절**에만 적었다. 4절에 한 줄, 9절에 Q-16~Q-20(미답변, AI 추천 표시), 11절에 두 줄을 더했다. 모양 값은 사용자가 검수한 현재 사이트(git-demo `aa9a593`)를 Playwright 1440px 로 다시 잰 값이다. Link 는 바뀌지 않는다.

> 작성: Claude Code, 2026-11-26. 디자인 시스템 적용 1단계(`docs/plans/design-system-airbnb.md` §5)의 Buttons 탭. 같은 날 사용자 결정("추천안 모두 채택", "합친 목록 + 다시 가져오기")과 리드가 채운 사실을 반영했다. 사용자 승인 전 구현 파일을 고치지 않는다. Figma 링크 하나(Buttons 탭)에 부품이 둘이라 `components: [Button, Link]` 한 계획으로 묶었다.

## 1. 요청과 적용 규칙

- 요청한 작업: Figma Buttons 탭의 원본 묶음 4개를 기존 키트 부품 `Button`(Primary·Secondary·Tertiary)과 `Link`(Links)에 맞게 **기존 원본을 고치는** 계획(R05: NewButton 금지).
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`(이 폴더의 사본은 예전 gray/blue 역할을 적고 있어 실제 값은 `src/tokens/tokens.css` 로 대조함)
- Figma 파일·노드·조회 시점·캐시 여부: 파일 Q5QDGE5WoXefOxgm5fziH3, 2026-11-26 Figma Desktop MCP 직접 조회(캐시 아님).

| 노드 | Figma 이름 | 변형 수 | 읽은 도구 |
|---|---|---|---|
| 238:2153 | Primary Buttons | 12 (State 6 × Size Full Width/Small × Icon Off) | get_design_context(스크린샷 포함), get_variable_defs, get_variable_defs 238:2164, get_metadata 238:2168 / 리드: get_metadata 0:0(변형 이름·크기), get_variable_defs 238:2156·238:2162 |
| 238:2188 | Secondary Buttons | 18 (State 6 × Full Width Off/On + Small Off) | get_design_context(스크린샷 포함), get_variable_defs / 리드: get_metadata 238:2188 |
| 238:2256 | Tertiary Buttons | 18 심볼 (State 6 × Full Width Off/On + Small Off, 이름 중복 1개 — 5절) | get_design_context(스크린샷 포함), get_variable_defs, get_metadata 238:2256, get_metadata 238:2285 |
| 238:2309 | Links | 8 (State Default/Focus × 4 조합) | get_design_context(스크린샷 포함), get_variable_defs / 리드: get_metadata 0:0(변형 이름·크기), get_metadata 238:2319 |

- Figma 호출(이 계획 작성자): 12회 — get_design_context 4 · get_variable_defs 5 · get_metadata 3(238:2256, 238:2168, 238:2285). 한도 오류 없음. 리드의 조회 결과는 업데이트 지시서(2026-11-26)와 `gap-facts.md` 에서 가져왔다. 아이콘 asset 5개는 MCP 로컬 서버에서 스크래치 폴더로만 내려받아 경로를 읽었다(프로젝트에 복사하지 않음).
- 대상 코드·토큰 기준: git-demo `main` f3aed50 작업 폴더 현재 상태. `src/tokens/tokens.css` 는 리드가 Colors 245:3518·Typography 245:3517·Elevation 245:3354 를 다시 가져와 더한 상태(기존 값 변경 없음): `--color-link` #004CC4, `--color-neutral-01` #F7F7F7, `--text-type-body-copy-13pt-semibold`(13px/590), `--text-type-body-copy-12pt-semibold-underlined`(12px/590) 등이 이제 있다. 토큰 계획 `docs/plans/tokens.md` 는 revision 4(approved)이고, 이 계획의 새 역할은 리드가 revision 5 에 올린다(이 계획은 그 파일을 고치지 않는다).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | Primary·Secondary·Tertiary 세트: 글자 "Button" 이 든 직사각형 버튼, 상태 6개. Links 세트: 글자만 있는 링크("Cleaning fee", "Show more >", "Show", "Terms of Service") | 세 버튼 세트 = 기존 `Button` 의 `variant` 3개. Links = 기존 `Link`(이동 전용 `<a>`) | Q-01·Q-10 추천안 채택 |
| 누를 수 있는 영역 | 버튼: 세트 루트 전체(FW 520×47, Small 91×48). Links: 글자 상자(+아이콘) | Button 은 `<button>`(또는 `href` 가 있으면 `<a>`) 전체. Link 는 `<a>` 전체 | Q-01·Q-09·Q-10 추천안 채택 |
| 클릭/선택/열림 동작 | Figma 에 동작 설명 없음. 사이트의 Reserve 는 `/checkout` 으로 가는 `<a>`, Next 는 `<button>` | Button: `onClick` 콜백(기본 `type="button"`, 기존 유지). `href` 를 주면 같은 모양의 `<a href>`. Link: `href` 로 이동 | Q-09 추천안 채택 |
| Loading(지속 상태) | 세 세트 모두 State=Loading: 글자 대신 점 3개(36×8) | 상호작용 의사 상태가 아니라 지속 상태 → `loading` prop | Q-05 추천안 채택 |
| 키보드·포커스 범위 | State=Focus 변형이 세 버튼 세트·Links 에 있음(5절) | `:focus-visible` 로만 그림(box-shadow·outline, 자리 밀림 없음). `state` prop 만들지 않음 | Q-06 추천안 채택 |
| disabled 동작 | 세 버튼 세트에 State=Disabled(#DDD 바탕·흰 글자). Links 에는 Disabled 없음 | Button: 네이티브 `disabled`. Link: 시각 상태 없음, 기존 `disabled` prop 제거 | Q-05·Q-11 추천안 채택 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트 / 공개 import:
  - `src/components/Button/` — `Button.tsx`, `Button.css`, `Button.stories.tsx`(@ds-generated, 예전 샘플 Figma `SAMPLEKEY123` 0:4856), `Button.figma.tsx`(@ds-generated, 같은 샘플 URL), `index.ts`. 공개 import `@/components/Button`.
  - `src/components/Link/` — `Link.tsx`, `Link.css`, `Link.stories.tsx`(@ds-generated, 기준선 Link core), `index.ts`. `Link.figma.tsx` 없음. 공개 import `@/components/Link`.
- 기존 props·stories에서 확인한 지원 범위:
  - Button: `variant: "primary" | "secondary" | "outline" | "tertiary"`(기본 primary), `size: "l" | "m" | "s"`(기본 m), `hasIcon`(클래스만 붙고 아이콘을 그리지 않음), `type` 기본 `"button"`, 나머지 button 속성 전달. 색은 `--color-primary`·`--color-surface` 등 키트 기본값.
  - Link: `variant: "default" | "inline"`, `size: "sm" | "md"`(기본 md), `disabled`(href 제거 + `aria-disabled`), `external`(target/rel + 키트가 그린 화살표 SVG + 번역 문구 `t.newWindow`). hover 밑줄·`--color-primary-hover`, focus 2px `--color-primary` 링.
- 사용처(`grep` src/·my-website/, 생성물 `src/docs/Overview.stories.tsx` 제외):

| 부품 | 위치 | 쓰는 방법 |
|---|---|---|
| Button | `src/components/Text/Text.stories.tsx:4,120,122` | `<Button onClick={…}>Previous action</Button>` 등, 기본 variant/size |
| Link | `my-website/pages/HomePage.tsx:87` | `<Link className="page-Home__become-host">Become a Host</Link>` — variant/size/**href 없음** |
| Link | `my-website/pages/DetailPage.tsx:103` | 같음(`page-Detail__become-host`) |
| Link | `my-website/pages/CheckoutPage.tsx:75` | 같음(`page-Checkout__become-host`) |
| (참고) Reserve | `my-website/pages/DetailPage.tsx:378` | 키트 부품 아님: `<a href="/checkout" className="page-Detail__booking-reserve">`, 페이지 CSS 325×51·근사 linear-gradient(#D33753→#D13660→#C72D65)·16px 400 |
| (참고) Next | `my-website/pages/CheckoutPage.tsx:139` | 키트 부품 아님: `<button className="page-Checkout__next-btn">`, 페이지 CSS #222 바탕·흰 13px 590·padding 16/24·모서리 8·hover #333 |

  - 기타 참조: `components.baseline.json` 의 Button/Link 기준선 항목, `scripts/lib/review-stories.mjs:198`(기준선 Button 의 `hasIcon` 검수 보류 처리). 이 계획은 둘 다 고치지 않는다.
  - 참고(페이지 계획에서 확인): Next 의 페이지 CSS 값은 Figma **Secondary** Small(#222 바탕·흰 13pt·padding 16/24)과 같다. 전체 목록(design-system-airbnb.md)의 매핑은 리드가 §6 에서 정리한다.
- 기존 원본 수정 또는 새 부품이 필요한 이유: 같은 역할(R05·C03). 지금 API 는 키트 기본값이라 Figma 축(Size Full Width/Small, Type Subtle/Legal, Loading)과 맞지 않는다.
- 제거·이름 변경(결정됨):

| 부품 | 현재 | 결정 | 근거 질문 | 영향 |
|---|---|---|---|---|
| Button `variant` | primary / secondary / outline / tertiary | primary / secondary / tertiary (`outline` 제거) | Q-01 | 사용처 0 |
| Button `size` | l / m / s (기본 m) | full-width / small (기본 small) | Q-01, Q-02 | Text.stories 는 기본값만 씀 → 글자 폭 버튼 유지 |
| Button `hasIcon` | boolean(그림 없음) | 제거하고 `icon?: ReactNode` 슬롯 | Q-07 | 사용처 0 |
| Button 새 prop | — | `loading`(Q-05), `icon`(Q-07), `href`(Q-09) | | |
| Link `variant` | default / inline | subtle / legal (`inline` 제거) | Q-10, Q-11 | 페이지 3곳은 기본값만 씀 → 새 기본 subtle |
| Link `size` | sm / md (기본 md) | small / medium (기본 medium) | Q-10 | 같음 |
| Link `disabled`·`external` | 있음 | 둘 다 제거 | Q-11 | 사용처 0 |
| Link 새 prop | — | `hasIcon`(Subtle Medium 의 화살표) | Q-10 | |

- 변경할 파일(승인 뒤): `Button.tsx`·`Button.css`·`Button.stories.tsx`·`Button.figma.tsx`, `Link.tsx`·`Link.css`·`Link.stories.tsx`, 새 `Link.figma.tsx`(G11). `index.ts` 는 타입 export 이름이 바뀔 때만. stories·figma 파일은 @ds-generated 라 손으로 고치면 생성기가 충돌로 보고하고 보존한다. 색 역할은 토큰 계획 revision 5 로만 더한다(6절). Google G 견본 그림은 별도 asset 등록(`my-assets`, Q-08)이 필요하다.
- 승인된 변경에서 영향받는 기존 사용처:
  - 페이지 3곳의 "Become a Host": Link 기본 모양이 지금(#FF385C·16px)에서 Figma Subtle Medium(#222·14pt Semibold)으로 바뀐다. 페이지 CSS `.page-*__become-host` 가 같은 단일 클래스 선택자로 색·크기를 덮어쓰고 있어 최종 모양은 CSS 로드 순서에 따른다 → 구현 뒤 세 페이지를 실제 화면으로 확인. 세 곳 모두 `href` 가 없어 Tab 으로 잡히지 않는 것은 페이지 쪽 문제(이 계획에서 고치지 않음).
  - Text.stories 의 Button 두 개: 기본 모양이 바뀜(기능 같음).

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| 238:2308 "Secondary Buttons" (238:2307 의 유일한 자식, 91×48 at 0,0 — 리드 get_metadata 238:2307) | Secondary Buttons (main 238:2229) — design context 가 `SecondaryButtons` 함수와 `node-238_2229` 로 줌 | State=Disabled, Size=Small, Icon=Off | 238:2307 (Tertiary · Disabled · Small) | none — Button 안에서 tertiary disabled small 을 secondary disabled small 과 같은 값(#DDD 바탕·흰 13pt·91×48)으로 그린다. 다른 키트 부품 import 없음 (Q-12) | confirmed |

- Confirmed absence of nested instances and evidence:
  - 238:2320 "Content=text_icon_after, Size=large, Type=subtle link, State=default" 는 **인스턴스가 아니라 FRAME**(리드 get_metadata 238:2319): 안에 text "Show more" 238:2321(77×17)과 frame "Keyboard arrow right" 238:2322(16×16, x 81). → Link 의 안쪽 레이어. Nested parts 행 없음.
  - ellipses: 238:2168 의 자식은 frame 238:2169 "ellipses"(36×19, x 242 y 14) > frame 238:2170 "ellipses"(36×8, y 6) — 인스턴스 아님(get_metadata 238:2168). 다른 세트의 점도 design context 에서 같은 구조(바깥 frame + 안쪽 frame + SVG)로 나온다.
  - Google G: 238:2285 의 자식은 text 238:2286 "Button"(53×19, x 233.5 y 14)과 frame 245:3539 "icons"(24×24, x 24 y 12) > rounded-rectangle 245:3540 "7611770 1"(24×24, 이미지 채우기) — 인스턴스 아님(get_metadata 238:2285).
  - Camera alt: 238:2203 의 자식은 frame "Camera alt" 238:2204(16×16, x 223.5 y 15.5)와 text "Button" 238:2208(53×19, x 243.5 y 14) — **FRAME**, 안쪽 레이어(리드 get_metadata 238:2203). 같은 세트의 238:2210·2216·2242 도 design context 에서 같은 레이어 이름·구조로 나온다.
  - Keyboard arrow right: 238:2314 의 자식은 text "Show more" 238:2315(77×17)와 frame "Keyboard arrow right" 238:2316(16×16, x 81 y 0.5) — **FRAME**, 안쪽 레이어(리드 get_metadata 238:2314). 238:2322 도 FRAME(리드 get_metadata 238:2319).
  - 그래서 Nested parts 행은 238:2308 하나뿐이다.
  - revision 2: 새 Nested parts 행 없음. `ghost`·`text` 는 다른 키트 부품을 import 하지 않는다. 앞 아이콘은 Button 을 쓰는 부품이 `icon` 으로 넘기는 `<svg>`(currentColor)이고, Button 은 칸 크기·간격·색만 정한다(12.6).

## 5. Figma 상태·크기 전체 목록

크기·이름은 get_metadata 값이다(Primary·Links: 리드 0:0, Secondary: 리드 238:2188, Tertiary: 238:2256). 글자는 모두 SF Pro Semibold 590, 줄 높이 normal.

### Primary Buttons 238:2153 (Icon=Off 만)

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 238:2164 Default · Full Width | ctx + 스크린샷, vardefs(Gradient 02), metadata 520×47 | 기본 | 버튼 전체 | 기준: 520×47, padding 14/0, 모서리 8, 바탕 radial gradient(selfmake-1 값), 글자 흰색 16pt | 없음 | `variant="primary" size="full-width"`, 폭 100% | 확정 (Q-01·Q-02) |
| 238:2166 Default · Small | ctx, 91×48 | 기본 | 버튼 전체 | padding 16/24, 글자 13pt, 같은 gradient | 없음 | `size="small"` | 확정 |
| 238:2154 Hover · Full Width | ctx, 520×47 | 포인터 올림 | 버튼 전체 | 바탕만 radial 2겹(selfmake-2 값) | 없음 | `:hover:not(:disabled)` | 확정 |
| 238:2156 Hover · Small | ctx, vardefs(Gradient 03), 91×48 | 포인터 올림 | 버튼 전체 | 같음 | 없음 | 같음 | 확정 |
| 238:2160 Pressed · Full Width | ctx, **488×47** | 누르는 동안 | 버튼 그림 | 바탕 = 단색 rgb(235,76,96) 층 + radial 2겹(selfmake-3 값), 폭 −32 | 없음 | `:active:not(:disabled)`, 그림만 좌우 16씩 줄임·누르는 영역 유지 | 확정 (Q-03) |
| 238:2162 Pressed · Small | ctx, vardefs(Gradient 01), 91×48 | 누르는 동안 | 버튼 전체 | 바탕 selfmake-3 값, 크기 같음 | 없음 | 같음 | 확정 |
| 238:2180 Focus · Full Width | ctx, **528×55** | 키보드 포커스 | 버튼 바깥까지 | 바깥 틀 #222 padding 4·모서리 12 + 안쪽 버튼 2px #D3D3D3 테두리(모서리 8), 안쪽 바탕은 기본 gradient | 없음 | `:focus-visible`, box-shadow/outline(자리 밀림 없음) | 확정 (Q-06) |
| 238:2183 Focus · Small | ctx, **99×56** | 키보드 포커스 | 버튼 바깥까지 | 같음, 안쪽 padding 16/24·13pt | 없음 | 같음 | 확정 (Q-06) |
| 238:2168 Loading · Full Width | ctx, metadata 520×47 + 자식 | 지속 상태 | 버튼 전체 | 바탕 #DDD, 글자 없음, 점 frame 238:2169(36×19, 가운데) > 238:2170(36×8, y 6) | 점 | `loading` | 확정 (Q-05) |
| 238:2174 Loading · Small | ctx, **84×48** | 지속 상태 | 버튼 전체 | 바탕 #DDD, padding 16/24, 점 상자 h16 가운데 | 점 | `loading`, 폭은 내용대로 | 확정 (Q-05) |
| 238:2186 Disabled · Full Width | ctx, 520×47 | 사용 불가 | 버튼 전체 | 바탕 #DDD, 글자 흰색 16pt | 없음 | 네이티브 `disabled` | 확정 |
| 238:2158 Disabled · Small | ctx, 91×48 | 사용 불가 | 버튼 전체 | 바탕 #DDD, 글자 흰색 13pt | 없음 | 네이티브 `disabled` | 확정 |

### Secondary Buttons 238:2188

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 238:2189 Default · FW · Off | ctx + 스크린샷, 520×47 | 기본 | 버튼 전체 | 기준: 바탕 #222, 글자 흰색 16pt, padding 14/0, 모서리 8 | 없음 | `variant="secondary"` | 확정 |
| 238:2191 Hover · FW · Off | ctx, 520×47 | 포인터 올림 | — | 기본과 차이 없음(클래스·스크린샷 같음) | 없음 | 만들 것 없음 | 확정 (Q-03) |
| 238:2193 Pressed · FW · Off | ctx, **488×47** | 누르는 동안 | 버튼 그림 | 폭만 다름 | 없음 | `:active`, 그림만 좌우 16씩 줄임 | 확정 (Q-03) |
| 238:2237 Focus · FW · Off | ctx, **528×55** | 키보드 포커스 | 버튼 바깥까지 | 바깥 틀 #222 padding 4·모서리 12 + 안쪽 #222 바탕에 2px #D3D3D3 테두리 | 없음 | `:focus-visible` | 확정 (Q-06) |
| 238:2197 Loading · FW · Off | ctx, 520×47 | 지속 상태 | 버튼 전체 | 바탕 #222 그대로, 글자 대신 점(상자 h19 padding 6) | 점 | `loading` | 확정 (Q-05) |
| 238:2195 Disabled · FW · Off | ctx, **488×47** | 사용 불가 | 버튼 전체 | 바탕 #DDD, 흰 글자 | 없음 | `disabled`, 폭은 FW 그대로(488 은 Figma 실수로 봄) | 확정 (Q-04) |
| 238:2203 Default · FW · On | ctx, 520×47 | 기본 | 버튼 전체 | Camera alt 16×16 + gap 4 + 글자, 둘 다 가운데 | Camera alt | `icon` 슬롯(글자 앞) | 확정 (Q-07) |
| 238:2209 Hover · FW · On | ctx, 520×47 | 포인터 올림 | — | 기본(On)과 차이 없음 | Camera alt | 만들 것 없음 | 확정 (Q-03) |
| 238:2215 Pressed · FW · On | ctx, **488×47** | 누르는 동안 | 버튼 그림 | 폭만 다름 | Camera alt | `:active` | 확정 (Q-03) |
| 238:2240 Focus · FW · On | ctx, **528×55** | 키보드 포커스 | 버튼 바깥까지 | 238:2237 과 같은 링, 안쪽에 아이콘+글자(gap 4) | Camera alt | `:focus-visible` | 확정 (Q-06) |
| 238:2247 Loading · FW · On | ctx, 520×47 | 지속 상태 | 버튼 전체 | 아이콘·글자 없이 점만 → Loading Off 와 같은 모양 | 없음(점만) | `loading` 이면 아이콘 숨김 | 확정 (Q-04) |
| 238:2221 Disabled · FW · On (이름 "State=Disabled, Size=Full Width, Icon=On") | ctx, **488×47** | 사용 불가 | 버튼 전체 | #DDD, 글자만, **아이콘 없음** | 없음 | `disabled` 이면 아이콘 숨김, 폭 FW 그대로 | 확정 (Q-04) |
| 238:2223 Default · Small · Off | ctx, 91×48 | 기본 | 버튼 전체 | 바탕 #222, 13pt, padding 16/24 | 없음 | `size="small"` | 확정 |
| 238:2225 Hover · Small · Off | ctx, 91×48 | 포인터 올림 | — | 기본과 차이 없음 | 없음 | 만들 것 없음 | 확정 (Q-03) |
| 238:2227 Pressed · Small · Off | ctx, 91×48 | 누르는 동안 | — | 기본과 차이 없음 | 없음 | 만들 것 없음 | 확정 (Q-03) |
| 238:2253 Focus · Small · Off | ctx, **99×56** | 키보드 포커스 | 버튼 바깥까지 | 바깥 틀 + 안쪽 2px #D3D3D3 | 없음 | `:focus-visible` | 확정 (Q-06) |
| 238:2231 Loading · Small · Off | ctx, **84×48** | 지속 상태 | 버튼 전체 | #222 바탕, 점 상자 h16 padding 6(위 정렬) | 점 | `loading` | 확정 (Q-05) |
| 238:2229 Disabled · Small · Off | ctx, 91×48 | 사용 불가 | 버튼 전체 | #DDD, 흰 13pt | 없음 | `disabled` | 확정 |

### Tertiary Buttons 238:2256

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 238:2271 Default · FW · Off | ctx + 스크린샷, 520×47 | 기본 | 버튼 전체 | 기준: 바탕 없음(투명), 1px #222 테두리, 글자 #222 16pt, padding 14/0, 모서리 8 | 없음 | `variant="tertiary"` | 확정 |
| 238:2275 Hover · FW · Off | ctx, 520×47 | 포인터 올림 | 버튼 전체 | 바탕 rgba(34,34,34,0.05) | 없음 | `:hover` | 확정 |
| 238:2279 Pressed · FW · Off | ctx, **489×47** | 누르는 동안 | 버튼 그림 | Hover 와 같은 바탕·테두리, 폭 489 | 없음 | `:active`, 그림만 좌우 16씩 줄임(Primary·Secondary 와 같은 값) | 확정 (Q-03) |
| 238:2294 Focus · FW · Off | ctx, 520×47 | 키보드 포커스 | 버튼 자신 | 테두리 1px → **2.5px #222**, 바탕 없음, 바깥 틀 없음 | 없음 | `:focus-visible`, 크기 그대로 | 확정 (Q-06·Q-15) |
| 238:2259 Loading · FW · Off | ctx, 520×47 | 지속 상태 | 버튼 전체 | 바탕 #DDD, 테두리 없음, 점(36×8) | 점 | `loading` | 확정 (Q-05) |
| 238:2257 Disabled · FW · Off | ctx, 520×47, 이름 "State=Disabled, Size=Full Width, Icon=Off" | 사용 불가 | 버튼 전체 | #DDD, 테두리 없음, 흰 글자 16pt(텍스트 238:2258) | 없음 | `disabled` | 확정 |
| 238:2285 Default · FW · On | ctx, metadata 520×47 + 자식 | 기본 | 버튼 전체 | frame "icons" 245:3539 24×24 를 x 24 · y 12 에 절대 위치, 글자 238:2286 은 가운데(x 233.5) | Google G(PNG) | `icon` 슬롯(왼쪽 칸) | 확정 (Q-07·Q-08) |
| 238:2288 Hover · FW · On | ctx, 520×47 | 포인터 올림 | 버튼 전체 | 5% 바탕 | Google G | `:hover` | 확정 |
| 238:2291 Pressed · FW · On | ctx, **489×47** | 누르는 동안 | 버튼 그림 | 5% 바탕, 폭 489 | Google G | `:active` | 확정 (Q-03) |
| 238:2296 Focus · FW · On | ctx, 520×47 | 키보드 포커스 | 버튼 자신 | 2.5px 테두리, 아이콘 위치 24·12 | Google G | `:focus-visible` | 확정 (Q-06) |
| 238:2299 Loading · FW · On | ctx, 520×47 | 지속 상태 | 버튼 전체 | 아이콘·글자 없이 점만 → Loading Off 와 같음 | 없음(점만) | `loading` 이면 아이콘 숨김 | 확정 (Q-04) |
| 246:6117 (이름이 **"State=Disabled, Size=Full Width, Icon=Off" 로 238:2257 과 중복**, Icon=On 줄에 놓임) | ctx, metadata 520×47 | 사용 불가 | 버튼 전체 | #DDD, 흰 글자(246:6118), 아이콘 없음 | 없음 | `disabled` 이면 아이콘 숨김 | 확정 (Q-04) |
| 238:2273 Default · Small · Off | ctx, 91×48 | 기본 | 버튼 전체 | 1px #222 테두리, 13pt #222, padding 16/24 | 없음 | `size="small"` | 확정 |
| 238:2277 Hover · Small · Off | ctx, 91×48 | 포인터 올림 | 버튼 전체 | 5% 바탕 | 없음 | `:hover` | 확정 |
| 238:2281 Pressed · Small · Off | ctx, 91×48 | 누르는 동안 | — | Hover 와 같음 | 없음 | `:active` | 확정 |
| 238:2283 Focus · Small · Off | ctx, 91×48 | 키보드 포커스 | 버튼 자신 | Hover 와 같음(5% 바탕 + 1px 테두리), 따로 링 없음 | 없음 | `:focus-visible` 에서 Hover 모양 | 확정 (Q-06) |
| 238:2265 Loading · Small · Off | ctx, **84×47** | 지속 상태 | 버튼 전체 | #DDD, 점 상자 h12 안에 36×12 점 그림(다른 asset) | 점 | `loading` | 확정 (Q-05) |
| 238:2307 Disabled · Small · Off | ctx, 91×48 | 사용 불가 | 버튼 전체 | Secondary Buttons 238:2229 인스턴스를 품음: #DDD, 흰 13pt | 없음 | `disabled`, Button 안에서 같은 값으로 그림 | 확정 (Q-12) |

### Links 238:2309

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 238:2325 Default · Medium · Subtle · Off | ctx + 스크린샷, 83×17 | 기본 | 링크 | 기준: "Cleaning fee" 14pt Semibold #222, 밑줄 없음 | 없음 | `variant="subtle" size="medium"` | 확정 (Q-10) |
| 238:2327 Focus · Medium · Subtle · Off | ctx, **90×21** | 키보드 포커스 | 글자 상자 바깥 | 2px #222 테두리, 글자와 사이 2, 모서리 4 | 없음 | `:focus-visible` outline(currentColor) | 확정 (Q-06) |
| 238:2314 Default · Medium · Subtle · On | ctx, 97×17 | 기본 | 링크 | "Show more" + 화살표 16×16, gap 4, 세로 가운데 | 화살표(뒤) | `hasIcon` | 확정 (Q-10) |
| 238:2319 Focus · Medium · Subtle · On | ctx, **101×21**, 리드 metadata 238:2319 | 키보드 포커스 | 글자+아이콘 바깥 | 2px #222 테두리 p2 r4 가 안쪽 frame 238:2320(text 238:2321 77×17 + frame 238:2322 16×16)을 감쌈 | 화살표 | `:focus-visible` | 확정 (Q-06·Q-12) |
| 238:2310 Default · Small · Subtle · Off | ctx, 33×14 | 기본 | 링크 | "Show" 12pt Semibold Underlined #222, 자간 조정 끔(kern 0) | 없음 | `size="small"` | 확정 (Q-10) |
| 238:2312 Focus · Small · Subtle · Off | ctx, **37×18** | 키보드 포커스 | 글자 상자 바깥 | **1.5px** #222 테두리, 사이 2, 모서리 4 | 없음 | `:focus-visible` | 확정 (Q-06·Q-15) |
| 238:2329 Default · Small · Legal · Off | ctx, 100×14 | 기본 | 링크 | "Terms of Service" 12pt Semibold Underlined **#004CC4** | 없음 | `variant="legal"` | 확정 (Q-10·Q-13) |
| 238:2331 Focus · Small · Legal · Off | ctx, **104×18** | 키보드 포커스 | 글자 상자 바깥 | 2px #004CC4 테두리, 사이 2, **모서리 2** | 없음 | `:focus-visible` | 확정 (Q-06·Q-15) |

- Focus 링이 감싸는 정확한 범위와 근거:
  - Primary·Secondary: 버튼을 4px 떨어진 바깥 틀(#222, 모서리 12)이 감싸고, 버튼 자신은 2px #D3D3D3 테두리(모서리 8)를 가진다. Figma 변형은 바깥 틀 때문에 8px 크다(FW 528×55, Small 99×56). 코드는 Q-06 A 대로 box-shadow·outline 으로 그려 버튼 자리를 바꾸지 않는다.
  - Tertiary FW: 버튼 자신의 테두리가 2.5px #222 로 두꺼워진다. 크기 그대로(520×47). Tertiary Small: 별도 링 없음 — Hover 모양.
  - Links: 글자(와 아이콘) 상자를 2px 띄워 테두리가 감싼다(변형이 4~7px 큼). 테두리 색 = 글자 색(#222 / #004CC4) → `outline: … currentColor` + `outline-offset`.
- Figma에 실제로 없는 상태·조합: Primary Icon=On, 모든 Small × Icon=On, Tertiary Disabled × Icon=On(이름 중복으로 사실상 없음), Secondary Hover 의 시각 차이, Secondary Small Pressed 의 시각 차이, Links Hover/Pressed/Visited/Disabled, Links Legal Medium·Small+Icon·Legal+Icon, Loading 점의 움직임(정지 그림 한 장뿐). 모두 만들지 않는다.
- Primary gradient 스타일 이름(get_variable_defs): Default 238:2164 = **Gradient 02**, Hover 238:2156 = **Gradient 03**, Pressed 238:2162 = **Gradient 01**. 값은 각각 `--gradient-selfmake-1` / `-2` / `-3` 과 같다(6절).
- 남은 사실: 없음. 마지막 세 노드는 리드가 읽었다(get_metadata 238:2203 → Camera alt 238:2204 FRAME, 238:2314 → Keyboard arrow right 238:2316 FRAME, 238:2307 → 유일한 자식 인스턴스 "Secondary Buttons" 238:2308, 91×48). 결정(`none`)은 바뀌지 않는다.

## 6. 색·alpha·디자인 토큰 대응

역할 이름은 사용자 결정("합친 목록 + 다시 가져오기")의 합친 목록을 따른다. 이 계획이 처음 제안한 이름 가운데 `link` 만 `text-link` 로 바뀌었다(semantic `link` 는 `--color-link` 가 되어 가져온 primitive `--color-link` 와 이름이 겹친다). 나머지는 같다.

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| Primary 바탕 Default·Focus 안쪽 | radial, stops rgba(211,55,83,1)@0 · rgba(209,54,96,1)@0.52835 · rgba(199,45,101,1)@1 / 스타일 Gradient 02 | — (gradient 는 layout 토큰) | `--gradient-selfmake-1` | viewBox 40×40, 정규화 변환 a/W 0.10395 · d/H 1.4136 · e/W −0.03955 · f/H 1 | 값 일치(Figma 91×48·520×47 를 정규화하면 0.10395 · 1.4135 · −0.03955 · 1, stop 같음) | 기존 토큰 재사용(Q-14 A). `background-size: 100% 100%` 필요 |
| Primary Hover | radial 2겹, stops rgba(199,45,101,1)@0 · rgba(210,55,96,1)@0.48442 · rgba(210,55,85,1)@1 / 스타일 Gradient 03 | — | `--gradient-selfmake-2` | 정규화 −0.09895 · 0.1 · −0.1 · −12.158 · 0.99425 · 0 | 값 일치(91×48·520×47 모두 같은 정규화 값) | Q-14 A |
| Primary Pressed | `linear-gradient(90deg, rgb(235,76,96) 0%, rgb(235,76,96) 100%)` 위 + Hover 와 같은 radial 2겹 / 스타일 Gradient 01 | — | `--gradient-selfmake-3` | 같은 구조·값 | 값 일치(488×47 도 같은 정규화 값) | 맨 위 단색이 불투명이라 보이는 색은 #EB4C60 단색. Q-14 A |
| Primary 글자 | #FFFFFF / Shade 01 | shade-01 | `on-primary` | #FFFFFF | 일치(주 동작 위 글자) | — |
| Secondary 바탕(Default·Hover·Pressed·Loading·Focus 안쪽) | #222222 / Shade 02 | shade-02 | `surface-inverse`(새 역할) | #222222 | 일치 | `text` 와 값만 같음(글자 역할). 토큰 계획 rev 5 |
| Secondary 글자·Camera alt | #FFFFFF / Shade 01 | shade-01 | `on-inverse`(새 역할) | #FFFFFF | 일치 | on-primary·on-image·bg 와 값만 같음. rev 5 |
| Disabled 바탕(세 세트), Primary·Tertiary Loading 바탕 | #DDDDDD / Neutral 03 | neutral-03 | `surface-disabled`(새 역할) | #DDDDDD | 일치 | border·indicator 와 값만 같음. rev 5 |
| Disabled 글자(세 세트) | #FFFFFF / Shade 01 | shade-01 | `on-disabled`(새 역할) | #FFFFFF | 일치 | `text-disabled` 는 #B0B0B0. rev 5 |
| Focus 바깥 틀(Primary·Secondary), Tertiary FW Focus 2.5px 테두리 | #222222 / Shade 02 | shade-02 | `focus-ring`(새 역할) | #222222 | 일치 | rev 5 |
| Focus 안쪽 2px 테두리(Primary·Secondary) | #D3D3D3 / Neutral 04 | neutral-04 | `focus-ring-inner`(새 역할) | #D3D3D3 | 일치 | rev 5 |
| Tertiary 1px 테두리 | #222222 / Shade 02 | shade-02 | `border-emphasis`(새 역할) | #222222 | 일치 | border(#DDD)·border-strong(#B0B0B0) 값 다름. rev 5 |
| Tertiary 글자 | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| Tertiary Hover·Pressed·Small Focus 바탕 | 변수 "Shade 02 - 5%" = 불투명 #222222(get_variable_defs, alpha 가 있으면 MCP 는 8자리 hex 를 줌) + Figma 채우기 불투명도 5%(design code 의 rgba(34,34,34,0.05)) | shade-02-5(가져온 primitive, #222222) | `surface-hover`(새 역할) + 부품 안에서 불투명도 0.05 | #222222 를 0.05 로 겹침 = 보이는 값 rgba(34,34,34,0.05) | 일치 | ListingCard 하트 선례(Shade 02 - 30% → 역할 색 + fill-opacity 0.3)와 같은 방식. 방법: `.ds-button--tertiary` 에 `position: relative`, `::before` 층(`inset: 0`, `border-radius: inherit`, `background: var(--color-surface-hover)`, `opacity: 0.05`, `pointer-events: none`)을 두고 `:hover`·`:active`·small `:focus-visible` 에서만 보이게 한다. 근사 색·`color-mix()` 를 쓰지 않는다. rev 5 |
| Loading 점 1번 | #EBEBEB(asset 안) / Neutral 02 | neutral-02 | `loading-dot-muted`(새 역할) | #EBEBEB | 일치 | rev 5 |
| Loading 점 2·3번 | white(asset 안) / Shade 01 | shade-01 | #DDD 위(Primary·Tertiary) `on-disabled`, #222 위(Secondary) `on-inverse` | #FFFFFF | 일치 | 위 새 역할을 같이 씀 |
| Links Subtle 글자·밑줄·화살표 선·Focus 테두리 | #222222 / Shade 02 | shade-02 | `text`(테두리는 `currentColor`) | #222222 | 일치 | — |
| Links Legal 글자·밑줄·Focus 테두리 | #004CC4 / "Link" | link(가져온 primitive `--color-link`) | `text-link`(새 역할) | #004CC4 | 일치 | 역할 이름 `link` 는 primitive `--color-link` 와 겹쳐서 `text-link`. rev 5 |
| Tertiary Google G | 다색 래스터 PNG | — | 토큰 대상 아님 | — | — | Q-08 A: 견본 asset |

- 컴포넌트 fill과 Figma 부모 배경을 구분한 결과: Primary = gradient, Secondary = #222, Tertiary 기본 = 투명(테두리만), Links = 투명. 세트 틀 자체 채우기는 응답 코드에 없다(스크린샷의 옅은 회색 + 보라 점선 = Figma 컴포넌트 세트 표시). 사이트 페이지 배경은 흰색(`--color-bg`) → Storybook 캔버스도 흰색(Tertiary·Links 가 투명이라 중요).
- 같은 값의 후보가 여러 개일 때 선택 근거: #222222 는 `text` 가 있지만 바탕·테두리·포커스 링은 글자 역할이 아니어서 쓰지 않았다. #FFFFFF 는 Primary 위 글자만 `on-primary` 와 역할이 맞는다. #DDDDDD 는 `border`·`indicator` 와 값만 같다. (참고: 승인된 IconButton 은 같은 값이라는 이유로 `--color-text`·`--color-bg`·primitive 를 직접 썼다 — 이 계획은 따르지 않는다.)
- 신규 token의 사용처와 기존 token으로 처리할 수 없는 이유: 위 표의 새 역할 10개(surface-inverse, on-inverse, surface-disabled, on-disabled, focus-ring, focus-ring-inner, border-emphasis, surface-hover, text-link, loading-dot-muted). 모두 가져온 primitive 에 매핑하며 새 primitive 는 없다. 리드가 `docs/plans/tokens.md` revision 5 에 올린다.
- 그라데이션 주의: `--gradient-selfmake-*` 는 viewBox 40×40 SVG 를 `preserveAspectRatio='none'` 으로 그린 것이다. 같은 모양으로 늘어나려면 버튼에서 `background-size: 100% 100%` 와 `background-repeat: no-repeat` 를 함께 줘야 한다 → 브라우저에서 확인(10절).
- 글자 토큰(모두 tokens.css 에 있음):

| Figma 스타일 | 값 | 토큰 | 상태 |
|---|---|---|---|
| Body Copy/16pt Semibold | SF Pro Semibold 16 / 590 / 자간 0 | `--font-type-body-copy-16pt-semibold`, `--text-type-body-copy-16pt-semibold`(16px), `--font-weight-type-body-copy-16pt-semibold`(590), `--tracking-type-body-copy-16pt-semibold`(0px) | 있음 |
| Body Copy/13pt Semibold | SF Pro Semibold 13 / 590 / 자간 0 | `--font-type-body-copy-13pt-semibold`, `--text-type-body-copy-13pt-semibold`(13px), `--font-weight-type-body-copy-13pt-semibold`(590), `--tracking-type-body-copy-13pt-semibold`(0px) | 있음(리드가 가져옴, Q-15 A) |
| Body Copy/14pt Semibold | SF Pro Semibold 14 / 590 | `--text-type-body-copy-14pt-semibold` 등 | 있음 |
| Body Copy/12pt Semibold Underlined | SF Pro Semibold 12 / 590 + 밑줄(`text-decoration-skip-ink: none`, `text-underline-position: from-font`), kern 0 | `--font-type-body-copy-12pt-semibold-underlined`, `--text-type-body-copy-12pt-semibold-underlined`(12px), `--font-weight-type-body-copy-12pt-semibold-underlined`(590), `--tracking-…`(0px) + `text-decoration: underline` | 있음(리드가 가져옴). Q-15 A 의 "12pt Semibold 토큰 + 밑줄"과 값이 같고, 이제 정확한 스타일 이름의 토큰이 있어 그것을 쓴다 |

  - 줄 높이: Figma "lineHeight: 100" 은 단위를 알 수 없다(foundation.json 기록과 같음). 코드 `leading-[normal]` → `line-height: normal`(ListingCard 선례). 47 = 14+19+14, 48 = 16+16+16 이 이 값과 맞는다.
- 크기 값:

| Figma 값 | 쓰는 곳 | CSS |
|---|---|---|
| padding 14 / 0 | FW 버튼 | `calc(var(--spacing) * 3.5)` |
| padding 16 / 24 | Small 버튼 | `calc(var(--spacing) * 4)` / `calc(var(--spacing) * 6)` |
| gap 4 | 아이콘-글자(Secondary·Links) | `calc(var(--spacing) * 1)` |
| 바깥 틀 4 | Primary·Secondary Focus | `calc(var(--spacing) * 1)` |
| 사이 2 | Links Focus | `calc(var(--spacing) * 0.5)` |
| 모서리 8 / 12 / 4 | 버튼 / Focus 바깥 틀 / Links Focus | `--radius-md` / `--radius-lg` / `--radius-sm` |
| 모서리 2 | Legal Focus | `calc(var(--radius-sm) / 2)` (Q-15 A) |
| 선 1 / 2 | Tertiary 테두리 / Focus 안쪽·Links Focus | `--border-width-thin` / `--border-width-thick` |
| 선 1.5 / 2.5 | Links Small Subtle Focus / Tertiary FW Focus | `calc(var(--border-width-thin) * 1.5)` / `calc(var(--border-width-thin) * 2.5)` (Q-15 A) |
| 아이콘 16 / 24 | Camera alt·화살표 / Google G 칸 | `calc(var(--spacing) * 4)` / `calc(var(--spacing) * 6)` |
| 아이콘 위치 x 24 · y 12 | Tertiary FW On | `calc(var(--spacing) * 6)` / `calc(var(--spacing) * 3)` (테두리 기준점 차이 ≤1px 은 렌더 확인 항목) |
| 폭 520 | FW | `width: 100%`(Q-02 A) |
| 폭 488 / 489 | Pressed FW | 그림만 좌우 `calc(var(--spacing) * 4)` 씩 줄임(Q-03 A) |
| 폭 488 | Secondary Disabled FW | 반영 안 함(Q-04 A) |

- 토큰 생성 경로·검증 계획: 색 역할은 토큰 계획 revision 5 승인 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens`(리드). 글자 토큰·`--color-link` 는 이미 생성됨. 실행 후 `pnpm ds:guard`(G10·G13). 이 계획 작성자는 아무 명령도 실행하지 않았다.

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| ellipses — Primary 238:2170·2176, Secondary 238:2199·2233·2249, Tertiary 238:2261·2301 (frame, get_metadata 238:2168) | MCP asset aac50ea5f69a… (sha256 21e04560216a) viewBox 0 0 36 8, circle cx 4·18·32 cy 4 r 4 | 36×8, 1번 #EBEBEB · 2·3번 white, 회전 없음 | 모든 Loading(Tertiary Small 제외) | Loading 외 모든 상태 | 확인 |
| ellipses — Tertiary 238:2267 | MCP asset 8736ea92d3bb… (sha256 a27378492643) viewBox 0 0 36 12, 같은 원 3개(cy 4) | 36×12 상자, `inset: -50% 0 0 0` 배치, 색 같음 | Tertiary Loading Small 만 | 그 밖 | 확인 — 그림은 위와 같고 상자 높이만 다름 |
| Camera alt — Secondary 238:2204·2210·2216·2242 | MCP asset fd125fd16c5d… (sha256 a5271983189a) path 2개: 원 `M8 10.1333C9.17821 …Z`, 몸체 `M6 1.33333L4.78 2.66667H2.66667 …Z` | 16×16, fill white, clip 16×16, 회전 없음 | Secondary FW On: Default·Hover·Pressed·Focus | Secondary FW On Loading·Disabled, Small, Primary, Tertiary | 확인(frame 238:2204, 리드 get_metadata 238:2203) |
| icons — Tertiary frame 245:3539·3544·3549·3554 > rounded-rectangle 245:3540 "7611770 1"(이미지 채우기) | MCP asset a652064d47e2… **PNG 512×512 RGBA** (sha256 0aa569c29782), Google "G" 다색 로고 | 24×24 칸, 이미지 153.85% 크기·−26.92% 위치(가운데만 보임), 칸 위치 x 24 · y 12 | Tertiary FW On: Default·Hover·Pressed·Focus | Loading On, 246:6117, Small, 다른 세트 | 확인(래스터) — Q-08 A: Button 은 그림을 갖지 않고 스토리 견본만 `my-assets` 로 등록해 `<img alt="">` |
| Keyboard arrow right — Links 238:2316, 238:2322(frame, 리드 metadata) | MCP asset 3193e8b8b322… (sha256 4429f2487fb2) path `M6 12L10 8L6 4` | 16×16, stroke #222222 · 1.33333 · round cap/join, fill none, clip 16×16 | Links Medium Subtle On (Default·Focus) | 다른 Links 6개 | 확인 |

- SVG 는 `<svg>` JSX 로 원본 경로·viewBox 를 그대로 쓰고 색은 토큰/currentColor 로 준다(카메라는 fill, 화살표는 stroke). 카메라는 Button 이 아니라 스토리 견본이 `icon` 슬롯에 넣는다(Q-07 A). 화살표는 Link 가 `hasIcon` 일 때 직접 그린다(Q-10 A). 점은 Button 이 원 3개 JSX 로 그린다. 기존 `Icon` 부품(add/close/search 단색만)에는 이 그림들이 없다.
- 기존 Link 의 external 화살표(`M9 3h4v4M13 3L7 9M11 9.5V13H3V5h3.5`)는 Figma 에 없는 키트 그림이라 `external` 과 함께 제거한다(Q-11 A).

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| Button `variant` | 세트 3개 | "primary"(기본) / "secondary" / "tertiary" | 5절 모양 | — | Q-01 추천안 채택 |
| Button `size` | Size 축 | "small"(기본) / "full-width" | FW = 부모 폭 100%, Small = 내용 폭 | — | Q-01·Q-02 추천안 채택 |
| Button `loading` | State=Loading | false / boolean | 글자·아이콘 대신 점 3개(움직임 없음), 글자는 화면에서 숨기고 읽기 프로그램 이름은 유지, 바탕은 Figma 대로, Small 폭은 내용대로 84 | 콜백 안 부름, `aria-busy="true"`·`aria-disabled="true"`, 포커스 유지 | Q-05 추천안 채택 |
| Button `icon` | Icon=On(Secondary·Tertiary FW) | 없음 / ReactNode | secondary·full-width: 글자 앞 16, gap 4 / tertiary·full-width: 왼쪽 24 칸(x 24·y 12), 글자 가운데 / primary·small: 받지 않음 | disabled·loading 이면 숨김 | Q-04·Q-07 추천안 채택 |
| Button `href` | 사이트 Reserve(`<a href="/checkout">`) | 없음 / string | 있으면 같은 클래스의 `<a href>` 로 렌더 | disabled·loading 이면 href 제거 + `aria-disabled` | Q-09 추천안 채택 |
| Button `disabled` | State=Disabled | 네이티브 | #DDD·흰 글자, hover/active 없음, 클릭 없음 | Tab 에서 빠짐 | Q-01 추천안 채택 |
| Button `onClick`·`type`·`children` | 기존 API | `type="button"` 기본 유지 | 클릭 콜백 | Enter/Space | 기존 유지 |
| Link `variant` | Type 축 | "subtle"(기본) / "legal" | subtle #222 · legal #004CC4 밑줄 | — | Q-10 추천안 채택 |
| Link `size` | Size 축 | "medium"(기본) / "small"; legal 은 small 만(타입으로 제한) | medium 14pt 밑줄 없음 · small 12pt Underlined | — | Q-10 추천안 채택 |
| Link `hasIcon` | Icon 축 | false / true(subtle·medium 만, 타입으로 제한) | 글자 뒤 Figma 화살표 | — | Q-10 추천안 채택 |
| Link `href` 등 `<a>` 속성 | 기존 API | 전달 | 이동 | Tab·Enter | 기존 유지 |
| Link `disabled`·`external`·`inline` | 기존 키트(Figma 없음) | 제거 | — | — | Q-11 추천안 채택 |
| Hover/Pressed/Focus | Figma State | prop 아님 | `:hover`·`:active`·`:focus-visible`. Link 의 기존 hover 밑줄·색 바꿈은 Figma 에 없어 지움 | `:not(:disabled)` | Q-03·Q-06·Q-10 추천안 채택 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | Button API 이름과 기본값. Figma 축은 세트 3개 × Size Full Width/Small. 지금은 variant 4개(outline 포함)·size l/m/s | **A (추천)** `variant: primary/secondary/tertiary`(outline 제거), `size: "full-width" \| "small"`, 기본 `variant="primary" size="small"`. / B 기본 `size="full-width"`. / C 기존 이름(l/m/s) 유지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-02 | Full Width 의 폭. Figma 는 520 고정 | **A (추천)** 부모 폭을 채움(`width: 100%`). / B 520 고정 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-03 | 누르는 동안 폭이 줄어듦: Primary·Secondary FW 488, Tertiary FW 489. Secondary 는 Hover 차이가 없고 Pressed 는 폭만 다름, Secondary Small 은 Hover·Pressed 모두 차이 없음 | **A (추천)** FW 의 `:active` 에서 그림만 좌우 16씩 줄임(누르는 영역 유지), Small 은 변화 없음, Secondary Hover 도 변화 없음. / B 폭 변화 무시. / C Figma 정리 뒤 다시 읽기 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-04 | Disabled·Loading 과 아이콘·폭의 불일치: Secondary Disabled FW(238:2195·2221) 폭 488·On 인데 아이콘 없음, Tertiary 에 Disabled × Icon=On 이 없고 246:6117 이 238:2257 과 이름 중복, Loading On = Loading Off | **A (추천)** disabled·loading 이면 아이콘을 숨기고 폭은 FW 그대로(488 은 Figma 실수로 봄). / B Secondary Disabled FW 만 폭 488. / C Figma 정리 뒤 다시 읽기 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-05 | Loading 지속 상태. 점 3개(정지 그림). Primary·Tertiary 바탕 #DDD, Secondary #222 유지. Small 폭 84 | **A (추천)** `loading` boolean: 점을 그리고 글자는 화면에서 숨김(읽기 이름 유지), `aria-busy`, 콜백 막음(`aria-disabled`, 포커스 유지), 점 움직임 없음, Small 폭 84. / B 네이티브 `disabled` 로 막음. / C 점 움직임 추가 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-06 | Focus 표현. Primary·Secondary 바깥 4px 틀 + 안쪽 2px, Tertiary FW 2.5px 테두리, Tertiary Small 은 Hover 모양, Links 글자색 테두리 | **A (추천)** `:focus-visible` 에서 box-shadow·outline 으로 그려 자리 밀림 없음, Tertiary Small 은 Figma 대로 Hover 모양. / B Tertiary Small 에 2.5px 테두리. / C 바깥 틀이 자리를 차지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-07 | Icon=On 의 API. Secondary FW Camera alt(글자 앞), Tertiary FW Google G(왼쪽 끝). Primary·Small 은 On 없음 | **A (추천)** `icon?: ReactNode` 슬롯, 위치는 Figma 대로, primary·small 에서는 받지 않음, 스토리 견본은 Figma 원본 그림. / B `hasIcon` 에 그림 고정. / C 이번에는 만들지 않음 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-08 | Tertiary 의 Google G 는 512×512 다색 PNG(상표 로고). 키트 규칙은 단색 `<svg>` + currentColor | **A (추천)** Button 은 그림을 갖지 않고 스토리 견본에서만 PNG 를 `my-assets` 로 등록해 `<img alt="">` 로 보여 줌(asset 등록은 구현 단계에서 따로 실행). / B 견본 만들지 않음. / C 다른 그림으로 바꿈(R03 금지) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-09 | Detail "Reserve" 는 이동인데 모양은 Primary FW. Figma 에 링크형 버튼 없음 | **A (추천)** Button 에 `href` 를 더해 같은 모양의 `<a href>` 로 렌더(disabled·loading 이면 href 제거 + `aria-disabled`). / B `<button>` + 이동 코드. / C Link 에 버튼 모양 variant | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-10 | Link API. Figma 축: Type Subtle/Legal, Size Medium/Small, Icon(Subtle Medium 만), State Default/Focus. Hover 없음 | **A (추천)** `variant: "subtle" \| "legal"`, `size: "medium" \| "small"`, `hasIcon`(Figma 화살표), 타입으로 Figma 의 4조합만 허용, 기존 hover 효과 제거. / B 조합 제한 없음. / C 기존 이름 유지 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-11 | 기존 Link 의 `inline`·`disabled`·`external` 은 Figma 에 없음. 사용처 0 | **A (추천)** 셋 다 제거. / B `external` 의 새 창 동작만 유지. / C 그대로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) | resolved |
| Q-12 | Nested parts: Tertiary 238:2307 의 Secondary Buttons 인스턴스, Links 238:2319 의 238:2320 | **A (추천)** 두 곳 모두 `none` — Button·Link 자신의 안쪽 레이어로 그림. / B 238:2320 원본을 알려 주면 다시 대응 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 결과: 238:2320 은 인스턴스가 아니라 FRAME(리드 get_metadata 238:2319)이라 Nested parts 행에서 뺐고, 238:2307 행은 `none` 으로 confirmed | resolved |
| Q-13 | 새 색 역할 + 새 primitive(6절 표) | **A (추천)** 제안한 이름·매핑대로 리드가 토큰 계획에 올림. / B 이름만 바꿈. / C 값이 같은 기존 역할(R01 위반) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 새 색 역할은 "합친 목록 + 다시 가져오기" 선택: 이름은 합친 목록대로(`link` → `text-link`, primitive `--color-link` 와 이름 충돌 회피). `surface-hover` 는 가져온 primitive `shade-02-5`(#222222)에 매핑하고 Figma 채우기 불투명도 5% 는 부품의 `::before` 층 `opacity: 0.05` 로 적용(ListingCard 하트 선례). 리드가 tokens.md revision 5 에 기록 | resolved |
| Q-14 | Primary gradient 토큰. Figma 값은 크기마다 viewBox 가 다르지만 정규화하면 `--gradient-selfmake-1/2/3` 과 같음 | **A (추천)** 있는 `--gradient-selfmake-1`(기본·Focus 안쪽) / `-2`(Hover) / `-3`(Pressed)을 `background-size: 100% 100%` 와 함께 다시 씀. / B 크기별 새 토큰 6개 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 스타일 이름 확인: Default=Gradient 02, Hover=Gradient 03, Pressed=Gradient 01 | resolved |
| Q-15 | 없는 글자·layout 토큰: 13pt Semibold, 선 1.5·2.5px, 모서리 2px, 12pt Underlined | **A (추천)** 13pt 는 Figma 글자 스타일을 가져와 생성, 1.5·2.5·2 는 있는 토큰 식(`calc(var(--border-width-thin) * 1.5)` 등), 12pt Underlined 는 12pt Semibold 값 + 밑줄. / B 새 layout 토큰. / C 근사(금지) | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26). 결과: 리드가 글자 스타일을 가져와 `--text-type-body-copy-13pt-semibold`·`--text-type-body-copy-12pt-semibold-underlined` 등이 생김(값 같음, 정확한 스타일 이름 토큰 사용) | resolved |
| Q-16 | (rev 2) `ghost`·`text` 의 공개 API 형태(12.3). 측정한 모양은 ghost 3개(높이 32·37·48)와 text 6개인데, text 중 셋이 14px 이면서 굵기·줄 높이·여백·hover 가 서로 다르다(12.2). 글자·여백·밑줄을 낱낱의 축으로 나누면 측정하지 않은 조합이 크게 늘어난다 | **A (추천)** `variant` 에 "ghost"·"text" 를 더하고, 기존 `size` 가 그 variant 의 측정 모양 하나를 고른다. 이름은 상자 높이 순: ghost "small" 32·"medium" 37·"large" 48 / text "xsmall" 16·"small" 18·"medium" 21·"large" 24·"xlarge" 34(기본은 rev 1 처럼 "small"). 새 prop 은 text 전용 `tone`("default" = `text`, "secondary" = `text-secondary`) 하나뿐. 아이콘 칸·간격·hover·밑줄은 size 에 묶인다(12.4) · B 용도 이름의 새 prop(`look` 값 "toolbar"·"caption"·"inline" 등) — 이름은 읽기 쉽지만 prop 이 하나 늘고 `size` 와 뜻이 겹친다 · C 낱낱 prop(`underline`·`weight`·`padded`·`tone` 등) — 측정하지 않은 조합이 많이 생겨 검사할 모양이 늘어난다 | 추천안 채택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-17 | (rev 2) ghost 의 폭. 지금 페이지는 세 버튼 모두 폭 고정(Change 76 · 사진 모두 보기 136 · Show more 132). 측정한 여백으로 내용 폭을 계산하면 Change 76.31(글자 44.31 + 32, Figma 75.94), 사진 모두 보기 132.94(지금 오른쪽 빈칸 3.06 이 사라짐), Show more 132.00 | **A (추천)** 크기마다 지금 폭을 최소 폭으로(small 76 `calc(var(--spacing) * 19)` · medium 136 `* 34` · large 132 `* 33`) + 측정 여백(좌우 16 · 16 · 24.5), medium 은 내용을 왼쪽부터. → 사진 모두 보기 136·Show more 132 는 지금과 같고 Change 만 76.31(+0.31px, 기록 후 검수). 글자가 길어지면 버튼이 늘어난다 · B A 와 같되 small 의 좌우 여백 0(지금 페이지 CSS 그대로) → Change 76 정확, 대신 더 긴 글자는 가장자리에 붙는다 · C 폭 고정(`width`) — 지금과 같지만 글자가 길면 넘친다 · D 최소 폭 없이 내용 폭 — 사진 모두 보기가 3.06 좁아지고 오른쪽 기준 배치라 왼쪽 끝이 움직인다 | 추천안 채택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-18 | (rev 2) `ghost`·`text` 의 키보드 포커스 모양. Figma 에 없다. 지금 사이트에서 Tab 되는 버튼·링크는 모두 브라우저 기본 링(`outline: auto 1px`, `<button>` offset 0 · `<a>` offset 1)이고, ListingTitle Q-03·PhotoGallery Q-06·ListingDescription·Card Q-22 가 기본 링을 적었다. rev 1 Button 은 `outline: none` 뒤 Figma 링을 그린다 | **A (추천)** ghost·text 는 모두 브라우저 기본 링 하나로 통일(CSS 에 색을 쓰지 않음, 요소 자신의 모서리를 따름). rev 1 의 `outline: none` 은 primary·secondary·tertiary 에만 걸리게 좁힌다(rev 1 화면 변화 없음). 지금 `<a>` 인 Show original·Full policy·GBP·Price breakdown·More info 는 링 offset 1 → 0, Tab 이 안 되던 Learn more·리스팅 신고하기는 링이 새로 생김 · B 키트 `focus-ring` 2px 선(rev 1 Link 처럼 `outline` + 2 띄움) — 키트 안에서는 통일되지만 지금 화면과 다름 · C ghost 는 기본 링, text 는 키트 링 | 추천안 채택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-19 | (rev 2) `tone` 을 쓸 수 있는 범위. 측정한 조합: xsmall·medium 은 secondary, large·xlarge 는 default, small 은 둘 다(6 조합) | **A (추천)** text 의 모든 size 에서 두 tone 을 허용(둘 다 이미 있는 글자 역할이고 새 상태가 아님). 스토리·검수는 측정한 6 조합만 · B 측정한 6 조합만 타입으로 허용(xsmall·medium 은 secondary, large·xlarge 는 default 로 고정) | 추천안 채택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-20 | (rev 2) `ghost`·`text` 의 disabled·loading. 측정한 11개에 그런 상태가 없고 사용처도 없다. rev 1 의 disabled(#DDD 바탕·흰 글자)·loading(점 3개) 모양은 primary·secondary·tertiary 의 Figma 에만 있다 | **A (추천)** 새 모양을 만들지 않는다(R02): `disabled` 는 네이티브 동작만(클릭·Tab 없음, hover 바탕·밑줄 바뀜 없음, 커서는 rev 1 과 같은 not-allowed), 색·바탕은 그대로. rev 1 의 disabled·loading 모양 규칙은 rev 1 variant 에만 걸리게 좁힌다. `loading` 은 ghost·text 에서 타입으로 받지 않는다 · B rev 1 disabled 모양(#DDD 상자·흰 글자)을 ghost·text 에도 적용 — 글자 버튼에 회색 상자가 생기는 새 모양 · C ghost·text 는 `disabled` 도 타입에서 막음 | 추천안 채택 (chosen in chat, 2026-11-26) → A | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 세트 스크린샷과 같은 모양, 흰 캔버스(Tertiary·Links 투명) | Storybook iframe 스크린샷·computed style | |
| 모든 상태·크기 | 5절 표에서 만들기로 한 조합 — Default·Disabled·Loading 은 스토리, Hover·Pressed·Focus 는 실제 포인터·키보드 | Playwright 실제 포인터(`:hover`·`:active` 색·그림 폭), `userEvent.tab` 후 링 측정 | |
| Primary gradient | 91×48 과 넓은 버튼에서 Figma 와 같은 radial 모양, 반복 없음 | computed `background-image`·`background-size`, 스크린샷 대조 | |
| Pressed 그림 줄임 | FW 에서 그림만 좌우 16씩 줄고 클릭이 빠지지 않음 | 실제 포인터로 가장자리 누르기 + 콜백 1회 | |
| 아이콘과 노출 조건 | 카메라·화살표·점이 원본 경로·크기·위치, Google G 칸 x 24·y 12, disabled·loading 에서 아이콘 숨김 | DOM 측정(≤1px 차이는 기록 후 검수), 원본 SVG 대조 | |
| 클릭·이동 기능 | Button 클릭 → `onClick` 1회, `href` 버튼 → 실제 `<a href>`, Link → `<a href>` | Storybook play `fn()` + `userEvent.click`, DOM 검사 | |
| disabled / loading / Tab / Focus | disabled·loading 에서 콜백 0회, loading 은 포커스 유지·`aria-busy`, 링 범위가 5절과 같음 | play + 실제 키보드 | |
| Nested parts identity | 238:2307 행이 `none` 이라 키트 부품 import 없음 — 해당 없음 | `ai:verify` DOM 검사 | |
| Nested part → composite callback | 해당 없음(`none`) | — | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 페이지 3곳 "Become a Host"·Text.stories 정상 | `pnpm ai:check Button`, `pnpm ai:check Link`, `pnpm ai:verify Button`, `pnpm ai:verify Link`, `pnpm typecheck`, `pnpm ds:guard`, 세 페이지 화면 확인 | |

필수 명령과 시각 원본 대조를 구분한다. 아직 수행한 검사는 없다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 부품 계획 8개의 질문을 어떻게 답할까요? → A: 추천안 모두 채택 (chosen in chat, 2026-11-26). Q: 새 색 역할? → A: 합친 목록 + 다시 가져오기 (chosen in chat, 2026-11-26). Q-01~Q-15 모두 9절에 기록.
- 승인한 revision: 1 — 사용자 "Approve revision 1·5 (권장)" 선택 (chosen in chat, 2026-11-26). 같은 선택으로 토큰 계획 revision 5 도 승인·적용됨(리드).
- 구현 전에 남은 조건: 없음. Google G 견본 asset 등록은 구현 단계에서 한다(Q-08 A).
- revision 2(12절) 근거 결정(chosen in chat, 2026-11-26, 리드 전달): "Button 에 공용 모양 추가 (권장)" — ghost·text 두 모양 / "Figma 스타일 값으로 맞춤" — hover #E8E8E8 → #EBEBEB, #6C6C6C → #717171, 굵기 500 → `--font-weight-medium` / "지금 크기·자간 유지 (권장)" — 13.7px·-0.1504px 등은 `calc(var(--spacing) * n)`.
- revision 2 질문: Q: Button revision 2 질문 Q-16~Q-20 → A: 추천안 채택 (권장) (chosen in chat, 2026-11-26) — 모두 A, 9절에 기록.
- 승인한 revision: 2 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26). 같은 선택으로 토큰 계획 revision 6 도 승인·적용됨(리드: `control-bg-subtle`·`control-bg-subtle-hover`·`surface-hover-subtle` 생성).
- 구현 전에 남은 조건(revision 2): 없음. 구역 계획 7개의 Nested parts 행은 12.7 대로 `size`·`tone` 을 더했다(2026-11-26).

## 12. Revision 2 — 공용 모양 `variant="ghost"`·`variant="text"` (바뀌는 내용만)

### 12.1 요청과 근거

- 요청: 사이트 재정립(2026-11-26). 사용자 결정 4 "Button 에 공용 모양 추가 (권장)": ghost = 회색 #F2F2F2 둥근 버튼, text = 글자 버튼(앞 아이콘 선택). 구역 부품은 이 두 모양을 쓰고 자기 버튼을 그리지 않는다(R05, 스펙 C03·P05). 함께 적용한 결정: "Figma 스타일 값으로 맞춤"(hover #E8E8E8 → #EBEBEB `control-bg-subtle-hover`, 흐린 글자 #6C6C6C → #717171 `text-secondary`, 굵기 500 → `--font-weight-medium` = Figma 변수 `sds-typography-weight-medium`), "지금 크기·자간 유지 (권장)"(13.7px·-0.1504px 등은 `calc(var(--spacing) * n)`).
- Figma: 11개 버튼 모두 Figma 에서는 컴포넌트 인스턴스가 아니라 "Button…"·"Link…" frame 이다(각 구역 계획의 Nested parts 행, 12.7). ghost·text 의 Figma 상태 세트는 없다. Figma 호출 0회(design-context 멈춤 — 리드 지시).
- 값: 현재 사이트(dev 서버 http://127.0.0.1:5175, git-demo `aa9a593`)를 Playwright Chromium 1440×900 으로 잰 computed style·상자·hover·Tab(`<로컬 측정 폴더>/rebuild/F/measure.mjs` → `measure.json`, 글자 폭 `textw.mjs`·`textw0.mjs`)와 페이지 CSS(`my-website/pages/DetailPage.css` 198~222·274~302·507~533·774~794·823~827·842~857·1187~1194행, `CheckoutPage.css` 237~244·419~437·490~506행). 구역 계획들이 F 에게 보낸 값(ListingTitle 5절, PhotoGallery 5절, ListingOverview 3절, ListingDescription 5절 끝, Card 12.5, ReservationSummary 10절 끝, RadioButton 12.5)과 대조해 모두 같았다(Price breakdown 글자 폭만 ≈105 → 측정 107.88).
- 읽은 규칙: `docs/ai-component-workflow.md` 1.0 R01~R09, `docs/ai-design-system-spec.md` 1.1, `docs/templates/component-plan.md`, `src/tokens/tokens.css`(현재), `src/components/Button/*`(rev 1 구현).

### 12.2 확인한 사실 — 현재 사이트 측정(1440px)

| # | 버튼 (구역 계획) | 지금 요소 | 상자 폭×높이 | 안쪽 여백·정렬 | 모서리 | 글자 크기/굵기/줄 높이/자간 | 색 | 밑줄 | 아이콘·간격 | hover | 키보드(지금) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| G1 | "사진 모두 보기" (PhotoGallery, /detail) | `<button>` | 136×37(폭·높이 고정) | 0 / 16, 내용 왼쪽부터·세로 가운데(내용 132.94 → 오른쪽 3.06 빈칸) | 9 | 13.7 / 500 / 20.55 / normal | 바탕 #F2F2F2, 글자 #222 | 없음 | 격자 `<img>` 18×18(asset viewBox 18.2857 을 contain 으로 줄임), 간격 4.6 | 바탕 #E8E8E8 | Tab 됨, 기본 링 |
| G2 | "Show more" (ListingDescription) | `<button>` | 132×48(고정) | 글자 가운데(글자 83.00 → 좌우 24.5, 줄 24 → 위아래 12 와 같은 상자) | 12 | 16 / 500 / 24 / normal | #F2F2F2, #222 | 없음 | 없음 | #E8E8E8 | Tab, 기본 링 |
| G3 | "Change" ×2 (ReservationSummary, /checkout) | `<button>` | 76×32(고정, Figma 75.94) | 글자 가운데(글자 44.31) | 8 | 12 / 500 / 18 / normal | #F2F2F2, #222 | 없음 | 없음 | #E8E8E8 | Tab, 기본 링 |
| T1 | "공유하기" · "저장" (ListingTitle) | `<button>` | 96.45×34 · 72.23×34(내용 폭) | 8 / 12, 높이 34 고정(줄 21 이 가운데) | 8 | 14 / 500 / 21 / normal | 바탕 없음, #222 | 없음 | 공유·하트 `<img>` 16×16(stroke #222), 간격 8 | 바탕 #F7F7F7 | Tab, 기본 링 |
| T2 | "Learn more about summaries" (ListingOverview) | `<div>` 둘(아이콘 칸 40×16 + 글자) | 아이콘 x 172 ~ 글자 끝 216.5×16(글자 164.5) | 0 | — | 12 / 400 / 16 / normal | #6C6C6C | 없음 | 정보 `<img>` 16×16(fill #6C6C6C), 글자까지 36(칸 40 안 가운데 12 + 칸 사이 24) | 없음(커서도 기본) | Tab 안 됨, 역할 없음 |
| T3 | "Show original" (ListingDescription) | `<a href="#">`(flex 항목) | 97×24 | 0 | — | 16 / 400 / 24 / normal | #222 | 늘 — 브라우저 기본(두께·위치·skip-ink auto) | 없음 | 없음 | Tab, 기본 링 |
| T4 | "리스팅 신고하기" (Card rev 2) | `<div>` | 120.56×21 | 0 | — | 14 / 400 / 21 / normal | #6C6C6C | hover 때만, 글자에만 | 깃발 `<img>` 16×16(fill #6C6C6C), 간격 16 | 글자 밑줄 | Tab 안 됨, 역할 없음 |
| T5 | "Full policy" · "GBP" · "Price breakdown" (ReservationSummary) | `<a href="#">` — 문장 안 inline / "Total" 옆 flex 항목(기준선 맞춤) / block(줄 폭 340) | 64.83×17 · 28.06×18 · 340×18(글자 107.88) | 0 | — | 14 / 500 / 18 / -0.1504px | #222 | 늘(기본) | 없음 | 없음 | Tab, 기본 링 |
| T6 | "More info" ×2 (RadioButton rev 2) | `<a href="#">` inline, 보조 글 끝 | 60.88×17 | 0 | — | 14 / 500 / 18 / -0.1504px | #6C6C6C | 늘(기본) | 없음 | 없음 | Tab, 기본 링 |

- 글꼴: 페이지 `-apple-system…` 과 토큰 `"SF Pro", var(--font-sans)` 가 12개 글자 모두 같은 폭으로 그려졌다(Change 44.31 · Show more 83.00 · 사진 모두 보기 78.34 · 공유하기 48.45 · 저장 24.23 · Price breakdown 107.88 등). 자간 normal 과 0px 도 같은 폭이다.
- 기본 링: Chromium `:focus-visible` 의 `outline: auto 1px`(이 Mac 강조색 rgb(0, 95, 204)), `<button>` offset 0 · `<a>` offset 1. 링은 요소 자신의 border-radius 를 따른다. 마우스 클릭으로는 보이지 않는다.
- 누름(`:active`)·disabled 모양은 11개 모두 없다(페이지 CSS 에도 없다).
- 지금 사이트 Tab 순서: /detail 공유하기 → 저장 → 사진 모두 보기 → (Learn more·리스팅 신고하기 건너뜀) → Show original → Show more. /checkout More info → More info → Full policy → Change → Change → GBP → Price breakdown.

### 12.3 공개 API 에 더하는 것 (rev 1 의 primary·secondary·tertiary 와 그 prop 은 그대로)

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `variant` | 결정 4 | rev 1 값 + "ghost" · "text" | 12.4 모양 | — | Q-16 A 채택 |
| `size` (ghost) | G1~G3 | "small"(기본, 32 · Change) / "medium"(37 · 사진 모두 보기) / "large"(48 · Show more) | 12.4 | — | Q-16·Q-17 A 채택 |
| `size` (text) | T1~T6 | "xsmall"(16 · Learn more) / "small"(기본, 18 · Full policy·GBP·Price breakdown·More info) / "medium"(21 · 리스팅 신고하기) / "large"(24 · Show original) / "xlarge"(34 · 공유하기·저장) | 12.4 | — | Q-16 A 채택 |
| `tone` (text 만) | T2·T4·T6 의 흐린 글자 | "default"(기본, `text`) / "secondary"(`text-secondary`) | 글자·밑줄·아이콘(currentColor) 색 | — | Q-16·Q-19 A 채택 |
| `icon` | G1·T1·T2·T4 | ReactNode. 보이는 조합: ghost medium(칸 18, 간격 4.6) · text xsmall(16, 36) · text medium(16, 16) · text xlarge(16, 8). 다른 ghost·text 크기에서는 rev 1 처럼 받지 않음(측정한 간격이 없음, R03) | 글자 앞. 칸 안 svg 는 칸 크기에 맞춰 그린다(격자 viewBox 18.2857 → 18, 지금 `object-fit: contain` 과 같음) | `aria-hidden`(rev 1 그대로) | Q-16 A 채택 |
| `onClick` · `type` · `children` · `aria-*` | rev 1 | `type="button"` 기본(rev 1) | 클릭 → `onClick` 1회. 이동·주소 변화 없음(PRD "nothing, just shows it") | Tab · Enter/Space | rev 1 그대로 |
| `href` | rev 1 Q-09 | rev 1 그대로 | 있으면 같은 모양의 `<a href>`. 지금 사용처 없음 | rev 1 그대로 | rev 1 그대로 |
| `disabled` | 측정에 없음 | 네이티브 | Q-20 A: 클릭·Tab 없음, hover 변화 없음, 색·바탕 그대로(새 모양 없음) | 네이티브 | Q-20 A 채택 |
| `loading` | 측정에 없음 | ghost·text 는 받지 않음(타입) | — | — | Q-20 A 채택 |
| Hover / Focus / Pressed | 12.2 | prop 아님 | `:hover` 는 12.4 표, `:focus-visible` 은 브라우저 기본 링(Q-18 A), Pressed 모양 없음 | — | Q-18 A 채택 |

- 타입: `variant` 로 나뉜 union. `variant` 를 생략하면 rev 1 과 같다(primary · small). ghost·text 에 "full-width" 나 `loading` 을 주면 타입 오류, primary·secondary·tertiary 에 `tone` 을 주면 타입 오류.
- 클래스: `ds-button ds-button--ghost ds-button--medium`, `ds-button ds-button--text ds-button--xsmall ds-button--tone-secondary` 형식. `data-testid="ds-button"` 그대로. `state` prop 은 만들지 않는다.
- 쓰는 모습: `<Button variant="ghost" size="medium" icon={<GridIcon />} onClick={…}>사진 모두 보기</Button>`, `<Button variant="text" size="small" tone="secondary" onClick={…}>More info</Button>`.

### 12.4 모양 8개 (현재 사이트 값 → 토큰 식, Q-16·Q-17·Q-18 A 기준)

| 모양 | 상자 | 안쪽 여백·정렬 | 모서리 | 글꼴·크기·굵기 | 줄 높이 | 자간 | 색 | 밑줄 | 아이콘 칸·간격 | hover |
|---|---|---|---|---|---|---|---|---|---|---|
| ghost small (G3) | 높이 32 `calc(var(--spacing) * 8)`, 최소 폭 76 `* 19` | 좌우 16 `* 4`, 가운데 | 8 `--radius-md` | `--font-type-body-copy-12pt-regular` · `--text-type-body-copy-12pt-regular`(12) · `--font-weight-medium`(500) | `--leading-normal`(18) | `--tracking-type-body-copy-12pt-regular`(0) | 바탕 `control-bg-subtle`, 글자 `text` | 없음 | — | 바탕 `control-bg-subtle-hover` |
| ghost medium (G1) | 높이 37 `* 9.25`, 최소 폭 136 `* 34` | 좌우 16 `* 4`, 내용 왼쪽부터·세로 가운데 | 9 `calc(var(--radius-sm) * 2.25)` | `--font-type-body-copy-13pt-regular` · 크기 `calc(var(--spacing) * 3.425)`(13.7) · `--font-weight-medium` | `--leading-normal`(20.55) | `--tracking-type-body-copy-13pt-regular`(0) | 같음 | 없음 | 18 `* 4.5`, 간격 4.6 `* 1.15` | 같음 |
| ghost large (G2) | 높이 48(= 12 + 24 + 12), 최소 폭 132 `* 33` | 위아래 12 `* 3`, 좌우 24.5 `* 6.125`, 가운데 | 12 `--radius-lg` | `--font-type-body-copy-16pt-regular` · `--text-type-body-copy-16pt-regular`(16) · `--font-weight-medium` | `--leading-normal`(24) | `--tracking-type-body-copy-16pt-regular`(0) | 같음 | 없음 | — | 같음 |
| text xsmall (T2) | 높이 16, 폭 = 내용 | 0 | — | `--font-type-body-copy-12pt-regular` · `--text-type-body-copy-12pt-regular` · `--font-weight-type-body-copy-12pt-regular`(400) | 16 `* 4` | 0(같은 묶음 tracking) | `tone` | 없음 | 16 `* 4`, 간격 36 `* 9` | 없음 |
| text small (T5·T6) | 높이 18, 문장 안 inline(기준선 맞춤) | 0 | — | `--font-type-body-copy-14pt-regular` · `--text-type-body-copy-14pt-regular` · `--font-weight-medium` | 18 `* 4.5` | -0.1504px `calc(var(--spacing) * -0.0376)` | `tone` | 늘 — 브라우저 기본(`underline`, 두께·위치·skip-ink auto) | — | 없음 |
| text medium (T4) | 높이 21 | 0 | — | 14pt regular 묶음(400) | `--leading-normal`(21) | 0 | `tone` | hover 때 글자에만(브라우저 기본 밑줄) | 16 `* 4`, 간격 16 `* 4` | 글자 밑줄 |
| text large (T3) | 높이 24 | 0 | — | 16pt regular 묶음(400) | `--leading-normal`(24) | 0 | `tone` | 늘(브라우저 기본) | — | 없음 |
| text xlarge (T1) | 높이 34 `* 8.5`(고정), 폭 = 내용 | 위아래 8 `* 2` · 좌우 12 `* 3`(높이 고정이라 줄 21 이 가운데) | 8 `--radius-md` | 14pt regular 글꼴·크기 + `--font-weight-medium` | `--leading-normal`(21) | 0 | `tone` | 없음 | 16 `* 4`, 간격 8 `* 2` | 바탕 `surface-hover-subtle` |

- 공통: 커서 pointer, 한 줄(nowrap) — rev 1 그대로. 누름 모양 없음. 아이콘과 글자는 세로 가운데. 모서리는 요소 자신에 둔다 — 브라우저 기본 링이 9·12·8 모서리를 따라 그려져 지금 페이지와 같다(Q-18 A).
- 기대 크기(지금 글자): Change 76.31×32(Q-17 A, 지금 76), 사진 모두 보기 136×37, Show more 132×48, 공유하기 96.45×34, 저장 72.23×34, Learn more 216.5×16, Show original 97×24, 리스팅 신고하기 120.56×21, Full policy 64.83×18, GBP 28.06×18, Price breakdown 107.88×18, More info 60.88×18.
- text small 은 14/400/18 문장 안에 놓이는 `inline-flex` 상자다. 글자·줄 높이가 문장과 같아 줄 높이 18 이 늘지 않고 기준선이 맞는다("GBP" 와 "Total"). 버튼 안에서는 줄바꿈하지 않는다 — 지금 `<a>` 는 둘로 나뉠 수 있지만 지금 화면에서는 모두 한 줄이라 위치가 같다.
- text xsmall 의 간격 36 은 지금 줄의 "아이콘 칸 40 안 가운데(12) + 칸 사이 24" 를 버튼 안에 담은 것이다. 버튼을 줄 왼쪽에서 12 들여 놓는 것은 ListingOverview 래퍼가 한다(그 계획 3절).

### 12.5 색·글자 토큰 (rev 2 에서 더 쓰는 것)

| 요소 / 상태 | 지금 값·alpha / Figma 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| ghost 바탕 | #F2F2F2 / Fills - Vibrant (Use Plus Lighter \| Darker)/Tertiary(리드가 가져옴) | fills-vibrant-use-plus-lighter-darker-tertiary | `control-bg-subtle`(새 역할) | #F2F2F2 | 일치 | 결정 2 표. 리드가 토큰 계획 revision 6 에 기록 |
| ghost hover 바탕 | 지금 #E8E8E8 → 결정 2 로 #EBEBEB / Neutral 02 | neutral-02 | `control-bg-subtle-hover`(새 역할) | #EBEBEB | 결정으로 값 바뀜(지금보다 3 밝음) | revision 6. `border-subtle`(같은 값, 선 역할)과 역할이 달라 쓰지 않음 |
| ghost 글자 · text default 글자·밑줄·아이콘 | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| text secondary 글자·밑줄·아이콘 | 지금 #6C6C6C → 결정 2 로 #717171 / Neutral 07 | neutral-07 | `text-secondary` | #717171 | 결정으로 값 바뀜 | 새 역할 없음 |
| text xlarge hover 바탕 | #F7F7F7(Figma hover 없음, 지금 페이지 값) | neutral-01 | `surface-hover-subtle`(새 역할) | #F7F7F7 | 일치 | 리드 목록에 유지 확정, revision 6. `surface-hover`(#222 5%, Tertiary hover)와 다름 |
| 포커스 링 | 브라우저 기본(색은 브라우저·OS) | — | 토큰 없음(Q-18 A) | — | — | CSS 에 색을 쓰지 않음 |

| 쓰는 곳 | 지금 값 | 토큰 |
|---|---|---|
| 글자 크기 12 · 14 · 16 | 12 / 14 / 16px | `--text-type-body-copy-12pt-regular` · `-14pt-regular` · `-16pt-regular` (글꼴은 같은 이름의 `--font-type-*`) |
| 글자 크기 13.7 | 13.7px(Figma 스타일 없음) | `calc(var(--spacing) * 3.425)`(결정 3) |
| 굵기 500 / 400 | 500 / 400 | `--font-weight-medium`(결정 2 표) / `--font-weight-type-body-copy-NNpt-regular` |
| 줄 높이 16 · 18 | 16 / 18px | `calc(var(--spacing) * 4)` / `* 4.5` |
| 줄 높이 20.55 · 21 · 24 | 글자 × 1.5 | `--leading-normal` |
| 자간 -0.1504px | -0.1504px | `calc(var(--spacing) * -0.0376)`(RadioButton rev 2 와 같은 식) |
| 모서리 9 | 9px | `calc(var(--radius-sm) * 2.25)` |

- 새 토큰: 이 revision 이 만드는 것 없음. 쓰는 새 역할 3개(`control-bg-subtle`·`control-bg-subtle-hover`·`surface-hover-subtle`)는 리드의 토큰 계획 revision 6 이 만든다. 이 계획은 `docs/plans/tokens.md` 를 고치지 않는다.
- 토큰으로 정확히 쓸 수 없는 값: 없음(13.7 = `* 3.425`, 4.6 = `* 1.15`, 24.5 = `* 6.125`, 37 = `* 9.25`, 34 = `* 8.5`, 136 = `* 34`, 132 = `* 33`, 76 = `* 19`, 18 = `* 4.5`).
- 사용자 결정으로 화면 값이 바뀌는 것: ghost hover #E8E8E8 → #EBEBEB, 흐린 글자·아이콘 #6C6C6C → #717171. 측정과 달라질 수 있는 것: Change 폭 +0.31(Q-17), 링 offset 1 → 0(Q-18), Price breakdown 누르는 영역(12.7).

### 12.6 아이콘·asset

- Button 은 ghost·text 의 아이콘 그림을 갖지 않는다. 쓰는 부품이 `icon` 에 `<svg>`(fill/stroke `currentColor`)를 넘긴다. Button 이 정하는 것: 칸 크기(16 / 18), 글자와의 간격, 색(글자 색 = currentColor), 칸 안 svg 를 칸 크기에 맞춰 그리기, `aria-hidden`.
- 지금 사이트 asset(구역 계획들이 같은 경로를 `<svg>` 로 옮긴다. Button 스토리 견본도 같은 경로를 쓴다):

| asset | sha256 앞 12자리 | 크기·색 | 쓰는 모양 |
|---|---|---|---|
| `my-assets/images/detail-icon-show-all.svg` | c2c092019ec9 | viewBox 18.2857, 칸 18 | ghost medium |
| `my-assets/images/detail-icon-share.svg` | 84caaf0e729b | 16, stroke #222 | text xlarge |
| `my-assets/images/detail-icon-save.svg` | 1a6e3a27a321 | 16, stroke #222 | text xlarge |
| `my-assets/images/detail-icon-info.svg` | bfc16e24ec0d | 16, fill #6C6C6C | text xsmall |
| `my-assets/images/detail-icon-flag.svg` | 8ff7f798733f | 16, fill #6C6C6C | text medium |

- Figma 원본 벡터는 읽지 않았다(design-context 멈춤). 리드가 정한 대체(현재 페이지 asset)를 각 구역 계획이 기록했다. 다른 그림으로 바꾸지 않는다(R03).

### 12.7 사용처 — 구역 계획의 Nested parts 행과 맞춘 props

| 구역 계획 · 행 | 그 계획의 "Kit component and props" (인용) | revision 2 로 쓸 props | 지금 화면과 다른 점 |
|---|---|---|---|
| PhotoGallery 4절 (frame 812:4787) | `Button { variant="ghost" icon={격자 <svg>} onClick={onShowAllClick} children="사진 모두 보기" }` | + `size="medium"` | hover 색(결정 2) |
| ListingDescription 4절 (frame 812:11236) | `Button { variant="ghost", onClick=onShowMoreClick }`, 글자 `showMoreLabel` | + `size="large"` | hover 색 |
| ReservationSummary 4절 (frame 812:12314 · 812:12327) | `Button { variant="ghost" onClick=onChangeDates / onChangeGuests } children "Change"` | `size="small"`(기본값, 생략 가능) | 폭 76 → 76.31(Q-17 A), hover 색 |
| ListingTitle 4절 (frame 812:6949 · 812:6956) | `Button { variant="text" icon={공유 <svg>} onClick={onShareClick} children="공유하기" }` · `Button { variant="text" icon={하트 <svg>} onClick={onSaveClick} children="저장" }` | + `size="xlarge"` | 없음 |
| ListingOverview 4절 (frame 812:11218) | `Button { variant="text" icon={정보 <svg>} onClick={onLearnMoreClick} children="Learn more about summaries" }` | + `size="xsmall" tone="secondary"` | 색(결정 2). 이제 Tab·기본 링 |
| ListingDescription 4절 (frame 812:11229) | `Button { variant="text", onClick=onShowOriginalClick }`, 글자 `showOriginalLabel` | + `size="large"` | `<a>` → `<button>`, 링 offset 1 → 0 |
| Card rev 2 4절 (frame 812:7557) | `Button { variant="text", icon=<깃발 svg>, onClick=onReportClick }` | + `size="medium" tone="secondary"` | 색. 이제 Tab·기본 링 |
| ReservationSummary 4절 (frame 812:12309 · 812:12354 · 812:12360) | `Button { variant="text" onClick=onPolicyClick / onCurrencyClick / onBreakdownClick }` children 각 글자, GBP 는 aria-label | `size="small"`(기본값, 생략 가능) | Price breakdown 누르는 영역 340×18 → 107.88×18(줄 배치는 ReservationSummary 래퍼), 링 offset |
| RadioButton rev 2 4절 (frame 812:12252 · 812:12266) | `Button { variant="text" onClick=onActionClick } children actionLabel("More info")`, 글자 색 `text-secondary` | `size="small" tone="secondary"` | 색 |

- 이름 대조: 7개 계획 모두 `variant="ghost"`·`variant="text"` 이름이 이 계획과 같다. 빠진 것은 `size`·`tone` 뿐이다(기본값과 같은 Change·Full policy·GBP·Price breakdown 은 생략해도 된다). 각 계획의 담당(또는 리드)이 그 행에 더한다 — 이 에이전트는 다른 계획을 고치지 않았다.
- ghost·text 가 아니라고 기록된 버튼(이 revision 대상 아님): Inspiration 여행지·Show more, Footer 링크·버튼, CheckoutHeading 뒤로 링크. CheckoutStep "Next" 는 rev 1 `secondary` · `small`.

### 12.8 영향과 변경 파일

- 변경 파일(승인 뒤): `src/components/Button/Button.tsx`(variant 별 union, `tone`, 아이콘 조건), `Button.css`(ghost·text 규칙 + rev 1 규칙의 범위 좁힘), `Button.stories.tsx`(새 스토리 `Ghost`·`Text` — 흰 캔버스, 12.2 의 글자·아이콘, text small 은 14/400/18 문장 안 견본. @ds-generated 라 손으로 고치면 충돌 보고·보존), `index.ts`(새 타입 export). `Button.figma.tsx`·Link 파일은 바꾸지 않는다(ghost·text 의 Figma 원본 세트 없음).
- rev 1 에 주는 영향: 화면 변화 없음. rev 1 의 `:focus-visible { outline: none }`·disabled·loading 모양 규칙을 primary·secondary·tertiary 에만 걸리게 좁힌다(ghost·text 에 #DDD 모양이 새지 않게). `ds-button--small` 클래스 이름이 ghost·text 와 겹치므로 크기 규칙은 variant 와 함께 고른다(예 `.ds-button--ghost.ds-button--small`).
- 기존 사용처: `Text.stories` 의 Button 2개·CheckoutStep "Next"(계획) — 기본·secondary 라 그대로.
- 구현 순서: 토큰 계획 revision 6 → 이 revision → 구역 부품들.

### 12.9 검증 계획 (rev 2 에서 더함)

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 8개 모양 기본 상태 | 12.4 표와 기대 크기(상자·글자·색·모서리·아이콘 칸과 간격·밑줄) | Storybook iframe DOM 측정 + 현재 사이트와 나란히 스크린샷(흰 캔버스) | |
| hover | ghost 바탕 #EBEBEB, text xlarge 바탕 #F7F7F7, text medium 글자에만 밑줄, 나머지 변화 없음 | Playwright 실제 포인터 hover 후 computed style | |
| focus | Tab 에서 브라우저 기본 링, 요소 모서리를 따름, 자리 밀림 없음. 마우스 클릭으로는 링 없음 | Playwright 실제 키보드 + 스크린샷 | |
| 클릭 | `onClick` 1회, 주소 변화 없음 | play `fn()` + `userEvent.click` | |
| 문장 안 text small | 14/400/18 문장 줄 높이 18 유지, "GBP" 와 "Total" 기준선 같음 | DOM 측정 | |
| disabled(Q-20 A) | 클릭 0회, Tab 에서 빠짐, 색·바탕 그대로 | play | |
| rev 1 회귀 | rev 1 스토리 모양·play 그대로 | `pnpm ai:check Button`, `pnpm ai:verify Button`, `pnpm typecheck`, `pnpm ds:guard` | |
| 사용처 | 구역 부품 구현 뒤 각 페이지 위치·크기가 12.4 기대 크기와 같음 | 각 구역 계획의 검증 | |

명령 검사와 시각 대조를 따로 기록한다. 아직 수행한 검사는 없다.
