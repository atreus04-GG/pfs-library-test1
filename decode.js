const fs = require('fs');

const data = JSON.parse(
  fs.readFileSync('library.json', 'utf8')
);

function decode(obj) {
  if (Array.isArray(obj)) {
    return obj.map(decode);
  }

  if (obj && typeof obj === 'object') {
    const out = {};

    for (const [key, value] of Object.entries(obj)) {
      if (key === 'url' && typeof value === 'string') {
        try {
          out[key] = Buffer.from(value, 'base64').toString('utf8');
        } catch {
          out[key] = value;
        }
      } else {
        out[key] = decode(value);
      }
    }

    return out;
  }

  return obj;
}

fs.writeFileSync(
  'decoded-library.json',
  JSON.stringify(decode(data), null, 2)
);

console.log('Decoded library created');
