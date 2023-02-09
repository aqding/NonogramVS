import { promises } from "fs";

export type Nonogram = {
  rows: number;
  columns: number;
  rowHints: Array<Array<number>>;
  colHints: Array<Array<number>>;
};

function extractValues(values: string): Array<Array<number>> {
  return values
    .split("\n")
    .filter((value) => value.length > 0)
    .map((values) => values.split(",").map((value) => parseInt(value)));
}

export async function parsePuzzle(filename: string): Promise<Nonogram> {
  const promise = promises.readFile(filename, { encoding: "utf-8" });
  const text = await promise;
  const regex =
    /width ([0-9]+)\nheight ([0-9]+)\n\nrows\n([\d\n,]*)\ncolumns\n([\d\n,]*)/;
  const values = text.match(regex);

  if (!values || values.length !== 5) {
    throw "Puzzle file format not valid";
  }
  const width = parseInt(values[1]);
  const height = parseInt(values[2]);
  const rowHints = extractValues(values[3]);
  const colHints = extractValues(values[4]);

  return {
    rows: width,
    columns: height,
    rowHints: rowHints,
    colHints: colHints,
  };
}
