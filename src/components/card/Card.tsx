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
    <div className={`${styles.card} ${inter.className}`}>
      <Link href={"/"}>
        <div>
          <Image
            src={
              poster === "N/A"
                ? "/movie-placeholder.jpg"
                : poster
            }
            width={300}
            height={400}
            alt="Card Image"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardRuntime}>{year}</p>
        </div>
      </Link>
    </div>
  );
};



export default Card;