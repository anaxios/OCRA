const icsToJson = require('ics-to-json').default;
const fetch = require('node-fetch');
const fs = require('fs/promises');
 
// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed
const convert = async (fileLocation) => {
    const icsRes = await fs.readFile(fileLocation,'utf8');
    const cleaned = icsRes.replace(/\\,/g, ',').replace(/: /g, '\--- ').replace(/([0-9])\:([0-9])/g, "$1\---$2");
    const data = icsToJson(cleaned);
    // data;
    console.log(data) ;
    await fs.writeFile("planner.json", JSON.stringify(data), (err) => console.log(err));
}

convert('./planner2021-en.ics');