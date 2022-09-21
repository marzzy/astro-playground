import { useEffect } from "react";

// import { Debug } from 'astro/components';
const answer = {
  y1: "number",
  y2: "number",
  theX: "number"
}
// input: cx, cy, r
// output: the arrays of points: [[x1,y1], [x2,y2], ...]
function calculateThePointsData(cx:number, cy:number, r:number, numberOfPoints:number) {
  // cx-r=<h=<cx+r => 50<h<150
  // d = (end-begin)/n = 2r/n => 150-50/4 = 25 => h = 125, 150
  // (x-cx)^2+(y-cy)^2=r^2 => x^2 + cx^2 -2cx*x + y^2 + cy^2 - 2cy*y - r^2 = 0
  // moadele daraje 2 e => a = 1, b = -2cy, c= x^2 + cx^2 -2cx*x - r^2 +cy^2
  // delta = b^2-4ac & y = (-b+/-sqr(delta))/(2a)
  let points = [];
  let lastX = cx;
  const distanceBetweenX = (2 * r) / numberOfPoints;
  for (; lastX + distanceBetweenX <= cx + r; ) {
    lastX += distanceBetweenX;
    points.push(lastX);
  }
  points.map((theX) => {
    let a = 1;
    let c = (theX ^ 2) + (cx ^ 2) - 2 * cx * theX - (r ^ 2) + (cy ^ 2);
    let b = cy * -2;
    let delta = (b ^ 2) - 4 * a * c;
    let y1 = (b * -1 + Math.sqrt(delta)) / (2 * a);
    let y2 = (b * -1 - Math.sqrt(delta)) / (2 * a);
    console.log(y1, y2, theX);
    return {y1, y2, theX};
  });

  return { y1: 0, y2:0, theX:0 };

}

export default function MyPolygan() {
  const BoxSize = 200;
  const sideSize = BoxSize / 2;
  const r = BoxSize / 4;

  // const numberOfPoints =
  // calculateThePointsData(0, 0, r, 4);
  // <Debug answer={calculateThePointsData(0, 0, r, 4)} />

  return (
		<>
			<svg
				viewBox={`${sideSize * -1} ${sideSize * -1} ${BoxSize} ${BoxSize}`}
				height={BoxSize}
				width={BoxSize}
				fill="transparent"
			>
				<circle cx="0" cy="0" r={r} stroke="black" />
				<circle cx="0" cy="0" r="2" stroke="red" />
			</svg>
		</>
  );
}
