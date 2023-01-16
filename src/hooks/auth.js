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

        axios
            .post('/auth/register', props)
            .then((res) => {
                setLoading(false)
                mutate()
                router.push(`/auth/verify-email`)
            })
            .catch(error => {
                setLoading(false)
                
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const login = async ({ setErrors = () => {}, setStatus = () => {}, setLoading = () => {}, ...props }) => {
        setLoading(true)
        setErrors([])
        setStatus(null)
        
        await csrf()

        axios
            .post('/auth/login', props)
            .then(() => {
                setLoading(false)
                return mutate()
            })
            .catch(error => {
                setLoading(false)
                if (error.response.status !== 422) throw error

                // get all errors
                const errors = Object.values(error.response.data.errors).flat()

                setErrors(errors)
            })
    }

    const updateProfile = async ({ setErrors = () => {}, setStatus = () => {}, setLoading = () => {}, after = () => {}, ...props }) => {
        setLoading(true)
        setErrors([])
        setStatus(null)

        await csrf()

        axios
            .post('/profile/update', props, {
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

        axios
            .post('/profile/update-credentials', props)
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

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/auth/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/auth/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/auth/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
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

        window.location.pathname = '/auth/login'
    }
    
    const socialLogin = async (provider, user_id) => {
        await csrf()
        axios
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