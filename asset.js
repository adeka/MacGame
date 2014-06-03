/**
 * Created by nfilatov on 5/12/14.
 */


function Asset(type) {
    this.name = type;

    switch (type) {

        case "Car":
            this.mothlyLeaseCost = 250;
            this.cost = 25000;
            this.happinessBonus = .35;
            break;
        case "Computer":
            this.mothlyLeaseCost = 50;
            this.cost = 1250;
            this.happinessBonus = .2;
            break;
        case "iPhone":
            this.mothlyLeaseCost = 75;
            this.cost = 500;
            this.happinessBonus = .25;
            break;

    }


}

Asset.prototype.CollectLeaseAmount = function (citizen) {

}