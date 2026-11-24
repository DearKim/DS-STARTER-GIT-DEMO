---
kind: page
site: GitDemo
revision: 1
status: approved
source_ref: Git demo fixture for the Session 3 recording (made by the instructor team, not a student project)
facts_complete: true
open_questions: 0
---

# Website assembly plan — Git demo fixture

A small 3-page site used only to record the Git, GitHub and Vercel steps. It uses unchanged starter parts (Text, Link).

```page-spec
{
  "title": "Git Demo",
  "locale": "en",
  "catalog": {
    "Text": {
      "codeHash": "6a4988876058e71f062874b336212e9d0be9833fcec2949a77409f5818013fd7",
      "cssHash": "3324044cee78fc329d9cb2df9e9a6eeb153eef8c25f168a79ff797f875a43b5d",
      "dependencyHash": "46420e41e0ef48b3a83d591c9b1237dea688ebde6250f08e1207346f503425de",
      "tokensHash": "02b2c04c1a933c5e61a5976de18d37346e2377d100a81baec179aa48d58af2af"
    },
    "Link": {
      "codeHash": "9f173f62eeda46e00879a04169e253ca60ed733bdb9a40abd07a84319c6b7206",
      "cssHash": "b366b4d82603603d34e33c7733be2185ef0f163c1b6da7f22616a14a7a9b48bc",
      "dependencyHash": "dcda0b203f9ec5f15cd91deb26aba4eb696a7919d711208c24901dd43cf83894",
      "tokensHash": "02b2c04c1a933c5e61a5976de18d37346e2377d100a81baec179aa48d58af2af"
    }
  },
  "pages": [
    {
      "name": "Home",
      "path": "/",
      "title": "Git Demo",
      "evidence": "Git demo fixture for the Session 3 recording. Not a student project.",
      "responsive": "Same layout on every screen size.",
      "layout": {
        "root": {
          "display": "grid",
          "gap": "var(--spacing)"
        }
      },
      "media": [],
      "sections": [
        {
          "id": "intro",
          "items": [
            {
              "id": "title",
              "component": "Text",
              "props": {
                "as": "h1",
                "variant": "title"
              },
              "children": [
                "Git demo site"
              ],
              "states": [
                "default"
              ]
            },
            {
              "id": "lead",
              "component": "Text",
              "props": {
                "as": "p"
              },
              "children": [
                "This site shows each step from a commit to a live address."
              ],
              "states": [
                "default"
              ]
            },
            {
              "id": "to-about",
              "component": "Link",
              "props": {
                "href": "/about"
              },
              "children": [
                "About this demo"
              ],
              "states": [
                "default"
              ]
            },
            {
              "id": "to-contact",
              "component": "Link",
              "props": {
                "href": "/contact"
              },
              "children": [
                "Contact"
              ],
              "states": [
                "default"
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "About",
      "path": "/about",
      "title": "About \u00b7 Git Demo",
      "evidence": "Git demo fixture for the Session 3 recording. Not a student project.",
      "responsive": "Same layout on every screen size.",
      "layout": {
        "root": {
          "display": "grid",
          "gap": "var(--spacing)"
        }
      },
      "media": [],
      "sections": [
        {
          "id": "intro",
          "items": [
            {
              "id": "title",
              "component": "Text",
              "props": {
                "as": "h1",
                "variant": "title"
              },
              "children": [
                "About this demo"
              ],
              "states": [
                "default"
              ]
            },
            {
              "id": "lead",
              "component": "Text",
              "props": {
                "as": "p"
              },
              "children": [
                "Change a word on this page, commit it, and watch the live site update."
              ],
              "states": [
                "default"
              ]
            },
            {
              "id": "to-home",
              "component": "Link",
              "props": {
                "href": "/"
              },
              "children": [
                "Back to home"
              ],
              "states": [
                "default"
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "Contact",
      "path": "/contact",
      "title": "Contact \u00b7 Git Demo",
      "evidence": "Git demo fixture for the Session 3 recording. Not a student project.",
      "responsive": "Same layout on every screen size.",
      "layout": {
        "root": {
          "display": "grid",
          "gap": "var(--spacing)"
        }
      },
      "media": [],
      "sections": [
        {
          "id": "intro",
          "items": [
            {
              "id": "title",
              "component": "Text",
              "props": {
                "as": "h1",
                "variant": "title"
              },
              "children": [
                "Contact"
              ],
              "states": [
                "default"
              ]
            },
            {
              "id": "lead",
              "component": "Text",
              "props": {
                "as": "p"
              },
              "children": [
                "This is a demo page. There is nothing to send."
              ],
              "states": [
                "default"
              ]
            },
            {
              "id": "to-home",
              "component": "Link",
              "props": {
                "href": "/"
              },
              "children": [
                "Back to home"
              ],
              "states": [
                "default"
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
