type NewsDto = {
  "description": string,
  "short_description": string,
  "callToActionText": string,
  "routeName": "/consultationsPage" | "/qagsPage" | "/consultation/dynamic" | "/qagDetailsPage",
} & ({
  routeName: "/consultationsPage" | "/qagsPage",
  routeArgument: never
} | {
  routeName: "/consultation/dynamic" | "/qagDetailsPage",
  routeArgument: string
})

export default NewsDto