"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PlayerDetails from "../PlayerDetails";
import PlayerPicture from "../PlayerPicture";

import styles from "./carousel.module.scss";

import { IPlayerData } from "@/interfaces/players";

interface IProps{
  players: IPlayerData[];
  activeId: string;
}



enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

export default function Carousel({ players, activeId }: IProps){
  //Controla os itens visíveis do carrossel
  const [visibleItems, setVisibleItems] = useState<IPlayerData[] | null>(null);
  
  // Armazena o item ativo do carrossel
  const [activeIndex, setActiveIndex] = useState(
    players.findIndex((player) => player.id === activeId) - 1
  );

  // Altera o visibleItems sempre que o activeIndex é alterado
useEffect(() => {
  // itens que serão mostrados ao longo do carrossel
  const items = [...players];

  // calcula o índice do array de acordo com o item ativo
  // de forma que o número nunca saia do escopo do array
  const indexInArrayScope =
    ((activeIndex % items.length) + items.length) % items.length;

  // itens que estão visíveis neste momento para o usuário
  // duplicamos o array para dar a impressão de um carrossel infinito (360deg)
  const visibleItems = [...items, ...items].slice(
    indexInArrayScope,
    indexInArrayScope + 3
  );

  setVisibleItems(visibleItems);
}, [players, activeIndex]);

//Altera o fundo da página de acordo com o jogador selecionado
useEffect(() => {
  const htmlEl = document.querySelector("html");

  if (!htmlEl || !visibleItems){
    return;
  }

  const currentPlayerId = visibleItems[1].id;
  htmlEl.style.backgroundImage = `url("/players/${currentPlayerId}-background.jpg")`;
  htmlEl.classList.add("player-page");

  //remove a classe quando o componente é desmontado
  return() =>{
    htmlEl.classList.remove("player-page")
  }
}, [visibleItems]);

// Altera jogador ativo no carrossel
  // +1 rotaciona no sentido horário
  // -1 rotaciona no sentido anti-horário
  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

if (!visibleItems) {
  return null;
}
  
  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div 
          className={styles.wrapper}
          onClick={() => handleChangeActiveIndex(1)}>
            <AnimatePresence mode="popLayout">
              {visibleItems?.map((item, position) => (
                <motion.div 
                key={item.id} 
                className={styles.player}
                transition={{ duration:0.8 }}
                initial={{
                  x: -1500,
                  scale: 0.75,
                }}
                animate={{x:0, ...getItemStyles(position) }}
                exit={{
                  x:0,
                  left:"-20%",
                  opacity:0,
                  scale:1
                }}
                >
                  <PlayerPicture player={item} />
                </motion.div>
              ))}
            </AnimatePresence>
        </div>
      </div>
      <motion.div 
      className={styles.details}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 2 }}
      >
        <PlayerDetails data={visibleItems[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

// estilos para o item que está visível na animação
// dependendo da posição do herói no carrossel
const getItemStyles = (position: enPosition) => {
  if (position === enPosition.FRONT) {
    return {
      filter: "blur(10px)",
      scale: 1.2,
      zIndex: 3,
    };
  }

  if (position === enPosition.MIDDLE) {
    return {
      left: 300,
      scale: 0.8,
      top: "-10%",
      zIndex: 2,
    };
  };

  return {
    filter: "blur(10px)",
    scale: 0.6,
    left: 160,
    opacity: 0.8,
    zIndex: 1,
    top: "-20%",
  };
};