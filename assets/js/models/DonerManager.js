class DonerManager {
    constructor(){
        this.menu = [];
    }

    addProductsToMenuArr(data){
        for(let i = 0; i < data.length; i++){
            this.menu.push(new Doner(
                data[i].image,
                data[i].name,
                data[i].weight,
                data[i].category,
                data[i].price
            ))
        }
    }
}