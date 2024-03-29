import { SpinnerIcon } from "@/components/icons";
import { ProfileInformation, UpdatePassword } from "@/components/profile";
import { ProfileCredentials } from "@/components/profile/credential";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import AppLayout from "@/layouts/app";
import { useEffect, useState } from "react";

const MyAccount = () => {
    const { user, resendEmailVerification, updateCredentials, updateProfile } = useAuth({ middleware: 'auth' });
    const { __ } = useLocale()

    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])
    
    return (
        <AppLayout title={__('my_account')}>
            <div className="w-full py-5">
                <div className="w-full max-w-7xl mx-auto px-4">
                    {
                        loading ? (
                            <div className="w-full h-96 flex justify-center items-center">
                                <SpinnerIcon className="h-10 w-10 text-rose-500 animate-spin" />
                            </div>
                        )
                        : (
                            <>
                                <ProfileInformation updateProfile={updateProfile} user={user} />
                                
                                <ProfileCredentials updateCredentials={updateCredentials} resendEmailVerification={resendEmailVerification} user={user} />

                                <UpdatePassword user={user} />
                            </>
                        )
                    }
                </div>
            </div>
        </AppLayout>
    );
};

export default MyAccount;