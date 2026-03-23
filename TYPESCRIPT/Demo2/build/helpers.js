"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredCategories = exports.FAKE_DATA = exports.perimeter = exports.area = void 0;
const area = (width, length) => {
    return width * length;
};
exports.area = area;
const perimeter = (width, length) => {
    return (width * 2) + (length * 2);
};
exports.perimeter = perimeter;
exports.FAKE_DATA = [
    { category: "lunch" },
    { category: "dinner" },
    { category: "breakfast" },
];
exports.filteredCategories = exports.FAKE_DATA.filter(data => {
    let userChosenOption = "breakfast";
    let { category } = data;
    return category === userChosenOption;
});
console.log(exports.filteredCategories);
