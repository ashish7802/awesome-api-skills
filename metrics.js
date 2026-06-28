const fs = require('fs');
const content = fs.readFileSync('README.md', 'utf8');

const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
const lineCount = content.split('\n').length;
const sections = (content.match(/^##\s/gm) || []).length;
const codeExamples = (content.match(/```[a-z]*\n[\s\S]*?\n```/g) || []).length;
const images = (content.match(/<img[^>]+>|!\[[^\]]*\]\([^\)]+\)/g) || []).length;
const diagrams = (content.match(/```mermaid[\s\S]*?```/g) || []).length;

console.log(JSON.stringify({
  wordCount,
  lineCount,
  sections,
  codeExamples,
  images,
  diagrams
}, null, 2));
