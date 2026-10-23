# homepage

Paul Costa's personal page at [costapaul.com](https://costapaul.com): links to GitHub, the app store developer pages, LinkedIn and contact. The header links the public infrastructure map; after Google sign-in it adds the smart home map, one menu per private link group (Tailscale; the rest in the burger menu with log out) and the LLM activity on costaserver. Only Paul's account can sign in: sign-up is disabled in Firebase Auth (`client.permissions.disabledUserSignup`).

Angular 22 with Angular Material (Material Symbols, Roboto), Firebase Hosting, Auth and Firestore (project `projects-costa`).

## Develop

```bash
npm install
npm start            # http://localhost:4200
npm run build        # dist/homepage/browser
```

## Deploy

```bash
firebase deploy --only hosting,firestore:rules
```

The predeploy step builds the app and runs `scripts/fetch-infrastructure.mjs`, which copies `/infrastructure/` and `/infrastructure/homeassistant/` from the live site into the build. Those two maps are built and published from the private costaserver repo (`scripts/hosting/`); a deploy here keeps them as they are.

## Private menu

The links that need Tailscale and the LLM monitor URL are not in this repo. They live in the Firestore document `private/server`, which `firestore.rules` lets only accounts listed in `admins/{email}` read. Each group becomes one header menu (button: `logo` image or Material `icon`, default a burger); its links open in a new tab. `llmMonitorUrl` adds the LLM activity tile to the home page, embedded with `?embed=1` (details fold out inside it, height follows the monitor's `llmMonitorHeight` messages). To change them, edit the git-ignored `private/server.json` and run:

```bash
node scripts/set-private-config.mjs private/server.json
```

```json
{
  "admins": ["you@example.com"],
  "server": {
    "llmMonitorUrl": "https://host.tailnet.ts.net:8443/",
    "groups": [
      { "title": "Tailscale", "logo": "logos/tailscale.svg", "links": [{ "label": "Cockpit", "url": "https://…", "icon": "speed" }] },
      { "title": "Links", "icon": "menu", "links": [{ "label": "GitHub runner", "url": "https://github.com/…", "icon": "rocket_launch" }] }
    ]
  }
}
```

`icon` is a Material Symbols name. `src/index.html` loads only the icons the app uses (`icon_names=`, alphabetical); add new names there.

## Logos

The brand logos in `public/logos/` come from the CC0 [logos](https://github.com/gilbarbara/logos) set; the GitHub mark is recolored white for the dark background. `tailscale.svg` redraws Tailscale's dot logo (light, for dark backgrounds). The favicon and touch icons are the paul-costa GitHub avatar.
