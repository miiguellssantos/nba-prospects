"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import PlayerPicture from "../PlayerPicture";

import styles from "./playersList.module.scss";

import  { nbaFont } from "@/fonts";
import { IPlayerData } from "@/interfaces/players";

interface IProps{
  players : IPlayerData[];
}

export default function PlayersList({ players }: IProps){
  return (
    <>
      <motion.h1 className={`${nbaFont.className} ${styles.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay:2, duration: 2 }}>
        Jogadores
      </motion.h1>
      <motion.section className={styles.players}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}>
        {players.map((player) => (
          <motion.div
            key={player.id}
            className={`${styles.imageContainer} ${styles[player.id]}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Link href={`/player/${player.id}`}>
              <PlayerPicture player={player} />
            </Link>
            
          </motion.div>
        ))}
      </motion.section>
    </>
  )
}