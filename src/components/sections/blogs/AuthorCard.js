import Image from "next/image";

const AuthorCard = ({ author, avatar, role }) => {
    // Mapping for author designations if description is empty
    const authorRoles = {
        "Jayajit Dash": "Senior Manager- Corporate Communications (Marketing)",
        "sahadeb": "Content Writer", // Fallback for sahadeb
        "admin": "Administrator",
        "enfycon": "Enfycon Team"
    };

    const displayRole = role || authorRoles[author] || "Content Creator";


    return (
        <div className="blog-author-card wow fadeInUp" data-wow-delay=".3s">
            <div className="author-image">
                {avatar ? (
                    <Image src={avatar} alt={author} width={100} height={100} />
                ) : (
                    <div className="placeholder-avatar">{author?.charAt(0)}</div>
                )}
            </div>
            <div className="author-content text-start">
                <span className="author-label">AUTHOR:</span>
                <h5 className="author-name">{author}</h5>
                <p className="author-role">{displayRole}</p>
            </div>
        </div>
    );
};

export default AuthorCard;
