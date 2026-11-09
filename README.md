# Sasi · Product Designer & Builder

A React, TypeScript, Vite, and Tailwind portfolio built around a pointer-controlled video portrait.

## Run locally

Use Node.js 22 LTS or 24 LTS.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. For a production check, run `npm run build` followed by `npm run preview`.

## Record a reel

Use a desktop window at 1440 × 900 or 1280 × 800 and scroll to the top. In the development server, select **9:16 guide**, press **Alt/Option + R**, or open the page with `?reel=1`. Align your recorder to the dashed center frame, then hide the guide before recording. Move the cursor from side to side across the full viewport for the full range of motion. At 1440 × 900, the crop is about 506 × 900.

The guide and its controls are compiled out of the production build.

## Edit the portfolio

- Edit `src/content.ts` to replace the two sample projects, update the About copy, add an optional About portrait, or add real contact destinations. The gallery renders a case-study link only when its URL is filled in.
- Add confirmed email or profile destinations to the `contact` array. The hero’s **Let’s Talk** button always opens the Contact section.
- The mock interfaces in Selected Work are illustrative artwork for the sample entries. Set each project’s `image` path to replace the mock interface, and set `sample` to `false` once you’ve added the real project details.

## Portrait assets and tracking

All three character assets from the supplied video pack are under `public/assets/`. The site loads the WebP poster first and uses the 1.31 MB web MP4 on devices with a fine pointer and hover. Touch-only devices and reduced-motion visitors see the static portrait. The poster also stays visible if playback or seeking fails. The original 1080p MP4 is included as a source asset and is never requested by the page.

The supplied 24 fps web clip turns left to right. The sampled pose times are 0.50, 0.875, 1.375, 2.0833, and 2.9167 seconds at the left edge, quarter point, center, three-quarter point, and right edge. `CursorTrackedAvatar` eases between those times and issues each seek after the previous one settles. The video remains paused. The studio background is part of the media and blends into the hero with a feathered mask.

## Deploy on Vercel

When ready, import the project into Vercel and choose the **Vite** framework preset. Set the project folder as the root, choose Node.js 22.x or 24.x, and use these settings.

| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

The site uses a single page with section anchors and requires no environment variables.
