import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const media = fileURLToPath(new URL("../public/media/", import.meta.url));
const output = fileURLToPath(new URL("../public/media/responsive/", import.meta.url));
const manifest = fileURLToPath(new URL("../content/responsive-images.generated.json", import.meta.url));

const imageWidths = {
  "verbena-doctors-together": [280, 320],
  "anastasiia-card": [144, 160, 192],
  "tetiana-card": [144, 160, 192],
  "blog-ultrasound": [144, 160],
  "blog-cytology": [144, 160],
  "blog-bleeding": [],
};

await mkdir(output, { recursive: true });
const images = {};

for (const [name, widths] of Object.entries(imageWidths)) {
  const file = `${name}.webp`;
  const original = await readFile(`${media}${file}`);
  const { width, height } = await sharp(original).metadata();
  const variants = [];

  for (const targetWidth of widths) {
    if (targetWidth >= width) continue;
    const { data, info } = await sharp(original).resize({ width: targetWidth }).raw().toBuffer({ resolveWithObject: true });
    const encoded = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .webp({ lossless: true, effort: 5 })
      .toBuffer();

    if (encoded.length >= original.length) continue;
    const decoded = await sharp(encoded).raw().toBuffer();
    if (!decoded.equals(data)) throw new Error(`Lossless image check failed: ${file} (${targetWidth}px)`);

    const hash = createHash("sha256").update(encoded).digest("hex").slice(0, 16);
    const variant = `${name}-${targetWidth}.${hash}.webp`;
    await writeFile(`${output}${variant}`, encoded);
    variants.push({ src: `/media/responsive/${variant}`, width: targetWidth });
  }

  images[`/media/${file}`] = { width, height, variants };
}

const tempManifest = `${manifest}.${randomUUID()}.tmp`;
await writeFile(tempManifest, JSON.stringify(images, null, 2) + "\n");
await rename(tempManifest, manifest);
