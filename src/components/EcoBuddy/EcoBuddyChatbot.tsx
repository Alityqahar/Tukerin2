import { useRef, useState, useEffect } from "react";
import styles from "../ProductCategory/ProductCategory.module.css";

interface EcoBuddyChatbotProps {
	onClose: () => void;
}

type Message = { from: "bot" | "user"; text: string };

const initialMsgs: Message[] = [
	{ from: "bot", text: "Halo! 👋 Saya EcoBuddy, asisten AI untuk ekonomi sirkular di sekolah. Ada yang bisa saya bantu hari ini?" }
];

const botReply = (input: string): string => {
	const q = input.toLowerCase();
	if (q.includes("produk") || q.includes("barang")) return "Untuk mencari produk, gunakan fitur pencarian di atas atau filter kategori.";
	if (q.includes("eco-score")) return "Eco-Score adalah poin dampak lingkungan dari aktivitas tukar barang. Setiap 1000 poin setara 1 bibit pohon!";
	if (q.includes("daftar") || q.includes("register")) return "Untuk mendaftarkan sekolah, klik tombol 'Daftarkan Sekolah' di halaman utama.";
	if (q.includes("dashboard")) return "Dashboard menampilkan statistik, progres, dan aktivitas sekolah Anda secara real-time.";
	if (q.includes("logistik")) return "Barang akan dikirim melalui titik kumpul sekolah seperti koperasi atau perpustakaan.";
	if (q.includes("halo") || q.includes("hi")) return "Halo juga! Ada pertanyaan seputar fitur atau ekonomi sirkular?";
	return "Maaf, EcoBuddy masih belajar. Silakan tanyakan tentang fitur, produk, eco-score, atau logistik.";
};

export default function EcoBuddyChatbot({ onClose }: EcoBuddyChatbotProps) {
	const [messages, setMessages] = useState<Message[]>(initialMsgs);
	const [input, setInput] = useState("");
	const [typing, setTyping] = useState(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bodyRef.current) {
			bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
		}
	}, [messages, typing]);

	const sendMsg = async () => {
		if (!input.trim()) return;
		const userMsg = { from: "user" as const, text: input };
		setMessages(msgs => [...msgs, userMsg]);
		setInput("");
		setTyping(true);
		setTimeout(() => {
			setMessages(msgs => [
				...msgs,
				{ from: "bot", text: botReply(userMsg.text) }
			]);
			setTyping(false);
		}, 800);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") sendMsg();
	};

	return (
		<div className={styles.ecoBuddyModalOverlay} tabIndex={-1}>
			<div className={styles.ecoBuddyModal} role="dialog" aria-modal="true">
				<div className={styles.ecoBuddyHeader}>
					<span className={styles.ecoBuddyTitle}>
						<i className="fas fa-robot"></i> EcoBuddy
					</span>
					<button
						className={styles.ecoBuddyCloseBtn}
						onClick={onClose}
						aria-label="Tutup EcoBuddy"
					>
						&times;
					</button>
				</div>
				<div className={styles.ecoBuddyBody} ref={bodyRef}>
					{messages.map((msg, idx) => (
						<div
							key={idx}
							className={
								msg.from === "bot"
									? styles.ecoBuddyMsgRow
									: `${styles.ecoBuddyMsgRow} ${styles.ecoBuddyMsgRowUser}`
							}
						>
							{msg.from === "bot" && (
								<span className={styles.ecoBuddyAvatar}>
									<i className="fas fa-robot"></i>
								</span>
							)}
							<div
								className={
									msg.from === "bot"
										? styles.ecoBuddyMsgBot
										: styles.ecoBuddyMsgUser
								}
							>
								{msg.text}
							</div>
							{msg.from === "user" && (
								<span className={`${styles.ecoBuddyAvatar} ${styles.ecoBuddyAvatarUser}`}>
									<i className="fas fa-user"></i>
								</span>
							)}
						</div>
					))}
					{typing && (
						<div className={styles.ecoBuddyTyping}>EcoBuddy sedang mengetik...</div>
					)}
				</div>
				<form
					className={styles.ecoBuddyInputBar}
					onSubmit={e => {
						e.preventDefault();
						sendMsg();
					}}
				>
					<input
						className={styles.ecoBuddyInput}
						type="text"
						placeholder="Tulis pertanyaan..."
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						autoFocus
						aria-label="Ketik pesan ke EcoBuddy"
					/>
					<button
						type="submit"
						className={styles.ecoBuddySendBtn}
						disabled={!input.trim()}
						aria-label="Kirim"
					>
						<i className="fas fa-paper-plane"></i>
					</button>
				</form>
			</div>
		</div>
	);
}
