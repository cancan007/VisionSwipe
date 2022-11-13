import { useInView } from "react-intersection-observer";

export const TranslateY1 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`h-full ${inView ? "" : "translate-y-[95%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateY2 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`h-full ${inView ? "" : "-translate-y-[95%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateY12 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`h-full ${inView ? "" : "translate-y-[95%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateX21TCryptoIconImage = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-[30%] ${inView ? "" : "translate-y-[150%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}