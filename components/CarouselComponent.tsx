import { Carousel } from "@mantine/carousel";
import React from "react";

export default function CarouselWrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return <Carousel breakpoints={[
        { maxWidth: 'md', slideSize: '25%' },
        { maxWidth: 'sm', slideSize: '50%', slideGap: 0 },
        { maxWidth: "xs", slideSize: "75%", slideGap: 0 }
    ]}
        sx={{ flex: 1 }} slidesToScroll={1} align="start" dragFree={true} withControls slideSize="20%">
        {children}
    </Carousel>
}