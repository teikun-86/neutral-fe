import useSWR from 'swr'
import { axios } from '@/libs/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/user', () =>
        axios
            .get('/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/auth/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors = () => { }, setStatus = () => { }, setLoading = () => { }, ...props }) => {
        setLoading(true)
        setErrors([])
        
        await csrf()

        let data = {
            ...props,
            lang: router.locale,
        }

        axios
            .post('/auth/register', data)
            .then((res) => {
                setLoading(false)
                mutate()
                router.push(`/auth/verify-email`)
            })
            .catch(error => {
                setLoading(false)
                
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors = () => {}, setStatus = () => {}, setLoading = () => {}, ...props }) => {
        setLoading(true)
        setErrors([])
        setStatus(null)
        
        await csrf()

        let data = {
            ...props,
            lang: router.locale,
        }

        axios
            .post('/auth/login', data)
            .then(() => {
                setLoading(false)
                return mutate()
            })
            .catch(error => {
                setLoading(false)
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const updateProfile = async ({ setErrors = () => {}, setStatus = () => {}, setLoading = () => {}, after = () => {}, ...props }) => {
        setLoading(true)
        setErrors([])
        setStatus(null)

        await csrf()

        const data = {
            ...props,
            lang: router.locale,
        }

        axios
            .post('/profile/update', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(() => {
                setLoading(false)
                setStatus('success')
                mutate()
                after()
            })
            .catch(error => {
                setLoading(false)
                if (error.response.status !== 422) throw error

                // get all errors
                const errors = Object.values(error.response.data.errors).flat()

                setErrors(errors)
            })
    }

    const updateCredentials = async ({ setErrors = () => { }, setStatus = () => { }, setLoading = () => { }, after = () => { }, ...props }) => {
        setLoading(true)
        setErrors([])
        setStatus(null)

        await csrf()

        const data = {
            ...props,
            lang: router.locale,
        }

        axios
            .post('/profile/update-credentials', data)
            .then(() => {
                setLoading(false)
                setStatus('success')
                mutate()
                after()
            })
            .catch(error => {
                setLoading(false)
                if (error.response.status !== 422) throw error

                // get all errors
                const errors = Object.values(error.response.data.errors).flat()

                setErrors(errors)
            })
    }

    const forgotPassword = async ({ setErrors = () => {}, setStatus = () => {}, setLoading = () => {}, email }) => {
        setLoading(true)
        setErrors([])
        setStatus(null)
        
        await csrf()


        axios
            .post('/auth/forgot-password', { email })
            .then(response => {
                setStatus(response.data.status)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resetPassword = async ({ setErrors = () => {}, setStatus = () => {}, setLoading = () => {}, ...props }) => {
        setLoading(true)
        setErrors([])
        setStatus(null)
        
        await csrf()

        const data = {
            ...props,
            lang: router.locale,
            token: router.query.token,
        }

        axios
            .post('/auth/reset-password', data)
            .then(response => { 
                setLoading(false)
                router.push('/auth/login?reset=' + btoa(response.data.status))
             })
            .catch(error => {
                setLoading(false)
                
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus, setLoading }) => {
        setLoading(true)
        axios
            .post('/auth/email/verification-notification')
            .then(response => {
                setStatus(response.data.status)
                setLoading(false)
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/auth/logout').then(() => mutate())
        }

        window.location.pathname = `/${router.locale}/auth/login`
    }
    
    const socialLogin = async (provider, user_id) => {
        await csrf()
        return await axios
            .post(`/auth/social/${provider}/login`, { provider, user_id })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    useEffect(() => {
        if (user && user.email_verified_at === null) {
            router.push('/auth/verify-email')
            return
        }
        
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
            
        if (
            window.location.pathname === '/auth/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        socialLogin,
        updateProfile,
        updateCredentials
    }
}