import LogoLoop from "./LogoLoop/LogoLoop";

// Alternative with image sources
const imageLogos = [
    { src: "kolaborator/pertamina.png", alt: "Company 1", href: "#example" },
    { src: "kolaborator/kemenag.png", alt: "Company 1", href: "#example" },
    { src: "kolaborator/kemendik.png", alt: "Company 1", href: "#example" },
    { src: "kolaborator/jnt.png", alt: "Company 1", href: "#example" },
    { src: "kolaborator/sumsel.png", alt: "Company 1", href: "#example" },
    { src: "kolaborator/unilever.png", alt: "Company 1", href: "#example" }
];

export default function Logo(){
    return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}} className="mt-5">
        {/* Basic horizontal loop */}
        <LogoLoop
        logos={imageLogos}
        speed={100}
        direction="left"
        logoHeight={50}
        gap={80}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
        />
    </div>
    );
}