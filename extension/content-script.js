browser.runtime.sendMessage({ action: "getBookmarks" }, (response) => {
  renderbookmarks(response);
});

function renderbookmarks(bookmarks) {
  const rootElement = document.getElementById("bookmarks");
  const rootFolder = bookmarks[0].children
    .find((element) => {
      return element.title === "Other Bookmarks";
    })
    .children.find((element) => {
      return element.title === "startpage";
    });

  for (const folder of rootFolder.children) {
    if (folder.type === "folder") {
      const [list, categoryDiv] = createFolder(folder);
      rootElement.appendChild(categoryDiv);

      for (const bookmark of folder.children) {
        if (bookmark.url) {
          const listItem = createListItem(bookmark);
          list.appendChild(listItem);
        }
      }
    }
  }

  function createListItem(bookmark) {
    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.textContent = bookmark.title;
    link.href = bookmark.url;

    listItem.appendChild(link);

    return listItem;
  }

  function createFolder(folder) {
    const title = document.createElement("li");
    title.classList.add("title");
    title.textContent = folder.title;

    const list = document.createElement("ul");
    list.appendChild(title);

    const linksDiv = document.createElement("div");
    linksDiv.classList.add("links");
    linksDiv.appendChild(list);

    const categoryDiv = document.createElement("div");
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
