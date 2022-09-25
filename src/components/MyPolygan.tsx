import React from "react";

function calculateThePointsData(r, minNumberOfPoints) {
  let positiveX = [];
  let standardMinNumberOfPoints =
    minNumberOfPoints <= 2 ? 2 : Math.ceil(minNumberOfPoints / 2);
  const distanceBetweenX = (2 * r) / standardMinNumberOfPoints;
  let lastX = r + distanceBetweenX;
  for (; lastX - distanceBetweenX >= 0; ) {
    lastX -= distanceBetweenX;
    positiveX.push(lastX);
  }
  const polyganPointsHelper = {
    coordinateArea1: [],
    coordinateArea2: [],
    coordinateArea3: [],
    coordinateArea4: []
  };
  const hashMapX = positiveX.reduce((theHashMap, theX) => {
    let theY = Math.round(Math.sqrt(Math.pow(r, 2) - Math.pow(theX, 2)));
    polyganPointsHelper.coordinateArea1.push(`${theX},${theY}`);
    polyganPointsHelper.coordinateArea2.unshift(`${-theX},${theY}`);
    polyganPointsHelper.coordinateArea3.push(`${-theX},${-theY}`);
    polyganPointsHelper.coordinateArea4.unshift(`${theX},${-theY}`);
    return theHashMap.set(theX, theY);
  }, new Map());
  const polyganPoints = new Set([
    ...polyganPointsHelper.coordinateArea1,
    ...polyganPointsHelper.coordinateArea2,
    ...polyganPointsHelper.coordinateArea3,
    ...polyganPointsHelper.coordinateArea4
  ]);
  return [positiveX, hashMapX, [...polyganPoints]];
}

export default function MyPolygan() {
  const BoxSize = 200;
  const sideSize = BoxSize / 2;
  const r = (BoxSize - 10) / 2;
  const [positiveX, hashMapX, polyganPoints] = calculateThePointsData(r, 10);

  return (
    <>
      <svg
        viewBox={`${-sideSize} ${-sideSize} ${BoxSize} ${BoxSize}`}
        fill="transparent"
      >
        {positiveX &&
          positiveX.map((x) => {
            const y = hashMapX.get(x);

            return (
              <>
                <circle cx={x} cy={y} r="1" stroke="red" />
                <circle cx={x} cy={-y} r="1" stroke="red" />
                <circle cx={-x} cy={y} r="1" stroke="red" />
                <circle cx={-x} cy={-y} r="1" stroke="red" />
              </>
            );
          })}
        {positiveX &&
          positiveX.map((x) => {
            return (
              <>
                <polygon points={polyganPoints} stroke="Orange" />
              </>
            );
          })}
      </svg>
    </>
  );
}
