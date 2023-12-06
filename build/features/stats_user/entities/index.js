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
exports.StatsUser = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../auth/entities");
let StatsUser = class StatsUser {
};
exports.StatsUser = StatsUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StatsUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StatsUser.prototype, "pseudo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_1.User),
    (0, typeorm_1.JoinColumn)({ name: "pseudo", referencedColumnName: "pseudo" }),
    __metadata("design:type", entities_1.User)
], StatsUser.prototype, "user", void 0);
exports.StatsUser = StatsUser = __decorate([
    (0, typeorm_1.Entity)()
], StatsUser);
