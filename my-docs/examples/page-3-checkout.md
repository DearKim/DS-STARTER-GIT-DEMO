# My website plan — Page 3: Checkout

I make one file for each page. This file is only for the Checkout page.

## 1. What page is this?

- Checkout:
  - Address: /checkout
  - Tab title: Confirm and pay
  - For: confirming the reservation — choosing when to pay and checking the stay, dates, guests and price
  - Main title (only one on the page): "Confirm and pay" (in the Title)

## 2. Figma link

- Checkout: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-1056&m=dev

## 3. What sections does the page have?

From top to bottom. "Part" is the name of the part in my Storybook. The words in quotes are the exact words on the page.

1. **Top bar**
   - Part: Navigation (the "site" look, without the search bar)
   - Shows: the Airbnb logo, the link "Become a Host", a language button, a menu button with a profile picture
2. **Title**
   - Part: CheckoutHeading
   - Shows: a round back arrow and "Confirm and pay"
3. **Steps** (left)
   - Part: CheckoutStep, 3 of them (the first one open, the other two closed)
   - Shows:
     - "1. Choose when to pay" with 3 choices, each with a round radio on the right:
       - "Pay £340.91 now"
       - "Pay £0 now" — "£340.91 charged on 13 Jan 2027. No extra fees. More info"
       - "Pay in 3 payments with Klarna" — "3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status. More info"
       - a "Next" button
     - "2. Add a payment method" (closed, title only)
     - "3. Review your reservation" (closed, title only)
4. **Reservation summary** (right)
   - Parts: ReservationSummary, then Callout (the "Banner" look)
   - Shows: a stay picture, "STAY 2572", "4.98 (487)", "Guest favourite"; "Free cancellation" — "Cancel before 21 January for a full refund. Full policy"; "Dates" "22–24 Jan 2027" "Change"; "Guests" "1 adult" "Change"; "Price details" "2 nights x £170.46" "£340.91"; "Total GBP" "£340.91"; "Price breakdown"; then a box with a diamond icon "Rare find! This place is usually booked"
5. **Inspiration**
   - Part: Inspiration
   - Shows: the same as on Home
6. **Footer**
   - Part: Footer
   - Shows: the same as on Home

## 4. Things the page shows

- The stay: STAY 2572 · picture checkout-stay-thumb.png
- The diamond icon in the "Rare find!" box: checkout-icon-rare-find.png
- Other icons for this page are in my-assets/images with names that start with checkout- (for example checkout-icon-back.svg, checkout-radio.svg)

## 5. What does each section do?

- Top bar, Airbnb logo: a link that goes to /
- Top bar, "Become a Host", language button, menu button: nothing, just shows them
- Title, back arrow: a link that goes back to /detail. Its name for screen readers is "Back"
- "Choose when to pay", the 3 choices: clicking a choice (its words or its radio) chooses it. Only one at a time. Nothing is chosen at first. The chosen radio turns black with a white dot. Each radio also shows its hover and keyboard-focus look from Figma
- "More info" links, "Next", "Full policy", the 2 "Change" buttons, "GBP", "Price breakdown": nothing, just shows them
- "2. Add a payment method" and "3. Review your reservation": nothing, they stay closed
- Inspiration and Footer: the same as on Home

## 6. How is the page laid out?

- Screen size: made for a computer screen 1440px wide, the same as the Figma frame. Phone and tablet screens are not part of this page for now.
- The page never scrolls sideways.
- Top bar, Inspiration and Footer: full width. Their inside spacing comes from the parts.
- Everything between the top bar and Inspiration sits in one column 1010px wide, in the middle of the screen.
- Title: 69px under the top bar.
- Steps and reservation summary: 24px under the title, side by side. The steps are on the left, 540px wide. The summary is on the right, 390px wide. There is 80px between them.
- The 3 steps are 24px apart. The "Rare find!" box is 24px under the summary.
- Inspiration: 334px under the "Rare find!" box.
