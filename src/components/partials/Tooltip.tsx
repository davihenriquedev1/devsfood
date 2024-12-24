"use client";

import React from 'react';
import { ITooltip, Tooltip } from 'react-tooltip'; // Importando a interface diretamente

interface MyTooltipProps extends ITooltip {
    customClassName?: string;
}

export const MyTooltip = ({ customClassName, ...props }: MyTooltipProps) => {
    return (
        <Tooltip
        className={customClassName} // Classe customizada
        {...props} // Espalhando todas as props para o TooltipController
        />
    );
};
