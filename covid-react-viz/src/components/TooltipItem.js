const TooltipItem = ({label, value="", notLast=true}) => {
    return (
        <div>
            <span>
                <span className="font-semibold">{label}</span>
                {value}
            </span>
        </div>
    );
};

export default TooltipItem;
