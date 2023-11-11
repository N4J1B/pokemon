import React from "react";

export default function PokeDetail({data}) {
    console.log(data)
    return (
        <div className="container-dt">
            <h1>{data.name}</h1>
            <img src={data.sprites.other.dream_world.front_default} width={'300px'} />
        </div>
    )
}