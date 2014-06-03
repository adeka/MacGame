/**
 * Created by nfilatov on 5/12/14.
 */


function Residence(type) {
    this.type = type;

    switch (type) {

        case "Parent's House":
            this.rent = 0;
            this.cost = 250000;
            this.happinessBonus = -.05;
            break;
        case "Dinky Apartment":
            this.rent = 350;
            this.cost = 50000;
            this.happinessBonus = 0;
            break;
        case "Nice Apartment":
            this.rent = 1000;
            this.cost = 120000;
            this.happinessBonus = .1;
            break;
        case "Suburban Home":
            this.rent = 3500;
            this.cost = 350000;
            this.happinessBonus = .3;
            break;
        case "Mansion":
            this.rent = 4500;
            this.cost = 1500000;
            this.happinessBonus = .45;
            break;
        case "Penthouse":
            this.rent = 6500;
            this.cost = 3500000;
            this.happinessBonus = .5;
            break;

    }


}

Residence.prototype.PayRent = function (citizen) {

}