# My website plan — Page 3: Checkout

This is my plan for the Checkout page of my practice website. I made one file for each page.

How to read this file:

- Lines that start with **Why** or **Where to find it** explain what the part is for. They are help, not page content.
- Everything else is my answer.
- Words in "quotes" are the exact words that must be on the page.

## 1. What page is this?

> **Why:** The AI needs the page's name, where it lives on the site and what it is for. If I don't write these, the AI has to guess.

- **Page name:** Checkout
- **Address:** `/checkout`
  - People come here when they click "Reserve" on the Detail page.
- **Tab title:** "Confirm and pay"
  - These are the words on the browser tab at the top of the window.
- **What the page is for:** People check their reservation before paying. They choose when to pay and check the stay, dates, guests and price.
  - This is a practice site. Nothing is really paid or booked.
- **Main title:** "Confirm and pay"
  - It is at the top of the page, next to a back arrow.
  - A page has only one main title. Screen readers (apps that read the screen out loud) use it to tell people what the page is about.

## 2. Figma link

> **Why:** The AI opens this Figma frame to see how the page looks.
>
> **Where to find it:** In Figma, click the name of the whole page frame, not one small part. Right-click → **Copy/Paste as** → **Copy link to selection**.

- Checkout: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-1056&m=dev

## 3. What sections does the page have?

> **Why:** A section is one band of the page. I list them from top to bottom, like the floors of a building. For each section I write three things:
>
> 1. **Where:** where it is on the page.
> 2. **Part:** the ready-made piece in my Storybook that draws it. Storybook is my parts showroom. Each part is like a LEGO block that is already built and checked.
> 3. **Shows:** what people see, with the exact words in quotes.
>
> **Where to find it:** Open Storybook. In the left menu, open **Components**, then the part's name. The name after the arrow (→) is the example to look at.

### 1) Top bar

- **Where:** at the very top of the page, across the whole width of the screen.
- **Part:** Navigation → "Site Bar"
- **Shows, from left to right:**
  - the Airbnb logo
  - a "Become a Host" button
  - a round button with a globe icon (for the language)
  - a rounded button with a menu icon and a profile picture
- There is **no** search bar on this page.

### 2) Title

- **Where:** under the top bar.
- **Part:** CheckoutHeading → "Default"
- **Shows:**
  - a round back arrow, a little to the left of the title
  - the title "Confirm and pay"

### 3) Steps (left) and reservation summary (right)

These two sit side by side.

**Steps, on the left**

- **Part:** CheckoutStep → "Steps" (3 of them, one under the other)
- **Shows:**
  - **Step 1 (open):** the title "1. Choose when to pay", then 3 choices. Each choice has a round radio button on the right side.
    - "Pay £340.91 now"
    - "Pay £0 now"
      - small words under it: "£340.91 charged on 13 Jan 2027. No extra fees." and "More info"
    - "Pay in 3 payments with Klarna"
      - small words under it: "3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status." and "More info"
    - a "Next" button at the bottom of the step
  - **Step 2 (closed):** only the title "2. Add a payment method"
  - **Step 3 (closed):** only the title "3. Review your reservation"

**Reservation summary, on the right**

- **Parts:**
  - ReservationSummary → "Default" for the summary box
  - Callout → "Banner" for the small box under it
- **Shows, from top to bottom:**
  - a small picture of the stay, "STAY 2572", "4.98 (487)" and "Guest favourite"
  - "Free cancellation" — "Cancel before 21 January for a full refund." and "Full policy"
  - "Dates" — "22–24 Jan 2027" — a "Change" button
  - "Guests" — "1 adult" — a "Change" button
  - "Price details" — "2 nights x £170.46" — "£340.91"
  - "Total" with "GBP" — "£340.91"
  - "Price breakdown"
  - then, in a separate small box under the summary: a diamond icon and "Rare find! This place is usually booked"

### 4) Inspiration

- **Where:** under the steps and the summary, across the whole width.
- **Part:** Inspiration → "Default"
- **Shows:** the same as on the Home page (title, 8 tabs, 17 places and "Show more").

### 5) Footer

- **Where:** at the very bottom of the page, across the whole width.
- **Part:** Footer → "Default"
- **Shows:** the same as on the Home page (3 columns of links, the bottom line, language, money and social icons).

## 4. Things the page shows

> **Why:** I write every item and every picture, so the AI never makes one up.
>
> **Pictures:** All my pictures are in the `my-assets/images` folder. I write the exact file name. If a file is missing, the AI makes the item without a picture. It never makes up a picture.
>
> **Picture descriptions:** A screen reader says these words for people who can't see the picture. If a picture is only decoration, I write "decoration — no words", and the screen reader skips it.

- **The stay:** STAY 2572
  - Picture: `checkout-stay-thumb.png` — decoration, no words (the name "STAY 2572" is right next to it).
- **"Rare find!" box icon:** `checkout-icon-rare-find.png` — decoration, no words.
- **Pictures of the radio button looks from Figma** (to check that the page looks the same): `checkout-radio.svg` (normal), `checkout-radio-hover.svg` (mouse on it), `checkout-radio-focus.svg` (keyboard on it), `checkout-radio-checked.svg` (chosen), `checkout-radio-focus-checked.svg` (chosen, and keyboard on it).
- **Other icons:** in `my-assets/images`, with names that start with `checkout-` (for example `checkout-icon-back.svg`, `checkout-icon-star.svg`).

## 5. What does each section do?

> **Why:** For everything people can click or type in, I write what happens. If nothing happens, I write "nothing happens". Then the AI doesn't add surprises.
>
> **Links and buttons:** A **link** takes you to another page. A **button** does something on this page. Going to another page is always a link, even when it looks like a button.
>
> **Keyboard:** Some people don't use a mouse. They press **Tab** to move to the next link or button, and **Enter** (or **Space** for a button) to press it. Everything I can click must also work this way.

- **Top bar**
  - Airbnb logo: a link that goes to `/` (the Home page).
  - "Become a Host", the globe button and the menu button: nothing happens. They are only shown.
- **Title**
  - The back arrow: a **link** that goes back to `/detail`. It has no words on the screen, so a screen reader says "Back".
- **Step 1, the 3 choices**
  - Nothing is chosen when the page opens.
  - Clicking a choice chooses it. I can click its words or its radio button.
  - Only one choice is chosen at a time. Choosing a new one un-chooses the old one.
  - The chosen radio button turns black with a white dot in the middle.
  - Each radio button also has the Figma look for "mouse on it" and for "keyboard on it".
  - With the keyboard: press Tab to reach the choices, then use the arrow keys to move between them.
- **Nothing happens for:** the 2 "More info", "Next", "Full policy", the 2 "Change" buttons, "GBP" and "Price breakdown". They are only shown.
- **Steps 2 and 3:** they stay closed. Clicking them does nothing.
- **Inspiration and Footer:** the same as on the Home page.

## 6. How is the page laid out?

> **Why:** This tells the AI where each section sits and how much space is around it.
>
> **px:** Figma measures sizes in px. 1 px is one tiny dot on the screen. To read a number in Figma, click a part. Figma shows its size and the space around it.
>
> **Full width:** the section goes from the left edge of the screen to the right edge.

- **Screen size:** the page is made for a computer screen 1440 px wide, the same width as the Figma frame. Phone and tablet screens are not part of this page for now.
- **No sideways scrolling:** the page never scrolls sideways.
- **Full-width sections:** Top bar, Inspiration and Footer. The space inside them comes from the parts.
- **The middle column:** everything between the top bar and Inspiration sits in one column, 1010 px wide, in the middle of the screen. That leaves 215 px of space on each side.
- **Title:** 69 px under the top bar.
- **Steps and reservation summary**
  - Both start 24 px under the title, side by side.
  - The steps are on the left: 540 px wide.
  - The summary is on the right: 390 px wide.
  - There is 80 px of space between them.
- **Inside the columns**
  - The 3 steps are 24 px apart.
  - The "Rare find!" box is 24 px under the summary box.
- **Inspiration:** 334 px under the "Rare find!" box.
