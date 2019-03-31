export function checkFetchStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  var error = new Error(response.statusText)
  error.response = response
  throw error
}

export const viewBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}
