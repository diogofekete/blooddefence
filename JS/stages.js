var Stages = [{
    id: 1,						// ID of this stage
    name: "Fungi Growing",		// Name of this stage
	health: 60,					// Initial health points
	rbc: 2,						// Quantity of blood cells created per interval
	rbcInterval: 1000, 			// Controls creation frequency of blood cells
	rbcXBoost: 0,				// Increase (+) or decrease (-) the default velocity (0.22) of all RBC 
    virus: 8000, 				// Controls creation frequency of this enemy
	virusDuplicationRate: .5,	// Probability of a virus duplicates when kill a RBC
    bacteria: 7000, 				// Controls creation frequency of this enemy
    protozoa: 7000, 				// Controls creation frequency of this enemy
    fungi: 3000,				// Controls creation frequency of this enemy
    gapSize: 230, 				// Controls the initial size of the wound (bigger = more room for enemies to appear)
	boneMarrowCapacity: 100,	// Initial BoneMarrow capacity of WBC creation: 50 = very low ... 300 = very high
	boneMarrowRegeneration: .5, // Regeneration frequency of the BoneMarrow: .03 = very slow ... 3 = very fast
	boneMarrowWbcUse: 7, 		// Initial cost for WBC creation: 1 = little ... 20 = a lot
	boneMarrowStamina: .2, 		// Stamina controls WBC creation frequency (high creation frequency more BoneMarrowUse): .1 = LOW stamina ... 1 = HIGH stamina
	vitamins: 2,				// Number max of vitamins created at the same time
	vitaminRate: .05				// Probality to create a vitamin each frame: .0001 LOW probability ... .1 HIGH probability
}, {
    id: 2,
    name: "Worms.. yuck!",
	health: 98,
	rbc: 1,
	rbcInterval: 500,
	rbcXBoost: 0,
    virus: 0,
	virusDuplicationRate: .5,
    bacteria: 1200,
    protozoa: 1100,
    fungi: 0,
    gapSize: 30,
	boneMarrowCapacity: 200,
	boneMarrowRegeneration: 1,
	boneMarrowWbcUse: 9,
	boneMarrowStamina: 1,
	vitamins: 2,
	vitaminRate: .1
}, {
    id: 3,
    name: "Bacterias!",
	health: 55,
	rbc: 2,
	rbcInterval: 1250, //Zeeshan K. Hayat (21.02.2013)
	rbcXBoost: 0,
    virus: 0,
	virusDuplicationRate: .5,
    bacteria: 1250,
    protozoa: 0,
    fungi: 0,
    gapSize: 40,
	boneMarrowCapacity: 200,
	boneMarrowRegeneration: 1,
	boneMarrowWbcUse: 9,
	boneMarrowStamina: 1,
	vitamins: 2,
	vitaminRate: .1
}, {
    id: 4,
    name: "Virus Invasion",
	health: 50,
	rbc: 3,
	rbcInterval: 750, //Zeeshan K. Hayat (21.02.2013)
	rbcXBoost: 0,
    virus: 800,
	virusDuplicationRate: .5,
    bacteria: 0,
    protozoa: 0,
    fungi: 0,
    gapSize: 40,
	boneMarrowCapacity: 200,
	boneMarrowRegeneration: 1,
	boneMarrowWbcUse: 9,
	boneMarrowStamina: 1,
	vitamins: 2,
	vitaminRate: .1
}, {
    id: 5,
    name: "Verms!",
	health: 45,
	rbc: 4,
	rbcInterval: 1050, //Zeeshan K. Hayat (21.02.2013)
	rbcXBoost: 0,
    virus: 0,
	virusDuplicationRate: .5,
    bacteria: 900,
    protozoa: 800,
    fungi: 700,
    gapSize: 50,
	boneMarrowCapacity: 200,
	boneMarrowRegeneration: 1,
	boneMarrowWbcUse: 9,
	boneMarrowStamina: 1,
	vitamins: 2,
	vitaminRate: .1
}, {
    id: 6,
    name: "Virus & Bacterias",
	health: 30,
	rbc: 5,
	rbcInterval: 1025, //Zeeshan K. Hayat (21.02.2013)
	rbcXBoost: 0,
    virus: 550,
	virusDuplicationRate: .5,
    bacteria: 700,
    protozoa: 0,
    fungi: 0,
    gapSize: 60,
	boneMarrowCapacity: 200,
	boneMarrowRegeneration: 1,
	boneMarrowWbcUse: 9,
	boneMarrowStamina: 1,
	vitamins: 2,
	vitaminRate: .1
}, {
    id: 7,
    name: "Infestation",
	health: 25,
	rbc: 5,
	rbcInterval: 1250, //Zeeshan K. Hayat (21.02.2013)
	rbcXBoost: 0,
	enemyInterval: 1000,
    virus: 300,
	virusDuplicationRate: .5,
    bacteria: 350,
    protozoa: 400,
    fungi: 550,
    gapSize: 100,
	boneMarrowCapacity: 200,
	boneMarrowRegeneration: 1,
	boneMarrowWbcUse: 9,
	boneMarrowStamina: 1,
	vitamins: 2,
	vitaminRate: .1
}];