# My website plan — Page 2: Detail

I make one file for each page. This file is only for the Detail page.

## 1. What page is this?

- Detail:
  - Address: /detail
  - Tab title: Airbnb | Find places to stay
  - For: showing one stay — its photos, rooms, host, highlights and price, with a button to reserve it
  - Main title (only one on the page): "Kalani’s guesthouse TAHAA" (in the Title)

## 2. Figma link

- Detail: https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/testing-Airbnb-UI-Kit--Community---%EB%B3%B5%EC%82%AC-?node-id=812-393&m=dev

## 3. What sections does the page have?

From top to bottom. "Part" is the name of the part in my Storybook. The words in quotes are the exact words on the page.

1. **Top bar**
   - Part: Navigation (the "site" look, with the small search bar)
   - Shows: the Airbnb logo, a small search bar "Anywhere" | "Any week" | "Add guests" with a round search button, the link "Become a Host", a language button, a menu button with a profile picture
2. **Title**
   - Part: ListingTitle
   - Shows: "Kalani’s guesthouse TAHAA", and on the right "공유하기" (share icon) and "저장" (heart icon)
3. **Photos**
   - Part: PhotoGallery
   - Shows: 1 big photo and 4 small photos with round outer corners, and a "사진 모두 보기" button on the last photo
4. **Summary** (left)
   - Part: ListingOverview
   - Shows: "Entire home in Gangneung-si, South Korea", "4 guests · 2 bedrooms · 2 beds · 2 bathrooms"; a box with laurels "Guest favourite", "One of the most loved homes on Airbnb, according to guests", "4.98" with stars, "487" "Reviews"; 4 highlights with pictures:
     - "Top 10% of homes" — "This home is highly ranked based on ratings, reviews and reliability."
     - "Near Anmok Beach" — "Anmok Beach is about an 8-min walk away, with the coast close by for a seaside outing."
     - "Roomy home with a full kitchen" — "A roomy private home with a full kitchen gives your group space to cook and settle in."
     - "Guests praise the cleanliness" — "Guests repeatedly praise the spotless rooms and thoughtful upkeep throughout the home."
   - then the host: picture, "Hosted by 준구", "Superhost · 6 years hosting", and "Learn more about summaries"
5. **Booking box** (right, next to the summary)
   - Part: Card (the "Reservation detail" look)
   - Shows: "$500" crossed out, "$440" "night", "4.99 · 337 reviews", boxes "CHECK-IN" "2/6/2023", "CHECKOUT" "2/11/2023", "GUESTS" "1 guest", a "Reserve" button, "You won't be charged yet", "500 x 5 nights" "$2,500", "Long stay discount" "-$300", "Cleaning fee" "$200", "Service fee" "$0", "Total before taxes" "$2,400"; under the box "리스팅 신고하기" with a flag icon
6. **Description**
   - Part: ListingDescription
   - Shows: "Some info has been automatically translated. Show original", then "Inbyulgram | @stay_2572", "This is' stay 2572 ', located on the way to Anmok Coffee Street.", "We will try to provide a complete 'rest' for our guests.", "Stay 2572 provides a 40-pyeong space used by the host as a private house. (This is for 4 people)", and a "Show more" button
7. **Where you'll sleep**
   - Part: SleepSection
   - Shows: the title "Where you'll sleep", 2 photos side by side — "Bedroom 1" "1 queen bed", "Bedroom 2" "1 queen bed"
8. **Inspiration**
   - Part: Inspiration
   - Shows: the same as on Home
9. **Footer**
   - Part: Footer
   - Shows: the same as on Home. Links: Support — "Help Center", "Get help with a safety issue", "AirCover", "Travel insurance", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighborhood concern". Hosting — "Airbnb your home", "Airbnb your hotel", "Airbnb your experience", "Airbnb your service", "AirCover for Hosts", "Earnings Protection", "Hosting resources", "Community Center", "Hosting responsibly", "Airbnb-friendly apartments", "Join a free hosting class", "Find a co‑host", "Refer a host". Airbnb — "2026 Summer Release", "Newsroom", "Careers", "Investors", "Gift cards", "Airbnb.org emergency stays"

## 4. Things the page shows

- The stay: Kalani’s guesthouse TAHAA · Entire home in Gangneung-si, South Korea
- Photos: detail-photo-1.png to detail-photo-5.png. What they show (for screen readers): photo 1 "Dining room", photos 2 to 5 "Kalani’s guesthouse TAHAA 이미지 2" to "Kalani’s guesthouse TAHAA 이미지 5"
- Highlight pictures: detail-highlight-top.png, detail-highlight-near.png, detail-highlight-kitchen.png, detail-highlight-cleanliness.png (in the same order as the highlights)
- Guest favourite laurels: detail-laurel-left.png and detail-laurel-right.png
- Host: picture detail-host-avatar.png with the Superhost badge detail-icon-superhost.svg
- Bedrooms: detail-bedroom-1.png ("Bedroom 1") and detail-bedroom-2.png ("Bedroom 2")
- Other icons for this page are in my-assets/images with names that start with detail- (for example detail-icon-share.svg, detail-icon-flag.svg)

## 5. What does each section do?

- Top bar, Airbnb logo: a link that goes to /
- Top bar, the small search bar and its button, "Become a Host", language button, menu button: nothing, just shows them
- Title, "공유하기" and "저장": nothing, just shows them
- Photos, "사진 모두 보기": nothing, just shows it
- Summary, "Learn more about summaries": nothing, just shows it
- Booking box, the CHECK-IN, CHECKOUT and GUESTS boxes: show the dates and guests. You can't change them
- Booking box, "Reserve": a link that goes to /checkout
- "리스팅 신고하기": nothing, just shows it
- Description, "Show original" and "Show more": nothing, just shows them
- Inspiration and Footer: the same as on Home

## 6. How is the page laid out?

- Screen size: made for a computer screen 1440px wide, the same as the Figma frame. Phone and tablet screens are not part of this page for now.
- The page never scrolls sideways.
- Top bar, Inspiration and Footer: full width. Their inside spacing comes from the parts.
- Title: 40px under the top bar, 80px from the left and right edges.
- Photos: 40px under the title, 80px from the left and right edges.
- Summary and booking box: 80px under the photos, side by side. The summary is on the left, 653px wide and 160px from the left edge. The booking box is on the right, 373px wide and 160px from the right edge.
- Description and Where you'll sleep: right under the summary, one after the other. Both are 653px wide and 160px from the left edge, the same line as the summary.
- Inspiration: 214px under Where you'll sleep.
