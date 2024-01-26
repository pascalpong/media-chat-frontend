import { Box, Stack } from "@mui/material"
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface BaseLayoutProps {
    children?: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps):JSX.Element => {
    return (
        <Stack spacing={2}>
            <Box
                width={10}
                p={2}
            >
                {children || <Outlet />}
            </Box>
        </Stack>
    )
}

export default BaseLayout