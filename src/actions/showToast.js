import { toast } from "sonner";
import { delay } from "@/actions/delay";

export const showNormalToast = (loadMessage, message, description, action, dtime) => {
    let colour;
    if(action === 'delete') {colour = `text-yellow-500`}
    else {colour = `text-green-600` }
    toast.promise(delay(dtime), {
        loading: loadMessage,
        success: ("Event completed", {
            message: <h1 className={`${colour} font-semibold`}>{message}</h1>,
            duration: 4000,
            description: <h1 className="text-black font-semibold">{description}</h1>,
        }),
        error: ("Could not complete the action", {
            message: <h1 className="text-red-600 font-semibold">{`Could not complete the action. Try Again`}</h1>,
            duration: 4000,
        }),
    });
}

export const showErrorToast = (title, description) => {
    toast.error("Deadline cannot be in the past", {
        title: <h1 className="text-red-600 font-semibold">{title}</h1>,
        description: <p className="text-black font-semibold">{description}</p>
    })
}
