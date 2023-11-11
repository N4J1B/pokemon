import React from "react";

export default function Pokemon({data}) {
    return (
        <div className="container-poke">
        {
            data.map((item) => {
            return (
                <div className="card" key={item.id}>
                    <img className="card-img" src={item.sprites.front_default} />
                    <p className="card-title">{item.id}. {item.name}</p>
                </div>
                )
            })
        }
        </div>
    )
}