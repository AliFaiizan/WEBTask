import React from 'react'
import Image from 'next/image'
import styles from "@/styles/[id].module.css"

const Movie = ({data}:any) => {
    const {Poster,Title,Plot} = data;
    console.log(data)
  return (
    <div>
      <div className={styles.bannerDark}></div>
      <Image
        className={styles.banner}
        src={Poster}
        alt="Picture of the poster"
        width={1000}
        height={1000}
      />
      <div className={styles.bannerContent}>
        <div>
          <Image
            src={Poster}
            alt="Picture of the poster"
            width={300}
            height={400}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.bannerButton}>Play</button>
            <button className={styles.bannerButton}>My List</button>
          </div>
        </div>
        <div className={styles.bannerText}>
          <div>
            <h1>{data.Title}</h1>
            <div className={styles.type}>{data.Type}</div>
            <div className={styles.subTitle}>
              <p> {data.Released} </p> | <p> {data.Genre} </p> |
              <p> {data.Runtime} </p>
            </div>
          </div>
          <br />
          <b>PLOT</b>
          <hr />
          <p className={styles.plot}>{data.Plot}</p>
          <b>CAST & CREW</b>
          <hr />
          <div className={styles.castCrew}>
            <div>
              <b>Cast</b>
              {data.Actors?.split(",").map((actor: any) => (
                <p key={actor}>{actor}</p>
              ))}
            </div>
            <div>
              <b>Writer</b>
              {data.Writer?.split(",").map((writer: any) => (
                <p key={writer}>{writer}</p>
              ))}
            </div>
            <div>
              <b>Director</b>
              {data.Director?.split(",").map((director: any) => (
                <p key={director}>{director}</p>
              ))}
            </div>
          </div>
          <b>AWARDS AND RATINGS</b>
          <hr />
          <br />
          <div className={styles.awardRating}>
            <div>
              <b>AWARDS</b>
              <p>{data.Awards}</p>
            </div>
            <div>
              <b>Writer</b>
              {data.Writer?.split(",").map((writer: any) => (
                <p key={writer}>{writer}</p>
              ))}
            </div>
            <div>
              <b>Director</b>
              {data.Director?.split(",").map((director: any) => (
                <p key={director}>{director}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;

export async function getServerSideProps(context:any) {
    const {id} = context.query;
    const res = await fetch(`http://www.omdbapi.com/?apikey=dfa8820e&i=${id}&plot=full`);
    const data = await res.json();
    return {
        props: {data},
    }
}