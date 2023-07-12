import { useState } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Search.module.css'
import { useSelector } from 'react-redux'
import { useActions } from '@/hooks/useActions'

import Card from '@/components/card/Card'


const inter = Inter({ subsets: ['latin'] })

export default function Search() {

  const [term, setTerm] = useState<string>(""); // search term
  const { searchMovies } = useActions();   // we used this for fetching data from the api and setting the value in store
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovies(term);
  }; 


  const {data,error,loading}= useSelector((state:any) => state.movies);

  console.log(data.Search)


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
        {/* update with search page code */}
        <div className={styles.moviesContainer}>
          {error && <h3>{error}</h3>}
          {loading && <h3>Loading...</h3>}
            {!error &&
              !loading &&
              data?.Search?.map(
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

// export async function getServerSideProps({ctx}:any}) {

//   const data = fetch("http://www.omdbapi.com/?s=batman&apikey=*******")
//   .then((res) => res.json())
//   .then((data) => data);

//   return {
//     props: {
//       data
//     },
//   };
// }
