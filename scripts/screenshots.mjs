#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const SCREENSHOTS_DIR = path.join(ROOT, "screenshots");
const REPO = "RADAR-RACES";
const PORT = Number(process.env.SCREENSHOT_PORT || 3456);
const BASE_URL = `http://127.0.0.1:${PORT}/${REPO}/`;
const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2, outputDir: SCREENSHOTS_DIR },
  mobile: {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    outputDir: path.join(SCREENSHOTS_DIR, "mobile"),
  },
};

const CHROME_PATHS = {
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  ],
  linux: [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
  ],
  win32: [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ],
};

const SECTIONS = [
  { id: "hero", name: "01-hero" },
  { id: "about", name: "02-about" },
  { id: "format", name: "03-format" },
  { id: "modules", name: "04-modules" },
  { id: "audience", name: "05-audience" },
  { id: "team", name: "06-team" },
  { id: "pricing", name: "07-pricing" },
  { id: "contacts", name: "08-contacts" },
];

function log(message) {
  console.log(`[screenshots] ${message}`);
}

function findChrome() {
  const candidates = CHROME_PATHS[process.platform] || [];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(
    "Google Chrome not found. Install Chrome or set CHROME_PATH to the browser executable."
  );
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options,
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed (${code}): ${command} ${args.join(" ")}`));
    });
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".txt": "text/plain; charset=utf-8",
  };
  return map[ext] || "application/octet-stream";
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
      let pathname = decodeURIComponent(url.pathname);

      if (pathname === `/${REPO}`) pathname = `${pathname}/`;

      if (!pathname.startsWith(`/${REPO}/`)) {
        res.writeHead(302, { Location: `/${REPO}/` });
        res.end();
        return;
      }

      let relative = pathname.slice(`/${REPO}/`.length) || "index.html";
      if (relative.endsWith("/")) relative += "index.html";

      const filePath = path.join(OUT_DIR, relative);
      const resolved = path.resolve(filePath);

      if (!resolved.startsWith(OUT_DIR) || !existsSync(resolved) || statSync(resolved).isDirectory()) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      res.writeHead(200, { "Content-Type": contentType(resolved) });
      res.end(readFileSync(resolved));
    });

    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server did not become ready at ${url}`);
}

async function setLanguage(page, lang) {
  await page.evaluate((code) => {
    window.localStorage.setItem("radar-lang", code);
  }, lang);
  await page.reload({ waitUntil: "networkidle2" });
  await page.waitForSelector("#hero", { timeout: 15000 });
}

async function captureSection(page, sectionId, outputPath) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Section #${id} not found`);
    el.scrollIntoView({ block: "start" });
  }, sectionId);
  await new Promise((resolve) => setTimeout(resolve, 500));
  await page.screenshot({ path: outputPath, type: "png" });
}

async function captureScreenshots(chromePath, skipBuild, mode) {
  const viewport = VIEWPORTS[mode];

  if (!skipBuild) {
    log("Building static site...");
    await run("npm", ["run", "build"], {
      env: { ...process.env, NODE_ENV: "production" },
    });
  }

  if (!existsSync(path.join(OUT_DIR, "index.html"))) {
    throw new Error(`Build output not found in ${OUT_DIR}. Run npm run build first.`);
  }

  mkdirSync(viewport.outputDir, { recursive: true });

  log(`Starting local server at ${BASE_URL}`);
  const server = await startStaticServer();
  await waitForServer(BASE_URL);

  log(`Launching Google Chrome: ${chromePath}`);
  log(`Using ${mode} viewport: ${viewport.width}x${viewport.height}`);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      isMobile: viewport.isMobile || false,
      hasTouch: viewport.hasTouch || false,
    },
  });

  try {
    const page = await browser.newPage();

    for (const lang of ["ru", "en"]) {
      const langDir = path.join(viewport.outputDir, lang);
      mkdirSync(langDir, { recursive: true });

      log(`Capturing ${lang.toUpperCase()} screenshots...`);
      await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 60000 });
      await setLanguage(page, lang);

      for (const section of SECTIONS) {
        const filePath = path.join(langDir, `${section.name}.png`);
        await captureSection(page, section.id, filePath);
        log(`  saved ${path.relative(ROOT, filePath)}`);
      }

      const fullPagePath = path.join(langDir, "00-full-page.png");
      await page.screenshot({ path: fullPagePath, fullPage: true, type: "png" });
      log(`  saved ${path.relative(ROOT, fullPagePath)}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  log(`Done. Screenshots saved to ${path.relative(ROOT, viewport.outputDir)}/`);
}

const skipBuild = process.argv.includes("--skip-build");
const mode = process.argv.includes("--mobile") ? "mobile" : "desktop";
const chromePath = process.env.CHROME_PATH || findChrome();

captureScreenshots(chromePath, skipBuild, mode).catch((error) => {
  console.error(`[screenshots] ${error.message}`);
  process.exit(1);
});
