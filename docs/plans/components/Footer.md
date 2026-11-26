---
kind: component
component: Footer
revision: 1
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-7358&m=dev
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — Footer (링크 3열 + 아래 줄)

> 작성: Claude Code(에이전트 A), 2026-11-26. 근거: 사용자 요청 "지금 사이트를 Storybook 기반으로 재정립해주고 UXUI 체크 후 이슈 없이 만들어줘"와 같은 날의 결정 "구역도 부품으로 (권장)", "페이지 모양 유지 (권장)"(chosen in chat). 계획 단계이며 사용자 승인 전 구현 파일을 만들지 않는다. `approved` 는 사용자만 정한다.
> 2026-11-26 갱신(리드 전달 `rebuild-update.md`): 사용자가 "추천안 모두 채택 (권장)", "Figma 스타일 값으로 맞춤", "지금 크기·자간 유지 (권장)", "Button 에 공용 모양 추가 (권장)"를 골랐다(chosen in chat). Q-01~Q-07 답과 색 매핑(결정 2: Figma 에 없는 hover 색은 없앰, `surface-subtle` = neutral-01)을 반영했다. 이 부품의 버튼은 Button `ghost`·`text` 모양이 아니다(4절).

## 1. 요청과 적용 규칙

- 요청한 작업: 세 페이지(Home·Detail·Checkout) 맨 아래 푸터를 Storybook 부품 `Footer` 로 만든다. 페이지는 이후 이 부품을 놓기만 한다(페이지 수정은 이 계획 범위 밖).
- 읽은 공통 규칙: `docs/ai-component-workflow.md` 버전 1.0 / R01~R09
- 읽은 스펙: `docs/ai-design-system-spec.md` 버전 1.1, `docs/templates/component-plan.md`, `.claude/rules/design-tokens.md`(재생성본, `src/tokens/tokens.css` 와 같음)
- Figma 파일·노드·조회 시점·캐시 여부: Q5QDGE5WoXefOxgm5fziH3, Home 프레임 389:2752 > "footer area" 424:10741 > **"Footer" 389:7358**(1440×741).
  - 구조: `my-website/figma/Home.layers.xml`(2026-11-25 저장본). Detail 사본 812:578(같은 파일), Checkout 사본 10613:12249(h1TqwpPwdkZJJK2Hb9qAj7, Q5QD 812:1056 과 같은 디자인).
  - **세 사본 비교:** "footer area"(424:10741 · 812:432 · 10613:12103) 아래 430줄을 노드 id 만 빼고 비교 → 레이어 이름·위치·크기가 모두 같다. 다른 것은 페이지 안의 y(2267 · 2501 · 1134)뿐이다. **인스턴스 0개**(모두 frame·text).
  - MCP 직접 조회(에이전트 A 몫 2회): `get_design_context 424:10741` — 연결이 끊겨 응답 없음, `get_design_context 389:7203` — 300초 응답 없음. **둘 다 실패, 이 계획에 쓴 Figma MCP 값 없음**(리드 확인: design-context 가 멈추는 상태). 보조 근거로 에이전트 C 의 `get_variable_defs 812:393`(Detail 화면 전체의 변수 목록, `ListingTitle.md` 1절)만 인용한다.
- 현재 페이지(참조 모양, git-demo `aa9a593`): `HomePage.tsx` 43–77(링크 목록)·198–267, `HomePage.css` 507–647 / `DetailPage.tsx` 28–62·533–650, `DetailPage.css` 1040–1179 / `CheckoutPage.tsx` 29–63·267–337, `CheckoutPage.css` 662–801.
  - 1440×900 Playwright 측정(2026-11-26, 개발 서버 http://127.0.0.1:5175). 스크립트·결과: scratchpad `rebuild/A/measure.mjs`·`li.mjs` → `measure.json`, 스크린샷 `Home-footer.png`·`Detail-footer.png`·`Checkout-footer.png`.
  - **세 페이지 비교:** CSS 는 클래스 접두어(`page-Home__` 등)만 다르고 값이 같다. 렌더 측정(푸터 기준 위치·크기·글자·색·hover·Tab 순서·누른 결과)도 클래스 이름 말고는 차이 0. 링크 글자 배열도 같다. 콘솔 오류·깨진 그림 0(세 페이지).
- 대상 코드·토큰 기준: git-demo 작업 폴더(`aa9a593`), `src/tokens/tokens.css`(semantic 46개). 새 역할 `surface-subtle` 은 리드가 토큰 계획 revision 6 에 넣는다(이 계획은 `tokens.md` 를 고치지 않는다).

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | Figma 389:7358: 링크 3열(Support 8 · Hosting 13 · Airbnb 6) + 아래 줄(© · Privacy · Terms · Your Privacy Choices + 아이콘 / 언어 · 통화 버튼 / 소셜 3개). PRD 3절 Home 6번·Detail 9번·Checkout 6번 "the same as on Home" | 세 페이지 공통 사이트 푸터. 루트는 `<footer>` | 확정(Q-04) |
| 누를 수 있는 영역 | Figma 이름: 열 항목은 "List Item"+글자, "Button - Choose a language"(117×30), "Button - Choose a currency"(69×30), "Link - Navigate to Facebook/Twitter/Instagram"(16×16). 페이지: 열·아래 링크 30개 `<a href="#">`, 버튼 2개 `<button type="button">`, 소셜 `<a href="#" aria-label>` | 링크 글자 30개·버튼 2개·소셜 3개 모두 누르는 요소 | 확정(Q-01) |
| 클릭/선택/열림 동작 | PRD 4절: "Footer, all links, 'English (US)', '₩ KRW' and the social icons: nothing, just shows them". 지금 페이지는 링크·소셜을 누르면 맨 위로 스크롤되고 주소 끝에 `#` 가 붙는다(측정: Home `/#`, `/detail#`, `/checkout#`, scrollY 2341 → 0) | 이동 없는 `<button type="button">` + 콜백 prop. 누르면 콜백만, 이동·스크롤·주소 변화 없음 | 확정(Q-01) |
| 키보드·포커스 범위 | 페이지 Tab 순서(세 페이지 같음): 열 링크 27 → Privacy · Terms · Your Privacy Choices → English (US) → ₩KRW → Facebook · X · Instagram. 링은 브라우저 기본. Figma 에 Focus 모양 없음 | 같은 순서, Enter/Space 로 콜백, 포커스는 키트 `focus-ring` 2px 링 | 확정(Q-01) |
| disabled 동작 | Figma·PRD 에 없음 | 만들지 않음 | 확정(Q-07) |
| 제목·랜드마크 | 페이지: 열 제목 `<h3>` 이 앞 구역 `<h2>` "Inspiration for future getaways" 아래로 들어가고, 푸터가 `<main>` 안의 `<section>` 이라 contentinfo 랜드마크가 없다 | 루트 `<footer>`, 열 제목 `<h2>`. `<main>` 밖에 두는 것은 페이지 조립 몫 | 확정(Q-04) |

## 3. 기존 부품과 변경 범위

- 같은 역할의 기존 부품 조사(R05): `src/components/` 에 푸터 부품 없음. 쓸 수 있는지 본 부품:
  - `Link`(Buttons 계획 rev 1): `<a>` 이동 전용, 14pt Semibold 590 → 페이지 링크(14/400, 이동 없음)와 모양·역할 다름.
  - `Text`(rev 2): body 16/400/1.5 · body-sm 14/400/1.5 · title 20/500/1.25 → 열 제목 14/500/18, 아래 줄 14/400/18 과 다름.
  - `Button`: rev 1(primary/secondary/tertiary)도, 사용자 결정 4 로 에이전트 F 가 더하는 `ghost`(회색 #F2F2F2 둥근 버튼)·`text`(밑줄 글자 버튼)도 이 부품의 버튼 모양(바탕·밑줄 없는 글자, 4절)과 다르다.
  - `Icon`(add · close · search): 지구본·소셜·Privacy 아이콘 없음.
  - 그래서 키트 부품을 가져오지 않고 Footer 안에서 그린다(4절, Q-01·Q-02 확정). 어느 부품도 고치지 않는다.
- 새 부품이 필요한 이유: 사용자 결정 "구역도 부품으로" — 세 페이지에 복사된 같은 푸터를 한 원본으로 모은다.
- 변경할 파일(승인 후): `src/components/Footer/Footer.tsx`·`Footer.css`·`Footer.stories.tsx`·`index.ts`(새로). Privacy 아이콘 파일을 `public/images/privacy-icon.svg` → `my-assets/images/footer-icon-privacy.svg` 로 옮기는 일은 리드/사용자 작업(Q-02).
- 영향받는 기존 사용처: 없음(새 부품). 페이지 3개가 이후 이 부품으로 바꾸면 `page-*__footer*` CSS 와 `footerLinks` 배열이 페이지에서 빠지고, 페이지는 Footer 를 `<main>` 밖에 두며 `imageUrl("footer-icon-privacy")` 를 `privacyIconSrc` 로 넘긴다(페이지 계획 몫).

## 4. Nested parts

Figma 389:7358 안에 인스턴스가 없다(Home.layers.xml, 세 사본 같음). 아래 행은 키트 부품을 쓰지 않고 이 부품 안에서 그리는 요소다(Q-01·Q-02·Q-04 추천안 채택으로 확정).

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (열 제목 389:7365 · 389:7387 · 389:7418, frame "Heading 3") | — | — | 389:7358 | none — Footer 안의 `<h2>` 글자(Text 에 14/500/18 이 없음) | confirmed |
| — (열 항목 27개 "List Item"+글자, 아래 줄 Privacy · Terms · Your Privacy Choices) | — | — | 389:7358 | none — Footer 안의 `<button type="button">` 글자(바탕·밑줄 없음, hover 밑줄). Link(590 `<a>` 이동)·Button `text`(늘 밑줄)와 모양이 다름 | confirmed |
| — (언어 389:7476, 통화 389:7483 "Button - …") | — | — | 389:7358 | none — Footer 안의 `<button type="button">`(바탕 없음, 지구본 아이콘). Button `ghost`(#F2F2F2 바탕)·`text`(밑줄)와 모양이 다름 | confirmed |
| — (소셜 389:7494 · 389:7500 · 389:7506 "Link - Navigate to …") | — | — | 389:7358 | none — Footer 안의 `<button type="button" aria-label>` + 아이콘(16×16 아이콘만) | confirmed |
| — (지구본 389:7479, 소셜 아이콘 389:7497 · 389:7503 · 389:7509) | — | — | 389:7358 | none — drawn inside this part from the original SVG(7절) | confirmed |
| — (Privacy 아이콘 389:7465) | — | — | 389:7358 | none — 그림 파일 `<img alt="">`, 주소는 `privacyIconSrc` prop | confirmed |

- Confirmed absence of nested instances and evidence: `Home.layers.xml` 389:7358 아래 `<instance` 0개, Detail 812:578·Checkout 10613:12249 도 같은 구조(1절 비교).
- 사용자 결정 4(Button 공용 모양): 이 부품의 버튼은 `ghost`·`text` 어느 쪽도 아니므로 Button 을 쓰지 않는다. 정확한 모양은 5절에 적었고 리드·에이전트 F 에게 전달했다.

## 5. Figma 상태·크기 전체 목록

### 상태

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 389:7358 기본 | layers.xml + 페이지 측정 | 기본 | 푸터 전체 | 기준(아래 표, Q-03 답 반영) | 지구본 · 소셜 3 · Privacy | 기본 렌더 | 확정 |
| 링크 글자 hover | 페이지 CSS `:hover` + 측정 | 포인터 | 열 링크 27·아래 링크 3 | 밑줄, 색 그대로 #222. Figma 없음(사이트 캡처) — 색이 아니라 결정 2 의 "hover 색 없앰" 대상이 아니며 Q-01 추천안(모양 그대로)으로 유지 | — | `:hover` | 확정(Q-01) |
| 언어·통화 버튼 hover | 페이지 CSS: 바탕 #EBEBEB. Figma 없음 | 포인터 | 버튼 상자 | **없앰**(사용자 결정 2: Figma 에 없는 hover 색은 없앰) | — | 없음 | 확정(결정 2) |
| 소셜 hover | 측정 | 포인터 | — | 변화 없음 | — | — | 확정 |
| Focus | 측정: 지금 브라우저 기본 `auto 1px rgb(0, 95, 204)` | 키보드 | 각 버튼 상자 | 키트 `focus-ring` 2px 링(버튼 상자 둘레, 모서리는 각 버튼 모서리) | — | `:focus-visible` | 확정(Q-01) |

- Focus 링이 감싸는 정확한 범위와 근거: 원본(Figma)에 없음 → Q-01 답대로 각 버튼 상자 둘레에 `focus-ring` 2px. 상자 크기는 바꾸지 않는다(outline).
- Figma에 실제로 없는 상태·조합: hover · pressed · focus · disabled 모두. 링크 hover 밑줄만 유지, pressed·disabled 없음, 버튼 hover 바탕 없앰.
- 미조회/실패/잘린 응답: Figma MCP 2회 실패(1절). 아래 줄 위 선이 Figma 에서 전체 폭인지 389:7433 폭(48~1392)인지는 미확인 — Q-03 답이 현재 사이트(전체 폭)라 구현을 막지 않는다.

### 크기·간격 (푸터 위 끝 기준 y, 화면 왼쪽 기준 x) — Q-03 A: 열 목록만 Figma 값, 나머지 현재 사이트

| 요소 | 현재 사이트(측정, 세 페이지 같음) | Figma 389:7358 | 구현 값(CSS 토큰) |
|---|---|---|---|
| 푸터 전체 | 1440×745, 바탕 #F7F7F7, 안쪽 위 48·아래 80 | 1440×741 | **741**(열 목록 변경 결과). `padding: calc(var(--spacing) * 12) 0 calc(var(--spacing) * 20)` |
| 안쪽 폭 | 좌우 48, 최대 1920 가운데 | 389:7362 x 48, 1344 폭 | `padding-inline: calc(var(--spacing) * 12)`, `max-width: calc(var(--spacing) * 480)` |
| 3열 | 461.3 × 3, 사이 16 | 폭 461.312, x 0 · 477.312 · 954.624 | `grid-template-columns: repeat(3, calc(var(--spacing) * 115.325))`, `gap: calc(var(--spacing) * 4)` |
| 열 제목 | y 48, 높이 18, 아래 16 | 같음 | `margin-bottom: calc(var(--spacing) * 4)` |
| 열 목록 | 항목 24(li 가 html 줄 높이 1.5×16px 를 물려받음), 사이 16 → 40 간격 | 항목 20.016, 사이 16 → 36.016 | **Figma 값**: 항목 줄 높이 20 = `calc(var(--spacing) * 5)`(li 에도 글자 크기·줄 높이를 줘서 24 로 늘지 않게), 사이 `calc(var(--spacing) * 4)` → Support 272 · Hosting 452 · Airbnb 200 |
| 열 아래 → 아래 줄 | 0("Refer a host" 와 선 사이 3) | 48 | **Figma 값** `calc(var(--spacing) * 12)` → 아래 줄 y 582 |
| 아래 줄 | 1440×79, 위 선 1px #EBEBEB(x 0~1440), 안쪽 24·48 | y 582, 높이 79 | `border-top: var(--border-width-thin) solid var(--color-border-subtle)`, `padding: calc(var(--spacing) * 6) calc(var(--spacing) * 12)`, 선은 전체 폭(현재 사이트) |
| 왼쪽 묶음 | x 48, 높이 20, 세로 가운데, 사이 8. ©48 · "·"180.8 · Privacy 192.6 · "·"246.7 · Terms 258.6 · "·"305.5 · Your Privacy Choices 317.4 · 아이콘 458.4(26×12) | ©47.8 · Privacy 190.4 · Terms 256.1 · YPC 315.4 · 아이콘 457.2 | `gap: calc(var(--spacing) * 2)`, 아이콘 `calc(var(--spacing) * 6.5)` × `calc(var(--spacing) * 3)`. 1~2px 차이는 글자 폭 |
| 언어 버튼 | 127.8×30, 여백 6·12, 모서리 12, 지구본 16 + 8 + 글자, 바탕 없음 | 117×30, 여백 8 | 현재 사이트: `padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 3)`, `--radius-lg`, `gap: calc(var(--spacing) * 2)` |
| 통화 버튼 | 69×30, 가운데, "₩" + 8 + "KRW" | 69×30 | `width: calc(var(--spacing) * 17.25)` |
| 소셜 | 묶음 왼쪽 여백 12, 16×16, 사이 20(1304 · 1340 · 1376), 모서리 8 | 1296 · 1336 · 1376 | 현재 사이트: `gap: calc(var(--spacing) * 5)`, `padding-left: calc(var(--spacing) * 3)`, `calc(var(--spacing) * 4)`, `--radius-md` |
| 오른쪽 묶음 | 오른쪽 끝 1392, 사이 8, 아래 줄 기준 +25 | 같음 | `gap: calc(var(--spacing) * 2)` |

### 글자 (모든 색 #222222 `text`) — 결정 3: 크기·자간은 지금 값 그대로 토큰 식으로

| 요소 | 크기 / 굵기 / 줄 높이 / 자간 | 토큰 |
|---|---|---|
| 열 제목 | 14 / 500 / 18 / −0.15 | 크기 `--text-type-body-copy-14pt-regular`(14px), 굵기 `--font-weight-medium`(500 = Figma 변수 `sds-typography-weight-medium`), 줄 높이 `calc(var(--spacing) * 4.5)`, 자간 `calc(var(--spacing) * -0.0375)` |
| 열 링크 · 아래 링크 | 14 / 400 / 20 / −0.15 | 굵기 `--font-weight-type-body-copy-14pt-regular`, 줄 높이 `calc(var(--spacing) * 5)` |
| ©·"·" | 14 / 400 / 18 / −0.15 | 줄 높이 `calc(var(--spacing) * 4.5)` |
| 언어·통화 버튼 | 14 / 500 / 18 / −0.15 | 열 제목과 같음 |
| 글꼴 | 지금 페이지 `-apple-system, BlinkMacSystemFont, …` | `--font-type-body-copy-14pt-regular`("SF Pro", var(--font-sans)) — macOS 화면 대조(10절) |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 ID | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 푸터 바탕 | 페이지 #F7F7F7 α1. 노드 변수 미확인 | neutral-01 | **`surface-subtle`(새 역할, 결정 2 표 — 리드 토큰 계획 rev 6)** | rev 6 적용 뒤 #F7F7F7 | 일치 | 리드가 이름·primitive 확정(neutral-01). Inspiration 과 공유 |
| 글자 전부 · 지구본 · 소셜 아이콘 | #222222 α1 | shade-02 | `text` | #222222 | 일치(#F7F7F7 위 14.85:1) | 아이콘은 `currentColor` |
| 아래 줄 위 선 | #EBEBEB 1px | neutral-02 | `border-subtle`(Navigation 구분선) | #EBEBEB | 일치 | — |
| 언어·통화 버튼 hover 바탕 | 페이지 #EBEBEB, Figma 없음 | — | **없앰**(결정 2) | — | — | 제안했던 `surface-hover-solid` 는 필요 없음 |
| Privacy 아이콘 | 흰 + #0066FF(SVG 파일) | — | 그림 파일이라 토큰 없음(Q-02 A) | — | — | — |
| 포커스 링 | Figma 없음 | shade-02 | `focus-ring` | #222222 | 일치(Q-01) | — |

- 컴포넌트 fill과 Figma 부모 배경: 푸터 자신이 #F7F7F7 바탕을 가진다. 페이지 바탕은 흰색(`bg`). Storybook 캔버스는 흰 배경 + 1440 폭.
- 신규 token: `surface-subtle` 하나(Footer·Inspiration 바탕). 리드 토큰 계획 rev 6 → `pnpm ds:apply-token-plan docs/plans/tokens.md` → `pnpm ds:tokens` → `pnpm ds:guard`(G10·G13).

## 7. 원본 아이콘·asset

다섯 파일 모두 `public/images/` 에만 있다(git `7159c65` 에서 추가, `clipPath id="clip0_2327_*"` — Figma 에서 내보낸 SVG 형식, 크기가 Figma 노드와 같음). Figma 원본과의 직접 대조는 MCP 실패로 못 했고, 현재 사이트가 쓰는 이 파일을 원본으로 쓴다(Q-02 확정).

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| 지구본 389:7479 | `public/images/globe-icon.svg` sha256 7fabb674b857, path 1개 `M8 0.25C10.059 0.255298 …Z` | 16×16, fill #222222(흰 사각은 clipPath 정의라 그려지지 않음) | 언어 버튼 왼쪽 | — | 확인 — `<svg>` JSX, `currentColor` |
| Facebook 389:7497 | `facebook-icon.svg` sha256 a9c155983fcd, path 1개 `M7.98503 0.5C3.8512 …` | 16×16, fill #222222 | 늘 | — | 확인 — `<svg>` JSX |
| X(Twitter) 389:7503 | `x-icon.svg` sha256 7f25ddb51324, path 1개 `M9.2306 6.84822L14.6918 0.5…Z` | 16×16, fill #222222 | 늘 | — | 확인 — `<svg>` JSX |
| Instagram 389:7509 | `instagram-icon.svg` sha256 33f990a9fe61, path 1개 `M4.89381 0.552453C4.09581 …` | 16×16, fill #222222 | 늘 | — | 확인 — `<svg>` JSX |
| Privacy 389:7465 | `privacy-icon.svg` sha256 a4bb5307ebfe, path 5개(흰 알약 채움, 파란 반쪽 채움, 파란 체크 선, 흰 X 선, 파란 테두리 선) | 26×12, #FFFFFF + #0066FF, stroke 1, round cap | "Your Privacy Choices" 뒤 | — | 확인 — 그림 파일(`my-assets/images/footer-icon-privacy.svg` 로 옮긴 뒤 `imageUrl`) |

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `columns` | Figma 3열, PRD 링크 목록 | Support 8 · Hosting 13 · Airbnb 6(PRD 글자 그대로) / `{ id, heading, links: { id, label }[] }[]` | 열마다 `<h2>` 제목 + 목록 | — | 확정(Q-07) |
| `copyright` | 389:7439 | "© 2026 Airbnb, Inc." | 글자 | — | 확정(Q-07) |
| `legalLinks` | 389:7448 · 7454 · 7463 | Privacy · Terms · Your Privacy Choices | 사이에 "·"(화면 읽기에서 숨김 `aria-hidden`) | — | 확정(Q-07) |
| `privacyIconSrc` | 389:7465 | 없음(없으면 그리지 않음) / 그림 주소 | 마지막 링크 뒤 26×12 그림, `alt=""` | — | 확정(Q-02) |
| `language` / `currencySymbol` / `currencyCode` | 389:7481 · 7487 · 7489 | "English (US)" / "₩" / "KRW" | 버튼 글자 | — | 확정(Q-07) |
| `onLinkClick(id)` | PRD "nothing" | 없음 | 열·아래 링크를 누르면 호출, 그 밖에 아무 일 없음 | Tab 포커스, Enter/Space | 확정(Q-01) |
| `onLanguageClick()` / `onCurrencyClick()` | PRD "nothing" | 없음 | 누르면 호출만 | 〃 | 확정(Q-01) |
| `onSocialClick(id)` | PRD "nothing" | 없음 / `"facebook" \| "x" \| "instagram"` | 누르면 호출만. 읽기 이름 "Facebook"·"X"·"Instagram" | 〃 | 확정(Q-01) |
| 나머지 | — | `HTMLAttributes<HTMLElement>` 전달(배치용) | 최상위 `<footer class="ds-footer" data-testid="ds-footer">` | — | 확정(Q-07) |

- 하위 요소는 `ds-footer__*` 클래스. 페이지는 내부 클래스를 고치지 않는다(P06).

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 누를 수 있어 보이는 요소의 HTML 과 포커스. PRD 는 모두 "nothing" 인데 지금 링크·소셜 `<a href="#">` 은 누르면 맨 위로 가고 주소에 `#` 가 붙는다 | **A (추천)** 링크 30·소셜 3을 `<button type="button">` + 콜백(모양 그대로, Tab 가능, 아무 일 없음), 언어·통화는 버튼, 포커스는 키트 `focus-ring` 2px / B `<a href="#">` 유지 / C 링크는 글자만 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. Button 공용 모양(결정 4)은 이 버튼들과 모양이 달라 쓰지 않음(4절) | resolved |
| Q-02 | 아이콘 그림 5개가 `public/images/` 에만 있다 | **A (추천)** 지구본·소셜 4개는 원본 path 를 `<svg>` JSX(`currentColor`)로, 2색 Privacy 는 `my-assets/images/footer-icon-privacy.svg` 로 옮긴 뒤 페이지가 `imageUrl()` 주소를 prop 으로 / B 5개 모두 그림 파일 / C Privacy 도 `<svg>` JSX | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-03 | 현재 사이트와 Figma 프레임의 차이. 열 목록 간격 40 vs 36, 열 아래 0 vs 48("Refer a host" 가 선에 3px) | **A (추천)** 열 목록만 Figma 값(항목 20·사이 16·열 아래 48, 푸터 741), 나머지 현재 사이트 / B 전부 현재 사이트 / C 전부 Figma | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A. 결정 3(글자 크기·자간 유지)은 글자 값에 대한 것이라 이 배치 값과 겹치지 않음(AI 해석, 리드에게 보고) | resolved |
| Q-04 | 제목 수준·랜드마크 | **A (추천)** 루트 `<footer>`, 열 제목 `<h2>`, 페이지는 `<main>` 밖에 둠 / B `<h3>` + 숨은 `<h2>` / C 지금 그대로 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |
| Q-05 | 색 역할: 바탕 #F7F7F7, 버튼 hover #EBEBEB | A 새 역할 `surface-subtle`·`surface-hover-solid` / B 바탕은 `surface-raised` / C hover 를 없앰 | 사용자 결정 "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26), 리드 매핑 표 → 바탕 `surface-subtle`(neutral-01), Figma 에 없는 hover 색은 없앰 | resolved |
| Q-06 | 글자 값 표현: 굵기 500, 자간 −0.15, 줄 높이 18·20, 글꼴 | A 정확한 값을 토큰 식으로 / B 키트 글자 스타일 / C 새 글자 토큰 | 사용자 결정 "지금 크기·자간 유지 (권장)" + "Figma 스타일 값으로 맞춤" (chosen in chat, 2026-11-26) → 크기·자간·줄 높이는 지금 값을 `calc(var(--spacing) * n)` 으로, 굵기 500 = `--font-weight-medium`, 글꼴 토큰 | resolved |
| Q-07 | 공개 API(8절)와 데이터 | **A (추천)** 8절 그대로 / B 내용 고정 / C 사용자가 바꿈 | 추천안 채택 — 사용자가 "추천안 모두 채택" 선택 (chosen in chat, 2026-11-26) → A | resolved |

답을 받으면 사실·상태·토큰·API 표도 함께 갱신한다. 모든 필요한 질문이 해결된 경우에만 `open_questions: 0`을 기록한다.

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 5절 "구현 값" 열(푸터 741, 열 목록 36 간격, 아래 줄 y 582, 나머지는 현재 사이트), 바탕 #F7F7F7, 1440 폭 흰 캔버스 | Storybook iframe 1440×900 Playwright 측정 → scratchpad `rebuild/A/measure.json` Home 값과 대조(열 목록·높이는 Figma 값과 대조), `Home-footer.png` 와 나란히 비교 | |
| 모든 상태 | 링크 hover 밑줄, 언어·통화·소셜 hover 변화 없음, 포커스 `focus-ring` 2px | Playwright 실제 포인터 hover, 실제 Tab 키 | |
| 아이콘과 노출 조건 | 지구본·소셜 16×16(원본 path), Privacy 26×12, 깨진 그림 0 | DOM 크기·위치, `naturalWidth`, path 대조 | |
| 클릭 기능 | 링크·버튼·소셜을 누르면 해당 콜백 1회, 주소·스크롤 변화 없음 | Storybook `play`(`fn()` + `userEvent.click`), Playwright 로 `location.href`·`scrollY` 확인 | |
| Tab / Focus | 링크 30 → 언어 → 통화 → 소셜 3, 모든 요소에 보이는 링 | play `userEvent.tab`, Playwright 키보드 | |
| 접근성 | `<footer>`, 열 제목 `<h2>`, 소셜 읽기 이름 3개, 장식 그림 `alt=""`, "·" 숨김 | DOM·접근성 트리 확인 | |
| 글꼴 | 토큰 글꼴("SF Pro", var(--font-sans))이 macOS 에서 지금 페이지와 같은 폭으로 그려짐 | 글자 상자 폭 측정 대조(예: "Help Center" 75.6) | |
| Nested parts identity | 키트 하위 부품 없음(4절 행 모두 `none`) | `ai:verify` DOM 확인 | |
| Nested part → composite callback | 해당 없음. 대신 위 클릭 기능 행 | — | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 콘솔 오류 0 | `pnpm ai:check Footer`, `pnpm ai:verify Footer`, `pnpm typecheck`, `pnpm ds:guard` | |

필수 명령: `pnpm ai:check Footer`, `pnpm ai:verify Footer`, `pnpm typecheck`, `pnpm ds:guard`. 명령 검사와 시각 원본 대조를 구분한다. 아직 수행하지 않은 검사는 통과라고 적지 않는다.

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 열린 질문 → A: "추천안 모두 채택 (권장)"; Q: Figma 변수가 아닌 값 → A: "Figma 스타일 값으로 맞춤"; Q: 글자 크기·자간 → A: "지금 크기·자간 유지 (권장)"; Q: 공용 버튼 → A: "Button 에 공용 모양 추가 (권장)" (모두 chosen in chat, 2026-11-26, 리드 전달). Q-01~Q-07 에 반영했다.
- 승인한 revision: 1 — 사용자 "승인하고 진행 (권장)" 선택 (chosen in chat, 2026-11-26)
- 구현 전에 남은 조건: 토큰 계획 revision 6(`surface-subtle`, 리드), Privacy 아이콘 파일 이동(리드/사용자), 사용자 승인("Approve revision 1").
