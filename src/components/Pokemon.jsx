import React from "react";

export default function Pokemon({data, handler}) {
    return (
        <div className="container-poke">
        {
            data.map((item) => {
            return (
                <div className="card" key={item.id} onClick={() => handler(item)}>
                    <img className="card-img" src={item.sprites.front_default} />
                    <p className="card-title">{item.id}. {item.name}</p>
                </div>
                )
            })
        }
        </div>
    )
}