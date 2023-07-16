import { useState } from 'react'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import styles from '@/styles/Search.module.css'
import Card from '@/components/card/Card'
import Pagination from '@/components/pagination/Pagination'
import Footer from '@/components/footer/Footer'

//for redux
// import { useSelector } from 'react-redux'
// import { useActions } from '@/hooks/useActions'



const inter = Inter({ subsets: ['latin'] })

export default function Search({data,currentPage}:any) {
  const router:NextRouter = useRouter();

  const [term, setTerm] = useState<string>(""); // search term

  // const [currentpage, setCurrentPage] = useState<number>(currentPage=1); // page number
  // const [totalResults, setTotalResults] = useState<number>(data.totalResults); // total results
  // const { searchMovies } = useActions();// we used this for fetching data from the api and setting the value in store


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //this is implemented with redux functionali ty
    // searchMovies(term);
    router.push(`/?term=${term}&page=1`);
  }; 
  


  // const {data,error,loading}= useSelector((state:any) => state.movies); // we used this for getting the data from the store
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
        <div className={styles.results}>
          {data.Response === 'True' 
            ?(
              <>
                <b>Total Results:{data.totalResults}</b>
                <br />
                <hr />
              </>
            )
            :
            <h3>{data.Error}</h3>
          }
        </div>
        <div className={styles.moviesContainer}>
          {data?.Search?.map(({ imdbID, Poster, Title, Type, Year }: any) => (
              <Card
                key={imdbID}
                poster={Poster}
                title={Title}
                type={Type}
                year={Year}
                imdbID={imdbID}
              />
            ))
          }
        </div>
        <Pagination data={data} term={term} currentPage={currentPage}/>
       
      <Footer />
      </main>
    </>
  );
}


export async function getServerSideProps(ctx:any) {

  const {term,page=0} = ctx.query;
  if(page>0){
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${term}&page=${page}`
    );
    const data = await res.json();
    return {
      props: {
        data,
        currentPage:page,
      },
    };
  }
  else{
    return {
      props: {
        data:{},
      },
    };

  }
}


