let localAPI = "../assets/js/amazing.json";

let allEvents = [];
let upcomingEvents = [];
let pastEvents = [];

const $stats = document.getElementById("stats");
const $upcomingEventsStats = document.getElementById("upcomingstats");
const $pastEventsStats = document.getElementById("paststats");

let highAttendEvents = [];
let lowAttendEvents = [];
let largCapEvents = [];

async function fetchAPI() {
    try {
        const response = await fetch(localAPI);
        const data = await response.json();

        allEvents = data.events;
        upcomingEvents = data.events.filter(e => e.date >= data.currentDate)
        pastEvents = data.events.filter(e => e.date <= data.currentDate)

        let attendancePercentage = pastEvents.map(e => {
            return Number(e.assistance / e.capacity)
        })

        let maxAttendancePercentage = Math.max(...attendancePercentage)
        let minAttendancePercentage = Math.min(...attendancePercentage)

        highAttendEvents = allEvents.filter(event => {
            if (event.estimate) {
                if ((event.estimate / event.capacity) == maxAttendancePercentage) {
                    return event.name
                }
            }
            else {
                if ((event.assistance / event.capacity) == maxAttendancePercentage) {
                    return event.name
                }
            }
        }).map(event => [event.name,(maxAttendancePercentage * 100).toFixed(1) + "%"].join(" - "))

        lowAttendEvents = allEvents.filter(event => {
            if (event.estimate) {
                if ((event.estimate / event.capacity) === minAttendancePercentage) {
                    return event.name
                }
            }
            else {
                if ((event.assistance / event.capacity) === minAttendancePercentage) {
                    return event.name
                }
            }
        }).map(event => [event.name,(minAttendancePercentage * 100).toFixed(1) + "%"].join(" - "))

        let eventCapacities = allEvents.map(event => event.capacity)
        let largerCapacity = Math.max(...eventCapacities)

        largCapEvents = allEvents.filter(event => event.capacity === largerCapacity).map(event => [event.name,largerCapacity.toLocaleString('en-US')].join(" - "))

        $stats.innerHTML += `
            <tr>
                <td id="td1">${highAttendEvents[0]}</td>
                <td id="td2">${lowAttendEvents[0]}</td>
                <td id="td3">${largCapEvents[0]}</td>
            </tr>
        `

        let upcomingEventsStatsByCategory = groupSumByFirstElement(upcomingEvents.map(event =>
            [event.category, (event.price * event.estimate), (100 * event.estimate / event.capacity)]
        ))
        crearRows(upcomingEventsStatsByCategory, $upcomingEventsStats)

        let pastEventsStatsByCategory = groupSumByFirstElement(pastEvents.map(event =>
            [event.category, (event.price * event.assistance), (100 * event.assistance / event.capacity)]
        ))
        crearRows(pastEventsStatsByCategory,$pastEventsStats)

    }
    catch (error) {
        console.log(error)
    }
};
fetchAPI();

function crearRows(array, container) {
    container.innerHTML += array.map(e =>
        `<tr class="text-center">
            <td>${e[0]}</td>
            <td>$${(e[1]).toLocaleString('en-US')}</td>
            <td>${(e[2])}%</td>
        </tr>`
    ).join('')
};

function groupSumByFirstElement(array) {
    return Object.entries(array.reduce((acc, [original, i1, i2]) => {
        acc[original] = acc[original] || [0, 0]
        acc[original][0] += i1
        acc[original][1] = ((acc[original][1] + i2) / 2)
        return acc
    }, {})).map(([prop, [i1, i2]]) => [prop, i1, i2.toFixed(2)])
};