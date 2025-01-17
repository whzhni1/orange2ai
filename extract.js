const puppeteer = require('puppeteer');

async function extractData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('https://docs.qq.com/sheet/DUVNPdXRCeFFhQ3VO?tab=BB08J2', { waitUntil: 'networkidle2' });

       // 获取页面内容
        const html = await page.content();

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
