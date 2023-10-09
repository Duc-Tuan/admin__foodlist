import React from "react";

export interface IRouter {
    title: string;
    path: string;
    component: React.FC;
    isLayout?: boolean;
}