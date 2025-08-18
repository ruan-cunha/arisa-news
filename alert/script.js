document.addEventListener('DOMContentLoaded', () => {
    const alertOverlay = document.getElementById('global-alert-overlay');
    const mainPortal = document.getElementById('main-portal');
    
    document.body.style.overflow = 'hidden';

    const alertSound = document.getElementById('alert-sound');
    const detailsContainer = document.getElementById('alert-details');
    const closeAlertBtn = document.createElement('button'); 
    closeAlertBtn.id = 'close-alert-btn';
    closeAlertBtn.textContent = 'ACCESS ARISA PORTAL';

    document.body.addEventListener('click', () => {
        if (alertSound.paused) {
            alertSound.volume = 0.02; 
            alertSound.play();
        }
    }, { once: true });

    const alertMessages = [
        "<p><strong>DATE-TIME GROUP:</strong> 17 NOV 2019 // 12:32 (UTC)</p>",
        "<p><strong>CLASSIFICATION:</strong> THREAT CLASS: RED </p>",
        "<p><strong>LOCATION:</strong> CHENNAI METROPOLITAN REGION, INDIA (BAY OF BENGAL COASTLINE)</p>",
        "<p><strong>SUBJECT PROFILE:</strong> Single hostile entity, ~25 meters in height. Skeletal form with charred, ceramic-like carapace. Fissures in carapace emit high-temperature golden glow.</p>",
        "<p><strong>DIRECTIVE 1 [CIVILIAN POPULATIONS]: THIS IS NOT A DRILL.</strong> All civilians in the greater Chennai area must seek immediate, reinforced, subterranean shelter.</p>",
        "<p><strong>DIRECTIVE 2 [NON-COMBAT ASSETS]: STAND DOWN.</strong> All local and independent Awakened without direct combat-rating are ordered to cease operations and assist with civilian evacuation efforts ONLY.</p>",
        "<p class='omega-protocol'>** // OMEGA PROTOCOL INITIATED // **</p>",
        "<p><strong>By order of the Axis Mundi Global Security Council, a general amnesty is in effect. All combat-capable assets, regardless of affiliation or prior designation, are now requested for emergency reinforcement.</strong></p>",
        "<p><strong>GLOBAL RESPONSE:</strong> Transport for all combat-ready personnel is being coordinated globally. Designated heroes will be routed to the operational area.</p>",
        "<p><strong>TRANSMISSION ACTIVE... AWAITING RESPONSE...</strong></p>"
    ];

    let messageIndex = 0;

    function displayNextMessage() {
        if (messageIndex < alertMessages.length) {
            const p = document.createElement('p');
            p.style.opacity = 0;
            p.innerHTML = alertMessages[messageIndex];
            detailsContainer.appendChild(p);

            setTimeout(() => { p.style.transition = 'opacity 1s'; p.style.opacity = 1; }, 100);

            messageIndex++;

            const delay = alertMessages[messageIndex - 1].includes('OMEGA PROTOCOL') ? 2500 : 1500;
            setTimeout(displayNextMessage, delay);

        } else {
            const alertContent = document.querySelector('.alert-content');
            alertContent.appendChild(closeAlertBtn);
            setTimeout(() => { closeAlertBtn.style.transition = 'opacity 1s'; closeAlertBtn.style.opacity = 1; }, 100);
        }
    }

    function closeAlert() {
        alertSound.pause();
        alertOverlay.style.transition = 'opacity 0.5s ease-out';
        alertOverlay.style.opacity = 0;
        
        // Libera a rolagem da página novamente
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            alertOverlay.style.display = 'none';
            mainPortal.style.display = 'block'; 

            window.dispatchEvent(new Event('portalReady')); 
        }, 500); 
    }

    closeAlertBtn.addEventListener('click', closeAlert);

    displayNextMessage();
});

