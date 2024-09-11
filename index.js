const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events';


const partyList = document.getElementById('partyList');
const partyForm = document.getElementById('partyForm');


document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});


async function fetchEvents() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (response.ok && data) {
            renderParties(data);
        } else {
            console.error("Error fetching events:", data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderParties(parties) {

    partyList.innerHTML = '';

    parties.forEach((party) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <h3>${party.name}</h3>
                <p><strong>Date:</strong> ${party.date}</p>
                <p><strong>Time:</strong> ${party.time}</p>
                <p><strong>Location:</strong> ${party.location}</p>
                <p><strong>Description:</strong> ${party.description}</p>
            </div>
            <button onclick="deleteParty('${party.id}')">Delete</button>
        `;
        partyList.appendChild(li);
    });
}

partyForm.addEventListener('submit', async function (event) {
    event.preventDefault(); 
    const partyName = document.getElementById('partyName').value;
    const partyDate = document.getElementById('partyDate').value;
    const partyTime = document.getElementById('partyTime').value;
    const partyLocation = document.getElementById('partyLocation').value;
    const partyDescription = document.getElementById('partyDescription').value;
    const newParty = {
        name: partyName,
        date: partyDate,
        time: partyTime,
        location: partyLocation,
        description: partyDescription
    };
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newParty)
        });

        if (response.ok) {
            partyForm.reset();
            fetchEvents();
        } else {
            console.error("Error adding event:", response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function deleteParty(partyId) {
    try {
        const response = await fetch(`${API_URL}/${partyId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchEvents();
        } else {
            console.error("Error deleting event:", response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
