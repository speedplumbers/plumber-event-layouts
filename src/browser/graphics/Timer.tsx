import { useTimer } from "../hooks";

export const Timer = () => {
    const timer = useTimer();
    return <div style={{ display: "flex" }}>{timer?.time}</div>;
};
