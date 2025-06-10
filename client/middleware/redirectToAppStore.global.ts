export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query.app === "force") {
    console.log('force app')
    return navigateTo("https://apps.apple.com/fr/app/agora-citoyens-gouv/id6449599025", {
        external: true,
      },
    );
  }
});
