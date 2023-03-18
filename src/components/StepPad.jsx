const StepPad = ({ active }) => {

    let color;

    if (active) {

        color = 'bg-teal-400';

    } else {

        color = 'bg-teal-700';

    }


    return (

        <button className={`w-1/12 aspect-square rounded ${color}`}></button>

    )

}

export default StepPad;