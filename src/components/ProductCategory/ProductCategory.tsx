import { useState } from 'react';
import styles from './ProductCategory.module.css';
import type { Product, CartItem } from './types';
import ProductCard from './ProductCard';
import CartModal from './CartModal';
import CheckoutModal from './CheckoutModal';

const ProductCategory = () => {
	// state declarations
	const [activeCategory, setActiveCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [cart, setCart] = useState<CartItem[]>([]);
	const [showCartModal, setShowCartModal] = useState(false);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('Bank');
	const [shippingMethod, setShippingMethod] = useState('Ambil di Sekolah');

	// Sample products data
	const products: Product[] = [
		// Trending Products
		{
			id: 'hot1',
			title: 'Buku Matematika Kelas 10',
			price: 15000,
			image: '/assets/img/BukuMTKKelas10.jpg',
			category: 'akademis',
			seller: 'MAN Insan Cendekia OKI',
			stock: 3,
			condition: '95%',
			description: 'Kondisi 95%, lengkap dengan kunci jawaban',
			trending: true,
			trendingBadge: '🔥 HOT'
		},
		{
			id: 'hot2',
			title: 'Seragam SMA Putih Abu',
			price: 45000,
			image: '/assets/img/SeragamSMAPutihAbu.jpg',
			category: 'seragam',
			seller: 'SMAN 1 Jakarta',
			stock: 5,
			condition: 'Sangat Baik',
			description: 'Ukuran L, kondisi sangat baik, siap pakai',
			trending: true,
			trendingBadge: '⭐ BEST'
		},
		{
			id: 'hot3',
			title: 'Kalkulator Scientific',
			price: 35000,
			image: '/assets/img/KalkulatorScientific.jpg',
			category: 'akademis',
			seller: 'SMPN 5 Surabaya',
			stock: 7,
			condition: '90%',
			description: 'Casio fx-991ES Plus, kondisi 90%',
			trending: true,
			trendingBadge: '💎 NEW'
		},
		{
			id: 'hot4',
			title: 'Gitar Akustik Yamaha',
			price: 120000,
			image: '/assets/img/GitarAkustikYamah.jpg',
			category: 'ekstrakurikuler',
			seller: 'SMAN 3 Bandung',
			stock: 2,
			condition: 'Baik',
			description: 'F310, kondisi baik, suara jernih',
			trending: true,
			trendingBadge: '🎵 TOP'
		},
		// Regular Products - Akademis
		{
			id: '1',
			title: 'Buku Fisika SMA',
			price: 18000,
			image: '/assets/img/BukuFisikaSMA.jpg',
			category: 'akademis',
			seller: 'MAN Insan Cendekia OKI',
			stock: 10,
			condition: '85%',
			description: 'Erlangga Kelas XI, kondisi baik 85%'
		},
		{
			id: '2',
			title: 'Atlas Indonesia',
			price: 12000,
			image: '/assets/img/AtlasIndonesia.jpg',
			category: 'akademis',
			seller: 'SMAN 1 Jakarta',
			stock: 8,
			condition: '90%',
			description: 'Peta lengkap Indonesia, kondisi 90%'
		},
		// Seragam
		{
			id: '5',
			title: 'Seragam Pramuka SMP',
			price: 40000,
			image: '/assets/img/SeragamPramuka.jpg',
			category: 'seragam',
			seller: 'SMAN 1 Jakarta',
			stock: 4,
			condition: 'Baik',
			description: 'Ukuran M, lengkap dengan tanda pengenal'
		},
		{
			id: '6',
			title: 'Baju Olahraga',
			price: 30000,
			image: '/assets/img/BajuOlahraga.jpg',
			category: 'seragam',
			seller: 'SMPN 2 Yogyakarta',
			stock: 6,
			condition: '95%',
			description: 'Kaos olahraga sekolah, ukuran L, kondisi 95%'
		},
		// Ekstrakurikuler
		{
			id: '9',
			title: 'Pianika Yamaha',
			price: 85000,
			image: '/assets/img/PianikaYamaha.jpg',
			category: 'ekstrakurikuler',
			seller: 'SMAN 1 Medan',
			stock: 5,
			condition: 'Baik',
			description: '32 tuts, lengkap dengan tas dan selang'
		},
		{
			id: '10',
			title: 'Raket Badminton',
			price: 65000,
			image: '/assets/img/RaketYonex.jpg',
			category: 'ekstrakurikuler',
			seller: 'SMAN 3 Bandung',
			stock: 8,
			condition: 'Baik',
			description: 'Yonex, senar masih bagus, grip baru'
		}
	];

	// Filter products
	const filteredProducts = products.filter(product => {
		const matchCategory = activeCategory === 'all' || product.category === activeCategory;
		const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.category.toLowerCase().includes(searchQuery.toLowerCase());
		return matchCategory && matchSearch;
	});

	const trendingProducts = products.filter(p => p.trending);
	const regularProducts = filteredProducts.filter(p => !p.trending);

	// Cart functions
	const addToCart = (product: Product) => {
		const existingItem = cart.find(item => item.id === product.id);

		if (existingItem) {
			setCart(cart.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			));
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
	};

	const removeFromCart = (productId: string) => {
		setCart(cart.filter(item => item.id !== productId));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
		} else {
			setCart(cart.map(item =>
				item.id === productId ? { ...item, quantity } : item
			));
		}
	};

	const getTotalPrice = () => {
		return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
	};

	const handleCheckout = () => {
		setShowCartModal(false);
		setShowCheckoutModal(true);
	};

	const confirmCheckout = () => {
		alert(`Checkout berhasil!\nMetode pembayaran: ${paymentMethod}\nOpsi pengiriman: ${shippingMethod}`);
		setCart([]);
		setShowCheckoutModal(false);
	};

	return (
		<section id="kategori" className={styles.categorySection}>
			<div className={styles.container}>
				{/* Search Container */}
				<div className={styles.searchContainer}>
					<div className={styles.searchHeader}>
						<h2 className={styles.searchTitle}>Temukan Barang Impianmu</h2>
						<p className={styles.searchSubtitle}>Cari dari ribuan barang berkualitas dengan harga terjangkau</p>
					</div>
					<div className={styles.searchBox}>
						<input
							type="text"
							className={styles.searchInput}
							placeholder="Cari buku, seragam, alat musik, dan lainnya..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button className={styles.searchBtn}>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</div>

				{/* Trending Products */}
				<div className={styles.trendingSection}>
					<div className={styles.trendingTitle}>
						<div className={styles.trendingIcon}>
							<i className="fas fa-fire"></i>
						</div>
						<div>
							<h3 className={styles.trendingHeading}>Produk Terlaris</h3>
							<p className={styles.trendingSubtitle}>Barang yang paling banyak dicari minggu ini</p>
						</div>
					</div>
					<div className={styles.productGrid}>
						{trendingProducts.map(product => (
							<ProductCard key={product.id} product={product} onAddToCart={addToCart} />
						))}
					</div>
				</div>

				{/* Category Filter */}
				<div className={styles.categoryFilter}>
					<button
						className={`${styles.categoryFilterBtn} ${activeCategory === 'all' ? styles.active : ''}`}
						onClick={() => setActiveCategory('all')}
					>
						<span><i className="fas fa-th-large"></i> Semua Produk</span>
					</button>
					<button
						className={`${styles.categoryFilterBtn} ${activeCategory === 'akademis' ? styles.active : ''}`}
						onClick={() => setActiveCategory('akademis')}
					>
						<span><i className="fas fa-book"></i> Akademis</span>
					</button>
					<button
						className={`${styles.categoryFilterBtn} ${activeCategory === 'seragam' ? styles.active : ''}`}
						onClick={() => setActiveCategory('seragam')}
					>
						<span><i className="fas fa-tshirt"></i> Seragam</span>
					</button>
					<button
						className={`${styles.categoryFilterBtn} ${activeCategory === 'ekstrakurikuler' ? styles.active : ''}`}
						onClick={() => setActiveCategory('ekstrakurikuler')}
					>
						<span><i className="fas fa-music"></i> Ekstrakurikuler</span>
					</button>
				</div>

				<div className={styles.sectionDivider}></div>

				{/* Regular Products */}
				<div className={styles.productGrid}>
					{regularProducts.map(product => (
						<ProductCard key={product.id} product={product} onAddToCart={addToCart} />
					))}
				</div>

				{/* Floating Cart Button */}
				<button
					className={styles.floatingCartBtn}
					onClick={() => setShowCartModal(true)}
				>
					<i className="fas fa-shopping-cart"></i>
					{cart.length > 0 && <span className={styles.cartBadge}>{cart.length}</span>}
				</button>

				{/* Cart Modal */}
				{showCartModal && (
					<CartModal
						cart={cart}
						onClose={() => setShowCartModal(false)}
						onUpdateQuantity={updateQuantity}
						onRemove={removeFromCart}
						onCheckout={handleCheckout}
						totalPrice={getTotalPrice()}
					/>
				)}

				{/* Checkout Modal */}
				{showCheckoutModal && (
					<CheckoutModal
						cart={cart}
						totalPrice={getTotalPrice()}
						paymentMethod={paymentMethod}
						shippingMethod={shippingMethod}
						onPaymentMethodChange={setPaymentMethod}
						onShippingMethodChange={setShippingMethod}
						onConfirm={confirmCheckout}
						onClose={() => setShowCheckoutModal(false)}
					/>
				)}
			</div>
		</section>
	);
};

export default ProductCategory;