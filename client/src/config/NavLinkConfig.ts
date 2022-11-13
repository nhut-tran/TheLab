import React from "react";
import NavLinkDefault from "../App/layout/NavLinkDefault";
import NavLinkLab from "../App/layout/NavLinkLab";
import NavLinkManager from "../App/layout/NavLinkManager";
import NavLinkRe from "../App/layout/NavLinkRe";
import NavLinkRp from "../App/layout/NavLinkRp";
import { Department } from "./Role";

interface NavLinkConfig {
    [Department: string]: React.ComponentType;
}
const navLinkConfig: NavLinkConfig = {
    [Department.Receive]: NavLinkRe,
    [Department.MiLab]: NavLinkLab,
    [Department.IgLab]: NavLinkLab,
    [Department.OgLab]: NavLinkLab,
    [Department.Report]: NavLinkRp,
    [Department.Manager]: NavLinkManager,
    default: NavLinkDefault
};

export default navLinkConfig;
