# My website plan

> **Note for the AI:** Text inside `<!-- -->` is only help and examples for the student. It is not part of this plan. Never use it as a fact. Use only what is written outside it.

<!--
HOW TO USE THIS FILE
1. Put this file in my-docs/inbox/.
2. Write your answers after the colons ( : ) and on the empty lines. One thing per line.
3. Not sure? Leave it empty. The AI will ask you.
4. In the Qwen chat, ask: "Organize my documents into specs."

ANOTHER WAY: ONE FILE PER PAGE
You can also make one file for each page, for example page-1-home.md and later page-2-stay.md.
- Write only the pages that are ready. Delete the empty blocks of the other pages
  (empty lines become questions, and the website waits until no questions are left).
  If the AI asks about other pages, choose "Leave it out for now".
- When the Figma of the next page is ready, copy this file, fill in only that page,
  put it in my-docs/inbox/ and ask in a new chat: "I changed my documents. Update my specs."
  The AI reads only the new or changed files.
- Then ask: "Make my website from my specs." The AI adds the new page and keeps the pages you already have.
- Use a new page name and address. Don't use one you already have.

The grey boxes like this one are help and examples. You can leave them. The AI doesn't use them.
The examples are a made-up site called "Weekend Stays", made with the class Figma file (Airbnb UI Kit).
Don't write real names, phone numbers or passwords. Your site can become public.
-->

## 1. What pages are you building?

<!--
Make 3–4 pages. Change "Page 1" to the page name. Need a 4th page? Copy the 4 lines of a page.

EXAMPLE
- Home
  - Address: /
  - Tab title: Weekend Stays
  - For: showing stays you can book this weekend
- Stay details
  - Address: /stay
  - Tab title: Stay details · Weekend Stays
  - For: showing one stay with its price and rating
-->

- Home:
  - Address: /
  - Tab title: Find places to stay
  - For: starting a trip — searching for a place, seeing my reservations and looking through stays in Seoul
- Detail:
  - Address: /detail
  - Tab title: Airbnb | Find places to stay
  - For: showing one stay — its photos, rooms, host, highlights and price, with a button to reserve it
- Checkout:
  - Address: /checkout
  - Tab title: Confirm and pay
  - For: confirming the reservation — choosing when to pay and checking the stay, dates, guests and price

## 2. Do you have a Figma link for each page?

<!--
Paste the link to the WHOLE PAGE FRAME, not to one part.
In Figma: select the page frame → right-click → Copy/Paste as → Copy link to selection.
No link for a page? Write: none

EXAMPLE
- Home: https://www.figma.com/design/XXXX/Airbnb-UI-Kit?node-id=000-000
- Stay details: https://www.figma.com/design/XXXX/Airbnb-UI-Kit?node-id=000-000
- About: none
-->

- Home: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-2752&m=dev
- Detail: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-393&m=dev
- Checkout: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-1056&m=dev

## 3. What sections does each page have?

<!--
Write the sections from top to bottom. Put the EXACT WORDS you want on the page in quotes.

EXAMPLE
Home
1. Header: logo text "Weekend Stays", links "Home" and "About"
2. Hero: big title "Find a quiet weekend", small text "Small stays, two hours from the city.", a search box, a "Dates" button
3. Stay list: 4 stay cards (picture, place, dates, price, rating, heart)
4. Footer: "© 2026 Weekend Stays"
-->

**Home**

1. Navigation: Airbnb logo (picture logo.png), link "Become a Host", a language button (globe icon), a menu button with a profile picture
2. Hero: background picture bg.png, big title "Start Your Trip with Airbnb", 5 tabs with icons "All", "Homes", "Hotels", "Experience", "Services", a search bar with 4 boxes — "Where" ("Search destinations"), "Check-in" ("Add dates"), "Check-out" ("Add dates"), "Who" ("Add guests") — and a round search button
3. Reservations: a row of 6 cards that scrolls sideways. Each card: "Your reservation", a small picture, "CANCELED", "tiny house, tiny farm", "Reservation code: XMPQKAPZ6D"
4. Stay in Seoul: title "Stay in Seoul", 4 chips "Hotels", "Motel", "Guesthouse", "Resort", then 12 stay cards in rows of 4 (photos, heart, photo dots, place, area, dates, price, rating)
5. Inspiration: title "Inspiration for future getaways", 8 tabs "Popular", "Arts & culture", "Beach", "Mountains", "Outdoors", "Things to do", "Travel tips & inspiration", "Airbnb-friendly apartments", a list of 18 places (name and kind of rental), and "Show more"
6. Footer: 3 columns of links — "Support", "Hosting", "Airbnb" (the words are in the list under the Detail page) — then "© 2026 Airbnb, Inc. · Privacy · Terms · Your Privacy Choices", "English (US)", "₩ KRW" and Facebook, X and Instagram icons

**Detail**

1. Navigation: Airbnb logo, a small search bar "Anywhere" | "Any week" | "Add guests" with a round search button, link "Become a Host", a language button, a menu button with a profile picture
2. Title: "Kalani’s guesthouse TAHAA", on the right "공유하기" (share icon) and "저장" (heart icon)
3. Photos: 1 big photo and 4 small photos with round outer corners, a "사진 모두 보기" button on the last photo
4. Summary (left): "Entire home in Gangneung-si, South Korea", "4 guests · 2 bedrooms · 2 beds · 2 bathrooms"; a box with laurels "Guest favourite", "One of the most loved homes on Airbnb, according to guests", "4.98" with stars, "487" "Reviews"; 4 highlights with icons:
   - "Top 10% of homes" — "This home is highly ranked based on ratings, reviews and reliability."
   - "Near Anmok Beach" — "Anmok Beach is about an 8-min walk away, with the coast close by for a seaside outing."
   - "Roomy home with a full kitchen" — "A roomy private home with a full kitchen gives your group space to cook and settle in."
   - "Guests praise the cleanliness" — "Guests repeatedly praise the spotless rooms and thoughtful upkeep throughout the home."
   - then the host: picture, "Hosted by 준구", "Superhost · 6 years hosting", and "Learn more about summaries"
5. Booking box (right, next to the summary): "$500" crossed out, "$440" "night", "4.99 · 337 reviews", boxes "CHECK-IN" "2/6/2023", "CHECKOUT" "2/11/2023", "GUESTS" "1 guest", a "Reserve" button, "You won't be charged yet", "500 x 5 nights" "$2,500", "Long stay discount" "-$300", "Cleaning fee" "$200", "Service fee" "$0", "Total before taxes" "$2,400"; under the box "리스팅 신고하기" with a flag icon
6. Description: "Some info has been automatically translated. Show original", then "Inbyulgram | @stay_2572", "This is' stay 2572 ', located on the way to Anmok Coffee Street.", "We will try to provide a complete 'rest' for our guests.", "Stay 2572 provides a 40-pyeong space used by the host as a private house. (This is for 4 people)", and a "Show more" button
7. Where you'll sleep: title "Where you'll sleep", 2 photos side by side — "Bedroom 1" "1 queen bed", "Bedroom 2" "1 queen bed"
8. Inspiration: the same as on Home
9. Footer: the same as on Home. Links: Support — "Help Center", "Get help with a safety issue", "AirCover", "Travel insurance", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighborhood concern". Hosting — "Airbnb your home", "Airbnb your hotel", "Airbnb your experience", "Airbnb your service", "AirCover for Hosts", "Earnings Protection", "Hosting resources", "Community Center", "Hosting responsibly", "Airbnb-friendly apartments", "Join a free hosting class", "Find a co‑host", "Refer a host". Airbnb — "2026 Summer Release", "Newsroom", "Careers", "Investors", "Gift cards", "Airbnb.org emergency stays"

**Checkout**

1. Navigation: Airbnb logo, link "Become a Host", a language button, a menu button with a profile picture (no search bar)
2. Title: a back arrow and "Confirm and pay"
3. Steps (left):
   - "1. Choose when to pay" with 3 choices, each with a round radio on the right:
     - "Pay £340.91 now"
     - "Pay £0 now" — "£340.91 charged on 13 Jan 2027. No extra fees. More info"
     - "Pay in 3 payments with Klarna" — "3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status. More info"
     - a "Next" button
   - "2. Add a payment method" (closed, title only)
   - "3. Review your reservation" (closed, title only)
4. Reservation summary (right): a stay picture, "STAY 2572", "4.98 (487)", "Guest favourite"; "Free cancellation" — "Cancel before 21 January for a full refund. Full policy"; "Dates" "22–24 Jan 2027" "Change"; "Guests" "1 adult" "Change"; "Price details" "2 nights x £170.46" "£340.91"; "Total GBP" "£340.91"; "Price breakdown"; then a box with a diamond icon "Rare find! This place is usually booked"
5. Inspiration: the same as on Home
6. Footer: the same as on Home

**Things the pages show** (stays, menu items, products…)

<!--
Write each item on one line. The AI uses only these and never makes up items.
Pictures go in my-assets/images with exactly the names you write. A missing picture → the item is made without it.

EXAMPLE
- Gangneung, Korea · Nov 28–30 · $89 night · rating 4.91 · picture stay-1.jpg
- Jeonju, Korea · Dec 5–7 · $64 night · rating 4.78 · picture stay-2.jpg
-->

- Home reservations (6 cards, the same words): tiny house, tiny farm · CANCELED · Reservation code: XMPQKAPZ6D · pictures reservation-1.jpg to reservation-6.jpg (one per card)
- Home stays (12 cards, the same words): Groveland, California · Yosemite National Park · Oct 23 - 28 · $289 night · rating 4.91 · 5 photos per card: card 1 uses stay-01-1.jpg to stay-01-5.jpg, card 2 uses stay-02-1.jpg to stay-02-5.jpg, … card 12 uses stay-12-1.jpg to stay-12-5.jpg
- Inspiration places: Washington · Apartment rentals / West Palm Beach · Cottage rentals / Savannah · Villa rentals / Manhattan · Vacation rentals / Kansas City · Apartment rentals / Destin · House rentals / Amsterdam · Cabin rentals / St. Petersburg · Vacation rentals / Las Vegas · House rentals / Cartagena · Villa rentals / Milan · Condo rentals / Pocono Mountains · Monthly Rentals / Sacramento · Apartment rentals / Jersey City · House rentals / Broken Bow · Cottage rentals / Osaka · House rentals / Sarasota · House rentals
- Detail stay: Kalani’s guesthouse TAHAA · Entire home in Gangneung-si, South Korea · photos detail-photo-1.png to detail-photo-5.png · bedroom photos detail-bedroom-1.png and detail-bedroom-2.png · host picture detail-host-avatar.png
- Checkout stay: STAY 2572 · picture checkout-stay-thumb.png
- Icons for the Detail and Checkout pages are in my-assets/images with names that start with detail- and checkout- (for example detail-icon-share.svg, checkout-icon-back.svg)

## 4. What does each section do?

<!--
For each thing people can click or type in, write what happens: "section, thing: what it does".
"Nothing, just shows it" is a fine answer. Going to another page is a LINK, not a button.
A demo action only shows a message. Nothing is really booked or sent.

EXAMPLE
Home
- Header, "About" link: goes to /about
- Hero, search box: shows only the cards whose place has the typed word. If nothing matches, shows "No stays found."
- Hero, "Dates" button: (left empty on purpose → the AI asks about it)
- Stay list, a stay card: goes to /stay
- Stay list, heart: turns full or empty when clicked. Not saved after the page reloads.
Stay details
- Book, "Reserve" button: shows "Thanks! This is a demo — no booking was made."
-->

**Home**

- Navigation, Airbnb logo: a link that goes to / (this page)
- Navigation, "Become a Host", language button, menu button: nothing, just shows it
- Hero, the 5 tabs ("All" … "Services"): clicking a tab makes it the chosen one (a pink ring around its icon and bold words). Only one is chosen at a time. "All" is chosen at first. The rest of the page doesn't change
- Hero, the 4 search boxes: you can type in them. Nothing else happens
- Hero, search button: nothing, just shows it
- Reservations, cards: nothing, just shows them. The row scrolls sideways
- Stay in Seoul, the 4 chips: clicking a chip makes it the chosen one (black with white words). Only one at a time. "Hotels" is chosen at first. The cards don't change
- Stay in Seoul, a stay card: the photos change by themselves every 3–4 seconds, from the 1st to the 5th and back to the 1st. The white dot shows which photo is on screen. The photos stop changing while the pointer is on the card. Clicking the card goes to /detail
- Stay in Seoul, heart: nothing, just shows it
- Inspiration, the 8 tabs: clicking a tab makes it the chosen one (a line under it). Only one at a time. "Popular" is chosen at first. The list of places doesn't change
- Inspiration, "Show more": nothing, just shows it
- Footer, all links, "English (US)", "₩ KRW" and the social icons: nothing, just shows them

**Detail**

- Navigation, Airbnb logo: a link that goes to /
- Navigation, the small search bar and its button, "Become a Host", language button, menu button: nothing, just shows them
- Title, "공유하기" and "저장": nothing, just shows them
- Photos, "사진 모두 보기": nothing, just shows it
- Summary, "Learn more about summaries": nothing, just shows it
- Booking box, the CHECK-IN, CHECKOUT and GUESTS boxes: show the dates and guests. You can't change them
- Booking box, "Reserve": a link that goes to /checkout
- "리스팅 신고하기": nothing, just shows it
- Description, "Show original" and "Show more": nothing, just shows them
- Inspiration and Footer: the same as on Home

**Checkout**

- Navigation, Airbnb logo: a link that goes to /
- Title, back arrow: a link that goes back to /detail
- "Choose when to pay", the 3 choices: clicking a choice (its words or its radio) chooses it. Only one at a time. Nothing is chosen at first. The chosen radio turns black with a white dot. Each radio also shows its hover and keyboard-focus look from Figma
- "More info" links, "Next", "Full policy", the 2 "Change" buttons, "GBP", "Price breakdown": nothing, just shows them
- "2. Add a payment method" and "3. Review your reservation": nothing, they stay closed
- Inspiration and Footer: the same as on Home

> **Rule for the AI:** If the Figma design shows something people can use (a button, link, icon, input box, tab, toggle…) and this part doesn't say what it does, **don't guess.** Write it as a question (`[NEEDS CLARIFICATION]`) and ask me with choices before building it. "Leave it out for now" is a fine choice.

## 5. Do you have design rules?

<!--
Write only the rules you care about. Leave the rest empty: the AI follows your Figma design.
The kit uses spaces in multiples of 4px (like 24px, 64px, 80px). If a value doesn't fit, the AI asks you first.

EXAMPLE
- Left and right page margin: 80px on a computer, 24px on a phone
- Space between sections: 64px
- Space between cards (gap): 24px
- Widest content: 1120px
- Cards in one row: 4 on a computer, 2 on a tablet, 1 on a phone
-->

- Left and right page margin: 80px on a computer
- Space between sections:
- Space between cards (gap):
- Widest content: the pages are designed for a 1440px computer screen. On a wider screen the content stays in the middle
- Cards in one row: Home stay cards — 4 on a computer
- Other rules: no sideways scrolling on the page (only the reservation row scrolls sideways). Each page matches its Figma frame: the same words, pictures, icons, sizes and spaces

> **Rule for the AI:** For every rule left empty here, use what the Figma design of that page shows: its layout, spacing and sizes, as in the Figma code (CSS). Don't make up values. If a page has no Figma link and the rule is empty, ask me. Colors and fonts always come from my Figma file through the kit's tokens.
