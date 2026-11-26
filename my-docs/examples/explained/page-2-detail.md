# My website plan — Page 2: Detail

This is my plan for the Detail page of my practice website. I made one file for each page.

How to read this file:

- Lines that start with **Why** or **Where to find it** explain what the part is for. They are help, not page content.
- Everything else is my answer.
- Words in "quotes" are the exact words that must be on the page.

## 1. What page is this?

> **Why:** The AI needs the page's name, where it lives on the site and what it is for. If I don't write these, the AI has to guess.

- **Page name:** Detail
- **Address:** `/detail`
  - People come here when they click a stay card on the Home page.
- **Tab title:** "Airbnb | Find places to stay"
  - These are the words on the browser tab at the top of the window.
- **What the page is for:** It shows one stay: its photos, rooms, host, best points and price. It has a button to reserve the stay.
- **Main title:** "Kalani’s guesthouse TAHAA"
  - It is the name of the stay, at the top of the page, under the top bar.
  - A page has only one main title. Screen readers (apps that read the screen out loud) use it to tell people what the page is about.

## 2. Figma link

> **Why:** The AI opens this Figma frame to see how the page looks.
>
> **Where to find it:** In Figma, click the name of the whole page frame, not one small part. Right-click → **Copy/Paste as** → **Copy link to selection**.

- Detail: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-393&m=dev

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
- **Part:** Navigation → "Site Bar With Search"
- **Shows, from left to right:**
  - the Airbnb logo
  - a small search bar in the middle: "Anywhere" | "Any week" | "Add guests", with a round search button at its right end
  - a "Become a Host" button
  - a round button with a globe icon (for the language)
  - a rounded button with a menu icon and a profile picture

### 2) Title

- **Where:** under the top bar.
- **Part:** ListingTitle → "Default"
- **Shows:**
  - on the left, the name of the stay: "Kalani’s guesthouse TAHAA"
  - on the right, two small buttons: "공유하기" with a share icon, and "저장" with a heart icon

### 3) Photos

- **Where:** under the title.
- **Part:** PhotoGallery → "Default"
- **Shows:**
  - 1 big photo on the left
  - 4 small photos on the right, in two columns of two
  - The outside corners of the whole photo group are round. The inside corners are square.
  - a "사진 모두 보기" button on top of the last photo (bottom right)

### 4) Summary (left) and booking box (right)

These two sit side by side.

**Summary, on the left**

- **Part:** ListingOverview → "Default"
- **Shows, from top to bottom:**
  - "Entire home in Gangneung-si, South Korea"
  - "4 guests · 2 bedrooms · 2 beds · 2 bathrooms"
  - a box with:
    - laurel leaves on both sides of "Guest" / "favourite" (on two lines)
    - "One of the most loved homes on Airbnb, according to guests"
    - "4.98" with stars
    - "487" and "Reviews"
  - 4 highlights. Each one has a picture, a title and one sentence:
    - "Top 10% of homes" — "This home is highly ranked based on ratings, reviews and reliability."
    - "Near Anmok Beach" — "Anmok Beach is about an 8-min walk away, with the coast close by for a seaside outing."
    - "Roomy home with a full kitchen" — "A roomy private home with a full kitchen gives your group space to cook and settle in."
    - "Guests praise the cleanliness" — "Guests repeatedly praise the spotless rooms and thoughtful upkeep throughout the home."
  - the host: a picture with a small Superhost badge, "Hosted by 준구", "Superhost · 6 years hosting"
  - "Learn more about summaries"

**Booking box, on the right**

- **Part:** Card → "Reservation Detail"
- **Shows, from top to bottom:**
  - "$500" with a line through it, then "$440" and "night"
  - "4.99 · 337 reviews"
  - 3 boxes: "CHECK-IN" "2/6/2023", "CHECKOUT" "2/11/2023", "GUESTS" "1 guest"
  - a big "Reserve" button
  - "You won't be charged yet"
  - the price lines, each with words on the left and an amount on the right:
    - "500 x 5 nights" — "$2,500"
    - "Long stay discount" — "-$300"
    - "Cleaning fee" — "$200"
    - "Service fee" — "$0"
  - "Total before taxes" — "$2,400"
  - under the box: a flag icon and "리스팅 신고하기"

### 5) Description

- **Where:** under the summary, on the left side.
- **Part:** ListingDescription → "Default"
- **Shows:**
  - a small note: "Some info has been automatically translated." and "Show original"
  - the description, line by line:
    - "Inbyulgram | @stay_2572"
    - "This is' stay 2572 ', located on the way to Anmok Coffee Street."
    - "We will try to provide a complete 'rest' for our guests."
    - (two empty lines)
    - "Stay 2572 provides a 40-pyeong space used by the host as a private house."
    - "(This is for 4 people)"
  - a "Show more" button

### 6) Where you'll sleep

- **Where:** under the description, on the left side.
- **Part:** SleepSection → "Default"
- **Shows:**
  - the title "Where you'll sleep"
  - 2 photos side by side. Under each photo, a title and a short line:
    - "Bedroom 1" — "1 queen bed"
    - "Bedroom 2" — "1 queen bed"

### 7) Inspiration

- **Where:** under Where you'll sleep, across the whole width.
- **Part:** Inspiration → "Default"
- **Shows:** the same as on the Home page (title, 8 tabs, 17 places and "Show more").

### 8) Footer

- **Where:** at the very bottom of the page, across the whole width.
- **Part:** Footer → "Default"
- **Shows:** the same as on the Home page (3 columns of links, the bottom line, language, money and social icons).

## 4. Things the page shows

> **Why:** I write every item and every picture, so the AI never makes one up.
>
> **Pictures:** All my pictures are in the `my-assets/images` folder. I write the exact file name. If a file is missing, the AI makes the item without a picture. It never makes up a picture.
>
> **Picture descriptions:** A screen reader says these words for people who can't see the picture. If a picture is only decoration, I write "decoration — no words", and the screen reader skips it.

- **The stay:** Kalani’s guesthouse TAHAA · Entire home in Gangneung-si, South Korea
- **Photos (5), in this order, with their descriptions**
  - `detail-photo-1.png` — "Dining room" (the big photo)
  - `detail-photo-2.png` — "Kalani’s guesthouse TAHAA 이미지 2"
  - `detail-photo-3.png` — "Kalani’s guesthouse TAHAA 이미지 3"
  - `detail-photo-4.png` — "Kalani’s guesthouse TAHAA 이미지 4"
  - `detail-photo-5.png` — "Kalani’s guesthouse TAHAA 이미지 5"
- **Highlight pictures**, in the same order as the highlights — decoration, no words (the title next to each picture says what it is):
  - `detail-highlight-top.png`
  - `detail-highlight-near.png`
  - `detail-highlight-kitchen.png`
  - `detail-highlight-cleanliness.png`
- **Guest favourite laurels:** `detail-laurel-left.png` and `detail-laurel-right.png` — decoration, no words.
- **Host:** picture `detail-host-avatar.png` and Superhost badge `detail-icon-superhost.svg` — decoration, no words (the words next to them say who the host is).
- **Bedroom photos**
  - `detail-bedroom-1.png` — "Bedroom 1"
  - `detail-bedroom-2.png` — "Bedroom 2"
- **Other icons:** in `my-assets/images`, with names that start with `detail-` (for example `detail-icon-share.svg`, `detail-icon-save.svg`, `detail-icon-flag.svg`).

## 5. What does each section do?

> **Why:** For everything people can click or type in, I write what happens. If nothing happens, I write "nothing happens". Then the AI doesn't add surprises.
>
> **Links and buttons:** A **link** takes you to another page. A **button** does something on this page. Going to another page is always a link, even when it looks like a button.
>
> **Keyboard:** Some people don't use a mouse. They press **Tab** to move to the next link or button, and **Enter** (or **Space** for a button) to press it. Everything I can click must also work this way.

- **Top bar**
  - Airbnb logo: a link that goes to `/` (the Home page).
  - The small search bar, its search button, "Become a Host", the globe button and the menu button: nothing happens. They are only shown.
- **Title**
  - "공유하기" and "저장": nothing happens.
- **Photos**
  - "사진 모두 보기": nothing happens.
- **Summary**
  - "Learn more about summaries": nothing happens.
- **Booking box**
  - The CHECK-IN, CHECKOUT and GUESTS boxes: they only show the dates and guests. You can't change them.
  - "Reserve": a **link** that goes to `/checkout`. It looks like a big button, but it is a link because it goes to another page.
  - "리스팅 신고하기": nothing happens.
- **Description**
  - "Show original" and "Show more": nothing happens. The text stays the same.
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
- **Title**
  - 40 px under the top bar.
  - 80 px from the left edge and from the right edge.
- **Photos**
  - 40 px under the title.
  - 80 px from the left edge and from the right edge.
- **Summary and booking box**
  - Both start 80 px under the photos, side by side.
  - The summary is on the left: 653 px wide, 160 px from the left edge.
  - The booking box is on the right: 373 px wide, 160 px from the right edge.
- **Description and Where you'll sleep**
  - They come right under the summary, one after the other.
  - Both are 653 px wide and 160 px from the left edge, in line with the summary.
- **Inspiration:** 214 px under Where you'll sleep.
