export function badRequest(message = "") {
    return Response.json({ message }, { status: 400 });
}
export function ok(obj = {}) {
    return Response.json(obj);
}

export function internalError(message = "") {
    return Response.json({ message }, { status: 400 });
}