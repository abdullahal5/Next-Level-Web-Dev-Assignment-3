"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutes = exports.getTimeInMinutes = void 0;
const getTimeInMinutes = (time) => __awaiter(void 0, void 0, void 0, function* () {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
});
exports.getTimeInMinutes = getTimeInMinutes;
const addMinutes = (time, minutes) => __awaiter(void 0, void 0, void 0, function* () {
    const [hours, currentMinutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + currentMinutes + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
});
exports.addMinutes = addMinutes;
