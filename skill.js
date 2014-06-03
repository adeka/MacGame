/**
 * Created by nfilatov on 5/12/14.
 */


function Skill(type) {
    this.type = type;
    this.currentLevel = 0;

    switch (type) {
        case "Computing":
            this.hourlyBonus = [5,10,15,30,50];
            this.costToLearn = [1000, 2000, 3000, 4000, 5000];
            this.happinessBonus = [.005,.010,.015,.030,.050];
            break;
        case "Driving":
            this.hourlyBonus = [0,0,0,0,0];
            this.costToLearn = [1000, 2000, 3000, 4000, 5000];
            this.happinessBonus = [.05,.13,.18,.22,.25];
            break;
        case "Cooking":
            this.hourlyBonus = [1,1,2,2,3];
            this.costToLearn = [1000, 2000, 3000, 4000, 5000];
            this.happinessBonus = [.1,.15,.2,.25,.3];
            break;
    }
}

Skill.prototype.LevelUp = function () {
    this.currentLevel++;
}