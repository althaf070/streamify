import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Hintprops {
  label: string;
  children: React.ReactNode;
  aschild?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "end" | "center";
}
export const Hint = ({ label, children, aschild, side, align }: Hintprops) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={aschild}>{children}</TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          <p className="font-semibold]">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
