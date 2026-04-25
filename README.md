# Webkinz Collection Tracker

Local Webkinz tracker site with clean routes and account-based saved progress.

## Run it

```bash
cd /Users/gracehodges/Desktop/Games/Code/webkinz-collection-tracker
npm start
```

Then open `http://localhost:3000`.

## Deploy on Railway

1. Push this folder to GitHub.
2. In Railway, create a new project and deploy from that GitHub repo.
3. Add a Volume to the web service.
4. Set the Volume mount path to `/app/data`.
5. Generate a Railway domain, then attach your custom domain.

The server is already set up to:

- listen on Railway's `PORT`
- bind to `0.0.0.0` on Railway
- save account data to `RAILWAY_VOLUME_MOUNT_PATH` when a volume is attached

Useful check after deploy:

- `/api/health`

## Main routes

- `/`
- `/collections`
- `/login`
- `/profile`

## Main files

- `server.js`: tiny local server for clean routes
- `app.js`: app logic, auth flow, account data rendering
- `styles.css`: theme and layout
- `index.html`, `collections.html`, `login.html`, `profile.html`: page shells
- `*-collection.js`: imported collection data files

## Notes

- Accounts and tracker data are saved in `data/accounts.json`.
- On Railway, account data will save to the attached volume instead of the local project folder.
- Existing browser-only tracker data is imported into the first account you sign into.
- Collection data is still file-based, so it is easy to keep adding more imports.
- If you want the next step after this, the best upgrade is real accounts plus cloud sync.
