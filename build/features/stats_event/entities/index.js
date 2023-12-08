"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsEvent = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../auth/entities");
const entities_2 = require("../../events/entities");
let StatsEvent = class StatsEvent {
};
exports.StatsEvent = StatsEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StatsEvent.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_2.Event),
    (0, typeorm_1.JoinColumn)({ name: "eventId", referencedColumnName: "id" }),
    __metadata("design:type", entities_2.Event)
], StatsEvent.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StatsEvent.prototype, "pseudo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_1.User),
    (0, typeorm_1.JoinColumn)({ name: "pseudo", referencedColumnName: "pseudo" }),
    __metadata("design:type", entities_1.User)
], StatsEvent.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StatsEvent.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StatsEvent.prototype, "correctAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StatsEvent.prototype, "incorrectAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { array: true }),
    __metadata("design:type", Array)
], StatsEvent.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "timeToPlay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "scoreBeforeEvent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StatsEvent.prototype, "scoreAfterEvent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp with time zone" }),
    __metadata("design:type", Date)
], StatsEvent.prototype, "createdAt", void 0);
exports.StatsEvent = StatsEvent = __decorate([
    (0, typeorm_1.Entity)()
], StatsEvent);
