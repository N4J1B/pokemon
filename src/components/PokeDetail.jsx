import React from "react";

export default function PokeDetail({data}) {
    return (
        <div className="container-dt">
            <h1>{data.name}</h1>
            <img src={data.sprites.other.dream_world.front_default} height={'250px'} />
            <div>
            {
                data.abilities.map(item => {
                    return (<button disabled={true} key={item.ability.name} className="btn">{item.ability.name}</button>)
                })
            }
            </div>
        </div>
    )
}