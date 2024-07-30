import React from "react";
import { Link } from "react-router-dom";

export default function Home({ pokemonProp: results }) {
    console.log(results);
    return (
        <div className="mt-10 p-4 flex flex-wrap">
            {results &&
                results.map((val) => (
                    <div className="ml-4 text-2xl text-blue-400 " key={val.index}>
                        <Link to={`/about/${val.index}`}>{val.name}</Link>
                    </div>
                ))}
        </div>
    );
}