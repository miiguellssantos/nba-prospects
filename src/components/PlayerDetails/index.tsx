import { Quicksand } from "next/font/google";

import styles from "./playerDetails.module.scss";

import { nbaFont } from "@/fonts";
import { IPlayerData } from "@/interfaces/players";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface IProps {
  data: IPlayerData;
}

export default function PlayerDetails({ data }: IProps) {
  const { id, name, position, details } = data;

  return (
    <div className={quicksand.className}>
      <h1 className={`${nbaFont.className} ${styles.title}`}>
        {name} ({position})
      </h1>
      <div className={styles.details}>
        <h2 className={styles.subtitle}>Informações</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.label}>Idade</td>
              <td>{ details.age }</td>
            </tr>
            <tr>
              <td className={styles.label}>Atura</td>
              <td>{ details.height.toFixed(2) }m</td>
            </tr>
            <tr>
              <td className={styles.label}>Peso</td>
              <td>{ details.weight.toFixed(2) }kg</td>
            </tr>
            <tr>
              <td className={styles.label}>Envergadura</td>
              <td>{ details.wingspan.toFixed(2) }m</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}