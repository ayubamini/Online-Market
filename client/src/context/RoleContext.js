import { createContext } from "react";

const RoleContext = createContext({
    registered: false,
    isStaff: false,
    isAdmin: false
});

export default RoleContext;