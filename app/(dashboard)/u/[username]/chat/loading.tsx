import { Skeleton } from "@/components/ui/skeleton";

import { ToggleSkelton } from "./_components/Togglecard";

const ChatLoading = () => {
  return ( 
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
       <ToggleSkelton/>
       <ToggleSkelton/>
       <ToggleSkelton/>
      </div>
    </div>
  );
};
 
export default ChatLoading;