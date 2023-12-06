var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities";
let StatsUser = class StatsUser {
    id;
    pseudo;
    user;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], StatsUser.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], StatsUser.prototype, "pseudo", void 0);
__decorate([
    OneToOne(() => User),
    JoinColumn({ name: "pseudo", referencedColumnName: "pseudo" }),
    __metadata("design:type", User)
], StatsUser.prototype, "user", void 0);
StatsUser = __decorate([
    Entity()
], StatsUser);
export { StatsUser };
