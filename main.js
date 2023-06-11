const keySymbols = [
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U',
'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4',
'5', '6', '7', '8', '9'
];
const keys = [];

// Generator functions
async function genKey() {
  let x = 0
  let newKey = ''

  while(x < 17) {
    random = Math.floor(Math.random() * keySymbols.length);

    if(x == 5 || x == 11) { 
      newKey += '-' 
      x += 1
    } else {
      newKey += keySymbols[random]
      x += 1
    }
  }
  
  return newKey

}

async function genUniqueKeys() {
  
  console.log("Generating keys..")
  while(keys.length < 50) {

    newKey = await genKey()

    if(keys.includes(newKey)) {
      console.error("New key already exists, generating a new one..")
      newKey = await genKey()
    } else {
      keys.push(newKey)
    }
  
  }
  
  return console.log(`${keys.length} KEYS GENERATED`)

}

// Checker functions
function isHidden(e) {
    var style = window.getComputedStyle(e)
    return (style.display === 'none')
}

function activate(key) {
    console.log('\n===== Ativação ' + key + ' =====')
    document.getElementById('product_key').value = key
    if (document.getElementById('accept_ssa').checked === false) {
        document.getElementById('accept_ssa').click()
    }
    setTimeout(function () {
        document.getElementById('register_btn').click()
    }, 100)
}

function checkPage(s) {
    console.log('...')
    let errorDisplay = document.getElementById('error_display')
    let receiptForm = document.getElementById('receipt_form')
    let registerForm = document.getElementById('registerkey_form')

    if (!isHidden(receiptForm)) {
        s.wait = false
        console.log(receiptForm.firstElementChild.textContent.trim())
        console.log(document.getElementById('registerkey_productlist').textContent)
        DisplayPage('code') // Mostra o registerkey_form
    } else if (!isHidden(registerForm)) {
        if (s.wait && !isHidden(errorDisplay)) {
            s.wait = false
            console.log(errorDisplay.textContent)
            errorDisplay.style.display = "none" // ocultar antes de ativar a próxima chave (caso contrário, não esperaremos adequadamente que o receipt_form apareça)
        }
        if (!s.wait) {
            if (s.index === s.keys.length) return
            s.wait = true
            activate(s.keys[s.index++])
        }
    }

    setTimeout(function () { checkPage(s) }, 500)
}
// Gen & Checking
genUniqueKeys().then(() => {
    checkPage({
        index: 0,
        wait: false,
        keys: keys
    }).catch(e => console.error(e))
}).catch(e => console.error(e))
