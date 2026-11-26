<!-- @ds-generated 2c6f9f2fce688f70 — `pnpm ds:gen` 이 만든 파일입니다.
   ds.config.json + 실제 토큰에서 생성
   직접 고치면 다음 생성 때 충돌로 보고되고 덮어쓰지 않습니다. -->
# 디자인 토큰 (MUST)

> 현재 해석: 학생 팔레트: 선언/승인 역할만 적용
>
> 이 파일은 `ds.config.json` 과 실제 토큰에서 생성됩니다. 손으로 쓴 규칙은 토큰 이름이 바뀌는 순간 거짓말이 되기 때문입니다.

## 계층

`Hexcode → Primitive → Semantic`. 컴포넌트는 **semantic 과 layout 만** 참조한다.

| 계층 | 쓰는 곳 | 예 |
|---|---|---|
| primitive | 쓰지 않는다 | `--color-blue-500: #0066FF` |
| semantic | **여기만 쓴다** | `--color-primary: var(--color-blue-500)` |
| layout | 간격·모서리·타이포·모션 | `--radius-md`, `--spacing` |

## 금지

- 색상·간격·모서리·폰트를 리터럴로 쓰지 않는다. `#fff`, `16px`, `8px` 전부 금지.
- primitive 를 컴포넌트에서 직접 참조하지 않는다 (`var(--color-blue-500)` ✗).
- 없는 토큰을 만들어 쓰지 않는다. 필요하면 Figma 에 추가하고 다시 읽는다.

## 쓸 수 있는 semantic 토큰 (이게 전부다)

```css
--color-bg   /* shade-01 */
--color-surface   /* shade-01 */
--color-surface-raised   /* fills-vibrant-use-plus-lighter-darker-quaternary */
--color-border   /* neutral-03 */
--color-border-strong   /* neutral-06 */
--color-text   /* shade-02 */
--color-text-secondary   /* neutral-07 */
--color-text-disabled   /* neutral-06 */
--color-primary   /* primary-02 */
--color-primary-hover   /* primary-02 */
--color-primary-active   /* primary-02 */
--color-on-primary   /* shade-01 */
--color-danger   /* error-02 */
--color-success   /* shade-01 */
--color-warning   /* shade-01 */
--color-info   /* shade-01 */
--color-image-placeholder   /* neutral-06 */
--color-text-tertiary   /* neutral-08 */
--color-on-image   /* shade-01 */
--color-indicator   /* neutral-03 */
--color-selected   /* shade-02 */
--color-on-selected   /* shade-01 */
--color-focus-ring   /* shade-02 */
--color-focus-ring-inner   /* neutral-04 */
--color-border-emphasis   /* shade-02 */
--color-control-bg   /* shade-01 */
--color-surface-inverse   /* shade-02 */
--color-on-inverse   /* shade-01 */
--color-surface-disabled   /* neutral-03 */
--color-on-disabled   /* shade-01 */
--color-surface-hover   /* shade-02-5 */
--color-surface-focus   /* neutral-01 */
--color-text-link   /* link */
--color-text-muted   /* neutral-06 */
--color-indicator-hover   /* neutral-04 */
--color-track   /* neutral-02 */
--color-border-subtle   /* neutral-02 */
--color-border-medium   /* neutral-04 */
--color-loading-dot-muted   /* neutral-02 */
--color-avatar-placeholder   /* neutral-07 */
--color-border-field   /* neutral-07 */
--color-text-discount   /* discounts */
--color-icon-accent   /* accent-02 */
--color-icon-accent-subtle   /* accent-01 */
--color-image-placeholder-subtle   /* neutral-03 */
--color-danger-subtle   /* error-01 */
--color-border-accent   /* accent-02 */
--color-control-bg-subtle   /* fills-vibrant-use-plus-lighter-darker-tertiary */
--color-control-bg-subtle-hover   /* neutral-02 */
--color-surface-subtle   /* neutral-01 */
--color-surface-hover-subtle   /* neutral-01 */
--color-image-frame   /* shade-01 */
--color-image-scrim   /* grays-black */
```

## layout 토큰

```css
--radius-md: 8px;
--radius-lg: 12px;
--spacing: 4px;
--border-width-thin: 1px;
--radius-size-title-2: 22px;
--radius-xxlarge-headline: 26px;
--radius-small-subheadline: 18px;
--spacing-var-sds-size-space-400: 16px;
--radius-var-sds-size-radius-200: 8px;
--spacing-var-sds-size-space-100: 4px;
--spacing-var-sds-size-space-800: 32px;
--spacing-var-sds-size-space-200: 8px;
--spacing-var-sds-size-space-1200: 48px;
--radius-corner-medium: 12px;
--spacing-var-sds-size-space-600: 24px;
--shadow-elevation-01: 0px 4px 18px 0px #0000002B;
--shadow-elevation-02: 0px 1px 5px -363px #00000030;
--shadow-elevation-03: 0px 6px 16px 0px #0000001F;
--gradient-selfmake-1: url("data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(4.1582 -4.3501e-7 4.3501e-7 56.542 -1.5819 40)'><stop stop-color='rgba(211,55,83,1)' offset='0'/><stop stop-color='rgba(209,54,96,1)' offset='0.52835'/><stop stop-color='rgba(199,45,101,1)' offset='1'/></radialGradient></defs></svg>");
--gradient-selfmake-2: url("data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.9578 4 -4 -486.33 39.77 0.0000061807)'><stop stop-color='rgba(199,45,101,1)' offset='0'/><stop stop-color='rgba(210,55,96,1)' offset='0.48442'/><stop stop-color='rgba(210,55,85,1)' offset='1'/></radialGradient></defs></svg>"), url("data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.9578 4 -4 -486.33 39.77 0.0000061807)'><stop stop-color='rgba(199,45,101,1)' offset='0'/><stop stop-color='rgba(210,55,96,1)' offset='0.48442'/><stop stop-color='rgba(210,55,85,1)' offset='1'/></radialGradient></defs></svg>");
--gradient-selfmake-3: linear-gradient(90deg, rgb(235, 76, 96) 0%, rgb(235, 76, 96) 100%), url("data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.9578 4 -4 -486.33 39.77 0.0000061807)'><stop stop-color='rgba(199,45,101,1)' offset='0'/><stop stop-color='rgba(210,55,96,1)' offset='0.48442'/><stop stop-color='rgba(210,55,85,1)' offset='1'/></radialGradient></defs></svg>"), url("data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.9578 4 -4 -486.33 39.77 0.0000061807)'><stop stop-color='rgba(199,45,101,1)' offset='0'/><stop stop-color='rgba(210,55,96,1)' offset='0.48442'/><stop stop-color='rgba(210,55,85,1)' offset='1'/></radialGradient></defs></svg>");
--gradient-selfmake-4: url("data:image/svg+xml;utf8,<svg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.7424 -3.915e-7 3.915e-7 50.887 -1.4237 36)'><stop stop-color='rgba(211,55,83,1)' offset='0'/><stop stop-color='rgba(209,54,96,1)' offset='0.52835'/><stop stop-color='rgba(199,45,101,1)' offset='1'/></radialGradient></defs></svg>");
--color-overlay: rgb(0 0 0 / 45%);
--radius-sm: 4px;
--radius-full: 9999px;
--border-width-thick: 2px;
--shadow-sm: 0 1px 2px rgba(0,0,0,.06);
--shadow-md: 0 4px 12px rgba(0,0,0,.08);
--shadow-lg: 0 12px 32px rgba(0,0,0,.12);
--duration-fast: 150ms;
--duration-normal: 250ms;
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
--text-body-2: 14px;
--text-body-1: 16px;
--text-title: 20px;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
--leading-tight: 1.25;
--leading-normal: 1.5;
--text-type-body-copy-14pt-semibold: 14px;
--font-weight-type-body-copy-14pt-semibold: 590;
--font-type-body-copy-14pt-semibold: "SF Pro", var(--font-sans);
--tracking-type-body-copy-14pt-semibold: 0px;
--text-type-body-copy-16pt-regular: 16px;
--font-weight-type-body-copy-16pt-regular: 400;
--font-type-body-copy-16pt-regular: "SF Pro", var(--font-sans);
--tracking-type-body-copy-16pt-regular: 0px;
--text-type-body-copy-12pt-semibold: 12px;
--font-weight-type-body-copy-12pt-semibold: 590;
--font-type-body-copy-12pt-semibold: "SF Pro", var(--font-sans);
--tracking-type-body-copy-12pt-semibold: 0px;
--text-type-body-copy-14pt-regular: 14px;
--font-weight-type-body-copy-14pt-regular: 400;
--font-type-body-copy-14pt-regular: "SF Pro", var(--font-sans);
--tracking-type-body-copy-14pt-regular: 0px;
--text-type-header-22pt-semibold: 22px;
--font-weight-type-header-22pt-semibold: 590;
--font-type-header-22pt-semibold: "SF Pro", var(--font-sans);
--tracking-type-header-22pt-semibold: 0px;
--text-type-body-copy-18pt-semibold: 18px;
--font-weight-type-body-copy-18pt-semibold: 590;
--font-type-body-copy-18pt-semibold: "SF Pro", var(--font-sans);
--tracking-type-body-copy-18pt-semibold: 0px;
--text-type-body-copy-16pt-semibold: 16px;
--font-weight-type-body-copy-16pt-semibold: 590;
--font-type-body-copy-16pt-semibold: "SF Pro", var(--font-sans);
--tracking-type-body-copy-16pt-semibold: 0px;
--text-type-body-copy-12pt-regular: 12px;
--font-weight-type-body-copy-12pt-regular: 400;
--font-type-body-copy-12pt-regular: "SF Pro", var(--font-sans);
--tracking-type-body-copy-12pt-regular: 0px;
--text-type-mirco-text-10pt-semibold: 10px;
--font-weight-type-mirco-text-10pt-semibold: 590;
--font-type-mirco-text-10pt-semibold: "SF Pro", var(--font-sans);
--tracking-type-mirco-text-10pt-semibold: 0px;
--text-type-body-copy-12pt-semibold-underlined: 12px;
--font-weight-type-body-copy-12pt-semibold-underlined: 590;
--font-type-body-copy-12pt-semibold-underlined: "SF Pro", var(--font-sans);
--tracking-type-body-copy-12pt-semibold-underlined: 0px;
--text-type-body-copy-13pt-regular: 13px;
--font-weight-type-body-copy-13pt-regular: 400;
--font-type-body-copy-13pt-regular: "SF Pro", var(--font-sans);
--tracking-type-body-copy-13pt-regular: 0px;
--text-type-body-copy-13pt-semibold: 13px;
--font-weight-type-body-copy-13pt-semibold: 590;
--font-type-body-copy-13pt-semibold: "SF Pro", var(--font-sans);
--tracking-type-body-copy-13pt-semibold: 0px;
--text-type-body-copy-16pt-regular-underlined: 16px;
--font-weight-type-body-copy-16pt-regular-underlined: 400;
--font-type-body-copy-16pt-regular-underlined: "SF Pro", var(--font-sans);
--tracking-type-body-copy-16pt-regular-underlined: 0px;
--text-type-body-copy-18pt-regular: 18px;
--font-weight-type-body-copy-18pt-regular: 400;
--font-type-body-copy-18pt-regular: "SF Pro", var(--font-sans);
--tracking-type-body-copy-18pt-regular: 0px;
--text-type-body-copy-18pt-medium: 18px;
--font-weight-type-body-copy-18pt-medium: 510;
--font-type-body-copy-18pt-medium: "SF Pro", var(--font-sans);
--tracking-type-body-copy-18pt-medium: 0px;
--text-type-header-22pt-regular: 22px;
--font-weight-type-header-22pt-regular: 400;
--font-type-header-22pt-regular: "SF Pro", var(--font-sans);
--tracking-type-header-22pt-regular: 0px;
```

## 주의 — 추론된 토큰

아래 19개는 사람이 선언한 값이 아니라 추론·합성된 것이다. 쓰기 전에 사용자에게 확인할 것.

- `--color-overlay` — synthesized / 기본 layout 보충
- `--radius-sm` — synthesized / 기본 layout 보충
- `--radius-full` — synthesized / 기본 layout 보충
- `--border-width-thick` — synthesized / 기본 layout 보충
- `--shadow-sm` — synthesized / 기본 layout 보충
- `--shadow-md` — synthesized / 기본 layout 보충
- `--shadow-lg` — synthesized / 기본 layout 보충
- `--duration-fast` — synthesized / 기본 layout 보충
- `--duration-normal` — synthesized / 기본 layout 보충
- `--ease-standard` — synthesized / 기본 layout 보충
- `--font-sans` — synthesized / 기본 layout 보충
- `--text-body-2` — synthesized / 기본 layout 보충
- `--text-body-1` — synthesized / 기본 layout 보충
- `--text-title` — synthesized / 기본 layout 보충
- `--font-weight-regular` — synthesized / 기본 layout 보충
- `--font-weight-medium` — synthesized / 기본 layout 보충
- `--font-weight-bold` — synthesized / 기본 layout 보충
- `--leading-tight` — synthesized / 기본 layout 보충
- `--leading-normal` — synthesized / 기본 layout 보충
