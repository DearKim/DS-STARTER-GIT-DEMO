---
kind: tokens
revision: 5
status: approved
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-2752&m=dev
palette_hash: f8ba43f43c73ab70dfe0ddd7101d69d76503d84761aa96cc16b2b59d2a667c58
content_hash: 733a81b3fb8e4d83f347b815379fa5765daa53c57f729b68bbca863b014667fb
open_questions: 0
---

# 학생 색 역할 제안

학생 Figma 파일/노드·조회 시점: 2026-11-25, node 389:2752
역할 선택의 근거와 학생이 결정할 질문: Figma에서 가져온 색상을 역할에 매핑 (rev 5: Colors 245:3518 에서 22색, 2026-11-26)

<!-- token-mappings:start -->
| 역할 | 학생 primitive | 가져온 Figma 노드 번호 (예: 0:1) | 원시 값 | 근거 |
|---|---|---|---|---|
| bg | shade-01 | 389:2752 | #FFFFFF | White background |
| surface | shade-01 | 389:2752 | #FFFFFF | Card surface |
| surface-raised | fills-vibrant-use-plus-lighter-darker-quaternary | 389:2752 | #F7F7F7 | Slightly elevated surface |
| border | neutral-03 | 389:2752 | #DDDDDD | Light border |
| border-strong | neutral-06 | 389:2752 | #B0B0B0 | Strong border |
| text | shade-02 | 389:2752 | #222222 | Default text |
| text-secondary | neutral-07 | 389:2752 | #717171 | Secondary text |
| text-disabled | neutral-06 | 389:2752 | #B0B0B0 | Disabled text |
| primary | primary-02 | 389:2752 | #FF385C | Airbnb brand color |
| primary-hover | primary-02 | 389:2752 | #FF385C | Same as primary (Figma has no hover variant) |
| primary-active | primary-02 | 389:2752 | #FF385C | Same as primary (Figma has no active variant) |
| on-primary | shade-01 | 389:2752 | #FFFFFF | Text on primary |
| danger | error-02 | 389:2752 | #C13515 | Error/danger |
| success | shade-01 | 389:2752 | #FFFFFF | Placeholder (Figma has no success color) |
| warning | shade-01 | 389:2752 | #FFFFFF | Placeholder (Figma has no warning color) |
| info | shade-01 | 389:2752 | #FFFFFF | Placeholder (Figma has no info color) |
| image-placeholder | neutral-06 | 389:2752 | #B0B0B0 | Listing card photo placeholder (Figma Card 238:2494 image fill = Neutral 06) |
| text-tertiary | neutral-08 | 389:2752 | #5E5E5E | Listing card location and dates (Figma Card 238:2494 text = Neutral 08) |
| on-image | shade-01 | 389:2752 | #FFFFFF | Heart outline and current photo dot on the photo (Figma Card 238:2494 = Shade 01) |
| indicator | neutral-03 | 389:2752 | #DDDDDD | Other photo dots (Figma Card 238:2494 ellipses = Neutral 03) |
| selected | shade-02 | 245:3518 | #222222 | Selected look: Chip Select fill (234:2568), Tabs selected underline (229:2214), checked radio (213:1944) = Shade 02. Plans Chip·Tabs·RadioButton rev 1 |
| on-selected | shade-01 | 245:3518 | #FFFFFF | Text and inner dot on a selected item: Chip Select label, checked radio dot = Shade 01. Plans Chip·RadioButton rev 1 |
| focus-ring | shade-02 | 245:3518 | #222222 | Keyboard focus ring of Button, Chip, Tabs, RadioButton, TextInput = Shade 02. Plans Buttons·Chip·Tabs·RadioButton·TextInput rev 1 |
| focus-ring-inner | neutral-04 | 245:3518 | #D3D3D3 | Inner focus line of Primary/Secondary Focus (238:2180) and Tabs Focus = Neutral 04. Plans Buttons·Tabs rev 1 |
| border-emphasis | shade-02 | 245:3518 | #222222 | Strong border on hover: Chip hover, RadioButton hover, Secondary button border = Shade 02. Plans Buttons·Chip·RadioButton rev 1 |
| control-bg | shade-01 | 245:3518 | #FFFFFF | Radio circle background (213:1944) = Shade 01. Plan RadioButton rev 1 |
| surface-inverse | shade-02 | 245:3518 | #222222 | Tertiary button fill (238:2256) = Shade 02. Plan Buttons rev 1 |
| on-inverse | shade-01 | 245:3518 | #FFFFFF | Tertiary button label = Shade 01. Plan Buttons rev 1 |
| surface-disabled | neutral-03 | 245:3518 | #DDDDDD | Disabled and Loading button fill (238:2186) = Neutral 03. Plan Buttons rev 1 |
| on-disabled | shade-01 | 245:3518 | #FFFFFF | Disabled button label = Shade 01. Plan Buttons rev 1 |
| surface-hover | shade-02-5 | 245:3518 | #222222 | Secondary/Tertiary hover fill = variable "Shade 02 - 5%" (opaque #222222) drawn at 5% fill opacity in Figma; the component applies the 5% (like the ListingCard heart 30%). Plan Buttons rev 1 |
| surface-focus | neutral-01 | 245:3518 | #F7F7F7 | Pill Tabs focus fill (237:2219) #F7F7F7 = Neutral 01. Plan Tabs rev 1 |
| text-link | link | 245:3518 | #004CC4 | Link text (238:2309) = Link. Named text-link because "link" would collide with the primitive --color-link. Plan Buttons rev 1 |
| text-muted | neutral-06 | 245:3518 | #B0B0B0 | Underline Tabs hover label and icon, Icon Off (229:2214) = Neutral 06. Plan Tabs rev 1 |
| indicator-hover | neutral-04 | 245:3518 | #D3D3D3 | Underline Tabs hover underline = Neutral 04. Plan Tabs rev 1 |
| track | neutral-02 | 245:3518 | #EBEBEB | Pill Tabs track background (237:2219) = Neutral 02. Plan Tabs rev 1 |
| border-subtle | neutral-02 | 245:3518 | #EBEBEB | Navigation divider and pill border (235:2441) = Neutral 02. Plan Navigation rev 1 |
| border-medium | neutral-04 | 245:3518 | #D3D3D3 | Navigation menu pill border (235:2441) = Neutral 04. Plan Navigation rev 1 |
| loading-dot-muted | neutral-02 | 245:3518 | #EBEBEB | First dot of the button Loading ellipsis (238:2168) = Neutral 02. Plan Buttons rev 1 |
| avatar-placeholder | neutral-07 | 245:3518 | #717171 | Navigation avatar background (235:2441) = Neutral 07. Plan Navigation rev 1 |
| border-field | neutral-07 | 245:3518 | #717171 | Card date and guest boxes border (238:2378) = Neutral 07. Plan Card rev 1 |
| text-discount | discounts | 245:3518 | #008A05 | Card discount amount (238:2378) = Discounts. Plan Card rev 1 |
| icon-accent | accent-02 | 245:3518 | #D03660 | Callout icon (235:2613) = Accent 02. Plan Callout rev 1 |
| icon-accent-subtle | accent-01 | 245:3518 | #F6D7DF | Callout icon light part (235:2613) = Accent 01. Plan Callout rev 1 |
| image-placeholder-subtle | neutral-03 | 245:3518 | #DDDDDD | Callout photo box (235:2641) = Neutral 03. Plan Callout rev 1 |
| danger-subtle | error-01 | 245:3518 | #FEF8F6 | TextInput error background (208:2159) = Error 01. Plan TextInput rev 1 |
<!-- token-mappings:end -->

<!-- token-contrast:start -->
Normal text needs 4.5:1; disabled text is exempt. Colors are never adjusted automatically.
| Text | Background | Contrast | Result |
|---|---|---|---|
| text | bg | 15.91:1 | pass |
| text | surface | 15.91:1 | pass |
| text | surface-raised | 14.85:1 | pass |
| text-secondary | bg | 4.88:1 | pass |
| text-secondary | surface | 4.88:1 | pass |
| text-secondary | surface-raised | 4.56:1 | pass |
| text-disabled | bg | 2.17:1 | disabled (exempt) |
| text-disabled | surface | 2.17:1 | disabled (exempt) |
| text-disabled | surface-raised | 2.02:1 | disabled (exempt) |
| text-tertiary | bg | 6.48:1 | pass |
| text-tertiary | surface | 6.48:1 | pass |
| text-tertiary | surface-raised | 6.05:1 | pass |
| text-link | bg | 7.42:1 | pass |
| text-link | surface | 7.42:1 | pass |
| text-link | surface-raised | 6.92:1 | pass |
| text-muted | bg | 2.17:1 | warning |
| text-muted | surface | 2.17:1 | warning |
| text-muted | surface-raised | 2.02:1 | warning |
| text-discount | bg | 4.53:1 | pass |
| text-discount | surface | 4.53:1 | pass |
| text-discount | surface-raised | 4.23:1 | warning |
| on-primary | primary | 3.52:1 | warning |
| on-primary | primary-hover | 3.52:1 | warning |
| on-primary | primary-active | 3.52:1 | warning |
| on-selected | selected | 15.91:1 | pass |
| danger | bg | 5.54:1 | pass |
| danger | surface | 5.54:1 | pass |
| warning | bg | 1.00:1 | warning |
| warning | surface | 1.00:1 | warning |
| success | bg | 1.00:1 | warning |
| success | surface | 1.00:1 | warning |
| info | bg | 1.00:1 | warning |
| info | surface | 1.00:1 | warning |
<!-- token-contrast:end -->

## 학생 검토

- 질문에 대한 학생 결정과 선택 이유: AI proposal, chosen in chat
- Q: Use these color roles? → A: Use these roles (chosen in chat)
- revision 5 (2026-11-26): 1단계 부품 계획(Buttons·Chip·Tabs·Navigation·Callout·RadioButton·TextInput·Card)이 쓰는 새 역할 26개. 사용자 결정: "합친 목록 + 다시 가져오기"(chosen in chat) — 값과 역할이 모두 같은 제안만 합쳤고(`docs/plans/design-system-airbnb.md` §6), 새 색은 Figma Colors(245:3518)에서 다시 가져왔다. 기존 역할 20개는 그대로다. 승인 대기.
