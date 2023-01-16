import { SpinnerIcon } from "@/components/icons";
import { ProfileInformation, UpdatePassword } from "@/components/profile";
import { ProfileCredentials } from "@/components/profile/credential";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/layouts/app";
import { useEffect, useState } from "react";

const MyAccount = () => {
    const { user, resendEmailVerification, updateCredentials, updateProfile } = useAuth({ middleware: 'auth' });

    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])
    
    return (
        <AppLayout title="My Account">
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
                                <ProfileInformation updateProfile={updateProfile} resendEmailVerification={resendEmailVerification} user={user} />
                                <ProfileCredentials updateCredentials={updateCredentials} user={user} />

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