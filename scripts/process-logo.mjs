import sharp from "sharp";
import { mkdirSync, rmSync, existsSync } from "node:fs";

const SRC = "/Users/tylerray/Library/Mobile Documents/com~apple~CloudDocs/JT Signature.png";
const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname;
const APP_DIR = new URL("../src/app/", import.meta.url).pathname;

mkdirSync(PUBLIC_DIR, { recursive: true });

/* Step 1: derive an alpha PNG (black ink with alpha = ink coverage) from the source. */
const { data: rgb, info } = await sharp(SRC)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const px = info.width * info.height;
const alpha = Buffer.alloc(px);
for (let i = 0; i < px; i++) {
  const r = rgb[i * 3];
  const g = rgb[i * 3 + 1];
  const b = rgb[i * 3 + 2];
  const lum = Math.max(r, g, b);
  let a;
  if (lum >= 240) a = 0;
  else if (lum <= 80) a = 255;
  else a = Math.round(((240 - lum) / (240 - 80)) * 255);
  alpha[i] = a;
}

const inkRGBA = Buffer.alloc(px * 4);
for (let i = 0; i < px; i++) {
  inkRGBA[i * 4] = 0;
  inkRGBA[i * 4 + 1] = 0;
  inkRGBA[i * 4 + 2] = 0;
  inkRGBA[i * 4 + 3] = alpha[i];
}

const trimmed = await sharp(inkRGBA, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim()
  .png()
  .toBuffer({ resolveWithObject: true });

/* Step 2: write avatar mask PNG (transparent background, black ink). */
await sharp(trimmed.data)
  .resize({
    width: 256,
    height: 256,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(`${PUBLIC_DIR}jt-logo.png`);

/* Step 3: build a dark-on-gold icon for favicon and apple-touch (high visibility). */
async function darkOnGold(size, ringRatio = 0.04) {
  const inkSize = Math.round(size * 0.7);
  const ring = Math.max(1, Math.round(size * ringRatio));

  // Resize the trimmed alpha mask to the inkSize with padding.
  const inkAlpha = await sharp(trimmed.data)
    .resize({
      width: inkSize,
      height: inkSize,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extractChannel("alpha")
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Dark ink (#050505) with the derived alpha → high-contrast strokes.
  const darkRGBA = Buffer.alloc(inkAlpha.info.width * inkAlpha.info.height * 4);
  for (let i = 0; i < inkAlpha.info.width * inkAlpha.info.height; i++) {
    darkRGBA[i * 4] = 0x05;
    darkRGBA[i * 4 + 1] = 0x05;
    darkRGBA[i * 4 + 2] = 0x05;
    darkRGBA[i * 4 + 3] = inkAlpha.data[i];
  }
  const darkInk = await sharp(darkRGBA, {
    raw: {
      width: inkAlpha.info.width,
      height: inkAlpha.info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  // Gold-gradient circular background.
  const bgSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <defs>
         <radialGradient id="g" cx="50%" cy="30%" r="70%">
           <stop offset="0%" stop-color="#ffeaa0"/>
           <stop offset="55%" stop-color="#f5d76e"/>
           <stop offset="100%" stop-color="#b8902e"/>
         </radialGradient>
       </defs>
       <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - ring / 2}"
         fill="url(#g)" stroke="#3a2a08" stroke-opacity="0.6" stroke-width="${ring}"/>
     </svg>`
  );

  return sharp(bgSvg)
    .composite([{ input: darkInk, gravity: "center" }])
    .png()
    .toBuffer();
}

// Next.js App Router will pick up icon.png and apple-icon.png in app/ dir.
// Remove the old default favicon.ico to avoid conflicts.
if (existsSync(`${APP_DIR}favicon.ico`)) {
  rmSync(`${APP_DIR}favicon.ico`);
}

await sharp(await darkOnGold(64))
  .png()
  .toFile(`${APP_DIR}icon.png`);

await sharp(await darkOnGold(180))
  .png()
  .toFile(`${APP_DIR}apple-icon.png`);

await sharp(await darkOnGold(32, 0.08))
  .png()
  .toFile(`${PUBLIC_DIR}favicon-32.png`);

console.log("✓ wrote public/jt-logo.png");
console.log("✓ wrote src/app/icon.png (64×64)");
console.log("✓ wrote src/app/apple-icon.png (180×180)");
console.log("✓ wrote public/favicon-32.png");
