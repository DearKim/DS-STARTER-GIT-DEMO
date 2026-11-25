---
kind: page
site: Airbnb
revision: 15
status: approved
source_ref: my-docs/specs/plan.md; my-website/figma/Home.png; my-website/figma/Home.layers.xml
facts_complete: true
open_questions: 0
---

# Website assembly plan

```page-spec
{
  "title": "Airbnb | Find places to stay",
  "locale": "en",
  "catalog": {
    "Search": {
      "codeHash": "3585ebc4d94cf7b76f9482c4572b3b841e078b7f97db9d48947d18b17240eb39",
      "cssHash": "5310513f302f1713ef92aef04c8ca68982d09bd07d96bf9a38725cf8ec05da77",
      "dependencyHash": "0778067baa81a2b6b636b15bcb6f7db028bd535a783ef1ededc6fbf5c9485e3a",
      "tokensHash": "02b2c04c1a933c5e61a5976de18d37346e2377d100a81baec179aa48d58af2af"
    },
    "Card": {
      "codeHash": "b6afb317afa6409944b9d912c0c8bd012619c0225ba66d04d2605593e1223676",
      "cssHash": "4622b6439ee7ace70d3b7e59094db2302975d8bf1de951f810a8c22feabf1c36",
      "dependencyHash": "46420e41e0ef48b3a83d591c9b1237dea688ebde6250f08e1207346f503425de",
      "tokensHash": "02b2c04c1a933c5e61a5976de18d37346e2377d100a81baec179aa48d58af2af"
    },
    "Link": {
      "codeHash": "9f173f62eeda46e00879a04169e253ca60ed733bdb9a40abd07a84319c6b7206",
      "cssHash": "b366b4d82603603d34e33c7733be2185ef0f163c1b6da7f22616a14a7a9b48bc",
      "dependencyHash": "dcda0b203f9ec5f15cd91deb26aba4eb696a7919d711208c24901dd43cf83894",
      "tokensHash": "02b2c04c1a933c5e61a5976de18d37346e2377d100a81baec179aa48d58af2af"
    },
    "Text": {
      "codeHash": "6a4988876058e71f062874b336212e9d0be9833fcec2949a77409f5818013fd7",
      "cssHash": "3324044cee78fc329d9cb2df9e9a6eeb153eef8c25f168a79ff797f875a43b5d",
      "dependencyHash": "46420e41e0ef48b3a83d591c9b1237dea688ebde6250f08e1207346f503425de",
      "tokensHash": "02b2c04c1a933c5e61a5976de18d37346e2377d100a81baec179aa48d58af2af"
    },
    "Tabs": {
      "codeHash": "17af55844dab84a292b5a4b3ea3587668bca8655d20a3e1cb3856d96a4963ba4",
      "cssHash": "0a09328c73b881c3275b61a03e9b0608101c65241adda164c5ffa3901f110398",
      "dependencyHash": "dcda0b203f9ec5f15cd91deb26aba4eb696a7919d711208c24901dd43cf83894",
      "tokensHash": "02b2c04c1a933c5e61a5976de18d37346e2377d100a81baec179aa48d58af2af"
    }
  },
  "pages": [
    {
      "name": "Home",
      "path": "/",
      "title": "Find places to stay",
      "evidence": "Figma Home frame (389-2752)",
      "responsive": "1440px source viewport",
      "sections": [
        {
          "id": "navigation",
          "items": [
            {
              "id": "logo",
              "component": "Text",
              "props": {"as": "h1", "variant": "title"},
              "children": ["airbnb"],
              "states": ["default"]
            },
            {
              "id": "become-host-link",
              "component": "Link",
              "props": {},
              "children": ["Become a host"],
              "states": ["default"]
            }
          ]
        },
        {
          "id": "hero",
          "items": [
            {
              "id": "hero-heading",
              "component": "Text",
              "props": {"as": "h2", "variant": "title"},
              "children": ["Start Your Trip with Airbnb"],
              "states": ["default"]
            },
            {
              "id": "search-bar",
              "component": "Search",
              "props": {"size": "lg", "label": "Search destinations"},
              "states": ["default"]
            }
          ]
        },
        {
          "id": "reservations",
          "items": [
            {
              "id": "reservation-card-1",
              "component": "Card",
              "props": {},
              "children": [{"id": "reservation-link-1", "component": "Link", "props": {}, "children": ["OAK24LUX"], "states": ["default"]}],
              "states": ["default"]
            }
          ]
        },
        {
          "id": "featured-listings",
          "items": [
            {
              "id": "listings-heading",
              "component": "Text",
              "props": {"as": "h2"},
              "children": ["Stay in Seoul"],
              "states": ["default"]
            },
            {
              "id": "category-tabs",
              "component": "Tabs",
              "props": {
                "variant": "contained",
                "size": "sm",
                "items": [
                  {"id": "stays", "label": "Stays", "content": ""},
                  {"id": "wild", "label": "Wild", "content": ""},
                  {"id": "beachfront", "label": "Beachfront", "content": ""},
                  {"id": "resort", "label": "Resort", "content": ""}
                ]
              },
              "states": ["default"]
            },
            {
              "id": "listing-card-1",
              "component": "Card",
              "props": {},
              "children": [{"id": "listing-link-1", "component": "Link", "props": {}, "children": ["Greenland, California"], "states": ["default"]}],
              "states": ["default"]
            }
          ]
        },
        {
          "id": "inspiration",
          "items": [
            {
              "id": "inspiration-heading",
              "component": "Text",
              "props": {"as": "h2"},
              "children": ["Inspiration for future getaways"],
              "states": ["default"]
            },
            {
              "id": "inspiration-tabs",
              "component": "Tabs",
              "props": {
                "variant": "line",
                "items": [
                  {"id": "popular", "label": "Popular", "content": ""},
                  {"id": "arts", "label": "Arts & culture", "content": ""},
                  {"id": "beach", "label": "Beach", "content": ""},
                  {"id": "mountains", "label": "Mountains", "content": ""}
                ]
              },
              "states": ["default"]
            },
            {
              "id": "dest-link-1",
              "component": "Link",
              "props": {},
              "children": ["Washington"],
              "states": ["default"]
            }
          ]
        },
        {
          "id": "footer",
          "items": [
            {
              "id": "support-heading",
              "component": "Text",
              "props": {"as": "h3"},
              "children": ["Support"],
              "states": ["default"]
            },
            {
              "id": "hosting-heading",
              "component": "Text",
              "props": {"as": "h3"},
              "children": ["Hosting"],
              "states": ["default"]
            },
            {
              "id": "about-heading",
              "component": "Text",
              "props": {"as": "h3"},
              "children": ["About"],
              "states": ["default"]
            }
          ]
        }
      ],
      "media": []
    },
    {
      "name": "Detail",
      "path": "/detail",
      "title": "서면/전포역5분/최대8인/프라이빗독채/계단없음/조용한숙소/사잇길",
      "evidence": "Figma Detail frame (812-393)",
      "responsive": "1440px source viewport",
      "sections": [
        {
          "id": "gallery",
          "items": [
            {
              "id": "photo-main",
              "image": "detail-photo-1",
              "alt": "Dining room"
            }
          ]
        }
      ]
    }
  ]
}
```

| Topic | Sourced facts and evidence | AI interpretation | Student decision/correction |
|---|---|---|---|
| Complete screens, sections, copy, data and optional matching images | Figma Home frame | Used starter parts: Text, Link, Search, Card, Tabs | Confirmed via chat |
| Parts, public props, eligible scope and versions | All parts are starter, unchanged | Used Search (lg size), Tabs (line/contained variants), Card, Link, Text | Confirmed via chat |
| Routes, events, and real/demo outcomes | Home page at / | Demo data only | Confirmed via chat |
| Layout tokens, viewports and responsive behavior | 1440px source viewport | Single-column layout | Confirmed via chat |

| Question ID | Decision needed, choices and impact | Student answer | Status |
|---|---|---|---|
| Q-01 | Navigation icons not in catalog | Use custom SVG after generation | answered |
