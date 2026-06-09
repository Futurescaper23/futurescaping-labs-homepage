FutureScaping Labs - Website Bundle
===================================

This folder is the local website bundle.

Render deployment
-----------------
This repo is set up for Render as a static site with:

- render.yaml
- publish path = repo root
- no build step beyond a successful no-op command

In Render:

1. Create a new Static Site from the GitHub repo.
2. Let Render detect the Blueprint from render.yaml.
3. Confirm the service name and deploy.

After the first deploy, the site will be available on an onrender.com URL and will auto-update from new commits.

What to copy to the Samsung tablet
----------------------------------
Copy the whole "tablet-bundle" folder.

Recommended tablet app
----------------------
Use any simple local HTTP server app on Android that lets you choose a folder and start a localhost server.

Suggested folder route
----------------------
Open the server app and point it at:

tablet-bundle

Then open in Chrome on the tablet:

http://127.0.0.1:8080

If 8080 is already taken, use the port shown by the app.

What is included
----------------
- index.html = FutureScaping Labs landing page
- monitoring/ = monitoring page
- siteview/ = SiteView page
- evidence/ = Survey Evidence Pack page

Important
---------
This bundle is designed to be stable offline.
It avoids live APIs, live weather, live tides, and external 3D model dependencies.

If you want to update imagery later
-----------------------------------
- Monitoring images: tablet-bundle/src/assets/
- SiteView extra images: tablet-bundle/assets/demos/
- Evidence extra images: tablet-bundle/assets/demos/
