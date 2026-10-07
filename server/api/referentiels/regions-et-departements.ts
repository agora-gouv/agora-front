export default defineCachedEventHandler(
  async () => {
    const config = useRuntimeConfig();
    return await $fetch(`${config.public.apiBaseUrl}/referentiels/regions-et-departements`);
  },
  {
    maxAge: 60 * 60, // 1 heure
    name: "referentiels-departements",
  }
);
