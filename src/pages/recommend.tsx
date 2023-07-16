import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Recommend.module.css'
import Card from '@/components/card/Card'
import Footer from '@/components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

function pad(number:number, length:number) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

export default function Recommend({data}:any) {

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
        <h1>Recommendations</h1>
        <div className={styles.moviesContainer}>
          {data?.map(({ imdbID, Poster, Title, Type, Year }: any) => (
            <Card
              key={imdbID}
              poster={Poster}
              title={Title}
              type={Type}
              year={Year}
              imdbID={imdbID}
            />
          ))}
        </div>
      <Footer />
      </main>
    </>
  );
}

export async function getStaticProps(ctx: any) {
  
    let urls: string[] = [];
    for (let i = 0; i < 5; i++) {
      let term=pad(Math.floor(Math.random() * 2155529 + 1),7)
      urls.push(
        `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=tt${term}`
      );
    }
    
    const dataPromises = urls.map((url) => {
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    })
    const data: any[] = await Promise.all(dataPromises);
    return {
      props: {
        data,
      },
      revalidate: 86400,
    };

}
