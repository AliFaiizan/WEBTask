import React from 'react'

const Movie = ({data}:any) => {
  return (
    <div>{data.Title}</div>
  )
}

export default Movie;

export async function getServerSideProps(context:any) {
    const {id} = context.query;
    console.log(id)
    const res = await fetch(`http://www.omdbapi.com/?apikey=dfa8820e&i=${id}`);
    const data = await res.json();
    console.log(data)
    return {
        props: {data},
    }
}