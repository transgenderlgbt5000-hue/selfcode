import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const icons = [
  { src: path.join(__dirname, '..', 'public', 'images', 'w-icon-192.svg'), sizes: [192] },
  { src: path.join(__dirname, '..', 'public', 'images', 'w-icon-512.svg'), sizes: [512] }
];

async function generate() {
  for (const icon of icons) {
    const svg = fs.readFileSync(icon.src);
    for (const size of icon.sizes) {
      const out = path.join(__dirname, '..', 'public', 'images', `w-icon-${size}.png`);
      await sharp(svg).resize(size, size).png().toFile(out);
      console.log('Generated', out);
    }
  }
}

generate().catch(err => {
  console.error('Icon generation failed:', err);
  process.exit(1);
});
