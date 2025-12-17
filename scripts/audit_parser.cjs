const fs = require('fs');
try {
    const report = JSON.parse(fs.readFileSync('public/lighthouse-report.json', 'utf8'));

    const lcp = report.audits['largest-contentful-paint-element'];
    console.log('--- LCP ELEMENT ---');
    if (lcp && lcp.details && lcp.details.items) {
        lcp.details.items.forEach(item => {
            if (item.node) {
                console.log('Snippet:', item.node.snippet);
                console.log('NodeLabel:', item.node.nodeLabel);
            } else {
                console.log('Item:', JSON.stringify(item));
            }
        });
    }

    const unusedJs = report.audits['unused-javascript'];
    console.log('\n--- UNUSED JS ---');
    if (unusedJs && unusedJs.details && unusedJs.details.items) {
        unusedJs.details.items.forEach(item => {
            console.log('URL:', item.url);
            console.log('Wasted KiB:', (item.wastedBytes / 1024).toFixed(2));
        });
    }
} catch (e) {
    console.error("Error parsing:", e);
}
