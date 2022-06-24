browser.runtime.onMessage.addListener(getBookmarksTree);

browser.permissions.getAll().then((result) => {
    console.log(result.permissions); // [ "webRequest", "tabs" ]
    console.log(result.origins)      // [ "*://*.mozilla.org/*" ]
  });


function makeIndent(indentLength) {
    return ".".repeat(indentLength);
}

function logItems(bookmarkItem, indent) {
    if (bookmarkItem.url) {
        console.log(makeIndent(indent) + bookmarkItem.url);
    } else {
        console.log(makeIndent(indent), bookmarkItem.title);
        indent++;
    }
    if (bookmarkItem.children) {
        for (child of bookmarkItem.children) {
            logItems(child, indent);
        }
    }
    indent--;
}

function logTree(bookmarkItems) {
    logItems(bookmarkItems[0], 0);
}

function sendTree(bookmarkItems) {
   browser.tabs.sendMessage(bookmarkItems);
}

function onRejected(error) {
    console.log(`An error: ${error}`);
}



function getBookmarksTree (request, sender, sendResponse) {
    console.log(request, sender)
    let gettingTree = browser.bookmarks.getTree();
    console.log("loaded extension")
    return gettingTree;
}