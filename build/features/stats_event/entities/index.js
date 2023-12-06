var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../../auth/entities";
import { Event } from "../../events/entities";
let StatsEvent = class StatsEvent {
    id;
    eventId;
    event;
    pseudo;
    user;
    score;
    correctAnswers;
    incorrectAnswers;
    response;
    timeToPlay;
    scoreBeforeEvent;
    scoreAfterEvent;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], StatsEvent.prototype, "eventId", void 0);
__decorate([
    OneToOne(() => Event),
    JoinColumn({ name: "eventId", referencedColumnName: "id" }),
    __metadata("design:type", Event)
], StatsEvent.prototype, "event", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], StatsEvent.prototype, "pseudo", void 0);
__decorate([
    OneToOne(() => User),
    JoinColumn({ name: "pseudo", referencedColumnName: "pseudo" }),
    __metadata("design:type", User)
], StatsEvent.prototype, "user", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], StatsEvent.prototype, "score", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], StatsEvent.prototype, "correctAnswers", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], StatsEvent.prototype, "incorrectAnswers", void 0);
__decorate([
    Column("json", { array: true }),
    __metadata("design:type", Array)
], StatsEvent.prototype, "response", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "timeToPlay", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "scoreBeforeEvent", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "scoreAfterEvent", void 0);
__decorate([
    CreateDateColumn({ type: "timestamp with time zone" }),
    __metadata("design:type", Date)
], StatsEvent.prototype, "createdAt", void 0);
StatsEvent = __decorate([
    Entity()
], StatsEvent);
export { StatsEvent };
