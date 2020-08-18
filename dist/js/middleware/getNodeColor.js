function getNodeColor(num) {
    if (num < 140)
        return [0, 0, 12];
    if (num < 150)
        return [6, 6, 16];
    if (num < 160)
        return [12, 11, 9];
    if (num < 190)
        return [8, 14, 8];
    if (num < 210)
        return [6, 16, 6];
    if (num < 230)
        return [4, 14, 4];
    if (num < 250)
        return [9, 11, 6];
    if (num < 290)
        return [7, 10, 5];
    if (num < 340)
        return [5, 8, 3];
    if (num < 380)
        return [4, 7, 2];
    if (num < 410)
        return [4, 5, 2];
    return [3, 4, 2];
}
export default getNodeColor;
