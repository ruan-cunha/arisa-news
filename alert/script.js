document.addEventListener('DOMContentLoaded', () => {
    const alertSound = document.getElementById('alert-sound');
    const ambientSound = document.getElementById('ambient-sound');
    const detailsContainer = document.getElementById('alert-details');


    document.body.addEventListener('click', () => {
        alertSound.volume = 0.015;
        alertSound.play();
        ambientSound.volume = 0.1;
        ambientSound.play();
    }, { once: true });


    const alertMessages = [
        "<p><strong>DATE-TIME GROUP:</strong> <span id='date'></span> (UTC)</p>",
        "<p><strong>CLASSIFICATION:</strong> THREAT CLASS: RED </p>",
        "<p><strong>LOCATION:</strong> CHENNAI METROPOLITAN REGION, INDIA (BAY OF BENGAL COASTLINE)</p>",
        "<p><strong>SUBJECT PROFILE:</strong> Single hostile entity, ~25 meters in height. Skeletal form with charred, ceramic-like carapace. Fissures in carapace emit high-temperature golden glow.</p>",
        "<p><strong>DIRECTIVE 1 [CIVILIAN POPULATIONS]: THIS IS NOT A DRILL.</strong> All civilians in the greater Chennai area must seek immediate, reinforced, subterranean shelter. Evacuate all coastal and open areas.</p>",
        "<p><strong>DIRECTIVE 2 [NON-COMBAT ASSETS]: STAND DOWN.</strong> All local and independent Awakened without direct combat-rating are ordered to cease operations and assist with civilian evacuation efforts ONLY.</p>",
        "<p class='omega-protocol'>** // OMEGA PROTOCOL INITIATED // **</p>",
        "<p><strong>By order of the Axis Mundi Global Security Council, a general amnesty is in effect. All combat-capable assets, regardless of affiliation or prior designation, are now requested for emergency reinforcement to combat an Existential-Level Threat.</strong></p>",
        "<p><strong>TRANSMISSION ACTIVE... AWAITING RESPONSE...</strong></p>"
    ];

    let messageIndex = 0;

    function displayNextMessage() {
        if (messageIndex < alertMessages.length) {
            const p = document.createElement('p');
            p.style.opacity = 0;
            p.innerHTML = alertMessages[messageIndex];
            detailsContainer.appendChild(p);


            if (messageIndex === 0) {

						    const eventDate = new Date('2017-11-17T12:32:30-03:00'); 
						    const dateString = `${eventDate.toUTCString()}`;
						    document.getElementById('date').textContent = dateString;
						}

            // Simple fade-in animation
            setTimeout(() => { p.style.transition = 'opacity 1s'; p.style.opacity = 1; }, 100);

            messageIndex++;

            const delay = alertMessages[messageIndex - 1].includes('OMEGA PROTOCOL') ? 3000 : 2000;
            setTimeout(displayNextMessage, delay);
        }
    }

    displayNextMessage();
});