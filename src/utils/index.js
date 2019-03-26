export function checkFetchStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  var error = new Error(response.statusText)
  error.response = response
  throw error
}
