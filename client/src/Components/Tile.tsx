import { SPACE } from "./Board";
import "./Tile.css";

type TileProps = {
  value: number;
};

const Tile = (props: TileProps) => {
  switch (props.value) {
    case SPACE.FILLED: {
      return <div className="filledTile"> .</div>;
    }

    case SPACE.X: {
      return <div className="xTile"> X</div>;
    }

    default: {
      return <></>;
    }
  }
};

export { Tile };
