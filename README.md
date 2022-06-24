# multi-theme browser startpage with extension for browser bookmark integration

fork of https://github.com/Pav-Osmolski/startpage

New features:
- bookmarks
- served via deno so it can be used as new tab

to run: 
deno run --allow-net --allow-read server.ts
set browser home to localhost:8080/index.html
install temporary extension via 'about:debugging#/runtime/this-firefox' using manifest file in extension folder
install an extension to set your new table page as your home page




