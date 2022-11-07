import './StatsDisplay.css';
import CanvasJSReact from '../CanvasJs/canvasjs.react';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function StatsDisplay(props) {

    const options = {
        backgroundColor: "transparent",
        width: 400,
        axisX: {
            reversed: true,
        },
        axisY: {
            includeZero: true,
            maximum: 200,
            interval: 20,
        },
        data: [{
            type: "bar",
            dataPoints: [
                { y: props.pokemon.base_stats[0], label: "HP (" + props.pokemon.base_stats[0] + ")" },
                { y: props.pokemon.base_stats[1], label: "ATK (" + props.pokemon.base_stats[1] + ")" },
                { y: props.pokemon.base_stats[2], label: "DEF (" + props.pokemon.base_stats[2] + ")" },
                { y: props.pokemon.base_stats[3], label: "SPA (" + props.pokemon.base_stats[3] + ")" },
                { y: props.pokemon.base_stats[4], label: "SPD (" + props.pokemon.base_stats[4] + ")" },
                { y: props.pokemon.base_stats[5], label: "SPE (" + props.pokemon.base_stats[5] + ")" },
            ],
            color: "blue",
        }]
    }

    return(
        <div className="canvasjs-div">
            <CanvasJSChart options={options} />
        </div>
    );
}