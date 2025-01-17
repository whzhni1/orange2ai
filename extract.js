const axios = require('axios');

async function extractData() {
  try {
    const response = await axios.get('https://docs.qq.com/sheet/DUVNPdXRCeFFhQ3VO?tab=BB08J2');
    const html = response.data;

     console.log("HTML内容：\n", html); // 添加这一行，打印 HTML 内容
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
  }
}

extractData();
