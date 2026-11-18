import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(projectRoot, 'config/colors.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const preset = config.presets[config.activePreset];

if (!preset) {
  throw new Error(`Preset de cores não encontrado: ${config.activePreset}`);
}

for (const [name, value] of Object.entries(preset)) {
  if (!/^#[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`Cor inválida em ${name}: ${value}`);
  }
}

const cssPath = path.join(projectRoot, 'src/styles.css');
let css = fs.readFileSync(cssPath, 'utf8');
const tokens = {
  '--green': preset.green,
  '--green-dark': preset.greenDark,
  '--green-light': preset.greenLight,
  '--purple': preset.purple,
  '--purple-deep': preset.purpleDeep,
  '--purple-soft': preset.purpleSoft,
  '--ink': preset.black,
  '--muted': preset.gray,
  '--paper': preset.paper,
  '--white': preset.white,
  '--neutral-gray': preset.gray,
  '--line': preset.gray,
};

for (const [token, value] of Object.entries(tokens)) {
  const pattern = new RegExp(`(^\\s*${token}:\\s*)#[0-9a-f]{6}(\\s*;)`, 'im');
  if (!pattern.test(css)) {
    throw new Error(`Token CSS não encontrado: ${token}`);
  }
  css = css.replace(pattern, `$1${value}$2`);
}
fs.writeFileSync(cssPath, css);

// A logo mantém a mesma cor no SVG original e na cópia pública usada pelo site.
for (const svgPath of ['Fav-icon.svg', 'public/favicon.svg']) {
  const absolutePath = path.join(projectRoot, svgPath);
  if (!fs.existsSync(absolutePath)) continue;
  const svg = fs.readFileSync(absolutePath, 'utf8');
  if (!svg.includes('fill=')) {
    throw new Error(`Não encontrei a cor de fundo da logo em ${svgPath}`);
  }
  const updatedSvg = svg.replace(/(<rect\b[^>]*\bfill=")[^"]+("[^>]*>)/i, `$1${preset.purple}$2`);
  if (updatedSvg === svg && !svg.includes(`fill="${preset.purple}"`)) {
    throw new Error(`Não foi possível sincronizar a cor roxa em ${svgPath}`);
  }
  fs.writeFileSync(absolutePath, updatedSvg);
}

const htmlPath = path.join(projectRoot, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/(<meta\s+name="theme-color"\s+content=")[^"]+("\s*\/?\s*>)/i, `$1${preset.purpleDeep}$2`);
fs.writeFileSync(htmlPath, html);

console.log(`Paleta "${config.activePreset}" sincronizada: CSS, logo SVG e theme-color.`);
