import { useEffect, useState, useRef } from "react";
import { kits } from "../kits";
import DrumPad from "./DrumPad";
import DrumEngine from "../DrumEngine";
import { Transport } from 'tone';
import * as Tone from 'tone';
import StepPad from "./StepPad";

const DrumMachine = () => {
    const [playing, setPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [currentPad, setCurrentPad] = useState(0);
    const [currentKit, setCurrentKit] = useState(0);
    const [patternMode, setPatternMode] = useState(false);
    const [steps, setSteps] = useState(
        [
            true, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false,
        ]
    );

    const engine = useRef(null);

    useEffect(() => {

        if (loaded) {

            engine.current.loadKit(kits[currentKit]);

        }



    }, [currentKit]);

    useEffect(() => {

        if (!loaded) return;

        if (patternMode) {

            setSteps([...engine.current.channels[currentPad].pattern])

        } else {

            const newSteps = [

                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,

            ]

            newSteps[engine.current.step] = true;

            setSteps(newSteps);

        }

    }, [currentPad, patternMode])

    const changeKit = () => {

        let nextKit = currentKit + 1;

        if (nextKit >= kits.length) {

            nextKit = 0;

        }

        setCurrentKit(nextKit);

    }

    const loadApp = async () => {
        await Tone.start();
        engine.current = new DrumEngine(kits[currentKit], setSteps);
        setLoaded(true);

    }

    if (!loaded) {

        return (
            <div className="w-full h-screen flex justify-center items-center">
                <button onClick={loadApp} className="py-2 px-6 border border-slate-500">Load Drum Machine</button>
            </div>
        )

    }

    let playColor;

    if (playing) {

        playColor = 'text-teal-400';

    } else {

        playColor = 'text-teal-700';

    }

    let patternModeColor;

    if (patternMode) {

        patternModeColor = 'text-teal-400';

    } else {

        patternModeColor = 'text-teal-700';

    }

    return (

        <div className="flex flex-col bg-slate-600 border border-slate-800 w-full p-6 rounded-lg">

            <div className="flex gap-4">

                <button onClick={changeKit} className="border py-1 px-3 bg-slate-400 w-1/6 rounded-xl">Kit</button>
                <button onClick={() => {
                    if (playing) {

                        Transport.stop()

                    } else {

                        Transport.start();

                    }

                    setPlaying((playing) => {
                        return !playing;
                    })
                }} className={`border py-1 px-3 bg-slate-400 w-1/6 rounded-xl ${playColor}`}>Start</button>
                <button onClick={() => {
                    engine.current.patternMode = !engine.current.patternMode;
                    setPatternMode((patternMode) => {
                        return !patternMode;
                    })
                }} className={`border py-1 px-3 bg-slate-400 w-1/6 rounded-xl ${patternModeColor}`}>Pattern Mode</button>


            </div>

            <div className="flex gap-4 my-4">
                {loaded && kits[currentKit].map((drum, index) => {

                    let handleClick;

                    if (patternMode) {

                        handleClick = () => {
                            setCurrentPad(index);
                        };

                    } else {

                        handleClick = () => { engine.current.channels[index].player.start() };

                    }

                    return <DrumPad key={`drumPad${index}`} title={drum.title} triggerPad={handleClick} />

                })}
            </div>
            <div>
                <div className="flex gap-2">
                    {steps.map((step, index) => {

                        const handleClick = () => {

                            if (patternMode) {

                                engine.current.channels[currentPad].pattern[index] = !engine.current.channels[currentPad].pattern[index];
                                setSteps([...engine.current.channels[currentPad].pattern]);

                            }

                        }

                        return <StepPad key={`stepPad${index}`} handleClick={handleClick} active={step} />

                    })}
                </div>
            </div>


        </div>

    )

}

export default DrumMachine;