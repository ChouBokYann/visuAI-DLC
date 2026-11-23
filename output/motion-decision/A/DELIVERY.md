# Delivery

Ready for review. Selecting an origin brings its marker into the center of the illustrated map. The camera then pulls back as the route draws toward Singapore. The names below the map link directly to the matching cafe listings.

I inspected five frames of the normal-motion Guatemala journey in running Chromium on [desktop](.checks/desktop.png) and [phone](.checks/phone.png). At 1280 x 860, the world view passed through 152% zoom, reached 250% at the origin, and settled at 132% with both endpoints visible. At 390 x 844, the approach and route drawing remained visible. I moved the Singapore label after finding that an origin button obscured it.

On both viewports I interrupted an Indonesia flight with Ethiopia. The camera continued from the enlarged map and settled on Ethiopia's connection to PPP Coffee and Nylon Coffee. I checked the PPP listing link, Ethiopia photo, comparison and return, world reset, and instant selection with reduced motion. Five unit tests and the production build passed. The browser check is reproducible with `npm run test:browser` against the running app. Set `ATLAS_URL` or `CHROMIUM_PATH` to override its defaults.

Phone coverage used a Chromium viewport. Physical touch devices, Safari, Firefox and external listing availability were outside these checks.
