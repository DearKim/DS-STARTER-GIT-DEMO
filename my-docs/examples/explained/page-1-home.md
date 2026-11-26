# My website plan — Page 1: Home

This is my plan for the Home page of my practice website. I made one file for each page.

How to read this file:

- Lines that start with **Why** or **Where to find it** explain what the part is for. They are help, not page content.
- Everything else is my answer.
- Words in "quotes" are the exact words that must be on the page.

## 1. What page is this?

> **Why:** The AI needs the page's name, where it lives on the site and what it is for. If I don't write these, the AI has to guess.

- **Page name:** Home
- **Address:** `/`
  - The address is the part after the site name in the browser's address bar.
  - `/` alone means the first page people see when they open the site.
- **Tab title:** "Find places to stay"
  - These are the words on the browser tab at the top of the window.
- **What the page is for:** People start a trip here. They see their reservations and look through places to stay in Seoul.
- **Main title:** "Start Your Trip with Airbnb"
  - It is the biggest line of words on the page. It is in the Hero.
  - A page has only one main title. Screen readers (apps that read the screen out loud) use it to tell people what the page is about.

## 2. Figma link

> **Why:** The AI opens this Figma frame to see how the page looks.
>
> **Where to find it:** In Figma, click the name of the whole page frame, not one small part. Right-click → **Copy/Paste as** → **Copy link to selection**.

- Home: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-2752&m=dev

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
  - the Airbnb logo (picture `logo.png`)
  - a "Become a Host" button
  - a round button with a globe icon (for the language)
  - a rounded button with a menu icon and a profile picture
- There is **no** search bar in the top bar on this page. The big search bar is in the Hero, right below it.

### 2) Hero

- **Where:** right under the top bar, across the whole width. It is the big picture area.
- **Part:** Hero → "Home"
- **Shows:**
  - the background picture `bg.png`, filling the whole area
  - the big title "Start Your Trip with Airbnb"
  - 5 tabs in a row. Each tab has an icon on top and a word under it: "All", "Homes", "Hotels", "Experience", "Services"
  - a search bar with 4 boxes. Each box has a small label and hint words:
    - "Where" — "Search destinations"
    - "Check-in" — "Add dates"
    - "Check-out" — "Add dates"
    - "Who" — "Add guests"
  - a round search button at the right end of the search bar

### 3) Reservations

- **Where:** under the Hero.
- **Part:** Callout → "Cancelation With Photo" (6 of them, side by side)
- **Shows on every card** (all 6 cards have the same words):
  - "Your reservation"
  - a small picture
  - "CANCELED"
  - "tiny house, tiny farm"
  - "Reservation code: XMPQKAPZ6D"
- The 6 cards don't fit on the screen at once, so the row scrolls sideways.

### 4) Stay in Seoul

- **Where:** under Reservations.
- **Parts:**
  - Text → "Heading" for the title
  - Chip → "Home Filters" for the 4 chips
  - ListingCard → "Photos" for the 12 stay cards
- **Shows:**
  - the title "Stay in Seoul"
  - 4 chips (small rounded buttons) in a row: "Hotels", "Motel", "Guesthouse", "Resort"
  - 12 stay cards, 4 in each row, so 3 rows. Every card has:
    - photos that change (5 photos per card), with small dots that show which photo is on screen
    - a heart button
    - the place "Groveland, California"
    - the area "Yosemite National Park"
    - the dates "Oct 23 - 28"
    - the price "$289" and the word "night"
    - the rating "4.91"

### 5) Inspiration

- **Where:** under Stay in Seoul, across the whole width.
- **Part:** Inspiration → "Default"
- **Shows:**
  - the title "Inspiration for future getaways"
  - 8 tabs in a row: "Popular", "Arts & culture", "Beach", "Mountains", "Outdoors", "Things to do", "Travel tips & inspiration", "Airbnb-friendly apartments"
  - a list of 17 places. Each place has its name and, under it, the kind of rental (for example "Washington" and "Apartment rentals"). The full list is in section 4.
  - "Show more" in the last spot, right after the 17th place

### 6) Footer

- **Where:** at the very bottom of the page, across the whole width.
- **Part:** Footer → "Default"
- **Shows:**
  - 3 columns of links. The column titles are "Support", "Hosting" and "Airbnb". The links are in section 4.
  - a bottom line: "© 2026 Airbnb, Inc. · Privacy · Terms · Your Privacy Choices" with a small privacy icon
  - "English (US)" and "₩ KRW"
  - the Facebook, X and Instagram icons

## 4. Things the page shows

> **Why:** Some sections show the same kind of thing many times, like cards and places. I write every item, so the AI never makes up an item.
>
> **Pictures:** All my pictures are in the `my-assets/images` folder. I write the exact file name. If a file is missing, the AI makes the item without a picture. It never makes up a picture.
>
> **Picture descriptions:** A screen reader says these words for people who can't see the picture. If a picture is only decoration, I write "decoration — no words", and the screen reader skips it.

- **Reservations (6 cards)**
  - Words: the same on every card (see section 3).
  - Pictures: `reservation-1.jpg` for card 1, `reservation-2.jpg` for card 2, and so on up to `reservation-6.jpg` for card 6.
  - Picture description: decoration — no words.
- **Stays (12 cards)**
  - Words: the same on every card (see section 3).
  - Photos: 5 per card. Card 1 uses `stay-01-1.jpg` to `stay-01-5.jpg`. Card 2 uses `stay-02-1.jpg` to `stay-02-5.jpg`. And so on, up to card 12: `stay-12-1.jpg` to `stay-12-5.jpg`.
  - Photo description: "Listing photo" (for the photo that is on screen).
- **Hero**
  - Background picture: `bg.png` — decoration, no words.
  - Tab icons, in the same order as the tabs: `icon-all.png`, `icon-homes.png`, `icon-hotels.png`, `icon-experiences.png`, `icon-services.png` — decoration, no words (the word under each icon says what it is).
- **Inspiration places (17), in this order**
  - Washington · Apartment rentals
  - West Palm Beach · Cottage rentals
  - Savannah · Villa rentals
  - Manhattan · Vacation rentals
  - Kansas City · Apartment rentals
  - Destin · House rentals
  - Amsterdam · Cabin rentals
  - St. Petersburg · Vacation rentals
  - Las Vegas · House rentals
  - Cartagena · Villa rentals
  - Milan · Condo rentals
  - Pocono Mountains · Monthly Rentals
  - Sacramento · Apartment rentals
  - Jersey City · House rentals
  - Broken Bow · Cottage rentals
  - Osaka · House rentals
  - Sarasota · House rentals
- **Footer links**
  - Support: "Help Center", "Get help with a safety issue", "AirCover", "Travel insurance", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighborhood concern"
  - Hosting: "Airbnb your home", "Airbnb your hotel", "Airbnb your experience", "Airbnb your service", "AirCover for Hosts", "Earnings Protection", "Hosting resources", "Community Center", "Hosting responsibly", "Airbnb-friendly apartments", "Join a free hosting class", "Find a co‑host", "Refer a host"
  - Airbnb: "2026 Summer Release", "Newsroom", "Careers", "Investors", "Gift cards", "Airbnb.org emergency stays"

## 5. What does each section do?

> **Why:** For everything people can click or type in, I write what happens. If nothing happens, I write "nothing happens". Then the AI doesn't add surprises.
>
> **Links and buttons:** A **link** takes you to another page. A **button** does something on this page. Going to another page is always a link, even when it looks like a button.
>
> **Keyboard:** Some people don't use a mouse. They press **Tab** to move to the next link or button, and **Enter** (or **Space** for a button) to press it. Everything I can click must also work this way.

- **Top bar**
  - Airbnb logo: a link that goes to `/` (this page).
  - "Become a Host", the globe button and the menu button: nothing happens. They are only shown.
- **Hero**
  - The 5 tabs: clicking a tab chooses it. The chosen tab has a pink ring around its icon and bold words. Only one tab is chosen at a time. "All" is chosen when the page opens. Choosing a tab does not change the rest of the page.
  - The 4 search boxes: you can click in a box and type. Nothing else happens. No search is done.
  - The search button: nothing happens.
- **Reservations**
  - The cards: nothing happens when you click them.
  - The row: you can scroll it sideways with a trackpad. When you stop, the row moves a little so a card lines up with the left side.
  - With the keyboard: press Tab until the row is selected, then use the arrow keys to scroll it.
- **Stay in Seoul**
  - The 4 chips: clicking a chip chooses it. The chosen chip is black with white words. Only one chip is chosen at a time. "Hotels" is chosen when the page opens. The cards don't change.
  - The stay cards:
    - The photos change by themselves every 3 to 4 seconds: 1st, 2nd, 3rd, 4th, 5th, then back to the 1st.
    - The cards don't all change at the same moment.
    - The white dot shows which photo is on screen.
    - While the mouse pointer is on a card, its photos stop changing.
    - Clicking a card goes to `/detail`.
  - The heart: nothing happens.
- **Inspiration**
  - The 8 tabs: clicking a tab chooses it. The chosen tab has a line under it. Only one tab is chosen at a time. "Popular" is chosen when the page opens. The list of places doesn't change.
  - "Show more": nothing happens.
- **Footer**
  - All links, "English (US)", "₩ KRW" and the social icons: nothing happens. They are only shown.

## 6. How is the page laid out?

> **Why:** This tells the AI where each section sits and how much space is around it.
>
> **px:** Figma measures sizes in px. 1 px is one tiny dot on the screen. To read a number in Figma, click a part. Figma shows its size and the space around it.
>
> **Full width:** the section goes from the left edge of the screen to the right edge.

- **Screen size:** the page is made for a computer screen 1440 px wide, the same width as the Figma frame. Phone and tablet screens are not part of this page for now.
- **No sideways scrolling:** the whole page never scrolls sideways. Only the Reservations row does.
- **Full-width sections:** Top bar, Hero, Inspiration and Footer. The space inside them comes from the parts.
- **Reservations**
  - 80 px of space above the row, and 80 px on the left and right.
  - Each card is 361 px wide.
  - 23 px of space between cards.
  - The scroll bar is hidden.
- **Stay in Seoul**
  - 80 px of space on all four sides of the section.
  - The chips are 29 px under the title, with 20 px between chips.
  - The cards start 20 px under the chips.
  - 4 cards in each row. They share the width equally.
  - 22 px between cards side by side, and 40 px between rows.
