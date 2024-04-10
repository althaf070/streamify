"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlusCircleIcon,
  PlayCircleIcon,
  CalendarCheck2,
  Library,
} from "lucide-react";
import { Homecard } from "./Homecard";
import { MeetingModel } from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "../ui/input";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};
export const MeetingtypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast.info( 'Please select a date and time');
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call)
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast.success('Meeating Created')
    } catch (error) {
      console.error(error);
      toast.error('Failed to create meeting')
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Homecard
        icon={<PlusCircleIcon />}
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-green-800"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <Homecard
        icon={<PlayCircleIcon />}
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-950"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <Homecard
        icon={<CalendarCheck2 />}
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-950"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <Homecard
        icon={<Library />}
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-700"
        handleClick={() => router.push("/recordings")}
      />
      {!callDetail?(
          <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create an instant meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
          
          <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
          <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ):(
        <MeetingModel
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        handleClick={() => {
         navigator.clipboard.writeText(meetingLink);
         toast.success( 'Link Copied' );
        }}
        image={'/icons/checked.svg'}
        buttonIcon="/icons/copy.svg"
        className="text-center"
        buttonText="Copy Meeting Link"
      />
      )}
        <MeetingModel
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModel>
      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

    </section>
  );
};
