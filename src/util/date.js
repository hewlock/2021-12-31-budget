export function today() {
    return new Date().toISOString().substring(0, 10);
}
