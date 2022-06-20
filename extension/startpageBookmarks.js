browser.runtime.sendMessage({ test: "test" }, (response) => { renderbookmarks(response) })

//browser.runtime.onMessage.addListender(renderBookmarks);

function renderbookmarks(bookmarks) {
    console.log(bookmarks[0].children)
        
        console.log(bookmarks[0].children.find((element) => {
            return element.title === "Other Bookmarks"
        }));
        let rootElement = document.getElementById("bookmarks");
        let rootFolder = bookmarks[0].children.find((element) => {
            return element.title === "Other Bookmarks"
        }).children.find((element) => {return element.title === "startpage"})

        console.log(rootFolder);
        for (let folder of rootFolder.children) {
            if (folder.type === "folder") {
                let categoryDiv = document.createElement("div");
                categoryDiv.classList.add("category");
                let linksDiv = document.createElement("div");
                linksDiv.classList.add("links");
                let list = document.createElement("ul");
                let title = document.createElement("li")
                title.classList.add("title");
                title.textContent = folder.title;
                list.appendChild(title);
                for (let bookmark of folder.children){
                    if (bookmark.url) {
                    let listItem = createListItem(bookmark);
                    list.appendChild(listItem);
                    }
                }
                linksDiv.appendChild(list);
                categoryDiv.appendChild(linksDiv)
    
                rootElement.appendChild(categoryDiv);
            }

        }
}

function createListItem(bookmark) {
    let listItem = document.createElement("li")
    let link = document.createElement('a');
    link.textContent = bookmark.title;
    link.href = bookmark.url
    listItem.appendChild(link);
    return listItem;
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
