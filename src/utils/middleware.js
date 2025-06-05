export function onRequest(context, next) {

    context.locals.title = "Esto es un nuevo Titulo";

    return next();
    }