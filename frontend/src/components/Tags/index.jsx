import "./Tags.scss"

function Tags({ tags, id }) {
    return (
        <div className="tags" aria-label="Groupe tag">
            {tags.map((tag) => (
                <span className="tags__tag" key={`${id}-${tag}`}>
                    {tag}
                </span>
            ))}
        </div>
    )
}

export default Tags
