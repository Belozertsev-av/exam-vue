import type {Icon, IconData} from "~/utils/ui/common";

export const useIcon = (icon: Icon): IconData => {
    switch (icon) {
        case "submit":
            return {
                src: "~/assets/img/icons.svg#submit",
                alt: "Submit"
            }
        case "warning":
            return {
                src: "~/assets/img/icons.svg#warning",
                alt: "Warning"
            }
        case "cross":
            return {
                src: "~/assets/img/icons.svg#cross",
                alt: "Cancel"
            }
        case "avatar":
            return {
                src: "~/assets/img/icons.svg#avatar",
                alt: "Avatar"
            }
        case "delete":
            return {
                src: "~/assets/img/icons.svg#delete",
                alt: "Delete"
            }
        case "alert":
            return {
                src: "~/assets/img/icons.svg#alert",
                alt: "Alert"
            }
        case "info":
            return {
                src: "~/assets/img/icons.svg#info",
                alt: "Info"
            }
        case "theme":
            return {
                src: "~/assets/img/icons.svg#theme",
                alt: "Theme"
            }
        default:
            return {
                src: "~/assets/img/icons.svg#default",
                alt: "Icon not found"
            }
    }
}