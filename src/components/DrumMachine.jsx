import { useEffect, useState, useRef } from "react";
import { kits } from "../kits";
import DrumPad from "./DrumPad";
import DrumEngine from "../DrumEngine";

const DrumMachine = () => {

    const [loaded, setLoaded] = useState(false);
    const [kit, setKit] = useState(kits[0]);
    const [currentKit, setCurrentKit] = useState(0);

    const engine = useRef(null);

    useEffect(() => {

        engine.current = new DrumEngine(kits[currentKit]);
        setLoaded(true);

    }, []);

    // useEffect(() => {

    //     engine.current.loadKit(kits[currentKit])

    // }, [currentKit])

    const changeKit = () => {

        let nextKit = currentKit + 1;

        if (nextKit >= kits.length) {

            nextKit = 0;

        }

        setCurrentKit(nextKit);
        setKit(kits[nextKit]);
        engine.current.loadKit(kits[nextKit])

    }

    return (

        <div className="flex bg-slate-600 border border-slate-800 w-full p-6">

            <p>Kit: {currentKit}</p>
            <button onClick={changeKit} className="border py-1 px-3 bg-slate-400">Kit</button>

            {loaded && kit.map((drum, index) => {

                const handleClick = () => { engine.current.channels[index].player.start() }

                return <DrumPad key={`drumPad${index}`} title={drum.title} triggerPad={handleClick} />

            })}

        </div>

    )

}

export default DrumMachine;