"use client";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useAppSelector } from "../(main)/store/hooks";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  // const darkMode = useAppSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <ThreeCircles
          visible={true}
          height="50"
          width="50"
          color={`${"#000000"}`}
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return <>{children}</>;
}
