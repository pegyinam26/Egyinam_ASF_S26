import bgImage from "../assets/background2.jpg";

export default function PageBackground({children }: any) {
    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

            {/* CONTENT */}
            <div className="relative z-10 p-6 md:p-12">
                {children}
            </div>
        </div>
    );
}