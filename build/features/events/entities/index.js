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
let Event = class Event {
    id;
    name;
    image;
    numberOfQuestions;
    content; // Assuming a custom type for 'List<Map>>'
    details;
    description;
    createdAt;
    expireAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "image", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Event.prototype, "numberOfQuestions", void 0);
__decorate([
    Column("json", { array: true }),
    __metadata("design:type", Array)
], Event.prototype, "content", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Event.prototype, "details", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Event.prototype, "expireAt", void 0);
Event = __decorate([
    Entity("events")
], Event);
export { Event };
