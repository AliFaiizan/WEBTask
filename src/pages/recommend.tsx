import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Recommend.module.css'
import Card from '@/components/card/Card'

const inter = Inter({ subsets: ['latin'] })

function pad(number:number, length:number) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

export default function Recommend({data}:any) {
   
  const {Poster,Title,Type,Year,imdbID} = data;

  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* update with recommendations page code */}
        OUR Recommendations
        <div className={styles.moviesContainer}>
          {data.Response === "True" && (
            <Card
              key={imdbID}
              poster={Poster}
              title={Title}
              type={Type}
              year={Year}
              imdbID={imdbID}
            />
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: any) {

    let term = pad(Math.floor(Math.random() * 2155529 + 1), 7);
    console.log(term)
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=tt${term}`
    );
    const data = await res.json();

    return {
      props: {
        data,
      },
    };

}
