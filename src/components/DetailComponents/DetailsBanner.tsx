//@ts-nocheck
"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "@/src/redux/store";
import Genres from "../List/Genres";
import CircleRating from "../List/CircleRating";
import { BsPlay } from "react-icons/bs";
import VideoPopup from "./VideoPopup";
import { Img } from "../LazyLoadImage";
import DetailSkeleton from "../Skeleton";


type Props = {
  video: string;
  crew: string;
  data: any;
  loading: Boolean;
};

const DetailsBanner = ({ video, crew, data, loading }: Props) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const url: any = useSelector((state: RootState) => state.home.url);
  const _genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes: any) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const PosterFallback =
    "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/no-poster.png?raw=true";


  return (
    <div className="w-full bg-black pt-[150px] mb-[50px]">
      {!loading ? (
        <>
          {!!data ? (
            <>
              <div className="w-full h-full absolute top-0 left-0 opacity-[0.1] overflow-hidden">
                <Img
                  className="w-full h-full object-cover object-center"
                  src={url.backdrop + data.backdrop_path}
                />
              </div>
              {/* opacity-layer */}
              <div className="w-full h-[250px] bg-gradient-to-b from-white/0 via-black to-black absolute bottom-0 left-0"></div>
              {/* contentwrapper */}
              <div className="w-full max-w-[1200px] mx-auto px-10 md:px-20">
                <div className="flex relative flex-col md:flex-row gap-20">
                  {/* left */}
                  <div className="shrink-0">
                    {data.poster_path ? (
                      <Img
                        className="w-96 block rounded-xl"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img
                        className="w-full block rounded-xl"
                        src={PosterFallback}
                      />
                    )}
                  </div>
                  {/* right */}
                  <div className="text-white">
                    <div className="leading-[40px] text-[28px]">
                      {`${data.name || data.title}(${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="text-[16px] leading-[24px] mb-[15px] opacity-[0.5] italic">
                      {data.tagline}
                    </div>
                    <div className="mb-4 flex-wrap">
                      <Genres id={_genres} />
                    </div>
                    {/* row */}
                    <div className="flex items-center gap-[25px] w-full mb-[25px]">
                      <div className="w-36">
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                      </div>
                      <div
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                        className="flex items-center cursor-pointer  justify-center rounded-full p-2  border-black-light border-2 group"
                      >
                        <BsPlay
                          className="group-hover:text-black-light text-center  cursor-pointer"
                          size={"55px"}
                        />
                        <span className="group-hover:text-black-light text-base md:text-2xl m-2">
                          Watch Trailer
                        </span>
                      </div>
                    </div>

                    {/* overview */}
                    <div className="mb-[25px]">
                      <div className="text-[24px] mb-[10px]">Overview</div>
                      <div className="leading-[24px]">{data.overview}</div>
                    </div>

                    {/* info */}
                    <div className="border-b-2 border-white/10 p-[15px] flex">
                      {data.status && (
                        <div className="mr-[10px] flex-col md:flex-row flex">
                          <span className="mr-[10px] leading-[24px] font-bold">
                            Status:{" "}
                          </span>
                          <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                            {data.status}
                          </span>
                        </div>
                      )}
                      {data.release_date && (
                        <div>
                          <span className="mr-[10px]  leading-[24px] font-bold">
                            Release Date:{" "}
                          </span>
                          <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div>
                          <span className="mr-[10px] leading-[24px] font-bold">
                            Runtime:{" "}
                          </span>
                          <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="border-b-2 border-white/10 p-[15px] flex">
                        <span className="mr-[10px] leading-[24px] font-bold">
                          Director:{" "}
                        </span>
                        <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="border-b-2 border-white/10 p-[15px] flex">
                        <span className="mr-[10px] leading-[24px] font-bold">
                          Writer:{" "}
                        </span>
                        <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div>
                        <span className="mr-[10px] leading-[24px] font-bold">
                          Creator:{" "}
                        </span>
                        <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </div>
            </>
          ) : (
            <div className="max-w-5xl flex justify-center"><DetailSkeleton/></div>
          )}
        </>
      ) : (
        <div className="max-w-5xl flex justify-center"><DetailSkeleton/></div>
      )}
    </div>
  );
};

export default DetailsBanner;
