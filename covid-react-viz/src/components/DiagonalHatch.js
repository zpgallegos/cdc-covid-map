const DiagonalHatch = ({ color }) => {
    const fills = {
        blue: "#399f9a",
        green: "#ccffcb",
    };
    const strokes = {
        blue: "#fff",
        green: "darkgray",
    };

    return (
        <defs>
            <pattern
                id={`${color}DiagonalHatch`}
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(45 0 0)"
            >
                <rect width="50" height="50" fill={fills[color]} />
                <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="10"
                    style={{ stroke: strokes[color], strokeWidth: 1 }}
                />
            </pattern>
        </defs>
    );
};

export default DiagonalHatch;
