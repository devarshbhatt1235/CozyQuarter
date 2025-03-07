import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/navbar';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import ClientOnly from './components/ClientOnly';
import { Toaster } from 'react-hot-toast';
import getCurrentUser from './actions/getCurrentUser';

const font = Inter({
	subsets: ['latin'],
});

export const metadata = {
	title: 'CozyQuarter',
	description: 'Find your perfect stay',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<head>
				<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
			</head>
			<body className={font.className}>
				<ClientOnly>
					<Toaster />
					<LoginModal />
					<RegisterModal />
					<RentModal />
					<SearchModal />
				</ClientOnly>
				<Navbar currentUser={currentUser} />
				<div className='pb-32 pt-28'>{children}</div>
			</body>
		</html>
	);
}