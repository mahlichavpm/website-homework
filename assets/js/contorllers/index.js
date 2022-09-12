(function () {

    let hashChangeHandler = function (e) {

        let loginPage = document.getElementById('login-page');
        let registerPage = document.getElementById('register-page');
        let header = document.getElementById('header');
        let home = document.getElementById('main-page');
        let cart = document.getElementById('cart');
        let finishOrder = document.getElementById('order-details');


        let text = e.target.location.hash.slice(1);
    
            switch (text) {
            case 'main-page':
                registerPage.style.display = 'none';
                loginPage.style.display = 'none';   
                header.style.display = 'flex';
                home.style.display = 'block';
                cart.style.display = 'none';
                finishOrder.style.display = 'none';
                break;
            case 'cart':
                registerPage.style.display = 'none';
                loginPage.style.display = 'none';
                header.style.display = 'flex';
                home.style.display = 'none';
                cart.style.display = 'block';
                finishOrder.style.display = 'none';
                break;
            case 'order-details':
                registerPage.style.display = 'none';
                loginPage.style.display = 'none';
                header.style.display = 'flex';
                home.style.display = 'none';
                cart.style.display = 'none';
                finishOrder.style.display = 'block';
                break;
            case 'login':
                registerPage.style.display = 'none';
                loginPage.style.display = 'block';
                header.style.display = 'none';
                home.style.display = 'none';
                cart.style.display = 'none';
                finishOrder.style.display = 'none';
                break;
            case 'register':
                registerPage.style.display = 'block';
                loginPage.style.display = 'none';
                header.style.display = 'none';
                home.style.display = 'none';
                cart.style.display = 'none';
                finishOrder.style.display = 'none';
                break;
            default:
                registerPage.style.display = 'none';
                loginPage.style.display = 'block';
                header.style.display = 'none';
                home.style.display = 'none';
                cart.style.display = 'none';
                finishOrder.style.display = 'none';
                break;
        }
    };

    let cart = new Cart;
    let manager = new DonerManager;

    manager.addProductsToMenuArr(DATA);

    window.addEventListener('hashchange', hashChangeHandler);
    window.addEventListener('load', hashChangeHandler);
    window.addEventListener('load', renderAllProducts(manager.menu));

    function renderProduct (product) {

        let homePage = document.getElementById('doner-container');
    
        let div = document.createElement('div');
        div.classList.add('card-container');
        
        let img = document.createElement('img');
        img.src = product.imgUrl;

        let name = document.createElement('p');
        name.innerText = product.name;
    
        let weight = document.createElement('p');
        weight.innerText =  product.weight + 'гр.';

        let category = document.createElement('p');
        category.innerText = `Категория: ${product.category} `

        let price = document.createElement('p');
        price.innerText = `${product.price.toFixed(2)}лв.`
    
        let count = document.createElement('input');
        count.type = 'number';
        count.value = '1';
        count.min = '1';

        let btn = document.createElement('button');
        btn.innerText = 'Добави в количката';
        btn.addEventListener('click',addToCart);
        function addToCart () {
            let flag = true;
            for(let i = 0; i < cart.cart.length; i++){
                if(product.name === cart.cart[i].name){
                    flag = false;
                    let num = Number(cart.cart[i].count);
                    let num1 = Number(count.value);
                    num += num1;
                    cart.cart[i].count = num;
                }
            }
            if(flag){
                cart.cart.push(product)
                product.count = Number(count.value);
            }
           console.log(cart.cart);
        }
    
        div.append(img,name,weight,category,price,count,btn);
        homePage.appendChild(div);
    };

    function renderAllProducts(array){
        for(let i = 0; i < array.length; i++){
            renderProduct(array[i]);
        }
    };

    function popUpQuantity(){
        div = document.getElementById('items-in-cart');
        if(cart.cart.length == 0){
            div.style.display = 'none';
        } else {
            div.style.display = 'block';
            let count = 0;
            for(let i = 0; i < cart.cart.length; i++){
                count += Number(cart.cart[i].count);
            }
            div.innerText = count;
        }
    };

    setInterval(popUpQuantity,10);

    window.addEventListener('hashchange', rednerCartPage)

    function rednerCartPage () {
        let error = document.getElementById('error');
        let cartContainer = document.getElementById('cart-container');
        let list = document.getElementById('items-list');
        
        list.innerHTML = '';
        let flag = true;

        function render() {
            if(cart.cart.length == 0){
                flag = false;
                error.style.display = 'block';
                cartContainer.style.display = 'none';
            } else {
                error.style.display = 'none';
                cartContainer.style.display = 'flex';
            }
        }

        render();

        if(flag){
           
            let items = [];
            let bill = 0;
            for(let i = 0; i < cart.cart.length; i++){
                items[i] = document.createElement('li');
            }
            for(let x = 0; x < items.length; x++){
                let listItem = items[x];
                let text = document.createElement('span');
                let price = document.createElement('span');
                let count = document.createElement('input');
                let btn = document.createElement('button');

                text.innerText = cart.cart[x].name;
                let sum = cart.cart[x].price * cart.cart[x].count;
                bill += sum;
                price.innerText = sum.toFixed(2);
                count.type = 'number';
                count.value = cart.cart[x].count;
                btn.innerText = 'X';
                btn.addEventListener('click', function () {
                    listItem.remove();
                    cart.cart.splice(x,1);
                    render();
                })

                listItem.append(text,price,count,btn);
                list.appendChild(listItem);
            }

            let spanFinalPrice = document.getElementById('bill');
            
            spanFinalPrice.innerText = `Крайна цена: ${bill.toFixed(2)}`;

        }
    }    

})();