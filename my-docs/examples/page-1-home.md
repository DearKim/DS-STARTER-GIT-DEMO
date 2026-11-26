# My website plan — Page 1: Home

I make one file for each page. This file is only for the Home page.

## 1. What page is this?

- Home:
  - Address: /
  - Tab title: Find places to stay
  - For: starting a trip — seeing my reservations and looking through stays in Seoul
  - Main title (only one on the page): "Start Your Trip with Airbnb" (in the Hero)

## 2. Figma link

- Home: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=389-2752&m=dev

## 3. What sections does the page have?

From top to bottom. "Part" is the name of the part in my Storybook. The words in quotes are the exact words on the page.

1. **Top bar**
   - Part: Navigation (the "site" look, without the search bar)
   - Shows: the Airbnb logo (picture logo.png), the link "Become a Host", a language button (globe icon), a menu button with a profile picture
2. **Hero**
   - Part: Hero
   - Shows: the background picture bg.png, the big title "Start Your Trip with Airbnb", 5 tabs with icons "All", "Homes", "Hotels", "Experience", "Services", and a search bar with 4 boxes — "Where" ("Search destinations"), "Check-in" ("Add dates"), "Check-out" ("Add dates"), "Who" ("Add guests") — and a round search button
3. **Reservations**
   - Part: Callout (the "Cancelation" look), 6 of them
   - Shows on each card: "Your reservation", a small picture, "CANCELED", "tiny house, tiny farm", "Reservation code: XMPQKAPZ6D"
4. **Stay in Seoul**
   - Parts: Text (the "Heading" look) for the title, 4 Chips, 12 ListingCards
   - Shows: the title "Stay in Seoul", the chips "Hotels", "Motel", "Guesthouse", "Resort", then 12 stay cards (photos, heart, photo dots, place, area, dates, price, rating)
5. **Inspiration**
   - Part: Inspiration
   - Shows: the title "Inspiration for future getaways", 8 tabs "Popular", "Arts & culture", "Beach", "Mountains", "Outdoors", "Things to do", "Travel tips & inspiration", "Airbnb-friendly apartments", a list of 17 places (name and kind of rental), and "Show more" in the last spot
6. **Footer**
   - Part: Footer
   - Shows: 3 columns of links — "Support", "Hosting", "Airbnb" — then "© 2026 Airbnb, Inc. · Privacy · Terms · Your Privacy Choices", "English (US)", "₩ KRW" and the Facebook, X and Instagram icons

## 4. Things the page shows

- Reservations (6 cards, the same words): tiny house, tiny farm · CANCELED · Reservation code: XMPQKAPZ6D · pictures reservation-1.jpg to reservation-6.jpg (one per card)
- Stays (12 cards, the same words): Groveland, California · Yosemite National Park · Oct 23 - 28 · $289 night · rating 4.91 · 5 photos per card: card 1 uses stay-01-1.jpg to stay-01-5.jpg, card 2 uses stay-02-1.jpg to stay-02-5.jpg, … card 12 uses stay-12-1.jpg to stay-12-5.jpg
- Tab icons in the Hero: icon-all.png, icon-homes.png, icon-hotels.png, icon-experiences.png, icon-services.png
- Inspiration places: Washington · Apartment rentals / West Palm Beach · Cottage rentals / Savannah · Villa rentals / Manhattan · Vacation rentals / Kansas City · Apartment rentals / Destin · House rentals / Amsterdam · Cabin rentals / St. Petersburg · Vacation rentals / Las Vegas · House rentals / Cartagena · Villa rentals / Milan · Condo rentals / Pocono Mountains · Monthly Rentals / Sacramento · Apartment rentals / Jersey City · House rentals / Broken Bow · Cottage rentals / Osaka · House rentals / Sarasota · House rentals

## 5. What does each section do?

- Top bar, Airbnb logo: a link that goes to / (this page)
- Top bar, "Become a Host", language button, menu button: nothing, just shows them
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

## 6. How is the page laid out?

- Screen size: made for a computer screen 1440px wide, the same as the Figma frame. Phone and tablet screens are not part of this page for now.
- The page never scrolls sideways. Only the Reservations row does.
- Top bar, Hero, Inspiration and Footer: full width. Their inside spacing comes from the parts.
- Reservations: 80px of space above it and on the left and right. Each card is 361px wide, with 23px between cards. The row scrolls sideways and stops at the edge of a card. No scroll bar is shown.
- Stay in Seoul: 80px of space all around. The chips are 29px under the title, 20px apart. The cards start 20px under the chips: 4 in a row, 22px apart side to side and 40px apart top to bottom.
