module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalQty = cart.totalQty || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id){
        let storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        };
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id])
        }
        for(let i = 0; i < arr.length; i++){
            arr[i].item.price = arr[i].item.price.toLocaleString('de-DE')
            arr[i].price = arr[i].price.toLocaleString('de-DE')
        }
        console.log(arr[0])
        return arr
    }
}