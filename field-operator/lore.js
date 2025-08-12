const loreData = [
    { "id": "arisa", "tipo": "organizacao", "nome_completo": "ARISA – Awakened Response, Investigation & Security Agency" },
    { "id": "the_paramount", "tipo": "organizacao", "titulo": "The Paramount" },
    { "id": "the_vanguards", "tipo": "organizacao", "titulo": "The Vanguards" },

    {
        "id": "aegis", "tipo": "personagem", "codinome": "Aegis", "afiliacao": "The Paramount", "status": "Ativo",
        "failureReason": "His direct, high-impact approach is ill-suited for delicate or investigative situations, often causing unnecessary alarm.",
        "dialogue": {
            "onSelect": ["Aegis, confirmed.", "Understood, Operator. On my way.", "Ready for deployment."],
            "onSuccess": ["The situation is neutralized. Good call.", "Objective complete. Returning to base."],
            "onFailure": ["We contained it, but this could have been handled with more finesse.", "Mission complete, but the collateral was higher than necessary."],
            "onDispatchOf": {
                "mosaic": "Good choice. We need intelligence before we act.",
                "flashpoint": "Keep your enthusiasm in check, kid. Focus on the mission."
            }
        }
    },
    {
        "id": "mosaic", "tipo": "personagem", "codinome": "Mosaic", "afiliacao": "The Paramount", "status": "Ativo",
        "failureReason": "His non-combat abilities make him a liability if the situation escalates into physical violence.",
        "dialogue": {
            "onSelect": ["Proceeding with cognitive analysis.", "The past always leaves a trace. I'll find it.", "On site. Beginning scan."],
            "onSuccess": ["I have the data. The subject never knew I was there.", "Analysis complete. Sending the report to your terminal."],
            "onFailure": ["I got the intel, but it got loud. I'm not equipped for direct confrontation.", "My presence was detected. We'll need a different approach next time."]
        }
    },
    {
        "id": "battery", "tipo": "personagem", "codinome": "Battery", "afiliacao": "The Paramount", "status": "Ativo",
        "failureReason": "Her all-or-nothing power can cause significant collateral damage if not applied to the correct type of threat.",
        "dialogue": {
            "onSelect": ["Charging up.", "I'll be in and out in a flash.", "Ready to discharge."],
            "onSuccess": ["Threat neutralized. Fast and clean.", "That was quick. What's next?"],
            "onFailure": ["Target is down, but I left a mess. Hope the budget covers it.", "It worked, but it wasn't pretty."],
            "onTimeLow": ["Operator, if you're sending me, do it now!", "We're running out of time! Let's go, go, go!"],
            "onDispatchOf": {
                "flashpoint": "Don't burn yourself out, kid. Speed isn't everything."
            }
        }
    },
    {
        "id": "downdraft", "tipo": "personagem", "codinome": "Downdraft", "afiliacao": "The Paramount", "status": "Ativo",
        "failureReason": "His abilities are for control and suppression, not direct damage, making him ineffective against heavily fortified or resilient targets.",
        "dialogue": { "onSelect": ["Adjusting atmospheric pressure.", "Moving in to control the area.", "They won't know what hit them."], "onSuccess": ["The area is secure. Evacuation can begin.", "Hostiles neutralized without a single shot fired."], "onFailure": ["I held them, but I couldn't stop them. We needed a heavier hitter.", "My control wasn't enough for this level of threat."] }
    },
    {
        "id": "armory", "tipo": "personagem", "codinome": "Armory", "afiliacao": "The Paramount", "status": "Ativo",
        "failureReason": "While versatile, her purely offensive nature is not suited for missions requiring subtlety or non-lethal resolution.",
        "dialogue": {
            "onSelect": ["Weapon systems online.", "The right tool for the job. I'm ready.", "Armory, ready to engage."],
            "onSuccess": ["Target secured. Threat neutralized with precision.", "Mission complete. All assets accounted for."],
            "onFailure": ["The objective was met, but the approach was... loud. We can be more efficient.", "A win is a win, but that was sloppy. My apologies, Operator."]
        }
    },
    {
        "id": "loop", "tipo": "personagem", "codinome": "Loop", "afiliacao": "The Paramount", "status": "Ativo",
        "failureReason": "Her temporal abilities are complex and can have unforeseen consequences if used in an unstable environment, causing more chaos than they solve.",
        "dialogue": {
            "onSelect": ["Let's do the time warp again.", "I'm already there. And there.", "Looping in."],
            "onSuccess": ["Mission complete. I think. It's all a bit blurry.", "They never knew what hit them. Or when.", "Looping out."],
            "onFailure": ["Okay, that got... weird. My echoes are still fighting each other.", "Time is a fragile thing. We might have cracked it a little."]
        }
    },
    {
        "id": "seraphim", "tipo": "personagem", "codinome": "Seraphim", "afiliacao": "ARISA / The Paramount", "status": "Ativo",
        "failureReason": "Her purely analytical and predictive abilities are ineffective against threats that are entirely chaotic, unpredictable, or require overwhelming physical force to resolve.",
        "dialogue": {
            "onSelect": ["Calculating optimal engagement vectors.", "All possibilities are in view. Ready.", "My analysis is complete. Proceeding."],
            "onSuccess": ["The outcome was within acceptable parameters.", "A successful resolution, as predicted."],
            "onFailure": ["The variables were... unpredictable. A rare miscalculation.", "This outcome had a low but non-zero probability. We will adapt."]
        }
    },
    {
        "id": "flashpoint", "tipo": "personagem", "codinome": "Flashpoint", "afiliacao": "The Vanguards", "status": "Ativo",
        "failureReason": "His brash, head-on approach lacks the tactical finesse required for complex or stealth-based missions.",
        "dialogue": {
            "onSelect": ["Let's go, let's go!", "I'm on it!", "Flashpoint, ready for action!"],
            "onSuccess": ["Boom! Done. What's next?", "Was there ever any doubt?"],
            "onFailure": ["Hey, we got the job done, didn't we?", "Okay, so maybe I broke a few things..."],
            "onTimeLow": ["Come on, Operator, put me in! I'm getting bored over here!"]
        }
    },
    {
        "id": "spoiler", "tipo": "personagem", "codinome": "Spoiler", "afiliacao": "The Vanguards", "status": "Ativo",
        "failureReason": "Her sensory dampening is ineffective against purely physical threats or brutes.",
        "dialogue": {
            "onSelect": ["Acknowledged.", "Going dark.", "Spoiler, on the move."],
            "onSuccess": ["Target silenced.", "No witnesses, no alarms. Clean exit."],
            "onFailure": ["They knew I was there. My cover was blown.", "Containment achieved, but stealth was compromised."]
        }
    },
    {
        "id": "chisel", "tipo": "personagem", "codinome": "Chisel", "afiliacao": "The Vanguards", "status": "Ativo",
        "failureReason": "His defensive nature means he lacks the offensive capability to quickly neutralize threats.",
        "dialogue": {
            "onSelect": ["I'll hold the line.", "Moving to establish a defensive position.", "They won't get through me."],
            "onSuccess": ["Civilians are safe. That's all that matters.", "The line was held. Glad I could help."],
            "onFailure": ["I protected the objective, but I couldn't stop them completely.", "They were stronger than I anticipated."]
        }
    },
    {
        "id": "viceroy", "tipo": "personagem", "codinome": "Viceroy", "afiliacao": "The Vanguards", "status": "Ativo",
        "failureReason": "His power requires getting precision, which is extremely risky against area-of-effect or powerful ranged opponents.",
        "dialogue": {
            "onSelect": ["A precise touch is required.", "Consider it handled.", "Moving with finesse."],
            "onSuccess": ["Elegance in execution. Target secured.", "No complications. As expected."],
            "onFailure": ["The target was more erratic than anticipated. The extraction was not clean.", "A regrettable lack of subtlety was required."]
        }
    },
    {
        "id": "kinesis", "tipo": "personagem", "codinome": "Kinesis", "afiliacao": "The Vanguards", "status": "Ativo",
        "failureReason": "Her reliance on custom gear makes her vulnerable if her equipment is damaged or neutralized.",
        "dialogue": {
            "onSelect": ["Kinesis here. All systems green!", "Time to test out some new gear.", "Let's get moving!"],
            "onSuccess": ["Target acquired. And I set a new speed record!", "That was easy. My gear worked perfectly."],
            "onFailure": ["My equipment took a hit. I need to recalibrate.", "The terrain was trickier than the simulations. I'll adapt the gear for next time."]
        }
    },
    {
        "id": "lockshot", "tipo": "personagem", "codinome": "Lockshot", "afiliacao": "The Vanguards", "status": "Ativo",
        "failureReason": "His power is for single-target elimination and lacks any crowd control capabilities.",
        "dialogue": {
            "onSelect": ["Target acquired.", "Locking on.", "..."],
            "onSuccess": ["Target neutralized.", "Done."],
            "onFailure": ["Complications. Too many variables.", "The shot missed. Recalculating."]
        }
    }
];

const incidentData = [
    {
        id: 'incident-001',
        title: 'Kinetic Outburst - Chicago',
        timer: 90,
        description: 'An unregistered Awakened is causing significant damage downtown. The subject is absorbing and explosively releasing kinetic energy, creating dangerous shockwaves.',
        details: {
            witness: "An officer on scene reported: 'This kid... he's terrified. Every time a car horn honks or something loud happens, he flinches and the whole street shakes. He's a walking epicentre and he can't control it.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The subject's power is consistent with [Kinetic Energy] accumulation and discharge. This is a volatile ability that escalates with external stimuli. A counter-asset with similar energy absorption or overload capabilities is recommended for containment."
        },
        solutions: {
            optimal: 'battery',
            good: ['flashpoint'],
            complicated: {
                'aegis': "Aegis was durable enough to withstand the blasts and restrain the subject, but his high-profile presence caused a media frenzy, complicating the subject's anonymity."
            }
        }
    },
    {
        id: 'incident-002',
        title: 'Psychic Residue - Financial District',
        timer: 120,
        description: 'A high-profile data heist occurred at a corporate tower, but all security systems are intact. No signs of forced entry. Agents on site report a lingering feeling of disorientation and fragmented memories.',
        details: {
            witness: "Head of security stated: 'It makes no sense. The vault is sealed. The cameras show nothing. It's like the data just... walked out. My team feels like they're forgetting something important, just on the edge of their minds.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The lack of physical evidence points to a cognitive or psychic infiltration. Standard investigation methods are ineffective. The only remaining evidence may be residual psychic imprints left on the environment and personnel."
        },
        solutions: {
            optimal: 'mosaic',
            good: [],
            complicated: {
                'seraphim': "Seraphim's analysis correctly identified the perpetrator and their methods, but the psychic residue had already degraded, leaving insufficient evidence for prosecution."
            }
        }
    },
    {
        id: 'incident-003',
        title: 'Atmospheric Turbulence - Public Park',
        timer: 75,
        description: 'A localized, non-weather-related atmospheric disturbance is causing chaos in a downtown park. Sudden, powerful downdrafts and crosswinds are making evacuation difficult and dangerous.',
        details: {
            witness: "A news helicopter pilot reported: 'I can't get close! The air itself is fighting me. One second it's calm, the next a blast of wind shoves my chopper sideways. Below, people are being knocked over by invisible walls of air.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The phenomenon is consistent with localized [Air Pressure] manipulation, not a natural weather event. A direct offensive approach would be ineffective. Asset must be capable of meteorological stabilization or wide-area control to secure the zone."
        },
        solutions: {
            optimal: 'downdraft',
            good: [],
            complicated: {
                'chisel': "Chisel was able to create a physical barrier to shield a large group of civilians, but could not stop the phenomenon itself, which continued to cause damage elsewhere in the park."
            }
        }
    },
    {
        id: 'incident-004',
        title: 'VIP Extraction - Gala Event',
        timer: 100,
        description: 'A hostile Awakened has infiltrated a high-security charity gala. A high-value informant must be neutralized and extracted without alerting the other guests or causing a panic.',
        details: {
            witness: "Undercover Agent (via comms): 'Target is on the move. He's surrounded by civilians. We can't go loud. I repeat, do not engage with force. We need a ghost.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: Mission profile requires zero collateral damage and complete stealth. Target must be disabled in a high-density civilian area without drawing attention. A close-quarters, non-lethal, precision takedown is the only viable method."
        },
        solutions: {
            optimal: 'viceroy',
            good: ['spoiler'],
            complicated: {
                'mosaic': "Mosaic was able to psychically suggest the target leave the party, but the mental strain was obvious and several nearby guests reported feeling nauseous and confused, raising suspicions."
            }
        }
    },
    {
        id: 'incident-005',
        title: 'Armored Siege - Downtown Bank',
        timer: 80,
        description: 'An aggressive Awakened with reinforced skin is holding hostages inside a bank vault. They are impervious to standard police munitions and are highly volatile.',
        details: {
            witness: "SWAT Captain (on site): 'We can't breach the door and we can't get a shot. This guy is a walking tank. We need heavy, overwhelming firepower, something that can be shaped for any situation.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: Target exhibits extreme physical durability, rendering standard munitions ineffective. A sustained, high-energy, and versatile offensive is required to breach its defenses. The asset must be capable of adapting their offensive output in real-time to exploit any potential weakness."
        },
        solutions: {
            optimal: 'armory',
            good: ['battery'],
            complicated: {
                'aegis': "Aegis engaged the target in a prolonged physical confrontation. While successful, the extensive property damage lowered public opinion of the intervention."
            }
        }
    },
    {
        id: 'incident-006',
        title: 'Runaway Vehicle - Maglev Line',
        timer: 60,
        description: 'A magnetically accelerated public transport vehicle has lost its braking system and is speeding towards the central station. A high-impact intervention is needed to stop it before it crashes.',
        details: {
            witness: "Transit Authority: 'All remote overrides have failed! It's a runaway train, literally! We need someone who can hit it hard enough to stop it, now!'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The vehicle's velocity and mass require a massive, instantaneous application of kinetic force to achieve deceleration without derailing. An asset capable of high-speed impact is the only viable option."
        },
        solutions: {
            optimal: 'flashpoint',
            good: ['battery', 'aegis'],
            complicated: {
                'chisel': "Chisel managed to stop the train by bracing himself on the tracks, but the sheer force caused significant damage to both the train and the station infrastructure."
            }
        }
    },
    {
        id: 'incident-007',
        title: 'Sonic Hostage Situation - Library',
        timer: 120,
        description: 'A villain has taken hostages in the city library, armed with a sonic device that will detonate if it detects any loud noise, including communications.',
        details: {
            witness: "First responder (whispering on a low-band freq): 'We can't even talk in here. He's got sensors everywhere. One loud noise and this whole place goes up. We need a silent solution.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: Threat requires a total sensory-deprivation approach. The asset must be able to create a zone of absolute silence to allow for a stealth takedown. Standard physical or energy-based powers are too risky."
        },
        solutions: {
            optimal: 'spoiler',
            good: [],
            complicated: {
                'viceroy': "Viceroy successfully disabled the hostage-taker with a single look, but the villain managed to let out a sharp gasp, triggering the alarm. The bomb was disarmed with only seconds to spare."
            }
        }
    },
    {
        id: 'incident-008',
        title: 'Structural Collapse - Old Factory',
        timer: 150,
        description: 'An abandoned factory is undergoing a catastrophic structural collapse with a rescue team trapped inside. The main support beams are failing and need to be held in place.',
        details: {
            witness: "Fire Chief on site: 'The whole roof is coming down! My people are trapped under a primary support girder. If someone can't hold that girder up for just a few minutes, we're going to lose them!'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The immediate priority is stabilization, not threat neutralization. An asset with immense physical strength and durability is required to bear the load of the collapsing structure while extraction takes place. This is a purely defensive and resilience-based operation."
        },
        solutions: {
            optimal: 'chisel',
            good: ['aegis'],
            complicated: {
                'battery': "Her kinetic discharge stabilized the main girder but caused secondary shockwaves, making the rescue more hazardous for the fire crew."
            }
        }
    },
    {
        id: 'incident-010',
        title: 'Hostage Negotiation - Penthouse',
        timer: 180,
        description: 'A paranoid, teleporting Awakened has taken a CEO hostage in his penthouse apartment. He is highly agitated and has threatened to jump with the hostage if he sees any overt show of force.',
        details: {
            witness: "Police Negotiator: 'He's unstable. Every time a helicopter gets close, he teleports the hostage to the edge of the balcony. We can't use force. I repeat, any aggressive asset will make things worse. We need someone who can get in and out without him even knowing.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: Extreme delicacy required. This is a de-escalation and extraction scenario. A direct confrontation will result in mission failure. The asset must be capable of a non-lethal, close-quarters, surprise takedown. Failure to adhere to protocol will have severe consequences."
        },
        solutions: {
            optimal: 'viceroy',
            good: ['spoiler'],
            complicated: {
                'seraphim': "Seraphim successfully talked the subject down, but the prolonged negotiation gave the media time to arrive, revealing the CEO's identity and causing a stock market dip."
            }
        },
        highPenalty: ['aegis', 'armory', 'battery', 'flashpoint']
    },
    {
        id: 'incident-013',
        title: 'Entrenched Target - Warehouse District',
        timer: 150,
        description: 'A rogue agent is barricaded inside a shipping container, protected by heavy plating. He has a dead man\'s switch that will erase critical data if his container is breached by force.',
        details: {
            witness: "Mosaic (from a safe distance): 'I can feel his mind. He's paranoid and his finger is on the trigger. There is no direct line of sight, and we cannot breach the container. Any other ideas, Operator?'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The target is in a hard-to-reach, fortified position. A direct assault is off the table due to the dead man's switch. The mission requires a non-line-of-sight, precision takedown. The asset must be able to neutralize the target without compromising the container's integrity."
        },
        solutions: {
            optimal: 'lockshot',
            good: [],
            complicated: {
                'downdraft': "Downdraft managed to suck the oxygen out of the container, causing the agent to pass out. However, this damaged the sensitive electronic data that was meant to be recovered."
            }
        }
    },
    {
        id: 'incident-014',
        title: 'Regenerative Anomaly - Bio-Lab',
        timer: 100,
        description: 'A crystalline bio-form in a research lab has breached containment. It regenerates from any single point of damage almost instantly. It needs to be shattered.',
        details: {
            witness: "Lead Scientist (on comms): 'Our security teams can't make a dent! We damage one part, and it regrows before we can hit another. It has multiple regeneration nodes that need to be struck at the exact same moment!'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The target's regenerative matrix is decentralized. Analysis indicates that only simultaneous or near-simultaneous multi-point impacts can overload its recovery capacity. A single, powerful strike will be ineffective."
        },
        solutions: {
            optimal: 'loop',
            good: [],
            complicated: {
                'armory': "Armory generated a wide-dispersion plasma weapon. It destroyed the anomaly but also incinerated most of the lab equipment, destroying valuable research."
            }
        }
    },
    {
        id: 'incident-015',
        title: 'Mass Panic - Grand Central',
        timer: 180,
        description: 'A series of minor, unrelated Awakened events have triggered a mass panic at Grand Central Station during rush hour. The situation is chaotic but not directly hostile. Local authorities are overwhelmed.',
        details: {
            witness: "NYPD Captain: 'It's a stampede waiting to happen! We don't need a fighter, we need a leader. Someone to calm the crowd, coordinate my officers, and be a symbol of stability until we can get this sorted.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: The primary threat is crowd dynamics, not an antagonist. The mission requires an asset with proven leadership capabilities and a strong public image to perform command, control, and de-escalation functions. A purely tactical or combat asset would be ineffective here."
        },
        solutions: {
            optimal: 'aegis',
            good: ['seraphim'],
            complicated: {
                'downdraft': "Downdraft used his powers to create 'safe zones' and guide the crowd, but the disembodied force caused some initial panic, mistaken for another attack."
            }
        }
    },
    {
        id: 'incident-016',
        title: 'Multi-Threat Crisis - Times Square',
        timer: 180,
        description: 'A coordinated attack has unleashed three interconnected threats in Times Square: a bomb wired to a hostage, a psychic beacon causing mass panic, and an automated defense turret.',
        details: {
            witness: "Aegis (on site): 'Operator, this is a tactical paradox. If we move the hostage, the bomb goes off. If we attack the turret, we can't get to the beacon. If we disable the beacon, the turret will eliminate the hostage. Every choice leads to failure.'",
            seraph_analysis: "S.E.R.A.P.H. Analysis: All standard assets are suboptimal. This scenario is a logic trap designed to defeat conventional tactics. The situation requires an asset capable of real-time probability analysis to identify the single, counter-intuitive vector of engagement that resolves all three threats simultaneously."
        },
        solutions: {
            optimal: 'seraphim',
            good: [],
            complicated: {}
        }
    }
];