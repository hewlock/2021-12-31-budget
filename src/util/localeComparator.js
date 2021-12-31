export default function localeComparator(prop) {
    return (a, b) => a[prop].localeCompare(b[prop]);
}
