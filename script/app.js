const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

const productBtn = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    basketBtnCount = document.querySelector('.warapper__navbar-count'),
    basketClose = document.querySelector('.wrapper__navbar-close'),
    basketCheckList = document.querySelector('.wrapper__navbar-checklist'),
    totalPrice = document.querySelector('.wrapper__navbar-totalprice')

productBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})


function plusOrMinus(btn) {
    const cardItem = btn.closest('.wrapper__list-card'),
        parentId = cardItem.getAttribute('id')
    product[parentId].amount++
    basket()
}


function basket() {
    const productArray = []
    for (const key in product) {
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`)
        const parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
            basketBtnCount.classList.add('active')
            basketBtnCount.innerHTML = totalCountProduct()
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
    }
    basketCheckList.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketCheckList.innerHTML += listBurger(productArray[i])
    }
    totalPrice.innerHTML = totalSummProduct()
}


function listBurger({img, name, amount, price}) {
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img src="${img}" alt="" class="wrapper__navbar-productImage">
            <div>
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice">${price}</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card"> 
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <span class="wrapper__navbar-count">${amount}</span>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
    `
}

window.addEventListener('click', function (e) { 
   const btn = e.target
   
   if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') {
                product[idProduct].amount--
            }else{
                product[idProduct].amount++
            }
            basket()
        }
   }
 })





function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

basketBtn.addEventListener('click', function () {
    basketModal.classList.toggle('active')
})
basketClose.addEventListener('click', function () {
    basketModal.classList.remove('active')
})