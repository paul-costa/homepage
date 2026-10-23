# homepage

Paul Costa's personal page at [costapaul.com](https://costapaul.com): links to GitHub, the app store developer pages, LinkedIn and contact, plus an "Infra" menu with the public infrastructure maps and, after Google sign-in, the private server links and the LLM activity on costaserver.

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

The links that need Tailscale and the LLM monitor URL are not in this repo. They live in the Firestore document `private/server`, which `firestore.rules` lets only accounts listed in `admins/{email}` read. To change them, edit the git-ignored `private/server.json` and run:

```bash
node scripts/set-private-config.mjs private/server.json
```

```json
{
  "admins": ["you@example.com"],
  "server": {
    "llmMonitorUrl": "https://host.tailnet.ts.net:8443/",
    "groups": [{ "title": "Remote", "links": [{ "label": "Cockpit", "url": "https://…", "icon": "speed" }] }]
  }
}
```

`icon` is a Material Symbols name. `src/index.html` loads only the icons the app uses (`icon_names=`, alphabetical); add new names there.

## Logos

The brand logos in `public/logos/` come from the CC0 [logos](https://github.com/gilbarbara/logos) set; the GitHub mark is recolored white for the dark background.
