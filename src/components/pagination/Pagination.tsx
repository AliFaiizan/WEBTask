import React from 'react'
import styles from './Pagination.module.css'
import { useRouter } from 'next/router';
import { type } from 'os';

type PaginationProps = {
    data:any,
    term:string,
    currentPage:string
}

const Pagination = ({data,term,currentPage}:PaginationProps) => {

    const router = useRouter();

    let thisPage = Number(currentPage);
    let totalPages: number = Math.ceil(Number(data.totalResults) / 10);
    let pages:number[]=[];

    for(let i:number=thisPage-3;i<=thisPage+3;i++){
        if(i<1) continue
        if(i>totalPages) break
        pages.push(i);
    }
    
    const handleNextPage = ():void => {
        router.push(`/?term=${term}&page=${thisPage+1}`);
    }
    const handlePrevPage = ():void => {
        router.push(`/?term=${term}&page=${thisPage-1}`);
    }

  return (
    <div className={styles.container}>
      {data.Response && (
        <div>
          <button
            className={`${styles.button} ${styles.arrow}`}
            onClick={handlePrevPage}
          >
            {"<"}
          </button>
        </div>
      )}

      {data.Response === "True" &&
        pages.map((page: any) => (
          <div key={page}>
            <button
              className={`${styles.button} ${
                page === thisPage ? styles.active : ""
              }`}
              onClick={() => {
                router.push(`/?term=${term}&page=${page}`);
              }}
            >
              {page}
            </button>
          </div>
        ))}
      {data.Response && (
        <div>
          <button
            className={`${styles.button} ${styles.arrow}`}
            onClick={handleNextPage}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;