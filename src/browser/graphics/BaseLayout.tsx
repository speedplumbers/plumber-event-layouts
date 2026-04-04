import { CSSProperties } from "react";

const containerStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "1920px",
    height: "1080px",
}

const Footer = () => {
    return (
        <div style={{ position: "absolute", top: 1050 }}>
            <div>
                hi
            </div>
        </div>
    )
}

export const BaseLayout = () => {
    return (
        <>
            <div style={containerStyle}>
                <Footer />
            </div>
        </>
    )
};
