export default function PageHero({ title, className }) {
    return (
        <div className={className}>
            <h1>{title}</h1>
        </div>
    );
}