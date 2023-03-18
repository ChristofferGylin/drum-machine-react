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

        <div className='w-full flex flex-col gap-4'>
            <div className='hidden sm:flex items-center w-full bg-teal-700 rounded-full overflow-hidden'><h2 className='w-full h-full text-center text-teal-300'>{title}</h2></div>
            <button onClick={handleClick} className={`w-full aspect-square rounded border border-slate-600 rounded transition duration-[50ms] ${color}`}></button>
        </div>

    )

}

export default DrumPad;