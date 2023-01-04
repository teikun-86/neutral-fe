import AppLayout from "@/layouts/app";

const FlightCart = () => {
    return (
        <AppLayout title={`Checkout Tiket Pesawat ー ${process.env.NEXT_PUBLIC_APP_NAME}`}>
            <div className="w-full max-w-7xl mx-auto px-4 py-5">
                <div className="w-full bg-white rounded-lg shadow p-4">
                    <h1 className="text-lg md:text-xl font-bold">Checkout Tiket Pesawat</h1>
                </div>
            </div>
        </AppLayout>
    );
};

export default FlightCart;