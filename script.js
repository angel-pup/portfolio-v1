let gameData = {
    rock: {
        ties: 0,
        wins: 0,
        losses: 0
    },
    paper: {
        ties: 0,
        wins: 0,
        losses: 0
    },
    scissors: {
        ties: 0,
        wins: 0,
        losses: 0
    }
}


function generateRandomOutcome(previousOutcome, previousChanceArray) {

    let outcome
    let chanceArray = [...previousChanceArray]
    let sumChance, randomChoice

    switch(previousOutcome) {
        case "R":
            if(chanceArray[0] > 50.0) {
                chanceArray[0] -= 2
                chanceArray[1]++
                chanceArray[2]++
            }
            break
        case "P":
            if(chanceArray[1] > 50.0) {
                chanceArray[1] -= 2
                chanceArray[0]++
                chanceArray[2]++
            }
            break
        case "S":
            if(chanceArray[2] > 50.0) {
                chanceArray[2] -= 2
                chanceArray[0]++
                chanceArray[1]++
            }
            break
        default:
        //do nothing
    }

    sumChance = chanceArray.reduce((accumulator, currentValue) => accumulator + currentValue)

    randomChoice = Math.random() * sumChance

    if(randomChoice > (sumChance - chanceArray[2])) {
        outcome = "S"
    }
    else if(randomChoice > (sumChance - chanceArray[2] - chanceArray[1])) {
        outcome = "P"
    } else {
        outcome = "R"
    }

    return [outcome, chanceArray]
}

function alertOutcome(compOut, userInput) {

    let userIn = userInput.toUpperCase()

    if(compOut === userIn) {
        switch(userIn) {
            case "R":
                gameData.rock.ties++
                break
            case "P":
                gameData.paper.ties++
                break
            case "S":
                gameData.scissors.ties++
                break
            default:
            //do nothing
        }
        return "Tie!"
    }

    switch(userIn) {
        case "R":
            if(compOut === "S") {
                gameData.rock.wins++
                return "You win! Computer choose " + compOut + "!"
            }
            gameData.rock.losses++
            return "You lose. Computer choose " + compOut + "."
        case "P":
            if(compOut === "R") {
                gameData.paper.wins++
                return "You win! Computer choose " + compOut + "!"
            }
            gameData.paper.losses++
            return "You lose. Computer choose " + compOut + "."
        case "S":
            if(compOut === "P") {
                gameData.scissors.wins++
                return "You win! Computer choose " + compOut + "!"
            }
            gameData.scissors.losses++
            return "You lose. Computer choose " + compOut + "."
        default:
            return "Invalid input, please try again."
    }
}

function playGame() {
    let cont = true
    let userChoice = "none"
    let compPrevious = "none"
    let chanceArray = [100.0, 100.0, 100.0]
    let gameResults

    while(cont) {
        userChoice = prompt("Rock, Paper, or Scissors? [ Enter 'R', 'P', or 'S' ]")

        gameResults = generateRandomOutcome(compPrevious, chanceArray) //decompose bug found

        //manual decomposition to patch bug
        compPrevious = gameResults[0]
        chanceArray = [...gameResults[1]]

        alert(alertOutcome(compPrevious, userChoice))

        cont = confirm("Would you like to play again? [ Click OK to continue or Cancel to quit ]")
    }

    alert("Thanks for playing!")

    console.log("\nResults:")
    for (let x in gameData) {
        console.log(x)
        for (let y in gameData[x]) {
            console.log('\t', y, gameData[x][y])
        }
    }
}