import { useInView } from 'react-intersection-observer';

export const TranslateX1 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-full ${inView ? "" : "translate-x-[95%]"} duration-[2s]`}>
            {children}
        </div>
    )
}

export const TranslateX11 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-full ${inView ? "" : "translate-x-[80%]"} duration-[2s]`}>
            {children}
        </div>
    )
}

export const TranslateX2 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-full ${inView ? "" : "-translate-x-[95%]"} duration-[2s]`}>
            {children}
        </div>
    )
}

export const TranslateX22 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-full ${inView ? "" : "-translate-x-[80%]"} duration-[2s]`}>
            {children}
        </div>
    )
}

export const TranslateX21TBlockchainImage = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-[80%] xl:w-[50%] ${inView ? "" : "-translate-x-[95%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateX21TNFTImage = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-full xl:w-[45%] ${inView ? "" : "translate-x-[95%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateX21TBlockchainIconImage = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-[30%] ${inView ? "" : "-translate-x-[250%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateX21TBlockchainIconImage2 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-[30%] ${inView ? "" : "-translate-x-[60%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateX21TNFTIconImage = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-[30%] ${inView ? "" : "translate-x-[250%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}

export const TranslateX21TNFTIconImage2 = ({children }:any) => {
    const { ref, inView } = useInView({
        // オプション
        rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
        triggerOnce: true, // 最初の一度だけ実行
    });

    return (
        <div ref={ref} className={`w-[30%] ${inView ? "" : "translate-x-[60%]"} duration-[2.5s]`}>
            {children}
        </div>
    )
}