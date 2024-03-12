import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image
          src="/spooky.svg"
          alt="spokky"
          quality={100}
          height={80}
          width={80}
        />
      </div>
      <div className={cn("flex flex-col items-center",
      font.className
      )}>
        <p className="text-xl font-semibold">Streamify</p>
        <p className="text-sm text-muted-foreground">Streaming Moments, Creating Memories.</p>
      </div>
    </div>
  );
};
