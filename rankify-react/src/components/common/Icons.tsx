import {
    blogIconPaths,
    dashboardIconPaths,
} from "@/utils/iconsPath";
import { createLucideIcon } from "lucide-react";

const DashboardIcon = createLucideIcon("DashboardIcon", [
    [
        "path",
        {
            d: dashboardIconPaths,
            fill: "currentColor",
            stroke: "none",
            key: "dashboard-icon-path",
        },
    ],
]);

const BlogIcon = createLucideIcon(
    "BlogIcon",
    blogIconPaths.map((d, index) => [
        "path",
        {
            d,
            fill: "currentColor",
            stroke: "none",
            key: `blog-icon-path-${index}`,
        },
    ])
);

export { DashboardIcon, BlogIcon };
