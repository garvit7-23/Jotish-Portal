"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { fetchAstrologers } from "@/lib/api";

export default function DetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);

  // ⭐ camera state
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ⭐ load profile
  useEffect(() => {
    const load = async () => {
      const data = await fetchAstrologers();

      const raw = data?.[Number(id)];

      setProfile({
        name: raw?.name || raw?.astrologerName || "Astrologer",
        city: raw?.city || raw?.location || "Unknown location",
        price: raw?.salary || raw?.consultationFee || 500,
      });
    };

    load();
  }, [id]);

  useEffect(() => {
     if (videoRef.current && stream) {
       videoRef.current.srcObject = stream;
     }
   }, [stream]);
  // ⭐ open camera
  const startCamera = async () => {
     const media = await navigator.mediaDevices.getUserMedia({ video: true });
     setStream(media);
   };

  // ⭐ capture photo
  const capture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);

    setImage(canvas.toDataURL("image/png"));
    localStorage.setItem("capturedPhoto", canvas.toDataURL("image/png"));

    stream?.getTracks().forEach((t) => t.stop());
    router.push("/photo-result");
  };
  const retake = async () => {
     setImage(null);

     const media = await navigator.mediaDevices.getUserMedia({ video: true });
     setStream(media);
   };

  if (!profile)
    return (
      <p className="text-center mt-20 text-gray-500">Loading profile...</p>
    );

  return (
    <div className="relative min-h-screen p-6">

      {/* ⭐ zodiac watermark */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none -z-10">
        <img src="/zodiac.png" className="w-[1100px]" />
      </div>

      {/* ⭐ back */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-yellow-600 font-medium hover:underline"
      >
        ← Back
      </button>

      {/* ⭐ profile card */}
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur border border-yellow-200 rounded-3xl shadow-lg p-6">

        {/* avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-yellow-200 flex items-center justify-center text-3xl font-bold">
            {profile.name?.[0]}
          </div>

          <h2 className="mt-3 text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500">{profile.city}</p>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center">
          <div className="bg-yellow-50 rounded-xl p-3">
            <p className="text-sm text-gray-500">Consultation</p>
            <p className="font-semibold">₹{profile.price}</p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-3">
            <p className="text-sm text-gray-500">Rating</p>
            <p className="font-semibold">⭐ 4.6</p>
          </div>
        </div>

        {/* description */}
        <p className="mt-5 text-sm text-gray-600 text-center">
          Receive personalized guidance and insights to help you navigate
          important life decisions with clarity and confidence.
        </p>

        {/* CTA */}
        <button className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-semibold shadow">
          Start Consultation
        </button>

        {/* ⭐ CAMERA SECTION */}
        <div className="mt-6 text-center">

          {!stream && !image && (
            <button
              onClick={startCamera}
              className="bg-yellow-200 px-4 py-2 rounded-lg font-medium"
            >
              Open Camera
            </button>
          )}

          {stream && !image && (
            <>
              <video
                ref={videoRef}
                autoPlay
                className="rounded-xl mx-auto mt-4 w-64"
              />

              <button
                onClick={capture}
                className="mt-3 bg-yellow-400 px-4 py-2 rounded-lg"
              >
                Capture
              </button>
            </>
          )}

          {image && (
            <div className="mt-4 text-center">
              <img src={image} className="mx-auto rounded-xl w-64" />

              <button
                onClick={retake}
                className="mt-3 bg-yellow-200 px-4 py-2 rounded-lg font-medium"
              >
                Retake
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}