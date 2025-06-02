import MainLayout from "@/layouts/MainLayout";

export default function WishlistPage() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Ma liste de souhaits</h1>
                <p className="text-gray-600 mb-4">Vous n'avez pas encore ajouté de produits à votre liste de souhaits.</p>
                <p className="text-gray-600">Parcourez nos produits et ajoutez vos favoris pour les retrouver facilement plus tard.</p>
            </div>
        </MainLayout>
    )
}