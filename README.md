# homepage

Paul Costa's personal page at [costapaul.com](https://costapaul.com): links to GitHub, the app store developer pages, LinkedIn and contact. The header links the public server flow and homeassistant flow; its burger menu lists the public projects (wedding.costa at [wedding.costapaul.com](https://wedding.costapaul.com), see `src/app/links.ts`) and the sign-in (Cloudflare Access), and after sign-in the private link groups (Tailscale, Links) and log out; the home page then shows the LLM activity on costaserver. Only Paul's email can sign in.

Angular 22 with Angular Material (Material Symbols, Roboto). Since 28 Oct 2026 the site is served by Paul's home server costaserver (Caddy behind a Cloudflare Tunnel, DNS and TLS at Cloudflare); before that it was Firebase Hosting with Firebase Auth and Firestore, which are gone.

## Develop

```bash
npm install
npm start            # http://localhost:4200 (signed out: /private/server.json is not there)
npm run build        # dist/homepage/browser
```

## Deploy

```bash
scripts/deploy.sh    # build, rsync to costaserver (ssh alias "costaserver"), private config, check
```

The script copies the build into `~/costapaul-web/site/` on costaserver and leaves `/infrastructure/` alone: the server flow and homeassistant flow are built and published from the private costaserver repo (`scripts/hosting/deploy-costapaul.sh`). The Caddy config, the container and the tunnel are in that repo too (`config/server/costapaul-web/`).

## Private menu

Sign-in is Cloudflare Access on `costapaul.com/private/*`: only Paul's email gets a login code. The burger menu's "Sign in" opens `/private/login/`, Access asks for the code and sends the browser back home; "Log out" is `/cdn-cgi/access/logout`. Signed in, the app reads `/private/server.json`: the link groups that need Tailscale and the LLM monitor URL. Each group is one section of the burger menu (a `logo` image shows next to its title); absolute links open in a new tab, paths on this site in the same one. `llmMonitorUrl` adds the LLM activity tile to the home page, embedded with `?embed=1` (details fold out inside it, height follows the monitor's `llmMonitorHeight` messages). The file is not in this repo: edit the git-ignored `private/server.json` and run `scripts/deploy.sh`. Without the Access header the server answers 403 for `/private/*`, so the file never leaves costaserver unauthenticated.

```json
{
  "server": {
    "llmMonitorUrl": "https://host.tailnet.ts.net:8443/",
    "groups": [
      { "title": "Tailscale", "logo": "logos/tailscale.svg", "links": [{ "label": "Cockpit", "url": "https://…", "icon": "speed" }] },
      { "title": "Links", "links": [{ "label": "GitHub runner", "url": "https://github.com/…", "icon": "rocket_launch" }] }
    ]
  }
}
```

`icon` is a Material Symbols name. `src/index.html` loads only the icons the app uses (`icon_names=`, alphabetical); add new names there.

## Logos

The brand logos in `public/logos/` come from the CC0 [logos](https://github.com/gilbarbara/logos) set; the GitHub mark is recolored white for the dark background. `tailscale.svg` redraws Tailscale's dot logo (light, for dark backgrounds). The favicon and touch icons are the paul-costa GitHub avatar.
