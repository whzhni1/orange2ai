const puppeteer = require('puppeteer');

async function extractData() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
     });
    const page = await browser.newPage();
     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'); // 你可以从你的浏览器复制这个
    try {
        await page.goto('https://docs.qq.com/sheet/DUVNPdXRCeFFhQ3VO?tab=BB08J2', { waitUntil: 'networkidle2' });

        // 获取页面内容
        const html = await page.content();
       console.log("HTML 内容：\n", html); // 打印 HTML

        // 使用正则表达式提取序列号之间的内容
        const regex = /"序列号":\[(.*?)\]/s;
        const match = html.match(regex);

        if (match && match[1]) {
            let extractedData = match[1].trim();

            // 去除 \n 和 "
            extractedData = extractedData.replace(/\\n/g, '').replace(/"/g, '');

            console.log("提取到的数据：\n", extractedData);

        } else {
            console.log('没有找到匹配的内容');
        }

    } catch (error) {
        console.error('发生错误:', error);
    } finally {
        await browser.close();
    }
}

extractData();
