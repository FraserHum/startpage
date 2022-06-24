browser.runtime.sendMessage({ action: "getBookmarks" }, (response) => {
  renderbookmarks(response);
});

function renderbookmarks(bookmarks) {
  let rootElement = document.getElementById("bookmarks");
  let rootFolder = bookmarks[0].children
    .find((element) => {
      return element.title === "Other Bookmarks";
    })
    .children.find((element) => {
      return element.title === "startpage";
    });

  for (let folder of rootFolder.children) {
    if (folder.type === "folder") {
      let [list, categoryDiv] = createFolder(folder);
      rootElement.appendChild(categoryDiv);

      for (let bookmark of folder.children) {
        if (bookmark.url) {
          let listItem = createListItem(bookmark);
          list.appendChild(listItem);
        }
      }
    }
  }

  function createListItem(bookmark) {
    let listItem = document.createElement("li");

    let link = document.createElement("a");
    link.textContent = bookmark.title;
    link.href = bookmark.url;

    listItem.appendChild(link);

    return listItem;
  }

  function createFolder(folder) {
    let title = document.createElement("li");
    title.classList.add("title");
    title.textContent = folder.title;

    let list = document.createElement("ul");
    list.appendChild(title);

    let linksDiv = document.createElement("div");
    linksDiv.classList.add("links");
    linksDiv.appendChild(list);

    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.appendChild(linksDiv);

    return [list, categoryDiv];
  }
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
