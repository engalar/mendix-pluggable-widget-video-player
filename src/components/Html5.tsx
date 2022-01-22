import { createElement, useCallback, useEffect, useRef } from "react";

import classNames from "classnames";

export interface Html5PlayerProps {
    url: string;
    poster?: string;
    autoPlay: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    style?: any;
    aspectRatio?: boolean;
    preview: boolean;
}

export function Html5(props: Html5PlayerProps) {
    const videoElement = useRef<HTMLVideoElement>(null);
    const errorElement = useRef<HTMLDivElement>(null);

    const handleOnSuccess = useCallback(() => {
        if (errorElement.current) {
            errorElement.current.classList.remove('hasError');
            if (videoElement.current) {
                videoElement.current.controls = props.showControls;
            }
        }
    }, []);

    const handleOnError = useCallback(() => {
        if (errorElement.current) {
            errorElement.current.classList.add('hasError');
            if (videoElement.current) {
                videoElement.current.controls = false;
            }
        }
    }, []);

    useEffect(() => {
        if (props.url) {
            if (videoElement.current) {
                handleOnSuccess();
                videoElement.current.load();
            }
        }

        return () => {
        };
    }, [props.url]);

    return <div
        className={classNames("widget-video-player-html5-container", {
            "widget-video-player-show-controls": props.showControls
        })}
    >
        {props.preview ? (
            <svg
                className="widget-video-player-preview-play-button"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                    fill="#373737"
                />
                <path d="M16 12V36L34.8571 24L16 12Z" fill="white" />
            </svg>
        ) : (
            <div className="video-error-label-html5" ref={errorElement}>
                The video failed to load :(
            </div>
        )}
        <video
            className="widget-video-player-html5"
            controls={props.showControls}
            autoPlay={props.autoPlay}
            muted={props.muted}
            loop={props.loop}
            poster={props.poster}
            ref={videoElement}
            height={!props.aspectRatio ? "100%" : undefined}
            preload={props.poster ? "metadata" : "auto"}
        >
            {!props.preview && props.url ? (
                <source
                    src={props.url}
                    type="video/mp4"
                    onError={handleOnError}
                    onLoad={handleOnSuccess}
                />
            ) : null}
        </video>
    </div>;
}
