import { toast } from "sonner";

type props={
    promise:Promise<any>,
    loadingMsg:string,
    successMsg:string
}
export const promiseToast=({promise,loadingMsg,successMsg}:props)=>{
    toast.promise(promise, {
        loading: loadingMsg,
        success: (data) => {
          return successMsg;
        },
        error: "an error occurred",
      });
    }
