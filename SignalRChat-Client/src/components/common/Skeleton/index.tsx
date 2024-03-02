import "./Skeleton.scss";

interface SkeletonProps {
    times: number
}

const Skeleton: React.FC<SkeletonProps> = ({ times }) => {
    const boxes = Array(times)
        .fill(0)
        .map((_, i) => {
            return (
                <div key={i} className='skeleton'></div>
            );
        });

    return boxes;
}

export default Skeleton;