//fill order in table
Orders.forEach(data => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${data.productName}</td>
        <td>${data.productNumber}</td>
        <td>${data.payementStatus}</td>
        <td class="${data.shipping === 'Declined' ? 'danger' : data.shipping === 'pending' ? 'warning' : 'primary'}">${data.shipping}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML =trContent;
    document.querySelector('table tbody').appendChild(tr);
})
const chart = document.querySelector("#chart_line");

let crosshair;
    const crosshairLabel = {
        id: 'crosshairLabel',
        //draw
        afterDatasetsDraw(chart, args, plugins) {
            const { ctx, chartArea: {left,right,top,bottom}, scales: {x, y} } = chart;

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'grey';

            if(crosshair) {
                ctx.save();
                ctx.beginPath();
                crosshair.forEach((line, index) => {
                ctx.moveTo(line.startX, line.startY);
                ctx.lineTo(line.endX, line.endY);
                ctx.stroke();
                })
                ctx.fillStyle = 'grey';
                ctx.fillRect(0, crosshair[0].startY - 10, left, 20)
                ctx.font = 'bold 12px sans-serif';

                //font color
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.fillText(y.getValueForPixel(crosshair[0].startY).toFixed(2), left / 2, crosshair[0].startY);
            }
        },
        //mouse move
        afterEvent(chart, args) {
            const { ctx, chartArea: {left, right, top, bottom} } = chart;

            const xCoor = args.event.x;
            const yCoor = args.event.y;
            //console.log(args);

            if(!args.inChartArea && crosshair) {
                crosshair = undefined;
                args.changed = true;
            } else if(args.inChartArea){
                crosshair = [
                    {
                    startX: left,
                    startY: yCoor,
                    endX: right,
                    endY: yCoor
                    },
                    {
                    startX: xCoor,
                    startY: top,
                    endX: xCoor,
                    endY: bottom
                    }
                ];
                args.changed = true;
            }
        }
    };   
// create a new chart
new Chart(chart,{
    type: 'line',
    data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],

        datasets: [
            {
                label: 'BTC',
                data: [29374, 33537, 49631, 59095, 57828, 36684, 33572, 39974, 48847, 48116, 61004],
                borderColor: 'red',
                borderWidth: 2
            },
            {
                label: 'ETH',
                data: [31500, 41000, 88800, 26000, 46000, 32698, 5000, 3000, 18656, 24832, 36844],
                borderColor: 'blue',
                borderWidth: 2
            }
        ],
        options: {
            responsive: true,
        layout: {
            padding: {
                left: 10,
            }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    },
    plugins: [crosshairLabel]
});