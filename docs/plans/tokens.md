---
kind: tokens
revision: 4
status: approved
source_url: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-2752&m=dev
palette_hash: 2a2718c93f5ebe93cbceeec3d58719d44a7c71e03a8d3b41db18b65a9102442c
content_hash: 8847c48b80f3459cb5e9f0c8141b3db2f41f1fac781196503671f45a0278655c
open_questions: 0
---

# 학생 색 역할 제안

학생 Figma 파일/노드·조회 시점: 2026-11-25, node 389:2752
역할 선택의 근거와 학생이 결정할 질문: Figma에서 가져온 13개 색상을 역할에 매핑

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
| on-primary | primary | 3.52:1 | warning |
| on-primary | primary-hover | 3.52:1 | warning |
| on-primary | primary-active | 3.52:1 | warning |
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
