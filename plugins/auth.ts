export default defineNuxtPlugin(nuxtApp => {
    
    nuxtApp.Login = async (data) => {
        try {
            //1. fetch api
            const url = '' //api address
            const body = data

            //change GET if you need
            const response  = await $fetch(url, {
                method: 'POST',
                body: data
            })
            
            //2. check state
            if ( response.state !== 200 ) {
                return 'InvalidEmailOrPassword'
            }

            //3. set cookie
            document.cookie = `token=${response.token}; path=/`
            
            //4. page reload
            window.location.reload()
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Logout = async (data) => {
        try {
            //1. fetch api
            const url = '' //api address
            const body = data

            //change GET if you need
            const response  = await $fetch(url, {
                method: 'POST',
                body: data
            })
            
            //2. check state
            if ( response.state !== 200 ) {
                console.log('InvalidLogout')
                return
            }

            //3. destroy cookie
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
          
            //4. to index
            window.location.href = '/'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.Signup = async (data) => {
        try {
            //1. fetch api
            const url = '' //api address
            const body = data

            //change GET if you need
            const response  = await $fetch(url, {
                method: 'POST',
                body: data
            })
            
            //2. check state
            if ( response.state !== 200 ) {
                return response.message
            }

            //3. varify email
            window.location.href = '/VarifyEmail'
        } catch (error) {
            console.log('Error:' + error)
        }
    }

    nuxtApp.VarifyEmail = async (data) => {

        //FOR TEST URL TYPE http://localhost:3000/VarifyEmail?token={any value}

        try {
            //1. fetch api
            const url = '' //api address
            const body = data

            //change GET if you need
            const response  = await $fetch(url, {
                method: 'POST',
                body: data.token
            })
            
            //2. check state
            if ( response.state !== 200 ) {
                return response.message
            }

            //3. set cookie
            document.cookie = `token=${response.token}; path=/`
           
            //4. to index
            window.location.href = '/'
        } catch (error) {
            console.log('Error:' + error)
        }
    }
})