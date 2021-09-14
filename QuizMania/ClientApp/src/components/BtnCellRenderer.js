import React from "react";

function BtnCellRenderer(params) {
    const refresh = (param) => {
        return true;
    };

    const onClick = ($event) => {
        if (params.onClick instanceof Function) {
            const retParams = {
                event: $event,
                rowData: params.node.data,
            };
            params.onClick(retParams);
        }
    };
    return (
        <button className="button" onClick={onClick}>
            {params.label}
        </button>
    );
}

export { BtnCellRenderer };