import { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import Button from "../../components/button/Button";

function FeedFilter() {
    // Refs
    const scrolled = useRef(0);
    const frameID = useRef(null);
    const frame = useRef();

    // States
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        frame.current = document.getElementById('frame');
        scrolled.current = window.scrollY;
        frame.current.addEventListener('wheel', e => handleScroll(e));

        return () => {
            window.cancelAnimationFrame(frameID.current);
            frame.current.removeEventListener('wheel', e => handleScroll(e));
        }
    });

    function handleScroll(e) {
        if (e.deltaY < 0) {
            setVisible(true); // up
        } else {
            setVisible(false); // down
        }
    }

    return (
        <div className={classNames(
            "feed-filter",
            {"visible" : visible}
        )}>
            <a className="media-button active">Home</a>
            <a className="media-button">Favorites</a>
            <a className="media-button">Most Recent</a>
            <Button
                icon="filter-sliders-filled"
                type="secondary"
                size="medium"
            />
        </div>
    )
}
export default FeedFilter;
