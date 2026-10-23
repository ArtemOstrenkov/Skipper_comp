/**
 * Step diagrams for the nine essential knots.
 *
 * Topology follows the published end-methods, not a guessed sketch:
 * - Bowline: rabbit / ABOK #1010 (tail finishes inside the eye)
 * - Cleat hitch: full turn, two figure-eights, one locking hitch
 * - Figure-eight stopper: ABOK #520 (one extra half-turn vs an overhand)
 * - Clove hitch: end method, tuck under the crossing
 * - Round turn and two half hitches: ABOK #1720 (both hitches the same way)
 * - Sheet bend: ABOK #1431 direct (both short ends on the same side)
 * - Rolling hitch: ABOK #1735 rope-to-rope (second turn between the first and the standing part)
 * - Reef knot: ABOK #1402 (second half opposite the first; tails beside their own standing parts)
 * - Constrictor: ABOK #1249 (working end under the riding turn and the standing part)
 *
 * A later segment is drawn on top of an earlier one. That is the only over/under.
 */
import fs from "fs";
import path from "path";

const outDir = path.resolve("public/knowledge/illustrations");
const NAVY = "#1b3a4b";
const ROPE = "#c4a36a";
const EDGE = "#8a5a2b";
const TEAL = "#2f7c86";
const TEAL_E = "#1a4c54";
const WOOD = "#d5dee7";
const WOOD_E = "#5c6b7a";
const ARROW = "#1f4e79";
const HOST = "#6a5b4e";
const HOST_E = "#3e342c";
const THICK = "#8d5a3c";
const THICK_E = "#5c3a24";

function svg(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="460" viewBox="0 0 1280 460">
  <rect width="1280" height="460" fill="#f4f1ea"/>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 1.4 L 9 5 L 0 8.6 z" fill="${ARROW}"/>
    </marker>
  </defs>
  ${body}
</svg>`;
}

function rope(d, color = ROPE, edge = EDGE, w = 15, over = false) {
  const halo = over
    ? `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w + 9}" stroke-linecap="round" stroke-linejoin="round"/>`
    : "";
  return `${halo}<path d="${d}" fill="none" stroke="${edge}" stroke-width="${w + 3.5}" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function dot(x, y) {
  return `<circle cx="${x}" cy="${y}" r="7" fill="${NAVY}" stroke="#fff" stroke-width="2"/>`;
}
function num(n, x, y) {
  return `<circle cx="${x}" cy="${y}" r="15" fill="${NAVY}"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="#fff">${n}</text>`;
}
function frame(i) {
  const x = 14 + i * 316;
  return `<rect x="${x}" y="12" width="304" height="436" rx="16" fill="#fff" stroke="#e4dfd6"/>${num(i + 1, x + 28, 36)}`;
}
function g(i, inner) {
  return `<g transform="translate(${14 + i * 316} 0)">${inner}</g>`;
}
function arrow(d) {
  return `<path d="${d}" fill="none" stroke="${ARROW}" stroke-width="2.2" marker-end="url(#arr)"/>`;
}
function rail(y = 168) {
  return `<rect x="28" y="${y}" width="248" height="34" rx="17" fill="${WOOD}" stroke="${WOOD_E}" stroke-width="2.5"/>`;
}

function panels(drawers) {
  return svg(drawers.map((_, i) => frame(i)).join("") + drawers.map((fn, i) => g(i, fn())).join(""));
}

function bowline() {
  // Open bowline before it is dressed hard. Same hole in every panel.
  // Standing part (the tree) is the vertical. The nipping loop's outgoing
  // side lies on top of the tree. The tail returns down the same hole.
  const tree = "M 148 62 L 148 168";
  const loopFar = "M 148 168 C 148 252 268 246 262 164 C 256 112 196 96 164 132";
  const loopNear = "M 170 124 C 150 154 142 186 124 214";
  const eye = "M 124 214 L 108 300 C 96 392 248 404 244 300";
  const upThrough = "M 244 300 C 228 246 176 196 156 156 L 162 92";
  const collar = "M 162 92 C 138 58 72 74 68 128 C 64 170 102 188 132 162";
  const tail = "M 132 162 C 148 186 156 206 160 236 L 156 348";
  const treeCover = "M 148 78 L 148 128";

  return panels([
    () => `
      ${rope(loopFar)}
      ${rope(tree)}
      ${rope(loopNear, ROPE, EDGE, 15, true)}
      ${rope(eye + " L 214 348")}
      ${dot(214, 348)}
      ${arrow("M 236 318 C 268 260 230 188 196 162")}
    `,
    () => `
      ${rope(loopFar)}
      ${rope(eye)}
      ${rope(upThrough)}
      ${rope(tree)}
      ${rope(loopNear, ROPE, EDGE, 15, true)}
      ${dot(162, 92)}
      ${arrow("M 148 78 C 96 64 70 108 86 146")}
    `,
    () => `
      ${rope(loopFar)}
      ${rope(collar)}
      ${rope(treeCover, ROPE, EDGE, 15, true)}
      ${rope(eye)}
      ${rope(upThrough)}
      ${rope(tree)}
      ${rope(loopNear, ROPE, EDGE, 15, true)}
      ${dot(78, 146)}
      ${arrow("M 96 168 C 130 198 150 184 156 164")}
    `,
    () => `
      ${rope(loopFar)}
      ${rope(collar)}
      ${rope(treeCover, ROPE, EDGE, 15, true)}
      ${rope(tail)}
      ${rope(eye)}
      ${rope(upThrough)}
      ${rope(tree)}
      ${rope(loopNear, ROPE, EDGE, 15, true)}
      ${dot(156, 348)}
    `,
  ]);
}

function figureEight() {
  // 1 loop with the working end over the standing part
  // 2 around and under the standing part
  // 3 through the original loop
  // 4 dressed flat 8, ends leave opposite ways
  const stand = "M 26 214 L 196 214";
  const loop = "M 132 214 C 132 308 268 316 274 228 C 280 156 214 142 176 176";
  const over = "M 176 176 C 150 200 142 196 156 168";
  const under = "M 156 168 C 118 132 46 138 40 196 C 34 262 86 294 128 262";
  const through = "M 128 262 C 156 236 178 198 196 158";
  // Dressed flat 8: two loops, one waist crossing, working end leaves the bottom.
  const eight = "M 155 430 C 155 423.3 164.2 401.7 155 390 C 145.8 378.3 114.2 373.3 100 360 C 85.8 346.7 73.3 326.7 70 310 C 66.7 293.3 71.7 272.5 80 260 C 88.3 247.5 105.8 236.7 120 235 C 134.2 233.3 151.7 252.5 165 250 C 178.3 247.5 187.5 233.3 200 220 C 212.5 206.7 235 188.3 240 170 C 245 151.7 240 125.8 230 110 C 220 94.2 198.3 80 180 75 C 161.7 70 136.7 72.5 120 80 C 103.3 87.5 85 105 80 120 C 75 135 81.7 156.7 90 170 C 98.3 183.3 117.5 190 130 200 C 142.5 210 151.7 218.3 165 230 C 178.3 241.7 197.5 253.3 210 270 C 222.5 286.7 241.7 310.8 240 330 C 238.3 349.2 213.3 371.7 200 385 C 186.7 398.3 166.7 405.8 160 410";

  return panels([
    () => `
      ${rope(stand)}
      ${rope(loop)}
      ${rope(over, ROPE, EDGE, 15, true)}
      ${dot(156, 168)}
      ${arrow("M 132 150 C 70 132 36 168 42 206")}
    `,
    () => `
      ${rope(loop)}
      ${rope(over, ROPE, EDGE, 15, true)}
      ${rope(under)}
      ${rope(stand, ROPE, EDGE, 15, true)}
      ${dot(128, 262)}
      ${arrow("M 168 214 C 156 188 140 196 132 230")}
    `,
    () => `
      ${rope(loop)}
      ${rope(under)}
      ${rope(through)}
      ${rope(stand, ROPE, EDGE, 15, true)}
      ${rope(over, ROPE, EDGE, 15, true)}
      ${dot(196, 158)}
    `,
    () => `
      ${rope(eight)}
      ${dot(160, 410)}
    `,
  ]);
}

function cleat() {
  // Top view. Horns are drawn after the rope that passes behind them,
  // and the figure-eight crossings are drawn after the horns.
  const base = `<rect x="104" y="186" width="96" height="36" rx="8" fill="${WOOD}" stroke="${WOOD_E}" stroke-width="2.5"/>`;
  const horns = `<rect x="86" y="128" width="40" height="152" rx="18" fill="${WOOD}" stroke="${WOOD_E}" stroke-width="2.5"/>
    <rect x="178" y="128" width="40" height="152" rx="18" fill="${WOOD}" stroke="${WOOD_E}" stroke-width="2.5"/>`;
  // Full turn around the base: in at the top, once around, out at the bottom.
  const turn = "M 176 56 L 176 150 C 214 156 236 174 236 204 C 236 242 196 258 152 258 C 100 258 72 232 72 200 C 72 164 112 146 156 150";
  const out1 = "M 156 150 C 148 168 140 210 128 268 L 112 372";
  // First figure-8: across the top to the far horn, around that horn.
  const cross1 = "M 128 268 C 150 230 196 214 228 176";
  const aroundFar = "M 228 176 C 262 156 270 196 248 214 C 232 228 214 210 206 192";
  // Second figure-8 back across, around the near horn.
  const cross2 = "M 206 192 C 176 214 132 196 104 164";
  const aroundNear = "M 104 164 C 70 146 62 186 84 206 C 100 220 118 202 126 184";
  // Locking hitch: underhand loop dropped over the near horn, tail under the last cross.
  const lock = "M 126 184 C 150 210 168 196 154 168 C 142 144 108 150 102 176 C 96 202 118 214 136 200";
  const lockTail = "M 136 200 C 148 188 142 168 124 176 L 108 250";

  return panels([
    () => `
      ${rope(turn)}
      ${rope(out1)}
      ${base}${horns}
      ${dot(112, 372)}
      ${arrow("M 96 330 C 70 270 110 230 150 210")}
    `,
    () => `
      ${rope(turn)}
      ${rope(out1.split(" L ")[0])}
      ${rope(aroundFar)}
      ${base}${horns}
      ${rope(cross1, ROPE, EDGE, 15, true)}
      ${dot(206, 192)}
      ${arrow("M 236 230 C 180 250 120 210 96 176")}
    `,
    () => `
      ${rope(turn)}
      ${rope("M 156 150 C 148 168 140 210 128 250")}
      ${rope(aroundFar)}
      ${rope(aroundNear)}
      ${base}${horns}
      ${rope(cross1, ROPE, EDGE, 15, true)}
      ${rope(cross2, ROPE, EDGE, 15, true)}
      ${dot(126, 184)}
      ${arrow("M 150 150 C 170 130 150 112 124 124")}
    `,
    () => `
      ${rope(turn)}
      ${rope("M 156 150 C 148 168 140 210 128 250")}
      ${rope(aroundFar)}
      ${rope(aroundNear)}
      ${rope(lockTail)}
      ${base}${horns}
      ${rope(cross1, ROPE, EDGE, 15, true)}
      ${rope(cross2, ROPE, EDGE, 15, true)}
      ${rope(lock, ROPE, EDGE, 15, true)}
      ${dot(108, 250)}
    `,
  ]);
}

function clove() {
  // End method on a rail. Second turn same direction. Tuck under the cross.
  const behind1 = "M 108 168 C 108 118 158 116 160 168";
  const behind2 = "M 176 168 C 176 118 226 116 228 168";
  const stand = "M 108 400 L 108 202";
  const down1 = "M 160 202 L 160 248";
  const cross = "M 160 248 C 188 292 206 270 214 214";
  const down2 = "M 228 202 L 214 268";
  const tuck = "M 214 268 C 188 300 150 286 132 250";

  return panels([
    () => `
      ${rope(behind1)}
      ${rope(stand)}
      ${rope(down1 + " L 214 340")}
      ${rail()}
      ${dot(214, 340)}
      ${arrow("M 196 300 C 160 270 130 250 118 230")}
    `,
    () => `
      ${rope(behind1)}
      ${rope(behind2)}
      ${rope(stand)}
      ${rope(down1)}
      ${rail()}
      ${rope(cross, ROPE, EDGE, 15, true)}
      ${rope("M 214 214 L 228 168")}
      ${dot(220, 190)}
      ${arrow("M 250 150 C 250 190 236 210 228 214")}
    `,
    () => `
      ${rope(behind1)}
      ${rope(behind2)}
      ${rope(stand)}
      ${rope(down1)}
      ${rope(down2 + " L 200 330")}
      ${rail()}
      ${rope(cross, ROPE, EDGE, 15, true)}
      ${dot(200, 330)}
      ${arrow("M 176 360 C 150 330 140 300 148 270")}
    `,
    () => `
      ${rope(behind1)}
      ${rope(behind2)}
      ${rope(tuck + " L 168 400")}
      ${rope(stand)}
      ${rope(down1)}
      ${rope("M 228 202 L 214 248")}
      ${rail()}
      ${rope(cross, ROPE, EDGE, 15, true)}
      ${dot(168, 400)}
    `,
  ]);
}

function roundTurn() {
  // Two full turns, then two half hitches the same way around the standing part.
  const arc = (x1, x2) => `M ${x1} 168 C ${x1} 116 ${x2} 114 ${x2} 168`;
  const leg = (x, y1, y2) => `M ${x} ${y1} L ${x} ${y2}`;
  // Each hitch is a loop around the standing part (x=100): back half, then the
  // standing part, then the front half. Both hitches turn the same way.
  const hitchBack = (y) => `M 168 ${y} C 168 ${y - 36} 28 ${y - 28} 30 ${y + 36} C 32 ${y + 92} 110 ${y + 96} 140 ${y + 62}`;
  const hitchFront = (y) => `M 140 ${y + 62} C 186 ${y + 36} 198 ${y + 4} 168 ${y - 8}`;

  return panels([
    () => `
      ${rope(arc(116, 168))}
      ${rope(leg(116, 390, 202))}
      ${rope(leg(168, 202, 300))}
      ${rail(168)}
      ${dot(168, 300)}
      ${arrow("M 196 250 C 220 200 210 160 188 150")}
    `,
    () => `
      ${rope(arc(100, 148))}
      ${rope(arc(164, 214))}
      ${rope(leg(100, 400, 202))}
      ${rope(leg(214, 202, 286))}
      ${rail(168)}
      ${dot(214, 286)}
      ${arrow("M 230 310 C 200 340 150 330 130 300")}
    `,
    () => `
      ${rope(arc(100, 148))}
      ${rope(arc(164, 214))}
      ${rope(hitchBack(230))}
      ${rope(leg(100, 420, 202), ROPE, EDGE, 15, true)}
      ${rope(hitchFront(230), ROPE, EDGE, 15, true)}
      ${rope("M 214 202 C 214 230 190 240 168 230")}
      ${rail(168)}
      ${dot(168, 222)}
      ${arrow("M 150 250 C 120 280 90 270 70 250")}
    `,
    () => `
      ${rope(arc(100, 148))}
      ${rope(arc(164, 214))}
      ${rope(hitchBack(214))}
      ${rope(hitchBack(310))}
      ${rope(leg(100, 450, 202), ROPE, EDGE, 15, true)}
      ${rope(hitchFront(214), ROPE, EDGE, 15, true)}
      ${rope(hitchFront(310) + " L 150 430", ROPE, EDGE, 15, true)}
      ${rope("M 214 202 C 200 214 180 214 168 214")}
      ${rail(168)}
      ${dot(150, 430)}
    `,
  ]);
}

function sheetBend() {
  // Direct sheet bend. Bight in the thicker rope opens to the right.
  // Thin rope through the bight, around behind both legs, tucked under itself.
  // Both short ends finish on the left.
  const bight = "M 36 156 L 176 156 C 236 156 236 292 176 292 L 36 292";
  const through = "M 286 220 L 115 220";
  const around = "M 115 220 C 70 220 18 155 38 168 C 8 215 18 285 58 312 C 100 340 145 292 160 262";
  const tuck = "M 160 262 L 36 198";
  const A = (d, over = false) => rope(d, THICK, THICK_E, 18, over);
  const B = (d, over = false) => rope(d, TEAL, TEAL_E, 12, over);

  return panels([
    () => `
      ${A(bight)}
    `,
    () => `
      ${A(bight)}
      ${B(through)}
      ${dot(108, 224)}
      ${arrow("M 88 200 C 40 170 24 200 36 230")}
    `,
    () => `
      ${B(around)}
      ${A(bight, true)}
      ${B(through)}
      ${dot(160, 262)}
      ${arrow("M 168 250 C 150 220 140 210 124 206")}
    `,
    () => `
      ${B(around)}
      ${B(tuck)}
      ${A(bight, true)}
      ${B(through, true)}
      ${dot(36, 198)}
    `,
  ]);
}

function rolling() {
  // ABOK #1735. The arrow is the pull. Two turns step toward that pull;
  // the second lies between the first and the standing part. The half hitch
  // is on the opposite side and turns the same way as a clove hitch.
  const host = () => rope("M 16 196 L 288 196", HOST, HOST_E, 22);
  const T = (d, over = false) => rope(d, TEAL, TEAL_E, 13, over);
  const arch = (x) => `M ${x} 180 C ${x} 138 ${x + 44} 136 ${x + 46} 180`;
  const hook = (x) => `M ${x + 46} 212 C ${x + 46} 252 ${x} 254 ${x + 8} 212`;
  const stand = "M 188 230 C 220 268 246 310 278 340";
  const hitchBack = "M 86 180 C 86 136 28 134 26 180";
  const hitchFront = "M 26 212 C 26 258 78 264 88 224";
  const hitchTuck = "M 88 224 C 96 200 78 186 62 198 L 52 262";

  return panels([
    () => `
      ${T(arch(118))}
      ${host()}
      ${T(hook(118))}
      ${T("M 126 212 L 150 320")}
      ${T(stand)}
      ${dot(150, 320)}
      ${arrow("M 236 318 L 286 318")}
    `,
    () => `
      ${T(arch(104))}
      ${T(arch(148))}
      ${host()}
      ${T(hook(104))}
      ${T(hook(148), true)}
      ${T("M 112 212 C 96 250 84 290 78 332")}
      ${T(stand)}
      ${dot(78, 332)}
      ${arrow("M 236 318 L 286 318")}
    `,
    () => `
      ${T(hitchBack)}
      ${T(arch(124))}
      ${T(arch(168))}
      ${host()}
      ${T(hitchFront)}
      ${T("M 88 224 L 70 300")}
      ${T(hook(124))}
      ${T(hook(168), true)}
      ${T(stand)}
      ${dot(70, 300)}
      ${arrow("M 236 318 L 286 318")}
    `,
    () => `
      ${T(hitchBack)}
      ${T(hitchTuck)}
      ${T(arch(124))}
      ${T(arch(168))}
      ${host()}
      ${T(hitchFront, true)}
      ${T(hook(124))}
      ${T(hook(168), true)}
      ${T(stand)}
      ${dot(52, 262)}
      ${arrow("M 236 318 L 286 318")}
    `,
  ]);
}

function reef() {
  // Left over right and under, then right over left and under.
  // Dressed flat: each tail returns beside its own standing part.
  const L = (d) => rope(d, ROPE, EDGE, 14);
  const R = (d) => rope(d, TEAL, TEAL_E, 14);
  // Step 1: left end laid over the right end.
  const rightDown = "M 214 70 L 214 188 C 214 230 120 236 104 280 L 96 390";
  const leftOver = "M 90 70 L 90 188 C 90 222 150 214 186 248 L 196 390";
  // Step 2: left end has tucked under, so the ends have swapped.
  const halfL = "M 90 70 L 90 176 C 90 214 150 200 176 230 C 196 254 186 286 160 286 L 150 390";
  const halfR = "M 214 70 L 214 176 C 214 230 130 250 112 286 L 104 390";
  // Step 3: the end now on the right crosses back over the other way.
  const backOver = "M 150 286 C 176 304 210 292 214 262 C 218 232 176 214 150 236";
  // Step 4: flat square. Each rope returns beside its own standing part.
  // Gold's top strand lies over the teal; teal's lower strand lies over the gold return.
  const leftFlat = "M 50 40 C 50 60.8 21.7 144.2 50 165 C 78.3 185.8 190 158.3 220 165 C 250 171.7 252.5 197.5 230 205 C 207.5 212.5 109.2 172.5 85 210 C 60.8 247.5 85 393.3 85 430";
  const rightUnder = "M 250 40 C 250 64.2 284.2 160.3 250 185 C 215.8 209.7 80 177.5 45 188";
  const rightOver = "M 45 188 C 10 198.5 11.7 237.3 40 248 C 68.3 258.7 185.8 221.7 215 252 C 244.2 282.3 215 400.3 215 430";

  return panels([
    () => `
      ${R(rightDown)}
      ${rope(leftOver, ROPE, EDGE, 14, true)}
      ${dot(196, 390)}
      ${arrow("M 176 330 C 140 300 120 280 108 268")}
    `,
    () => `
      ${R(halfR)}
      ${L(halfL)}
      ${dot(150, 390)}
      ${arrow("M 176 340 C 210 300 220 270 200 250")}
    `,
    () => `
      ${R(halfR)}
      ${L(halfL)}
      ${rope(backOver, ROPE, EDGE, 14, true)}
      ${dot(150, 236)}
      ${arrow("M 132 220 C 110 240 104 268 112 286")}
    `,
    () => `
      ${rope(rightUnder, TEAL, TEAL_E, 14)}
      ${rope(leftFlat, ROPE, EDGE, 14, true)}
      ${rope(rightOver, TEAL, TEAL_E, 14, true)}
      ${dot(226, 400)}
    `,
  ]);
}

function constrictor() {
  // Starts as a clove. The last tuck goes under the riding turn AND the standing part.
  const behind1 = "M 104 168 C 104 116 156 114 160 168";
  const behind2 = "M 178 168 C 178 116 232 114 234 168";
  const stand = "M 104 408 L 104 202";
  const down1 = "M 160 202 L 160 246";
  const cross = "M 160 246 C 192 292 214 268 222 210";
  const down2 = "M 234 202 L 214 300";
  // Over the standing part, then under both the cross and the standing part.
  const overStand = "M 214 300 C 180 336 130 328 112 292";
  const underBoth = "M 112 292 C 96 262 108 232 132 228 C 156 224 168 246 156 268 L 148 330";

  return panels([
    () => `
      ${rope(behind1)}
      ${rope(stand)}
      ${rope(down1 + " L 210 340")}
      ${rail()}
      ${dot(210, 340)}
      ${arrow("M 188 300 C 150 270 124 250 112 228")}
    `,
    () => `
      ${rope(behind1)}
      ${rope(behind2)}
      ${rope(stand)}
      ${rope(down1)}
      ${rail()}
      ${rope(cross, ROPE, EDGE, 15, true)}
      ${rope("M 222 210 L 234 168")}
      ${dot(228, 188)}
      ${arrow("M 258 150 C 258 196 244 214 234 214")}
    `,
    () => `
      ${rope(behind1)}
      ${rope(behind2)}
      ${rope(overStand)}
      ${rope(underBoth)}
      ${rope(stand, ROPE, EDGE, 15, true)}
      ${rope(down1)}
      ${rope("M 234 202 L 214 250")}
      ${rail()}
      ${rope(cross, ROPE, EDGE, 15, true)}
      ${dot(148, 330)}
      ${arrow("M 132 360 C 120 330 124 300 136 276")}
    `,
    () => `
      ${rope(behind1)}
      ${rope(behind2)}
      ${rope(overStand)}
      ${rope(underBoth + " L 168 400")}
      ${rope(stand, ROPE, EDGE, 15, true)}
      ${rope(down1)}
      ${rope("M 234 202 C 220 230 200 242 184 246 L 176 400")}
      ${rail()}
      ${rope(cross, ROPE, EDGE, 15, true)}
      ${dot(168, 400)}
    `,
  ]);
}

const files = {
  "knot-bowline.svg": bowline(),
  "knot-figure-eight.svg": figureEight(),
  "knot-cleat-hitch.svg": cleat(),
  "knot-clove-hitch.svg": clove(),
  "knot-round-turn.svg": roundTurn(),
  "knot-sheet-bend.svg": sheetBend(),
  "knot-rolling-hitch.svg": rolling(),
  "knot-reef-knot.svg": reef(),
  "knot-constrictor.svg": constrictor(),
};

fs.mkdirSync(outDir, { recursive: true });
for (const [name, data] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, name), data);
  console.log(name);
}
