import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import WhatsAppFloat from '@/components/globalComponents/WhatsAppFloat';

const MainLayout = ({ children }) => {
    return (
        <div className="bg-gray-50">
            <Header />
            <main className="relative top-0">
                {children}
            </main>
            <Footer />
            <WhatsAppFloat />
        </div>
    );
};

export default MainLayout;