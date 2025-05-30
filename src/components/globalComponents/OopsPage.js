import MainLayout from "@/layouts/MainLayout";

export default function OopsPage() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
                onClick={() => router.push('/products')}
                className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
            >
                Retour aux produits
            </button>
            </div>
        </MainLayout>
    )
}