import { SPACE } from "./Board";

type TileProps = {
  value: number;
};

const Tile = (props: TileProps) => {
  return (
    <div>
      {props.value !== SPACE.EMPTY ? (
        props.value === SPACE.FILLED ? (
          "."
        ) : (
          "X"
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export { Tile };
