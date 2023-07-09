import styles from "./page.module.scss";

import PlayersList from "@/components/PlayersList";
import { IPlayerData } from "@/interfaces/players";

async function getData(): Promise<{ data: IPlayerData[] }>{
  const res = await fetch("http://localhost:3000/api/players");

  if (!res.ok){
    throw new Error("Falha ao buscar jogadores.");
  }

  return res.json();
}

export default async function Home() {
  const res = await getData();
  
  return (
    <main className={styles.main}>
      <PlayersList players={res.data}/>
    </main>
  )
}
