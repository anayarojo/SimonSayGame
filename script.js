const levels = 3

function initGame() {
    nextRound(0)
}

function nextRound(currentLevel) {

    let keys = generateKeys(levels)

    if (currentLevel == (levels)) {
        return swal({
            title: "Ganaste!",
            type: "success"
        })
    }

    swal({
        timer: 1000,
        title: `Nivel ${currentLevel + 1}`,
        showConfirmButton: false
    })

    for (let i = 0; i <= currentLevel; i++) {
        setTimeout(() => activate(keys[i]), (i + 2) * 1000)
    }

    let i = 0
    let currentKey = keys[i]

    window.addEventListener("keydown", onKeydown)

    function onKeydown(e) {
        if (e.keyCode == currentKey) {
            activate(currentKey, { success: true })
            i++
            if (i > currentLevel) {
                window.removeEventListener("keydown", onKeydown)
                setTimeout(() => nextRound(i), 1000);
            }
            currentKey = keys[i]
        }
        else {
            activate(e.keyCode, { fail: true })
            window.removeEventListener("keydown", onKeydown)
            swal({
                title: "Perdiste :(",
                text: "¿Quieres jugar de nuevo?",
                buttons: ["Si", "No"]
            }, function(yes){
                debugger;
                if(yes){
                    nextRound(0)
                }
            })
        }
    }
}

function generateKeys(levels) {
    return new Array(levels).fill(0).map(generateRandomKey)
}

function generateRandomKey() {
    const min = 65
    const max = 90
    return Math.round(Math.random() * (max - min) + min)
}

function getElementByKeyCode(keyCode) {
    return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}) {
    const el = getElementByKeyCode(keyCode)
    el.classList.add("active")
    if (opts.success) {
        el.classList.add("success")
    }
    else if (opts.fail) {
        el.classList.add("fail")
    }
    setTimeout(() => {
        deactivate(el)
    }, 500);
}

function deactivate(el) {
    el.className = "key"
}

initGame();