import React from 'react'

export const RandomImageGenerator = () => {

    const GetImageIndex = (index) => {

        let value = (index + 1) % 4;
        if (value === 0)
            value = 4;
        return value;
    }

    return {
        GetImageIndex: GetImageIndex
    };

}