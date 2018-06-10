// FETCH does not recognize error responses, as an error response is a response

export function handleApiErrors ( response ) {
   if ( !response.ok ) throw Error( response.statusText )
      return response
}
