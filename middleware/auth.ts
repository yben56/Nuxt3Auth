export default defineNuxtRouteMiddleware(async (to, from) => {

    const token = useCookie('token').value

    //1. check cookie token exist
    if ( token ) {
        try {
            const body = '{token:' + token + '}'

            //1. fetch api
            const response  = await $fetch('/database/Auth.json', {
                method: 'GET',
                //body: body
            })
            
            //2. check state
            if ( response.state !== 200 ) {
                return navigateTo('/')
            }

            //3. return to page
            return
        } catch (error) {
            console.log('Error:' + error)
        }
    } else {
        return navigateTo('/')
    }
})