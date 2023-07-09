import Carousel from "@/components/Carousel";
import { IPlayerData } from "@/interfaces/players";

interface IProps {
  params: {
    id: string;
  };
}

async function getData(): Promise<{ data: IPlayerData[] }> {
  const res = await fetch("http://localhost:3000/api/players");

  if (!res.ok) {
    throw new Error("Falha ao buscar jogadores.");
  }

  return res.json();
}

export default async function Player({ params: { id } }: IProps) {
  const res = await getData();

  return <Carousel players={res.data} activeId={id} />;
}