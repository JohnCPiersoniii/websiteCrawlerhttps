function printReport(pages) {
    console.log("============ Report ===========");
    const sortedPages = sortPages(pages);
    for (const sortePage of sortedPages) {
        const url = sortePage[0];
        const count = sortePage[1];
        console.log(`There were ${count} internal links to page: ${url}`);
    }
    console.log("============ End Report ===========");

}

function sortPages(pages) {
  pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => b[1] - a[1]);
  return pagesArray;
}

module.exports = {
    sortPages,
    printReport
}