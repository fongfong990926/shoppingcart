app = angular.module('app', [])
app.controller('myCtrl', function ($scope) {
    $scope.cart = [{
        id: 1000,
        name: 'iphone5',
        quantity: 5,
        price: 3000
    }, {
        id: 3300,
        name: 'iphone6',
        quantity: 10,
        price: 4000
    }, {
        id: 100,
        name: 'iphone7',
        quantity: 3,
        price: 5000
    }, {
        id: 500,
        name: 'mac',
        quantity: 5,
        price: 13000
    }
    ]
    $scope.totalPrice = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += item.quantity * item.price;
        })
        return total;
    }
    $scope.totalQuantity = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += parseInt(item.quantity);
        })
        return total;
    }
    //为某个产品添加一个数量
    $scope.add = function (id) {
        var index=findIndex(id);
        if(index!=-1){
            ++$scope.cart[index].quantity;
        }
    }
    $scope.reduce = function (id) {
        var index=findIndex(id);
        if(index!=-1){
            var item=$scope.cart[index];
            if(item.quantity>1){
                --$scope.cart[index].quantity;
            }else {
                var returnKey=confirm('从购物车删除该产品');
                if(returnKey){
                    $scope.remove(id);
                }
            }

        }
    }
    var findIndex = function (id) {
        var index = -1;
        angular.forEach($scope.cart, function (item, key) {
            if (item.id === id) {
                index = key;
                return;
            }
        })
        return index;
    }
    $scope.remove = function (id) {
        var index = findIndex(id);
        if (index !== -1) {
            $scope.cart.splice(index, 1);
        }
    }

    $scope.$watch('cart',function (newValue,oldValue) {
        console.log(newValue);
        angular.forEach(newValue,function (item,key) {
            if(item.quantity<1){
                var returnKey=confirm('从购物车删除该产品');
                if(returnKey){
                    $scope.remove(item.id);
                }else{
                    item.quantity=oldValue[key].quantity;
                }

            }

        })
    },true);

})