import aboutImage from "../assets/About_Us.jpg";
import PageBackground from "../components/PageBackground";

export default function AboutUsPage() {
    return (
        <PageBackground>
            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="
                    bg-gradient-to-br
                    from-amber-900/40
                    via-black/60
                    to-emerald-900/40
                    border border-amber-400/20
                    rounded-[40px]
                    shadow-2xl
                    backdrop-blur-xl
                    overflow-hidden
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                ">

                    {/* IMAGE */}
                    <div className="relative h-[650px] lg:h-auto overflow-hidden">
                        <img
                            src={aboutImage}
                            alt="Owners of Ghana Vacation Tours LLC"
                            className="w-full h-full object-cover"
                        />

                        <div className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-black/10
                            to-transparent
                        " />

                        <div className="absolute bottom-8 left-8">
                            <p className="text-amber-200 text-sm uppercase tracking-[0.3em]">
                                Ghana Vacation Tours LLC
                            </p>
                            <h2 className="text-white text-3xl font-black mt-2">
                                Rooted in Heritage. Built for Discovery.
                            </h2>
                        </div>
                    </div>

                    {/* STORY */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">

                        <p className="text-lg uppercase tracking-[0.35em] text-amber-300 mb-4">
                            About Us
                        </p>

                        <h1 className="
                            text-5xl md:text-6xl
                            font-black
                            text-amber-100
                            mb-8
                            leading-tight
                        ">
                            Our Story
                        </h1>

                        <div className="
                            text-amber-50/90
                            text-lg
                            leading-9
                            space-y-6
                        ">
                            <p>
                                Ghana Vacation Tours LLC was created from a deep love for Ghana,
                                its people, its history, and the unforgettable beauty found across
                                the country. The owners began the business with a simple vision:
                                to help travelers experience Ghana not just as tourists, but as
                                welcomed guests discovering a place full of culture, warmth,
                                heritage, and possibility.
                            </p>

                            <p>
                                Their motivation came from seeing how powerful a visit to Ghana
                                can be. From the energy of Accra and the history of Cape Coast,
                                to the waterfalls, beaches, markets, food, music, and traditional
                                hospitality, they wanted to build travel experiences that felt
                                personal, meaningful, and beautifully organized. Ghana Vacation
                                Tours LLC was designed to remove the stress of planning while
                                giving travelers a curated journey that balances relaxation,
                                education, adventure, and luxury.
                            </p>

                            <p>
                                What started as a passion for sharing Ghanaian culture has grown
                                into a travel brand focused on creating memorable experiences for
                                families, couples, groups, students, and returning members of the
                                African diaspora. Every itinerary is built with care, highlighting
                                the stories, landmarks, landscapes, and local communities that
                                make Ghana one of West Africa’s most exciting destinations.
                            </p>

                            <p>
                                Looking ahead, Ghana Vacation Tours LLC plans to expand its tour
                                packages, build stronger partnerships with hotels and local
                                businesses, introduce customized heritage tours, and eventually
                                offer travel experiences across other parts of West Africa. The
                                mission remains clear: to connect people to Ghana through
                                excellent service, authentic experiences, and unforgettable
                                journeys.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </PageBackground>
    );
}