const themes = {
    1: {
        bgcs: {
            main: 'hsl(222, 26%, 31%)', 
            switch: 'hsl(223, 31%, 20%)', 
            keypad: 'hsl(223, 31%, 20%)', 
            entry: 'hsl(224, 36%, 15%)', 
        }, 
        keys: {
            mainKey: {
                bgc: 'hsl(30, 25%, 89%)', 
                shadow: 'hsl(28, 16%, 65%)', 
            },
            resultKeyAndToggle: {
                bgc: 'hsl(6, 63%, 50%)', 
                shadow: 'hsl(6, 70%, 34%)', 
            }, 
            secondaryKey: {
                bgc: 'hsl(225, 21%, 49%)', 
                shadow: 'hsl(224, 28%, 35%)', 
            }, 
        }, 
        text: {
            main: 'white', 
            secondary: 'hsl(221, 14%, 31%)', 
            resultKey: 'white', 
        }, 
    }, 
    2: {
        bgcs: {
            main: 'hsl(0, 0%, 90%)', 
            switch: 'hsl(0, 5%, 81%)', 
            keypad: 'hsl(0, 5%, 81%)', 
            entry: 'hsl(0, 0%, 93%)', 
        }, 
        keys: {
            mainKey: {
                bgc: 'hsl(45, 7%, 89%)', 
                shadow: 'hsl(35, 11%, 61%)', 
            },
            resultKeyAndToggle: {
                bgc: 'hsl(25, 98%, 40%)', 
                shadow: 'hsl(25, 99%, 27%)', 
            }, 
            secondaryKey: {
                bgc: 'hsl(185, 42%, 37%)', 
                shadow: 'hsl(185, 58%, 25%)', 
            }, 
        }, 
        text: {
            main: 'hsl(60, 10%, 19%)', 
            secondary: 'hsl(0, 0, 100%)', 
            resultKey: 'white', 
        }, 
    }, 
    3: {
        bgcs: {
            main: 'hsl(268, 75%, 9%)', 
            switch: 'hsl(268, 71%, 12%)', 
            keypad: 'hsl(268, 71%, 12%)', 
            entry: 'hsl(268, 71%, 12%)', 
        }, 
        keys: {
            mainKey: {
                bgc: 'hsl(268, 47%, 21%)', 
                shadow: 'hsl(290, 70%, 36%)', 
            },
            resultKeyAndToggle: {
                bgc: 'hsl(176, 100%, 44%)', 
                shadow: 'hsl(177, 92%, 70%)', 
            }, 
            secondaryKey: {
                bgc: 'hsl(281, 89%, 26%)', 
                shadow: 'hsl(285, 91%, 52%)', 
            }, 
        }, 
        text: {
            main: 'hsl(52, 100%, 62%)',
            secondary: 'hsl(52, 100%, 62%)', 
            resultKey: 'hsl(198, 20%, 13%)'
        }, 
    }, 
}

const changeTheme = (card, theme) => {
    const cardHeader = card.querySelector('.card-header')
    var body = document.querySelector('body')
    var switcher = document.getElementById('switch')
    var selector = switcher.querySelector('.selector')
    var keypad = document.getElementById('keypad')
    var entry = card.querySelector('.card-body #entry')
    var secondaryBtns = keypad.querySelectorAll('.secondary-button')
    var primaryBtns = keypad.querySelectorAll('.primary-button')
    var result_btn = document.getElementById('btn-result')

    document.cookie = `theme=${theme};expires=`
    theme = themes[theme]

    body.style.backgroundColor = theme.bgcs.main

    card.style.backgroundColor = theme.bgcs.main
    cardHeader.style.color = theme.text.main

    switcher.style.backgroundColor = theme.bgcs.switch
    selector.style.backgroundColor = theme.keys.resultKeyAndToggle.bgc

    entry.style.backgroundColor = theme.bgcs.entry
    entry.style.color = theme.text.main

    keypad.style.backgroundColor = theme.bgcs.keypad

    for (var btn of primaryBtns) {
        btn.style.backgroundColor = theme.keys.mainKey.bgc
        btn.style.boxShadow = '0 5px 1px ' + theme.keys.mainKey.shadow
        btn.style.color = theme.text.secondary
    }

    for (var btn of secondaryBtns) {
        btn.style.backgroundColor = theme.keys.secondaryKey.bgc
        btn.style.boxShadow = '0 5px 1px ' + theme.keys.secondaryKey.shadow
        btn.style.color = 'white'
    }

    result_btn.style.backgroundColor = theme.keys.resultKeyAndToggle.bgc
    result_btn.style.boxShadow = '0 5px 1px ' + theme.keys.resultKeyAndToggle.shadow
    result_btn.style.color = theme.text.resultKey
}

document.addEventListener('DOMContentLoaded', DOMevent => {
    const keypad = document.getElementById('keypad')
    const entry = document.getElementById('entry')
    const card = document.querySelector('.card')
    var theme = getCookie('theme')
    if (! theme) theme = 1
    const numbersBtns = []
    const switcher = {
        element: document.getElementById('switch'), 
        selector: document.getElementById('switch').querySelector('.selector'), 
        position: parseInt(theme), 
    }
    switch (switcher['position']) {
        case 1:
            switcher.element.classList.add('left')
            break
        case 2:
            switcher.element.classList.add('center')
            break
        case 3:
            switcher.element.classList.add('right')
            break
    }
    changeTheme(card, switcher.position)

    switcher['element'].addEventListener('click', ev => {
        switcher.element.classList.remove('center')
        switcher.element.classList.remove('right')
        switcher.element.classList.remove('left')

        switch (switcher['position']) {
            case 1:
                switcher.element.classList.add('center')
                switcher.position ++
                break
            case 2:
                switcher.element.classList.add('right')
                switcher.position ++
                break
            case 3:
                switcher.element.classList.add('left')
                switcher.position = 1
                break
        }

        changeTheme(card, switcher.position)
    })

    entry.addEventListener('keydown', event => {
        const key = event.key

        if (! parseInt(key)) {
            return
        }
    })

    for (var btnContainer of keypad.children) {
        for (var btn of btnContainer.children) {
            if (parseInt(btn.innerText) || btn.innerText == 0) {    // Verifica que el texto del botón sea un número,
                                                                   // si lo es, lo agrega a la lista «numbersBtns»
                /* Si el boton contiene un cero, 'parseInt' retornara 0, y la condición va a retornar 0 (false), 
                por lo que no se ejecutaria el bloque de instrucciones, por eso agregue ' || btn.innerText == 0' */
                numbersBtns.push(btn)
            }
        }
    }

    numbersBtns.forEach(btn => {
        btn.onclick = () => {
            entry.value += btn.innerText
        }
    })


    const attribution = document.querySelector('.attribution')
    attribution.onclick = () => {
        const bottom = attribution.style.bottom
        console.log()
        
        if (bottom !== '-7.2vh') {
            attribution.style.animation = 'moveAttributionDown .3s'
            attribution.style.bottom = '-7.2vh'
        } else {
            attribution.style.animation = 'moveAttributionUp .3s'
            attribution.style.bottom = '0vh'
        }
    }
    attribution.addEventListener('mouseover', () => {
        const bottom = attribution.style.bottom
        
        if (bottom) {
            attribution.style.animation = 'moveAttributionUp .3s'
            attribution.style.bottom = '0vh'
        }
    })
})

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i <ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}