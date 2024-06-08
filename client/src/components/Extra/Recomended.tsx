import React from "react";
import Games from '../../Data/Games.json'


const Recomended: React.FC = () => {

    return (
        <div className="mt-5">
            <div className="">
                <h1 className="text-white text-lg font-bold">You may also like</h1>
            </div>
            <div>
                {
                    Games.map(game => (
                        <div className="flex items-center gap-2 py-2" key={game.id}>
                            <figure className="w-52 h-32 bg-cover box-border p-2">
                                <img src={game.image} alt={game.streamer_name}
                                    className="rounded-md" />
                            </figure>
                            <div className="self-start">
                                <h2 className="text-lg text-white">{game.title}</h2>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                                    <h1 className="text-white text-md">stream name</h1>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Recomended;
