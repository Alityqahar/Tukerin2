import React, { useEffect, useState } from 'react';
import PillNav from './PillNav/PillNav';
import logo from '/nav-logo.png';
import PillNavButtons from './PillNav/PillNavButtons';

export default function Navbar(){
    // nav items point to section ids added in Home.tsx
    const navItems = [
        { label: 'Home', href: '#hero' },
        { label: 'Overview', href: '#overview' },
        { label: 'Fitur', href: '#fitur' },
        { label: 'Products', href: '#products' },
        { label: 'Leaderboard', href: '#leaderboard' },
    ];

    // Button items that will merge in mobile
    const buttonItems = [
        { label: 'Dashboard', href: '/dashboard' },
    ];

    // Combine all items for mobile
    const allItems = [...navItems, ...buttonItems];

    const [activeHref, setActiveHref] = useState<string>(navItems[0].href);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const ids = navItems.map(i => i.href).filter(h => h.startsWith('#')).map(h => h.slice(1));
        const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            const visible = entries.filter(e => e.isIntersecting);
            if (visible.length) {
                visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                setActiveHref(`#${visible[0].target.id}`);
            }
        }, { threshold: [0.25, 0.5, 0.75] });

        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // intercept clicks inside the nav container to perform smooth scroll for hash links
    const handleContainerClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a') as HTMLAnchorElement | null;
        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const id = href.slice(1);
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveHref(`#${id}`);
                }
            }
        }
    };

    return(
        <>
        <div onClick={handleContainerClick}>
            <PillNav
                logo={logo}
                logoAlt="Company Logo"
                items={isMobile ? allItems : navItems}
                activeHref={activeHref}
                className="custom-nav"
                ease="power2.easeOut"
                baseColor="linear-gradient(120deg, #4a7c23 0%, #8bc34a 100%)"
                pillColor="#ffffff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#000000"
            />
        </div>
        
        {/* Only show separate button on desktop */}
        {!isMobile && (
            <PillNavButtons 
                items={buttonItems}
                activeHref="/"
                className="custom-nav"
                ease="power2.easeOut"
                baseColor="linear-gradient(120deg, #4a7c23 0%, #8bc34a 100%)"
                pillColor="#ffffff"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#000000"
            />
        )}
        </>
    )
}