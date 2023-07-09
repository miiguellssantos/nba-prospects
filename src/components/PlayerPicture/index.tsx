import Image, { StaticImageData} from "next/image";

import ImageWemby from "@public/players/VictorWembanyama.png";
import ImageBrandon from "@public/players/BrandonMiller.png";
import ImageScoot from "@public/players/ScootHenderson.png";
import {IPlayerData} from "@/interfaces/players";

const playersImage: Record<string, StaticImageData> = {
  "wemby" : ImageWemby,
  "brandon" : ImageBrandon,
  "scoot" : ImageScoot
}

interface IProps{
  player: IPlayerData;
}

export default function PlayerPicture({player} : IProps) {
  return(
    <Image
      src={playersImage[player.id] || ImageWemby}
      alt={`${player.name} (Posição-${player.position})` || ""}
      priority
    />  
  );
}