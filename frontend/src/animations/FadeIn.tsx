import { useInView } from 'react-intersection-observer';

export const FadeIn = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-300px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`${inView ? "opacity-100" : "opacity-0 translate-y-[20%]"} duration-[1s]`}>
            {children}
        </div>
    )
}