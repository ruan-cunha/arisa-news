document.addEventListener('DOMContentLoaded', () => {
    const GAME_TICK_INTERVAL = 1000;
    const INCIDENT_SPAWN_INTERVAL = 18000;
    const HERO_MISSION_COOLDOWN = 2;
    const INITIAL_PUBLIC_TRUST = 100;
    const GAME_OVER_THRESHOLD = 50; 
    const DISPATCH_DURATION = 3000;
    const TYPEWRITER_SPEED = 5;
    const COMMS_MESSAGE_DURATION = 10000;
    const loginModal = document.getElementById('login-modal');
    const startShiftButton = document.getElementById('start-shift-button');
    const operatorNameInput = document.getElementById('operator-name-input');

    const TRUST_CHANGE = {
        OPTIMAL: 15,
        GOOD: 10,
        COMPLICATED: 2,
        FAILURE: -5,
        TIMEOUT: -10,
        CRITICAL: -25
    };
    const OUTCOME_COLORS = {
        SUCCESS: '#2ea043',
        COMPLICATED: '#f7b32b',
        FAILURE: '#f85149'
    };


    const heroDBData = {
        aegis: {
            affiliation: "The Paramount (Leader)",
            status: "Active",
            dossier: "Considered the gold standard for Awakened heroism. Aegis combines immense physical prowess with a calm, diplomatic demeanor, making him both a formidable combatant and a respected public figure. His unwavering composure in high-stress situations serves as the foundation for the entire team."
        },
        mosaic: {
            affiliation: "The Paramount",
            status: "Active",
            dossier: "The team's primary cognitive specialist. Mosaic operates as a forensic mind-reader, capable of reconstructing past events by reading psychic residue. He is a silent, observant force whose value lies in uncovering truths that cannot be found through conventional investigation. Rarely speaks in public."
        },
        battery: {
            affiliation: "The Paramount",
            status: "Active",
            dossier: "A brutally efficient combatant with a unique mastery of kinetic energy. By remaining perfectly still, Battery can store vast amounts of potential energy, which she can then discharge in devastating bursts of speed and force. Her military background is evident in her precise, no-nonsense approach to conflicts."
        },
        downdraft: {
            affiliation: "The Paramount",
            status: "Active",
            dossier: "A meteorological tactician who manipulates micro-atmospheric dynamics. Downdraft doesn't create storms; he weaponizes the air itself, using precise bursts of pressure and turbulence to disorient enemies and control the battlefield. His methods are subtle, strategic, and highly effective for non-lethal containment."
        },
        armory: {
            affiliation: "The Paramount",
            status: "Active",
            dossier: "A composed and strategic combatant, Armory's ability is to manifest adaptive energy weaponry. She is the team's sentient arsenal, capable of producing the perfect tool for any threat. Her approach is always measured, believing that every conflict requires a precise, not excessive, application of force."
        },
        loop: {
            affiliation: "The Paramount",
            status: "Active",
            dossier: "The team's temporal specialist. Loop can create short-term echoes of her own movements, allowing her to strike multiple targets—or the same target multiple times—simultaneously. On the field, she is a whirlwind of controlled chaos, often leaving opponents confused and defeated before they understand what happened."
        },
        seraphim: {
            affiliation: "ARISA (Cognitive Division) / The Paramount Collaborator",
            status: "Active",
            dossier: "Designated as the most advanced 'Cognivore' on record, Seraphim is less of a combatant and more of a tactical nexus. Her primary ability is advanced analysis, allowing her to predict battlefield outcomes and identify elegant solutions to seemingly impossible dilemmas. Deeply empathetic, she specializes in de-escalation and is the lead architect of the very SERAPH system you are operating. For field deployment, she utilizes a range of modular exoframes, adapting her equipment for specific mission parameters like rescue, suppression, or reconnaissance."
        },
        flashpoint: {
            affiliation: "The Vanguards",
            status: "Active",
            dossier: "Impulsive, optimistic, and overflowing with energy. Flashpoint acts as the Vanguards' living rocket, building up kinetic energy through motion and releasing it in explosive impacts. He thrives under pressure and treats dangerous situations with a confident, almost playful demeanor that inspires his teammates."
        },
        spoiler: {
            affiliation: "The Vanguards",
            status: "Active",
            dossier: "The silent conscience of the Vanguards. Spoiler's ability allows her to create fields of absolute sensory dampening—erasing light and sound within a controlled radius. She is deliberate, precise, and speaks only when necessary, making her the team's undisputed master of stealth and infiltration."
        },
        chisel: {
            affiliation: "The Vanguards",
            status: "Active",
            dossier: "The immovable anchor of the Vanguards. Chisel's strength and durability increase the longer he focuses on a defensive task. Humble and gentle by nature, he is the ultimate protector, capable of holding collapsing structures and shielding his team from overwhelming force with sheer determination."
        },
        viceroy: {
            affiliation: "The Vanguards",
            status: "Active",
            dossier: "Elegant, courteous, and always in control. Viceroy's power lies in precision: with a single touch, he can subtly alter an opponent's muscle responses, causing them to lose balance and coordination. He is a master of de-escalation, capable of neutralizing threats with surgical grace before a fight even begins."
        },
        kinesis: {
            affiliation: "The Vanguards",
            status: "Active",
            dossier: "The team's tech-driven mobility expert. Kinesis designs, builds, and utilizes a personal arsenal of high-tech mobility gear, from grapple hooks to aerial skates. Fast-talking and even faster-thinking, she ensures the Vanguards can outmaneuver any opponent on any terrain."
        },
        lockshot: {
            affiliation: "The Vanguards",
            status: "Active",
            dossier: "A reserved and introverted marksman with an extraordinary power: his projectiles can lock onto a target and will adjust their trajectory mid-flight to bypass any obstacle or cover. For Lockshot, there is no such thing as an impossible shot; only a target that has been acquired."
        }
    };

    const sounds = {
        click: { 
            audio: new Audio('sounds/click.mp3'), 
            offset: 0.35,
            volume: 0.05
        },
        new_incident: { audio: new Audio('sounds/new_incident.wav'), offset: 0, volume: 0.05 },
        dialogue: { audio: new Audio('sounds/dialogue.wav'), offset: 0, volume: 0.8 },
        success: { audio: new Audio('sounds/success.mp3'), offset: 0, volume: 0.05 },
        failure: { audio: new Audio('sounds/failure.wav'), offset: 0, volume: 0.05 },
        game_over: { audio: new Audio('sounds/failure.wav'), offset: 0, volume: 1.0 }
    };

    function playSound(soundName) {
        const sound = sounds[soundName];
        if (sound) {
            sound.audio.volume = sound.volume || 1.0;
            sound.audio.currentTime = sound.offset || 0;
            sound.audio.play().catch(error => console.error(`Error playing sound: ${soundName}`, error));
        }
    }

    const ui = {
        incidentList: document.getElementById('incident-list'),
        heroList: document.getElementById('hero-list'),
        incidentDetails: document.getElementById('incident-details'),
        dispatchControls: document.getElementById('dispatch-controls'),
        dispatchButton: document.getElementById('dispatch-button'),
        publicTrustScore: document.getElementById('public-trust-score'),
        endGameModal: document.getElementById('end-game-modal'), 
        restartButton: document.getElementById('restart-button'),
        dispatchLoader: document.getElementById('dispatch-loader'),
        dispatchStatusText: document.getElementById('dispatch-status-text'),
        loaderBarFill: document.querySelector('.loader-bar-fill'),
        commsSubtitleContainer: document.getElementById('comms-subtitle-container'),
        heroDBModal: document.getElementById('hero-database-modal'),
        heroDBContent: document.getElementById('hero-db-content'),
        modalCloseBtn: document.querySelector('.modal-close-btn'),
        modalOverlay: document.querySelector('.modal-overlay'),
        settingsModal: document.getElementById('settings-modal'),
        settingsButton: document.getElementById('settings-button'),
        settingsModalCloseBtn: document.querySelector('#settings-modal .modal-close-btn'),
        themeSelectionContainer: document.getElementById('theme-selection-container')
    };

    let state = {};
    let gameLoopInterval, typewriterInterval, incidentSpawnerInterval, commsTimeout, idleDialogueInterval;

    function initializeGame() {
        console.log("SERAPH System Online. Version 4.2 FINAL. Initializing...");
        clearInterval(gameLoopInterval);
        clearInterval(typewriterInterval);
        clearInterval(incidentSpawnerInterval);
        clearTimeout(commsTimeout);
        clearInterval(idleDialogueInterval);
        

        state = {
            incidentQueue: shuffleArray([...incidentData]),
            activeIncidents: [],
            allHeroes: loreData.filter(item => item.tipo === 'personagem').map(hero => ({ ...hero, cooldown: 0 })),
            selectedIncidentId: null,
            selectedHeroId: null,
            publicTrust: INITIAL_PUBLIC_TRUST,
            isGameOver: false,
            operatorName: 'Operator',
            isDisplayingReport: false,
            lastTypedIncidentId: null,
            totalScore: 0,
            incidentsResolved: 0,
            incidentsFailed: 0
        };

        ui.endGameModal.classList.add('hidden'); 
        ui.commsSubtitleContainer.classList.add('hidden');
        playSound('click');
        setTimeout(() => showCommsMessage("SYSTEM", "Operator terminal online. Monitoring for threats."), 500);
        gameLoopInterval = setInterval(gameTick, GAME_TICK_INTERVAL);
        startIncidentSpawner();
        startIdleDialogue();
        render();
        console.log("System Ready.");
        loadAndApplyTheme();
    }

    ui.incidentList.addEventListener('click', handleIncidentClick);
    ui.heroList.addEventListener('click', handleHeroClick);
    ui.heroList.addEventListener('contextmenu', handleHeroRightClick);
    ui.dispatchButton.addEventListener('click', dispatchHero);
    ui.restartButton.addEventListener('click', initializeGame);
    ui.modalCloseBtn.addEventListener('click', closeHeroDBModal);
    ui.modalOverlay.addEventListener('click', closeHeroDBModal);
    ui.settingsButton.addEventListener('click', () => ui.settingsModal.classList.remove('hidden'));
    ui.settingsModalCloseBtn.addEventListener('click', () => ui.settingsModal.classList.add('hidden'));
    ui.themeSelectionContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('theme-button')) {
            const themeName = e.target.dataset.theme;
            applyTheme(themeName);
        }
    });

    function applyTheme(themeName) {
        document.body.className = '';
        document.body.classList.add(`theme-${themeName}`);
        
        localStorage.setItem('seraphTheme', themeName);

        document.querySelectorAll('.theme-button').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.theme === themeName) {
                button.classList.add('active');
            }
        });

        console.log(`Theme applied: ${themeName}`);
    }

    function loadAndApplyTheme() {
        const savedTheme = localStorage.getItem('seraphTheme') || 'default';
        applyTheme(savedTheme);
    }

    function handleHeroRightClick(e) {
        e.preventDefault();
        const targetLi = e.target.closest('li');
        if (targetLi && targetLi.dataset.heroId) {
            const heroId = targetLi.dataset.heroId;
            const data = heroDBData[heroId];
            if (data) {
                showHeroDBModal(data, targetLi.textContent.split(' ')[0]);
            }
        }
    }

    function startGame(operatorName) {
        loginModal.classList.add('hidden');
        state.operatorName = operatorName;

        console.log(`SERAPH System Online. Operator: ${operatorName}. Initializing...`);
        clearInterval(gameLoopInterval);
        clearInterval(typewriterInterval);
        clearInterval(incidentSpawnerInterval);
        clearTimeout(commsTimeout);
        clearInterval(idleDialogueInterval);

        setTimeout(() => showCommsMessage("SYSTEM", `Terminal online, Operator ${state.operatorName}. Monitoring threats.`), 500);

        gameLoopInterval = setInterval(gameTick, GAME_TICK_INTERVAL);
        startIncidentSpawner();
        startIdleDialogue();
        render();
        console.log("System Ready.");
}

function handleLogin() {
    const savedName = localStorage.getItem('seraphOperatorName');
    if (savedName) {
        initializeGame(); 
        startGame(savedName);
    } else {
        loginModal.classList.remove('hidden');
    }
}

startShiftButton.addEventListener('click', () => {
    const operatorName = operatorNameInput.value.trim();
    if (operatorName) {
        localStorage.setItem('seraphOperatorName', operatorName);
        initializeGame();
        startGame(operatorName);
    } else {
        operatorNameInput.style.borderColor = '#f85149';
    }
});

    function showHeroDBModal(data, codename) {
        ui.heroDBContent.innerHTML = `
            <h2>${codename}</h2>
            <div class="db-section">
                <h4>Affiliation</h4>
                <p>${data.affiliation}</p>
            </div>
            <div class="db-section">
                <h4>Status</h4>
                <p>${data.status}</p>
            </div>
            <div class="db-section">
                <h4>Operator Dossier</h4>
                <p>${data.dossier}</p>
            </div>
        `;
        ui.heroDBModal.classList.remove('hidden');
    }

    function closeHeroDBModal() {
        ui.heroDBModal.classList.add('hidden');
    }

    function getDialogue(heroId, eventType) {
        const hero = state.allHeroes.find(h => h.id === heroId);
        if (hero && hero.dialogue && hero.dialogue[eventType]) {
            const lines = hero.dialogue[eventType];
            return lines[Math.floor(Math.random() * lines.length)];
        }
        return null;
    }

    function showCommsMessage(speaker, message) {
        if (!message || state.isGameOver) return;
        playSound('dialogue');
        clearTimeout(commsTimeout);
        document.querySelectorAll('#hero-list li.is-speaking').forEach(li => li.classList.remove('is-speaking'));
        const hero = state.allHeroes.find(h => h.codinome.toUpperCase() === speaker);
        if (hero) {
            const heroLi = document.getElementById(`hero-${hero.id}`);
            if (heroLi) heroLi.classList.add('is-speaking');
        }
        ui.commsSubtitleContainer.innerHTML = `<span class="hero-name">${speaker}:</span> "${message}"`;
        ui.commsSubtitleContainer.classList.remove('hidden');
        commsTimeout = setTimeout(() => {
            ui.commsSubtitleContainer.classList.add('hidden');
            if (hero) {
                const heroLi = document.getElementById(`hero-${hero.id}`);
                if (heroLi) heroLi.classList.remove('is-speaking');
            }
        }, COMMS_MESSAGE_DURATION);
    }

    function startIdleDialogue() {
        clearInterval(idleDialogueInterval);
        idleDialogueInterval = setInterval(() => {
            const availableHeroes = state.allHeroes.filter(h => h.cooldown === 0 && h.dialogue.onIdle && h.status === 'Ativo');
            if (availableHeroes.length > 0) {
                const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
                showCommsMessage(randomHero.codinome.toUpperCase(), getDialogue(randomHero.id, 'onIdle'));
            }
        }, 25000);
    }

    function startIncidentSpawner() {
        spawnIncident();
        incidentSpawnerInterval = setInterval(() => {
            if (state.incidentQueue.length > 0) {
                spawnIncident();
            } else {
                clearInterval(incidentSpawnerInterval);
            }
        }, INCIDENT_SPAWN_INTERVAL);
    }

    function gameTick() {
        if (state.isGameOver) {
            clearInterval(gameLoopInterval);
            return;
        }
        let needsFullRender = false;
        let lowTimeIncident = null;
        state.activeIncidents.forEach(incident => {
            if (incident.isPaused) return;
            if (incident.timeRemaining > 0) {
                incident.timeRemaining--;
                if (incident.timeRemaining <= 0) {
                    handleIncidentTimeout(incident.id);
                    needsFullRender = true;
                } else if (incident.timeRemaining === 20) {
                    lowTimeIncident = incident;
                }
            }
        });
        if(lowTimeIncident) {
            const optimalHero = state.allHeroes.find(h => h.id === lowTimeIncident.solutions.optimal && h.dialogue.onTimeLow);
            if(optimalHero) showCommsMessage(optimalHero.codinome.toUpperCase(), getDialogue(optimalHero.id, 'onTimeLow'));
        }
        if (needsFullRender) {
            render();
        } else {
            updateTimerBars();
        }
    }

    function spawnIncident() {
        if (state.isGameOver || state.incidentQueue.length === 0) return;
        const nextIncidentData = state.incidentQueue.shift();
        const newIncident = { ...nextIncidentData, timeRemaining: nextIncidentData.timer, initialTimer: nextIncidentData.timer, isPaused: false };
        state.activeIncidents.push(newIncident);
        playSound('new_incident');
        setTimeout(() => {
            const relevantHero = state.allHeroes.find(h => h.dialogue.onIncidentType && newIncident.tags?.some(tag => h.dialogue.onIncidentType[tag]));
            if (relevantHero) {
                const tag = newIncident.tags.find(tag => relevantHero.dialogue.onIncidentType[tag]);
            } else {
            }
        }, 1000);
        if (!state.selectedIncidentId) {
            state.selectedIncidentId = newIncident.id;
        }
        render();
    }

    function handleIncidentTimeout(incidentId) {
        playSound('failure');
        showCommsMessage("SYSTEM", `WARNING: Response time for incident ${incidentId} exceeded.`);
        console.log(`Incident ${incidentId} timed out.`);
        state.publicTrust += TRUST_CHANGE.TIMEOUT;
        state.totalScore -= 100; 
        state.incidentsFailed++;
        if (state.selectedIncidentId === incidentId) {
            state.isDisplayingReport = true;
            const reportText = `<h3>// MISSION FAILED //</h3><h3 style="color: ${OUTCOME_COLORS.FAILURE};">RESPONSE TIME EXCEEDED</h3><p>Operator, you failed to dispatch an asset in time.</p><p><strong>Public Trust Change: <span style="color: ${OUTCOME_COLORS.FAILURE};">${TRUST_CHANGE.TIMEOUT}</span></strong></p>`;
            typewriterEffect(ui.incidentDetails, reportText);
        }
        resolveIncident(incidentId);
        checkGameOver();
    }

    function dispatchHero() {
        if (!state.selectedIncidentId || !state.selectedHeroId || state.isGameOver) return;
        const incident = state.activeIncidents.find(inc => inc.id === state.selectedIncidentId);
        const hero = state.allHeroes.find(h => h.id === state.selectedHeroId);

        state.isDisplayingReport = true;
        state.lastTypedIncidentId = null;
        ui.incidentDetails.classList.add('hidden');
        ui.dispatchControls.classList.add('hidden');
        ui.dispatchLoader.classList.remove('hidden');
        ui.loaderBarFill.classList.add('loading');

        const statusUpdates = ["CONNECTING TO ASSET...", `UPLOADING MISSION DATA: [${incident.title.toUpperCase()}]`, `[${hero.codinome.toUpperCase()}] DEPLOYED. EN ROUTE...`];
        ui.dispatchStatusText.textContent = statusUpdates[0];
        setTimeout(() => { ui.dispatchStatusText.textContent = statusUpdates[1]; }, DISPATCH_DURATION / 3);
        setTimeout(() => { ui.dispatchStatusText.textContent = statusUpdates[2]; }, (DISPATCH_DURATION / 3) * 2);

        setTimeout(() => {
            ui.dispatchLoader.classList.add('hidden');
            ui.loaderBarFill.classList.remove('loading');
            ui.incidentDetails.classList.remove('hidden');
            hero.cooldown = HERO_MISSION_COOLDOWN + 1;

            let outcomeTitle, outcomeReport, trustChange, dialogueType, outcomeColor, scoreChange;

            if (incident.highPenalty?.includes(hero.id)) {
                outcomeTitle = "MISSION CRITICAL FAILURE";
                trustChange = TRUST_CHANGE.CRITICAL;
                scoreChange = -250;
                outcomeReport = `Operator, your choice of [${hero.codinome}] was a catastrophic error, resulting in severe negative consequences.`;
                dialogueType = 'onFailure';
                outcomeColor = OUTCOME_COLORS.FAILURE;
                playSound('game_over');
                showCommsMessage("AEGIS", "Operator, stand down! Your choice has compromised the mission!");
            } else if (hero.id === incident.solutions.optimal) {
                outcomeTitle = "MISSION SUCCESSFUL (OPTIMAL)";
                trustChange = TRUST_CHANGE.OPTIMAL;
                scoreChange = 150 + Math.floor(incident.timeRemaining * 1.5);
                outcomeReport = `Your choice of [${hero.codinome}] was optimal. The situation was resolved with maximum efficiency and zero complications.`;
                dialogueType = 'onSuccess';
                outcomeColor = OUTCOME_COLORS.SUCCESS;
                playSound('success');
            } else if (incident.solutions.good?.includes(hero.id)) {
                outcomeTitle = "MISSION SUCCESSFUL";
                trustChange = TRUST_CHANGE.GOOD;
                scoreChange = 100 + incident.timeRemaining;
                outcomeReport = `Your choice of [${hero.codinome}] was effective. The mission was a success.`;
                dialogueType = 'onSuccess';
                outcomeColor = OUTCOME_COLORS.SUCCESS;
                playSound('success');
            } else if (incident.solutions.complicated && incident.solutions.complicated[hero.id]) {
                outcomeTitle = "MISSION COMPLICATED";
                trustChange = TRUST_CHANGE.COMPLICATED;
                scoreChange = 20;
                outcomeReport = `[${hero.codinome}] resolved the primary threat, but with complications. <strong>Rationale:</strong> ${incident.solutions.complicated[hero.id]}`;
                dialogueType = 'onFailure';
                outcomeColor = OUTCOME_COLORS.COMPLICATED;
                playSound('failure');
            } else {
                outcomeTitle = "MISSION FAILED";
                trustChange = TRUST_CHANGE.FAILURE;
                scoreChange = -50;
                outcomeReport = `Your choice of [${hero.codinome}] was suboptimal. The mission objectives were not met effectively. <strong>Rationale:</strong> ${hero.failureReason}`;
                dialogueType = 'onFailure';
                outcomeColor = OUTCOME_COLORS.COMPLICATED;
                playSound('failure');
            }

            state.publicTrust += trustChange;
            state.totalScore += scoreChange;

            if (trustChange > 0) {
                state.incidentsResolved++;
            } else {
                state.incidentsFailed++;
            }
            
            if (state.publicTrust > 150) state.publicTrust = 150;

            setTimeout(() => {
                const reactingHero = state.allHeroes.find(h => h.cooldown === 0 && h.dialogue.onDispatchOf && h.dialogue.onDispatchOf[hero.id]);
                if (reactingHero) {
                    showCommsMessage(reactingHero.codinome.toUpperCase(), reactingHero.dialogue.onDispatchOf[hero.id]);
                }
            }, 1500);

            showCommsMessage(hero.codinome.toUpperCase(), getDialogue(hero.id, dialogueType));
            const reportText = `<h3>// AFTER-ACTION REPORT</h3><h3 style="color: ${outcomeColor};">${outcomeTitle}</h3><p>${outcomeReport}</p><p><strong>Public Trust Change: <span style="color: ${outcomeColor};">${trustChange > 0 ? '+' : ''}${trustChange}</span></strong></p>`;
            typewriterEffect(ui.incidentDetails, reportText);

            resolveIncident(incident.id);
            checkGameOver();
            render();
        }, DISPATCH_DURATION);
    }


    function resolveIncident(incidentId) {
    state.activeIncidents = state.activeIncidents.filter(inc => inc.id !== incidentId);
    state.allHeroes.forEach(h => {
        if (h.cooldown > 0) {
            h.cooldown--;
        }
    });

    if (state.selectedIncidentId === incidentId) {
        state.selectedHeroId = null;
        state.lastTypedIncidentId = null;
        
        if (state.activeIncidents.length > 0) {
            state.selectedIncidentId = state.activeIncidents[0].id;        
            state.isDisplayingReport = false; 
        } else {
            state.selectedIncidentId = null;
        }
    }

    if (state.activeIncidents.length === 0 && state.incidentQueue.length === 0) {
        endGame("All incidents resolved. Shift complete.");
    }
}

    function checkGameOver() {
        if (state.publicTrust <= GAME_OVER_THRESHOLD && !state.isGameOver) {
            endGame("Public trust has fallen below operational threshold. You have been relieved of duty.");
            return true;
        }
        return false;
    }

    function endGame(endMessage) {
        state.isGameOver = true;
        clearInterval(gameLoopInterval);
        clearInterval(incidentSpawnerInterval);
        clearTimeout(commsTimeout);
        clearInterval(idleDialogueInterval);
        playSound('game_over');

        let finalEvaluation = {};
        if (state.totalScore >= 750) {
            finalEvaluation = {
                rank: "Exemplary Field Commander",
                text: "Your performance exceeded all expectations. Your decision-making is a credit to this agency.",
                color: OUTCOME_COLORS.SUCCESS
            };
        } else if (state.totalScore >= 500) {
            finalEvaluation = {
                rank: "Proficient Operator",
                text: "A solid performance. You consistently made effective choices under pressure.",
                color: OUTCOME_COLORS.SUCCESS
            };
        } else if (state.totalScore >= 200) {
            finalEvaluation = {
                rank: "Standard Duty Officer",
                text: "Your performance meets ARISA standards. There is room for improvement in tactical efficiency.",
                color: OUTCOME_COLORS.COMPLICATED
            };
        } else {
            finalEvaluation = {
                rank: "Performance Review Required",
                text: "Your operational decisions led to suboptimal outcomes. Further training is recommended.",
                color: OUTCOME_COLORS.FAILURE
            };
        }
        
        document.getElementById('end-game-message').textContent = endMessage;
        document.getElementById('final-trust-stat').textContent = state.publicTrust;
        document.getElementById('final-score-stat').textContent = state.totalScore;
        document.getElementById('incidents-resolved-stat').textContent = state.incidentsResolved;
        document.getElementById('incidents-failed-stat').textContent = state.incidentsFailed;
        
        const finalEvaluationEl = document.getElementById('final-evaluation-stat');
        finalEvaluationEl.textContent = finalEvaluation.rank;
        finalEvaluationEl.style.color = finalEvaluation.color;
        
        document.getElementById('final-evaluation-text').textContent = finalEvaluation.text;


        ui.endGameModal.classList.remove('hidden');
    }

    function render() {
        if (state.isGameOver) {
            ui.endGameModal.classList.remove('hidden'); 
            // document.getElementById('final-score-stat').textContent = state.publicTrust;
            // document.getElementById('incidents-resolved-stat').textContent = ...;
            return;
        }
        renderHeroes();
        renderIncidents();
        renderScore();
        renderActiveIncident();
    }

    function renderHeroes() {
        ui.heroList.innerHTML = '';
        state.allHeroes
            .filter(h => h.status === 'Ativo')
            .forEach(hero => {
                const li = document.createElement('li');
                li.id = `hero-${hero.id}`;
                li.dataset.heroId = hero.id;
                li.className = hero.id === state.selectedHeroId ? 'selected' : '';
                if (hero.cooldown > 0) {
                    li.textContent = `${hero.codinome} (Cooldown: ${hero.cooldown})`;
                    li.classList.add('unavailable');
                } else {
                    li.textContent = hero.codinome;
                    li.classList.remove('unavailable');
                }
                ui.heroList.appendChild(li);
        });
    }

    function renderIncidents() {
        ui.incidentList.innerHTML = '';
        state.activeIncidents.forEach(incident => {
            const li = document.createElement('li');
            li.id = `incident-${incident.id}`;
            li.dataset.incidentId = incident.id;
            li.className = incident.id === state.selectedIncidentId ? 'selected' : '';
            const titleSpan = document.createElement('span');
            titleSpan.textContent = incident.title;
            const timerContainer = document.createElement('div');
            timerContainer.className = 'timer-bar-container';
            const timerFill = document.createElement('div');
            timerFill.className = 'timer-bar-fill';
            timerFill.id = `timer-${incident.id}`;
            timerContainer.appendChild(timerFill);
            li.appendChild(titleSpan);
            li.appendChild(timerContainer);
            ui.incidentList.appendChild(li);
        });
        updateTimerBars();
    }

    function renderScore() {
        ui.publicTrustScore.textContent = state.publicTrust;
        if (state.publicTrust >= 100) {
            ui.publicTrustScore.style.color = OUTCOME_COLORS.SUCCESS;
        } else if (state.publicTrust > GAME_OVER_THRESHOLD + 25) {
            ui.publicTrustScore.style.color = '#c9d1d9';
        } else {
            ui.publicTrustScore.style.color = OUTCOME_COLORS.COMPLICATED;
        }
    }

    function renderActiveIncident() {
        if (state.isDisplayingReport) return;
        if (state.selectedIncidentId) {
            if (state.selectedIncidentId === state.lastTypedIncidentId) {
                updateDispatchButtonState();
                return;
            }
            const incident = state.activeIncidents.find(inc => inc.id === state.selectedIncidentId);
            if (incident) {
                const reportText = `<h3>INCIDENT REPORT: ${incident.title}</h3><p>${incident.description}</p><h3>WITNESS STATEMENT</h3><p><em>"${incident.details.witness}"</em></p><h3>S.E.R.A.P.H. ANALYSIS</h3><p>${incident.details.seraph_analysis}</p>`;
                typewriterEffect(ui.incidentDetails, reportText);
                state.lastTypedIncidentId = state.selectedIncidentId;
                ui.dispatchControls.classList.remove('hidden');
                updateDispatchButtonState();
            } else {
                state.selectedIncidentId = null;
                state.lastTypedIncidentId = null;
                renderActiveIncident();
            }
        } else if (state.activeIncidents.length > 0) {
            typewriterEffect(ui.incidentDetails, `<p class="placeholder">Select an active incident for analysis.</p>`);
            ui.dispatchControls.classList.add('hidden');
        } else if (state.incidentQueue.length === 0) {
            typewriterEffect(ui.incidentDetails, `<p class="placeholder">All incidents resolved. System is nominal. Good work, Operator.</p>`);
            ui.dispatchControls.classList.add('hidden');
        }
    }

    function updateDispatchButtonState() {
        ui.dispatchButton.disabled = !state.selectedHeroId || !state.selectedIncidentId;
    }

    function updateTimerBars() {
        state.activeIncidents.forEach(incident => {
            const timerFillEl = document.getElementById(`timer-${incident.id}`);
            if (timerFillEl) {
                const percentage = (incident.timeRemaining / incident.initialTimer) * 100;
                timerFillEl.style.width = incident.isPaused ? `${percentage}%` : `${percentage}%`;
                if(incident.isPaused) {
                    timerFillEl.style.backgroundColor = '#58a6ff';
                } else if (percentage < 25) {
                    timerFillEl.style.backgroundColor = '#f85149';
                } else if (percentage < 50) {
                    timerFillEl.style.backgroundColor = '#f7b32b';
                } else {
                    timerFillEl.style.backgroundColor = '#2ea043';
                }
            }
        });
    }

    function handleIncidentClick(e) {
    const targetLi = e.target.closest('li');
    if (targetLi && targetLi.dataset.incidentId && !state.isGameOver) {
        playSound('click');
        clearInterval(typewriterInterval);
        state.isDisplayingReport = false; 
        state.selectedIncidentId = targetLi.dataset.incidentId;
        state.selectedHeroId = null;
        render(); 
    }
}

    function handleHeroClick(e) {
        const targetLi = e.target.closest('li');
        if (targetLi && targetLi.dataset.heroId && !state.isGameOver) {
            const hero = state.allHeroes.find(h => h.id === targetLi.dataset.heroId);
            if (hero.cooldown === 0) {
                playSound('click');
                if(state.selectedHeroId !== targetLi.dataset.heroId) {
                    showCommsMessage(hero.codinome.toUpperCase(), getDialogue(hero.id, 'onSelect'));
                }
                state.selectedHeroId = targetLi.dataset.heroId;
                renderHeroes();
                updateDispatchButtonState();
            }
        }
    }
    
    function typewriterEffect(element, htmlString, callback) {
        clearInterval(typewriterInterval);
        element.innerHTML = htmlString;
        const allNodes = element.querySelectorAll('h3, p, strong, em, span');
        const textsToType = [];
        allNodes.forEach(node => {
            if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
                textsToType.push({ element: node, text: node.textContent });
                node.textContent = '';
            }
        });
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        function type() {
            if (currentTextIndex >= textsToType.length) {
                if (callback) callback();
                return;
            }
            const currentJob = textsToType[currentTextIndex];
            if (currentCharIndex < currentJob.text.length) {
                currentJob.element.textContent += currentJob.text.charAt(currentCharIndex);
                currentCharIndex++;
                setTimeout(type, TYPEWRITER_SPEED);
            } else {
                currentTextIndex++;
                currentCharIndex = 0;
                setTimeout(type, TYPEWRITER_SPEED);
            }
        }
        type();
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    //initializeGame();
    handleLogin();
});

