var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let Quiz = class Quiz {
    id;
    question;
    answer;
    thematic;
    subThematic;
    level;
    points;
    times;
    constructor(id, question, answer, thematic, subThematic, level, points, times) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.thematic = thematic;
        this.subThematic = subThematic;
        this.level = level;
        this.points = points;
        this.times = times;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Quiz.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Quiz.prototype, "question", void 0);
__decorate([
    Column("simple-array", { array: true }),
    __metadata("design:type", Array)
], Quiz.prototype, "answer", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Quiz.prototype, "thematic", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "subThematic", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Quiz.prototype, "level", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Quiz.prototype, "points", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Quiz.prototype, "times", void 0);
Quiz = __decorate([
    Entity("quiz"),
    __metadata("design:paramtypes", [Number, String, Array, String, String, String, Number, Number])
], Quiz);
export { Quiz };
