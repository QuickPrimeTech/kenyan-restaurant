"use client"

import React, {ComponentProps} from 'react'
import {MenuItem} from "@/types/menu";
import {Badge} from "@ui/badge"
import {cn} from "@/lib/utils";
import {formatTime} from "@/utils/time-formatters";
import {useFindAvailability} from "@/utils/cart";

type OrderWarningProps = {
    menuItem: MenuItem;
}

export const OrderWarning = ({menuItem, className, ...props}: OrderWarningProps & ComponentProps<typeof Badge>) => {
    const isAvailable:boolean = useFindAvailability(menuItem)

        return !isAvailable ? (
        <Badge variant={"warning"} size="lg" className={cn(className)} {...props}>
            Available only from {formatTime(menuItem.start_time)} to {formatTime(menuItem.end_time)}
        </Badge>): null;
}

