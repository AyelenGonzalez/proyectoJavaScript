class Product{
    constructor(code, tipe, name, image, price){
        this.code = code;
        this.tipe = tipe;
        this.name = name;
        this.image = image;
        this.price = price;
    }
}

class CartProduct{
    constructor(name, price, image, code, lot, subtotal){
        this.name = name;
        this.price = price;
        this.image = image;
        this.code = code;
        this.lot = 1;
        this.subtotal = price;
    }
}
