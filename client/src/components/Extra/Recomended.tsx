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
                        <div className="flex items-center gap-2 py-2" key={game.Id}>
                            <figure className="w-44 h-28 bg-cover box-border ">
                                <img src={game.Thumbnail} alt={game.Title}
                                    className="rounded-md" />
                            </figure>
                            <div className="self-start">
                                <h2 className=" text-white">{game.Title}</h2>
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                                    <p className="text-white text-sm">{game.Creator.Username}</p>
                                </div>
                                <section className="flex items-center gap-2">
                                    <p className="text-white text-sm">{game.views} views</p>
                                    <p className="text-white text-sm">{game.views} views</p>
                                </section>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Recomended;
