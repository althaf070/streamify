import { MeetingtypeList } from "@/components/meet/MeetingtypeList";

const MeetingMainpage = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="flex items-center w-full size-full flex-col gap-5 text-white">
      <h1 className="text-center text-xl mt-1 font-bold mb-4">Set Meetings</h1>
      <p className="text-center text-lg font-semibold text-wrap mt-3 ml-3 mr-3">
        Interact,discuss,with peoples around world without barriers. <br />
        <span className="text-blue-600">
          Everyone deserves freedom of speech.
        </span>
      </p>
      <div className="h-[303px] w-full flex flex-col items-center rounded-[20px]">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
        <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-blue-400 lg:text-2xl">{date}</p>
          </div>
      </div>
      </div>
      <div className="w-full m-4"> <MeetingtypeList/></div>

    </section>
  );
};

export default MeetingMainpage;
