import assert from "node:assert/strict";
import fs from "node:fs";
import { getTravelTipCoverImageConfig, shouldKeepStableCoverUrl } from "../lib/posts/cover-performance.js";
import { buildResponsiveImageSet } from "../lib/image-utils.js";

const renderer = fs.readFileSync("functions/post/[slug].js", "utf8");
const proxy = fs.readFileSync("functions/img/[encoded].js", "utf8");
const createApi = fs.readFileSync("functions/api/posts.js", "utf8");
const updateApi = fs.readFileSync("functions/api/posts/[slug].js", "utf8");

const config = getTravelTipCoverImageConfig();
assert.deepEqual(config.widths, [480, 640, 720, 800, 1200]);
assert.equal(config.sizes, "(max-width: 839px) 100vw, 800px");
assert.equal(config.fallbackWidth, 800);
assert.equal(config.quality, 80);
assert.equal(config.fit, "scale-down");

const source = "https://pub-example.r2.dev/travel/cover.webp";
assert.equal(shouldKeepStableCoverUrl(source), true, "R2 대표 이미지는 글 본문 수정만으로 URL이 바뀌면 안 됩니다.");
const image = buildResponsiveImageSet(source, config, "https://bestayable.com");
assert.match(image.src, /[?&]w=800(?:&|$)/);
assert.match(image.srcset, /[?&]w=720(?:&|$)[^,]*720w/);
assert.match(image.srcset, /[?&]w=800(?:&|$)[^,]*800w/);
assert.equal(image.sizes, config.sizes);

assert.match(renderer, /loading="eager"/);
assert.match(renderer, /fetchpriority="high"/);
assert.match(renderer, /rel="preload" as="image"/);
assert.match(renderer, /imagesrcset=/);
assert.match(renderer, /imagesizes=/);
assert.match(renderer, /shouldKeepStableCoverUrl\(rawCoverImage\) \? rawCoverImage : appendImageVersion/);
assert.match(renderer, /POST_RENDER_VERSION = "20260909-post-layout-v56"/);
assert.match(proxy, /ALLOWED_WIDTHS = \[[^\]]*800[^\]]*\]/);
assert.match(createApi, /warmTravelTipCoverTransforms\(coverImage\)/);
assert.match(updateApi, /warmTravelTipCoverTransforms\(coverImage\)/);

console.log("post LCP performance check: OK");
