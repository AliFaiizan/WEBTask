import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import styles from '@/styles/Search.module.css'
import { useSelector } from 'react-redux'
import { useActions } from '@/hooks/useActions'

import Card from '@/components/card/Card'


const inter = Inter({ subsets: ['latin'] })

export default function Search() {

  const router = useRouter();

  const [term, setTerm] = useState<string>(""); // search term
  const [currentpage, setCurrentPage] = useState<number>(1); // page number
  const [totalResults, setTotalResults] = useState<number>(10); // total results
  const { searchMovies } = useActions();   // we used this for fetching data from the api and setting the value in store
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //this is implemented with redux functionality otherwise we can use getServerSideProps as commented below
    searchMovies(term);
    router.replace(`/?term=${term}&page=${currentpage}`);
  }; 

  const {data,error,loading}= useSelector((state:any) => state.movies); // we used this for getting the data from the store

  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.search}
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              type="text"
              placeholder="Search Movies / TV Shows"
            />
          </form>
        </div>
        <div className={styles.moviesContainer}>
          {error && <h3>{error}</h3>}
          {loading && <h3>Loading...</h3>}
            {!error &&
              !loading &&
              data?.Search?.length===0? <h3>No results found.</h3> : data?.Search?.map(
                ({ imdbID, Poster, Title, Type, Year }: any) => (
                  <Card
                    key={imdbID}
                    poster={Poster}
                    title={Title}
                    type={Type}
                    year={Year}
                    imdbID={imdbID}
                  />
                )
              )}        
        </div>
      </main>
    </>
  );
}

// export async function getServerSideProps({ctx}:any) {

//   const {term,page} = ctx.query;
//   const res = await fetch(
//     `http://www.omdbapi.com/?apikey=dfa8820e&s=${term}&page=${page}`
//   );
//   const data = await res.json();

//   // const data = fetch("http://www.omdbapi.com/?s=batman&apikey=*******")
//   // .then((res) => res.json())
//   // .then((data) => data);

//   return {
//     props: {
//       data
//     },
//   };
// }
