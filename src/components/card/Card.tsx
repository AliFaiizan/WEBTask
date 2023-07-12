import React from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import styles from './Card.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

type CardProps = {
  poster:string,
  title:string,
  type:string,
  year:string,
  imdbID:string
}

const Card: React.FC<CardProps> = ({poster,title,type,year,imdbID}:CardProps) => {
  return (
    <Link href={"/"} className={styles.card}>
      <Image
        src={poster}
        width={300}
        height={450}
        alt="Card Image"
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardRuntime}>{year}</p>
      </div>
    </Link>
  );
};



export default Card;