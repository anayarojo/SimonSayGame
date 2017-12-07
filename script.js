const levels = 4

function initGame() {
    nextRound(0)
}

function nextRound(currentLevel) {

    let keys = generateKeys(levels)

    if (currentLevel == (levels)) {
        setTimeout(() => alert("Ganaste"), 1000)
        return
    }

    alert(`Nivel ${currentLevel + 1}`)

    for (let i = 0; i <= currentLevel; i++) {
        setTimeout(() => activate(keys[i]), (i + 1) * 1000)
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
            alert("Perdiste :(")
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