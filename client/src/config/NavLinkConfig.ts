import React from "react";
import NavLinkLab from "../App/layout/NavLinkLab";
import NavLinkManager from "../App/layout/NavLinkManager";
import NavLinkRe from "../App/layout/NavLinkRe";
import NavLinkRp from "../App/layout/NavLinkRp";
import { Department } from "./Role";

interface NavLinkConfig {
    [Department: string]: React.FC


}
const navLinkConfig: NavLinkConfig = {
    [Department.Receive]: NavLinkRe,
    [Department.MiLab]: NavLinkLab,
    [Department.Report]: NavLinkRp,
    [Department.Manager]: NavLinkManager
}

export default navLinkConfig