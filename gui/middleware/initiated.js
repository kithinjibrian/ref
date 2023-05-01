export default function(ctx) {
    if(!ctx.$auth.user.initiated) {
        return ctx.redirect("/checkout")
    }
}