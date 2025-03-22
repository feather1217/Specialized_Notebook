import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { Plus,  } from "@phosphor-icons/react";
  import { AddDateForm } from "../from/adddate_from";

  
  export function DateButton() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className=" group shadow-lg bg-black rounded-full h-12 w-12 fixed bottom-6 right-6 flex flex-col items-center space-y-2 ">
          <Plus size={32}  weight="bold" className="text-white group-hover:text-black transition-colors duration-300" />
                  </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className=" text-center">新增事件</AlertDialogTitle>
          </AlertDialogHeader>
          <AddDateForm />
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  