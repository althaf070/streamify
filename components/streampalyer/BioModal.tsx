"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import  { useState, useTransition, useRef, ElementRef } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";


interface BioModalProps{
    intialValue:string |null
}
export const BioModal = ({intialValue}:BioModalProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
    const [value, setvalue] = useState(intialValue || "")
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        startTransition(()=>{
            updateUser({bio:value})
            .then(() => {
                toast.success("User bio updated");
                closeRef.current?.click();
              })
              .catch(() => toast.error("Something went wrong"));
        })
    }
  return (
    <Dialog>
         <DialogTrigger asChild>
         <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
         </DialogTrigger>
         <DialogContent>
         <DialogHeader>
         <DialogTitle>Edit user bio</DialogTitle>
         </DialogHeader>
         <form className="space-y-4" onSubmit={onSubmit}>
            <Textarea
            placeholder="User Bio"
            onChange={(e) => setvalue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
            />
              <div className="flex justify-between">
                <DialogClose asChild ref={closeRef}>
                    <Button type="button" variant={"ghost"}>Cancel</Button>
                </DialogClose>
                <Button disabled={isPending} type="submit"  variant="primary">
                    Save
                </Button>
              </div>
         </form>
         </DialogContent>
    </Dialog>
  )
}
