const { crawlPage } = require('./crawl');

async function main() {
    if(process.argv.length < 3) {
        console.log("Please provide a URL as a command line argument");
        process.exit(1);
    }
    if(process.argv.length > 3) {
        console.log("Please provide only one URL as a command line argument");
        process.exit(1);
    }
    const baseURL = process.argv[2];
    
    console.log(`starting crawl for URL: ${baseURL}`);
    
    const pages = await crawlPage(baseURL, baseURL, {})
    
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
    
    process.exit(0);
}

main();