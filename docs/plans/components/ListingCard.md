---
kind: component
component: ListingCard
revision: 3
status: approved
source_kind: figma
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=238-2494&m=dev
scope_nodes: [238:2494]
facts_complete: true
open_questions: 0
---

# 컴포넌트 구현 계획 — ListingCard

> 작성: Claude Code(유지보수자), 2026-11-25. 사용자 요청: "storybook 마이그레이션은 해야될 것 같은데 … 이 스토리북만 너가 만들어주거나". 사용자 승인 전 구현 파일을 만들지 않는다.

## 1. 요청과 적용 규칙

- 요청한 작업: Home 페이지 Stay in Seoul 의 숙소 카드를 Storybook 부품으로 만든다. 페이지는 이후 이 부품을 쓴다.
- 읽은 공통 규칙: `docs/ai-component-workflow.md` R01~R09, `docs/ai-design-system-spec.md`
- Figma 파일·노드·조회 시점: Q5QDGE5WoXefOxgm5fziH3, 원본 부품 `Card` 세트의 "Default Card" 변형 238:2494(페이지 인스턴스 421:8479), 2026-11-25 Figma Desktop MCP(get_metadata·get_design_context·get_variable_defs·get_screenshot) 직접 조회, 캐시 아님
- 대상 코드·토큰 기준: git-demo 작업 폴더 현재 상태, 토큰 계획 `docs/plans/tokens.md` revision 4(이 부품용 색 역할 4개 추가, 승인 대기)

## 2. 컴포넌트의 역할과 AI의 해석

| 항목 | 확인된 사실과 출처 | AI의 해석 | 사용자의 확정/정정 |
|---|---|---|---|
| 부품의 역할 | 238:2494: 사진(303×287) + 하트 + 사진 점 + 이름·장소·날짜·가격 + 별점 | 숙소 목록의 카드 한 장 | Q-01 |
| 누를 수 있는 영역 | 하트(24×24)만 아이콘. 카드 전체의 링크·hover 변형 없음 | 하트는 `<button>`. rev 2: `href` 를 주면 제목이 `<a>` 가 되고 카드 전체를 덮어 누르면 이동(하트는 그 위에서 따로 동작). 모양은 바뀌지 않음 | Q-02, Q-05 |
| 클릭/선택/열림 동작 | Figma 에 하트 눌림(채워진) 모양 없음 | 하트 클릭 시 `onFavoriteClick` 호출, `aria-pressed={isFavorite}` 로 상태만 알림. 모양은 바꾸지 않음 | Q-02 |
| 사진 넘김(rev 3) | Figma 사진 점 238:2508 은 사진 5장 중 1번째가 현재(흰색)임을 보여 줌. 넘김 동작은 Figma 에 없음 → 2026-11-26 사용자 요청 | `images` 로 사진을 최대 5장 받아 `autoPlayMs` 마다 다음 사진으로 바뀌고(5번 뒤엔 1번), 흰 점이 지금 사진 순서로 옮겨 감. 바뀔 때 겹쳐 사라지듯 바뀜. 마우스를 올리거나 카드 안에 키보드 포커스가 있으면 멈춤. 동작 줄이기 설정이면 자동으로 넘기지 않음 | Q-06 |
| 키보드·포커스 범위 | Figma 에 Focus 변형 없음 | 하트 버튼 하나가 Tab 으로 잡힘. 브라우저 기본 포커스 링 | Q-02 |
| disabled 동작 | Figma 에 없음 | 만들지 않음 | Q-02 |

## 3. 기존 부품과 변경 범위

- 동일 역할의 기존 컴포넌트: 없음. `src/components/Card` 는 키트 기본 상자(테두리 있는 빈 카드)이고 Home 페이지가 import 해서 쓰는 중이다.
- 기존 원본 수정 또는 새 부품이 필요한 이유: 기본 Card 를 바꾸면 기존 사용처가 바뀐다. Figma 세트 이름은 `Card` 지만 코드 이름이 겹치므로 새 부품 `ListingCard` 로 만든다(Q-01).
- 변경할 파일: `src/components/ListingCard/ListingCard.tsx`·`.css`·`.stories.tsx`·`ListingCard.figma.tsx`·`index.ts`(새로). 페이지는 이 계획에서 고치지 않는다.
- 승인된 변경에서 영향받는 기존 사용처: 없음(새 부품). 토큰 계획 revision 4 는 새 역할만 더하고 기존 역할 값은 그대로다.

## 4. Nested parts

| Figma instance | Original component / set | Figma variant | Found in requested variants | Kit component and props | Status |
|---|---|---|---|---|---|
| — (가격·별점 글자) | — | — | 238:2494 | none — 이 부품 안에서 글자로 만든다(Text 부품의 variant 에 14pt Semibold/Regular·Neutral 08 이 없음) | confirmed |

- Confirmed absence of nested instances and evidence: get_metadata(421:8479·238:2494) 의 자식은 rounded-rectangle `image`, frame `heart`, frame `Location / Dates`(text 4개), frame `star / price`(star + text), frame `ellipses`, 숨김 frame `superhost / badge` 뿐이고 instance 가 없다.

## 5. Figma 상태·크기 전체 목록

| Figma 노드 ID / 조합 | 읽기 근거 | 발생 이벤트 또는 지속 상태 | 적용 영역 | 기본 상태와 다른 값·구조 | 아이콘 유무 | 코드 API/CSS 연결 | 확정 여부 |
|---|---|---|---|---|---|---|---|
| 238:2494 Default Card | get_design_context + 스크린샷 | 기본 | 카드 전체 | 기준 | 하트·별·점 | 기본 렌더 | 확정 |

- Focus 링이 감싸는 정확한 범위와 근거: Figma 에 없음 → 하트 버튼에 브라우저 기본 포커스 링(접근성 기본값).
- Figma에 실제로 없는 상태·조합: hover, pressed, 하트 채움, disabled, superhost 배지(숨김) — 만들지 않음.
- 미조회/실패/잘린 응답: 없음. 세트의 다른 변형(예약·지도 등)은 범위 밖(scope_nodes).

### 크기·간격 (Figma 값 → CSS)

| 요소 | Figma 값 | CSS |
|---|---|---|
| 카드 | 303×387 | 폭은 부모 칸을 채움(width 100%), 높이는 내용 |
| 사진 | 303×287, 모서리 12 | `aspect-ratio: 303 / 287`, `--radius-lg` |
| 하트 | 24×24, 사진 오른쪽 위에서 16·16 | `calc(var(--spacing) * 6)`, top/right `calc(var(--spacing) * 4)` |
| 사진 점 | 49×6, 사진 아래에서 8, 가운데 | 점 지름 6·5번째 4, 간격 5(원본 SVG 그대로), bottom `calc(var(--spacing) * 2)` |
| 글 묶음 | 사진 아래 16, 왼쪽 0 | `margin-top: calc(var(--spacing) * 4)` |
| 이름·장소·날짜 | 줄 사이 4, 줄 높이 auto(14px → 17) | gap `calc(var(--spacing) * 1)`, `line-height: normal` |
| 가격 | 날짜 묶음 아래 8 | gap `calc(var(--spacing) * 2)` |
| 별점 | 오른쪽 끝, 별 16×16 + 4 + 4.91 | `calc(var(--spacing) * 4)` 칸, gap `calc(var(--spacing) * 1)` |

## 6. 색·alpha·디자인 토큰 대응

| 요소 / 상태 | Figma 원본 값·alpha / 변수 | primitive | semantic / 역할 | 생성 CSS의 해석 값 | 값·역할 일치 여부 | 미확정 또는 새 매핑 필요 사유 |
|---|---|---|---|---|---|---|
| 사진 바탕 | #B0B0B0 / Neutral 06 | neutral-06 | `image-placeholder`(새) | #B0B0B0 | 일치 | 기존 역할(border-strong·text-disabled)은 값은 같지만 역할이 다름 → 새 역할(토큰 계획 rev 4) |
| 이름·가격 금액·별점 글자·별 | #222222 / Shade 02 | shade-02 | `text` | #222222 | 일치 | — |
| 장소·날짜 글자 | #5E5E5E / Neutral 08 | neutral-08 | `text-tertiary`(새) | #5E5E5E | 일치 | text-secondary 는 #717171(Neutral 07)이라 다름 → 새 역할 |
| 하트 속 | #222222, alpha 0.3 / Shade 02 - 30% | shade-02 | `text` + `fill-opacity: 0.3` | #222222 @30% | 일치 | 가져온 `shade-02-30` primitive 는 alpha 가 빠져 #222222 로 저장됨 → 쓰지 않고 원본 SVG 대로 text 색 + 0.3 |
| 하트 테두리·현재 사진 점 | #FFFFFF / Shade 01 | shade-01 | `on-image`(새) | #FFFFFF | 일치 | 사진 위 흰색 전용 역할 |
| 나머지 사진 점 | #DDDDDD / Neutral 03 | neutral-03 | `indicator`(새) | #DDDDDD | 일치 | border 와 값만 같음 → 새 역할 |

- 컴포넌트 fill과 Figma 부모 배경: 카드 자체는 fill 없음(투명). 페이지 배경 흰색.
- 신규 token: 위 4개 역할. `docs/plans/tokens.md` revision 4 에 추가, 승인 뒤 `pnpm ds:apply-token-plan docs/plans/tokens.md` → `ds:tokens`.
- 글자: `--font-sans`, 14pt Semibold = `--text-type-body-copy-14pt-semibold` + `--font-weight-type-body-copy-14pt-semibold`(590), 14pt Regular = `--text-type-body-copy-14pt-regular` + `--font-weight-type-body-copy-14pt-regular`(400).

## 7. 원본 아이콘·asset

| asset / Figma 노드 | 원본 파일/벡터 경로 또는 해시 | 크기·색·stroke·회전 | 나타나는 상태·조합 | 나타나지 않는 상태·조합 | 확인 여부 |
|---|---|---|---|---|---|
| heart 238:2496 | MCP asset f68c3df5… (sha256 73d9e48c28c9) path `M7 3C4.239 3 …Z` | 24×24, fill Shade 02 @0.3, stroke 흰색 2, round | 기본 | — | 확인 |
| Star 1 238:2506 | MCP asset 962426c6… (sha256 e47569cc2491) | 13.99×13.36 in 16×16, fill Shade 02 | 기본 | — | 확인 |
| ellipses 238:2508 | MCP asset bee15707… (sha256 ea1389caf39f) 원 5개 cx 3·14·25·36·47, r 3·3·3·3·2 | 49×6, 1번 흰색, 2~5번 Neutral 03 | 기본 | — | 확인 |

- 키트 규칙대로 `<svg>` JSX 로 그리고 색은 CSS 토큰으로 준다(`<img src>` 에 SVG 를 넣지 않는다). 경로·크기는 원본 그대로.

## 8. 공개 API와 실제 기능

| prop / 이벤트 | 근거 | 기본값·허용값 | 실제 동작 / 결과 | 키보드·disabled 처리 | 사용자 확정 |
|---|---|---|---|---|---|
| `title` | 238:2500 | "Groveland, California" | 굵은 첫 줄 | — | Q-03 |
| `location` | 238:2501 | "Yosemite National Park" | 둘째 줄 | — | Q-03 |
| `dates` | 238:2502 | "Oct 23 - 28" | 셋째 줄 | — | Q-03 |
| `price` / `priceUnit` | 238:2504 | "$289" / "night" | 굵은 금액 + 보통 단위 | — | Q-03 |
| `rating` | 238:2507 | "4.91" | 별 + 글자 | — | Q-03 |
| `imageSrc` / `imageAlt` | 238:2495 은 회색 바탕 | 없음 / "" | 있으면 사진을 채우고, 없으면 회색 바탕 | — | Q-03 |
| `href` | rev 2 사용자 요청(Home 카드 → /detail) | 없음 | 있으면 카드를 누르면 그 주소로 이동(제목 링크 + 카드 전체 덮개). 없으면 rev 1 과 같음 | Tab 으로 제목 링크에 포커스, Enter 로 이동. 하트 버튼은 따로 Tab | Q-05 |
| `isFavorite` / `onFavoriteClick` | 하트 238:2496 | false / — | 클릭 시 콜백 호출, aria-pressed 반영 | Tab 으로 포커스, Enter/Space 동작 | Q-02 |
| `images` | rev 3 사용자 요청(Stay in Seoul 사진이 몇 초마다 바뀜, 점이 순서 표시) | 없음 / 사진 주소 배열, 앞 5장만 씀(점이 5개) | 있으면 `imageSrc` 대신 쓴다. 첫 사진부터 보이고 흰 점 = 지금 사진 순서. 없으면 rev 2 와 같음(점은 1번째 고정) | 보이는 사진만 `imageAlt`, 나머지는 alt "" | Q-06 |
| `autoPlayMs` | rev 3 사용자 요청 | 0(넘기지 않음) / 밀리초 | `images` 가 2장 이상이고 0보다 크면 그 간격으로 다음 사진. 바뀌는 효과는 `--duration-normal`·`--ease-standard` | hover·카드 안 포커스 동안 멈춤, `prefers-reduced-motion: reduce` 면 넘기지 않음 | Q-06 |

## 9. Q&A와 사용자 결정

| 질문 ID | 미확정 항목과 근거 | 선택지 / 각 선택의 영향 | 사용자 답 | 해결 상태 |
|---|---|---|---|---|
| Q-01 | 부품 이름. Figma 세트 이름은 Card 지만 기존 기본 Card 를 페이지가 쓰는 중 | 새 부품 ListingCard / 기본 Card 를 바꿈(기존 사용처 영향) | Approve revision 1·4 (chosen in chat) | resolved |
| Q-02 | 하트 동작. Figma 에 눌림 모양 없음 | 버튼 + 콜백 + aria-pressed, 모양 변화 없음 | Approve revision 1·4 (chosen in chat) | resolved |
| Q-03 | 공개 props 와 기본 글자 | 위 8번 표 | Approve revision 1·4 (chosen in chat) | resolved |
| Q-05 | 카드를 눌러 상세 페이지로 이동(rev 2). Figma 에 링크 모양 변화 없음 | href prop 추가, 모양 변화 없음 | Approve revision 2 (chosen in chat, "전부 제가 직접") | resolved |
| Q-04 | 새 색 역할 4개(토큰 계획 rev 4) | 위 6번 표 | Approve revision 1·4 (chosen in chat) | resolved |
| Q-06 | 사진 여러 장 자동 넘김(rev 3). Figma 에 넘김 동작 없음, 점 모양·색은 그대로 | `images` + `autoPlayMs` 추가, 흰 점이 지금 사진으로 이동 | 사용자 요청 원문(2026-11-26): "Stay in Seoul은 몇초마다 사진들이 바뀌어야돼서 관련 숙소들로 해주면 좋아 (카드 안에 ...이 보여지고 있는 순서)" | resolved |

## 10. 검증 계획

| 확인 대상 | 원본의 기대 결과 | 검사 방법 | 완료 증거 |
|---|---|---|---|
| 기본 상태와 캔버스 배경 | 238:2494 스크린샷과 같은 모양, 흰 배경 | Storybook iframe 스크린샷·computed style | |
| 모든 상태·크기 | 기본 하나 | 원본 대조 | |
| 아이콘과 노출 조건 | 하트·별·점이 원본 위치·크기 | DOM 크기·위치 측정 | |
| 클릭·입력·선택 등 기능 | 하트 클릭 → onFavoriteClick 1회 | Storybook play `fn()` + `userEvent.click` | |
| disabled / Tab / Focus | Tab 한 번에 하트 포커스 | play `userEvent.tab` | |
| 사진 넘김(rev 3) | `autoPlayMs` 뒤 2번째 사진이 보이고 2번째 점이 흰색 | Storybook `Photos` 스토리 play(`waitFor`), 브라우저에서 Home 카드 관찰 | |
| 공통 규칙 및 기존 사용처 | 토큰만 사용, 기존 부품 영향 없음 | `pnpm ai:check ListingCard`, `pnpm ai:verify ListingCard`, `pnpm typecheck`, `pnpm ds:guard` | |

## 11. 사용자 검토

- 계획 내용에 대한 사용자 수정·결정: Q: 부품 계획 ListingCard rev 1 과 토큰 계획 rev 4 를 승인할까? → A: Approve revision 1·4 (chosen in chat, 2026-11-25)
- 승인한 revision: 3 (rev 1 → rev 2: href 로 카드 링크 추가, 2026-11-25 사용자가 채팅에서 "전부 제가 직접 (권장)" 선택 / rev 2 → rev 3: images·autoPlayMs 로 사진 자동 넘김, 2026-11-26 사용자 요청 원문은 Q-06)
- 구현 전에 남은 조건: 토큰 계획 revision 4 적용(pnpm ds:apply-token-plan)
