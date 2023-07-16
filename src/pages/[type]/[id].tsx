import React from 'react'
import Image from 'next/image'
import styles from "@/styles/Detail.module.css"

type MovieProps= {
    data:{
    Poster:string,
    Title:string,
    Plot:string,
    Type:string,
    Released:string,
    Genre:string,
    Runtime:string,
    imdbRating:string,
    imdbVotes:string,
    imdbID:string,
    Metascore:string,
    Actors:string,
    Director:string,
    Writer:string,
    Language:string,
    Country:string,
    Awards:string,
    BoxOffice:string,
    }   
}

const Movie = ({data}:MovieProps) => {
    const {Poster="",Title,Plot,Type,Released,Genre,Runtime,imdbRating,Metascore,imdbVotes,Actors,Director,Writer,Language,Country,Awards,BoxOffice} = data;
  return (
    <div>
      <div className={styles.bannerDark}></div>
      <Image
        className={styles.banner}
        src={Poster !== "N/A" ? Poster : "/movie-placeholder.jpg"}
        alt="Picture of the poster"
        width={1000}
        height={1000}
      />
      <div className={styles.bannerContent}>
        <div>
          <Image
            src={Poster !== "N/A" ? Poster : "/movie-placeholder.jpg"}
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
            <h1>{Title}</h1>
            <div className={styles.type}>{Type}</div>
            <div className={styles.subTitle}>
              <p> {Released} </p> | <p> {Genre} </p> |<p> {Runtime} </p>
            </div>
          </div>
          <br />
          <b>PLOT</b>
          <hr />
          <p className={styles.plot}>{Plot}</p>
          <b>CAST & CREW</b>
          <hr />
          <div className={styles.castCrew}>
            <div>
              <b>Cast</b>
              {Actors?.split(",").map((actor: any) => (
                <p key={actor}>{actor}</p>
              ))}
            </div>
            <div>
              <b>Writer</b>
              {Writer?.split(",").map((writer: any) => (
                <p key={writer}>{writer}</p>
              ))}
            </div>
            <div>
              <b>Director</b>
              {Director?.split(",").map((director: any) => (
                <p key={director}>{director}</p>
              ))}
            </div>
          </div>
          <b>AWARDS AND RATINGS</b>
          <hr />
          <div className={styles.awardRating}>
            <div>
              <b>AWARDS</b>
              <p>{Awards}</p>
            </div>
            <div>
              <b>Meta Score</b>
              <p>{Metascore}</p>
            </div>
            <div>
              <b>imdbRating</b>
              <p>{imdbRating}</p>
            </div>
            <div>
              <b>imdbVotes</b>
              <p>{imdbVotes}</p>
            </div>
          </div>
          <b>INFORMATION</b>
          <hr />
          <div className={styles.awardRating}>
            <div>
              <b>Box Office</b>
              <p>{BoxOffice}</p>
            </div>
            <div>
              <b>Language</b>
              <p>{Language}</p>
            </div>
            <div>
              <b>Country</b>
              <p>{Country}</p>
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