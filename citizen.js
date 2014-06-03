/**
 * Created by nfilatov on 5/12/14.
 */

function Citizen (name) {
    this.assets = [];
    this.residence = new Residence("Parent's House");
    this.skills = [];
    this.netWorth = 0;
    this.hourlyWage = 10;
    this.age = 18;
    this.happiness = 1;
    this.name = name;
    this.health = {
        mental : 1,
        physical : 1,
        stress : 0,
        pain : 0
    }

}

Citizen.prototype.CollectPayCheck = function(){

}