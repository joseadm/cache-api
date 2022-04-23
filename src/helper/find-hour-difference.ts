export default function findHourDifference(firstDate: Date, secondDate: Date) {
    return Math.abs(firstDate.getTime() - secondDate.getTime()) / 3600000;
}
