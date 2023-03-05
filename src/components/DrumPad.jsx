import { useEffect, useState } from 'react'

const DrumPad = (props) => {

    const { triggerPad, blinkTrigger, title } = props;

    const [color, setColor] = useState('bg-red-800');

    const blink = () => {
        setColor('bg-red-500');

        setTimeout(() => {

            setColor('bg-red-800');

        }, 100)
    }

    useEffect(() => {

        if (blinkTrigger) {

            blink();

        }

    }, [blinkTrigger])

    const handleClick = () => {

        triggerPad()
        blink()

    }

    return (
        <div className="App">
            <div>
                <h2>{title}</h2>
                <button onClick={handleClick} className={`h-12 w-12 border border-slate-600 rounded transition duration-[50ms] ${color}`}>Hit</button>
            </div>
        </div>
    )

}

export default DrumPad;